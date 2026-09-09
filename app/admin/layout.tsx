import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — AgungSukaAFK",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Cancels the public layout's pt-16 (reserved for the site Navbar, which
  // hides itself on /admin routes) so the admin shell owns the full viewport.
  return <div className="-mt-16">{children}</div>;
}
