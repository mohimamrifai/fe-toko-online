import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PackageSearch } from "lucide-react";

import { CategoryProductsPagination } from "@/components/commons/category-products-pagination";
import { CategoryProductsToolbar } from "@/components/commons/category-products-toolbar";
import { ProductCardsGrid } from "@/components/commons/product-cards-grid";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { getCategoryBySlug } from "@/lib/api/category";
import { getProducts } from "@/lib/api/product";
import { parsePage, parseProductSort } from "@/lib/category-products-url";
import { CategoryIcon } from "@/lib/category-icons";

const PRODUCTS_PER_PAGE = 12;

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    page?: string;
    sort?: string;
  }>;
};

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Kategori tidak ditemukan",
    };
  }

  return {
    title: category.name,
    description: `Belanja produk ${category.name} dengan harga terbaik.`,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const { page: pageParam, sort: sortParam } = await searchParams;

  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const requestedPage = parsePage(pageParam);
  const sort = parseProductSort(sortParam);
  const initialResult = await getProducts({
    category: slug,
    page: requestedPage,
    limit: PRODUCTS_PER_PAGE,
    sort,
  });

  const currentPage =
    initialResult.meta.totalPages > 0
      ? Math.min(requestedPage, initialResult.meta.totalPages)
      : 1;

  const { items: products, meta } =
    currentPage === requestedPage
      ? initialResult
      : await getProducts({
          category: slug,
          page: currentPage,
          limit: PRODUCTS_PER_PAGE,
          sort,
        });

  return (
    <main>
      <Header />
      <section className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-8">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <CategoryIcon
              icon={category.icon}
              className="h-6 w-6 text-foreground"
            />
          </span>
          <div>
            <h1 className="text-xl font-bold text-foreground md:text-2xl">
              {category.name}
            </h1>
            <p className="text-sm text-muted-foreground">
              Produk dalam kategori ini
            </p>
          </div>
        </div>

        <CategoryProductsToolbar sort={sort} total={meta.total} />

        {products.length === 0 ? (
          <Empty className="mt-4 border">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <PackageSearch />
              </EmptyMedia>
              <EmptyTitle>Belum ada produk</EmptyTitle>
              <EmptyDescription>
                Kategori ini belum memiliki produk aktif. Coba jelajahi
                kategori lain atau kembali ke beranda.
              </EmptyDescription>
            </EmptyHeader>
            <Button
              nativeButton={false}
              render={<Link href="/categories" />}
              variant="outline"
            >
              Lihat Semua Kategori
            </Button>
          </Empty>
        ) : (
          <>
            <ProductCardsGrid products={products} />
            <CategoryProductsPagination
              slug={slug}
              page={currentPage}
              totalPages={meta.totalPages}
              sort={sort}
            />
          </>
        )}
      </section>
      <Footer />
    </main>
  );
}
