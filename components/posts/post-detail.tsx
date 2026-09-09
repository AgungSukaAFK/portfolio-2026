"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { CRTBackground } from "@/components/ui/crt-background";
import type { Post } from "@/lib/collections";

export function PostDetail({ post, basePath }: { post: Post; basePath: string }) {
  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden px-4 py-20 md:py-28">
      <CRTBackground />
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mx-auto max-w-2xl"
      >
        <Link
          href={basePath}
          className="group mb-8 inline-flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-accent-cyan"
        >
          <ArrowLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-1" />
          Balik ke daftar
        </Link>

        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{post.title}</h1>
        <p className="mt-2 font-mono text-xs text-muted-foreground">
          {new Date(post.createdAt).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>

        {post.excerpt && (
          <p className="mt-6 font-mono text-base text-foreground/80">{post.excerpt}</p>
        )}

        {post.content && (
          <div className="mt-6 whitespace-pre-wrap font-mono text-sm leading-relaxed text-foreground/85">
            {post.content}
          </div>
        )}
      </motion.article>
    </main>
  );
}
