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

    const isMobile = window.innerWidth < 768;
    const cardWidth = isMobile ? (window.innerWidth - 48) : 560;
    const gap = isMobile ? 16 : 40;
    const moveX = -newIndex * (cardWidth + gap);

    gsap.to(scrollContainerRef.current, {
      x: moveX,
      duration: 1.2,
      ease: "expo.out",
    });
  };

  return (
    <section id="projects" className="relative py-24 md:py-40 overflow-hidden bg-[#030305]">
      <div className="container mx-auto px-6 mb-12 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12">
        <div className="space-y-4 md:space-y-6">
          <h2 className="text-5xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-none opacity-10 text-white select-none">
            LOCKED<br/>WORKS
          </h2>
          <div className="flex items-center gap-4 md:gap-6 text-primary font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-[10px] md:text-sm">
            Exhibition No. 04 <ArrowRight size={16} />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => slide('prev')}
            disabled={currentIndex === 0}
            className="w-12 h-12 md:w-16 md:h-16 rounded-full glass border border-white/10 flex items-center justify-center hover:bg-primary transition-all disabled:opacity-10 interactive"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => slide('next')}
            disabled={currentIndex === PROJECTS.length - 1}
            className="w-12 h-12 md:w-16 md:h-16 rounded-full glass border border-white/10 flex items-center justify-center hover:bg-primary transition-all disabled:opacity-10 interactive"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
      
      <div className="px-6 md:px-[10vw]">
        <div ref={scrollContainerRef} className="flex gap-4 md:gap-10 items-center">
          {PROJECTS.map((project, idx) => (
            <div 
              key={project.id} 
              className={`w-[calc(100vw-48px)] md:w-[560px] flex-shrink-0 transition-all duration-700 ${currentIndex === idx ? 'opacity-100' : 'opacity-20 scale-95'}`}
            >
              <div className="group relative glass-card p-6 md:p-8 overflow-hidden bg-white/[0.01]">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6 md:mb-8 shadow-xl">
                  <Image
                    src={project.img || ''}
                    alt={project.title}
                    fill
                    priority={idx === 0}
                    sizes="(max-width: 768px) 90vw, 560px"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-6 backdrop-blur-[2px]">
                    <button className="w-12 h-12 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform">
                      <ExternalLink size={20} className="text-primary" />
                    </button>
                    <button className="w-12 h-12 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform">
                      <Github size={20} />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <span className="text-primary font-black text-[9px] tracking-[0.4em] uppercase opacity-80">{project.type}</span>
                  <h3 className="text-2xl md:text-4xl font-bold tracking-tight text-white">{project.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-4 py-1.5 bg-white/5 rounded-full text-[10px] font-bold border border-white/10 text-white/50">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <div className="w-[40vw] flex-shrink-0 flex items-center justify-center">
            <button className="text-2xl md:text-5xl font-black hover:text-primary transition-all hover:scale-105 transform duration-700 gradient-text interactive tracking-tighter">
              VIEW ARCHIVE →
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-12 md:mt-20 flex items-center gap-4 md:gap-6">
        <div className="h-[2px] flex-1 bg-white/5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-700 ease-in-out"
            style={{ width: `${((currentIndex + 1) / PROJECTS.length) * 100}%` }}
          />
        </div>
        <span className="text-[10px] font-black font-mono tracking-tighter opacity-30 text-white">
          0{currentIndex + 1} / 0{PROJECTS.length}
        </span>
      </div>
    </section>
  );
}