import { PropertyForm } from "@/components/dashboard/PropertyForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PropertiEditPage({ params }: PageProps) {
  const { id } = await params;
  return <PropertyForm mode="edit" id={id} />;
}
