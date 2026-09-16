import type { OrderStatus } from "@/types/order";

export const ADMIN_NEXT_STATUS_OPTIONS: Partial<
  Record<OrderStatus, OrderStatus[]>
> = {
  paid: ["processing", "cancelled"],
  processing: ["shipped", "cancelled"],
  shipped: ["completed"],
};

export function getAdminNextStatusOptions(status: OrderStatus) {
  return ADMIN_NEXT_STATUS_OPTIONS[status] ?? [];
}
