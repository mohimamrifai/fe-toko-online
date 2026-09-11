import type { Metadata } from "next";
import { PackageSearch, Search } from "lucide-react";

import { CategoryProductsToolbar } from "@/components/commons/category-products-toolbar";
import { ProductCardsGrid } from "@/components/commons/product-cards-grid";
import { ProductSearchForm } from "@/components/commons/product-search-form";
import { SearchProductsPagination } from "@/components/commons/search-products-pagination";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { parsePage, parseProductSort } from "@/lib/category-products-url";
import { getProducts } from "@/lib/api/product";

const PRODUCTS_PER_PAGE = 12;

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
    page?: string;
    sort?: string;
  }>;
};

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  const query = q?.trim();

  if (!query) {
    return {
      title: "Cari Produk",
      description: "Temukan produk elektronik yang Anda cari.",
    };
  }

  return {
    title: `Hasil pencarian: ${query}`,
    description: `Produk yang cocok dengan kata kunci "${query}".`,
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q, page: pageParam, sort: sortParam } = await searchParams;
  const query = q?.trim() ?? "";

  const requestedPage = parsePage(pageParam);
  const sort = parseProductSort(sortParam);

  const initialResult =
    query.length > 0
      ? await getProducts({
          search: query,
          page: requestedPage,
          limit: PRODUCTS_PER_PAGE,
          sort,
        })
      : {
          items: [],
          meta: {
            page: 1,
            limit: PRODUCTS_PER_PAGE,
            total: 0,
            totalPages: 0,
          },
        };

  const currentPage =
    initialResult.meta.totalPages > 0
      ? Math.min(requestedPage, initialResult.meta.totalPages)
      : 1;

  const { items: products, meta } =
    query.length > 0 && currentPage !== requestedPage
      ? await getProducts({
          search: query,
          page: currentPage,
          limit: PRODUCTS_PER_PAGE,
          sort,
        })
      : initialResult;

  return (
    <main>
      <Header />
      <section className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-8">
        <div className="max-w-xl">
          <h1 className="text-xl font-bold text-foreground md:text-2xl">
            Cari Produk
          </h1>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            Temukan produk elektronik berdasarkan nama atau deskripsi.
          </p>
          <ProductSearchForm
            defaultQuery={query}
            className="mt-4"
            inputClassName="pl-8 w-full"
          />
        </div>

        {query.length === 0 ? (
          <Empty className="mt-8 border">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Search />
              </EmptyMedia>
              <EmptyTitle>Masukkan kata kunci pencarian</EmptyTitle>
              <EmptyDescription>
                Ketik nama produk di kolom pencarian untuk melihat hasilnya.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <>
            <div className="mt-6">
              <p className="text-sm text-muted-foreground">
                Menampilkan hasil untuk{" "}
                <span className="font-medium text-foreground">&quot;{query}&quot;</span>
              </p>
            </div>

            <CategoryProductsToolbar sort={sort} total={meta.total} />

            {products.length === 0 ? (
              <Empty className="mt-4 border">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <PackageSearch />
                  </EmptyMedia>
                  <EmptyTitle>Produk tidak ditemukan</EmptyTitle>
                  <EmptyDescription>
                    Tidak ada produk yang cocok dengan kata kunci tersebut.
                    Coba gunakan istilah pencarian yang berbeda.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            ) : (
              <>
                <ProductCardsGrid products={products} />
                <SearchProductsPagination
                  query={query}
                  page={currentPage}
                  totalPages={meta.totalPages}
                  sort={sort}
                />
              </>
            )}
          </>
        )}
      </section>
      <Footer />
    </main>
  );
}
