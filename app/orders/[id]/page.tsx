import type { Metadata } from "next";

import { RequireAuth } from "@/components/auth/require-auth";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { OrderDetailContent } from "@/components/orders/order-detail-content";

export const metadata: Metadata = {
  title: "Detail Pesanan",
  description: "Lihat detail dan status pesanan Anda.",
};

export default function OrderDetailPage() {
  return (
    <main>
      <Header />
      <RequireAuth>
        <OrderDetailContent />
      </RequireAuth>
      <Footer />
    </main>
  );
}
