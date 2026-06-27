import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ServicesScene() {
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
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 200);
    camera.position.set(0, 0, 10);

    const group = new THREE.Group();
    scene.add(group);

    // Floating wireframe shapes - one per service
    const shapeDefs = [
      { geo: new THREE.IcosahedronGeometry(0.5, 1), pos: [-5, 2, -2], speed: 0.007 },
      { geo: new THREE.OctahedronGeometry(0.55),    pos: [-2, -2.5, -1], speed: -0.009 },
      { geo: new THREE.TetrahedronGeometry(0.6),    pos: [1.5, 2.5, -3],  speed: 0.006 },
      { geo: new THREE.IcosahedronGeometry(0.45, 0),pos: [4.5, -1.5, -1], speed: -0.008 },
      { geo: new THREE.OctahedronGeometry(0.5),     pos: [2.5, -3, -2],   speed: 0.01 },
      { geo: new THREE.TetrahedronGeometry(0.5),    pos: [-4, -1, -3],    speed: -0.007 },
    ];

    const meshes: { mesh: THREE.Mesh; speed: number; floatOffset: number }[] = [];

    shapeDefs.forEach(({ geo, pos, speed }) => {
      const mat = new THREE.MeshBasicMaterial({ color: 0x7C3AED, wireframe: true, transparent: true, opacity: 0.35 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...(pos as [number, number, number]));
      group.add(mesh);

      // Solid inner
      const innerMat = new THREE.MeshBasicMaterial({ color: 0x3B0E8C, transparent: true, opacity: 0.15 });
      const inner = new THREE.Mesh(geo.clone(), innerMat);
      inner.position.copy(mesh.position);
      group.add(inner);

      meshes.push({ mesh, speed, floatOffset: Math.random() * Math.PI * 2 });
    });

    // Connecting lines between shapes
    const lineMat = new THREE.LineBasicMaterial({ color: 0x7C3AED, transparent: true, opacity: 0.12 });
    const connections = [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [0, 3], [1, 4],
    ];
    const lineObjects: THREE.Line[] = [];
    connections.forEach(([a, b]) => {
      const geo = new THREE.BufferGeometry().setFromPoints([
        meshes[a].mesh.position.clone(),
        meshes[b].mesh.position.clone(),
      ]);
      const line = new THREE.Line(geo, lineMat);
      group.add(line);
      lineObjects.push(line);
    });

    // Ambient particles
    const ptCount = 80;
    const ptPos = new Float32Array(ptCount * 3);
    for (let i = 0; i < ptCount; i++) {
      ptPos[i * 3] = (Math.random() - 0.5) * 16;
      ptPos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      ptPos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 3;
    }
    const ptGeo = new THREE.BufferGeometry();
    ptGeo.setAttribute("position", new THREE.BufferAttribute(ptPos, 3));
    scene.add(new THREE.Points(ptGeo, new THREE.PointsMaterial({ color: 0x9B5CF6, size: 0.05, transparent: true, opacity: 0.4 })));

    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      group.rotation.y = t * 0.04;

      meshes.forEach(({ mesh, speed, floatOffset }, i) => {
        mesh.rotation.x += speed;
        mesh.rotation.y += speed * 0.7;
        mesh.position.y = shapeDefs[i].pos[1] + Math.sin(t * 0.6 + floatOffset) * 0.2;
      });

      // Update line endpoints as shapes float
      connections.forEach(([a, b], i) => {
        const pts = [meshes[a].mesh.position.clone(), meshes[b].mesh.position.clone()];
        lineObjects[i].geometry.setFromPoints(pts);
      });

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
