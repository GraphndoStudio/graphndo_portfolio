"use client";

import { motion } from "framer-motion";
import { Code2, Palette, Database, Figma, Terminal, Globe, Layout, Brush } from "lucide-react";

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Skills() {
  return (
    <section id="skills" className="py-40 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold mb-8 tracking-tight"
          >
            Technical <span className="gradient-text">Mastery</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 max-w-3xl mx-auto text-xl font-medium leading-relaxed"
          >
            My versatile toolkit allows me to handle everything from complex frontend logic to pixel-perfect visual branding.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {SKILLS.map((skill) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              whileHover={{ y: -12, scale: 1.02 }}
              className="skill-card glass-card p-10 group relative overflow-hidden bg-white/[0.02]"
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-all duration-700">
                <skill.icon size={100} style={{ color: skill.color }} />
              </div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl glass border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-lg">
                  <skill.icon size={32} style={{ color: skill.color }} />
                </div>
                <h3 className="text-2xl font-bold mb-6 text-white group-hover:text-primary transition-colors">{skill.name}</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-xs font-black text-white/40 uppercase tracking-[0.2em]">
                    <span>Expertise</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 2, delay: 0.5, ease: "circOut" }}
                      className="h-full bg-gradient-to-r from-primary via-secondary to-primary shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                    />
                  </div>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}