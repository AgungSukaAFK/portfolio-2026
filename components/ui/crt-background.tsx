// src/components/ui/crt-background.tsx
"use client";

import { motion } from "framer-motion";

export const CRTBackground = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] h-screen w-screen overflow-hidden bg-background transition-colors duration-300">
      {/* Efek Vignette (Pinggiran gelap/terang, mengikuti tema) */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, transparent 0%, rgb(var(--vignette-color)) 90%)",
        }}
      />

      {/* Efek Scanlines (Garis-garis TV Tabung), opacity ikut tema */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(transparent 50%, rgba(127, 127, 127, 0.8) 50%)",
          backgroundSize: "100% 4px",
          opacity: "var(--scanline-opacity)",
        }}
      />

      {/* Efek Noise/Semut halus yang bergerak */}
      <motion.div
        animate={{
          x: ["0%", "-10%", "0%"],
          y: ["0%", "-10%", "0%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 0.5,
          ease: "linear",
        }}
        className="absolute inset-[-100%] opacity-[0.08] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-difference dark:mix-blend-normal"
      />
    </div>
  );
};
