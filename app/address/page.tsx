import type { Metadata } from "next";

import { AddressPageContent } from "@/components/address/address-page-content";
import { RequireAuth } from "@/components/auth/require-auth";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
  title: "Alamat Pengiriman",
  description: "Kelola alamat pengiriman untuk pesanan Anda.",
};

export default function AddressPage() {
  return (
    <main>
      <Header />
      <RequireAuth>
        <AddressPageContent />
      </RequireAuth>
      <Footer />
    </main>
  );
}
