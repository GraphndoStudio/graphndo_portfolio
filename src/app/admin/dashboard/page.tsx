
"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
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
  Share2,
  Eye,
  EyeOff,
  Upload,
  X
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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
  
  // Local state for visibility toggles
  const [visibility, setVisibility] = useState({
    hero: true,
    about: true,
    skills: true,
    projects: true,
    gallery: true,
    journey: true,
    credentials: true,
    platforms: true,
    cta: true,
    contact: true
  });

  // Local state for image previews
  const [previews, setPreviews] = useState<Record<string, string>>({
    hero: "https://picsum.photos/seed/cyber1/1920/1080",
    profile: "https://picsum.photos/seed/sharukh/600/600",
  });

  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleFileChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviews(prev => ({ ...prev, [id]: url }));
    }
  };

  const triggerUpload = (id: string) => {
    fileInputRefs.current[id]?.click();
  };

  const toggleVisibility = (section: keyof typeof visibility) => {
    setVisibility(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const ImageControl = ({ id, label, currentUrl }: { id: string, label: string, currentUrl: string }) => (
    <div className="space-y-3">
      <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30">{label}</label>
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="w-32 aspect-video md:aspect-square rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 overflow-hidden relative group">
          <img src={previews[id] || currentUrl} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
             <button onClick={() => triggerUpload(id)} className="p-2 bg-primary rounded-full text-white shadow-lg">
                <Upload size={14} />
             </button>
          </div>
        </div>
        <div className="flex-1 w-full space-y-3">
          <div className="relative group">
            <LinkIcon size={12} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
            <Input 
              value={previews[id] || currentUrl} 
              onChange={(e) => setPreviews(prev => ({ ...prev, [id]: e.target.value }))}
              className="bg-white/5 border-white/10 h-12 pl-10 pr-5 rounded-xl text-xs font-mono" 
              placeholder="Source URL"
            />
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => triggerUpload(id)}
              className="flex-1 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
            >
              <Upload size={12} /> Local Upload
            </button>
            <button 
              onClick={() => setPreviews(prev => ({ ...prev, [id]: "" }))}
              className="px-4 h-10 bg-red-400/5 hover:bg-red-400/10 border border-red-400/20 text-red-400 rounded-xl flex items-center justify-center transition-all"
            >
              <X size={14} />
            </button>
          </div>
          <input 
            type="file" 
            className="hidden" 
            ref={el => { fileInputRefs.current[id] = el; }} 
            onChange={(e) => handleFileChange(id, e)}
            accept="image/*"
          />
        </div>
      </div>
    </div>
  );

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
            {/* Visibility Toggle */}
            {activeTab !== "settings" && (
              <div className="mb-8 flex items-center justify-between p-6 glass-card border-primary/20 bg-primary/5">
                <div className="flex items-center gap-4">
                  <div className={cn("p-2 rounded-lg", visibility[activeTab as keyof typeof visibility] ? "bg-primary/20 text-primary" : "bg-white/5 text-white/20")}>
                    {visibility[activeTab as keyof typeof visibility] ? <Eye size={18} /> : <EyeOff size={18} />}
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest">Module Status</h4>
                    <p className="text-[10px] text-white/40 uppercase tracking-tighter">Toggle visibility on the public portfolio</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/20">
                    {visibility[activeTab as keyof typeof visibility] ? "Active" : "Hidden"}
                  </span>
                  <Switch 
                    checked={visibility[activeTab as keyof typeof visibility]} 
                    onCheckedChange={() => toggleVisibility(activeTab as keyof typeof visibility)}
                  />
                </div>
              </div>
            )}

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
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30">Tagline Roles</label>
                  <Input defaultValue="Creative Developer • UI Architect" className="bg-white/5 border-white/10 h-12 px-5 rounded-xl focus:border-primary/50" />
                </div>
                <ImageControl id="hero" label="Hero Backdrop Node" currentUrl="https://picsum.photos/seed/cyber1/1920/1080" />
              </div>
            )}

            {activeTab === "about" && (
              <div className="glass-card p-10 space-y-10 border-white/5">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30">Narrative Headline</label>
                  <Input defaultValue="Clean Code Meets Emotional Design." className="bg-white/5 border-white/10 h-14 px-6 rounded-xl focus:border-primary/50 text-xl font-bold tracking-tight" />
                </div>
                <ImageControl id="profile" label="Identity Artifact (Profile Image)" currentUrl="https://picsum.photos/seed/sharukh/600/600" />
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30">The Origin Story</label>
                  <Textarea rows={6} className="bg-white/5 border-white/10 p-6 rounded-2xl resize-none leading-relaxed text-white/60 text-sm" defaultValue="I am a creative architect specializing in frontend technologies..." />
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
                  { id: "p1", name: "Lane Detection AI", img: "https://picsum.photos/seed/lane/800/600", type: "Machine Learning", tags: ["Python", "OpenCV"] },
                  { id: "p2", name: "Enterprise POS", img: "https://picsum.photos/seed/pos/800/600", type: "Web Engine", tags: ["Next.js", "Firebase"] }
                ].map((project) => (
                  <div key={project.id} className="glass-card p-8 border-white/5 space-y-8">
                    <div className="flex justify-between items-start">
                      <Input defaultValue={project.name} className="bg-transparent border-none p-0 text-xl font-bold h-auto w-auto focus-visible:ring-0 text-white" />
                      <button className="p-2 text-white/10 hover:text-red-400 transition-colors bg-white/5 rounded-lg hover:bg-red-400/10">
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <ImageControl id={`project-${project.id}`} label="Project Artifact Asset" currentUrl={project.img} />
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30">Category</label>
                        <Input defaultValue={project.type} className="bg-white/5 border-white/10 h-12 px-5 rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30">Core Tags</label>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-[9px] font-black uppercase border border-white/10 text-white/30 flex items-center gap-2">
                              {tag}
                              <Plus className="rotate-45" size={10} />
                            </span>
                          ))}
                        </div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="glass-card p-6 border-white/5 space-y-6">
                    <div className="flex justify-between items-center">
                       <Input defaultValue={`Lab Experiment ${i}`} className="bg-transparent border-none p-0 text-sm font-bold h-auto focus-visible:ring-0" />
                       <button className="p-1.5 text-white/10 hover:text-red-400">
                         <Trash2 size={12} />
                       </button>
                    </div>
                    <ImageControl id={`gallery-${i}`} label="Asset Frame" currentUrl={`https://picsum.photos/seed/gallery${i}/800/600`} />
                    <Input defaultValue="UI Design" className="bg-white/5 border-white/10 h-10 px-4 rounded-lg text-[10px] uppercase tracking-widest text-white/30" />
                  </div>
                ))}
              </div>
            )}

            {/* Other tabs follow similar pattern for image/content editing */}
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
              </div>
            )}

            {activeTab === "credentials" && (
              <div className="space-y-6">
                {[
                  { id: "c1", title: "Web Dev Internship", issuer: "Skypark IT Tech", year: "2024", img: "https://picsum.photos/seed/cert1/800/600" },
                ].map((cert) => (
                  <div key={cert.id} className="glass-card p-8 border-white/5 space-y-6">
                    <div className="flex justify-between items-center">
                       <h4 className="text-sm font-bold">Node {cert.id}</h4>
                       <button className="text-red-400/40 hover:text-red-400"><Trash2 size={14} /></button>
                    </div>
                    <ImageControl id={`cert-${cert.id}`} label="Certificate Artifact" currentUrl={cert.img} />
                    <div className="grid grid-cols-2 gap-6">
                      <Input defaultValue={cert.title} placeholder="Title" className="bg-white/5 border-white/10 h-12 rounded-xl" />
                      <Input defaultValue={cert.issuer} placeholder="Issuer" className="bg-white/5 border-white/10 h-12 rounded-xl" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-12">
                <div className="glass-card p-10 border-white/5 space-y-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Module Visibility Protocols</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                    {Object.entries(visibility).map(([module, isVisible]) => (
                      <div key={module} className="flex items-center justify-between py-2 border-b border-white/5">
                        <div className="flex items-center gap-3">
                          <div className={cn("w-2 h-2 rounded-full", isVisible ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" : "bg-white/10")} />
                          <span className="text-[10px] font-black uppercase tracking-widest text-white/60">{module} module</span>
                        </div>
                        <Switch 
                          checked={isVisible} 
                          onCheckedChange={() => toggleVisibility(module as keyof typeof visibility)} 
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-card p-10 border-white/5 space-y-12">
                  <div className="space-y-6">
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
                          <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30">{platform.name}</label>
                          <div className="relative">
                            <platform.icon size={12} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" />
                            <Input defaultValue={platform.url} className="bg-white/5 border-white/10 h-12 pl-12 pr-5 rounded-xl w-full text-xs" />
                          </div>
                        </div>
                      ))}
                    </div>
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
