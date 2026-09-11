import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PackageSearch } from "lucide-react";

import { BrandProductsPagination } from "@/components/commons/brand-products-pagination";
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
import { getBrandBySlug } from "@/lib/api/brand";
import { getProducts } from "@/lib/api/product";
import { parsePage, parseProductSort } from "@/lib/category-products-url";

const PRODUCTS_PER_PAGE = 12;
const PLACEHOLDER_LOGO = "https://placehold.co/100x100/png?text=Brand";

type BrandPageProps = {
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
}: BrandPageProps): Promise<Metadata> {
  const { slug } = await params;
  const brand = await getBrandBySlug(slug);

  if (!brand) {
    return {
      title: "Brand tidak ditemukan",
    };
  }

  return {
    title: brand.name,
    description: `Belanja produk ${brand.name} dengan harga terbaik.`,
  };
}

export default async function BrandPage({
  params,
  searchParams,
}: BrandPageProps) {
  const { slug } = await params;
  const { page: pageParam, sort: sortParam } = await searchParams;

  const brand = await getBrandBySlug(slug);

  if (!brand) {
    notFound();
  }

  const requestedPage = parsePage(pageParam);
  const sort = parseProductSort(sortParam);

  const initialResult = await getProducts({
    brand: slug,
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
          brand: slug,
          page: currentPage,
          limit: PRODUCTS_PER_PAGE,
          sort,
        });

  return (
    <main>
      <Header />
      <section className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-8">
        <div className="flex items-center gap-3">
          <span className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-muted">
            <Image
              src={brand.logoUrl ?? PLACEHOLDER_LOGO}
              alt={brand.name}
              fill
              sizes="48px"
              className="object-cover"
            />
          </span>
          <div>
            <h1 className="text-xl font-bold text-foreground md:text-2xl">
              {brand.name}
            </h1>
            <p className="text-sm text-muted-foreground">
              Produk dari brand ini
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
                Brand ini belum memiliki produk aktif. Coba jelajahi brand lain
                atau kembali ke beranda.
              </EmptyDescription>
            </EmptyHeader>
            <Button
              nativeButton={false}
              render={<Link href="/brands" />}
              variant="outline"
            >
              Lihat Semua Brand
            </Button>
          </Empty>
        ) : (
          <>
            <ProductCardsGrid products={products} />
            <BrandProductsPagination
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
