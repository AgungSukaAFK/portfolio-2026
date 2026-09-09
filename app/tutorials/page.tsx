import type { Metadata } from "next";
import { CRTBackground } from "@/components/ui/crt-background";
import { SectionHeading } from "@/components/ui/section-heading";
import { ComingSoon } from "@/components/ui/coming-soon";
import { PostList } from "@/components/posts/post-list";
import { readCollection } from "@/lib/store";
import type { Post } from "@/lib/collections";

export const metadata: Metadata = {
  title: "Tutorials — AgungSukaAFK",
  description: "Panduan step-by-step dari AgungSukaAFK.",
};

// Reads data/tutorials.json on every request instead of baking it into the
// static build — otherwise edits from the admin panel wouldn't show up
// without a full rebuild.
export const dynamic = "force-dynamic";

const BUILD_LOG = [
  "outlining tutorial...",
  "recording screen...",
  "menyusun step-by-step...",
  "masih dirapikan, sabar ya...",
];

export default async function TutorialsPage() {
  const all = await readCollection<Post>("tutorials");
  const posts = all
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  if (posts.length === 0) {
    return (
      <ComingSoon
        title="Tutorials"
        description="Panduan step-by-step buat belajar bareng, ditulis sesantai mungkin. Masih disiapin."
        icon="tutorials"
        buildLog={BUILD_LOG}
      />
    );
  }

  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden px-4 py-20 md:py-28">
      <CRTBackground />
      <div className="relative z-10 mx-auto max-w-3xl">
        <SectionHeading eyebrow="Tutorials" title="Panduan Terbaru" />
        <PostList posts={posts} basePath="/tutorials" />
      </div>
    </main>
  );
}
