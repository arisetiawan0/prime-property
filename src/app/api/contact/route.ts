import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getClientIp, jsonError } from "@/lib/api";
import { checkRateLimit } from "@/lib/rate-limit";
import { contactSchema } from "@/lib/validation";

const CONTACT_LIMIT = 3;
const CONTACT_WINDOW_MS = 60 * 60 * 1000;

const interestLabels: Record<string, string> = {
  buy: "Membeli Properti",
  sell: "Menjual Properti",
  rent: "Menyewa Properti",
  consultation: "Konsultasi Investasi",
  other: "Lainnya",
};

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Mohon periksa kembali data yang Anda isi.", issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  if (parsed.data.honeypot) {
    return NextResponse.json({ ok: true });
  }

  const ip = getClientIp(request);
  const rateLimit = await checkRateLimit(`contact:${ip}`, CONTACT_LIMIT, CONTACT_WINDOW_MS);

  if (!rateLimit.allowed) {
    return jsonError("Anda telah mengirim terlalu banyak pesan. Silakan coba lagi dalam 1 jam.", 429);
  }

  const property = parsed.data.propertyId
    ? await prisma.property.findUnique({ where: { slug: parsed.data.propertyId } })
    : null;

  const interest = parsed.data.interest || undefined;
  const subject = property
    ? `Tanya detail ${property.name}`
    : interest
      ? interestLabels[interest] ?? "Pertanyaan umum layanan"
      : "Pertanyaan umum layanan";

  const lead = await prisma.lead.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      interest,
      subject,
      message: parsed.data.message,
      propertyId: property?.id,
      status: "baru",
    },
  });

  // TODO: send notification email to Prime Property admin after email provider is selected.

  return NextResponse.json(
    {
      data: { id: lead.id },
      message: "Pesan Anda telah kami terima dengan baik. Tim kami akan menghubungi Anda dalam waktu dekat.",
    },
    { status: 201 }
  );
}
