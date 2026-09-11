import Link from "next/link";
import { MoreHorizontal } from "lucide-react";

import { getCategories } from "@/lib/api/category";
import { getCategoryIcon } from "@/lib/category-icons";

const VISIBLE_CATEGORY_COUNT = 7;

export async function CategoryShortcuts() {
  const categories = await getCategories();

  if (categories.length === 0) {
    return null;
  }

  const visibleCategories = categories.slice(0, VISIBLE_CATEGORY_COUNT);

  return (
    <section className="mx-auto max-w-7xl px-6 md:px-8 py-2">
      <h2 className="mb-4 text-lg font-semibold text-foreground md:text-xl">
        Kategori Pilihan
      </h2>

      <div className="grid grid-cols-4 gap-x-2 gap-y-4 sm:grid-cols-5 sm:gap-4 md:grid-cols-6 lg:grid-cols-8">
        {visibleCategories.map((category) => {
          const Icon = getCategoryIcon(category.icon);

          return (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group flex h-full flex-col items-center justify-start gap-2 rounded-xl p-1 text-center transition-colors sm:p-3 sm:hover:bg-accent"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-muted transition-colors group-hover:bg-primary/10 sm:h-14 sm:w-14">
                <Icon className="h-6 w-6 text-foreground transition-colors group-hover:text-primary" />
              </span>
              <span className="line-clamp-2 text-xs leading-tight text-muted-foreground group-hover:text-foreground">
                {category.name}
              </span>
            </Link>
          );
        })}

        <Link
          href="/categories"
          className="group flex h-full flex-col items-center justify-start gap-2 rounded-xl p-1 text-center transition-colors sm:p-3 sm:hover:bg-accent"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-muted transition-colors group-hover:bg-primary/10 sm:h-14 sm:w-14">
            <MoreHorizontal className="h-6 w-6 text-foreground transition-colors group-hover:text-primary" />
          </span>
          <span className="line-clamp-2 text-xs leading-tight text-muted-foreground group-hover:text-foreground">
            Lainnya
          </span>
        </Link>
      </div>
    </section>
  );
}
