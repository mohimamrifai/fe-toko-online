import Link from "next/link";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";

export default function FlashSaleNotFound() {
  return (
    <main>
      <Header />
      <section className="mx-auto max-w-7xl px-4 py-16 text-center md:px-8">
        <h1 className="text-xl font-bold text-foreground md:text-2xl">
          Flash Sale Tidak Tersedia
        </h1>
        <p className="mt-3 text-sm text-muted-foreground md:text-base">
          Saat ini tidak ada flash sale yang sedang berlangsung. Cek kembali
          nanti untuk penawaran spesial.
        </p>
        <Button render={<Link href="/" />} className="mt-6">
          Kembali ke Beranda
        </Button>
      </section>
      <Footer />
    </main>
  );
}
