
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
  ChevronRight
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "hero", label: "Hero", icon: LayoutDashboard },
  { id: "about", label: "About", icon: User },
  { id: "skills", label: "Skills", icon: Code },
  { id: "projects", label: "Projects", icon: Briefcase },
  { id: "journey", label: "Journey", icon: Activity },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("hero");

  return (
    <div className="min-h-screen bg-[#030305] text-white flex selection:bg-primary/30">
      {/* Sidebar Navigation */}
      <aside className="w-80 border-r border-white/5 p-8 flex flex-col gap-12 glass shrink-0 sticky top-0 h-screen">
        <div className="px-2">
          <Link href="/" className="group flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform shadow-lg shadow-primary/20">
              S.
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tighter gradient-text">SYNAPSE</h2>
              <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">Studio Architecture</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 space-y-1">
          {TABS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center justify-between px-6 py-4 rounded-2xl text-sm font-bold transition-all group",
                activeTab === item.id 
                  ? "bg-white/10 text-white shadow-xl" 
                  : "text-white/30 hover:bg-white/5 hover:text-white/60"
              )}
            >
              <div className="flex items-center gap-4">
                <item.icon size={18} className={activeTab === item.id ? "text-primary" : ""} />
                {item.label}
              </div>
              {activeTab === item.id && <ChevronRight size={14} className="text-primary" />}
            </button>
          ))}
          
          <div className="pt-8 mt-8 border-t border-white/5">
            <Link 
              href="/admin/project-gen"
              className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold text-primary hover:bg-primary/10 transition-all shadow-sm"
            >
              <Sparkles size={18} />
              AI Studio Tools
            </Link>
          </div>
        </nav>

        <button className="flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold text-red-400 hover:bg-red-400/10 transition-all mt-auto group">
          <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
          Terminate Session
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-16 overflow-y-auto bg-[#0B0B0F]/50">
        <header className="flex justify-between items-end mb-16">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60 mb-2 block">Management Node</span>
            <h1 className="text-5xl font-bold tracking-tighter capitalize">{activeTab} Interface</h1>
          </motion.div>
          
          <div className="flex gap-4">
             <Link href="/" target="_blank" className="px-6 py-3 border border-white/10 rounded-full font-bold text-[10px] uppercase tracking-widest flex items-center gap-3 hover:bg-white/5 transition-all">
              <ExternalLink size={14} />
              View Live
            </Link>
            <button className="px-8 py-4 bg-primary text-white rounded-full font-bold text-[10px] uppercase tracking-widest flex items-center gap-3 hover:scale-105 transition-all shadow-2xl shadow-primary/20 active:scale-95">
              <Save size={16} />
              Deploy Changes
            </button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="max-w-5xl"
          >
            {activeTab === "hero" && (
              <div className="glass-card p-12 space-y-12 border-white/5">
                <div className="grid grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Primary Display Name</label>
                    <Input defaultValue="SHARUKH H" className="bg-white/5 border-white/10 h-16 px-8 rounded-2xl focus:border-primary/50 text-xl font-bold" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Professional Anchor Year</label>
                    <Input defaultValue="2024" className="bg-white/5 border-white/10 h-16 px-8 rounded-2xl focus:border-primary/50 text-xl font-bold" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Hero Tagline Statement</label>
                  <Input defaultValue="Creative Developer • UI Architect" className="bg-white/5 border-white/10 h-16 px-8 rounded-2xl focus:border-primary/50" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Background Hero Image URL</label>
                  <Input defaultValue="https://picsum.photos/seed/cyber1/1920/1080" className="bg-white/5 border-white/10 h-16 px-8 rounded-2xl focus:border-primary/50" />
                </div>
              </div>
            )}

            {activeTab === "about" && (
              <div className="glass-card p-12 space-y-12 border-white/5">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Profile Narrative Headline</label>
                  <Input defaultValue="Clean Code Meets Emotional Design." className="bg-white/5 border-white/10 h-16 px-8 rounded-2xl focus:border-primary/50 text-2xl font-bold tracking-tight" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Avatar Artifact (Profile URL)</label>
                  <div className="flex gap-6 items-center">
                    <div className="w-24 h-24 rounded-3xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 overflow-hidden shadow-inner">
                      <img src="https://picsum.photos/seed/sharukh/600/600" alt="Preview" className="w-full h-full object-cover" />
                    </div>
                    <Input defaultValue="https://picsum.photos/seed/sharukh/600/600" className="bg-white/5 border-white/10 h-16 px-8 rounded-2xl flex-1" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">The Origin Story (Para 1)</label>
                  <Textarea rows={6} className="bg-white/5 border-white/10 p-8 rounded-3xl resize-none leading-relaxed text-white/70" defaultValue="I am a creative architect specializing in frontend technologies..." />
                </div>
                <div className="grid grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Years of Experience</label>
                    <Input defaultValue="2+" className="bg-white/5 border-white/10 h-16 px-8 rounded-2xl focus:border-primary/50" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Total Artifacts (Projects)</label>
                    <Input defaultValue="50+" className="bg-white/5 border-white/10 h-16 px-8 rounded-2xl focus:border-primary/50" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "projects" && (
              <div className="space-y-8">
                {[
                  { name: "Lane Detection AI", img: "https://picsum.photos/seed/lane/800/600", type: "Machine Learning", tags: ["Python", "OpenCV"] },
                  { name: "Enterprise POS", img: "https://picsum.photos/seed/pos/800/600", type: "Web Engine", tags: ["Next.js", "Firebase"] },
                  { name: "Visual Branding", img: "https://picsum.photos/seed/social1/400/500", type: "Creative Design", tags: ["Adobe", "GSAP"] }
                ].map((project, i) => (
                  <div key={i} className="glass-card p-10 border-white/5 flex gap-10 items-start group relative overflow-hidden">
                    <div className="w-64 aspect-[16/10] bg-white/5 rounded-[2rem] border border-white/10 overflow-hidden shrink-0 group-hover:border-primary/50 transition-all duration-500 shadow-2xl">
                      <img src={project.img} alt={project.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                    </div>
                    <div className="flex-1 space-y-6 pt-2">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-primary/60">Project Title</span>
                          <Input defaultValue={project.name} className="bg-transparent border-none p-0 text-3xl font-bold h-auto w-auto focus-visible:ring-0 text-white" />
                        </div>
                        <button className="p-3 text-white/10 hover:text-red-400 transition-colors bg-white/5 rounded-xl hover:bg-red-400/10">
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20">Category</label>
                          <Input defaultValue={project.type} className="bg-white/5 border-white/10 h-12 px-5 rounded-xl text-xs" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20">Asset Reference (URL)</label>
                          <Input defaultValue={project.img} className="bg-white/5 border-white/10 h-12 px-5 rounded-xl text-xs" />
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                          <span key={tag} className="px-4 py-2 bg-white/5 rounded-full text-[10px] font-bold border border-white/10 text-white/40 flex items-center gap-2 group-hover:text-white transition-colors">
                            {tag}
                            <button className="hover:text-red-400"><Trash2 size={10} /></button>
                          </span>
                        ))}
                        <button className="px-4 py-2 bg-primary/10 text-primary rounded-full text-[10px] font-bold flex items-center gap-2 border border-primary/20 hover:bg-primary hover:text-white transition-all">
                          <Plus size={12} /> New Tag
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <button className="w-full py-12 border-2 border-dashed border-white/5 rounded-[3rem] text-white/20 font-bold flex items-center justify-center gap-4 hover:bg-white/[0.02] hover:border-white/20 transition-all group">
                  <div className="w-12 h-12 rounded-full border border-dashed border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Plus size={24} />
                  </div>
                  Add New Portfolio Artifact
                </button>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="glass-card p-12 space-y-12 border-white/5">
                <div className="space-y-8">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <h3 className="text-xs font-black uppercase tracking-[0.4em] text-primary">Contact Configuration</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Official Email</label>
                      <Input defaultValue="hello@sharukh.design" className="bg-white/5 border-white/10 h-16 px-8 rounded-2xl" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Secure Line (Phone)</label>
                      <Input defaultValue="+91 98765 43210" className="bg-white/5 border-white/10 h-16 px-8 rounded-2xl" />
                    </div>
                  </div>
                </div>

                <div className="space-y-8 pt-8 border-t border-white/5">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    <h3 className="text-xs font-black uppercase tracking-[0.4em] text-secondary">Global Social Index</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-10">
                    {[
                      { label: "LinkedIn Protocol", url: "linkedin.com/in/sharukh" },
                      { label: "GitHub Repository", url: "github.com/sharukh" },
                      { label: "Instagram Visuals", url: "instagram.com/sharukh.design" },
                      { label: "Twitter X Stream", url: "twitter.com/sharukh" }
                    ].map((social) => (
                      <div key={social.label} className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">{social.label}</label>
                        <div className="relative">
                           <LinkIcon size={14} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" />
                           <Input defaultValue={social.url} className="bg-white/5 border-white/10 h-16 pl-14 pr-8 rounded-2xl w-full" />
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
    </div>
  );
}
