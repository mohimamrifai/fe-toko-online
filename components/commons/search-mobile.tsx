"use client";

import { Search } from "lucide-react";

import { ProductSearchForm } from "@/components/commons/product-search-form";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export default function SearchMobile() {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant="ghost" size="icon" className="sm:hidden">
            <Search className="h-5 w-5" />
          </Button>
        }
      />
      <PopoverContent className="sm:hidden w-80">
        <ProductSearchForm
          placeholder="Cari produk..."
          inputClassName="pl-8 w-full"
        />
      </PopoverContent>
    </Popover>
  );
}
