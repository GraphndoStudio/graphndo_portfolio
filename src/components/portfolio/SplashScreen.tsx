
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 1000);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] bg-[#030305] flex flex-col items-center justify-center p-6"
    >
      <div className="relative w-full max-w-md text-center">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl md:text-6xl font-bold tracking-tighter gradient-text mb-8"
        >
          SYNAPSE.
        </motion.h1>

        <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden mb-4">
          <motion.div 
            className="h-full bg-gradient-to-r from-primary via-secondary to-primary shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
          <span>Initializing Experience</span>
          <span>{progress}%</span>
        </div>
      </div>

      <div className="absolute bottom-12 text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
        © 2024 Synapse Studio Architecture
      </div>
    </motion.div>
  );
}
