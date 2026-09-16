import type { Metadata } from "next";

import { ContentSections } from "@/components/content/content-sections";
import { LegalPageShell } from "@/components/content/legal-page-shell";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { TERMS_SECTIONS } from "@/lib/content/legal";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan",
  description: "Syarat dan ketentuan penggunaan layanan belanja online TokoElektronik.",
};

export default function TermsPage() {
  return (
    <main>
      <Header />
      <LegalPageShell
        title="Syarat & Ketentuan"
        description="Harap membaca ketentuan berikut sebelum menggunakan layanan kami."
      >
        <ContentSections sections={TERMS_SECTIONS} />
      </LegalPageShell>
      <Footer />
    </main>
  );
}
