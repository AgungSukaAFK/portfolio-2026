import type { Metadata } from "next";
import { ComingSoon } from "@/components/ui/coming-soon";

export const metadata: Metadata = {
  title: "Projects — AgungSukaAFK",
  description: "Kumpulan project AgungSukaAFK. Segera hadir.",
};

const BUILD_LOG = [
  "git clone projects...",
  "npm install awesomeness...",
  "compiling showcase...",
  "masih dirapikan, sabar ya...",
];

export default function ProjectsPage() {
  return (
    <ComingSoon
      title="Projects"
      description="Etalase project-project yang pernah & lagi dikerjain. Lagi dirapiin biar enak diliat."
      icon="projects"
      buildLog={BUILD_LOG}
    />
  );
}
