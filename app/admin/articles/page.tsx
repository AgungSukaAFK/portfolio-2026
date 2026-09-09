import { AdminShell } from "@/components/admin/admin-shell";
import { PostManager } from "@/components/admin/post-manager";

export default function AdminArticlesPage() {
  return (
    <AdminShell>
      <PostManager collection="articles" label="Articles" publicBasePath="/articles" />
    </AdminShell>
  );
}
