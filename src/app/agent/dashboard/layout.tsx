import type { Metadata } from "next";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";

export const metadata: Metadata = {
  title: "Dashboard — Prime Property",
  description: "Dashboard admin Prime Property untuk mengelola listing, leads, dan agen.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-cream">
      <Sidebar />
      <div className="md:pl-64 flex flex-col min-h-screen">
        <Topbar />
        <main className="flex-1 p-5 md:p-8">{children}</main>
      </div>
    </div>
  );
}
