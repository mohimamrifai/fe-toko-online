import type { Metadata } from "next";

import { AdminShell } from "@/components/admin/admin-shell";
import { RequireAdmin } from "@/components/auth/require-admin";

export const metadata: Metadata = {
  title: {
    default: "Admin",
    template: "%s | Admin",
  },
  description: "Panel administrasi toko elektronik.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireAdmin>
      <AdminShell>{children}</AdminShell>
    </RequireAdmin>
  );
}
