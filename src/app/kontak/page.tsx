import type { Metadata } from "next";
import { ContactHero } from "@/components/ContactHero";
import { ContactContent } from "@/components/ContactContent";
import { OfficeSection } from "@/components/OfficeSection";

export const metadata: Metadata = {
  title: "Hubungi Kami — Prime Property",
  description:
    "Hubungi tim Prime Property untuk konsultasi properti premium. Kami siap membantu Anda menemukan properti impian dengan layanan personal terbaik.",
  openGraph: {
    title: "Hubungi Kami — Prime Property",
    description:
      "Hubungi tim Prime Property untuk konsultasi properti premium.",
    siteName: "Prime Property",
    locale: "id_ID",
    type: "website",
  },
};

export default function KontakPage() {
  return (
    <>
      <ContactHero />
      <ContactContent />
      <OfficeSection />
    </>
  );
}
