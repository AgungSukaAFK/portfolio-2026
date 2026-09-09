import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostDetail } from "@/components/posts/post-detail";
import { readCollection } from "@/lib/store";
import type { Post } from "@/lib/collections";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Reads data/tutorials.json on every request instead of relying on the route
// cache — otherwise an admin edit could keep serving a stale cached page.
export const dynamic = "force-dynamic";

async function getPost(slug: string) {
  const posts = await readCollection<Post>("tutorials");
  return posts.find((p) => p.slug === slug && p.published) ?? null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  return {
    title: post ? `${post.title} — AgungSukaAFK` : "Tutorial — AgungSukaAFK",
    description: post?.excerpt,
  };
}

export default async function TutorialDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  return <PostDetail post={post} basePath="/tutorials" />;
}
