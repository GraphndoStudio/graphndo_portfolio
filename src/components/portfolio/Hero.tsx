"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current || !nameRef.current) return;
    
    const nameText = "Sharukh H";
    nameRef.current.innerHTML = nameText.split("").map(char => 
      `<span class="char-mask"><span class="char-inner" style="display:inline-block">${char === " " ? "&nbsp;" : char}</span></span>`
    ).join("");

    const ctx = gsap.context(() => {
      gsap.from(".char-inner", {
        y: 150,
        rotate: 15,
        opacity: 0,
        stagger: 0.08,
        duration: 1.5,
        ease: "expo.out",
        delay: 0.5
      });

      gsap.from(".hero-content > *", {
        y: 40,
        opacity: 0,
        stagger: 0.3,
        duration: 1.2,
        ease: "power3.out",
        delay: 1.2
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-10 w-full max-w-6xl px-6">
        <div className="text-center space-y-10 hero-content">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <span className="inline-block px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs font-black tracking-[0.4em] uppercase mb-8 text-primary shadow-xl">
              Crafting Digital Legacies
            </span>
          </motion.div>

          <h1 ref={nameRef} className="text-[14vw] md:text-[10vw] font-bold tracking-tighter leading-none mb-6 text-white">
            Sharukh H
          </h1>
          
          <h2 className="text-2xl md:text-5xl font-semibold text-white/95">
            Frontend Architect & <span className="gradient-text">Visual Storyteller</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto leading-relaxed font-medium">
            Bridging the gap between complex engineering and human-centric design with modern web technologies.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 pt-12">
            <button className="px-12 py-5 rounded-full bg-primary text-white font-bold hover:scale-105 transition-all shadow-[0_0_40px_rgba(59,130,246,0.4)] interactive text-lg">
              Get Started
            </button>
            <button className="px-12 py-5 rounded-full glass border border-white/10 font-bold hover:bg-white/10 transition-all interactive text-lg">
              View Showcase
            </button>
          </div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 opacity-40"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] font-black">Initiate Discovery</span>
        <ChevronDown size={24} className="text-primary" />
      </motion.div>
    </section>
  );
}