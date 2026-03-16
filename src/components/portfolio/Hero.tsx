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
    // Inject spans for character animation
    nameRef.current.innerHTML = nameText.split("").map(char => 
      `<span class="char-mask"><span class="char-inner" style="display:inline-block">${char === " " ? "&nbsp;" : char}</span></span>`
    ).join("");

    const ctx = gsap.context(() => {
      const charInners = nameRef.current?.querySelectorAll(".char-inner");
      const staggers = containerRef.current?.querySelectorAll(".hero-content-stagger");

      if (charInners && charInners.length > 0) {
        gsap.from(charInners, {
          y: "110%",
          rotate: 8,
          opacity: 0,
          stagger: 0.04,
          duration: 2.2,
          ease: "expo.out",
          delay: 0.3
        });
      }

      if (staggers && staggers.length > 0) {
        gsap.from(staggers, {
          y: 60,
          opacity: 0,
          stagger: 0.15,
          duration: 1.8,
          ease: "power4.out",
          delay: 1.2
        });
      }

      const handleMouseMove = (e: MouseEvent) => {
        if (!contentRef.current || window.innerWidth < 768) return;
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 30;
        const yPos = (clientY / window.innerHeight - 0.5) * 30;

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

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      <div ref={contentRef} className="relative z-10 w-full max-w-7xl">
        <div className="text-center space-y-8 md:space-y-12">
          <div className="hero-content-stagger">
            <span className="text-[10px] md:text-xs font-black tracking-[0.6em] md:tracking-[1em] uppercase text-primary/80 mb-4 md:mb-6 block">
              EST. 2024 / NILGIRIS
            </span>
          </div>

          <h1 ref={nameRef} className="text-[12vw] md:text-[10vw] font-bold tracking-tighter leading-[0.9] mb-6 md:mb-8 text-white uppercase select-none">
            SHARUKH H
          </h1>
          
          <div className="space-y-6 md:space-y-10 hero-content-stagger">
            <div className="flex flex-col items-center gap-2 md:gap-4">
              <p className="text-[10px] md:text-base font-medium tracking-[0.3em] md:tracking-[0.4em] uppercase text-white/40">
                Creative Developer <span className="text-primary mx-2">•</span> UI Architect
              </p>
              
              <div className="h-[1px] w-16 md:w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
            
            <div className="flex justify-center pt-4 md:pt-8">
              <button 
                onClick={scrollToProjects}
                className="group relative px-8 md:px-12 py-4 md:py-5 rounded-full bg-white text-black font-bold uppercase tracking-widest text-[10px] md:text-xs hover:scale-105 transition-all shadow-xl interactive flex items-center gap-3"
              >
                Explore Portfolio
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <motion.div 
        animate={{ opacity: [0.01, 0.02, 0.01] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none"
      >
        <span className="text-[30vw] font-black leading-none text-white select-none">2024</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-30"
      >
        <span className="text-[9px] font-black tracking-[0.3em] uppercase mb-1">Scroll</span>
        <ChevronDown size={18} className="text-white" />
      </motion.div>
    </section>
  );
}
