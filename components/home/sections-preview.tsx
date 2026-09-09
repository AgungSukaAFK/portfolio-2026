"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FolderGit2, Newspaper, GraduationCap, ArrowUpRight, type LucideIcon } from "lucide-react";
import { TiltCard } from "@/components/ui/tilt-card";
import { SectionHeading } from "@/components/ui/section-heading";

interface PreviewCard {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
  progress: number;
}

const CARDS: PreviewCard[] = [
  {
    href: "/projects",
    title: "Projects",
    description:
      "Kumpulan project yang pernah & lagi dikerjain — dari eksperimen kecil sampai yang serius.",
    icon: FolderGit2,
    progress: 35,
  },
  {
    href: "/articles",
    title: "Articles",
    description:
      "Catatan & pemikiran seputar development, tooling, dan hal-hal yang baru dipelajari.",
    icon: Newspaper,
    progress: 15,
  },
  {
    href: "/tutorials",
    title: "Tutorials",
    description:
      "Panduan step-by-step buat yang mau belajar bareng, ditulis sesantai mungkin.",
    icon: GraduationCap,
    progress: 10,
  },
];

export function SectionsPreview() {
  return (
    <section className="relative z-10 px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="03 / Explore" title="Lagi Dibangun" />

        <div className="grid gap-5 md:grid-cols-3">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.href}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={card.href} className="block h-full">
                <TiltCard className="flex h-full flex-col p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-accent-cyan/10 text-accent-cyan">
                      <card.icon size={20} />
                    </span>
                    <span className="flex items-center gap-1 rounded-full border border-accent-magenta/40 bg-accent-magenta/10 px-2 py-0.5 font-mono text-[10px] text-accent-magenta">
                      coming soon
                    </span>
                  </div>

                  <h3 className="flex items-center gap-1 text-lg font-bold">
                    {card.title}
                    <ArrowUpRight
                      size={16}
                      className="text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-cyan"
                    />
                  </h3>
                  <p className="mt-2 flex-1 font-mono text-sm text-muted-foreground">
                    {card.description}
                  </p>

                  <div className="mt-5">
                    <div className="mb-1.5 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
                      <span>progress</span>
                      <span>{card.progress}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-foreground/10">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${card.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                        className="h-full rounded-full bg-linear-to-r from-accent-cyan to-accent-magenta"
                      />
                    </div>
                  </div>
                </TiltCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
