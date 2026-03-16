
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ExternalLink, Github } from "lucide-react";

const PROJECTS = [
  {
    id: "lane-detection",
    title: "Lane Detection System",
    type: "AI / ML Project",
    desc: "An intelligent computer vision system developed to detect and track road lanes in real-time, enhancing autonomous vehicle safety.",
    img: PlaceHolderImages.find(i => i.id === 'lane-detection')?.imageUrl,
    tags: ["Python", "OpenCV", "TensorFlow"],
    link: "#"
  },
  {
    id: "pos-system",
    title: "POS System Design",
    type: "Web Application",
    desc: "A comprehensive point-of-sale solution with inventory tracking, sales analytics, and multi-terminal sync capabilities.",
    img: PlaceHolderImages.find(i => i.id === 'pos-system')?.imageUrl,
    tags: ["React", "Node.js", "Firebase"],
    link: "#"
  },
  {
    id: "social-designs",
    title: "Brand Identity Concepts",
    type: "Graphic Design",
    desc: "A series of high-impact social media assets and marketing materials designed to elevate digital brand presence.",
    img: PlaceHolderImages.find(i => i.id === 'social-design-1')?.imageUrl,
    tags: ["Photoshop", "Illustrator", "Canva"],
    link: "#"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-32 bg-[#0B0B0F]/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold mb-4">Featured <span className="gradient-text">Work</span></h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              Exploring the intersection of code and design through innovative digital solutions.
            </p>
          </div>
          <button className="px-8 py-3 rounded-full glass border border-white/10 hover:bg-white/5 transition-all hidden md:block interactive">
            View All Projects
          </button>
        </div>

        <div className="grid gap-20">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
            >
              <div className="flex-1 w-full group">
                <div className="relative aspect-video rounded-3xl overflow-hidden glass-card p-3">
                  <div className="relative w-full h-full overflow-hidden rounded-2xl">
                    <Image
                      src={project.img || ''}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                       <button className="w-12 h-12 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform">
                        <ExternalLink size={20} />
                       </button>
                       <button className="w-12 h-12 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform">
                        <Github size={20} />
                       </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-6">
                <span className="text-primary font-mono text-sm tracking-widest uppercase">{project.type}</span>
                <h3 className="text-3xl md:text-4xl font-bold">{project.title}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-3">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="pt-4">
                  <button className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all group interactive">
                    Explore Project Details
                    <div className="w-8 h-px bg-primary transform group-hover:w-12 transition-all" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
