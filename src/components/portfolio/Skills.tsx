
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
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Skills() {
  return (
    <section id="skills" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
          >
            Technical <span className="gradient-text">Mastery</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto text-lg font-medium"
          >
            My versatile toolkit allows me to handle everything from complex frontend logic to pixel-perfect visual branding.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {SKILLS.map((skill) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="skill-card glass-card p-8 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                <skill.icon size={60} style={{ color: skill.color }} />
              </div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl glass border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <skill.icon size={24} style={{ color: skill.color }} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">{skill.name}</h3>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    <span>Proficiency</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
                      className="h-full bg-gradient-to-r from-primary to-secondary"
                    />
                  </div>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
