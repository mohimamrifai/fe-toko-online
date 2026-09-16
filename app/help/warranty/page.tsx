import type { Metadata } from "next";
import Link from "next/link";

import { ContentSections } from "@/components/content/content-sections";
import { HelpPageShell } from "@/components/help/help-page-shell";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { WARRANTY_SECTIONS } from "@/lib/content/help";

export const metadata: Metadata = {
  title: "Klaim Garansi",
  description: "Panduan mengajukan klaim garansi produk resmi di TokoElektronik.",
};

export default function WarrantyPage() {
  return (
    <main>
      <Header />
      <HelpPageShell
        title="Klaim Garansi"
        description="Panduan lengkap mengajukan klaim garansi untuk produk yang Anda beli."
        currentPath="/help/warranty"
      >
        <ContentSections sections={WARRANTY_SECTIONS} />

        <div className="mt-8 rounded-lg border border-primary/20 bg-primary/5 p-4">
          <h3 className="text-sm font-semibold text-foreground">
            Siap mengajukan klaim?
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Buka detail pesanan Anda untuk mengajukan klaim per item, atau
            pantau status klaim yang sudah diajukan.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button nativeButton={false} render={<Link href="/orders" />}>
              Lihat Pesanan Saya
            </Button>
            <Button
              variant="outline"
              nativeButton={false}
              render={<Link href="/claims" />}
            >
              Pantau Klaim
            </Button>
          </div>
        </div>
      </HelpPageShell>
      <Footer />
    </main>
  );
}
