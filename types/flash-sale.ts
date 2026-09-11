export interface FlashSaleProduct {
  id: string;
  slug: string;
  name: string;
  image: string | null;
  price: number;
  originalPrice: number;
  discount: number;
  soldCount: number;
  stockLimit: number;
  soldPercentage: number;
  remainingStock: number;
}

export interface ActiveFlashSale {
  id: string;
  name: string;
  startsAt: string;
  endsAt: string;
  products: FlashSaleProduct[];
}

export interface ActiveFlashSaleResponse {
  data: ActiveFlashSale;
}
