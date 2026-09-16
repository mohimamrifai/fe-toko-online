import type { Metadata } from "next";

import { ContentSections } from "@/components/content/content-sections";
import { HelpPageShell } from "@/components/help/help-page-shell";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { RETURNS_SECTIONS } from "@/lib/content/help";

export const metadata: Metadata = {
  title: "Pusat Pengembalian",
  description: "Ketentuan dan prosedur pengembalian barang di TokoElektronik.",
};

export default function ReturnsPage() {
  return (
    <main>
      <Header />
      <HelpPageShell
        title="Pusat Pengembalian"
        description="Pelajari syarat retur produk dan proses pengembalian dana."
        currentPath="/help/returns"
      >
        <ContentSections sections={RETURNS_SECTIONS} />
      </HelpPageShell>
      <Footer />
    </main>
  );
}
