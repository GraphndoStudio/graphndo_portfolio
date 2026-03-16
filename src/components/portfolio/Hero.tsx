
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 400]);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const context = gsap.context(() => {
      gsap.to(".hero-bg-glow", {
        duration: 8,
        scale: 1.2,
        opacity: 0.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, containerRef);

    return () => context.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="hero-bg-glow absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" />
        <div className="hero-bg-glow absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[150px]" />
      </div>

      <motion.div style={{ y }} className="relative z-10 w-full max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card p-12 md:p-20 text-center relative overflow-hidden"
        >
          {/* Subtle line reveal animation area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold tracking-widest uppercase mb-6 text-primary">
              Welcome to my world
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-4 leading-none">
            Sharukh H
          </h1>
          
          <h2 className="text-xl md:text-3xl font-medium text-muted-foreground mb-8">
            Frontend Developer & <span className="gradient-text">Creative Designer</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-lg mx-auto mb-10 leading-relaxed font-light">
            Crafting modern web experiences with code and design. Based in the beautiful Nilgiris.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button className="px-8 py-3 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-all hover:scale-105 interactive">
              Hire Me
            </button>
            <button className="px-8 py-3 rounded-full glass border border-white/10 font-semibold hover:bg-white/10 transition-all interactive">
              View My Work
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-50"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-medium">Scroll to explore</span>
        <ChevronDown size={20} />
      </motion.div>
    </section>
  );
}
