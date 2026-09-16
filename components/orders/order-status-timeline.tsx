import { formatOrderDate } from "@/lib/format-date";
import type { OrderStatusHistoryItem } from "@/types/order";
import { OrderStatusBadge } from "@/components/orders/order-status-badge";
import type { OrderStatus } from "@/types/order";

type OrderStatusTimelineProps = {
  history: OrderStatusHistoryItem[];
};

function isOrderStatus(status: string): status is OrderStatus {
  return [
    "pending",
    "paid",
    "processing",
    "shipped",
    "completed",
    "cancelled",
  ].includes(status);
}

export function OrderStatusTimeline({ history }: OrderStatusTimelineProps) {
  if (history.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Belum ada riwayat status pesanan.
      </p>
    );
  }

  return (
    <ol className="space-y-4">
      {history.map((entry, index) => (
        <li key={entry.id} className="flex gap-3">
          <div className="flex flex-col items-center">
            <span
              className={`mt-1 size-2.5 rounded-full ${
                index === history.length - 1
                  ? "bg-primary"
                  : "bg-muted-foreground/40"
              }`}
            />
            {index < history.length - 1 ? (
              <span className="mt-1 h-full w-px bg-border" />
            ) : null}
          </div>
          <div className="pb-2">
            {isOrderStatus(entry.status) ? (
              <OrderStatusBadge status={entry.status} />
            ) : (
              <p className="text-sm font-medium capitalize text-foreground">
                {entry.status}
              </p>
            )}
            {entry.note ? (
              <p className="mt-2 text-sm text-muted-foreground">{entry.note}</p>
            ) : null}
            <p className="mt-1 text-xs text-muted-foreground">
              {formatOrderDate(entry.createdAt)}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
