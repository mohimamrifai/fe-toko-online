import Link from "next/link";
import { Star, ChevronRight } from "lucide-react";

type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  soldCount: number;
  category: string;
};

const bestSellerProducts: Product[] = [
  {
    id: "bs-1",
    name: "Smartphone Flagship 5G 128GB/8GB RAM",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&q=80",
    price: 3499000,
    originalPrice: 4299000,
    rating: 4.9,
    soldCount: 1250,
    category: "Handphone",
  },
  {
    id: "bs-2",
    name: "Laptop Ultrabook Core i5 Gen 12 SSD 512GB",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&q=80",
    price: 7850000,
    originalPrice: 8999000,
    rating: 4.8,
    soldCount: 430,
    category: "Laptop",
  },
  {
    id: "bs-3",
    name: "Headphone Wireless Over-Ear Active Noise Cancelling",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80",
    price: 899000,
    originalPrice: 1299000,
    rating: 4.9,
    soldCount: 890,
    category: "Audio",
  },
  {
    id: "bs-4",
    name: "Smart TV 4K UHD 43 Inch Frameless LED",
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&q=80",
    price: 3150000,
    originalPrice: 3800000,
    rating: 4.7,
    soldCount: 320,
    category: "TV",
  },
  {
    id: "bs-5",
    name: "Kamera Mirrorless Compact Kit Lens 16-50mm",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&q=80",
    price: 6499000,
    originalPrice: 7200000,
    rating: 5.0,
    soldCount: 150,
    category: "Kamera",
  },
  {
    id: "bs-6",
    name: "Smartwatch AMOLED Display GPS & Blood Oxygen",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80",
    price: 749000,
    originalPrice: 1100000,
    rating: 4.8,
    soldCount: 670,
    category: "Smartwatch",
  },
  {
    id: "bs-7",
    name: "Mechanical Keyboard Custom RGB Hot-swappable",
    image:
      "https://images.unsplash.com/photo-1595225476474-87563907a212?w=300&q=80",
    price: 549000,
    originalPrice: 750000,
    rating: 4.9,
    soldCount: 940,
    category: "Gaming",
  },
  {
    id: "8",
    name: "Air Fryer Digital Low Watt 4 Liter Kapasitas Besar",
    image:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=300&q=80",
    price: 620000,
    originalPrice: 950000,
    rating: 4.7,
    soldCount: 510,
    category: "Rumah Tangga",
  },
];

const formatRupiah = (number: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(number);
};

export function ProductGrid({ title = "Terlaris" }: { title?: string }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-4 md:px-8 md:py-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-bold text-foreground sm:text-lg md:text-xl">
          {title}
        </h2>
        <Link
          href="/products/best-seller"
          className="flex items-center whitespace-nowrap text-xs font-medium text-primary hover:underline sm:text-sm"
        >
          Lihat Semua
          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 sm:gap-4">
        {bestSellerProducts.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="group flex flex-col overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-md"
          >
            <div className="relative aspect-square w-full overflow-hidden bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="flex flex-1 flex-col p-3">
              <span className="text-[10px] font-medium text-muted-foreground">
                {product.category}
              </span>
              <h3 className="line-clamp-2 text-xs leading-tight text-foreground sm:text-sm mt-0.5">
                {product.name}
              </h3>

              <div className="mt-auto pt-2">
                <p className="text-sm font-bold text-foreground md:text-base">
                  {formatRupiah(product.price)}
                </p>
                {product.originalPrice && (
                  <p className="text-[10px] text-muted-foreground line-through md:text-xs">
                    {formatRupiah(product.originalPrice)}
                  </p>
                )}

                <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground sm:text-xs">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span className="font-medium text-foreground">
                      {product.rating}
                    </span>
                  </div>
                  <span>Terjual {product.soldCount}+</span>
                </div>

                <div className="mt-2.5 flex w-full items-center justify-center rounded-lg bg-primary py-1.5 text-[11px] font-semibold text-primary-foreground transition-colors group-hover:bg-primary/90 sm:mt-3 sm:py-2 sm:text-sm">
                  Beli Sekarang
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
