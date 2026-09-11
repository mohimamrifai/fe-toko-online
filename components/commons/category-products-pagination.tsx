import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { categoryProductsUrl } from "@/lib/category-products-url";
import type { ProductSort } from "@/types/product";

type CategoryProductsPaginationProps = {
  slug: string;
  page: number;
  totalPages: number;
  sort: ProductSort;
};

export function CategoryProductsPagination({
  slug,
  page,
  totalPages,
  sort,
}: CategoryProductsPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = getVisiblePages(page, totalPages);

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={categoryProductsUrl(slug, { page: page - 1, sort })}
            text="Sebelumnya"
            aria-disabled={page <= 1}
            className={page <= 1 ? "pointer-events-none opacity-50" : undefined}
          />
        </PaginationItem>

        {pages.map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              href={categoryProductsUrl(slug, { page: pageNumber, sort })}
              isActive={pageNumber === page}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href={categoryProductsUrl(slug, { page: page + 1, sort })}
            text="Berikutnya"
            aria-disabled={page >= totalPages}
            className={
              page >= totalPages ? "pointer-events-none opacity-50" : undefined
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function getVisiblePages(current: number, total: number) {
  const maxVisible = 5;
  const half = Math.floor(maxVisible / 2);
  let start = Math.max(1, current - half);
  const end = Math.min(total, start + maxVisible - 1);

  start = Math.max(1, end - maxVisible + 1);

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}
