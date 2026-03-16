"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { year: "2023", title: "Visual Genesis", desc: "Mastering the physics of pixels and the geometry of layout through core design studies." },
  { year: "2024", title: "Logic Architecture", desc: "Developing deep structural understanding of algorithmic efficiency and software patterns." },
  { year: "2025", title: "Industry Immersion", desc: "Scaling digital ecosystems at Skypark IT Tech, bridging engineering and human emotion." },
  { year: "2026", title: "Creative Agency", desc: "Currently architecting modern web experiences for a visionary roster of clients." },
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

        if (year && window.innerWidth > 768) {
          gsap.from(year, {
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse"
            },
            x: i % 2 === 0 ? -60 : 60,
            opacity: 0,
            duration: 1.5,
            ease: "power4.out"
          });
        }

        gsap.from(content, {
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse"
          },
          y: 40,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out"
        });

        gsap.from(dot, {
          scrollTrigger: {
            trigger: dot,
            start: "top 80%",
          },
          scale: 0,
          opacity: 0,
          duration: 0.8,
          ease: "back.out(2)"
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="journey" ref={containerRef} className="py-32 md:py-60 relative overflow-hidden bg-[#030305]">
      <div className="container mx-auto px-6">
        <header className="text-center mb-32 md:mb-60">
          <h2 className="text-5xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter text-white">
            The <span className="gradient-text">Odyssey</span>
          </h2>
          <p className="text-white/50 mt-4 md:mt-8 text-lg md:text-2xl max-w-2xl mx-auto font-medium">
            A chronological journey through the evolution of my digital craft.
          </p>
        </header>
        
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line Container */}
          <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/5 z-0" />
          
          <div 
            ref={lineRef}
            className="absolute left-6 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-secondary to-primary z-10 origin-top shadow-[0_0_15px_rgba(59,130,246,0.3)]" 
          />

          <div className="space-y-40 md:space-y-80">
            {STEPS.map((step, idx) => (
              <div key={step.year} className="timeline-item relative group pl-16 md:pl-0">
                <span className={`editorial-year transition-all duration-1000 group-hover:text-primary/10 hidden md:block ${idx % 2 === 0 ? '-left-12' : '-right-12'}`}>
                  {step.year}
                </span>

                <div className="timeline-dot absolute left-6 md:left-1/2 -translate-x-1/2 top-0 md:top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary z-20 shadow-[0_0_20px_rgba(59,130,246,0.6)]" />
                
                <div className={`flex ${idx % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                  <div className="timeline-content w-full md:max-w-md glass-card p-8 md:p-12 relative z-10 bg-white/[0.01]">
                    <span className="text-primary font-black text-[10px] tracking-[0.4em] uppercase mb-4 block opacity-80">
                      Milestone 0{idx + 1}
                    </span>
                    <h3 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 tracking-tight group-hover:gradient-text transition-all duration-500 text-white">
                      {step.title} — {step.year}
                    </h3>
                    <p className="text-base md:text-lg text-white/60 leading-relaxed font-medium">
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