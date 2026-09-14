import { Badge } from "@/components/ui/badge";
import type { OrderStatus } from "@/types/order";

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Menunggu Pembayaran",
  paid: "Dibayar",
  processing: "Diproses",
  shipped: "Dikirim",
  completed: "Selesai",
  cancelled: "Dibatalkan",
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const variant =
    status === "completed"
      ? "default"
      : status === "cancelled"
        ? "destructive"
        : "secondary";

  return <Badge variant={variant}>{STATUS_LABELS[status]}</Badge>;
}
