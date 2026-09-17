"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Spinner } from "@/components/ui/spinner";
import {
  createAdminPromo,
  getAdminPromo,
  updateAdminPromo,
} from "@/lib/api/admin-promo";
import { getAdminProducts } from "@/lib/api/admin-product";
import type { AdminProductListItem } from "@/types/admin-product";
import type { PromoDiscountType } from "@/types/promo";

type AdminPromoFormProps = {
  mode: "create" | "edit";
  promoId?: string;
};

function toDateTimeLocalValue(value: string) {
  const date = new Date(value);
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60_000);
  return localDate.toISOString().slice(0, 16);
}

export function AdminPromoForm({ mode, promoId }: AdminPromoFormProps) {
  const router = useRouter();
  const [products, setProducts] = useState<AdminProductListItem[]>([]);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [discountType, setDiscountType] = useState<PromoDiscountType>(
    "percentage",
  );
  const [discountValue, setDiscountValue] = useState("");
  const [minPurchase, setMinPurchase] = useState("0");
  const [startsAt, setStartsAt] = useState("");
  const [endsAt, setEndsAt] = useState("");
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(mode === "edit");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadProducts = useCallback(async () => {
    const data = await getAdminProducts({ isActive: true, limit: 100 });
    setProducts(data.items);
  }, []);

  const loadPromo = useCallback(async () => {
    if (mode !== "edit" || !promoId) {
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const promo = await getAdminPromo(promoId);
      setCode(promo.code);
      setName(promo.name);
      setDiscountType(promo.discountType);
      setDiscountValue(String(promo.discountValue));
      setMinPurchase(String(promo.minPurchase));
      setStartsAt(toDateTimeLocalValue(promo.startsAt));
      setEndsAt(toDateTimeLocalValue(promo.endsAt));
      setSelectedProductIds(promo.productIds);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Gagal memuat data promo.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [mode, promoId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial product options fetch
    void loadProducts().catch(() => undefined);
  }, [loadProducts]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial promo fetch
    void loadPromo();
  }, [loadPromo]);

  function toggleProduct(productId: string, checked: boolean) {
    setSelectedProductIds((current) => {
      if (checked) {
        return [...current, productId];
      }

      return current.filter((id) => id !== productId);
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const payload = {
      code: code.trim(),
      name: name.trim(),
      discountType,
      discountValue: Number(discountValue),
      minPurchase: Number(minPurchase || 0),
      startsAt: new Date(startsAt).toISOString(),
      endsAt: new Date(endsAt).toISOString(),
      productIds: selectedProductIds,
    };

    try {
      if (mode === "create") {
        await createAdminPromo(payload);
      } else if (promoId) {
        await updateAdminPromo(promoId, payload);
      }

      router.push("/admin/promos");
      router.refresh();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Gagal menyimpan promo.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Spinner className="size-6 text-muted-foreground" />
      </div>
    );
  }

  return (
    <form onSubmit={(event) => void handleSubmit(event)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informasi Promo</CardTitle>
          <CardDescription>
            Atur kode voucher, jenis diskon, dan periode berlaku.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="code">Kode Promo</Label>
            <Input
              id="code"
              value={code}
              onChange={(event) => setCode(event.target.value.toUpperCase())}
              placeholder="DISKON10"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Nama Promo</Label>
            <Input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Diskon Spesial"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="discountType">Tipe Diskon</Label>
            <NativeSelect
              id="discountType"
              value={discountType}
              onChange={(event) =>
                setDiscountType(event.target.value as PromoDiscountType)
              }
            >
              <NativeSelectOption value="percentage">Persentase (%)</NativeSelectOption>
              <NativeSelectOption value="fixed">Nominal (Rp)</NativeSelectOption>
            </NativeSelect>
          </div>

          <div className="space-y-2">
            <Label htmlFor="discountValue">
              {discountType === "percentage" ? "Nilai Diskon (%)" : "Nilai Diskon (Rp)"}
            </Label>
            <Input
              id="discountValue"
              type="number"
              min="1"
              step={discountType === "percentage" ? "1" : "1000"}
              value={discountValue}
              onChange={(event) => setDiscountValue(event.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="minPurchase">Minimal Belanja (Rp)</Label>
            <Input
              id="minPurchase"
              type="number"
              min="0"
              step="1000"
              value={minPurchase}
              onChange={(event) => setMinPurchase(event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="startsAt">Mulai Berlaku</Label>
            <Input
              id="startsAt"
              type="datetime-local"
              value={startsAt}
              onChange={(event) => setStartsAt(event.target.value)}
              required
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="endsAt">Berakhir</Label>
            <Input
              id="endsAt"
              type="datetime-local"
              value={endsAt}
              onChange={(event) => setEndsAt(event.target.value)}
              required
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Produk Terkait</CardTitle>
          <CardDescription>
            Kosongkan semua pilihan agar promo berlaku untuk semua produk.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {products.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Belum ada produk aktif yang dapat dipilih.
            </p>
          ) : (
            products.map((product) => (
              <label
                key={product.id}
                className="flex items-center gap-3 rounded-lg border p-3"
              >
                <Checkbox
                  checked={selectedProductIds.includes(product.id)}
                  onCheckedChange={(checked) =>
                    toggleProduct(product.id, checked === true)
                  }
                />
                <span className="text-sm text-foreground">{product.name}</span>
              </label>
            ))
          )}
        </CardContent>
      </Card>

      {error ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      <div className="flex gap-3">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Menyimpan..." : mode === "create" ? "Buat Promo" : "Simpan Perubahan"}
        </Button>
        <Button
          nativeButton={false}
          render={<Link href="/admin/promos" />}
          variant="outline"
          type="button"
        >
          Batal
        </Button>
      </div>
    </form>
  );
}
