import type { Metadata } from "next";
import { ComingSoon } from "@/components/ui/coming-soon";

export const metadata: Metadata = {
  title: "Articles — AgungSukaAFK",
  description: "Tulisan & catatan AgungSukaAFK. Segera hadir.",
};

const BUILD_LOG = [
  "drafting blog post...",
  "npm run write --topic=random...",
  "fixing typo untuk ke-10 kalinya...",
  "masih dirapikan, sabar ya...",
];

export default function ArticlesPage() {
  return (
    <ComingSoon
      title="Articles"
      description="Catatan & pemikiran seputar development dan hal-hal yang baru dipelajari. Lagi disiapin."
      icon="articles"
      buildLog={BUILD_LOG}
    />
  );
}
