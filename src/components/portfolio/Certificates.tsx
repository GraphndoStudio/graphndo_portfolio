
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Award, ExternalLink } from "lucide-react";

const CERTS = [
  {
    title: "Web Development Internship",
    issuer: "Skypark IT Tech",
    date: "2024",
    img: "cert-1",
  },
  {
    title: "Advanced UI/UX Certification",
    issuer: "Google UX Design",
    date: "2023",
    img: "cert-2",
  },
  {
    title: "Fullstack Architecture",
    issuer: "Meta Engineering",
    date: "2024",
    img: "cert-1",
  }
];

export default function Certificates() {
  return (
    <section id="credentials" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <header className="mb-24 text-center">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-white">
            Credibility <span className="gradient-text">Node</span>
          </h2>
          <p className="text-white/40 text-sm font-black uppercase tracking-[0.4em]">Validation of Expertise</p>
        </header>

        <div className="grid md:grid-cols-3 gap-10">
          {CERTS.map((cert, i) => {
            const imgData = PlaceHolderImages.find(img => img.id === cert.img);
            return (
              <div key={i} className="perspective-1000 group h-[400px]">
                <motion.div 
                  className="relative w-full h-full transition-all duration-700 preserve-3d group-hover:rotate-y-180"
                >
                  {/* Front Side */}
                  <div className="absolute inset-0 backface-hidden">
                    <div className="w-full h-full glass-card p-1 overflow-hidden">
                      <div className="relative w-full h-full rounded-[1.8rem] overflow-hidden flex flex-col justify-end p-8 bg-[#0a0a0c]">
                        <Image
                          src={imgData?.imageUrl || ""}
                          alt={cert.title}
                          fill
                          sizes="400px"
                          className="object-cover opacity-20 grayscale"
                        />
                        <div className="relative z-10">
                          <Award className="text-primary mb-6" size={40} />
                          <h3 className="text-2xl font-bold mb-2 text-white">{cert.title}</h3>
                          <p className="text-white/40 text-sm font-bold uppercase tracking-widest">{cert.issuer}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Back Side (Flip) */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180">
                    <div className="w-full h-full glass-card p-1 overflow-hidden border-primary/20">
                      <div className="relative w-full h-full rounded-[1.8rem] overflow-hidden bg-primary/5 flex flex-col items-center justify-center text-center p-8">
                         <div className="w-full h-48 relative rounded-xl overflow-hidden mb-8 border border-white/5">
                            <Image
                              src={imgData?.imageUrl || ""}
                              alt="Full Certificate"
                              fill
                              className="object-cover"
                            />
                         </div>
                         <button className="flex items-center gap-3 text-primary font-bold hover:text-white transition-colors group/btn">
                           Verify Credentials <ExternalLink size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                         </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
      
      <style jsx global>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </section>
  );
}
