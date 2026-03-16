
"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Instagram, Linkedin, Github } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20">
          <div className="space-y-12">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold mb-6">Get In <span className="gradient-text">Touch</span></h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm always open to new opportunities, collaborations, or just a friendly chat about design and technology.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-6 p-6 glass-card group hover:bg-white/5 transition-colors">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold">Email</h4>
                  <p className="text-muted-foreground">hello@sharukh.design</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 p-6 glass-card group hover:bg-white/5 transition-colors">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold">Phone</h4>
                  <p className="text-muted-foreground">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-center gap-6 p-6 glass-card group hover:bg-white/5 transition-colors">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold">Location</h4>
                  <p className="text-muted-foreground">Nilgiris, Tamil Nadu, India</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              {[Linkedin, Instagram, Github].map((Icon, idx) => (
                <button key={idx} className="w-14 h-14 rounded-2xl glass flex items-center justify-center hover:bg-primary hover:text-white transition-all hover:-translate-y-2 interactive">
                  <Icon size={24} />
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -z-10" />
            
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Message</label>
                <textarea
                  placeholder="How can I help you?"
                  rows={5}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all resize-none"
                />
              </div>

              <button className="w-full py-5 rounded-xl bg-primary text-white font-bold flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl interactive">
                Send Message
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
