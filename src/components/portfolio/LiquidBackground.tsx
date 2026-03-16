
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
    const geometry = new THREE.IcosahedronGeometry(2.5, 128);
    
    // Glass-Liquid Material
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x1e3a8a,
      emissive: 0x0f172a,
      emissiveIntensity: 0.5,
      metalness: 0.2,
      roughness: 0.1,
      transmission: 0.95,
      thickness: 1.5,
      ior: 1.45,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.5,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Dynamic Lighting System
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x3b82f6, 80);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x8b5cf6, 60);
    pointLight2.position.set(-5, -5, 2);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xec4899, 40);
    pointLight3.position.set(0, 0, 8);
    scene.add(pointLight3);

    camera.position.z = 6;

    // Mouse Tracking Logic
    const mouse = { x: 0, y: 0 };
    const lerpedMouse = { x: 0, y: 0 };
    
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const initialPositions = geometry.attributes.position.array.slice();

    // Animation Loop
    let time = 0;
    const animate = () => {
      time += 0.006;
      
      lerpedMouse.x += (mouse.x - lerpedMouse.x) * 0.04;
      lerpedMouse.y += (mouse.y - lerpedMouse.y) * 0.04;

      // Organic Displacement Logic
      const positions = geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        const x = initialPositions[i];
        const y = initialPositions[i + 1];
        const z = initialPositions[i + 2];
        
        const noise = Math.sin(x * 1.2 + time) * 0.3;
        const noise2 = Math.cos(y * 1.5 + time * 0.7) * 0.25;
        const noise3 = Math.sin(z * 0.8 + time * 1.2) * 0.2;
        
        const factor = 1 + noise + noise2 + noise3;
        positions[i] = x * factor;
        positions[i + 1] = y * factor;
        positions[i + 2] = z * factor;
      }
      geometry.attributes.position.needsUpdate = true;

      // Parallax interaction
      mesh.rotation.y = time * 0.1 + lerpedMouse.x * 0.4;
      mesh.rotation.x = time * 0.05 + lerpedMouse.y * 0.3;
      
      mesh.position.x = lerpedMouse.x * 1.2;
      mesh.position.y = lerpedMouse.y * 1.2;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Dynamic Scroll Interaction (Blur & Scale)
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const blurValue = self.progress * 30;
        const scaleValue = 1 + (self.progress * 0.5);
        const opacityValue = 1 - (self.progress * 0.6);
        
        gsap.to(canvasRef.current, {
          filter: `blur(${blurValue}px)`,
          opacity: opacityValue,
          scale: scaleValue,
          duration: 0.8,
          ease: "power2.out"
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
      className="fixed inset-0 w-full h-full -z-20 pointer-events-none bg-[#030305]"
    />
  );
}
