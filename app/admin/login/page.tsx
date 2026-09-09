"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, TerminalSquare } from "lucide-react";
import { CRTBackground } from "@/components/ui/crt-background";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Gagal login.");
        setLoading(false);
        return;
      }
      const next = params.get("next") || "/admin";
      router.push(next);
      router.refresh();
    } catch {
      setError("Gagal konek ke server.");
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4">
      <CRTBackground />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-sm overflow-hidden rounded-lg border border-border bg-card shadow-2xl shadow-black/10 dark:shadow-black/40"
      >
        <div className="flex items-center gap-1.5 border-b border-border bg-foreground/[0.03] px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
          <span className="ml-3 font-mono text-xs text-muted-foreground">
            root@agungsukaafk: /admin
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 px-6 py-8">
          <div className="flex flex-col items-center gap-2 text-center">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan">
              <TerminalSquare size={20} />
            </span>
            <h1 className="font-mono text-lg font-bold">Admin Access</h1>
            <p className="font-mono text-xs text-muted-foreground">
              Masukin password buat masuk.
            </p>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="font-mono text-xs text-muted-foreground">
              password
            </label>
            <div className="relative">
              <Lock
                size={14}
                className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
              />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                required
                className="w-full rounded-md border border-border bg-background py-2 pr-9 pl-9 font-mono text-sm outline-none transition-colors focus:border-accent-cyan"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
                aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-mono text-xs text-red-400"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md border border-accent-cyan bg-accent-cyan/10 py-2.5 font-mono text-sm text-accent-cyan transition-colors hover:bg-accent-cyan hover:text-black disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Verifying..." : "Login"}
          </button>
        </form>
      </motion.div>
    </main>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
