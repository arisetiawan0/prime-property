import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { propertyInclude, serializeProperty } from "@/lib/property-mapper";

export async function GET() {
  const properties = await prisma.property.findMany({
    include: propertyInclude,
    orderBy: [{ featuredRank: "asc" }, { createdAt: "desc" }],
  });

  return NextResponse.json({ data: properties.map(serializeProperty) });
}
