import type { Metadata } from "next";

import { RequireAuth } from "@/components/auth/require-auth";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ProfilePageContent } from "@/components/profile/profile-page-content";

export const metadata: Metadata = {
  title: "Profil Saya",
  description: "Kelola informasi akun Anda.",
};

export default function ProfilePage() {
  return (
    <main>
      <Header />
      <RequireAuth>
        <ProfilePageContent />
      </RequireAuth>
      <Footer />
    </main>
  );
}
