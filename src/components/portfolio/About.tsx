
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const profileImg = PlaceHolderImages.find(img => img.id === 'profile')!;

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Staggered Entrance logic
      gsap.from(".section-wrap", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        },
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out"
      });

      // Line by Line Reveal
      const lines = gsap.utils.toArray(".reveal-p");
      lines.forEach((line: any) => {
        gsap.from(line, {
          scrollTrigger: {
            trigger: line,
            start: "top 90%",
          },
          y: 20,
          opacity: 0,
          duration: 1,
          ease: "power2.out"
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="py-40 relative">
      <div className="container mx-auto px-6 section-wrap">
        <div className="grid md:grid-cols-2 gap-24 items-center">
          <div className="relative group">
            <div ref={imgRef} className="relative aspect-[4/5] rounded-[2rem] overflow-hidden glass-card p-3">
              <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden">
                <Image
                  src={profileImg.imageUrl}
                  alt="Sharukh H"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                  data-ai-hint={profileImg.imageHint}
                />
              </div>
            </div>
            {/* Floating Editorial Accents */}
            <div className="absolute -top-10 -right-10 w-40 h-40 border border-white/10 rounded-full animate-spin-slow pointer-events-none" />
          </div>

          <div className="space-y-10">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none reveal-p">
              Clean Code Meets <br />
              <span className="gradient-text">Emotional Design.</span>
            </h2>
            
            <div className="space-y-6 text-xl text-white/70 leading-relaxed font-medium">
              <p className="reveal-p">
                I am a creative architect specializing in frontend technologies. My journey is defined by a relentless pursuit of pixel perfection and fluid user experiences.
              </p>
              <p className="reveal-p">
                Every project is a story told through interaction, motion, and structure. I don't just build websites; I craft digital legacies that resonate with users.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-12 pt-10 reveal-p">
              <div className="space-y-2 border-l-2 border-primary/30 pl-6">
                <h4 className="text-4xl font-bold">2+</h4>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Years of Vision</p>
              </div>
              <div className="space-y-2 border-l-2 border-secondary/30 pl-6">
                <h4 className="text-4xl font-bold">50+</h4>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Digital Artifacts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
