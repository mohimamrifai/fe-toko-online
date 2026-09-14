"use client";

import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createClaim } from "@/lib/api/claim";
import { uploadImage } from "@/lib/api/storage";
import type { ClaimType } from "@/types/claim";
import type { OrderItem, OrderStatus } from "@/types/order";

const ELIGIBLE_ORDER_STATUSES: OrderStatus[] = [
  "paid",
  "processing",
  "shipped",
  "completed",
];

type CreateClaimDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderId: string;
  orderStatus: OrderStatus;
  item: OrderItem;
  hasActiveClaim: boolean;
  onSuccess: () => void;
};

export function CreateClaimDialog({
  open,
  onOpenChange,
  orderStatus,
  item,
  hasActiveClaim,
  onSuccess,
}: CreateClaimDialogProps) {
  const [type, setType] = useState<ClaimType>("warranty");
  const [reason, setReason] = useState("");
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmitClaim =
    ELIGIBLE_ORDER_STATUSES.includes(orderStatus) && !hasActiveClaim;

  function resetForm() {
    setType("warranty");
    setReason("");
    setProofFile(null);
    setPreviewUrl(null);
    setError(null);
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      resetForm();
    }

    onOpenChange(nextOpen);
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    setProofFile(file);
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
  }

  async function handleSubmit() {
    if (!canSubmitClaim) {
      return;
    }

    if (!reason.trim()) {
      setError("Alasan klaim wajib diisi.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      let proofImageUrl: string | undefined;

      if (proofFile) {
        proofImageUrl = await uploadImage(proofFile, "claims");
      }

      await createClaim({
        orderItemId: item.id,
        type,
        reason: reason.trim(),
        proofImageUrl,
      });

      resetForm();
      onOpenChange(false);
      onSuccess();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Gagal mengajukan klaim.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Ajukan Klaim</DialogTitle>
          <DialogDescription>
            {item.productName}
            {item.variantName ? ` · ${item.variantName}` : ""}
          </DialogDescription>
        </DialogHeader>

        {!canSubmitClaim ? (
          <p className="text-sm text-muted-foreground">
            {hasActiveClaim
              ? "Item ini masih memiliki klaim yang sedang diproses."
              : "Klaim hanya dapat diajukan setelah pesanan dibayar."}
          </p>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="claim-type">Tipe Klaim</Label>
              <select
                id="claim-type"
                value={type}
                onChange={(event) =>
                  setType(event.target.value as ClaimType)
                }
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              >
                <option value="warranty">Garansi</option>
                <option value="return">Retur / Pengembalian</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="claim-reason">Alasan</Label>
              <Textarea
                id="claim-reason"
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                placeholder="Jelaskan kondisi produk dan alasan klaim..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="claim-proof">Bukti Foto (opsional)</Label>
              <input
                id="claim-proof"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleFileChange}
                className="block w-full text-sm text-muted-foreground file:mr-3 file:rounded-md file:border-0 file:bg-muted file:px-3 file:py-2 file:text-sm file:font-medium"
              />
              {previewUrl ? (
                <div className="relative mt-2 h-40 w-full overflow-hidden rounded-lg border bg-muted">
                  <Image
                    src={previewUrl}
                    alt="Preview bukti klaim"
                    fill
                    sizes="400px"
                    className="object-cover"
                  />
                </div>
              ) : null}
            </div>

            {error ? (
              <p className="text-sm text-destructive" role="alert">{error}</p>
            ) : null}
          </div>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isSubmitting}
          >
            Batal
          </Button>
          {canSubmitClaim ? (
            <Button disabled={isSubmitting} onClick={() => void handleSubmit()}>
              {isSubmitting ? "Mengirim..." : "Kirim Klaim"}
            </Button>
          ) : null}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
