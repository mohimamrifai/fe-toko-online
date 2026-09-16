import type { Metadata } from "next";

import { AdminComingSoon } from "@/components/admin/admin-coming-soon";

export const metadata: Metadata = {
  title: "Produk",
};

export default function AdminProductsPage() {
  return (
    <AdminComingSoon
      title="Manajemen Produk"
      description="Tambah, edit, dan kelola stok produk akan tersedia pada update berikutnya."
    />
  );
}
