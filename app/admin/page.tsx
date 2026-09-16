import type { Metadata } from "next";

import { DashboardContent } from "@/components/admin/dashboard-content";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function AdminDashboardPage() {
  return <DashboardContent />;
}
