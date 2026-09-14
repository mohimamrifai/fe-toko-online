import type { Metadata } from "next";

import { RequireAuth } from "@/components/auth/require-auth";
import { OrderConfirmationContent } from "@/components/checkout/order-confirmation-content";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
  title: "Konfirmasi Pesanan",
  description: "Detail konfirmasi pesanan Anda.",
};

export default function OrderConfirmationPage() {
  return (
    <main>
      <Header />
      <RequireAuth>
        <OrderConfirmationContent />
      </RequireAuth>
      <Footer />
    </main>
  );
}
