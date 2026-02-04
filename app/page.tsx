"use client";

// src/app/page.tsx
import { CRTBackground } from "@/components/ui/crt-background";
import { GlitchText } from "@/components/ui/glitch-text";
import { motion } from "framer-motion"; // Kita pakai motion di sini buat container

export default function Home() {
  return (
    // Container utama: Full layar, item ditengah, background hitam
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-black overflow-hidden px-4 text-center">
      {/* Pasang Background CRT di layer paling belakang */}
      <CRTBackground />

      {/* Content Wrapper (biar ada di atas background) */}
      <div className="relative z-10 flex flex-col items-center space-y-6">
        {/* STATUS BADGE (Pemanis) */}
        <div className="inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-sm font-mono text-cyan-400 backdrop-blur-md">
          <span className="mr-2 flex h-2 w-2">
            <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500"></span>
          </span>
          Status: AFK (Away From Keyboard) but Coding.
        </div>

        {/* HERO TITLE: GLITCH EFFECT */}
        {/* Responsif: text-5xl di HP, text-7xl di tablet ke atas */}
        <GlitchText
          text="AGUNGSUKAAFK"
          className="text-5xl md:text-7xl lg:text-8xl uppercase"
        />

        {/* TAGLINE */}
        {/* Animasi muncul pelan (fade in + naik dikit) */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }} // Muncul setelah glitch text
          className="text-lg md:text-xl text-gray-300 font-mono max-w-[600px]"
        >
          <span className="text-cyan-400">#1</span> programmer cipocok.
          <br />
          <span className="text-sm text-gray-500">
            Menaklukkan bug sambil rebahan.
          </span>
        </motion.p>

        {/* TEMPAT TOMBOL WAITLIST (Nanti kita isi di tahap selanjutnya) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 p-4 border border-dashed border-gray-700 rounded-lg text-gray-500"
        >
          [Coming soon: Fresh Portfolio, Tutorials, Articles, and more!]
        </motion.div>
      </div>
    </main>
  );
}
