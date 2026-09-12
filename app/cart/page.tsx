import type { Metadata } from "next";

import { CartPageContent } from "@/components/cart/cart-page-content";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
  title: "Keranjang Belanja",
  description: "Lihat dan kelola produk di keranjang belanja Anda.",
};

export default function CartPage() {
  return (
    <main>
      <Header />
      <CartPageContent />
      <Footer />
    </main>
  );
}
