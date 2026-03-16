
"use client";

import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 border-t border-white/5 glass">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <h2 className="text-2xl font-bold tracking-tighter gradient-text">SHARUKH.</h2>
            <p className="text-muted-foreground text-sm">© 2024 Sharukh H. All rights reserved.</p>
          </div>

          <div className="flex items-center gap-12 text-sm text-muted-foreground font-medium">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Cookies</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
          </div>

          <button
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all hover:-translate-y-2 interactive"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
}
