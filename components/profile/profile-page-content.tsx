"use client";

import { useState } from "react";

import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProfile } from "@/lib/api/auth";

export function ProfilePageContent() {
  const { user, refreshUser } = useAuth();
  const [draft, setDraft] = useState<{ name: string; phone: string } | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!user) {
    return null;
  }

  const name = draft?.name ?? user.name;
  const phone = draft?.phone ?? user.phone ?? "";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      await updateProfile({
        name,
        phone,
      });
      await refreshUser();
      setDraft(null);
      setSuccess("Profil berhasil diperbarui.");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Gagal memperbarui profil. Silakan coba lagi.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-8">
      <h1 className="text-xl font-bold text-foreground md:text-2xl">
        Profil Saya
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Kelola informasi akun Anda.
      </p>

      <Card className="mt-6 max-w-xl">
        <CardHeader>
          <CardTitle>Informasi Akun</CardTitle>
          <CardDescription>
            Email tidak dapat diubah. Perbarui nama dan nomor telepon Anda.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama</Label>
              <Input
                id="name"
                autoComplete="name"
                value={name}
                onChange={(event) =>
                  setDraft({ name: event.target.value, phone })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={user.email}
                disabled
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Nomor Telepon</Label>
              <Input
                id="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+6281234567890"
                value={phone}
                onChange={(event) =>
                  setDraft({ name, phone: event.target.value })
                }
              />
            </div>

            {error ? (
              <p className="text-sm text-destructive" role="alert">{error}</p>
            ) : null}

            {success ? (
              <p className="text-sm text-emerald-600" role="status">{success}</p>
            ) : null}

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
