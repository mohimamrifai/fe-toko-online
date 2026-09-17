export type PromoDiscountType = "percentage" | "fixed";

export interface Promo {
  id: string;
  code: string;
  name: string;
  discountType: PromoDiscountType;
  discountValue: number;
  minPurchase: number;
  startsAt: string;
  endsAt: string;
  productIds: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ValidatePromoPayload {
  code: string;
}

export interface ValidatePromoResult {
  promoId: string;
  code: string;
  name: string;
  discountType: PromoDiscountType;
  discountValue: number;
  minPurchase: number;
  eligibleSubtotal: number;
  discountAmount: number;
}

export interface CreatePromoPayload {
  code: string;
  name: string;
  discountType: PromoDiscountType;
  discountValue: number;
  minPurchase?: number;
  startsAt: string;
  endsAt: string;
  productIds?: string[];
}

export type UpdatePromoPayload = Partial<CreatePromoPayload>;

export interface PromoResponse {
  data: Promo;
}

export interface PromoListResponse {
  data: Promo[];
}

export interface ValidatePromoResponse {
  data: ValidatePromoResult;
}
