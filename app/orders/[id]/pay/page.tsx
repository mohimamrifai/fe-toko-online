import type { Metadata } from "next";

import { RequireAuth } from "@/components/auth/require-auth";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { OrderPayContent } from "@/components/payment/order-pay-content";

export const metadata: Metadata = {
  title: "Pembayaran Pesanan",
  description: "Selesaikan pembayaran pesanan Anda melalui Midtrans.",
};

export default function OrderPayPage() {
  return (
    <main>
      <Header />
      <RequireAuth>
        <OrderPayContent />
      </RequireAuth>
      <Footer />
    </main>
  );
}
