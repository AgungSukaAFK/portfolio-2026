import Link from "next/link";
import { ArrowUpRight, FolderGit2, GraduationCap, Newspaper, type LucideIcon } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { readCollection } from "@/lib/store";
import type { Post, Project } from "@/lib/collections";

// Reads the data files on every request — otherwise these counts would be
// frozen at whatever they were during `next build`.
export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [projects, articles, tutorials] = await Promise.all([
    readCollection<Project>("projects"),
    readCollection<Post>("articles"),
    readCollection<Post>("tutorials"),
  ]);

  const cards: { href: string; label: string; count: number; icon: LucideIcon }[] = [
    { href: "/admin/projects", label: "Projects", count: projects.length, icon: FolderGit2 },
    { href: "/admin/articles", label: "Articles", count: articles.length, icon: Newspaper },
    { href: "/admin/tutorials", label: "Tutorials", count: tutorials.length, icon: GraduationCap },
  ];

  return (
    <AdminShell>
      <h1 className="mb-1 text-2xl font-bold">Dashboard</h1>
      <p className="mb-8 font-mono text-sm text-muted-foreground">
        Kelola konten yang tampil di halaman publik dari sini.
      </p>

      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group flex flex-col gap-4 rounded-lg border border-border bg-card p-5 transition-colors hover:border-accent-cyan"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-accent-cyan/10 text-accent-cyan">
                <card.icon size={18} />
              </span>
              <ArrowUpRight
                size={16}
                className="text-muted-foreground transition-colors group-hover:text-accent-cyan"
              />
            </div>
            <div>
              <p className="text-2xl font-bold tabular-nums">{card.count}</p>
              <p className="font-mono text-sm text-muted-foreground">{card.label}</p>
            </div>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
