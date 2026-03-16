"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { year: "2023", title: "Visual Genesis", desc: "Mastering the physics of pixels and the geometry of layout through core design studies." },
  { year: "2024", title: "Logic Architecture", desc: "Developing deep structural understanding of algorithmic efficiency and software patterns." },
  { year: "2025", title: "Industry Immersion", desc: "Scaling digital ecosystems at Skypark IT Tech, bridging engineering and human emotion." },
  { year: "2026", title: "Creative Agency", desc: "Currently architecting modern web experiences for a global roster of visionary clients." },
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !lineRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Timeline Line Drawing Animation
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 25%",
            end: "bottom 75%",
            scrub: true,
          },
        }
      );

      // 2. Individual Item Animations
      const items = gsap.utils.toArray(".timeline-item");
      
      items.forEach((item: any, i: number) => {
        const year = item.querySelector(".editorial-year");
        const content = item.querySelector(".timeline-content");
        const dot = item.querySelector(".timeline-dot");

        gsap.from(year, {
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          x: i % 2 === 0 ? -100 : 100,
          opacity: 0,
          duration: 2,
          ease: "power4.out"
        });

        gsap.from(content, {
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse"
          },
          y: 60,
          opacity: 0,
          duration: 1.5,
          ease: "power3.out"
        });

        gsap.from(dot, {
          scrollTrigger: {
            trigger: dot,
            start: "top 80%",
          },
          scale: 0,
          opacity: 0,
          duration: 1,
          ease: "back.out(2)"
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="journey" ref={containerRef} className="py-60 relative overflow-hidden bg-[#030305]">
      <div className="container mx-auto px-6">
        <header className="text-center mb-60">
          <h2 className="text-7xl md:text-[10rem] font-bold tracking-tighter text-white">
            The <span className="gradient-text">Odyssey</span>
          </h2>
          <p className="text-white/50 mt-8 text-2xl max-w-2xl mx-auto font-medium">
            A chronological journey through the evolution of my digital craft.
          </p>
        </header>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-0">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/5 z-0" />
          
          <div 
            ref={lineRef}
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-secondary to-primary z-10 origin-top shadow-[0_0_15px_rgba(59,130,246,0.3)]" 
          />

          <div className="space-y-80">
            {STEPS.map((step, idx) => (
              <div key={step.year} className="timeline-item relative group">
                <span className={`editorial-year transition-all duration-1000 group-hover:text-primary/10 ${idx % 2 === 0 ? '-left-20' : '-right-20'}`}>
                  {step.year}
                </span>

                <div className="timeline-dot absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-background border-2 border-primary z-20 shadow-[0_0_20px_rgba(59,130,246,0.8)] animate-pulse" />
                
                <div className={`flex ${idx % 2 === 0 ? 'md:justify-end justify-center' : 'md:justify-start justify-center'}`}>
                  <div className="timeline-content w-full md:max-w-xl glass-card p-10 md:p-16 relative z-10 backdrop-blur-3xl hover:border-primary/40 transition-all duration-500 bg-white/[0.01]">
                    <span className="text-primary font-black text-xs tracking-[0.5em] uppercase mb-8 block opacity-80">
                      Milestone 0{idx + 1}
                    </span>
                    <h3 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight group-hover:gradient-text transition-all duration-500 text-white">
                      {step.title}
                    </h3>
                    <p className="text-xl md:text-2xl text-white/60 leading-relaxed font-medium">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}