"use client";

import { usePathname, useRouter } from "next/navigation";

import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import type { ProductSort } from "@/types/product";

const SORT_OPTIONS: { value: ProductSort; label: string }[] = [
  { value: "terbaru", label: "Terbaru" },
  { value: "termurah", label: "Termurah" },
  { value: "terlaris", label: "Terlaris" },
];

type CategoryProductsToolbarProps = {
  sort: ProductSort;
  total: number;
};

export function CategoryProductsToolbar({
  sort,
  total,
}: CategoryProductsToolbarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextSort = event.target.value as ProductSort;
    const params = new URLSearchParams();

    if (nextSort !== "terbaru") {
      params.set("sort", nextSort);
    }

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        {total} produk ditemukan
      </p>

      <div className="flex items-center gap-2">
        <label
          htmlFor="category-sort"
          className="text-sm font-medium text-foreground"
        >
          Urutkan:
        </label>
        <NativeSelect
          id="category-sort"
          value={sort}
          onChange={handleSortChange}
          className="min-w-[140px]"
        >
          {SORT_OPTIONS.map((option) => (
            <NativeSelectOption key={option.value} value={option.value}>
              {option.label}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </div>
    </div>
  );
}
