import { AdminShell } from "@/components/admin/admin-shell";
import { ProjectManager } from "@/components/admin/project-manager";

export default function AdminProjectsPage() {
  return (
    <AdminShell>
      <ProjectManager />
    </AdminShell>
  );
}
