
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
    
    const nameText = "SHARUKH H";
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
        <div className="text-center space-y-12 hero-content">
          <h1 ref={nameRef} className="text-[14vw] md:text-[12vw] font-bold tracking-tighter leading-none mb-4 text-white uppercase">
            SHARUKH H
          </h1>
          
          <div className="space-y-4">
            <p className="text-xs font-black tracking-[0.8em] uppercase text-white/40 mb-12">
              Innovate . Design . Deliver
            </p>
            
            <div className="flex justify-center">
              <button className="px-10 py-4 rounded-full bg-white text-black font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-2xl interactive">
                Explore Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 opacity-20"
      >
        <ChevronDown size={24} className="text-white" />
      </motion.div>
    </section>
  );
}
