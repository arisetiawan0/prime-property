export type LeadStatus = "baru" | "dibalas" | "selesai";

export interface LeadReply {
  id: string;
  message: string;
  createdAt: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  propertyId?: string;
  status: LeadStatus;
  createdAt: string;
  repliedAt?: string;
  replies?: LeadReply[];
}

export const leadStatusConfig: Record<
  LeadStatus,
  { label: string; bgClass: string; textClass: string }
> = {
  baru: {
    label: "Baru",
    bgClass: "bg-gold/15",
    textClass: "text-gold-dark",
  },
  dibalas: {
    label: "Dibalas",
    bgClass: "bg-status-huni-bg",
    textClass: "text-status-huni-text",
  },
  selesai: {
    label: "Selesai",
    bgClass: "bg-status-stock-bg",
    textClass: "text-status-stock-text",
  },
};

export const leads: Lead[] = [
  {
    id: "lead-001",
    name: "Budi Hartono",
    email: "budi.hartono@gmail.com",
    phone: "081234567890",
    subject: "Tanya detail Villa Serenity",
    message:
      "Selamat siang, saya tertarik dengan Villa Serenity di Sentul. Apakah masih tersedia untuk viewing akhir pekan ini? Saya ingin membawa keluarga untuk melihat langsung kondisi bangunannya.",
    propertyId: "villa-serenity",
    status: "baru",
    createdAt: "2026-06-01T09:24:00+07:00",
  },
  {
    id: "lead-002",
    name: "Linda Wijaya",
    email: "linda.wijaya@yahoo.com",
    phone: "081345678901",
    subject: "Penawaran harga Residensi Harmoni",
    message:
      "Halo, untuk Residensi Harmoni di Cibubur, apakah harga 2.8M masih bisa nego? Saya berminat serius dan siap DP 30% dalam 2 minggu ke depan.",
    propertyId: "residensi-harmoni",
    status: "dibalas",
    createdAt: "2026-05-30T14:12:00+07:00",
    repliedAt: "2026-05-30T16:45:00+07:00",
  },
  {
    id: "lead-003",
    name: "Andi Pratama",
    email: "andi.pratama@outlook.com",
    phone: "081456789012",
    subject: "Konsultasi investasi properti komersial",
    message:
      "Saya ingin diskusi lebih lanjut mengenai potensi ROI untuk properti komersial di kawasan SCBD. Bisa dijadwalkan meeting di kantor Anda?",
    propertyId: "apartemen-panorama",
    status: "selesai",
    createdAt: "2026-05-28T10:30:00+07:00",
    repliedAt: "2026-05-28T13:15:00+07:00",
  },
  {
    id: "lead-004",
    name: "Sari Dewi Lestari",
    email: "sari.dewi@gmail.com",
    phone: "081567890123",
    subject: "Ketersediaan Oasis Townhouse",
    message:
      "Mohon info apakah Oasis Townhouse di Kemang masih ada unit yang ready? Saya butuh 3 kamar tidur untuk keluarga kecil.",
    propertyId: "oasis-townhouse",
    status: "baru",
    createdAt: "2026-05-31T19:50:00+07:00",
  },
  {
    id: "lead-005",
    name: "Reza Mahendra",
    email: "reza.mahendra@company.id",
    phone: "081678901234",
    subject: "Survey lokasi Ruko Bisnis Prime",
    message:
      "Saya owner bisnis F&B, ingin menjadikan lantai 2 Ruko Bisnis Prime sebagai office. Kapan bisa survey lokasi?",
    propertyId: "ruko-bisnis-prime",
    status: "dibalas",
    createdAt: "2026-05-29T08:15:00+07:00",
    repliedAt: "2026-05-29T11:00:00+07:00",
  },
  {
    id: "lead-006",
    name: "Maya Anggraini",
    email: "maya.anggraini@gmail.com",
    phone: "081789012345",
    subject: "Info sertifikat Kavling Eksklusif",
    message:
      "Untuk Kavling Eksklusif di Puncak, apakah sertifikat sudah bersih? Mohon penjelasan mengenai status legalitas dan ijin bangun.",
    propertyId: "kavling-eksklusif",
    status: "selesai",
    createdAt: "2026-05-26T15:40:00+07:00",
    repliedAt: "2026-05-27T09:20:00+07:00",
  },
  {
    id: "lead-007",
    name: "Hendro Kusuma",
    email: "hendro.kusuma@email.com",
    phone: "081890123456",
    subject: "Pertanyaan umum layanan",
    message:
      "Saya baru pertama kali melihat website Prime Property. Bisa dijelaskan singkat proses pembelian properti melalui platform ini?",
    status: "baru",
    createdAt: "2026-06-01T07:05:00+07:00",
  },
  {
    id: "lead-008",
    name: "Tantri Wulandari",
    email: "tantri.w@gmail.com",
    phone: "081901234567",
    subject: "Jadwal viewing Apartemen Panorama",
    message:
      "Halo, saya dan suami tertarik dengan Apartemen Panorama di SCBD. Kami ingin melihat unit di lantai tinggi. Apakah Sabtu depan bisa diatur?",
    propertyId: "apartemen-panorama",
    status: "dibalas",
    createdAt: "2026-05-30T11:25:00+07:00",
    repliedAt: "2026-05-30T15:00:00+07:00",
  },
];
