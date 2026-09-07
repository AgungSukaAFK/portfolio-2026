"use client";

import { motion } from "framer-motion";
import { Coffee, Bug, Moon, TerminalSquare, type LucideIcon } from "lucide-react";
import { useCountUp } from "@/hooks/use-count-up";

interface Stat {
  label: string;
  value: number;
  suffix?: string;
  icon: LucideIcon;
}

const STATS: Stat[] = [
  { label: "Cangkir kopi", value: 842, suffix: "+", icon: Coffee },
  { label: "Bug ditaklukkan", value: 1337, suffix: "", icon: Bug },
  { label: "Begadang demi ngoding", value: 96, suffix: "x", icon: Moon },
  { label: "console.log() ditulis", value: 9001, suffix: "+", icon: TerminalSquare },
];

export function Stats() {
  return (
    <section className="relative z-10 border-y border-border bg-foreground/[0.02] py-16 md:py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 md:grid-cols-4 md:px-6">
        {STATS.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} index={i} />
        ))}
      </div>
      <p className="mt-8 text-center font-mono text-xs text-muted-foreground">
        * angka-angka di atas kira-kira akurat, mungkin.
      </p>
    </section>
  );
}

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const { ref, value } = useCountUp(stat.value);
  const Icon = stat.icon;

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="flex flex-col items-center gap-2 rounded-lg border border-transparent p-4 text-center transition-colors hover:border-border"
    >
      <Icon size={20} className="text-accent-cyan" />
      <span className="text-2xl md:text-3xl font-bold tabular-nums">
        {value.toLocaleString("id-ID")}
        {stat.suffix}
      </span>
      <span className="font-mono text-xs text-muted-foreground">
        {stat.label}
      </span>
    </motion.div>
  );
}
