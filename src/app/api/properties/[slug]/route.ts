import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jsonError } from "@/lib/api";
import { propertyInclude, serializeProperty } from "@/lib/property-mapper";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const property = await prisma.property.findUnique({
    where: { slug },
    include: propertyInclude,
  });

  if (!property) return jsonError("Properti tidak ditemukan.", 404);

  return NextResponse.json({ data: serializeProperty(property) });
}
