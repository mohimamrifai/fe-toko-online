import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { getBrands } from "@/lib/api/brand";

const PLACEHOLDER_LOGO = "https://placehold.co/100x100/png?text=Brand";

export const metadata: Metadata = {
  title: "Semua Brand",
  description: "Jelajahi semua brand produk elektronik di toko kami.",
};

export default async function BrandsPage() {
  const brands = await getBrands();

  return (
    <main>
      <Header />
      <section className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-8">
        <h1 className="text-xl font-bold text-foreground md:text-2xl">
          Semua Brand
        </h1>
        <p className="mt-2 text-sm text-muted-foreground md:text-base">
          Pilih brand untuk melihat produk yang tersedia.
        </p>

        {brands.length === 0 ? (
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Belum ada brand tersedia.
          </p>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-4">
            {brands.map((brand) => (
              <Link
                key={brand.id}
                href={`/brands/${brand.slug}`}
                className="group flex flex-col items-center gap-3 rounded-xl border bg-card p-4 text-center transition-shadow hover:shadow-md"
              >
                <span className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-muted transition-colors group-hover:bg-primary/10">
                  <Image
                    src={brand.logoUrl ?? PLACEHOLDER_LOGO}
                    alt={brand.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </span>
                <span className="line-clamp-2 text-sm font-medium text-foreground">
                  {brand.name}
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
