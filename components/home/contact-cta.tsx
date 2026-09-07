"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { getSocials } from "@/lib/socials";
import { SectionHeading } from "@/components/home/terminal-about";

export function ContactCta() {
  const [copied, setCopied] = useState(false);
  const socials = getSocials();
  const email = socials.find((s) => s.key === "email");

  const handleCopy = async () => {
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email.handle);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable, ignore silently
    }
  };

  return (
    <section id="contact" className="relative z-10 px-4 py-20 md:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <SectionHeading eyebrow="04 / Connect" title="Ngobrol Yuk" align="center" />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-md font-mono text-sm text-muted-foreground"
        >
          Ada project seru, mau kolaborasi, atau cuma mau say hi — kotak
          masuk selalu kebuka.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6 flex justify-center"
        >
          <button
            type="button"
            onClick={handleCopy}
            className="group flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 font-mono text-sm transition-colors hover:border-accent-cyan cursor-pointer"
          >
            <span className="text-foreground/80">{email?.handle}</span>
            <span className="text-muted-foreground transition-colors group-hover:text-accent-cyan">
              {copied ? <Check size={14} className="text-accent-cyan" /> : <Copy size={14} />}
            </span>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          {socials
            .filter((s) => s.enabled)
            .map(({ key, label, url, icon: Icon }) => (
              <a
                key={key}
                href={url}
                target={url.startsWith("mailto:") ? undefined : "_blank"}
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-xs text-foreground/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-cyan hover:text-accent-cyan"
              >
                <Icon size={14} />
                {label}
              </a>
            ))}
        </motion.div>
      </div>
    </section>
  );
}
