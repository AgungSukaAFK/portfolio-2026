// src/components/ui/glitch-text.tsx
"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { easeInOut } from "framer-motion";

interface GlitchTextProps {
  text: string;
  className?: string;
}

export const GlitchText = ({ text, className }: GlitchTextProps) => {
  // Definisi animasi "kejang"
  const glitchVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    glitching: {
      opacity: 1,
      y: 0,
      textShadow: [
        "0 0 rgba(0,0,0,0)", // Normal
        "-2px -2px #00ffff, 2px 2px #ff00ff", // RGB Split
        "-4px -4px #00ffff, 4px 4px #ff00ff", // Split Lebih parah
        "2px -2px #00ffff, -2px 2px #ff00ff", // Arah sebaliknya
        "0 0 rgba(0,0,0,0)", // Balik normal
      ],
      x: [0, -2, 2, -4, 0], // Gerak kiri kanan dikit
      skewX: [0, 5, -5, 0], // Miringin dikit
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: "reverse" as const, // Bolak balik
        ease: easeInOut,
      },
    },
  };

  return (
    <div className="relative inline-block">
      {/* Layer utama */}
      <motion.h1
        variants={glitchVariants}
        initial="hidden"
        animate={["visible", "glitching"]} // Jalankan 2 animasi sekaligus
        className={cn(
          "relative z-10 font-extrabold tracking-tighter text-transparent bg-clip-text bg-foreground",
          className,
        )}
      >
        {text}
      </motion.h1>

      {/* Layer bayangan statis untuk efek tebal retro */}
      <h1
        className={cn(
          "absolute inset-0 z-0 font-extrabold tracking-tighter text-accent-cyan blur-[1px] opacity-50 translate-x-0.5 translate-y-0.5",
          className,
        )}
      >
        {text}
      </h1>
      <h1
        className={cn(
          "absolute inset-0 z-0 font-extrabold tracking-tighter text-accent-magenta blur-[1px] opacity-50 -translate-x-0.5 -translate-y-0.5",
          className,
        )}
      >
        {text}
      </h1>
    </div>
  );
};
