
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !triggerRef.current) return;

    const ctx = gsap.context(() => {
      const totalWidth = sectionRef.current?.scrollWidth || 0;
      const windowWidth = window.innerWidth;

      gsap.to(sectionRef.current, {
        x: -(totalWidth - windowWidth),
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 1,
          end: () => `+=${totalWidth}`,
          anticipatePin: 1,
        },
      });
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={triggerRef} className="overflow-hidden bg-[#030305]">
      <div className="h-screen flex items-center">
        <div className="px-12 flex-shrink-0 w-screen">
          <h2 className="text-[10vw] font-bold tracking-tighter leading-none opacity-20">LOCKED<br/>WORKS</h2>
          <div className="mt-8 flex items-center gap-4 text-primary font-bold uppercase tracking-widest text-sm">
            Scroll to Navigate <ArrowRight size={20} className="animate-bounce-x" />
          </div>
        </div>
        
        <div ref={sectionRef} className="flex gap-20 px-24 items-center h-full">
          {PROJECTS.map((project) => (
            <div key={project.id} className="w-[80vw] md:w-[600px] flex-shrink-0">
              <div className="group relative glass-card p-6 overflow-hidden">
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-8">
                  <Image
                    src={project.img || ''}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-6">
                    <button className="w-14 h-14 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform">
                      <ExternalLink size={24} />
                    </button>
                    <button className="w-14 h-14 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform">
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
            <button className="text-[5vw] font-bold hover:text-primary transition-colors hover:scale-110 transform duration-500">
              VIEW ALL →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
