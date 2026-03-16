
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const profileImg = PlaceHolderImages.find(img => img.id === 'profile')!;

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.from(".about-content > *", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out"
    });
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width;
    const y = (clientY - top) / height;
    
    const moveX = (x - 0.5) * 20;
    const moveY = (y - 0.5) * -20;
    
    gsap.to(imgRef.current, {
      rotateY: moveX,
      rotateX: moveY,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    if (!imgRef.current) return;
    gsap.to(imgRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  return (
    <section id="about" ref={containerRef} className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
        <div 
          className="relative group perspective-1000"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div ref={imgRef} className="relative aspect-square max-w-md mx-auto transform-style-3d">
            <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full scale-75 group-hover:scale-100 transition-transform duration-500" />
            <div className="glass-card w-full h-full p-4 transform-style-3d border-white/20">
              <div className="relative w-full h-full overflow-hidden rounded-xl">
                <Image
                  src={profileImg.imageUrl}
                  alt="Sharukh H"
                  fill
                  className="object-cover"
                  data-ai-hint={profileImg.imageHint}
                />
              </div>
            </div>
            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 glass-card p-4 translate-z-20">
              <span className="text-2xl">💻</span>
            </div>
            <div className="absolute -bottom-6 -left-6 glass-card p-4 translate-z-30">
              <span className="text-2xl">🎨</span>
            </div>
          </div>
        </div>

        <div className="about-content space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            I combine clean code with <span className="gradient-text">beautiful design</span>.
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            I am a Computer Science graduate passionate about creating modern web experiences and creative digital designs. My goal is to bridge the gap between complex engineering and human-centric design.
          </p>
          <div className="grid grid-cols-2 gap-8 pt-8">
            <div>
              <h4 className="text-3xl font-bold gradient-text">2+</h4>
              <p className="text-sm text-muted-foreground uppercase tracking-widest">Years Experience</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold gradient-text">50+</h4>
              <p className="text-sm text-muted-foreground uppercase tracking-widest">Projects Done</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
