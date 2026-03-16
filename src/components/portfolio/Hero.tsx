
"use client";

import { motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !nameRef.current) return;
    
    const nameText = "SHARUKH H";
    nameRef.current.innerHTML = nameText.split("").map(char => 
      `<span class="char-mask"><span class="char-inner" style="display:inline-block">${char === " " ? "&nbsp;" : char}</span></span>`
    ).join("");

    const ctx = gsap.context(() => {
      // Cinematic Entrance Animation
      gsap.from(".char-inner", {
        y: "110%",
        rotate: 8,
        opacity: 0,
        stagger: 0.04,
        duration: 2.2,
        ease: "expo.out",
        delay: 0.3
      });

      gsap.from(".hero-content-stagger", {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1.8,
        ease: "power4.out",
        delay: 1.2
      });

      // Smooth Parallax for the text group with lerping handled via GSAP
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 50;
        const yPos = (clientY / window.innerHeight - 0.5) * 50;

        gsap.to(contentRef.current, {
          x: xPos,
          y: yPos,
          duration: 2,
          ease: "power3.out"
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div ref={contentRef} className="relative z-10 w-full max-w-7xl px-6">
        <div className="text-center space-y-12">
          <div className="hero-content-stagger">
            <span className="text-xs font-black tracking-[1em] uppercase text-primary/80 mb-6 block">
              EST. 2024 / NILGIRIS
            </span>
          </div>

          <h1 ref={nameRef} className="text-[16vw] md:text-[14vw] font-bold tracking-tighter leading-[0.8] mb-8 text-white uppercase select-none">
            SHARUKH H
          </h1>
          
          <div className="space-y-10 hero-content-stagger">
            <div className="flex flex-col items-center gap-4">
              <p className="text-sm md:text-lg font-medium tracking-[0.4em] uppercase text-white/40">
                Creative Developer <span className="text-primary mx-2">•</span> UI Architect
              </p>
              
              <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
            
            <div className="flex justify-center pt-8">
              <button className="group relative px-12 py-5 rounded-full bg-white text-black font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.5)] interactive flex items-center gap-3">
                Explore Portfolio
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Year Anchor - Subtle Breath */}
      <motion.div 
        animate={{ opacity: [0.015, 0.03, 0.015] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none"
      >
        <span className="text-[40vw] font-black leading-none text-white">2024</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 opacity-30"
      >
        <span className="text-[10px] font-black tracking-[0.3em] uppercase mb-2">Scroll</span>
        <ChevronDown size={20} className="text-white" />
      </motion.div>
    </section>
  );
}
