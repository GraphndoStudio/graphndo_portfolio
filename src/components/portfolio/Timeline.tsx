
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

        // Fade and scale for the year
        gsap.from(year, {
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          x: i % 2 === 0 ? -50 : 50,
          opacity: 0,
          duration: 1.5,
          ease: "power4.out"
        });

        // Fade and slide for the content card
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

        // Dot pulse when reached
        gsap.from(dot, {
          scrollTrigger: {
            trigger: dot,
            start: "top 80%",
          },
          scale: 0,
          opacity: 0,
          duration: 0.8,
          ease: "back.out(1.7)"
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="journey" ref={containerRef} className="py-60 relative overflow-hidden bg-[#030305]">
      <div className="container mx-auto px-6">
        <header className="text-center mb-40">
          <h2 className="text-6xl md:text-9xl font-bold tracking-tighter">
            The <span className="gradient-text">Odyssey</span>
          </h2>
          <p className="text-muted-foreground mt-6 text-xl max-w-xl mx-auto">
            A chronological journey through the evolution of my digital craft.
          </p>
        </header>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-0">
          {/* Central Vertical Line Track */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/5 z-0" />
          
          {/* Animated Progress Line */}
          <div 
            ref={lineRef}
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-secondary to-primary z-10 origin-top" 
          />

          <div className="space-y-60">
            {STEPS.map((step, idx) => (
              <div key={step.year} className="timeline-item relative group">
                {/* Year Label */}
                <span className={`editorial-year transition-colors duration-500 group-hover:text-primary/10 ${idx % 2 === 0 ? '-left-10' : '-right-10'}`}>
                  {step.year}
                </span>

                {/* Central Connector Dot */}
                <div className="timeline-dot absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary z-20 shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                
                <div className={`flex ${idx % 2 === 0 ? 'md:justify-end justify-center' : 'md:justify-start justify-center'}`}>
                  <div className="timeline-content w-full md:max-w-xl glass-card p-8 md:p-12 relative z-10 backdrop-blur-3xl hover:border-primary/30 transition-colors">
                    <span className="text-primary font-bold text-xs tracking-[0.4em] uppercase mb-6 block">
                      Milestone 0{idx + 1}
                    </span>
                    <h3 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight group-hover:gradient-text transition-all duration-500">
                      {step.title}
                    </h3>
                    <p className="text-lg md:text-xl text-white/60 leading-relaxed font-medium">
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
