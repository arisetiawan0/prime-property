import { NextResponse } from "next/server";
import { jsonError } from "@/lib/api";
import { requireSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { propertyInclude, serializeProperty } from "@/lib/property-mapper";
import { propertySchema } from "@/lib/validation";

const DEFAULT_PROPERTY_IMAGE =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  const session = await requireSession();
  if (!session) return jsonError("Unauthorized", 401);

  const { id } = await context.params;
  const property = await prisma.property.findUnique({ where: { slug: id }, include: propertyInclude });

  if (!property) return jsonError("Properti tidak ditemukan.", 404);
  return NextResponse.json({ data: serializeProperty(property) });
}

export async function PATCH(request: Request, context: RouteContext) {
  const session = await requireSession();
  if (!session) return jsonError("Unauthorized", 401);

  const { id } = await context.params;
  const existing = await prisma.property.findUnique({ where: { slug: id } });
  if (!existing) return jsonError("Properti tidak ditemukan.", 404);

  const body = await request.json().catch(() => null);
  const parsed = propertySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: "Data properti tidak valid.", issues: parsed.error.flatten().fieldErrors }, { status: 422 });
  }

  await prisma.propertyImage.deleteMany({ where: { propertyId: existing.id } });

  const property = await prisma.property.update({
    where: { id: existing.id },
    data: {
      name: parsed.data.name,
      area: parsed.data.area,
      address: parsed.data.address,
      price: BigInt(Math.round(parsed.data.price)),
      type: parsed.data.type,
      status: parsed.data.status,
      bedrooms: parsed.data.bedrooms,
      bathrooms: parsed.data.bathrooms,
      areaSqm: parsed.data.areaSqm,
      certificate: parsed.data.certificate,
      yearBuilt: parsed.data.yearBuilt,
      description: parsed.data.description,
      imageUrl: parsed.data.imageUrl || DEFAULT_PROPERTY_IMAGE,
      imageAlt: parsed.data.imageAlt || parsed.data.name,
      isFeatured: parsed.data.isFeatured ?? existing.isFeatured,
      featuredRank: parsed.data.featuredRank ?? existing.featuredRank,
      images: {
        create: parsed.data.gallery.map((url, index) => ({
          url,
          alt: `${parsed.data.name} - galeri ${index + 1}`,
          sortOrder: index + 1,
        })),
      },
    },
    include: propertyInclude,
  });

  return NextResponse.json({ data: serializeProperty(property) });
}

export async function DELETE(_request: Request, context: RouteContext) {
  const session = await requireSession();
  if (!session) return jsonError("Unauthorized", 401);

  const { id } = await context.params;
  const existing = await prisma.property.findUnique({ where: { slug: id } });
  if (!existing) return jsonError("Properti tidak ditemukan.", 404);

  await prisma.property.delete({ where: { id: existing.id } });
  return NextResponse.json({ ok: true });
}
