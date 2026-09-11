"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { searchProductsUrl } from "@/lib/search-products-url";

type ProductSearchFormProps = {
  defaultQuery?: string;
  className?: string;
  inputClassName?: string;
  placeholder?: string;
  onSubmitted?: () => void;
};

export function ProductSearchForm({
  defaultQuery = "",
  className,
  inputClassName,
  placeholder = "Cari produk...",
  onSubmitted,
}: ProductSearchFormProps) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultQuery);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return;
    }

    onSubmitted?.();
    router.push(searchProductsUrl(trimmedQuery));
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          className={inputClassName ?? "pl-8 w-full bg-muted/50 focus-visible:bg-background"}
        />
      </div>
    </form>
  );
}
