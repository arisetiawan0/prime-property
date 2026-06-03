import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ data: null }, { status: 401 });
  }

  const agent = await prisma.agent.findUnique({
    where: { id: session.agentId },
    select: { id: true, name: true, email: true, role: true, status: true },
  });

  if (!agent || agent.status !== "aktif") {
    return NextResponse.json({ data: null }, { status: 401 });
  }

  return NextResponse.json({ data: agent });
}
