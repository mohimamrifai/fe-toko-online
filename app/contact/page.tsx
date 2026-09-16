import type { Metadata } from "next";

import { ContactPageContent } from "@/components/contact/contact-page-content";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
  title: "Hubungi Kami",
  description: "Hubungi customer service TokoElektronik untuk bantuan produk dan pesanan.",
};

export default function ContactPage() {
  return (
    <main>
      <Header />
      <ContactPageContent />
      <Footer />
    </main>
  );
}
