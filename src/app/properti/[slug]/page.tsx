import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PropertyGallery, PropertySpecsBar } from "@/components/PropertyGallery";
import { PropertyDescription } from "@/components/PropertyDescription";
import { PropertyContactCard } from "@/components/PropertyContactCard";
import { getPublicProperty } from "@/lib/property-data";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPublicProperty(slug);
  if (!property) return {};
  return {
    title: `${property.name} — Prime Property`,
    description: property.description.slice(0, 160),
    openGraph: {
      title: `${property.name} — Prime Property`,
      description: property.description.slice(0, 160),
      images: [property.imageUrl],
    },
  };
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const property = await getPublicProperty(slug);
  if (!property) notFound();

  return (
    <>
      <PropertyGallery property={property} />

      {/* Two-column main content */}
      <section className="px-5 md:px-20 pb-20 md:pb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Main column */}
          <div className="lg:col-span-8">
            <PropertySpecsBar property={property} />
            <PropertyDescription property={property} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <PropertyContactCard property={property} />
          </div>
        </div>
      </section>
    </>
  );
}
