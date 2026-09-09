"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Star } from "lucide-react";
import { TiltCard } from "@/components/ui/tilt-card";
import type { Project } from "@/lib/collections";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, i) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, delay: (i % 6) * 0.08 }}
        >
          <TiltCard className="flex h-full flex-col p-6">
            <div className="mb-3 flex items-start justify-between gap-2">
              <h3 className="font-bold">{project.title}</h3>
              {project.featured && (
                <span className="flex shrink-0 items-center gap-1 rounded-full border border-accent-magenta/40 bg-accent-magenta/10 px-2 py-0.5 font-mono text-[10px] text-accent-magenta">
                  <Star size={10} />
                  featured
                </span>
              )}
            </div>

            {project.description && (
              <p className="flex-1 font-mono text-sm text-muted-foreground">
                {project.description}
              </p>
            )}

            {project.tech.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            {(project.liveUrl || project.repoUrl) && (
              <div className="mt-5 flex items-center gap-2 border-t border-border pt-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 font-mono text-xs text-foreground/70 transition-colors hover:border-accent-cyan hover:text-accent-cyan"
                  >
                    <ExternalLink size={12} />
                    Live
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 font-mono text-xs text-foreground/70 transition-colors hover:border-accent-cyan hover:text-accent-cyan"
                  >
                    <Github size={12} />
                    Repo
                  </a>
                )}
              </div>
            )}
          </TiltCard>
        </motion.div>
      ))}
    </div>
  );
}
