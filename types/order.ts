import type { Address } from "@/types/address";

export type OrderStatus =
  | "pending"
  | "paid"
  | "processing"
  | "shipped"
  | "completed"
  | "cancelled";

export interface OrderItem {
  id: string;
  productId: string;
  variantId: string | null;
  productName: string;
  slug: string;
  price: number;
  quantity: number;
  image: string | null;
  variantName: string | null;
}

export interface OrderStatusHistoryItem {
  id: string;
  status: string;
  note: string | null;
  createdAt: string;
}

export interface OrderPreviewItem {
  productName: string;
  image: string | null;
}

export interface OrderSummary {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  subtotal: number;
  shippingCost: number;
  discountAmount: number;
  total: number;
  courier: string | null;
  trackingNumber: string | null;
  createdAt: string;
  itemCount: number;
  items: OrderItem[];
  previewItem: OrderPreviewItem | null;
}

export interface OrderDetail extends OrderSummary {
  shippingAddress: Address;
  statusHistory: OrderStatusHistoryItem[];
}

export interface CheckoutPayload {
  shippingAddressId: string;
  courier: string;
  promoCode?: string;
}

export interface OrderResponse {
  data: OrderDetail;
}

export interface OrderListResponse {
  data: OrderSummary[];
}

export interface PayOrderResponse {
  snapToken: string;
  redirectUrl: string;
  clientKey: string;
  midtransOrderId: string;
}

export interface PayOrderApiResponse {
  data: PayOrderResponse;
}
