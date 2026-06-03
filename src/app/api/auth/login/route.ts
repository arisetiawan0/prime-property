import { NextResponse } from "next/server";
import { AUTH_COOKIE, createSessionToken, verifyPassword } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: "Email atau kata sandi tidak valid." }, { status: 422 });
  }

  const agent = await prisma.agent.findUnique({ where: { email: parsed.data.email } });

  if (!agent || agent.status !== "aktif") {
    return NextResponse.json({ message: "Email atau kata sandi tidak sesuai." }, { status: 401 });
  }

  const validPassword = await verifyPassword(parsed.data.password, agent.passwordHash);

  if (!validPassword) {
    return NextResponse.json({ message: "Email atau kata sandi tidak sesuai." }, { status: 401 });
  }

  const token = await createSessionToken({
    agentId: agent.id,
    email: agent.email,
    role: agent.role,
  });

  const response = NextResponse.json({
    data: {
      id: agent.id,
      name: agent.name,
      email: agent.email,
      role: agent.role,
    },
  });

  response.cookies.set(AUTH_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
