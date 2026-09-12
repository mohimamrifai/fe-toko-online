"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { FlashSaleViewModel } from "@/lib/api/flash-sale";

import { FlashSaleCountdown } from "./flash-sale-countdown";
import { FlashSaleProductCardItem } from "./flash-sale-product-card";

type FlashSaleContentProps = {
  flashSale: FlashSaleViewModel;
};

export function FlashSaleContent({ flashSale }: FlashSaleContentProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-4 md:px-8 md:py-6">
      <div className="mb-4 flex items-center justify-between gap-2">
        <FlashSaleCountdown name={flashSale.name} endsAt={flashSale.endsAt} />

        <Link
          href="/flash-sale"
          className="flex items-center whitespace-nowrap text-xs font-medium text-primary hover:underline sm:text-sm"
        >
          Lihat Semua
          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
        </Link>
      </div>

      <Carousel
        opts={{
          align: "start",
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-3 sm:-ml-4">
          {flashSale.products.map((product) => (
            <CarouselItem
              key={product.id}
              className="pl-3 sm:pl-4 basis-35 sm:basis-44 md:basis-48 lg:basis-56"
            >
              <FlashSaleProductCardItem product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="hidden md:flex -left-4 lg:-left-6" />
        <CarouselNext className="hidden md:flex -right-4 lg:-right-6" />
      </Carousel>
    </section>
  );
}
