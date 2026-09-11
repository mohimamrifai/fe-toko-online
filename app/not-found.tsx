import Link from "next/link";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main>
      <Header />
      <div className="mx-auto flex min-h-[50vh] max-w-7xl flex-col items-center justify-center px-4 py-16 text-center md:px-8">
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">
          Halaman tidak ditemukan
        </h1>
        <p className="mt-3 max-w-md text-sm text-muted-foreground md:text-base">
          Produk atau halaman yang Anda cari tidak tersedia, mungkin sudah
          dihapus, atau sedang tidak aktif.
        </p>
        <Button
          className="mt-6"
          nativeButton={false}
          render={<Link href="/" />}
        >
          Kembali ke Home
        </Button>
      </div>
      <Footer />
    </main>
  );
}
