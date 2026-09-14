"use client";

import { MapPin, Pencil, Plus, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { AddressFormDialog } from "@/components/address/address-form-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/ui/spinner";
import { deleteAddress, getAddresses } from "@/lib/api/address";
import type { Address } from "@/types/address";

export function AddressPageContent() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [deletingAddress, setDeletingAddress] = useState<Address | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadAddresses = useCallback(async () => {
    setError(null);

    try {
      const data = await getAddresses();
      setAddresses(data);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Gagal memuat alamat. Silakan coba lagi.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial address list fetch
    void loadAddresses();
  }, [loadAddresses]);

  function openCreateDialog() {
    setEditingAddress(null);
    setDialogOpen(true);
  }

  function openEditDialog(address: Address) {
    setEditingAddress(address);
    setDialogOpen(true);
  }

  async function handleDelete() {
    if (!deletingAddress) {
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      await deleteAddress(deletingAddress.id);
      setDeletingAddress(null);
      await loadAddresses();
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Gagal menghapus alamat. Silakan coba lagi.",
      );
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground md:text-2xl">
            Alamat Pengiriman
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Kelola alamat untuk pengiriman pesanan Anda.
          </p>
        </div>

        <Button onClick={openCreateDialog}>
          <Plus className="size-4" />
          Tambah Alamat
        </Button>
      </div>

      {error ? (
        <p className="mt-4 text-sm text-destructive" role="alert">{error}</p>
      ) : null}

      {isLoading ? (
        <div className="mt-10 flex justify-center">
          <Spinner className="size-6 text-muted-foreground" />
        </div>
      ) : addresses.length === 0 ? (
        <div className="mt-10 rounded-xl border border-dashed p-8 text-center">
          <MapPin className="mx-auto size-8 text-muted-foreground" />
          <p className="mt-3 text-sm text-muted-foreground">
            Belum ada alamat tersimpan. Tambahkan alamat untuk memudahkan
            checkout.
          </p>
          <Button className="mt-4" onClick={openCreateDialog}>
            <Plus className="size-4" />
            Tambah Alamat Pertama
          </Button>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {addresses.map((address) => (
            <article
              key={address.id}
              className="rounded-xl border bg-card p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-semibold text-foreground">
                      {address.label || "Alamat"}
                    </h2>
                    {address.isDefault ? (
                      <Badge variant="secondary">Utama</Badge>
                    ) : null}
                  </div>
                  <p className="mt-2 text-sm font-medium text-foreground">
                    {address.recipientName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {address.phone}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={() => openEditDialog(address)}
                    aria-label={`Edit alamat ${address.label || address.recipientName}`}
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={() => setDeletingAddress(address)}
                    aria-label={`Hapus alamat ${address.label || address.recipientName}`}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>

              <p className="mt-4 text-sm text-muted-foreground">
                {address.fullAddress}, {address.city}, {address.province}{" "}
                {address.postalCode}
              </p>
            </article>
          ))}
        </div>
      )}

      <AddressFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        address={editingAddress}
        onSuccess={() => {
          void loadAddresses();
        }}
      />

      <AlertDialog
        open={Boolean(deletingAddress)}
        onOpenChange={(open) => {
          if (!open) {
            setDeletingAddress(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Alamat?</AlertDialogTitle>
            <AlertDialogDescription>
              Alamat &quot;{deletingAddress?.label || deletingAddress?.recipientName}&quot;
              akan dihapus permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Batal</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => {
                void handleDelete();
              }}
              disabled={isDeleting}
            >
              {isDeleting ? "Menghapus..." : "Hapus"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
