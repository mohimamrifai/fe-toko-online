import type { Metadata } from "next";

import { RequireAdmin } from "@/components/auth/require-admin";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Panel administrasi toko elektronik.",
};

export default function AdminPage() {
  return (
    <main>
      <Header />
      <RequireAdmin>
        <section className="mx-auto max-w-7xl px-4 py-12 md:px-8">
          <h1 className="text-3xl font-semibold tracking-tight">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-muted-foreground">
            Selamat datang di panel admin. Fitur manajemen lengkap akan
            ditambahkan pada sprint berikutnya.
          </p>
        </section>
      </RequireAdmin>
      <Footer />
    </main>
  );
}
