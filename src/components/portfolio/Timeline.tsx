
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

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".timeline-item");
      
      items.forEach((item: any, i: number) => {
        const year = item.querySelector(".editorial-year");
        const content = item.querySelector(".timeline-content");

        gsap.from(year, {
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
          },
          x: -100,
          opacity: 0,
          duration: 1.5,
          ease: "power4.out"
        });

        gsap.from(content, {
          scrollTrigger: {
            trigger: item,
            start: "top 70%",
          },
          y: 50,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out"
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="journey" ref={containerRef} className="py-60 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="text-6xl md:text-9xl font-bold mb-40 tracking-tighter text-center">
          The <span className="gradient-text">Odyssey</span>
        </h2>
        
        <div className="max-w-5xl mx-auto space-y-60">
          {STEPS.map((step, idx) => (
            <div key={step.year} className="timeline-item relative">
              <span className={`editorial-year ${idx % 2 === 0 ? '-left-10' : '-right-10'}`}>
                {step.year}
              </span>
              
              <div className={`flex ${idx % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                <div className="timeline-content max-w-xl glass-card p-12 relative z-10 backdrop-blur-3xl">
                  <span className="text-primary font-bold text-xs tracking-[0.4em] uppercase mb-6 block">
                    Milestone 0{idx + 1}
                  </span>
                  <h3 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">{step.title}</h3>
                  <p className="text-xl text-white/60 leading-relaxed font-medium">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
