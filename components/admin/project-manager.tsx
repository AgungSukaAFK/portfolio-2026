"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  FolderGit2,
  Github,
  Loader2,
  Pencil,
  Plus,
  Star,
  Trash2,
  X,
} from "lucide-react";
import type { Project } from "@/lib/collections";
import { ADMIN_INPUT_CLASS } from "@/lib/admin-styles";
import { cn } from "@/lib/utils";

const EMPTY_FORM = {
  title: "",
  description: "",
  tech: "",
  liveUrl: "",
  repoUrl: "",
  image: "",
  featured: false,
};

type FormState = typeof EMPTY_FORM;

export function ProjectManager() {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/projects");
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => {
    // Initial fetch on mount — an accepted exception to this rule per the
    // React docs (https://react.dev/learn/synchronizing-with-effects).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  function openCreate() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setError(null);
    setFormOpen(true);
  }

  function openEdit(item: Project) {
    setEditingId(item.id);
    setForm({
      title: item.title,
      description: item.description,
      tech: item.tech.join(", "),
      liveUrl: item.liveUrl ?? "",
      repoUrl: item.repoUrl ?? "",
      image: item.image ?? "",
      featured: item.featured,
    });
    setError(null);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditingId(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      title: form.title,
      description: form.description,
      tech: form.tech
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      liveUrl: form.liveUrl,
      repoUrl: form.repoUrl,
      image: form.image,
      featured: form.featured,
    };

    const res = await fetch(
      editingId ? `/api/admin/projects/${editingId}` : "/api/admin/projects",
      {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      setError(data.error ?? "Gagal nyimpen.");
      setSaving(false);
      return;
    }

    await load();
    setSaving(false);
    closeForm();
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus project ini?")) return;
    setDeletingId(id);
    const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    if (res.ok) {
      setItems((prev) => prev.filter((p) => p.id !== id));
    } else {
      const data = await res.json().catch(() => ({}));
      alert(data.error ?? "Gagal menghapus.");
    }
    setDeletingId(null);
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="font-mono text-sm text-muted-foreground">
            {items.length} project tersimpan.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="flex items-center gap-1.5 rounded-md border border-accent-cyan bg-accent-cyan/10 px-3.5 py-2 font-mono text-sm text-accent-cyan transition-colors hover:bg-accent-cyan hover:text-black cursor-pointer"
        >
          <Plus size={15} />
          Project Baru
        </button>
      </div>

      <AnimatePresence>
        {formOpen && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            className="mb-6 overflow-hidden rounded-lg border border-border bg-card"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-3">
              <h2 className="font-mono text-sm font-bold text-accent-cyan">
                {editingId ? "Edit Project" : "Project Baru"}
              </h2>
              <button
                type="button"
                onClick={closeForm}
                className="text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="grid gap-4 p-5 sm:grid-cols-2">
              <Field label="Judul" required className="sm:col-span-2">
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  className={ADMIN_INPUT_CLASS}
                  placeholder="Nama project"
                />
              </Field>

              <Field label="Deskripsi" className="sm:col-span-2">
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className={cn(ADMIN_INPUT_CLASS, "resize-none")}
                  placeholder="Ceritain project-nya sekilas"
                />
              </Field>

              <Field label="Tech (pisah pakai koma)" className="sm:col-span-2">
                <input
                  value={form.tech}
                  onChange={(e) => setForm({ ...form, tech: e.target.value })}
                  className={ADMIN_INPUT_CLASS}
                  placeholder="Next.js, TypeScript, Tailwind"
                />
              </Field>

              <Field label="Live URL">
                <input
                  value={form.liveUrl}
                  onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                  className={ADMIN_INPUT_CLASS}
                  placeholder="https://..."
                />
              </Field>

              <Field label="Repo URL">
                <input
                  value={form.repoUrl}
                  onChange={(e) => setForm({ ...form, repoUrl: e.target.value })}
                  className={ADMIN_INPUT_CLASS}
                  placeholder="https://github.com/..."
                />
              </Field>

              <Field label="Gambar (path/URL)" className="sm:col-span-2">
                <input
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className={ADMIN_INPUT_CLASS}
                  placeholder="/projects/foo.png atau URL"
                />
              </Field>

              <label className="flex items-center gap-2 font-mono text-sm sm:col-span-2">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="h-4 w-4 accent-cyan-500"
                />
                Featured (ditonjolin di halaman Projects)
              </label>
            </div>

            {error && (
              <p className="px-5 pb-2 font-mono text-xs text-red-400">{error}</p>
            )}

            <div className="flex items-center justify-end gap-2 border-t border-border px-5 py-3">
              <button
                type="button"
                onClick={closeForm}
                className="rounded-md border border-border px-3.5 py-2 font-mono text-sm text-foreground/70 hover:text-foreground cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-1.5 rounded-md border border-accent-cyan bg-accent-cyan/10 px-3.5 py-2 font-mono text-sm text-accent-cyan hover:bg-accent-cyan hover:text-black disabled:opacity-50 cursor-pointer"
              >
                {saving && <Loader2 size={14} className="animate-spin" />}
                Simpan
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="flex items-center gap-2 py-10 justify-center font-mono text-sm text-muted-foreground">
          <Loader2 size={16} className="animate-spin" />
          Loading...
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-border py-14 text-center">
          <FolderGit2 size={24} className="text-muted-foreground" />
          <p className="font-mono text-sm text-muted-foreground">
            Belum ada project. Klik &quot;Project Baru&quot; buat nambahin.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-bold">{item.title}</h3>
                  {item.featured && (
                    <span className="flex items-center gap-1 rounded-full border border-accent-magenta/40 bg-accent-magenta/10 px-2 py-0.5 font-mono text-[10px] text-accent-magenta">
                      <Star size={10} />
                      featured
                    </span>
                  )}
                </div>
                {item.description && (
                  <p className="mt-1 line-clamp-2 font-mono text-sm text-muted-foreground">
                    {item.description}
                  </p>
                )}
                {item.tech.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {item.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex shrink-0 items-center gap-1.5">
                {item.liveUrl && (
                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground hover:border-accent-cyan hover:text-accent-cyan"
                    title="Buka live URL"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
                {item.repoUrl && (
                  <a
                    href={item.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground hover:border-accent-cyan hover:text-accent-cyan"
                    title="Buka repo"
                  >
                    <Github size={14} />
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => openEdit(item)}
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground hover:border-accent-cyan hover:text-accent-cyan cursor-pointer"
                  title="Edit"
                >
                  <Pencil size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  disabled={deletingId === item.id}
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground hover:border-red-400 hover:text-red-400 disabled:opacity-50 cursor-pointer"
                  title="Hapus"
                >
                  {deletingId === item.id ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Trash2 size={14} />
                  )}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Field({
  label,
  required,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 block font-mono text-xs text-muted-foreground">
        {label}
        {required && <span className="text-accent-magenta"> *</span>}
      </label>
      {children}
    </div>
  );
}
