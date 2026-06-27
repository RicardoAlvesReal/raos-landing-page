import { useEffect, useRef } from "react";
import * as THREE from "three";

export function GlobeScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const w = el.clientWidth;
    const h = el.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 0, 5.5);

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const pl = new THREE.PointLight(0x9B5CF6, 1.5, 20);
    pl.position.set(4, 4, 4);
    scene.add(pl);

    const group = new THREE.Group();
    scene.add(group);

    // Dot grid
    const radius = 2;
    const dotMat = new THREE.MeshBasicMaterial({ color: 0x7C3AED, transparent: true, opacity: 0.75 });
    const dotGeo = new THREE.SphereGeometry(0.022, 6, 6);
    const rows = 28;
    for (let lat = 0; lat <= rows; lat++) {
      const theta = (lat / rows) * Math.PI;
      const cols = Math.round(Math.sin(theta) * 28);
      for (let col = 0; col < cols; col++) {
        const phi = (col / cols) * Math.PI * 2;
        const dot = new THREE.Mesh(dotGeo, dotMat);
        dot.position.set(
          radius * Math.sin(theta) * Math.cos(phi),
          radius * Math.cos(theta),
          radius * Math.sin(theta) * Math.sin(phi)
        );
        group.add(dot);
      }
    }

    // Core (hide inside)
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(1.96, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x0A0816 })
    );
    group.add(core);

    // Arcs
    const arcPairs: [[number, number, number], [number, number, number]][] = [
      [[-0.5, 0.8, 1.8], [1.5, 0.2, 1.2]],
      [[1.8, 0.4, -0.6], [-1.2, 0.6, 1.5]],
      [[-1.6, -0.3, 1.1], [0.8, 1.4, 1.4]],
      [[0.2, -1.8, 0.9], [1.6, 0.9, -0.9]],
      [[-0.9, 1.6, -1.0], [1.0, -0.5, 1.8]],
    ];

    const arcMat = new THREE.LineBasicMaterial({ color: 0x9B5CF6, transparent: true, opacity: 0.7 });
    const r2 = 2.02;
    arcPairs.forEach(([a, b]) => {
      const start = new THREE.Vector3(...a).normalize().multiplyScalar(r2);
      const end = new THREE.Vector3(...b).normalize().multiplyScalar(r2);
      const mid = start.clone().add(end).normalize().multiplyScalar(r2 * 1.5);
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const pts = curve.getPoints(32);
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      group.add(new THREE.Line(geo, arcMat));
    });

    // Drag interaction
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let velocity = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => { isDragging = true; prevMouse = { x: e.clientX, y: e.clientY }; };
    const onMouseUp = () => { isDragging = false; };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMouse.x;
      const dy = e.clientY - prevMouse.y;
      velocity.x = dy * 0.005;
      velocity.y = dx * 0.005;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    el.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isDragging) {
        group.rotation.y += 0.003;
        velocity.x *= 0.95;
        velocity.y *= 0.95;
      } else {
        group.rotation.x += velocity.x;
        group.rotation.y += velocity.y;
      }
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
      el.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "420px" }} />;
}
