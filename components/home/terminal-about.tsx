"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTypedLines, type TypedLine } from "@/hooks/use-typed-lines";
import { ProfilePhoto } from "@/components/home/profile-photo";

const LINES: TypedLine[] = [
  {
    prompt: "whoami",
    output: "AgungSukaAFK — programmer yang lebih produktif jam 12 malam.",
  },
  {
    prompt: "cat interests.txt",
    output:
      "Web development, ngoprek UI/UX, dan naruh animasi kecil biar halamannya kerasa hidup.",
  },
  {
    prompt: "echo $CURRENT_FOCUS",
    output: "Ngebangun portfolio ini pelan-pelan, satu halaman per waktu.",
  },
  {
    prompt: "cat status.txt",
    output: "Open buat ngobrol/kolaborasi. Scroll ke bawah buat kontak.",
  },
];

export function TerminalAbout() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const { completedLines, currentLine, done } = useTypedLines(LINES, inView);

  return (
    <section id="about" className="relative z-10 px-4 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="01 / About" title="Kenalan Dulu" />

        <div className="flex flex-col gap-8 md:flex-row md:items-start">
          <ProfilePhoto />

          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6 }}
            className="flex-1 overflow-hidden rounded-lg border border-border bg-card shadow-2xl shadow-black/10 dark:shadow-black/40"
          >
            {/* Title bar */}
            <div className="flex items-center gap-1.5 border-b border-border bg-foreground/[0.03] px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
              <span className="ml-3 font-mono text-xs text-muted-foreground">
                guest@agungsukaafk: ~
              </span>
            </div>

            {/* Body */}
            <div className="space-y-2.5 px-5 py-6 font-mono text-sm leading-relaxed">
              {LINES.slice(0, completedLines.length).map((line, i) => (
                <TerminalLine key={i} prompt={line.prompt} output={line.output} />
              ))}

              {!done && currentLine !== null && (
                <TerminalLine
                  prompt={LINES[completedLines.length].prompt}
                  output={currentLine}
                  caret
                />
              )}

              {done && (
                <div className="flex items-center gap-2 pt-1 text-accent-cyan">
                  <span className="text-accent-magenta">$</span>
                  <span className="animate-blink">▌</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TerminalLine({
  prompt,
  output,
  caret,
}: {
  prompt: string;
  output: string;
  caret?: boolean;
}) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 text-accent-magenta">
        <span>$</span>
        <span>{prompt}</span>
      </div>
      <p className="pl-4 text-foreground/85">
        {output}
        {caret && <span className="ml-0.5 animate-blink">▌</span>}
      </p>
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5 }}
      className={`mb-8 ${align === "center" ? "text-center" : ""}`}
    >
      <span className="font-mono text-xs uppercase tracking-widest text-accent-cyan">
        {eyebrow}
      </span>
      <h2 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight">
        {title}
      </h2>
    </motion.div>
  );
}
