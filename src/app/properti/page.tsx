import type { Metadata } from "next";
import { PropertyListing } from "@/components/PropertyListing";
import { getPublicProperties } from "@/lib/property-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Koleksi Properti — Prime Property",
  description:
    "Jelajahi seluruh koleksi properti premium Prime Property. Villa, rumah, apartemen, ruko, townhouse, dan kavling di lokasi terbaik.",
  openGraph: {
    title: "Koleksi Properti — Prime Property",
    description:
      "Jelajahi seluruh koleksi properti premium Prime Property.",
    siteName: "Prime Property",
    locale: "id_ID",
    type: "website",
  },
};

export default async function PropertiPage() {
  const properties = await getPublicProperties();
  return <PropertyListing properties={properties} />;
}
