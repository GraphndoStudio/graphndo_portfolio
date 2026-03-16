
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Lock, User, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import LiquidBackground from "@/components/portfolio/LiquidBackground";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Frontend only for now: mock successful login
    router.push("/admin/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#030305] relative overflow-hidden">
      <LiquidBackground />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        <div className="glass-card p-10 md:p-12 space-y-10 border-primary/20">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
              <Shield size={32} />
            </div>
            <h1 className="text-3xl font-bold tracking-tighter text-white uppercase">Vault Access</h1>
            <p className="text-white/40 text-xs font-black uppercase tracking-[0.3em]">Synapse Portfolio Control</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Identifier</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-6 py-4 focus:outline-none focus:border-primary/50 transition-all text-sm"
                  placeholder="admin@synapse.studio"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Security Key</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-6 py-4 focus:outline-none focus:border-primary/50 transition-all text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-5 rounded-xl bg-primary text-white font-bold flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20 interactive group"
            >
              Verify Credentials
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="text-center">
            <a href="/" className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-colors">
              Return to Public Site
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
