import type { Prisma } from "@prisma/client";
import type { PropertyStatus } from "@/data/properties";

export const propertyInclude = {
  images: { orderBy: { sortOrder: "asc" as const } },
} satisfies Prisma.PropertyInclude;

export type PropertyWithImages = Prisma.PropertyGetPayload<{
  include: typeof propertyInclude;
}>;

export function serializeProperty(property: PropertyWithImages) {
  return {
    id: property.slug,
    name: property.name,
    area: property.area,
    address: property.address,
    price: Number(property.price),
    type: property.type,
    status: property.status as PropertyStatus,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    areaSqm: property.areaSqm,
    certificate: property.certificate,
    yearBuilt: property.yearBuilt,
    description: property.description,
    imageUrl: property.imageUrl,
    imageAlt: property.imageAlt,
    gallery: property.images.map((image) => image.url),
    isFeatured: property.isFeatured,
    featuredRank: property.featuredRank,
  };
}
