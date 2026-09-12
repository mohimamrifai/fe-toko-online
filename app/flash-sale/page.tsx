import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { FlashSalePageContent } from "@/components/commons/flash-sale-page-content";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import {
  getActiveFlashSale,
  mapActiveFlashSale,
} from "@/lib/api/flash-sale";

export const metadata: Metadata = {
  title: "Flash Sale",
  description:
    "Temukan penawaran flash sale terbatas untuk produk elektronik pilihan.",
};

export default async function FlashSalePage() {
  const flashSale = await getActiveFlashSale();

  if (!flashSale) {
    notFound();
  }

  if (flashSale.products.length === 0) {
    return (
      <main>
        <Header />
        <section className="mx-auto max-w-7xl px-4 py-16 text-center md:px-8">
          <h1 className="text-xl font-bold text-foreground md:text-2xl">
            Flash Sale
          </h1>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">
            Belum ada produk flash sale yang tersedia saat ini.
          </p>
          <Button render={<Link href="/" />} className="mt-6">
            Kembali ke Beranda
          </Button>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Header />
      <FlashSalePageContent flashSale={mapActiveFlashSale(flashSale)} />
      <Footer />
    </main>
  );
}
