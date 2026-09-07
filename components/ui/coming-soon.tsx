"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  FolderGit2,
  Newspaper,
  GraduationCap,
} from "lucide-react";
import { CRTBackground } from "@/components/ui/crt-background";
import { useCyclingText } from "@/hooks/use-cycling-text";

// Icons are resolved from a key (instead of passed as a component) because
// this is a Client Component — a Server Component page can't pass a
// function reference like a Lucide icon across the boundary as a prop.
const ICONS = {
  projects: FolderGit2,
  articles: Newspaper,
  tutorials: GraduationCap,
} as const;

interface ComingSoonProps {
  title: string;
  description: string;
  icon: keyof typeof ICONS;
  buildLog: string[];
}

export function ComingSoon({
  title,
  description,
  icon,
  buildLog,
}: ComingSoonProps) {
  const Icon = ICONS[icon];
  const log = useCyclingText(buildLog, {
    typeSpeed: 35,
    deleteSpeed: 18,
    holdMs: 1500,
  });

  return (
    <main className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden px-4 text-center">
      <CRTBackground />

      <div className="relative z-10 flex flex-col items-center space-y-6">
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 4, -4, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-20 w-20 items-center justify-center rounded-2xl border border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan"
        >
          <Icon size={34} />
        </motion.div>

        <div className="inline-flex items-center rounded-full border border-accent-magenta/30 bg-accent-magenta/10 px-3 py-1 font-mono text-xs text-accent-magenta">
          Under construction
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter">
          {title}
          <span className="text-accent-cyan">.</span>
        </h1>

        <p className="max-w-md font-mono text-base text-muted-foreground">
          {description}
        </p>

        <div className="mt-4 flex h-6 min-w-75 items-center justify-center font-mono text-xs text-foreground/60">
          <span className="text-accent-cyan mr-1.5">$</span>
          <span>{log}</span>
          <span className="ml-0.5 animate-blink">▌</span>
        </div>

        <ProgressBar />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="pt-4"
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 font-mono text-sm text-foreground/80 transition-colors hover:border-accent-cyan hover:text-accent-cyan"
          >
            <ArrowLeft
              size={15}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Balik ke Home
          </Link>
        </motion.div>
      </div>
    </main>
  );
}

function ProgressBar() {
  return (
    <div className="h-1.5 w-64 overflow-hidden rounded-full bg-foreground/10">
      <motion.div
        animate={{ x: ["-100%", "100%", "-100%"] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="h-full w-1/2 rounded-full bg-linear-to-r from-accent-cyan to-accent-magenta"
      />
    </div>
  );
}
