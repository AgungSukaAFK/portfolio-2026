"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { getSocials } from "@/lib/socials";

export function Footer() {
  const [time, setTime] = useState<string | null>(null);
  const socials = getSocials();

  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Jakarta",
        }).format(new Date()),
      );
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="relative z-10 border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:px-6">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {socials.map(({ key, label, url, enabled, icon: Icon }) => {
            const content = (
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-all duration-300 group-hover:border-accent-cyan group-hover:text-accent-cyan group-hover:-translate-y-1">
                <Icon size={16} />
              </span>
            );
            return enabled ? (
              <a
                key={key}
                href={url}
                target={url.startsWith("mailto:") ? undefined : "_blank"}
                rel="noreferrer"
                title={label}
                className="group flex flex-col items-center gap-1 text-foreground/70"
              >
                {content}
                <span className="font-mono text-[10px] opacity-0 transition-opacity group-hover:opacity-100">
                  {label}
                </span>
              </a>
            ) : (
              <span
                key={key}
                title={`${label} — coming soon`}
                className="group flex cursor-not-allowed flex-col items-center gap-1 text-foreground/30"
              >
                {content}
                <span className="font-mono text-[10px] opacity-0 transition-opacity group-hover:opacity-100">
                  soon
                </span>
              </span>
            );
          })}
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-center font-mono text-xs text-muted-foreground md:flex-row md:text-left">
          <p>
            © {new Date().getFullYear()} AgungSukaAFK. Built with Next.js,
            Tailwind &amp; Framer Motion.
          </p>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-cyan opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-cyan" />
              </span>
              WIB {time ?? "--:--:--"}
            </span>

            <motion.button
              type="button"
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Back to top"
              className="flex h-7 w-7 items-center justify-center rounded-md border border-border hover:border-accent-cyan hover:text-accent-cyan cursor-pointer"
            >
              <ArrowUp size={13} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
