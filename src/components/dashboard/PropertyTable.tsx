"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Edit3,
  Trash2,
  Plus,
  MapPin,
} from "lucide-react";
import {
  properties as initialProperties,
  type Property,
  type PropertyStatus,
} from "@/data/properties";
import { StatusBadge } from "@/components/StatusBadge";
import { formatRupiah } from "@/lib/format";
import { Select } from "@/components/ui/Select";

const ease = [0.25, 0.1, 0.25, 1] as const;

const statusOptions: { value: PropertyStatus | "all"; label: string }[] = [
  { value: "all", label: "Semua Status" },
  { value: "in_stock", label: "Tersedia" },
  { value: "sold_out", label: "Terjual" },
  { value: "siap_huni", label: "Siap Huni" },
  { value: "siap_kosong", label: "Siap Kosong" },
];

const typeOptions = [
  "Semua Tipe",
  "Villa",
  "Ruko",
  "Rumah",
  "Townhouse",
  "Apartemen",
  "Tanah",
];

function ConfirmDelete({
  name,
  onCancel,
  onConfirm,
}: {
  name: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      onClick={onCancel}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25, ease }}
        className="bg-pure-white rounded-2xl border border-pebble shadow-2xl max-w-sm w-full p-6"
        onClick={(e) => e.stopPropagation()}
        role="alertdialog"
        aria-labelledby="confirm-title"
      >
        <div className="w-12 h-12 rounded-full bg-calm-red/10 text-calm-red flex items-center justify-center mb-4">
          <Trash2 className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
        </div>
        <h3
          id="confirm-title"
          className="text-lg font-bold text-charcoal mb-1.5"
        >
          Hapus Properti?
        </h3>
        <p className="text-sm text-charcoal/65 leading-relaxed mb-6">
          Tindakan ini tidak dapat dibatalkan. Properti{" "}
          <span className="font-semibold text-charcoal">{name}</span> akan dihapus
          dari daftar listing.
        </p>
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-semibold text-charcoal/70 hover:text-charcoal hover:bg-pebble rounded-lg transition-colors min-h-[40px]"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-bold text-pure-white bg-calm-red hover:bg-calm-red/90 rounded-lg transition-colors min-h-[40px]"
          >
            Ya, Hapus
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function PropertyTable() {
  const [data, setData] = useState<Property[]>(initialProperties);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<PropertyStatus | "all">("all");
  const [typeFilter, setTypeFilter] = useState("Semua Tipe");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadProperties() {
      const response = await fetch("/api/admin/properties");
      if (!response.ok) return;
      const payload = (await response.json()) as { data?: Property[] };
      if (!cancelled && payload.data) setData(payload.data);
    }

    loadProperties().catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    return data.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.area.toLowerCase().includes(search.toLowerCase());
      const matchStatus =
        statusFilter === "all" ? true : p.status === statusFilter;
      const matchType = typeFilter === "Semua Tipe" ? true : p.type === typeFilter;
      return matchSearch && matchStatus && matchType;
    });
  }, [data, search, statusFilter, typeFilter]);

  const target = deleteId ? data.find((d) => d.id === deleteId) : null;

  const handleDelete = async () => {
    if (!deleteId) return;
    const removed = data.find((d) => d.id === deleteId);
    const response = await fetch(`/api/admin/properties/${deleteId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      setToast("Properti belum berhasil dihapus");
      setTimeout(() => setToast(null), 3000);
      return;
    }

    setData((prev) => prev.filter((d) => d.id !== deleteId));
    setDeleteId(null);
    if (removed) {
      setToast(`Properti "${removed.name}" telah dihapus`);
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Toolbar */}
      <div className="bg-pure-white rounded-2xl border border-pebble p-4 md:p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="relative flex-1">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40"
              strokeWidth={1.75}
              aria-hidden="true"
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama atau kawasan…"
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-pebble/60 border border-transparent rounded-lg text-charcoal placeholder:text-charcoal/40 focus:bg-pure-white focus:border-gold focus:ring-4 focus:ring-gold/15 outline-none transition-all"
              aria-label="Cari properti"
            />
          </div>
          <div className="flex items-center gap-2">
            <Select
              value={statusFilter}
              onChange={(v) => setStatusFilter(v as PropertyStatus | "all")}
              options={statusOptions}
              variant="filter"
              className="flex-1 md:flex-initial md:w-auto"
              ariaLabel="Filter status"
              leftIcon={
                <Filter
                  className="w-4 h-4"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              }
            />
            <Select
              value={typeFilter}
              onChange={(v) => setTypeFilter(v)}
              options={typeOptions.map((t) => ({ value: t, label: t }))}
              variant="filter"
              className="flex-1 md:flex-initial"
              ariaLabel="Filter tipe"
            />
            <Link
              href="/agent/dashboard/properti/baru"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-gold hover:bg-gold-dark text-charcoal text-sm font-bold rounded-lg transition-colors min-h-[42px] shrink-0"
            >
              <Plus className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
              <span className="hidden sm:inline">Tambah</span>
            </Link>
          </div>
        </div>
        <div className="mt-3 text-xs text-charcoal/55">
          Menampilkan <span className="font-semibold text-charcoal">{filtered.length}</span> dari {data.length} properti
        </div>
      </div>

      {/* Table */}
      <div className="bg-pure-white rounded-2xl border border-pebble shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-cream/50 border-b border-pebble">
              <tr className="text-left">
                <th className="px-4 py-3 text-[11px] font-bold tracking-widest text-charcoal/55 uppercase">
                  Properti
                </th>
                <th className="px-4 py-3 text-[11px] font-bold tracking-widest text-charcoal/55 uppercase hidden md:table-cell">
                  Kawasan
                </th>
                <th className="px-4 py-3 text-[11px] font-bold tracking-widest text-charcoal/55 uppercase">
                  Tipe
                </th>
                <th className="px-4 py-3 text-[11px] font-bold tracking-widest text-charcoal/55 uppercase">
                  Harga
                </th>
                <th className="px-4 py-3 text-[11px] font-bold tracking-widest text-charcoal/55 uppercase">
                  Status
                </th>
                <th className="px-4 py-3 text-[11px] font-bold tracking-widest text-charcoal/55 uppercase text-right">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pebble">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-16 text-center">
                    <p className="text-sm font-semibold text-charcoal mb-1">
                      Tidak ada properti ditemukan
                    </p>
                    <p className="text-xs text-charcoal/55">
                      Coba ubah filter atau tambah properti baru
                    </p>
                  </td>
                </tr>
              ) : (
                filtered.map((p, i) => (
                  <motion.tr
                    key={p.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease, delay: i * 0.03 }}
                    className="hover:bg-cream/40 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-pebble shrink-0">
                          <Image
                            src={p.imageUrl}
                            alt={p.imageAlt}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-charcoal truncate max-w-[200px]">
                            {p.name}
                          </p>
                          <p className="text-[11px] text-charcoal/55 md:hidden">
                            {p.area}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="inline-flex items-center gap-1 text-charcoal/70">
                        <MapPin
                          className="w-3 h-3 text-gold"
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                        {p.area}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-medium text-charcoal/70">
                        {p.type}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-bold text-gold-dark">
                        {formatRupiah(p.price)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={p.status} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/agent/dashboard/properti/${p.id}`}
                          className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-charcoal/55 hover:text-gold-dark hover:bg-gold/10 transition-colors"
                          aria-label={`Edit ${p.name}`}
                        >
                          <Edit3 className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => setDeleteId(p.id)}
                          className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-charcoal/55 hover:text-calm-red hover:bg-calm-red/10 transition-colors"
                          aria-label={`Hapus ${p.name}`}
                        >
                          <Trash2 className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirm dialog */}
      <AnimatePresence>
        {target && (
          <ConfirmDelete
            name={target.name}
            onCancel={() => setDeleteId(null)}
            onConfirm={handleDelete}
          />
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease }}
            className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-3 bg-charcoal text-cream text-sm font-medium rounded-xl shadow-2xl"
            role="status"
            aria-live="polite"
          >
            <span className="w-2 h-2 rounded-full bg-gold" aria-hidden="true" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
