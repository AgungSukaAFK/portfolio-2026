"use client";

import type { IconType } from "react-icons";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiFramer,
  SiNodedotjs,
  SiGit,
  SiFigma,
  SiVercel,
  SiVsco,
  SiNpm,
} from "react-icons/si";
import { SectionHeading } from "@/components/home/terminal-about";
import { cn } from "@/lib/utils";

interface Tech {
  name: string;
  icon: IconType;
}

const STACK: Tech[] = [
  { name: "Next.js", icon: SiNextdotjs },
  { name: "React", icon: SiReact },
  { name: "TypeScript", icon: SiTypescript },
  { name: "JavaScript", icon: SiJavascript },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Framer Motion", icon: SiFramer },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Git", icon: SiGit },
  { name: "npm", icon: SiNpm },
  { name: "Figma", icon: SiFigma },
  { name: "Vercel", icon: SiVercel },
  { name: "VS Code", icon: SiVsco },
];

function rotate<T>(arr: T[], by: number): T[] {
  const n = ((by % arr.length) + arr.length) % arr.length;
  return [...arr.slice(n), ...arr.slice(0, n)];
}

const ROWS = [
  { items: rotate(STACK, 0), direction: "left" as const, duration: 32 },
  { items: rotate(STACK, 3), direction: "right" as const, duration: 38 },
  { items: rotate(STACK, 6), direction: "left" as const, duration: 26 },
  { items: rotate(STACK, 9), direction: "right" as const, duration: 34 },
];

export function TechStackMarquee() {
  return (
    <section className="relative z-10 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading eyebrow="02 / Toolbox" title="Tools yang Sering Dipakai" />
      </div>

      <div className="flex flex-col gap-4">
        {ROWS.map((row, i) => (
          <MarqueeRow key={i} {...row} />
        ))}
      </div>
    </section>
  );
}

function MarqueeRow({
  items,
  direction,
  duration,
}: {
  items: Tech[];
  direction: "left" | "right";
  duration: number;
}) {
  const loop = [...items, ...items];

  return (
    <div className="group relative overflow-hidden py-2 mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className="flex w-max gap-4 animate-marquee group-hover:[animation-play-state:paused]"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
      >
        {loop.map((tech, i) => (
          <TechChip key={`${tech.name}-${i}`} tech={tech} />
        ))}
      </div>
    </div>
  );
}

function TechChip({ tech }: { tech: Tech }) {
  const Icon = tech.icon;
  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center gap-2.5 rounded-lg border border-border bg-card px-4 py-3 text-foreground/70 transition-all duration-300",
        "hover:z-10 hover:-translate-y-1 hover:border-accent-cyan hover:text-accent-cyan hover:shadow-lg hover:shadow-accent-cyan/10",
      )}
    >
      <Icon size={18} />
      <span className="font-mono text-sm whitespace-nowrap">{tech.name}</span>
    </div>
  );
}
