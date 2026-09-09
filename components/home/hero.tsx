"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, FileText, FolderGit2 } from "lucide-react";
import { CRTBackground } from "@/components/ui/crt-background";
import { GlitchText } from "@/components/ui/glitch-text";
import { useCyclingText } from "@/hooks/use-cycling-text";

const CV_HREF = encodeURI("/CV Muhamad Agung Maulana.pdf");

const STATUSES = [
  "AFK (Away From Keyboard) but Coding.",
  "Debugging in production. Again.",
  "99 tabs open, 1 of them is the code.",
  "Currently arguing with CSS.",
  "Compiling... please wait.",
];

export function Hero() {
  const status = useCyclingText(STATUSES, {
    typeSpeed: 40,
    deleteSpeed: 20,
    holdMs: 1600,
  });

  return (
    <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-4 text-center">
      <CRTBackground />

      <div className="relative z-10 flex flex-col items-center space-y-6">
        {/* STATUS BADGE */}
        <div className="inline-flex h-8 min-w-[280px] items-center justify-center rounded-full border border-accent-cyan/30 bg-accent-cyan/10 px-3 text-xs sm:text-sm font-mono text-accent-cyan backdrop-blur-md">
          <span className="mr-2 flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-accent-cyan opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-cyan" />
          </span>
          <span>
            Status: {status}
            <span className="ml-0.5 animate-blink">▌</span>
          </span>
        </div>

        {/* HERO TITLE */}
        <GlitchText
          text="AGUNGSUKAAFK"
          className="text-5xl md:text-7xl lg:text-8xl uppercase"
        />

        {/* TAGLINE */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg md:text-xl text-foreground/80 font-mono max-w-[600px]"
        >
          <span className="text-accent-cyan">#1</span> programmer cipocok.
          <br />
          <span className="text-sm text-muted-foreground">
            Menaklukkan bug sambil rebahan.
          </span>
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3 pt-2"
        >
          <MagneticLink href="/projects" primary>
            <FolderGit2 size={15} />
            Lihat Projects
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </MagneticLink>
          <MagneticLink href={CV_HREF} external>
            <FileText size={15} />
            Lihat CV
          </MagneticLink>
          <MagneticLink href="#about">Kenalan Dulu</MagneticLink>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1.4, duration: 0.6 },
          y: { delay: 1.4, duration: 1.6, repeat: Infinity, ease: "easeInOut" },
        }}
        aria-label="Scroll ke bawah"
        className="absolute bottom-8 z-10 text-muted-foreground transition-colors hover:text-accent-cyan"
      >
        <ChevronDown size={22} />
      </motion.a>
    </section>
  );
}

function MagneticLink({
  href,
  children,
  primary,
  external,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
  external?: boolean;
}) {
  const className = primary
    ? "group flex items-center gap-2 rounded-md border border-accent-cyan bg-accent-cyan/10 px-5 py-2.5 font-mono text-sm text-accent-cyan transition-colors hover:bg-accent-cyan hover:text-black"
    : "group flex items-center gap-2 rounded-md border border-border px-5 py-2.5 font-mono text-sm text-foreground/80 transition-colors hover:border-foreground/40 hover:text-foreground";

  return (
    <motion.span whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
      {external ? (
        <a href={href} target="_blank" rel="noreferrer" className={className}>
          {children}
        </a>
      ) : (
        <Link href={href} className={className}>
          {children}
        </Link>
      )}
    </motion.span>
  );
}
