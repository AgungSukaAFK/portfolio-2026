"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Post } from "@/lib/collections";

export function PostList({ posts, basePath }: { posts: Post[]; basePath: string }) {
  return (
    <div className="space-y-4">
      {posts.map((post, i) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, delay: (i % 8) * 0.06 }}
        >
          <Link
            href={`${basePath}/${post.slug}`}
            className="group flex flex-col gap-1.5 rounded-lg border border-border bg-card p-5 transition-colors hover:border-accent-cyan"
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-bold">{post.title}</h3>
              <ArrowRight
                size={16}
                className="shrink-0 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent-cyan"
              />
            </div>
            {post.excerpt && (
              <p className="font-mono text-sm text-muted-foreground">{post.excerpt}</p>
            )}
            <p className="font-mono text-[11px] text-muted-foreground">
              {new Date(post.createdAt).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
