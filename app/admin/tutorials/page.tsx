import { AdminShell } from "@/components/admin/admin-shell";
import { PostManager } from "@/components/admin/post-manager";

export default function AdminTutorialsPage() {
  return (
    <AdminShell>
      <PostManager collection="tutorials" label="Tutorials" publicBasePath="/tutorials" />
    </AdminShell>
  );
}
