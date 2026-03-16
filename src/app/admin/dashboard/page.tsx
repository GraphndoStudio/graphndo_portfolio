
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  LogOut, 
  Save, 
  Plus, 
  Trash2,
  Image as ImageIcon,
  Code,
  Briefcase,
  Sparkles,
  Link as LinkIcon,
  Activity,
  User,
  ExternalLink,
  ChevronRight,
  Award,
  Globe,
  Share2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "hero", label: "Hero Node", icon: LayoutDashboard },
  { id: "about", label: "Identity", icon: User },
  { id: "skills", label: "Technical Core", icon: Code },
  { id: "projects", label: "Locked Works", icon: Briefcase },
  { id: "gallery", label: "Lab Gallery", icon: ImageIcon },
  { id: "journey", label: "The Odyssey", icon: Activity },
  { id: "credentials", label: "Certifications", icon: Award },
  { id: "settings", label: "Global Protocols", icon: Settings },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("hero");

  return (
    <div className="min-h-screen bg-[#030305] text-white flex selection:bg-primary/30 antialiased font-body">
      {/* Sidebar Navigation */}
      <aside className="w-72 border-r border-white/5 p-8 flex flex-col gap-10 glass shrink-0 sticky top-0 h-screen z-20">
        <div className="px-2">
          <Link href="/" className="group flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-bold text-sm group-hover:scale-110 transition-transform shadow-lg shadow-primary/20">
              SH.
            </div>
            <div>
              <h2 className="text-sm font-black tracking-tighter gradient-text">SYNAPSE</h2>
              <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em]">Control Center</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto custom-scrollbar pr-2">
          {TABS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center justify-between px-5 py-3 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all group",
                activeTab === item.id 
                  ? "bg-white/10 text-white shadow-xl" 
                  : "text-white/30 hover:bg-white/5 hover:text-white/60"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon size={16} className={activeTab === item.id ? "text-primary" : ""} />
                {item.label}
              </div>
              {activeTab === item.id && <ChevronRight size={12} className="text-primary" />}
            </button>
          ))}
          
          <div className="pt-6 mt-6 border-t border-white/5">
            <Link 
              href="/admin/project-gen"
              className="w-full flex items-center gap-3 px-5 py-3 rounded-xl text-[11px] font-black uppercase tracking-wider text-primary hover:bg-primary/10 transition-all shadow-sm"
            >
              <Sparkles size={16} />
              AI Studio Tools
            </Link>
          </div>
        </nav>

        <button className="flex items-center gap-3 px-5 py-3 rounded-xl text-[11px] font-black uppercase tracking-wider text-red-400/60 hover:text-red-400 hover:bg-red-400/10 transition-all mt-auto group">
          <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
          Terminate
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-12 overflow-y-auto bg-[#0B0B0F]/30 relative">
        <header className="flex justify-between items-end mb-12">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 mb-2 block">System Configuration</span>
            <h1 className="text-4xl font-bold tracking-tighter capitalize">{activeTab.replace('-', ' ')} Interface</h1>
          </motion.div>
          
          <div className="flex gap-4">
             <Link href="/" target="_blank" className="px-5 py-2.5 border border-white/10 rounded-full font-black text-[9px] uppercase tracking-widest flex items-center gap-2 hover:bg-white/5 transition-all">
              <ExternalLink size={12} />
              Live Site
            </Link>
            <button className="px-6 py-2.5 bg-primary text-white rounded-full font-black text-[9px] uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all shadow-xl shadow-primary/20 active:scale-95">
              <Save size={14} />
              Sync Changes
            </button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl"
          >
            {activeTab === "hero" && (
              <div className="glass-card p-10 space-y-10 border-white/5">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30">Display Name</label>
                    <Input defaultValue="SHARUKH H" className="bg-white/5 border-white/10 h-12 px-5 rounded-xl focus:border-primary/50 text-lg font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30">Anchor Year</label>
                    <Input defaultValue="2024" className="bg-white/5 border-white/10 h-12 px-5 rounded-xl focus:border-primary/50" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30">Tagline Roles (Separated by Bullet)</label>
                  <Input defaultValue="Creative Developer • UI Architect" className="bg-white/5 border-white/10 h-12 px-5 rounded-xl focus:border-primary/50" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30">Hero Backdrop Reference (URL)</label>
                  <Input defaultValue="https://picsum.photos/seed/cyber1/1920/1080" className="bg-white/5 border-white/10 h-12 px-5 rounded-xl focus:border-primary/50" />
                </div>
              </div>
            )}

            {activeTab === "about" && (
              <div className="glass-card p-10 space-y-10 border-white/5">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30">Narrative Headline</label>
                  <Input defaultValue="Clean Code Meets Emotional Design." className="bg-white/5 border-white/10 h-14 px-6 rounded-xl focus:border-primary/50 text-xl font-bold tracking-tight" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30">Identity Artifact (Profile Image)</label>
                  <div className="flex gap-6 items-center">
                    <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 overflow-hidden">
                      <img src="https://picsum.photos/seed/sharukh/600/600" alt="Preview" className="w-full h-full object-cover" />
                    </div>
                    <Input defaultValue="https://picsum.photos/seed/sharukh/600/600" className="bg-white/5 border-white/10 h-12 px-5 rounded-xl flex-1" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30">The Origin Story</label>
                  <Textarea rows={6} className="bg-white/5 border-white/10 p-6 rounded-2xl resize-none leading-relaxed text-white/60 text-sm" defaultValue="I am a creative architect specializing in frontend technologies. My journey is defined by a relentless pursuit of pixel perfection..." />
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30">Experience Metric</label>
                    <Input defaultValue="2+" className="bg-white/5 border-white/10 h-12 px-5 rounded-xl focus:border-primary/50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30">Artifact Metric (Projects)</label>
                    <Input defaultValue="50+" className="bg-white/5 border-white/10 h-12 px-5 rounded-xl focus:border-primary/50" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "projects" && (
              <div className="space-y-6">
                {[
                  { name: "Lane Detection AI", img: "https://picsum.photos/seed/lane/800/600", type: "Machine Learning", tags: ["Python", "OpenCV"] },
                  { name: "Enterprise POS", img: "https://picsum.photos/seed/pos/800/600", type: "Web Engine", tags: ["Next.js", "Firebase"] }
                ].map((project, i) => (
                  <div key={i} className="glass-card p-8 border-white/5 flex gap-8 items-start group">
                    <div className="w-48 aspect-[16/10] bg-white/5 rounded-2xl border border-white/10 overflow-hidden shrink-0 group-hover:border-primary/40 transition-all duration-500 shadow-xl">
                      <img src={project.img} alt={project.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all" />
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="flex justify-between items-start">
                        <Input defaultValue={project.name} className="bg-transparent border-none p-0 text-xl font-bold h-auto w-auto focus-visible:ring-0 text-white" />
                        <button className="p-2 text-white/10 hover:text-red-400 transition-colors bg-white/5 rounded-lg hover:bg-red-400/10">
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <Input defaultValue={project.type} className="bg-white/5 border-white/10 h-10 px-4 rounded-lg text-[11px]" placeholder="Category" />
                        <Input defaultValue={project.img} className="bg-white/5 border-white/10 h-10 px-4 rounded-lg text-[11px]" placeholder="Asset URL" />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-[9px] font-black uppercase border border-white/10 text-white/30 flex items-center gap-2">
                            {tag}
                            <button className="hover:text-red-400"><Plus className="rotate-45" size={10} /></button>
                          </span>
                        ))}
                        <button className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[9px] font-black uppercase flex items-center gap-2 border border-primary/20 hover:bg-primary hover:text-white transition-all">
                          <Plus size={10} /> Add Tag
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <button className="w-full py-8 border border-dashed border-white/10 rounded-2xl text-white/20 text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white/[0.02] hover:border-white/30 transition-all">
                  <Plus size={16} /> New Portfolio Artifact
                </button>
              </div>
            )}

            {activeTab === "gallery" && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="glass-card p-6 border-white/5 group">
                      <div className="aspect-video rounded-xl overflow-hidden bg-white/5 mb-4 border border-white/10 relative">
                         <img src={`https://picsum.photos/seed/gallery${i}/800/600`} alt="Gallery Preview" className="w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-opacity" />
                         <button className="absolute top-3 right-3 p-2 bg-red-400/20 text-red-400 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                           <Trash2 size={14} />
                         </button>
                      </div>
                      <div className="space-y-3">
                         <Input defaultValue={`Lab Experiment ${i}`} className="bg-white/5 border-white/10 h-10 px-4 rounded-lg text-xs font-bold" />
                         <Input defaultValue="UI Design" className="bg-white/5 border-white/10 h-10 px-4 rounded-lg text-[10px] uppercase tracking-widest text-white/30" />
                         <Input defaultValue={`https://picsum.photos/seed/gallery${i}/800/600`} className="bg-white/5 border-white/10 h-10 px-4 rounded-lg text-[10px]" placeholder="Asset URL" />
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full py-8 border border-dashed border-white/10 rounded-2xl text-white/20 text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white/[0.02] hover:border-white/30 transition-all">
                  <Plus size={16} /> Add Lab Asset
                </button>
              </div>
            )}

            {activeTab === "journey" && (
              <div className="space-y-6">
                {[
                  { year: "2023", title: "Visual Genesis", desc: "Mastering the physics of pixels..." },
                  { year: "2024", title: "Logic Architecture", desc: "Developing deep structural understanding..." }
                ].map((step, i) => (
                  <div key={i} className="glass-card p-8 border-white/5 flex gap-8 items-start">
                    <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20 text-primary font-black text-xs">
                      {step.year}
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="flex gap-4">
                        <Input defaultValue={step.year} className="w-24 bg-white/5 border-white/10 h-10 px-4 rounded-lg text-xs" />
                        <Input defaultValue={step.title} className="flex-1 bg-white/5 border-white/10 h-10 px-4 rounded-lg text-xs font-bold" />
                      </div>
                      <Textarea defaultValue={step.desc} className="bg-white/5 border-white/10 p-4 rounded-xl text-xs text-white/50 h-24 resize-none" />
                    </div>
                    <button className="p-2 text-white/10 hover:text-red-400 transition-colors bg-white/5 rounded-lg shrink-0">
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                <button className="w-full py-8 border border-dashed border-white/10 rounded-2xl text-white/20 text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white/[0.02] hover:border-white/30 transition-all">
                  <Plus size={16} /> New Milestone
                </button>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="glass-card p-10 space-y-12 border-white/5">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Core Contact Node</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30">Official Email</label>
                      <Input defaultValue="hello@sharukh.design" className="bg-white/5 border-white/10 h-12 px-5 rounded-xl text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30">Secure Line</label>
                      <Input defaultValue="+91 98765 43210" className="bg-white/5 border-white/10 h-12 px-5 rounded-xl text-sm" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30">Geographic Anchor (Location)</label>
                    <Input defaultValue="Nilgiris, Tamil Nadu, India" className="bg-white/5 border-white/10 h-12 px-5 rounded-xl text-sm" />
                  </div>
                </div>

                <div className="space-y-6 pt-8 border-t border-white/5">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary">Global Mission Platforms</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    {[
                      { name: "Fiverr", icon: Globe, url: "fiverr.com/sharukh" },
                      { name: "LinkedIn", icon: Share2, url: "linkedin.com/in/sharukh" },
                      { name: "Instagram", icon: ImageIcon, url: "instagram.com/sharukh" },
                      { name: "Twitter", icon: Share2, url: "twitter.com/sharukh" }
                    ].map((platform) => (
                      <div key={platform.name} className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30">{platform.name} Protocol</label>
                        <div className="relative">
                           <platform.icon size={12} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" />
                           <Input defaultValue={platform.url} className="bg-white/5 border-white/10 h-12 pl-12 pr-5 rounded-xl w-full text-xs" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
      
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
