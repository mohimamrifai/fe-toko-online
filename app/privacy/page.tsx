import type { Metadata } from "next";

import { ContentSections } from "@/components/content/content-sections";
import { LegalPageShell } from "@/components/content/legal-page-shell";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { PRIVACY_SECTIONS } from "@/lib/content/legal";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description: "Kebijakan privasi dan perlindungan data pribadi pengguna TokoElektronik.",
};

export default function PrivacyPage() {
  return (
    <main>
      <Header />
      <LegalPageShell
        title="Kebijakan Privasi"
        description="Kami menghargai privasi Anda dan berkomitmen melindungi data pribadi pelanggan."
      >
        <ContentSections sections={PRIVACY_SECTIONS} />
      </LegalPageShell>
      <Footer />
    </main>
  );
}
