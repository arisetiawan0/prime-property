"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Mail,
  Phone,
  Edit3,
  Power,
  PowerOff,
  Building2,
  UserX,
} from "lucide-react";
import { agents as initialAgents, getInitials, type Agent } from "@/data/agents";

const ease = [0.25, 0.1, 0.25, 1] as const;

const roleBadge: Record<Agent["role"], string> = {
  "Senior Agent": "bg-gold/15 text-gold-dark",
  Agent: "bg-status-kosong-bg text-status-kosong-text",
  "Junior Agent": "bg-pebble text-charcoal/70",
};

export function AgentTable() {
  const [data, setData] = useState<Agent[]>(initialAgents);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const target = confirmId ? data.find((d) => d.id === confirmId) : null;

  useEffect(() => {
    let cancelled = false;

    async function loadAgents() {
      const response = await fetch("/api/admin/agents");
      if (!response.ok) return;
      const payload = (await response.json()) as { data?: Agent[] };
      if (!cancelled && payload.data) setData(payload.data);
    }

    loadAgents().catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  const toggleStatus = async () => {
    if (!confirmId) return;
    const a = data.find((d) => d.id === confirmId);
    if (!a) return;
    const nextStatus = a.status === "aktif" ? "nonaktif" : "aktif";
    const response = await fetch(`/api/admin/agents/${confirmId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextStatus }),
    });

    if (!response.ok) {
      setToast("Status agen belum berhasil diperbarui");
      setTimeout(() => setToast(null), 3000);
      return;
    }

    setData((prev) =>
      prev.map((d) =>
        d.id === confirmId
          ? { ...d, status: nextStatus }
          : d
      )
    );
    if (a) {
      setToast(
        a.status === "aktif"
          ? `Agen ${a.name} dinonaktifkan`
          : `Agen ${a.name} diaktifkan kembali`
      );
      setTimeout(() => setToast(null), 3000);
    }
    setConfirmId(null);
  };

  const active = data.filter((a) => a.status === "aktif").length;
  const inactive = data.filter((a) => a.status === "nonaktif").length;

  return (
    <div className="flex flex-col gap-5 max-w-7xl">
      {/* Summary row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="bg-pure-white rounded-xl border border-pebble p-4 shadow-sm">
          <p className="text-[10px] font-bold text-charcoal/55 uppercase tracking-wider mb-1">
            Total Agen
          </p>
          <p className="text-2xl font-bold text-charcoal">{data.length}</p>
        </div>
        <div className="bg-pure-white rounded-xl border border-pebble p-4 shadow-sm">
          <p className="text-[10px] font-bold text-charcoal/55 uppercase tracking-wider mb-1">
            Aktif
          </p>
          <p className="text-2xl font-bold text-emerald-600">{active}</p>
        </div>
        <div className="bg-pure-white rounded-xl border border-pebble p-4 shadow-sm col-span-2 sm:col-span-1">
          <p className="text-[10px] font-bold text-charcoal/55 uppercase tracking-wider mb-1">
            Nonaktif
          </p>
          <p className="text-2xl font-bold text-charcoal/45">{inactive}</p>
        </div>
      </div>

      <div className="bg-pure-white rounded-2xl border border-pebble shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-4 md:p-5 border-b border-pebble">
          <div>
            <h3 className="text-base font-bold text-charcoal">Daftar Agen</h3>
            <p className="text-xs text-charcoal/55 mt-0.5">
              Kelola akses dan properti yang ditangani setiap agen
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-gold hover:bg-gold-dark text-charcoal text-sm font-bold rounded-lg transition-colors min-h-[42px]"
          >
            <Plus className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
            Tambah Agen
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-cream/50 border-b border-pebble">
              <tr className="text-left">
                <th className="px-4 py-3 text-[11px] font-bold tracking-widest text-charcoal/55 uppercase">
                  Agen
                </th>
                <th className="px-4 py-3 text-[11px] font-bold tracking-widest text-charcoal/55 uppercase hidden md:table-cell">
                  Kontak
                </th>
                <th className="px-4 py-3 text-[11px] font-bold tracking-widest text-charcoal/55 uppercase">
                  Role
                </th>
                <th className="px-4 py-3 text-[11px] font-bold tracking-widest text-charcoal/55 uppercase">
                  Properti
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
              {data.map((agent, i) => (
                <motion.tr
                  key={agent.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease, delay: i * 0.04 }}
                  className="hover:bg-cream/40 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span
                        className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-cream shrink-0"
                        style={{ backgroundColor: agent.avatarColor }}
                        aria-hidden="true"
                      >
                        {getInitials(agent.name)}
                      </span>
                      <div className="min-w-0">
                        <p className="font-semibold text-charcoal truncate">
                          {agent.name}
                        </p>
                        <p className="text-[11px] text-charcoal/55 md:hidden truncate">
                          {agent.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div className="flex flex-col gap-1">
                      <span className="inline-flex items-center gap-1.5 text-charcoal/70">
                        <Mail
                          className="w-3 h-3 text-gold"
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                        <span className="text-xs truncate max-w-[200px]">
                          {agent.email}
                        </span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-charcoal/60">
                        <Phone
                          className="w-3 h-3 text-gold"
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                        <span className="text-xs">{agent.phone}</span>
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase ${roleBadge[agent.role]}`}
                    >
                      {agent.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {agent.propertyIds.length === 0 ? (
                      <span className="text-xs text-charcoal/45 italic">
                        Belum ada
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-sm font-bold text-charcoal">
                        <Building2
                          className="w-3.5 h-3.5 text-gold"
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                        {agent.propertyIds.length}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {agent.status === "aktif" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-status-stock-bg text-status-stock-text">
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-emerald-600"
                          aria-hidden="true"
                        />
                        Aktif
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-pebble text-charcoal/55">
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-charcoal/30"
                          aria-hidden="true"
                        />
                        Nonaktif
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-charcoal/55 hover:text-gold-dark hover:bg-gold/10 transition-colors"
                        aria-label={`Edit ${agent.name}`}
                      >
                        <Edit3
                          className="w-4 h-4"
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmId(agent.id)}
                        className={`inline-flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${
                          agent.status === "aktif"
                            ? "text-charcoal/55 hover:text-calm-red hover:bg-calm-red/10"
                            : "text-charcoal/55 hover:text-emerald-600 hover:bg-emerald-50"
                        }`}
                        aria-label={
                          agent.status === "aktif"
                            ? `Nonaktifkan ${agent.name}`
                            : `Aktifkan ${agent.name}`
                        }
                      >
                        {agent.status === "aktif" ? (
                          <PowerOff
                            className="w-4 h-4"
                            strokeWidth={1.75}
                            aria-hidden="true"
                          />
                        ) : (
                          <Power
                            className="w-4 h-4"
                            strokeWidth={1.75}
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {target && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setConfirmId(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25, ease }}
              className="bg-pure-white rounded-2xl border border-pebble shadow-2xl max-w-sm w-full p-6"
              onClick={(e) => e.stopPropagation()}
              role="alertdialog"
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                  target.status === "aktif"
                    ? "bg-calm-red/10 text-calm-red"
                    : "bg-emerald-50 text-emerald-600"
                }`}
              >
                {target.status === "aktif" ? (
                  <UserX
                    className="w-5 h-5"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                ) : (
                  <Power
                    className="w-5 h-5"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                )}
              </div>
              <h3 className="text-lg font-bold text-charcoal mb-1.5">
                {target.status === "aktif"
                  ? "Nonaktifkan Agen?"
                  : "Aktifkan Kembali Agen?"}
              </h3>
              <p className="text-sm text-charcoal/65 leading-relaxed mb-6">
                {target.status === "aktif"
                  ? `Agen ${target.name} tidak akan dapat mengakses dashboard sampai diaktifkan kembali.`
                  : `Agen ${target.name} akan dapat kembali mengakses dashboard.`}
              </p>
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setConfirmId(null)}
                  className="px-4 py-2 text-sm font-semibold text-charcoal/70 hover:text-charcoal hover:bg-pebble rounded-lg transition-colors min-h-[40px]"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={toggleStatus}
                  className={`px-4 py-2 text-sm font-bold text-pure-white rounded-lg transition-colors min-h-[40px] ${
                    target.status === "aktif"
                      ? "bg-calm-red hover:bg-calm-red/90"
                      : "bg-emerald-600 hover:bg-emerald-700"
                  }`}
                >
                  {target.status === "aktif" ? "Ya, Nonaktifkan" : "Ya, Aktifkan"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
