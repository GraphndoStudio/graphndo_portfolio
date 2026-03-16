
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { X, Maximize2 } from "lucide-react";

const DESIGN_WORKS = [
  { id: 1, title: "Cyberpunk Social Kit", type: "Social Media", img: "social-design-1", span: "row-span-2" },
  { id: 2, title: "Abstract Motion Poster", type: "Poster", img: "poster-1", span: "row-span-3" },
  { id: 3, title: "Minimalist UI Concept", type: "UI Design", img: "social-design-2", span: "row-span-2" },
  { id: 4, title: "Dynamic Thumbnails", type: "Thumbnail", img: "hero-bg", span: "row-span-2" },
  { id: 5, title: "Brand Identity v2", type: "Branding", img: "poster-2", span: "row-span-3" },
  { id: 6, title: "Flow Animation Frame", type: "Animation", img: "lane-detection", span: "row-span-2" },
];

export default function DesignGallery() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-32 relative">
      <div className="container mx-auto px-6">
        <header className="mb-20 text-center lg:text-left">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
            Creative <span className="gradient-text">Laboratory</span>
          </h2>
          <p className="text-white/40 text-lg md:text-xl max-w-2xl uppercase tracking-widest font-black">
            Visual experiments in design & motion.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[200px]">
          {DESIGN_WORKS.map((work) => {
            const imgData = PlaceHolderImages.find(i => i.id === work.img);
            return (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className={`${work.span} relative group rounded-[2rem] overflow-hidden glass-card p-1 cursor-pointer`}
                onClick={() => setSelectedImg(imgData?.imageUrl || null)}
              >
                <div className="relative w-full h-full rounded-[1.8rem] overflow-hidden bg-[#0a0a0c]">
                  <Image
                    src={imgData?.imageUrl || ""}
                    alt={work.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    data-ai-hint={imgData?.imageHint}
                  />
                  
                  {/* Glass Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm flex flex-col justify-end p-8">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="text-primary text-[10px] font-black uppercase tracking-widest mb-2 block">{work.type}</span>
                      <h4 className="text-xl font-bold text-white">{work.title}</h4>
                      <Maximize2 size={20} className="mt-4 text-white/40" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Preview */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedImg(null)}
          >
            <button className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors">
              <X size={40} />
            </button>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative w-full max-w-6xl aspect-[4/3] md:aspect-video rounded-[2rem] overflow-hidden shadow-2xl border border-white/10"
            >
              <Image
                src={selectedImg}
                alt="Fullscreen Preview"
                fill
                className="object-contain md:object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
