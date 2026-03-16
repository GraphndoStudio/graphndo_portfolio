
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

    // High density geometry for smooth liquid ripples
    const geometry = new THREE.IcosahedronGeometry(2.2, 128);
    
    // Deep blue material to match the cinematic screenshot
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x1e3a8a, // Deep blue
      emissive: 0x1e3a8a,
      emissiveIntensity: 0.2,
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.9,
      thickness: 2.0,
      ior: 1.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Dynamic Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x3b82f6, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x1e40af, 40);
    pointLight2.position.set(-5, -5, 2);
    scene.add(pointLight2);

    camera.position.z = 5;

    // Mouse Tracking Logic for Parallax
    const mouse = { x: 0, y: 0 };
    const lerpedMouse = { x: 0, y: 0 };
    
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Vertex displacement storage
    const initialPositions = geometry.attributes.position.array.slice();

    // Animation Loop
    let time = 0;
    const animate = () => {
      time += 0.005;
      
      // Smooth interpolation for mouse responsiveness
      lerpedMouse.x += (mouse.x - lerpedMouse.x) * 0.05;
      lerpedMouse.y += (mouse.y - lerpedMouse.y) * 0.05;

      // Displacement logic
      const positions = geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        const x = initialPositions[i];
        const y = initialPositions[i + 1];
        const z = initialPositions[i + 2];
        
        const noise = Math.sin(x * 1.5 + time) * 0.25;
        const noise2 = Math.cos(y * 1.5 + time * 0.8) * 0.2;
        
        positions[i] = x * (1 + noise + noise2);
        positions[i + 1] = y * (1 + noise + noise2);
        positions[i + 2] = z * (1 + noise + noise2);
      }
      geometry.attributes.position.needsUpdate = true;

      // Enhanced Parallax: Mesh moves and rotates based on mouse
      mesh.rotation.y = time * 0.1 + lerpedMouse.x * 0.5;
      mesh.rotation.x = time * 0.05 + lerpedMouse.y * 0.5;
      
      mesh.position.x = lerpedMouse.x * 1.5;
      mesh.position.y = lerpedMouse.y * 1.5;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Scroll-based interactions
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const blur = self.progress * 35;
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
