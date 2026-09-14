import type { Metadata } from "next";

import { RequireAuth } from "@/components/auth/require-auth";
import { CheckoutPageContent } from "@/components/checkout/checkout-page-content";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Selesaikan pesanan Anda dengan memilih alamat dan kurir pengiriman.",
};

export default function CheckoutPage() {
  return (
    <main>
      <Header />
      <RequireAuth>
        <CheckoutPageContent />
      </RequireAuth>
      <Footer />
    </main>
  );
}
