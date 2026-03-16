
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
  Briefcase
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("hero");

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white flex">
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/5 p-8 flex flex-col gap-12 glass shrink-0">
        <div>
          <h2 className="text-2xl font-bold tracking-tighter gradient-text">SYNAPSE.</h2>
          <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mt-2">Control Terminal</p>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { id: "hero", label: "Hero Section", icon: LayoutDashboard },
            { id: "about", label: "About Me", icon: FileText },
            { id: "skills", label: "Tech Stack", icon: Code },
            { id: "projects", label: "Projects", icon: Briefcase },
            { id: "settings", label: "Site Settings", icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl text-sm font-bold transition-all ${
                activeTab === item.id 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-white/40 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <button className="flex items-center gap-4 px-6 py-4 rounded-xl text-sm font-bold text-red-400 hover:bg-red-400/10 transition-all">
          <LogOut size={18} />
          Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter capitalize">{activeTab} Management</h1>
            <p className="text-white/40 mt-2">Update your portfolio content in real-time.</p>
          </div>
          
          <button className="px-8 py-3 bg-white text-black rounded-full font-bold text-xs uppercase tracking-widest flex items-center gap-3 hover:scale-105 transition-all shadow-xl interactive">
            <Save size={16} />
            Publish Changes
          </button>
        </header>

        <div className="max-w-4xl">
          {activeTab === "hero" && (
            <div className="glass-card p-10 space-y-8 border-white/5">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Display Name</label>
                <Input defaultValue="SHARUKH H" className="bg-white/5 border-white/10 h-14 px-6 rounded-xl" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Tagline</label>
                <Input defaultValue="Creative Developer • UI Architect" className="bg-white/5 border-white/10 h-14 px-6 rounded-xl" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Anchor Year</label>
                <Input defaultValue="2024" className="bg-white/5 border-white/10 h-14 px-6 rounded-xl" />
              </div>
            </div>
          )}

          {activeTab === "about" && (
            <div className="glass-card p-10 space-y-8 border-white/5">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Headline</label>
                <Input defaultValue="Clean Code Meets Emotional Design." className="bg-white/5 border-white/10 h-14 px-6 rounded-xl" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Story Paragraph 1</label>
                <Textarea rows={4} className="bg-white/5 border-white/10 p-6 rounded-xl resize-none" defaultValue="I am a creative architect specializing in frontend technologies..." />
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Experience Count</label>
                  <Input defaultValue="2+" className="bg-white/5 border-white/10 h-14 px-6 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Projects Count</label>
                  <Input defaultValue="50+" className="bg-white/5 border-white/10 h-14 px-6 rounded-xl" />
                </div>
              </div>
            </div>
          )}

          {activeTab === "projects" && (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="glass-card p-8 border-white/5 flex gap-8 items-start group">
                  <div className="w-48 aspect-video bg-white/5 rounded-2xl flex items-center justify-center text-white/10 shrink-0">
                    <ImageIcon size={40} />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-center">
                      <Input defaultValue={`Project Name ${i}`} className="bg-transparent border-none p-0 text-xl font-bold h-auto w-auto focus-visible:ring-0" />
                      <button className="p-2 text-white/20 hover:text-red-400 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <Input defaultValue="Web Application" className="bg-white/5 border-white/10 text-xs text-primary font-bold uppercase tracking-widest" />
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold">React</span>
                      <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold">GSAP</span>
                      <button className="px-3 py-1 bg-primary/20 text-primary rounded-full text-[10px] font-bold flex items-center gap-1">
                        <Plus size={10} /> Add Tag
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button className="w-full py-8 border-2 border-dashed border-white/5 rounded-[2rem] text-white/20 font-bold flex items-center justify-center gap-3 hover:bg-white/[0.02] hover:border-white/10 transition-all">
                <Plus size={20} /> Add New Project
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
