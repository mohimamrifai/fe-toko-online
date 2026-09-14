import type { Metadata } from "next";

import { RequireAuth } from "@/components/auth/require-auth";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { OrdersPageContent } from "@/components/orders/orders-page-content";

export const metadata: Metadata = {
  title: "Pesanan Saya",
  description: "Lihat riwayat dan status pesanan Anda.",
};

export default function OrdersPage() {
  return (
    <main>
      <Header />
      <RequireAuth>
        <OrdersPageContent />
      </RequireAuth>
      <Footer />
    </main>
  );
}
