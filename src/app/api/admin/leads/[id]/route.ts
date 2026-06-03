import { NextResponse } from "next/server";
import { jsonError } from "@/lib/api";
import { requireSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { leadStatusSchema } from "@/lib/validation";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, context: RouteContext) {
  const session = await requireSession();
  if (!session) return jsonError("Unauthorized", 401);

  const { id } = await context.params;
  const body = await request.json().catch(() => null);
  const parsed = leadStatusSchema.safeParse(body);

  if (!parsed.success) return jsonError("Status lead tidak valid.", 422);

  const lead = await prisma.lead.update({
    where: { id },
    data: { status: parsed.data.status },
    include: { property: { select: { slug: true } } },
  });

  return NextResponse.json({
    data: {
      ...lead,
      propertyId: lead.property?.slug,
      createdAt: lead.createdAt.toISOString(),
      repliedAt: lead.repliedAt?.toISOString(),
      property: undefined,
    },
  });
}
