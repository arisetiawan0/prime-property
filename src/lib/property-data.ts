import { prisma } from "@/lib/prisma";
import { propertyInclude, serializeProperty } from "@/lib/property-mapper";

export async function getPublicProperties() {
  const properties = await prisma.property.findMany({
    include: propertyInclude,
    orderBy: [{ featuredRank: "asc" }, { createdAt: "desc" }],
  });

  return properties.map(serializeProperty);
}

export async function getFeaturedProperties() {
  const properties = await prisma.property.findMany({
    where: { isFeatured: true },
    include: propertyInclude,
    orderBy: [{ featuredRank: "asc" }, { createdAt: "desc" }],
    take: 6,
  });

  return properties.map(serializeProperty);
}

export async function getPublicProperty(slug: string) {
  const property = await prisma.property.findUnique({
    where: { slug },
    include: propertyInclude,
  });

  return property ? serializeProperty(property) : null;
}
