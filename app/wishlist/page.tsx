import type { Metadata } from "next";

import { RequireAuth } from "@/components/auth/require-auth";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { WishlistPageContent } from "@/components/wishlist/wishlist-page-content";

export const metadata: Metadata = {
  title: "Wishlist Saya",
  description: "Lihat produk favorit yang Anda simpan.",
};

export default function WishlistPage() {
  return (
    <main>
      <Header />
      <RequireAuth>
        <WishlistPageContent />
      </RequireAuth>
      <Footer />
    </main>
  );
}
