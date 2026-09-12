import type { Metadata } from "next";

import { RegisterForm } from "@/components/auth/register-form";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
  title: "Daftar",
  description: "Buat akun baru di toko elektronik kami.",
};

export default function RegisterPage() {
  return (
    <main>
      <Header />
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-16">
        <RegisterForm />
      </section>
      <Footer />
    </main>
  );
}
