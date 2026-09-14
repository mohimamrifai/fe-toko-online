"use client";

import Image from "next/image";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { ClaimStatusBadge } from "@/components/claims/claim-status-badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { getClaims } from "@/lib/api/claim";
import { formatOrderDate } from "@/lib/format-date";
import type { Claim } from "@/types/claim";

const TYPE_LABELS = {
  warranty: "Garansi",
  return: "Retur",
} as const;

export function ClaimsPageContent() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadClaims = useCallback(async () => {
    setError(null);

    try {
      const data = await getClaims();
      setClaims(data);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Gagal memuat daftar klaim.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial claims fetch
    void loadClaims();
  }, [loadClaims]);

  if (isLoading) {
    return (
      <section className="mx-auto flex max-w-7xl items-center justify-center px-4 py-16 md:px-8">
        <Spinner className="size-6 text-muted-foreground" />
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 text-center md:px-8">
        <p className="text-sm text-destructive" role="alert">{error}</p>
        <Button className="mt-4" onClick={() => void loadClaims()}>
          Coba Lagi
        </Button>
      </section>
    );
  }

  if (claims.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 text-center md:px-8">
        <ShieldAlert className="mx-auto size-10 text-muted-foreground" />
        <h1 className="mt-4 text-xl font-bold text-foreground md:text-2xl">
          Belum Ada Klaim
        </h1>
        <p className="mt-3 text-sm text-muted-foreground md:text-base">
          Ajukan klaim garansi atau retur dari detail pesanan Anda.
        </p>
        <Button
          nativeButton={false}
          render={<Link href="/orders" />}
          className="mt-6"
        >
          Lihat Pesanan Saya
        </Button>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 md:px-8">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-foreground md:text-2xl">
          Klaim Garansi & Retur
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {claims.length} klaim tercatat
        </p>
      </div>

      <div className="space-y-4">
        {claims.map((claim) => (
          <article
            key={claim.id}
            className="rounded-xl border bg-card p-4 md:p-5"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <ClaimStatusBadge status={claim.status} />
                  <span className="rounded-full bg-muted px-2 py-1 text-[10px] font-medium text-muted-foreground">
                    {TYPE_LABELS[claim.type]}
                  </span>
                </div>
                <h2 className="mt-3 text-sm font-semibold text-foreground md:text-base">
                  {claim.productName}
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  Pesanan {claim.orderNumber} ·{" "}
                  {formatOrderDate(claim.createdAt)}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {claim.reason}
                </p>
              </div>

              {claim.proofImageUrl ? (
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border bg-muted">
                  <Image
                    src={claim.proofImageUrl}
                    alt={`Bukti klaim ${claim.productName}`}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
              ) : null}
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <Button
                variant="outline"
                size="sm"
                nativeButton={false}
                render={<Link href={`/orders/${claim.orderId}`} />}
              >
                Lihat Pesanan
              </Button>
              <Button
                variant="ghost"
                size="sm"
                nativeButton={false}
                render={<Link href={`/products/${claim.productSlug}`} />}
              >
                Lihat Produk
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
