import type { Metadata } from "next";

import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { getAllScripts } from "@/lib/admin/scripts-store";
import { isAdminAuthenticated } from "@/lib/admin/session";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin - Phimhayz.site",
  description: "Trang quản trị script quảng cáo toàn site cho Phimhayz.site.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const authenticated = await isAdminAuthenticated();
  const scripts = authenticated ? await getAllScripts() : [];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#0f766e_0%,#020617_45%,#020617_100%)]">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(34,211,238,0.1),transparent_35%,rgba(14,165,233,0.08))]" />
      <div className="relative flex min-h-screen items-center justify-center">
        {authenticated ? (
          <AdminDashboard initialScripts={scripts} />
        ) : (
          <AdminLoginForm />
        )}
      </div>
    </div>
  );
}
