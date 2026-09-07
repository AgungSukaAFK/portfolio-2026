"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

function useElapsedTime() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

export function ProfilePhoto() {
  const elapsed = useElapsedTime();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotate: -2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6 }}
      className="mx-auto w-full max-w-[280px] md:mx-0"
    >
      <div className="group relative overflow-hidden rounded-lg border border-border bg-card shadow-2xl shadow-black/10 dark:shadow-black/40">
        {/* Header bar — matches the terminal window's chrome language */}
        <div className="flex items-center justify-between border-b border-border bg-foreground/[0.03] px-3 py-2">
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-red-400">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-blink" />
            REC
          </span>
          <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
            {elapsed}
          </span>
        </div>

        {/* Photo, recolored to fit the cyan/magenta terminal palette */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src="/profile.jpg"
            alt="AgungSukaAFK"
            fill
            sizes="280px"
            priority
            className="object-cover grayscale contrast-125 brightness-90 transition-[filter,transform] duration-500 group-hover:grayscale-[0.35] group-hover:brightness-100 group-hover:scale-[1.04]"
          />

          {/* Duotone tint — this is what pulls a bright photo into the theme */}
          <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-accent-cyan to-accent-magenta mix-blend-color transition-opacity duration-500 opacity-85 group-hover:opacity-50" />
          <div className="pointer-events-none absolute inset-0 bg-black/10 mix-blend-multiply" />

          {/* Scanlines, consistent with CRTBackground */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(transparent 50%, rgba(0,0,0,0.7) 50%)",
              backgroundSize: "100% 3px",
              opacity: 0.25,
            }}
          />

          {/* Slow vertical scan sweep, loops forever */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 h-1/3 bg-linear-to-b from-transparent via-accent-cyan/40 to-transparent mix-blend-screen"
            animate={{ y: ["-100%", "300%"] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "linear" }}
          />

          {/* Vignette */}
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_40px_20px_rgba(0,0,0,0.5)]" />

          {/* Corner reticle brackets */}
          {(["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"] as const).map(
            (pos, i) => (
              <span
                key={pos}
                className={`pointer-events-none absolute h-3 w-3 border-accent-cyan/80 opacity-60 transition-opacity duration-300 group-hover:opacity-100 ${pos} ${
                  i === 0
                    ? "border-t-2 border-l-2"
                    : i === 1
                      ? "border-t-2 border-r-2"
                      : i === 2
                        ? "border-b-2 border-l-2"
                        : "border-b-2 border-r-2"
                }`}
              />
            ),
          )}
        </div>

        {/* Caption bar */}
        <div className="flex items-center gap-1.5 border-t border-border px-3 py-2 font-mono text-[11px] text-muted-foreground">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-cyan opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-cyan" />
          </span>
          agungsukaafk.jpg — status: online
        </div>
      </div>
    </motion.div>
  );
}
