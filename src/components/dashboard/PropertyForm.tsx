"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Save,
  ArrowLeft,
  Trash2,
  Plus,
  X,
  Image as ImageIcon,
  ImageOff,
} from "lucide-react";
import {
  type Property,
  type PropertyStatus,
  statusConfig,
} from "@/data/properties";
import { formatRupiah } from "@/lib/format";
import { Select } from "@/components/ui/Select";

const ease = [0.25, 0.1, 0.25, 1] as const;

const statusOptions: PropertyStatus[] = [
  "in_stock",
  "sold_out",
  "siap_huni",
  "siap_kosong",
];

const typeOptions = ["Villa", "Ruko", "Rumah", "Townhouse", "Apartemen", "Tanah"];
const certificateOptions = ["SHM", "HGB", "HP", "AJB"];

interface PropertyFormProps {
  initial?: Property;
  id?: string;
  mode: "create" | "edit";
}

export function PropertyForm({ initial, id, mode }: PropertyFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: initial?.name ?? "",
    area: initial?.area ?? "",
    address: initial?.address ?? "",
    price: initial?.price ?? 0,
    type: initial?.type ?? "Villa",
    status: initial?.status ?? ("in_stock" as PropertyStatus),
    bedrooms: initial?.bedrooms ?? 0,
    bathrooms: initial?.bathrooms ?? 0,
    areaSqm: initial?.areaSqm ?? 0,
    certificate: initial?.certificate ?? "SHM",
    yearBuilt: initial?.yearBuilt ?? new Date().getFullYear(),
    description: initial?.description ?? "",
    imageUrl: initial?.imageUrl ?? "",
    imageAlt: initial?.imageAlt ?? "",
    gallery: initial?.gallery ?? [],
  });

  const [galleryInput, setGalleryInput] = useState("");

  useEffect(() => {
    if (mode !== "edit" || initial || !id) return;
    let cancelled = false;

    async function loadProperty() {
      const response = await fetch(`/api/admin/properties/${id}`);
      if (!response.ok) return;
      const payload = (await response.json()) as { data?: Property };
      if (!payload.data || cancelled) return;
      setForm({
        name: payload.data.name,
        area: payload.data.area,
        address: payload.data.address,
        price: payload.data.price,
        type: payload.data.type,
        status: payload.data.status,
        bedrooms: payload.data.bedrooms,
        bathrooms: payload.data.bathrooms,
        areaSqm: payload.data.areaSqm,
        certificate: payload.data.certificate,
        yearBuilt: payload.data.yearBuilt,
        description: payload.data.description,
        imageUrl: payload.data.imageUrl,
        imageAlt: payload.data.imageAlt,
        gallery: payload.data.gallery,
      });
    }

    loadProperty().catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [id, initial, mode]);

  const update = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    const endpoint = mode === "create" ? "/api/admin/properties" : `/api/admin/properties/${id ?? initial?.id}`;
    const method = mode === "create" ? "POST" : "PATCH";

    try {
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        setToast("Data properti belum berhasil disimpan");
        return;
      }

      setIsSubmitting(false);
      setToast(
        mode === "create"
          ? "Properti baru berhasil ditambahkan"
          : "Perubahan berhasil disimpan"
      );
      setTimeout(() => router.push("/agent/dashboard/properti"), 1200);
    } catch {
      setToast("Data properti belum berhasil disimpan");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (mode !== "edit") return;
    setIsSubmitting(true);
    const targetId = id ?? initial?.id;
    if (!targetId) {
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`/api/admin/properties/${targetId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        setToast("Properti belum berhasil dihapus");
        return;
      }
      setToast("Properti telah dihapus");
      setTimeout(() => router.push("/agent/dashboard/properti"), 1000);
    } catch {
      setToast("Properti belum berhasil dihapus");
    } finally {
      setIsSubmitting(false);
    }
  };

  const addGalleryImage = () => {
    const url = galleryInput.trim();
    if (!url) return;
    update("gallery", [...form.gallery, url]);
    setGalleryInput("");
  };

  const removeGalleryImage = (idx: number) => {
    update(
      "gallery",
      form.gallery.filter((_, i) => i !== idx)
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-7xl">
      {/* Top action bar */}
      <div className="flex items-center justify-between gap-3">
        <Link
          href="/agent/dashboard/properti"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-charcoal/65 hover:text-charcoal transition-colors"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
          Kembali
        </Link>
        {mode === "edit" && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={isSubmitting}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-calm-red hover:bg-calm-red/10 rounded-lg transition-colors min-h-[40px] disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
            Hapus
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main fields */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="lg:col-span-2 flex flex-col gap-5"
        >
          {/* Identitas */}
          <div className="bg-pure-white rounded-2xl border border-pebble p-5 md:p-6 shadow-sm">
            <h3 className="text-base font-bold text-charcoal mb-4">
              Identitas Properti
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Nama Properti" required>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="cth: Villa Serenity"
                  className={inputClass}
                />
              </Field>
              <Field label="Tipe">
                <Select
                  value={form.type}
                  onChange={(v) => update("type", v)}
                  options={typeOptions.map((t) => ({ value: t, label: t }))}
                  variant="form"
                  ariaLabel="Tipe properti"
                />
              </Field>
              <Field label="Kawasan" required>
                <input
                  type="text"
                  required
                  value={form.area}
                  onChange={(e) => update("area", e.target.value)}
                  placeholder="cth: Kawasan Elit Selatan"
                  className={inputClass}
                />
              </Field>
              <Field label="Status">
                <Select
                  value={form.status}
                  onChange={(v) => update("status", v as PropertyStatus)}
                  options={statusOptions.map((s) => ({
                    value: s,
                    label: statusConfig[s].label,
                  }))}
                  variant="form"
                  ariaLabel="Status properti"
                />
              </Field>
              <Field label="Alamat Lengkap" full>
                <textarea
                  required
                  value={form.address}
                  onChange={(e) => update("address", e.target.value)}
                  placeholder="Jl. ..."
                  rows={2}
                  className={`${inputClass} resize-none`}
                />
              </Field>
            </div>
          </div>

          {/* Spesifikasi */}
          <div className="bg-pure-white rounded-2xl border border-pebble p-5 md:p-6 shadow-sm">
            <h3 className="text-base font-bold text-charcoal mb-4">
              Spesifikasi & Harga
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Field label="Harga (IDR)">
                <input
                  type="number"
                  min={0}
                  value={form.price || ""}
                  onChange={(e) =>
                    update("price", Number(e.target.value) || 0)
                  }
                  placeholder="0"
                  className={inputClass}
                />
                {form.price > 0 && (
                  <p className="text-[11px] text-charcoal/55 mt-1">
                    {formatRupiah(form.price)}
                  </p>
                )}
              </Field>
              <Field label="Luas (m²)">
                <input
                  type="number"
                  min={0}
                  value={form.areaSqm || ""}
                  onChange={(e) =>
                    update("areaSqm", Number(e.target.value) || 0)
                  }
                  placeholder="0"
                  className={inputClass}
                />
              </Field>
              <Field label="Tahun Dibangun">
                <input
                  type="number"
                  min={1900}
                  max={new Date().getFullYear()}
                  value={form.yearBuilt || ""}
                  onChange={(e) =>
                    update("yearBuilt", Number(e.target.value) || 0)
                  }
                  className={inputClass}
                />
              </Field>
              <Field label="Kamar Tidur">
                <input
                  type="number"
                  min={0}
                  value={form.bedrooms || ""}
                  onChange={(e) =>
                    update("bedrooms", Number(e.target.value) || 0)
                  }
                  className={inputClass}
                />
              </Field>
              <Field label="Kamar Mandi">
                <input
                  type="number"
                  min={0}
                  value={form.bathrooms || ""}
                  onChange={(e) =>
                    update("bathrooms", Number(e.target.value) || 0)
                  }
                  className={inputClass}
                />
              </Field>
              <Field label="Sertifikat">
                <Select
                  value={form.certificate}
                  onChange={(v) => update("certificate", v)}
                  options={certificateOptions.map((c) => ({ value: c, label: c }))}
                  variant="form"
                  ariaLabel="Sertifikat"
                />
              </Field>
            </div>
          </div>

          {/* Deskripsi */}
          <div className="bg-pure-white rounded-2xl border border-pebble p-5 md:p-6 shadow-sm">
            <h3 className="text-base font-bold text-charcoal mb-4">Deskripsi</h3>
            <textarea
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Ceritakan keunikan properti ini…"
              rows={6}
              className={`${inputClass} resize-none`}
            />
            <p className="text-[11px] text-charcoal/45 mt-1.5">
              {form.description.length} karakter
            </p>
          </div>

          {/* Gallery */}
          <div className="bg-pure-white rounded-2xl border border-pebble p-5 md:p-6 shadow-sm">
            <h3 className="text-base font-bold text-charcoal mb-4">Galeri</h3>
            <p className="text-xs text-charcoal/55 mb-4">
              Tambahkan URL gambar untuk galeri properti
            </p>
            <div className="flex gap-2 mb-4">
              <input
                type="url"
                value={galleryInput}
                onChange={(e) => setGalleryInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addGalleryImage();
                  }
                }}
                placeholder="https://images.unsplash.com/..."
                className={`${inputClass} flex-1`}
              />
              <button
                type="button"
                onClick={addGalleryImage}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-gold hover:bg-gold-dark text-charcoal text-sm font-bold rounded-lg transition-colors min-h-[42px] shrink-0"
              >
                <Plus className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
                Tambah
              </button>
            </div>
            {form.gallery.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center border-2 border-dashed border-pebble rounded-xl">
                <ImageOff
                  className="w-8 h-8 text-charcoal/30 mb-2"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <p className="text-xs text-charcoal/50">Belum ada gambar</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {form.gallery.map((url, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-square rounded-lg overflow-hidden bg-pebble group"
                  >
                    <Image
                      src={url}
                      alt={`Galeri ${idx + 1}`}
                      fill
                      sizes="(max-width: 640px) 50vw, 33vw"
                      className="object-cover"
                      unoptimized
                    />
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(idx)}
                      className="absolute top-1.5 right-1.5 inline-flex items-center justify-center w-7 h-7 rounded-full bg-charcoal/80 hover:bg-calm-red text-cream opacity-0 group-hover:opacity-100 transition-all"
                      aria-label={`Hapus gambar ${idx + 1}`}
                    >
                      <X className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Sidebar: image & actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.1 }}
          className="flex flex-col gap-5"
        >
          <div className="bg-pure-white rounded-2xl border border-pebble p-5 md:p-6 shadow-sm">
            <h3 className="text-base font-bold text-charcoal mb-4">
              Gambar Utama
            </h3>
            <Field label="URL Gambar" full>
              <input
                type="url"
                value={form.imageUrl}
                onChange={(e) => update("imageUrl", e.target.value)}
                placeholder="https://..."
                className={inputClass}
              />
            </Field>
            <Field label="Alt Text (Deskripsi)" full>
              <input
                type="text"
                value={form.imageAlt}
                onChange={(e) => update("imageAlt", e.target.value)}
                placeholder="cth: Villa modern dengan kolam renang"
                className={inputClass}
              />
            </Field>
            <div className="mt-4 aspect-video rounded-xl overflow-hidden bg-pebble border border-pebble flex items-center justify-center">
              {form.imageUrl ? (
                <Image
                  src={form.imageUrl}
                  alt={form.imageAlt || "Preview"}
                  width={320}
                  height={180}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              ) : (
                <div className="flex flex-col items-center text-charcoal/40">
                  <ImageIcon
                    className="w-8 h-8 mb-1"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <p className="text-[11px]">Belum ada gambar</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-pure-white rounded-2xl border border-pebble p-5 md:p-6 shadow-sm sticky top-20">
            <h3 className="text-base font-bold text-charcoal mb-1">Aksi</h3>
            <p className="text-xs text-charcoal/55 mb-4">
              Simpan perubahan atau kembali ke daftar
            </p>
            <div className="flex flex-col gap-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-gold hover:bg-gold-dark text-charcoal text-sm font-bold rounded-lg transition-colors min-h-[44px] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin" />
                    Menyimpan…
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
                    {mode === "create" ? "Simpan Properti" : "Simpan Perubahan"}
                  </>
                )}
              </button>
              <Link
                href="/agent/dashboard/properti"
                className="w-full inline-flex items-center justify-center px-4 py-3 border border-pebble hover:border-charcoal/30 text-charcoal text-sm font-semibold rounded-lg transition-colors min-h-[44px]"
              >
                Batal
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease }}
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-3 bg-charcoal text-cream text-sm font-medium rounded-xl shadow-2xl"
          role="status"
          aria-live="polite"
        >
          <span className="w-2 h-2 rounded-full bg-gold" aria-hidden="true" />
          {toast}
        </motion.div>
      )}
    </form>
  );
}

const inputClass =
  "w-full px-3 py-2.5 text-sm bg-pure-white border border-pebble rounded-lg text-charcoal placeholder:text-charcoal/35 focus:border-gold focus:ring-4 focus:ring-gold/15 outline-none transition-all";

function Field({
  label,
  required,
  full,
  children,
}: {
  label: string;
  required?: boolean;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <label className="block text-xs font-semibold text-charcoal/75 mb-1.5">
        {label}
        {required && <span className="text-calm-red ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}
