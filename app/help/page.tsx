import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { HELP_LINKS } from "@/lib/content/help";

export const metadata: Metadata = {
  title: "Pusat Bantuan",
  description: "Temukan jawaban seputar pengiriman, retur, garansi, dan layanan pelanggan.",
};

export default function HelpPage() {
  return (
    <main>
      <Header />
      <section className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Pusat Bantuan
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
            Pilih topik bantuan untuk mendapatkan informasi lengkap seputar
            belanja di {`TokoElektronik`}.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {HELP_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl border bg-card p-5 transition-shadow hover:shadow-md"
            >
              <h2 className="text-sm font-semibold text-foreground md:text-base">
                {link.label}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Pelajari informasi terkait {link.label.toLowerCase()}.
              </p>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
