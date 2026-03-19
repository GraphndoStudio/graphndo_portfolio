
"use client";

import { motion } from "framer-motion";
import { Linkedin, Instagram, Globe, MessageSquare } from "lucide-react";

const PLATFORMS = [
  { name: "Fiverr", icon: Globe, url: "#", color: "#1dbf73", label: "Professional Hire" },
  { name: "LinkedIn", icon: Linkedin, url: "#", color: "#0077b5", label: "Business Node" },
  { name: "Instagram", icon: Instagram, url: "#", color: "#e1306c", label: "Visual Stream" },
  { name: "Twitter", icon: MessageSquare, url: "#", color: "#1da1f2", label: "Live Feed" },
];

export default function Platforms({ data }: { data?: any }) {
  const displayPlatforms = PLATFORMS.map(p => ({
    ...p,
    url: data?.[p.name.toLowerCase()] || p.url
  }));
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="glass-card p-12 md:p-20 relative overflow-hidden text-center border-white/5">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10" />
          
          <h2 className="text-3xl md:text-5xl font-bold mb-12 tracking-tight">
            Available for <span className="gradient-text">Global Mission</span>
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {displayPlatforms.map((platform) => (
              <motion.a
                key={platform.name}
                href={platform.url}
                whileHover={{ y: -10 }}
                className="group relative flex flex-col items-center gap-4"
              >
                <div 
                  className="w-20 h-20 md:w-24 md:h-24 rounded-[2rem] glass flex items-center justify-center relative transition-all duration-500 group-hover:scale-110"
                  style={{ '--glow-color': platform.color } as any}
                >
                  <platform.icon size={32} className="text-white group-hover:text-primary transition-colors" />
                  
                  {/* Dynamic Glow */}
                  <div 
                    className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl -z-10"
                    style={{ backgroundColor: platform.color }}
                  />
                </div>
                
                <div className="space-y-1">
                  <h4 className="font-bold text-white group-hover:text-primary transition-colors">{platform.name}</h4>
                  <p className="text-[9px] font-black uppercase tracking-widest text-white/30">{platform.label}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
