import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { getCategories } from "@/lib/api/category";
import { getCategoryIcon } from "@/lib/category-icons";

export const metadata: Metadata = {
  title: "Semua Kategori",
  description: "Jelajahi semua kategori produk elektronik di toko kami.",
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <main>
      <Header />
      <section className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-8">
        <h1 className="text-xl font-bold text-foreground md:text-2xl">
          Semua Kategori
        </h1>
        <p className="mt-2 text-sm text-muted-foreground md:text-base">
          Pilih kategori untuk melihat produk yang tersedia.
        </p>

        {categories.length === 0 ? (
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Belum ada kategori tersedia.
          </p>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-4">
            {categories.map((category) => {
              const Icon = getCategoryIcon(category.icon);

              return (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="group flex flex-col items-center gap-3 rounded-xl border bg-card p-4 text-center transition-shadow hover:shadow-md"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-muted transition-colors group-hover:bg-primary/10">
                    <Icon className="h-7 w-7 text-foreground transition-colors group-hover:text-primary" />
                  </span>
                  <span className="line-clamp-2 text-sm font-medium text-foreground">
                    {category.name}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
