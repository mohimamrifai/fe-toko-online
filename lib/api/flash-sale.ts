import type {
  ActiveFlashSale,
  ActiveFlashSaleResponse,
  FlashSaleProduct,
} from "@/types/flash-sale";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const PLACEHOLDER_IMAGE =
  "https://placehold.co/600x600/png?text=Produk+Elektronik";

export interface FlashSaleProductCard {
  id: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  discount: number;
  soldPercentage: number;
  remainingStock: number;
}

export interface FlashSaleViewModel {
  id: string;
  name: string;
  startsAt: string;
  endsAt: string;
  products: FlashSaleProductCard[];
}

export async function getActiveFlashSale(): Promise<ActiveFlashSale | null> {
  if (!API_BASE_URL) {
    return null;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/flash-sales/active`, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    });

    if (res.status === 404) {
      return null;
    }

    if (!res.ok) {
      return null;
    }

    const response = (await res.json()) as ActiveFlashSaleResponse;
    return response.data;
  } catch {
    return null;
  }
}

export function mapFlashSaleProducts(
  products: FlashSaleProduct[],
): FlashSaleProductCard[] {
  return products.map((product) => ({
    id: product.id,
    slug: product.slug,
    name: product.name,
    image: product.image ?? PLACEHOLDER_IMAGE,
    price: product.price,
    originalPrice: product.originalPrice,
    discount: product.discount,
    soldPercentage: product.soldPercentage,
    remainingStock: product.remainingStock,
  }));
}

export function mapActiveFlashSale(
  flashSale: ActiveFlashSale,
): FlashSaleViewModel {
  return {
    id: flashSale.id,
    name: flashSale.name,
    startsAt: flashSale.startsAt,
    endsAt: flashSale.endsAt,
    products: mapFlashSaleProducts(flashSale.products),
  };
}
