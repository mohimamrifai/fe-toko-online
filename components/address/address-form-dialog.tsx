"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createAddress, updateAddress } from "@/lib/api/address";
import type { Address, CreateAddressPayload } from "@/types/address";

interface AddressFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  address?: Address | null;
  onSuccess: () => void;
}

const emptyForm: CreateAddressPayload = {
  label: "",
  recipientName: "",
  phone: "",
  fullAddress: "",
  city: "",
  province: "",
  postalCode: "",
  isDefault: false,
};

function getInitialForm(address?: Address | null): CreateAddressPayload {
  if (!address) {
    return emptyForm;
  }

  return {
    label: address.label ?? "",
    recipientName: address.recipientName,
    phone: address.phone,
    fullAddress: address.fullAddress,
    city: address.city,
    province: address.province,
    postalCode: address.postalCode,
    isDefault: address.isDefault,
  };
}

interface AddressFormFieldsProps {
  address?: Address | null;
  onCancel: () => void;
  onSuccess: () => void;
}

function AddressFormFields({
  address,
  onCancel,
  onSuccess,
}: AddressFormFieldsProps) {
  const [form, setForm] = useState<CreateAddressPayload>(() =>
    getInitialForm(address),
  );
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = Boolean(address);

  function updateField<K extends keyof CreateAddressPayload>(
    key: K,
    value: CreateAddressPayload[K],
  ) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const payload = {
      ...form,
      label: form.label?.trim() || undefined,
    };

    try {
      if (isEditing && address) {
        await updateAddress(address.id, payload);
      } else {
        await createAddress(payload);
      }

      onSuccess();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Gagal menyimpan alamat. Silakan coba lagi.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="label">Label Alamat</Label>
        <Input
          id="label"
          placeholder="Rumah, Kantor, dll."
          value={form.label ?? ""}
          onChange={(event) => updateField("label", event.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="recipientName">Nama Penerima</Label>
        <Input
          id="recipientName"
          value={form.recipientName}
          onChange={(event) =>
            updateField("recipientName", event.target.value)
          }
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Nomor Telepon</Label>
        <Input
          id="phone"
          type="tel"
          value={form.phone}
          onChange={(event) => updateField("phone", event.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="fullAddress">Alamat Lengkap</Label>
        <Input
          id="fullAddress"
          value={form.fullAddress}
          onChange={(event) => updateField("fullAddress", event.target.value)}
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="city">Kota</Label>
          <Input
            id="city"
            value={form.city}
            onChange={(event) => updateField("city", event.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="province">Provinsi</Label>
          <Input
            id="province"
            value={form.province}
            onChange={(event) => updateField("province", event.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="postalCode">Kode Pos</Label>
        <Input
          id="postalCode"
          value={form.postalCode}
          onChange={(event) => updateField("postalCode", event.target.value)}
          required
        />
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="isDefault"
          checked={form.isDefault ?? false}
          onCheckedChange={(checked) =>
            updateField("isDefault", checked === true)
          }
        />
        <Label htmlFor="isDefault">Jadikan alamat utama</Label>
      </div>

      {error ? (
        <p className="text-sm text-destructive" role="alert">{error}</p>
      ) : null}

      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Batal
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Menyimpan..." : "Simpan"}
        </Button>
      </DialogFooter>
    </form>
  );
}

export function AddressFormDialog({
  open,
  onOpenChange,
  address,
  onSuccess,
}: AddressFormDialogProps) {
  const isEditing = Boolean(address);

  function handleSuccess() {
    onSuccess();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Alamat" : "Tambah Alamat"}
          </DialogTitle>
          <DialogDescription>
            Lengkapi detail alamat pengiriman Anda.
          </DialogDescription>
        </DialogHeader>

        {open ? (
          <AddressFormFields
            key={address?.id ?? "new"}
            address={address}
            onCancel={() => onOpenChange(false)}
            onSuccess={handleSuccess}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
