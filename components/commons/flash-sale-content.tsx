"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Timer } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { formatRupiah } from "@/lib/format-rupiah";
import type { FlashSaleViewModel } from "@/lib/api/flash-sale";

type CountdownState = {
  hours: number;
  minutes: number;
  seconds: number;
};

function calculateCountdown(endsAt: string): CountdownState {
  const diff = new Date(endsAt).getTime() - Date.now();

  if (diff <= 0) {
    return { hours: 0, minutes: 0, seconds: 0 };
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { hours, minutes, seconds };
}

function padTime(value: number) {
  return String(value).padStart(2, "0");
}

function useCountdown(endsAt: string) {
  const [countdown, setCountdown] = useState<CountdownState>(() =>
    calculateCountdown(endsAt),
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(calculateCountdown(endsAt));
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [endsAt]);

  return countdown;
}

type FlashSaleContentProps = {
  flashSale: FlashSaleViewModel;
};

export function FlashSaleContent({ flashSale }: FlashSaleContentProps) {
  const countdown = useCountdown(flashSale.endsAt);

  return (
    <section className="mx-auto max-w-7xl px-4 py-4 md:px-8 md:py-6">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <h2 className="flex items-center gap-1.5 text-base font-bold text-foreground sm:text-lg md:text-xl">
            <Timer className="h-4 w-4 text-red-600 sm:h-5 sm:w-5" />
            {flashSale.name}
          </h2>

          <div className="flex items-center gap-1 text-xs font-semibold text-white sm:text-sm">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-red-600 sm:h-7 sm:w-7">
              {padTime(countdown.hours)}
            </span>
            <span className="font-bold text-red-600">:</span>
            <span className="flex h-6 w-6 items-center justify-center rounded bg-red-600 sm:h-7 sm:w-7">
              {padTime(countdown.minutes)}
            </span>
            <span className="font-bold text-red-600">:</span>
            <span className="flex h-6 w-6 items-center justify-center rounded bg-red-600 sm:h-7 sm:w-7">
              {padTime(countdown.seconds)}
            </span>
          </div>
        </div>

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
              <Link
                href={`/products/${product.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-muted">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 35vw, (max-width: 1024px) 25vw, 220px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {product.discount > 0 && (
                    <div className="absolute left-0 top-0 rounded-br-lg bg-red-600 px-2 py-1 text-[10px] font-bold text-white sm:text-xs">
                      -{product.discount}%
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-2.5 sm:p-3">
                  <h3 className="line-clamp-2 text-xs leading-tight text-foreground sm:text-sm">
                    {product.name}
                  </h3>

                  <div className="mt-auto pt-2">
                    <p className="text-sm font-bold text-red-600 md:text-base">
                      {formatRupiah(product.price)}
                    </p>
                    {product.originalPrice > product.price && (
                      <p className="text-[9px] text-muted-foreground line-through sm:text-[10px] md:text-xs">
                        {formatRupiah(product.originalPrice)}
                      </p>
                    )}

                    <div className="mt-2 flex items-center gap-1.5 sm:gap-2">
                      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className="absolute left-0 top-0 h-full rounded-full bg-red-600 transition-all"
                          style={{ width: `${product.soldPercentage}%` }}
                        />
                      </div>
                      <span className="whitespace-nowrap text-[9px] text-muted-foreground sm:text-[10px]">
                        Sisa {product.remainingStock}
                      </span>
                    </div>

                    <div className="mt-2.5 flex w-full items-center justify-center rounded-lg bg-primary py-1.5 text-[11px] font-semibold text-primary-foreground transition-colors group-hover:bg-primary/90 sm:mt-3 sm:py-2 sm:text-sm">
                      Beli Sekarang
                    </div>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="hidden md:flex -left-4 lg:-left-6" />
        <CarouselNext className="hidden md:flex -right-4 lg:-right-6" />
      </Carousel>
    </section>
  );
}
