"use client";

import Link from "next/link";
import {
  Smartphone,
  Laptop,
  Headphones,
  Tv,
  Camera,
  Watch,
  Gamepad2,
  Refrigerator,
  Fan,
  Speaker,
  MoreHorizontal, // 1. Tambahkan icon untuk tombol "Lainnya"
  type LucideIcon,
} from "lucide-react";

type Category = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const categories: Category[] = [
  { label: "Handphone", href: "/categories/handphone", icon: Smartphone },
  { label: "Laptop", href: "/categories/laptop", icon: Laptop },
  { label: "Audio", href: "/categories/audio", icon: Headphones },
  { label: "TV", href: "/categories/tv", icon: Tv },
  { label: "Kamera", href: "/categories/kamera", icon: Camera },
  { label: "Smartwatch", href: "/categories/smartwatch", icon: Watch },
  { label: "Gaming", href: "/categories/gaming", icon: Gamepad2 },
  {
    label: "Rumah Tangga",
    href: "/categories/rumah-tangga",
    icon: Refrigerator,
  },
  { label: "Pendingin", href: "/categories/pendingin", icon: Fan },
  { label: "Speaker", href: "/categories/speaker", icon: Speaker },
];

export function CategoryShortcuts() {
  // 2. Ambil hanya 7 item pertama untuk menyisakan 1 slot untuk "Lainnya"
  const visibleCategories = categories.slice(0, 7);

  return (
    <section className="mx-auto max-w-7xl px-6 md:px-8 py-2">
      <h2 className="mb-4 text-lg font-semibold text-foreground md:text-xl">
        Kategori Pilihan
      </h2>

      {/* 3. Ubah dari flex-scroll menjadi Grid agar seragam dan turun ke bawah */}
      <div className="grid grid-cols-4 gap-x-2 gap-y-4 sm:grid-cols-5 sm:gap-4 md:grid-cols-6 lg:grid-cols-8">
        {visibleCategories.map((category) => {
          const Icon = category.icon;
          return (
            <Link
              key={category.label}
              href={category.href}
              // 4. Tambahkan h-full, justify-start, dan batasi efek hover blok hanya untuk desktop (sm:hover:bg-accent)
              className="group flex h-full flex-col items-center justify-start gap-2 rounded-xl p-1 text-center transition-colors sm:p-3 sm:hover:bg-accent"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-muted transition-colors group-hover:bg-primary/10 sm:h-14 sm:w-14">
                <Icon className="h-6 w-6 text-foreground transition-colors group-hover:text-primary" />
              </span>
              <span className="line-clamp-2 text-xs leading-tight text-muted-foreground group-hover:text-foreground">
                {category.label}
              </span>
            </Link>
          );
        })}

        {/* 5. Tombol Lainnya diletakkan di urutan ke-8 */}
        <Link
          href="/categories" // Ubah link ini ke halaman "Semua Kategori" Anda
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
