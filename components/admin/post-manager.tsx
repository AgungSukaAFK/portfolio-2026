"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  CircleDashed,
  ExternalLink,
  GraduationCap,
  Loader2,
  Newspaper,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import type { Post } from "@/lib/collections";
import type { CollectionName } from "@/lib/collections";
import { ADMIN_INPUT_CLASS } from "@/lib/admin-styles";
import { cn } from "@/lib/utils";

const EMPTY_FORM = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  published: false,
};

type FormState = typeof EMPTY_FORM;

type PostCollection = Extract<CollectionName, "articles" | "tutorials">;

// Icons are resolved from the collection name (instead of passed as a
// component) because this is a Client Component — a Server Component page
// can't pass a function reference like a Lucide icon across the boundary.
const ICONS: Record<PostCollection, typeof Newspaper> = {
  articles: Newspaper,
  tutorials: GraduationCap,
};

interface PostManagerProps {
  collection: PostCollection;
  label: string;
  publicBasePath: string;
}

export function PostManager({ collection, label, publicBasePath }: PostManagerProps) {
  const Icon = ICONS[collection];
  const [items, setItems] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const apiBase = `/api/admin/${collection}`;

  async function load() {
    setLoading(true);
    const res = await fetch(apiBase);
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  // Fetch on mount and whenever the collection prop changes — an accepted
  // exception to this rule per the React docs
  // (https://react.dev/learn/synchronizing-with-effects). `load` is
  // intentionally omitted from deps: it's redefined every render but always
  // reads the current `apiBase`, which is already derived from `collection`.
  /* eslint-disable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */
  useEffect(() => {
    load();
  }, [collection]);
  /* eslint-enable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */

  function openCreate() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setError(null);
    setFormOpen(true);
  }

  function openEdit(item: Post) {
    setEditingId(item.id);
    setForm({
      title: item.title,
      slug: item.slug,
      excerpt: item.excerpt,
      content: item.content,
      published: item.published,
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

    const res = await fetch(editingId ? `${apiBase}/${editingId}` : apiBase, {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
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
    if (!confirm(`Hapus ${label.toLowerCase()} ini?`)) return;
    setDeletingId(id);
    const res = await fetch(`${apiBase}/${id}`, { method: "DELETE" });
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
          <h1 className="text-2xl font-bold">{label}</h1>
          <p className="font-mono text-sm text-muted-foreground">
            {items.length} tersimpan · {items.filter((i) => i.published).length} published.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="flex items-center gap-1.5 rounded-md border border-accent-cyan bg-accent-cyan/10 px-3.5 py-2 font-mono text-sm text-accent-cyan transition-colors hover:bg-accent-cyan hover:text-black cursor-pointer"
        >
          <Plus size={15} />
          Tulisan Baru
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
                {editingId ? "Edit Tulisan" : "Tulisan Baru"}
              </h2>
              <button
                type="button"
                onClick={closeForm}
                className="text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="grid gap-4 p-5">
              <Field label="Judul" required>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  className={ADMIN_INPUT_CLASS}
                  placeholder="Judul tulisan"
                />
              </Field>

              <Field label="Slug (kosongkan buat auto dari judul)">
                <input
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className={ADMIN_INPUT_CLASS}
                  placeholder="judul-tulisan"
                />
              </Field>

              <Field label="Ringkasan">
                <textarea
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  rows={2}
                  className={cn(ADMIN_INPUT_CLASS, "resize-none")}
                  placeholder="Ringkasan singkat buat preview di daftar"
                />
              </Field>

              <Field label="Konten">
                <textarea
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  rows={10}
                  className={cn(ADMIN_INPUT_CLASS, "resize-y font-mono")}
                  placeholder="Isi lengkap tulisannya (plain text)"
                />
              </Field>

              <label className="flex items-center gap-2 font-mono text-sm">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => setForm({ ...form, published: e.target.checked })}
                  className="h-4 w-4 accent-cyan-500"
                />
                Published (tampil di halaman publik)
              </label>
            </div>

            {error && <p className="px-5 pb-2 font-mono text-xs text-red-400">{error}</p>}

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
        <div className="flex items-center justify-center gap-2 py-10 font-mono text-sm text-muted-foreground">
          <Loader2 size={16} className="animate-spin" />
          Loading...
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-border py-14 text-center">
          <Icon size={24} className="text-muted-foreground" />
          <p className="font-mono text-sm text-muted-foreground">
            Belum ada tulisan. Klik &quot;Tulisan Baru&quot; buat nambahin.
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
                  {item.published ? (
                    <span className="flex items-center gap-1 rounded-full border border-accent-cyan/40 bg-accent-cyan/10 px-2 py-0.5 font-mono text-[10px] text-accent-cyan">
                      <CheckCircle2 size={10} />
                      published
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 rounded-full border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                      <CircleDashed size={10} />
                      draft
                    </span>
                  )}
                </div>
                {item.excerpt && (
                  <p className="mt-1 line-clamp-2 font-mono text-sm text-muted-foreground">
                    {item.excerpt}
                  </p>
                )}
                <p className="mt-1 font-mono text-[11px] text-muted-foreground">/{item.slug}</p>
              </div>

              <div className="flex shrink-0 items-center gap-1.5">
                {item.published && (
                  <a
                    href={`${publicBasePath}/${item.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground hover:border-accent-cyan hover:text-accent-cyan"
                    title="Lihat halaman publik"
                  >
                    <ExternalLink size={14} />
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
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block font-mono text-xs text-muted-foreground">
        {label}
        {required && <span className="text-accent-magenta"> *</span>}
      </label>
      {children}
    </div>
  );
}
