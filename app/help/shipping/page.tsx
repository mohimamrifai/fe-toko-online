import type { Metadata } from "next";

import { ContentSections } from "@/components/content/content-sections";
import { HelpPageShell } from "@/components/help/help-page-shell";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SHIPPING_SECTIONS } from "@/lib/content/help";

export const metadata: Metadata = {
  title: "Kebijakan Pengiriman",
  description: "Informasi cakupan pengiriman, biaya ongkir, dan estimasi waktu kirim.",
};

export default function ShippingPage() {
  return (
    <main>
      <Header />
      <HelpPageShell
        title="Kebijakan Pengiriman"
        description="Ketentuan pengiriman produk ke seluruh Indonesia melalui mitra kurir terpercaya."
        currentPath="/help/shipping"
      >
        <ContentSections sections={SHIPPING_SECTIONS} />
      </HelpPageShell>
      <Footer />
    </main>
  );
}
