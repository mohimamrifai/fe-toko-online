import { Badge } from "@/components/ui/badge";
import type { ClaimStatus } from "@/types/claim";

const STATUS_LABELS: Record<ClaimStatus, string> = {
  submitted: "Diajukan",
  reviewing: "Ditinjau",
  approved: "Disetujui",
  rejected: "Ditolak",
  completed: "Selesai",
};

export function ClaimStatusBadge({ status }: { status: ClaimStatus }) {
  const variant =
    status === "approved" || status === "completed"
      ? "default"
      : status === "rejected"
        ? "destructive"
        : "secondary";

  return <Badge variant={variant}>{STATUS_LABELS[status]}</Badge>;
}
