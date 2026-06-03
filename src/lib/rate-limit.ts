import { prisma } from "@/lib/prisma";

export async function checkRateLimit(key: string, limit: number, windowMs: number) {
  const now = new Date();
  const existing = await prisma.rateLimit.findUnique({ where: { key } });

  if (!existing || existing.expiresAt <= now) {
    await prisma.rateLimit.upsert({
      where: { key },
      create: {
        key,
        count: 1,
        expiresAt: new Date(now.getTime() + windowMs),
      },
      update: {
        count: 1,
        expiresAt: new Date(now.getTime() + windowMs),
      },
    });
    return { allowed: true, remaining: limit - 1 };
  }

  if (existing.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  const updated = await prisma.rateLimit.update({
    where: { key },
    data: { count: { increment: 1 } },
  });

  return { allowed: true, remaining: Math.max(limit - updated.count, 0) };
}
