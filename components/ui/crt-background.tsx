// src/components/ui/crt-background.tsx
"use client";

import { motion } from "framer-motion";

export const CRTBackground = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] h-screen w-screen overflow-hidden bg-black">
      {/* Efek Vignette (Pinggiran gelap) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000_90%)] opacity-60" />

      {/* Efek Scanlines (Garis-garis TV Tabung) */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(transparent 50%, rgba(0, 0, 0, 0.8) 50%)",
          backgroundSize: "100% 4px",
        }}
      />

      {/* Efek Noise/Semut halus yang bergerak (Opsional, pakai framer motion) */}
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
        className="absolute inset-[-100%] opacity-[0.08] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"
      />
    </div>
  );
};
