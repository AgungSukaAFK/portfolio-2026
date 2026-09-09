import type { Metadata } from "next";
import { CRTBackground } from "@/components/ui/crt-background";
import { SectionHeading } from "@/components/ui/section-heading";
import { ComingSoon } from "@/components/ui/coming-soon";
import { PostList } from "@/components/posts/post-list";
import { readCollection } from "@/lib/store";
import type { Post } from "@/lib/collections";

export const metadata: Metadata = {
  title: "Articles — AgungSukaAFK",
  description: "Tulisan & catatan AgungSukaAFK.",
};

// Reads data/articles.json on every request instead of baking it into the
// static build — otherwise edits from the admin panel wouldn't show up
// without a full rebuild.
export const dynamic = "force-dynamic";

const BUILD_LOG = [
  "drafting blog post...",
  "npm run write --topic=random...",
  "fixing typo untuk ke-10 kalinya...",
  "masih dirapikan, sabar ya...",
];

export default async function ArticlesPage() {
  const all = await readCollection<Post>("articles");
  const posts = all
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  if (posts.length === 0) {
    return (
      <ComingSoon
        title="Articles"
        description="Catatan & pemikiran seputar development dan hal-hal yang baru dipelajari. Lagi disiapin."
        icon="articles"
        buildLog={BUILD_LOG}
      />
    );
  }

  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden px-4 py-20 md:py-28">
      <CRTBackground />
      <div className="relative z-10 mx-auto max-w-3xl">
        <SectionHeading eyebrow="Articles" title="Tulisan Terbaru" />
        <PostList posts={posts} basePath="/articles" />
      </div>
    </main>
  );
}
