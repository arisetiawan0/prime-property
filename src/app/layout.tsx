import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prime Property — Temukan Hunian Impian Anda",
  description:
    "Prime Property menyajikan data properti secara jujur, transparan, dan akurat. Temukan villa, ruko, dan hunian eksklusif pilihan.",
  openGraph: {
    title: "Prime Property — Temukan Hunian Impian Anda",
    description:
      "Prime Property menyajikan data properti secara jujur, transparan, dan akurat.",
    siteName: "Prime Property",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${geist.variable} antialiased`}>
      <body className="min-h-screen flex flex-col bg-cream text-charcoal">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
