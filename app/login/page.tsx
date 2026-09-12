import type { Metadata } from "next";

import { LoginForm } from "@/components/auth/login-form";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
  title: "Masuk",
  description: "Masuk ke akun toko elektronik Anda.",
};

export default function LoginPage() {
  return (
    <main>
      <Header />
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-16">
        <LoginForm />
      </section>
      <Footer />
    </main>
  );
}
