
"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";
import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import Projects from "@/components/portfolio/Projects";
import DesignGallery from "@/components/portfolio/DesignGallery";
import Timeline from "@/components/portfolio/Timeline";
import Certificates from "@/components/portfolio/Certificates";
import Platforms from "@/components/portfolio/Platforms";
import CTA from "@/components/portfolio/CTA";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";
import CustomCursor from "@/components/portfolio/CustomCursor";
import LiquidBackground from "@/components/portfolio/LiquidBackground";
import SplashScreen from "@/components/portfolio/SplashScreen";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence } from "framer-motion";
import { usePortfolioData } from "@/lib/usePortfolioData";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { data, loading: dataLoading } = usePortfolioData();

  useEffect(() => {
    if (loading || dataLoading) return;

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
  }, [loading, dataLoading]);

  // Determine visibility
  const isVisible = (section: string) => {
    if (!data) return true; // Default to visible if data hasn't loaded (fallback)
    return data.visibility?.[section] !== false;
  };

  return (
    <main className="relative bg-[#030305]">
      <AnimatePresence>
        {(loading || dataLoading) && (
          <SplashScreen onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>
      
      {!loading && !dataLoading && (
        <>
          <LiquidBackground />
          <CustomCursor />
          <Navbar />
          
          {isVisible('hero') && <Hero data={data?.hero} />}
          {isVisible('about') && <About data={data?.about} />}
          {isVisible('skills') && <Skills data={data?.skills} />}
          {isVisible('projects') && <Projects data={data?.projects} />}
          {isVisible('gallery') && <DesignGallery data={data?.gallery} />}
          {isVisible('journey') && <Timeline data={data?.journey} />}
          {isVisible('credentials') && <Certificates data={data?.credentials} />}
          {isVisible('platforms') && <Platforms data={data?.platforms} />}
          
          {isVisible('cta') && <CTA />}
          {isVisible('contact') && <Contact />}
          {isVisible('footer') && <Footer />}
        </>
      )}
    </main>
  );
}

