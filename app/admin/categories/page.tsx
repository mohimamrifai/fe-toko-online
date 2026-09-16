import type { Metadata } from "next";

import { AdminComingSoon } from "@/components/admin/admin-coming-soon";

export const metadata: Metadata = {
  title: "Kategori",
};

export default function AdminCategoriesPage() {
  return (
    <AdminComingSoon
      title="Manajemen Kategori"
      description="Atur kategori produk, ikon, dan urutan tampilan akan tersedia pada update berikutnya."
    />
  );
}
