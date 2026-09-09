import type { Metadata } from "next";
import { CRTBackground } from "@/components/ui/crt-background";
import { SectionHeading } from "@/components/ui/section-heading";
import { ComingSoon } from "@/components/ui/coming-soon";
import { ProjectGrid } from "@/components/projects/project-grid";
import { readCollection } from "@/lib/store";
import type { Project } from "@/lib/collections";

export const metadata: Metadata = {
  title: "Projects — AgungSukaAFK",
  description: "Kumpulan project AgungSukaAFK.",
};

// Reads data/projects.json on every request instead of baking it into the
// static build — otherwise edits from the admin panel wouldn't show up
// without a full rebuild.
export const dynamic = "force-dynamic";

const BUILD_LOG = [
  "git clone projects...",
  "npm install awesomeness...",
  "compiling showcase...",
  "masih dirapikan, sabar ya...",
];

export default async function ProjectsPage() {
  const projects = await readCollection<Project>("projects");

  if (projects.length === 0) {
    return (
      <ComingSoon
        title="Projects"
        description="Etalase project-project yang pernah & lagi dikerjain. Lagi dirapiin biar enak diliat."
        icon="projects"
        buildLog={BUILD_LOG}
      />
    );
  }

  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden px-4 py-20 md:py-28">
      <CRTBackground />
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading eyebrow="Projects" title="Yang Pernah Dibangun" />
        <ProjectGrid projects={projects} />
      </div>
    </main>
  );
}
