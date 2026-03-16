
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
    
    const name = nameRef.current.innerText;
    nameRef.current.innerHTML = name.split("").map(char => 
      `<span class="char-mask"><span class="char-inner" style="display:inline-block">${char === " " ? "&nbsp;" : char}</span></span>`
    ).join("");

    const ctx = gsap.context(() => {
      gsap.from(".char-inner", {
        y: 150,
        rotate: 15,
        opacity: 0,
        stagger: 0.05,
        duration: 1.2,
        ease: "expo.out",
        delay: 0.5
      });

      gsap.from(".hero-content > *", {
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        delay: 1.2
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-10 w-full max-w-6xl px-6">
        <div className="text-center space-y-8 hero-content">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <span className="inline-block px-5 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-[0.3em] uppercase mb-6 text-primary">
              Crafting Digital Experiences
            </span>
          </motion.div>

          <h1 ref={nameRef} className="text-[12vw] md:text-[8vw] font-bold tracking-tighter leading-none mb-4">
            Sharukh H
          </h1>
          
          <h2 className="text-2xl md:text-5xl font-bold text-white/90">
            Frontend Architect & <span className="gradient-text">Visual Storyteller</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
            Bridging the gap between complex engineering and human-centric design with modern web technologies.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-10">
            <button className="px-10 py-4 rounded-full bg-primary text-white font-bold hover:scale-105 transition-all shadow-2xl interactive">
              Get Started
            </button>
            <button className="px-10 py-4 rounded-full glass border border-white/10 font-bold hover:bg-white/10 transition-all interactive">
              View Showcase
            </button>
          </div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-50"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Initiate Discovery</span>
        <ChevronDown size={20} />
      </motion.div>
    </section>
  );
}
