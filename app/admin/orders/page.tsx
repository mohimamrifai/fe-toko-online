import type { Metadata } from "next";

import { AdminComingSoon } from "@/components/admin/admin-coming-soon";

export const metadata: Metadata = {
  title: "Pesanan",
};

export default function AdminOrdersPage() {
  return (
    <AdminComingSoon
      title="Manajemen Pesanan"
      description="Kelola status pesanan, nomor resi, dan tracking pengiriman akan tersedia pada update berikutnya."
    />
  );
}
