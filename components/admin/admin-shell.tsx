"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderGit2,
  Newspaper,
  GraduationCap,
  LogOut,
  ExternalLink,
  TerminalSquare,
  type LucideIcon,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const NAV: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderGit2 },
  { href: "/admin/articles", label: "Articles", icon: Newspaper },
  { href: "/admin/tutorials", label: "Tutorials", icon: GraduationCap },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:px-6">
          <Link href="/admin" className="flex items-center gap-2 text-sm font-bold">
            <TerminalSquare size={18} className="text-accent-cyan" />
            admin@agungsukaafk
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <AdminNavLink key={item.href} item={item} active={pathname === item.href} />
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="hidden items-center gap-1.5 rounded-md border border-border px-3 py-1.5 font-mono text-xs text-foreground/70 transition-colors hover:border-accent-cyan hover:text-accent-cyan sm:flex"
            >
              <ExternalLink size={12} />
              Lihat situs
            </Link>
            <ThemeToggle />
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 font-mono text-xs text-foreground/70 transition-colors hover:border-red-400 hover:text-red-400 cursor-pointer"
            >
              <LogOut size={13} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        <nav className="flex items-center gap-1 overflow-x-auto border-t border-border px-4 py-2 md:hidden">
          {NAV.map((item) => (
            <AdminNavLink key={item.href} item={item} active={pathname === item.href} compact />
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 md:px-6">{children}</main>
    </div>
  );
}

function AdminNavLink({
  item,
  active,
  compact,
}: {
  item: NavItem;
  active: boolean;
  compact?: boolean;
}) {
  return (
    <Link
      href={item.href}
      className={cn(
        "flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 font-mono transition-colors",
        compact ? "text-xs" : "text-sm",
        active
          ? "bg-accent-cyan/10 text-accent-cyan"
          : "text-foreground/70 hover:text-foreground",
      )}
    >
      <item.icon size={compact ? 13 : 14} />
      {item.label}
    </Link>
  );
}
