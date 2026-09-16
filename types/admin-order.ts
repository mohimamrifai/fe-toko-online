import type {
  OrderDetail,
  OrderStatus,
  OrderStatusHistoryItem,
} from "@/types/order";

export interface AdminOrderCustomer {
  id: string | null;
  name: string | null;
  email: string | null;
  phone: string | null;
}

export interface AdminOrderListItem {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  total: number;
  courier: string | null;
  trackingNumber: string | null;
  createdAt: string;
  itemCount: number;
  customer: AdminOrderCustomer;
}

export interface AdminOrderDetail extends OrderDetail {
  customer: AdminOrderCustomer;
}

export interface AdminOrderListResponse {
  data: AdminOrderListItem[];
}

export interface AdminOrderResponse {
  data: AdminOrderDetail;
}

export interface UpdateAdminOrderStatusPayload {
  status: Extract<
    OrderStatus,
    "processing" | "shipped" | "completed" | "cancelled"
  >;
  note?: string;
}

export interface UpdateAdminOrderShippingPayload {
  courier: string;
  trackingNumber: string;
}

export type { OrderStatusHistoryItem };
