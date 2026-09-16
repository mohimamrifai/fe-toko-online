import type { Metadata } from "next";

import { AdminComingSoon } from "@/components/admin/admin-coming-soon";

export const metadata: Metadata = {
  title: "Flash Sale",
};

export default function AdminFlashSalesPage() {
  return (
    <AdminComingSoon
      title="Manajemen Flash Sale"
      description="Atur event flash sale dan produk promo akan tersedia pada update berikutnya."
    />
  );
}
