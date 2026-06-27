import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ParticleField() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const w = el.clientWidth;
    const h = el.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(1);
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
    camera.position.set(0, 0, 7);

    // Nodes
    const count = 80;
    const nodePositions: THREE.Vector3[] = [];
    const nodeSpeeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      nodePositions.push(new THREE.Vector3(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 7,
        (Math.random() - 0.5) * 5,
      ));
      nodeSpeeds[i] = 0.005 + Math.random() * 0.008;
    }

    // Point sprites
    const ptPos = new Float32Array(count * 3);
    nodePositions.forEach((p, i) => { ptPos[i * 3] = p.x; ptPos[i * 3 + 1] = p.y; ptPos[i * 3 + 2] = p.z; });
    const ptGeo = new THREE.BufferGeometry();
    const ptAttr = new THREE.BufferAttribute(ptPos, 3);
    ptAttr.setUsage(THREE.DynamicDrawUsage);
    ptGeo.setAttribute("position", ptAttr);
    scene.add(new THREE.Points(ptGeo, new THREE.PointsMaterial({ color: 0x9B5CF6, size: 0.1, transparent: true, opacity: 0.8 })));

    // Edges - connect nodes within distance threshold
    const THRESHOLD = 4.5;
    const edgeIndices: [number, number][] = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < THRESHOLD) {
          edgeIndices.push([i, j]);
        }
      }
    }

    const edgePts = new Float32Array(edgeIndices.length * 2 * 3);
    const edgeGeo = new THREE.BufferGeometry();
    const edgeAttr = new THREE.BufferAttribute(edgePts, 3);
    edgeAttr.setUsage(THREE.DynamicDrawUsage);
    edgeGeo.setAttribute("position", edgeAttr);
    scene.add(new THREE.LineSegments(edgeGeo, new THREE.LineBasicMaterial({ color: 0x7C3AED, transparent: true, opacity: 0.22 })));

    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Float nodes upward, wrap
      for (let i = 0; i < count; i++) {
        nodePositions[i].y += nodeSpeeds[i] * 0.4;
        if (nodePositions[i].y > 3.5) nodePositions[i].y = -3.5;

        ptAttr.array[i * 3] = nodePositions[i].x;
        ptAttr.array[i * 3 + 1] = nodePositions[i].y;
        ptAttr.array[i * 3 + 2] = nodePositions[i].z;
      }
      ptAttr.needsUpdate = true;

      // Update edges
      edgeIndices.forEach(([a, b], idx) => {
        const base = idx * 6;
        edgeAttr.array[base]     = nodePositions[a].x;
        edgeAttr.array[base + 1] = nodePositions[a].y;
        edgeAttr.array[base + 2] = nodePositions[a].z;
        edgeAttr.array[base + 3] = nodePositions[b].x;
        edgeAttr.array[base + 4] = nodePositions[b].y;
        edgeAttr.array[base + 5] = nodePositions[b].z;
      });
      edgeAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const nw = el.clientWidth;
      const nh = el.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
