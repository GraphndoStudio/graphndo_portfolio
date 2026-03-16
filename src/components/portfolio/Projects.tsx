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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
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

    // Dynamic sizing calculation
    const isMobile = window.innerWidth < 768;
    const cardWidth = isMobile ? window.innerWidth * 0.85 : 600;
    const gap = isMobile ? 40 : 80;
    const moveX = -newIndex * (cardWidth + gap);

    gsap.to(scrollContainerRef.current, {
      x: moveX,
      duration: 1.5,
      ease: "expo.out",
    });

    // Animate active state
    PROJECTS.forEach((_, idx) => {
      gsap.to(`.project-card-${idx}`, {
        opacity: idx === newIndex ? 1 : 0.3,
        scale: idx === newIndex ? 1 : 0.9,
        duration: 1,
        ease: "power3.out"
      });
    });
  };

  return (
    <section id="projects" className="relative py-40 overflow-hidden bg-[#030305]">
      <div className="container mx-auto px-6 mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
        <div className="space-y-6">
          <h2 className="text-7xl md:text-[12rem] font-black tracking-tighter leading-none opacity-10 text-white select-none">
            LOCKED<br/>WORKS
          </h2>
          <div className="flex items-center gap-6 text-primary font-black uppercase tracking-[0.4em] text-sm">
            Exhibition No. 04 <ArrowRight size={20} />
          </div>
        </div>

        <div className="flex gap-6">
          <button
            onClick={() => slide('prev')}
            disabled={currentIndex === 0}
            className="w-20 h-20 rounded-full glass border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all disabled:opacity-10 disabled:cursor-not-allowed interactive shadow-2xl"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={() => slide('next')}
            disabled={currentIndex === PROJECTS.length - 1}
            className="w-20 h-20 rounded-full glass border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all disabled:opacity-10 disabled:cursor-not-allowed interactive shadow-2xl"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      </div>
      
      <div className="px-6 md:px-[15vw]">
        <div ref={scrollContainerRef} className="flex gap-10 md:gap-20 items-center">
          {PROJECTS.map((project, idx) => (
            <div 
              key={project.id} 
              className={`w-[85vw] md:w-[600px] flex-shrink-0 project-card-${idx} transition-all duration-700 ${currentIndex === idx ? 'opacity-100' : 'opacity-30 scale-90'}`}
            >
              <div className="group relative glass-card p-8 md:p-10 overflow-hidden bg-white/[0.01]">
                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden mb-10 shadow-2xl">
                  <Image
                    src={project.img || ''}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-8 backdrop-blur-sm">
                    <button className="w-16 h-16 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform interactive border-primary/50">
                      <ExternalLink size={28} className="text-primary" />
                    </button>
                    <button className="w-16 h-16 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform interactive">
                      <Github size={28} />
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  <span className="text-primary font-black text-xs tracking-[0.5em] uppercase opacity-80">{project.type}</span>
                  <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-white">{project.title}</h3>
                  <div className="flex flex-wrap gap-3">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-6 py-2 bg-white/5 rounded-full text-xs font-bold border border-white/10 text-white/70">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <div className="w-[50vw] flex-shrink-0 flex items-center justify-center">
            <button className="text-4xl md:text-7xl font-black hover:text-primary transition-all hover:scale-110 transform duration-700 gradient-text interactive tracking-tighter">
              VIEW ARCHIVE →
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-24 flex items-center gap-6">
        <div className="h-[3px] flex-1 bg-white/5 rounded-full overflow-hidden shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 ease-expo shadow-[0_0_10px_rgba(59,130,246,0.5)]"
            style={{ width: `${((currentIndex + 1) / PROJECTS.length) * 100}%` }}
          />
        </div>
        <span className="text-sm font-black font-mono tracking-tighter opacity-40 text-white">
          0{currentIndex + 1} / 0{PROJECTS.length}
        </span>
      </div>
    </section>
  );
}