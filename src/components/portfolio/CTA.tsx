
"use client";

import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative glass-card p-20 text-center overflow-hidden group"
        >
          {/* Animated Background Gradients */}
          <div className="absolute inset-0 -z-10 opacity-30 group-hover:opacity-50 transition-opacity">
            <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-primary/20 blur-[120px] animate-pulse" />
            <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-secondary/20 blur-[120px] animate-pulse delay-700" />
          </div>

          <h2 className="text-4xl md:text-7xl font-bold mb-8 leading-tight">
            Let's build something <br />
            <span className="gradient-text">amazing together</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Whether you have a fully-formed idea or just the start of something great, I'm here to help you bring it to life.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <button className="px-10 py-4 rounded-full bg-primary text-white font-bold hover:scale-105 transition-all shadow-[0_0_30px_rgba(59,130,246,0.3)] interactive">
              Hire Me Now
            </button>
            <button className="px-10 py-4 rounded-full glass border border-white/10 font-bold hover:bg-white/10 transition-all interactive">
              Download CV
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
