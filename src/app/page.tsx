
"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";
import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import Projects from "@/components/portfolio/Projects";
import Timeline from "@/components/portfolio/Timeline";
import CTA from "@/components/portfolio/CTA";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";
import CustomCursor from "@/components/portfolio/CustomCursor";
import LiquidBackground from "@/components/portfolio/LiquidBackground";
import SplashScreen from "@/components/portfolio/SplashScreen";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) return;

    // Fine-tuned Lenis for "Weighty" premium feel
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, [loading]);

  return (
    <main className="relative bg-[#030305]">
      <AnimatePresence>
        {loading && (
          <SplashScreen onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>
      
      {!loading && (
        <>
          <LiquidBackground />
          <CustomCursor />
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Timeline />
          <CTA />
          <Contact />
          <Footer />
        </>
      )}
    </main>
  );
}
