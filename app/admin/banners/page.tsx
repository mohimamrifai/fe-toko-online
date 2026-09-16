import type { Metadata } from "next";

import { AdminComingSoon } from "@/components/admin/admin-coming-soon";

export const metadata: Metadata = {
  title: "Banner",
};

export default function AdminBannersPage() {
  return (
    <AdminComingSoon
      title="Manajemen Banner"
      description="Kelola top banner, promo banner, dan slider akan tersedia pada update berikutnya."
    />
  );
}
