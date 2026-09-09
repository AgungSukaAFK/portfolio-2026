import { randomUUID } from "crypto";

export const COLLECTIONS = ["projects", "articles", "tutorials"] as const;
export type CollectionName = (typeof COLLECTIONS)[number];

export function isCollectionName(value: string): value is CollectionName {
  return (COLLECTIONS as readonly string[]).includes(value);
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  repoUrl?: string;
  image?: string;
  featured: boolean;
  createdAt: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  published: boolean;
  createdAt: string;
}

export type CollectionItem = Project | Post;

type Body = Record<string, unknown>;

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function slugify(input: string): string {
  const slug = input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return slug || "untitled";
}

function dedupeSlug(base: string, items: Post[], ignoreId?: string): string {
  let slug = base;
  let n = 2;
  while (items.some((i) => i.slug === slug && i.id !== ignoreId)) {
    slug = `${base}-${n++}`;
  }
  return slug;
}

export function buildProject(
  body: Body,
  existing?: Project,
): { error: string } | Project {
  const title = str(body.title) || existing?.title || "";
  if (!title) return { error: "Judul wajib diisi." };

  return {
    id: existing?.id ?? randomUUID(),
    title,
    description: str(body.description) || existing?.description || "",
    tech: Array.isArray(body.tech)
      ? body.tech.map((t) => String(t).trim()).filter(Boolean)
      : (existing?.tech ?? []),
    liveUrl: str(body.liveUrl) || undefined,
    repoUrl: str(body.repoUrl) || undefined,
    image: str(body.image) || undefined,
    featured: typeof body.featured === "boolean" ? body.featured : (existing?.featured ?? false),
    createdAt: existing?.createdAt ?? new Date().toISOString(),
  };
}

export function buildPost(
  body: Body,
  items: Post[],
  existing?: Post,
): { error: string } | Post {
  const title = str(body.title) || existing?.title || "";
  if (!title) return { error: "Judul wajib diisi." };

  const baseSlug = slugify(str(body.slug) || title);
  const slug = dedupeSlug(baseSlug, items, existing?.id);

  return {
    id: existing?.id ?? randomUUID(),
    title,
    slug,
    excerpt: str(body.excerpt) || existing?.excerpt || "",
    content: str(body.content) || existing?.content || "",
    published: typeof body.published === "boolean" ? body.published : (existing?.published ?? false),
    createdAt: existing?.createdAt ?? new Date().toISOString(),
  };
}
