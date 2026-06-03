import { NextResponse } from "next/server";
import { jsonError } from "@/lib/api";
import { requireSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function serializeLead(lead: Awaited<ReturnType<typeof getLeads>>[number]) {
  return {
    id: lead.id,
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    subject: lead.subject,
    interest: lead.interest,
    message: lead.message,
    propertyId: lead.property?.slug,
    propertyName: lead.property?.name,
    propertyArea: lead.property?.area,
    status: lead.status,
    createdAt: lead.createdAt.toISOString(),
    repliedAt: lead.repliedAt?.toISOString(),
    replies: (lead.replies ?? []).map((r) => ({
      id: r.id,
      message: r.message,
      createdAt: r.createdAt.toISOString(),
    })),
  };
}

function getLeads() {
  return prisma.lead.findMany({
    include: {
      property: { select: { slug: true, name: true, area: true } },
      replies: { orderBy: { createdAt: "asc" } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function GET() {
  const session = await requireSession();
  if (!session) return jsonError("Unauthorized", 401);

  const leads = await getLeads();
  return NextResponse.json({ data: leads.map(serializeLead) });
}
