
"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LiquidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Geometry - High density Icosahedron for liquid effect
    const geometry = new THREE.IcosahedronGeometry(1.5, 64);
    
    // Material - MeshPhysicalMaterial for glass-liquid look
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x3b82f6,
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.9,
      thickness: 1.5,
      ior: 1.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x8b5cf6, 20);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x3b82f6, 15);
    pointLight2.position.set(-5, -5, 2);
    scene.add(pointLight2);

    camera.position.z = 4;

    // Mouse Parallax
    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Initial vertices for displacement
    const initialPositions = geometry.attributes.position.array.slice();

    // Animation Loop
    let time = 0;
    const animate = () => {
      time += 0.005;
      
      // Procedural Morphing
      const positions = geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        const x = initialPositions[i];
        const y = initialPositions[i + 1];
        const z = initialPositions[i + 2];
        
        const noise = Math.sin(x * 2 + time) * Math.cos(y * 2 + time) * 0.2;
        const noise2 = Math.sin(z * 3 + time * 1.5) * 0.1;
        
        positions[i] = x * (1 + noise + noise2);
        positions[i + 1] = y * (1 + noise + noise2);
        positions[i + 2] = z * (1 + noise + noise2);
      }
      geometry.attributes.position.needsUpdate = true;

      // Parallax rotation
      mesh.rotation.y += 0.002 + mouse.x * 0.02;
      mesh.rotation.x += 0.001 + mouse.y * 0.02;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Dynamic Scroll Blur
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const blur = self.progress * 40;
        const opacity = 1 - (self.progress * 0.7);
        gsap.to(canvasRef.current, {
          filter: `blur(${blur}px)`,
          opacity: opacity,
          duration: 0.5,
          ease: "none"
        });
      }
    });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full -z-20 pointer-events-none"
    />
  );
}
