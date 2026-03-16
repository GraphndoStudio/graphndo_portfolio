
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ExternalLink, Github, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import gsap from "gsap";

const PROJECTS = [
  {
    id: "lane-detection",
    title: "Lane Detection AI",
    type: "Machine Learning",
    img: PlaceHolderImages.find(i => i.id === 'lane-detection')?.imageUrl,
    tags: ["OpenCV", "Python"],
  },
  {
    id: "pos-system",
    title: "Enterprise POS",
    type: "Web Engine",
    img: PlaceHolderImages.find(i => i.id === 'pos-system')?.imageUrl,
    tags: ["React", "Firebase"],
  },
  {
    id: "social-designs",
    title: "Visual Branding",
    type: "Creative Design",
    img: PlaceHolderImages.find(i => i.id === 'social-design-1')?.imageUrl,
    tags: ["Adobe CC", "GSAP"],
  },
  {
    id: "next-gen-ui",
    title: "Synapse Studio",
    type: "Future Web",
    img: PlaceHolderImages.find(i => i.id === 'hero-bg')?.imageUrl,
    tags: ["Three.js", "Next.js"],
  }
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const slide = (direction: 'next' | 'prev') => {
    let newIndex = currentIndex;
    if (direction === 'next' && currentIndex < PROJECTS.length - 1) {
      newIndex++;
    } else if (direction === 'prev' && currentIndex > 0) {
      newIndex--;
    }

    if (newIndex === currentIndex) return;

    setCurrentIndex(newIndex);

    // Calculate displacement: card width (600) + gap (80)
    // On mobile, we might need a different approach, but sticking to desktop-first premium feel
    const moveX = -newIndex * (600 + 80);

    gsap.to(sectionRef.current, {
      x: moveX,
      duration: 1.2,
      ease: "expo.out",
    });

    // Animate the active card specifically for extra pop
    gsap.fromTo(
      `.project-card-${newIndex}`,
      { scale: 0.95, opacity: 0.5 },
      { scale: 1, opacity: 1, duration: 1, ease: "power3.out" }
    );
  };

  return (
    <section id="projects" className="relative py-32 overflow-hidden bg-[#030305]">
      <div className="container mx-auto px-6 mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none opacity-20">LOCKED<br/>WORKS</h2>
          <div className="flex items-center gap-4 text-primary font-bold uppercase tracking-widest text-sm">
            Exhibition No. 04 <ArrowRight size={16} />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => slide('prev')}
            disabled={currentIndex === 0}
            className="w-16 h-16 rounded-full glass border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all disabled:opacity-20 disabled:cursor-not-allowed interactive"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => slide('next')}
            disabled={currentIndex === PROJECTS.length - 1}
            className="w-16 h-16 rounded-full glass border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all disabled:opacity-20 disabled:cursor-not-allowed interactive"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
      
      <div className="px-6 md:px-24">
        <div ref={sectionRef} className="flex gap-20 items-center">
          {PROJECTS.map((project, idx) => (
            <div 
              key={project.id} 
              className={`w-[85vw] md:w-[600px] flex-shrink-0 project-card-${idx} transition-opacity duration-500 ${currentIndex === idx ? 'opacity-100' : 'opacity-40'}`}
            >
              <div className="group relative glass-card p-6 overflow-hidden">
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-8">
                  <Image
                    src={project.img || ''}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-6">
                    <button className="w-14 h-14 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform interactive">
                      <ExternalLink size={24} />
                    </button>
                    <button className="w-14 h-14 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform interactive">
                      <Github size={24} />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <span className="text-primary font-bold text-xs tracking-widest uppercase">{project.type}</span>
                  <h3 className="text-4xl font-bold tracking-tight">{project.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-4 py-1 bg-white/5 rounded-full text-[10px] font-bold border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <div className="w-[50vw] flex-shrink-0 flex items-center justify-center">
            <button className="text-3xl md:text-5xl font-bold hover:text-primary transition-all hover:scale-110 transform duration-500 gradient-text interactive">
              VIEW ARCHIVE →
            </button>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="container mx-auto px-6 mt-16 flex items-center gap-4">
        <div className="h-[2px] flex-1 bg-white/5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-1000 ease-expo"
            style={{ width: `${((currentIndex + 1) / PROJECTS.length) * 100}%` }}
          />
        </div>
        <span className="text-xs font-bold font-mono tracking-tighter opacity-50">
          0{currentIndex + 1} / 0{PROJECTS.length}
        </span>
      </div>
    </section>
  );
}
