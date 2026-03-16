
"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

const STEPS = [
  { year: "2023", title: "Started Graphic Design", desc: "Begun my journey in visual storytelling, mastering Photoshop and core design principles." },
  { year: "2024", title: "Computer Science Studies", desc: "Dived deep into algorithms, data structures, and the fundamentals of software engineering." },
  { year: "2025", title: "Web Development Internship", desc: "Hands-on experience building real-world applications at Skypark IT Tech." },
  { year: "2026", title: "Frontend Developer & Freelancer", desc: "Currently shaping digital experiences for clients worldwide with cutting-edge tech." },
];

export default function Timeline() {
  return (
    <section id="journey" className="py-32 relative">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-bold mb-20 text-center">My Professional <span className="gradient-text">Journey</span></h2>
        
        <div className="max-w-4xl mx-auto relative">
          {/* Central Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-transparent" />

          <div className="space-y-24">
            {STEPS.map((step, idx) => (
              <motion.div
                key={step.year}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className={`relative flex items-center gap-12 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Content */}
                <div className="flex-1">
                  <div className={`glass-card p-8 group hover:bg-white/10 transition-colors ${idx % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <span className="text-3xl font-bold gradient-text mb-2 block">{step.year}</span>
                    <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </div>

                {/* Dot */}
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary shadow-[0_0_20px_rgba(59,130,246,0.8)] z-10" />

                {/* Spacer */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
