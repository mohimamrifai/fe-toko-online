"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import type { PromoSlide } from "@/types/promo-slider";

export function PromoSliderContent({ slides }: { slides: PromoSlide[] }) {
  const [api, setApi] = React.useState<CarouselApi>();

  const subscribe = React.useCallback(
    (onStoreChange: () => void) => {
      if (!api) return () => {};
      api.on("select", onStoreChange);
      return () => {
        api.off("select", onStoreChange);
      };
    },
    [api],
  );

  const getSnapshot = React.useCallback(
    () => api?.selectedScrollSnap() ?? 0,
    [api],
  );

  const current = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => 0,
  );

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-6">
      <Carousel setApi={setApi} opts={{ loop: true }} className="relative">
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <Link
                href={slide.href}
                className="relative block aspect-video w-full max-h-55 overflow-hidden rounded-2xl sm:aspect-21/9 sm:max-h-105"
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  sizes="100vw"
                  className="object-cover object-[75%_center]"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-center gap-2 px-8 md:px-20">
                  <h2 className="max-w-md text-md font-bold text-white md:text-4xl">
                    {slide.title}
                  </h2>
                  {slide.description ? (
                    <p className="max-w-sm text-xs text-white/90 md:text-base">
                      {slide.description}
                    </p>
                  ) : null}
                  <span className="mt-3 w-fit rounded-full bg-white px-3 py-2 text-xs font-medium text-black md:px-5 md:text-sm">
                    {slide.ctaLabel}
                  </span>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-4 hidden md:flex" />
        <CarouselNext className="right-4 hidden md:flex" />
      </Carousel>

      <div className="mt-4 flex justify-center gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => api?.scrollTo(index)}
            className={cn(
              "h-2 rounded-full transition-all",
              current === index
                ? "w-6 bg-primary"
                : "w-2 bg-muted-foreground/30",
            )}
            aria-label={`Ke slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
