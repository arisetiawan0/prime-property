import { z } from "zod";

const phoneRegex = /^[0-9+()\-\s]{10,20}$/;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Nama minimal 2 karakter.").max(120),
  email: z.string().trim().email("Mohon masukkan alamat email yang valid.").max(160),
  phone: z.string().trim().regex(phoneRegex, "Nomor HP minimal 10 digit."),
  interest: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Pesan minimal 10 karakter.").max(4000),
  propertyId: z.string().trim().optional().or(z.literal("")),
  honeypot: z.string().optional().default(""),
});

export const loginSchema = z.object({
  email: z.string().trim().email("Email tidak valid."),
  password: z.string().min(1, "Kata sandi wajib diisi."),
});

export const propertySchema = z.object({
  name: z.string().trim().min(2).max(160),
  area: z.string().trim().min(2).max(160),
  address: z.string().trim().min(5).max(1000),
  price: z.coerce.number().nonnegative(),
  type: z.string().trim().min(2).max(80),
  status: z.enum(["in_stock", "sold_out", "siap_huni", "siap_kosong"]),
  bedrooms: z.coerce.number().int().nonnegative(),
  bathrooms: z.coerce.number().int().nonnegative(),
  areaSqm: z.coerce.number().int().nonnegative(),
  certificate: z.string().trim().min(2).max(40),
  yearBuilt: z.coerce.number().int().nonnegative(),
  description: z.string().trim().max(6000).default(""),
  imageUrl: z.string().trim().url().or(z.literal("")),
  imageAlt: z.string().trim().max(240).default(""),
  gallery: z.array(z.string().trim().url()).default([]),
  isFeatured: z.boolean().optional(),
  featuredRank: z.coerce.number().int().nonnegative().optional(),
});

export const leadStatusSchema = z.object({
  status: z.enum(["baru", "dibalas", "selesai"]),
});

export const leadReplySchema = z.object({
  message: z.string().trim().min(2).max(4000),
});
