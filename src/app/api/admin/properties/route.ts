import { NextResponse } from "next/server";
import { jsonError, slugify } from "@/lib/api";
import { requireSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { propertyInclude, serializeProperty } from "@/lib/property-mapper";
import { propertySchema } from "@/lib/validation";

const DEFAULT_PROPERTY_IMAGE =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80";

async function getUniqueSlug(name: string) {
  const base = slugify(name) || "properti";
  let slug = base;
  let suffix = 1;

  while (await prisma.property.findUnique({ where: { slug } })) {
    suffix += 1;
    slug = `${base}-${suffix}`;
  }

  return slug;
}

export async function GET() {
  const session = await requireSession();
  if (!session) return jsonError("Unauthorized", 401);

  const properties = await prisma.property.findMany({
    include: propertyInclude,
    orderBy: [{ createdAt: "desc" }],
  });

  return NextResponse.json({ data: properties.map(serializeProperty) });
}

export async function POST(request: Request) {
  const session = await requireSession();
  if (!session) return jsonError("Unauthorized", 401);

  const body = await request.json().catch(() => null);
  const parsed = propertySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: "Data properti tidak valid.", issues: parsed.error.flatten().fieldErrors }, { status: 422 });
  }

  const slug = await getUniqueSlug(parsed.data.name);
  const property = await prisma.property.create({
    data: {
      id: slug,
      slug,
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
      isFeatured: parsed.data.isFeatured ?? false,
      featuredRank: parsed.data.featuredRank ?? 0,
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

  return NextResponse.json({ data: serializeProperty(property) }, { status: 201 });
}
