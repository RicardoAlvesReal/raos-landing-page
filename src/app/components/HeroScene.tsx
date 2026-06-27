import { useEffect, useRef } from "react";
import * as THREE from "three";

export function HeroScene() {
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
    const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 100);
    camera.position.set(0, 0, 5.5);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.3));
    const pl1 = new THREE.PointLight(0x9B5CF6, 2, 20);
    pl1.position.set(5, 5, 5);
    scene.add(pl1);
    const pl2 = new THREE.PointLight(0x5B21B6, 1, 20);
    pl2.position.set(-5, -3, -3);
    scene.add(pl2);

    // Icosahedron sphere
    const geo = new THREE.IcosahedronGeometry(1.6, 1);
    const mat = new THREE.MeshPhongMaterial({
      color: 0x7C3AED,
      emissive: 0x3B0E8C,
      shininess: 120,
      wireframe: false,
    });
    const sphere = new THREE.Mesh(geo, mat);
    scene.add(sphere);

    // Wireframe overlay
    const wireMat = new THREE.MeshBasicMaterial({ color: 0x9B5CF6, wireframe: true, transparent: true, opacity: 0.18 });
    const wireMesh = new THREE.Mesh(geo.clone(), wireMat);
    wireMesh.scale.setScalar(1.01);
    scene.add(wireMesh);

    // Rings
    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(2.4, 0.012, 16, 80),
      new THREE.MeshBasicMaterial({ color: 0x9B5CF6, transparent: true, opacity: 0.4 })
    );
    scene.add(ring1);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(2.8, 0.008, 16, 80),
      new THREE.MeshBasicMaterial({ color: 0x5B21B6, transparent: true, opacity: 0.25 })
    );
    ring2.rotation.set(Math.PI / 3, 0, Math.PI / 6);
    scene.add(ring2);

    // Particles
    const ptCount = 140;
    const ptPos = new Float32Array(ptCount * 3);
    for (let i = 0; i < ptCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3.2 + Math.random() * 1.5;
      ptPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      ptPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      ptPos[i * 3 + 2] = r * Math.cos(phi);
    }
    const ptGeo = new THREE.BufferGeometry();
    ptGeo.setAttribute("position", new THREE.BufferAttribute(ptPos, 3));
    const pts = new THREE.Points(
      ptGeo,
      new THREE.PointsMaterial({ color: 0x9B5CF6, size: 0.05, transparent: true, opacity: 0.7 })
    );
    scene.add(pts);

    // Stars
    const starPos = new Float32Array(800 * 3);
    for (let i = 0; i < 800; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 120;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 120;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.04, transparent: true, opacity: 0.4 })));

    // Mouse interaction
    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      sphere.rotation.x += 0.003;
      sphere.rotation.y += 0.005;
      wireMesh.rotation.copy(sphere.rotation);

      // Subtle float
      sphere.position.y = Math.sin(t * 0.8) * 0.12;
      wireMesh.position.y = sphere.position.y;

      // Mouse follow
      sphere.position.x = THREE.MathUtils.lerp(sphere.position.x, mouse.x * 0.6, 0.04);
      wireMesh.position.x = sphere.position.x;

      ring1.rotation.x += 0.008;
      ring1.rotation.z += 0.003;
      ring2.rotation.y += 0.006;
      ring2.rotation.z += 0.004;

      pts.rotation.y += 0.001;

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
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 pointer-events-auto" style={{ zIndex: 1 }} />;
}
