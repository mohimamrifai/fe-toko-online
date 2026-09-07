"use client";

import Link from "next/link";
import { Timer, ChevronRight } from "lucide-react";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type FlashSaleProduct = {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  discount: number;
  soldPercentage: number;
  sisaStok: number;
};

// Data dummy diperbanyak menjadi 8 agar fitur scroll benar-benar terlihat di layar besar
const flashSaleProducts: FlashSaleProduct[] = [
  {
    id: "1",
    name: "TWS Bluetooth 5.3 Earphone Active Noise Cancelling",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80",
    price: 149000,
    originalPrice: 399000,
    discount: 62,
    soldPercentage: 85,
    sisaStok: 10,
  },
  {
    id: "2",
    name: "Smartwatch Pria Wanita Heart Rate Monitor Waterproof",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80",
    price: 299000,
    originalPrice: 599000,
    discount: 50,
    soldPercentage: 40,
    sisaStok: 15,
  },
  {
    id: "3",
    name: "Mechanical Keyboard Gaming RGB Hotswappable",
    image:
      "https://images.unsplash.com/photo-1595225476474-87563907a212?w=300&q=80",
    price: 450000,
    originalPrice: 850000,
    discount: 47,
    soldPercentage: 92,
    sisaStok: 5,
  },
  {
    id: "4",
    name: "Powerbank 20000mAh Fast Charging 20W PD",
    image:
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&q=80",
    price: 185000,
    originalPrice: 350000,
    discount: 47,
    soldPercentage: 15,
    sisaStok: 85,
  },
  {
    id: "5",
    name: "Speaker Bluetooth Portable Bass Boost",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&q=80",
    price: 210000,
    originalPrice: 420000,
    discount: 50,
    soldPercentage: 60,
    sisaStok: 20,
  },
  {
    id: "6",
    name: "Gaming Mouse Wireless RGB Sensor Pixart",
    image:
      "https://images.unsplash.com/photo-1527814050087-379381547961?w=300&q=80",
    price: 250000,
    originalPrice: 500000,
    discount: 50,
    soldPercentage: 75,
    sisaStok: 12,
  },
  {
    id: "7",
    name: "Monitor Stand Riser dengan Port USB Hub",
    image:
      "https://images.unsplash.com/photo-1542393545-10f5cde2c810?w=300&q=80",
    price: 120000,
    originalPrice: 200000,
    discount: 40,
    soldPercentage: 30,
    sisaStok: 35,
  },
  {
    id: "8",
    name: "Lampu Meja Belajar LED Eye Care Dimmer",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&q=80",
    price: 850000,
    originalPrice: 150000,
    discount: 43,
    soldPercentage: 55,
    sisaStok: 25,
  },
];

const formatRupiah = (number: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(number);
};

export function FlashSale() {
  const [mounted] = useState(() => true);

  return (
    <section className="mx-auto max-w-7xl px-4 py-4 md:px-8 md:py-6">
      {/* Header Section */}
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <h2 className="flex items-center gap-1.5 text-base font-bold text-foreground sm:text-lg md:text-xl">
            <Timer className="h-4 w-4 text-red-600 sm:h-5 sm:w-5" />
            Kejar Diskon
          </h2>

          {/* Dummy Countdown Timer */}
          {mounted && (
            <div className="flex items-center gap-1 text-xs font-semibold text-white sm:text-sm">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-red-600 sm:h-7 sm:w-7">
                02
              </span>
              <span className="font-bold text-red-600">:</span>
              <span className="flex h-6 w-6 items-center justify-center rounded bg-red-600 sm:h-7 sm:w-7">
                45
              </span>
              <span className="font-bold text-red-600">:</span>
              <span className="flex h-6 w-6 items-center justify-center rounded bg-red-600 sm:h-7 sm:w-7">
                12
              </span>
            </div>
          )}
        </div>

        <Link
          href="/flash-sale"
          className="flex items-center whitespace-nowrap text-xs font-medium text-primary hover:underline sm:text-sm"
        >
          Lihat Semua
          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
        </Link>
      </div>

      {/* Product Slider menggunakan Shadcn Carousel */}
      <Carousel
        opts={{
          align: "start",
          dragFree: true, // Memungkinkan geser/scroll bebas (tidak patah-patah per 1 item)
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-3 sm:-ml-4">
          {flashSaleProducts.map((product) => (
            <CarouselItem
              key={product.id}
              // Basis ini menentukan lebar masing-masing kotak berdasarkan ukuran layar
              className="pl-3 sm:pl-4 basis-35 sm:basis-44 md:basis-48 lg:basis-56"
            >
              <Link
                href={`/product/${product.id}`}
                className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-md"
              >
                {/* Image Placeholder (1:1 Fix Ratio) */}
                <div className="relative aspect-square w-full overflow-hidden bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute left-0 top-0 rounded-br-lg bg-red-600 px-2 py-1 text-[10px] font-bold text-white sm:text-xs">
                    -{product.discount}%
                  </div>
                </div>

                {/* Product Details */}
                <div className="flex flex-1 flex-col p-2.5 sm:p-3">
                  <h3 className="line-clamp-2 text-xs leading-tight text-foreground sm:text-sm">
                    {product.name}
                  </h3>

                  <div className="mt-auto pt-2">
                    <p className="text-sm font-bold text-red-600 md:text-base">
                      {formatRupiah(product.price)}
                    </p>
                    <p className="text-[9px] text-muted-foreground line-through sm:text-[10px] md:text-xs">
                      {formatRupiah(product.originalPrice)}
                    </p>

                    {/* Stock Progress Bar */}
                    <div className="mt-2 flex items-center gap-1.5 sm:gap-2">
                      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className="absolute left-0 top-0 h-full rounded-full bg-red-600 transition-all"
                          style={{ width: `${product.soldPercentage}%` }}
                        />
                      </div>
                      <span className="whitespace-nowrap text-[9px] text-muted-foreground sm:text-[10px]">
                        Sisa {product.sisaStok}
                      </span>
                    </div>

                    {/* Visual Tombol Beli */}
                    <div className="mt-2.5 flex w-full items-center justify-center rounded-lg bg-primary py-1.5 text-[11px] font-semibold text-primary-foreground transition-colors group-hover:bg-primary/90 sm:mt-3 sm:py-2 sm:text-sm">
                      Beli Sekarang
                    </div>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Tombol Panah - Disembunyikan di layar HP, muncul di layar Tablet/PC */}
        <CarouselPrevious className="hidden md:flex -left-4 lg:-left-6" />
        <CarouselNext className="hidden md:flex -right-4 lg:-right-6" />
      </Carousel>
    </section>
  );
}
