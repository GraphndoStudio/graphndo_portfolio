
"use client";

import { useEffect } from "react";
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

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative">
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
    </main>
  );
}
