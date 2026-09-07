import type { Metadata } from "next";
import { ComingSoon } from "@/components/ui/coming-soon";

export const metadata: Metadata = {
  title: "Tutorials — AgungSukaAFK",
  description: "Panduan step-by-step dari AgungSukaAFK. Segera hadir.",
};

const BUILD_LOG = [
  "outlining tutorial...",
  "recording screen...",
  "menyusun step-by-step...",
  "masih dirapikan, sabar ya...",
];

export default function TutorialsPage() {
  return (
    <ComingSoon
      title="Tutorials"
      description="Panduan step-by-step buat belajar bareng, ditulis sesantai mungkin. Masih disiapin."
      icon="tutorials"
      buildLog={BUILD_LOG}
    />
  );
}
