"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About({ data }: { data?: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const profileImg = PlaceHolderImages.find(img => img.id === 'profile');

  const headline = data?.headline || "Clean Code Meets Emotional Design.";
  const description = data?.description || "I am a creative architect specializing in frontend technologies. My journey is defined by a relentless pursuit of pixel perfection and fluid user experiences.";
  const experience = data?.experience || "2+";
  const projectsCount = data?.projectsCount || "50+";
  const cloudProfileImg = data?.profileImg || profileImg?.imageUrl;

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Smooth Staggered Entrance
      gsap.from(".section-wrap", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        },
        y: 80,
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
            start: "top 92%",
          },
          y: 20,
          opacity: 0,
          duration: 1.2,
          ease: "expo.out"
        });
      });

      // Image Parallax on Scroll
      if (window.innerWidth > 768 && imgRef.current) {
        gsap.to(imgRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          },
          y: -40,
          ease: "none"
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (!profileImg) return null;

  return (
    <section id="about" ref={containerRef} className="py-24 md:py-40 relative">
      <div className="container mx-auto px-6 section-wrap">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="relative group max-w-md mx-auto lg:max-w-none w-full">
            <div ref={imgRef} className="relative aspect-[4/5] rounded-[2rem] overflow-hidden glass-card p-2 shadow-2xl bg-white/[0.02]">
              <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden bg-[#0a0a0c]">
                <Image
                  src={cloudProfileImg || ''}
                  alt="Sharukh H"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  className="object-cover transition-all duration-1000 scale-105 group-hover:scale-100"
                  data-ai-hint={profileImg?.imageHint}
                />
              </div>
            </div>
          </div>

          <div className="space-y-8 md:space-y-12 text-center lg:text-left">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight reveal-p text-white">
              {headline}
            </h2>
            
            <div className="space-y-6 md:space-y-8 text-lg md:text-xl text-white/70 leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0">
              <p className="reveal-p">
                {description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 md:gap-12 pt-6 reveal-p">
              <div className="space-y-1 border-l-2 border-primary/30 pl-6 md:pl-8 text-left">
                <h4 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">{experience}</h4>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">Years of Vision</p>
              </div>
              <div className="space-y-1 border-l-2 border-secondary/30 pl-6 md:pl-8 text-left">
                <h4 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">{projectsCount}</h4>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">Digital Artifacts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
