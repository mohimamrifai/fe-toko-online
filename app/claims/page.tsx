import type { Metadata } from "next";

import { RequireAuth } from "@/components/auth/require-auth";
import { ClaimsPageContent } from "@/components/claims/claims-page-content";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
  title: "Klaim Garansi & Retur",
  description: "Pantau status klaim garansi dan retur produk Anda.",
};

export default function ClaimsPage() {
  return (
    <main>
      <Header />
      <RequireAuth>
        <ClaimsPageContent />
      </RequireAuth>
      <Footer />
    </main>
  );
}
