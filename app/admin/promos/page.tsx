import type { Metadata } from "next";

import { AdminComingSoon } from "@/components/admin/admin-coming-soon";

export const metadata: Metadata = {
  title: "Promo",
};

export default function AdminPromosPage() {
  return (
    <AdminComingSoon
      title="Manajemen Promo"
      description="Buat kode promo, atur diskon, dan periode berlaku akan tersedia pada update berikutnya."
    />
  );
}
