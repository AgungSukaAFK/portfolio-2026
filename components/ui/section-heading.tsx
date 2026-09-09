"use client";

import { motion } from "framer-motion";

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
      <h2 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
    </motion.div>
  );
}
