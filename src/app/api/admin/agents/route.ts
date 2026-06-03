import { NextResponse } from "next/server";
import { jsonError } from "@/lib/api";
import { requireSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await requireSession();
  if (!session) return jsonError("Unauthorized", 401);

  const agents = await prisma.agent.findMany({
    include: { properties: { include: { property: { select: { slug: true } } } } },
    orderBy: { joinedAt: "asc" },
  });

  return NextResponse.json({
    data: agents.map((agent) => ({
      id: agent.id,
      name: agent.name,
      email: agent.email,
      phone: agent.phone,
      role: agent.role,
      status: agent.status,
      propertyIds: agent.properties.map((item) => item.property.slug),
      joinedAt: agent.joinedAt.toISOString().slice(0, 10),
      avatarColor: agent.avatarColor,
    })),
  });
}
