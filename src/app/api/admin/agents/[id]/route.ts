import { NextResponse } from "next/server";
import { jsonError } from "@/lib/api";
import { requireSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const agentStatusSchema = z.object({ status: z.enum(["aktif", "nonaktif"]) });

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, context: RouteContext) {
  const session = await requireSession();
  if (!session) return jsonError("Unauthorized", 401);

  const { id } = await context.params;
  const body = await request.json().catch(() => null);
  const parsed = agentStatusSchema.safeParse(body);

  if (!parsed.success) return jsonError("Status agen tidak valid.", 422);

  const agent = await prisma.agent.update({
    where: { id },
    data: { status: parsed.data.status },
  });

  return NextResponse.json({
    data: {
      id: agent.id,
      status: agent.status,
    },
  });
}
