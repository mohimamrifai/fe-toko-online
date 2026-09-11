import Image from "next/image";
import Link from "next/link";

import type { PromoBannerView } from "@/types/promo-banner";

type PromoBannerContentProps = {
  banner: PromoBannerView;
};

export function PromoBannerContent({ banner }: PromoBannerContentProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-4 md:px-8 md:py-6">
      <div className="relative overflow-hidden rounded-2xl bg-primary text-primary-foreground shadow-sm">
        <div className="absolute inset-0 z-0">
          <Image
            src={banner.image}
            alt={banner.title}
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover opacity-25 transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-r from-primary via-primary/90 to-transparent" />
        </div>

        <div className="relative z-10 flex flex-col items-start justify-between p-6 sm:p-8 md:flex-row md:items-center md:p-10 lg:p-12">
          <div className="max-w-xl space-y-2.5 sm:space-y-3">
            {banner.badge && (
              <span className="inline-block rounded-full bg-background/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground backdrop-blur-md sm:text-xs">
                {banner.badge}
              </span>
            )}
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl lg:text-4xl">
              {banner.title}
            </h2>
            <p className="text-xs text-primary-foreground/90 sm:text-sm md:text-base leading-relaxed">
              {banner.subtitle}
            </p>
          </div>

          <div className="mt-6 md:mt-0 md:shrink-0">
            <Link
              href={banner.href}
              className="inline-flex items-center justify-center rounded-xl bg-background px-5 py-2.5 text-xs font-semibold text-foreground shadow-md transition-all hover:bg-background/90 hover:scale-[1.02] sm:px-6 sm:py-3 sm:text-sm"
            >
              {banner.buttonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
