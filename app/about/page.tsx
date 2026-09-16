import type { Metadata } from "next";

import { ContentSections } from "@/components/content/content-sections";
import { LegalPageShell } from "@/components/content/legal-page-shell";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ABOUT_SECTIONS } from "@/lib/content/legal";
import { STORE_INFO } from "@/lib/content/store-info";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: `Pelajari lebih lanjut tentang ${STORE_INFO.name} dan komitmen layanan kami.`,
};

export default function AboutPage() {
  return (
    <main>
      <Header />
      <LegalPageShell
        title="Tentang Kami"
        description={STORE_INFO.tagline}
      >
        <ContentSections sections={ABOUT_SECTIONS} />
      </LegalPageShell>
      <Footer />
    </main>
  );
}
