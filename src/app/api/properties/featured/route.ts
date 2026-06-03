import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { propertyInclude, serializeProperty } from "@/lib/property-mapper";

export async function GET() {
  const properties = await prisma.property.findMany({
    where: { isFeatured: true },
    include: propertyInclude,
    orderBy: [{ featuredRank: "asc" }, { createdAt: "desc" }],
    take: 6,
  });

  return NextResponse.json({ data: properties.map(serializeProperty) });
}
