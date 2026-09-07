"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, TerminalSquare, type LucideIcon } from "lucide-react";
import { Home, FolderGit2, Newspaper, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  soon?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects", label: "Projects", icon: FolderGit2, soon: true },
  { href: "/articles", label: "Articles", icon: Newspaper, soon: true },
  { href: "/tutorials", label: "Tutorials", icon: GraduationCap, soon: true },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || mobileOpen
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="group flex items-center gap-2 font-bold tracking-tight"
        >
          <TerminalSquare
            size={20}
            className="text-accent-cyan transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
          />
          <span className="text-sm md:text-base">
            agungsukaafk
            <span className="ml-0.5 inline-block h-3.5 w-[7px] translate-y-[1px] bg-accent-cyan animate-blink align-middle" />
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.href} item={item} pathname={pathname} />
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground/80 transition-colors hover:border-accent-cyan hover:text-accent-cyan md:hidden cursor-pointer"
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-b border-border bg-background/95 backdrop-blur-md md:hidden"
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.06 } },
              }}
              className="flex flex-col gap-1 px-4 py-3"
            >
              {NAV_ITEMS.map((item) => (
                <motion.li
                  key={item.href}
                  variants={{
                    hidden: { opacity: 0, x: -12 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <MobileNavLink
                    item={item}
                    pathname={pathname}
                    onNavigate={() => setMobileOpen(false)}
                  />
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({ item, pathname }: { item: NavItem; pathname: string }) {
  const active = pathname === item.href;
  const Icon = item.icon;

  return (
    <li>
      <Link
        href={item.href}
        className={cn(
          "group relative flex items-center gap-1.5 rounded-md px-3 py-2 font-mono text-sm transition-colors",
          active
            ? "text-accent-cyan"
            : "text-foreground/70 hover:text-foreground",
        )}
      >
        <Icon size={14} />
        {item.label}
        {item.soon && (
          <span className="rounded-full border border-accent-magenta/40 bg-accent-magenta/10 px-1.5 py-0.5 text-[9px] leading-none text-accent-magenta">
            soon
          </span>
        )}
        <span
          className={cn(
            "absolute inset-x-2 -bottom-px h-px bg-accent-cyan transition-transform duration-300 origin-left",
            active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
          )}
        />
      </Link>
    </li>
  );
}

function MobileNavLink({
  item,
  pathname,
  onNavigate,
}: {
  item: NavItem;
  pathname: string;
  onNavigate: () => void;
}) {
  const active = pathname === item.href;
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        "flex items-center justify-between rounded-md border px-3 py-2.5 font-mono text-sm transition-colors",
        active
          ? "border-accent-cyan/40 bg-accent-cyan/10 text-accent-cyan"
          : "border-transparent text-foreground/80 hover:border-border hover:bg-foreground/5",
      )}
    >
      <span className="flex items-center gap-2">
        <Icon size={15} />
        {item.label}
      </span>
      {item.soon && (
        <span className="rounded-full border border-accent-magenta/40 bg-accent-magenta/10 px-1.5 py-0.5 text-[9px] leading-none text-accent-magenta">
          soon
        </span>
      )}
    </Link>
  );
}
