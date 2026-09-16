"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { STORE_INFO } from "@/lib/content/store-info";

export function ContactPageContent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Semua field wajib diisi.");
      return;
    }

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    setName("");
    setEmail("");
    setMessage("");
    setSuccessMessage(
      "Pesan Anda telah kami terima. Tim customer service akan menghubungi Anda segera.",
    );
    setIsSubmitting(false);
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          Hubungi Kami
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
          Ada pertanyaan tentang produk, pesanan, atau garansi? Kirim pesan
          kepada tim kami.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <form
          onSubmit={(event) => void handleSubmit(event)}
          className="rounded-xl border bg-card p-5 md:p-6"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contact-name">Nama</Label>
              <Input
                id="contact-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Nama lengkap"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-email">Email</Label>
              <Input
                id="contact-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="nama@email.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-message">Pesan</Label>
              <Textarea
                id="contact-message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Tulis pertanyaan atau kendala Anda..."
                rows={6}
              />
            </div>
          </div>

          {error ? (
            <p className="mt-4 text-sm text-destructive" role="alert">{error}</p>
          ) : null}

          {successMessage ? (
            <p className="mt-4 text-sm text-primary" role="status">
              {successMessage}
            </p>
          ) : null}

          <Button type="submit" className="mt-6" disabled={isSubmitting}>
            {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
          </Button>
        </form>

        <aside className="h-fit space-y-4 rounded-xl border bg-card p-5 md:p-6">
          <h2 className="text-base font-semibold text-foreground">
            Informasi Toko
          </h2>
          <div className="space-y-4 text-sm text-muted-foreground">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{STORE_INFO.address}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-primary" />
              <span>{STORE_INFO.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-primary" />
              <span>{STORE_INFO.email}</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Jam operasional: {STORE_INFO.hours}
          </p>
        </aside>
      </div>
    </section>
  );
}
