import type { Metadata } from "next";

import { FaqAccordion } from "@/components/help/faq-accordion";
import { HelpPageShell } from "@/components/help/help-page-shell";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { FAQ_ITEMS } from "@/lib/content/help";

export const metadata: Metadata = {
  title: "FAQ (Tanya Jawab)",
  description: "Jawaban atas pertanyaan umum seputar belanja, pembayaran, dan layanan.",
};

export default function FaqPage() {
  return (
    <main>
      <Header />
      <HelpPageShell
        title="FAQ (Tanya Jawab)"
        description="Temukan jawaban cepat untuk pertanyaan yang sering diajukan pelanggan."
        currentPath="/help/faq"
      >
        <FaqAccordion items={FAQ_ITEMS} />
      </HelpPageShell>
      <Footer />
    </main>
  );
}
