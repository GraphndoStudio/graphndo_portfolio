
"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Palette, Database, Figma, Terminal, Globe, Layout, Brush } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
  { name: "HTML5", level: 95, icon: Globe, color: "#E34F26" },
  { name: "CSS3 / Tailwind", level: 90, icon: Layout, color: "#38B2AC" },
  { name: "JavaScript", level: 85, icon: Terminal, color: "#F7DF1E" },
  { name: "UI/UX Design", level: 90, icon: Figma, color: "#F24E1E" },
  { name: "Photoshop", level: 80, icon: Brush, color: "#31A8FF" },
  { name: "Bootstrap", level: 85, icon: Code2, color: "#7952B3" },
  { name: "Canva", level: 90, icon: Palette, color: "#00C4CC" },
  { name: "React / Next.js", level: 75, icon: Database, color: "#61DAFB" },
];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.from(".skill-card", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
      },
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out"
    });
  }, []);

  return (
    <section id="skills" ref={containerRef} className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Technical <span className="gradient-text">Mastery</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            My versatile toolkit allows me to handle everything from complex frontend logic to pixel-perfect visual branding.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILLS.map((skill) => (
            <motion.div
              key={skill.name}
              whileHover={{ y: -10 }}
              className="skill-card glass-card p-8 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                <skill.icon size={60} style={{ color: skill.color }} />
              </div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl glass border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <skill.icon size={24} style={{ color: skill.color }} />
                </div>
                <h3 className="text-xl font-bold mb-4">{skill.name}</h3>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    <span>Proficiency</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.5, delay: 0.2, ease: "circOut" }}
                      className="h-full bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6]"
                    />
                  </div>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
