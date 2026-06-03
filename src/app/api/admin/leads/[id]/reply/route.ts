import { NextResponse } from "next/server";
import { jsonError } from "@/lib/api";
import { requireSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { leadReplySchema } from "@/lib/validation";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(request: Request, context: RouteContext) {
  const session = await requireSession();
  if (!session) return jsonError("Unauthorized", 401);

  const { id } = await context.params;
  const body = await request.json().catch(() => null);
  const parsed = leadReplySchema.safeParse(body);

  if (!parsed.success) return jsonError("Balasan tidak valid.", 422);

  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead) return jsonError("Lead tidak ditemukan.", 404);

  const now = new Date();

  const reply = await prisma.leadReply.create({
    data: {
      leadId: id,
      agentId: session.agentId,
      message: parsed.data.message,
    },
  });

  await prisma.lead.update({
    where: { id },
    data: { status: "dibalas", repliedAt: now },
  });

  // TODO: send reply email to lead after email provider is selected.

  return NextResponse.json({
    data: {
      id: reply.id,
      leadId: reply.leadId,
      message: reply.message,
      createdAt: reply.createdAt.toISOString(),
    },
  });
}
