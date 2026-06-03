"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Inbox,
  Send,
  Phone,
  Mail,
  CheckCircle2,
  MessageSquare,
  Building2,
  Clock,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import {
  leads as initialLeads,
  leadStatusConfig,
  type LeadStatus,
  type Lead,
  type LeadReply,
} from "@/data/leads";

interface LeadWithProperty extends Lead {
  propertyName?: string;
  propertyArea?: string;
  replies: LeadReply[];
}

const ease = [0.25, 0.1, 0.25, 1] as const;

type TabKey = "all" | LeadStatus;

const tabs: { key: TabKey; label: string }[] = [
  { key: "all", label: "Semua" },
  { key: "baru", label: "Baru" },
  { key: "dibalas", label: "Dibalas" },
  { key: "selesai", label: "Selesai" },
];

function formatRelative(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / (1000 * 60));
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffMin < 0) return "baru saja";
  if (diffMin < 60) return `${Math.max(diffMin, 1)} menit lalu`;
  if (diffHr < 24) return `${diffHr} jam lalu`;
  if (diffDay < 7) return `${diffDay} hari lalu`;
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function LeadInbox() {
  const [leads, setLeads] = useState<LeadWithProperty[]>(
    initialLeads.map((l) => ({ ...l, replies: l.replies ?? [] }))
  );
  const [tab, setTab] = useState<TabKey>("all");
  const [search, setSearch] = useState("");
  const [activeId, setActiveId] = useState<string | null>(leads[0]?.id ?? null);
  const [reply, setReply] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function loadLeads() {
    setLoading(true);
    setFetchError(null);
    try {
      const response = await fetch("/api/admin/leads");
      if (!response.ok) {
        if (response.status === 401) {
          setFetchError("Sesi login sudah berakhir. Silakan login ulang.");
        } else {
          setFetchError("Gagal mengambil data leads.");
        }
        return;
      }
      const payload = (await response.json()) as { data?: LeadWithProperty[] };
      const data = payload.data;
      if (data) {
        setLeads(data.map((l) => ({ ...l, replies: l.replies ?? [] })));
        setActiveId((prev) =>
          prev && data.find((l) => l.id === prev)
            ? prev
            : data[0]?.id ?? null
        );
      }
    } catch {
      setFetchError("Tidak dapat terhubung ke server.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLeads();
  }, []);

  const counts = useMemo(
    () => ({
      all: leads.length,
      baru: leads.filter((l) => l.status === "baru").length,
      dibalas: leads.filter((l) => l.status === "dibalas").length,
      selesai: leads.filter((l) => l.status === "selesai").length,
    }),
    [leads]
  );

  const filtered = useMemo(() => {
    return leads
      .filter((l) => (tab === "all" ? true : l.status === tab))
      .filter((l) => {
        if (!search) return true;
        const q = search.toLowerCase();
        return (
          l.name.toLowerCase().includes(q) ||
          l.subject.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q)
        );
      })
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }, [leads, tab, search]);

  const active = leads.find((l) => l.id === activeId) ?? null;
  const activeProperty = active?.propertyId ? { name: (active as LeadWithProperty).propertyName ?? active.propertyId, area: (active as LeadWithProperty).propertyArea ?? "" } : undefined;

  const handleSendReply = async () => {
    if (!active || !reply.trim()) return;
    const response = await fetch(`/api/admin/leads/${active.id}/reply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: reply }),
    });

    if (!response.ok) {
      setToast("Balasan belum berhasil dikirim");
      setTimeout(() => setToast(null), 3000);
      return;
    }

    setLeads((prev) =>
      prev.map((l) =>
        l.id === active.id
          ? {
              ...l,
              status: "dibalas",
              repliedAt: new Date().toISOString(),
              replies: [
                ...l.replies,
                {
                  id: `temp-${Date.now()}`,
                  message: reply,
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          : l
      )
    );
    setReply("");
    setToast("Balasan terkirim");
    setTimeout(() => setToast(null), 3000);
  };

  const markDone = async () => {
    if (!active) return;
    const response = await fetch(`/api/admin/leads/${active.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "selesai" }),
    });

    if (!response.ok) {
      setToast("Lead belum berhasil diperbarui");
      setTimeout(() => setToast(null), 3000);
      return;
    }

    setLeads((prev) =>
      prev.map((l) => (l.id === active.id ? { ...l, status: "selesai" } : l))
    );
    setToast("Lead ditandai selesai");
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 h-[calc(100vh-7rem)]">
      {/* List panel */}
      <div className="lg:col-span-2 bg-pure-white rounded-2xl border border-pebble shadow-sm flex flex-col overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-pebble px-4 pt-3">
          <div className="flex items-center gap-1 overflow-x-auto" role="tablist">
            {tabs.map((t) => {
              const active = tab === t.key;
              return (
                <button
                  key={t.key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTab(t.key)}
                  className={`relative inline-flex items-center gap-1.5 px-3 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors ${
                    active
                      ? "text-charcoal"
                      : "text-charcoal/50 hover:text-charcoal/80"
                  }`}
                >
                  {t.label}
                  <span
                    className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-bold ${
                      active
                        ? "bg-gold text-charcoal"
                        : "bg-pebble text-charcoal/55"
                    }`}
                  >
                    {counts[t.key]}
                  </span>
                  {active && (
                    <motion.span
                      layoutId="lead-tab"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-gold rounded-full"
                      transition={{ duration: 0.3, ease }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Loading indicator */}
        {loading && (
          <div className="h-1 bg-gold/20 w-full overflow-hidden">
            <div className="h-full bg-gold w-1/3 rounded-full animate-[loading_1.5s_ease-in-out_infinite]" />
          </div>
        )}

        {/* Error banner */}
        {fetchError && (
          <div className="mx-3 mt-3 mb-2 flex items-center gap-2 p-3 text-xs font-semibold text-calm-red bg-calm-red/10 border border-calm-red/20 rounded-lg">
            <span className="truncate">{fetchError}</span>
            <button
              type="button"
              onClick={loadLeads}
              className="ml-auto shrink-0 px-2 py-1 text-calm-red hover:bg-calm-red/10 rounded transition-colors"
            >
              Ulangi
            </button>
          </div>
        )}

        {/* Search */}
        <div className="p-3 border-b border-pebble">
          <div className="relative">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40"
              strokeWidth={1.75}
              aria-hidden="true"
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama, subjek, email…"
              className="w-full pl-10 pr-4 py-2 text-sm bg-pebble/60 border border-transparent rounded-lg text-charcoal placeholder:text-charcoal/40 focus:bg-pure-white focus:border-gold focus:ring-4 focus:ring-gold/15 outline-none transition-all"
              aria-label="Cari lead"
            />
          </div>
        </div>

        {/* Lead list */}
        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
              <Inbox
                className="w-10 h-10 text-charcoal/25 mb-3"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <p className="text-sm font-semibold text-charcoal mb-1">
                Belum ada pesan
              </p>
              <p className="text-xs text-charcoal/55">
                Pesan baru dari calon pembeli akan muncul di sini
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-pebble">
              {filtered.map((lead) => {
                const cfg = leadStatusConfig[lead.status];
                const isActive = activeId === lead.id;
                return (
                  <li key={lead.id}>
                    <button
                      type="button"
                      onClick={() => setActiveId(lead.id)}
                      className={`w-full text-left flex items-start gap-3 p-4 transition-colors ${
                        isActive
                          ? "bg-gold/5 border-l-2 border-l-gold"
                          : "hover:bg-cream/40 border-l-2 border-l-transparent"
                      }`}
                    >
                      <span
                        className="w-10 h-10 rounded-full bg-charcoal text-cream flex items-center justify-center text-xs font-bold shrink-0"
                        aria-hidden="true"
                      >
                        {getInitials(lead.name)}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <p className="text-sm font-semibold text-charcoal truncate">
                            {lead.name}
                          </p>
                          <span className="text-[10px] text-charcoal/45 shrink-0">
                            {formatRelative(lead.createdAt)}
                          </span>
                        </div>
                        <p className="text-xs font-medium text-charcoal/75 truncate mb-0.5">
                          {lead.subject}
                        </p>
                        <p className="text-[11px] text-charcoal/55 truncate mb-1.5">
                          {lead.message}
                        </p>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold tracking-widest uppercase ${cfg.bgClass} ${cfg.textClass}`}
                        >
                          {cfg.label}
                        </span>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {/* Detail panel */}
      <div className="lg:col-span-3 bg-pure-white rounded-2xl border border-pebble shadow-sm flex flex-col overflow-hidden">
        {active ? (
          <>
            <div className="px-5 md:px-6 py-4 border-b border-pebble flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <span
                  className="w-11 h-11 rounded-full bg-charcoal text-cream flex items-center justify-center text-sm font-bold shrink-0"
                  aria-hidden="true"
                >
                  {getInitials(active.name)}
                </span>
                <div className="min-w-0">
                  <h3 className="text-base font-bold text-charcoal">
                    {active.name}
                  </h3>
                  <p className="text-xs text-charcoal/55 truncate">
                    {active.subject}
                  </p>
                  <p className="text-[11px] text-charcoal/45 mt-0.5 inline-flex items-center gap-1">
                    <Clock className="w-3 h-3" strokeWidth={2} aria-hidden="true" />
                    {formatRelative(active.createdAt)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {active.status !== "selesai" && (
                  <button
                    type="button"
                    onClick={markDone}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors min-h-[36px]"
                  >
                    <CheckCircle2
                      className="w-3.5 h-3.5"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    Selesai
                  </button>
                )}
                <a
                  href={`https://wa.me/${active.phone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-charcoal/55 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                  aria-label={`Hubungi ${active.name} via WhatsApp`}
                >
                  <WhatsAppIcon solid className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${active.email}`}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-charcoal/55 hover:text-gold-dark hover:bg-gold/10 transition-colors"
                  aria-label={`Email ${active.name}`}
                >
                  <Mail className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 md:p-6 flex flex-col gap-5">
              {/* Contact info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2.5 p-3 rounded-lg bg-cream/50">
                  <Mail
                    className="w-4 h-4 text-gold-dark shrink-0"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-charcoal/50 uppercase tracking-wider">
                      Email
                    </p>
                    <p className="text-xs text-charcoal truncate">{active.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-lg bg-cream/50">
                  <Phone
                    className="w-4 h-4 text-gold-dark shrink-0"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-charcoal/50 uppercase tracking-wider">
                      Telepon
                    </p>
                    <p className="text-xs text-charcoal">{active.phone}</p>
                  </div>
                </div>
              </div>

              {/* Related property */}
              {activeProperty && (
                <div className="flex items-center gap-3 p-3 rounded-lg border border-pebble">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 text-gold-dark flex items-center justify-center shrink-0">
                    <Building2
                      className="w-5 h-5"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold text-charcoal/50 uppercase tracking-wider">
                      Properti Terkait
                    </p>
                    <p className="text-sm font-semibold text-charcoal truncate">
                      {activeProperty.name}
                    </p>
                    <p className="text-[11px] text-charcoal/55 truncate">
                      {activeProperty.area}
                    </p>
                  </div>
                </div>
              )}

              {/* Conversation thread */}
              <div>
                <p className="text-[10px] font-bold text-charcoal/50 uppercase tracking-wider mb-2">
                  Percakapan
                </p>
                <div className="space-y-3">
                  {/* Original message from lead */}
                  <div className="p-4 rounded-xl bg-cream/50 border-l-2 border-gold">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-5 h-5 rounded-full bg-charcoal text-cream flex items-center justify-center text-[8px] font-bold">
                        {getInitials(active.name)}
                      </span>
                      <span className="text-[10px] font-semibold text-charcoal/70">
                        {active.name}
                      </span>
                      <span className="text-[9px] text-charcoal/40">
                        {formatRelative(active.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-charcoal leading-relaxed">
                      {active.message}
                    </p>
                  </div>

                  {/* Replies */}
                  {(active.replies ?? []).map((r) => (
                    <div
                      key={r.id}
                      className="p-4 rounded-xl bg-gold/5 border-l-2 border-emerald-500 ml-4"
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[8px] font-bold">
                          AP
                        </span>
                        <span className="text-[10px] font-semibold text-charcoal/70">
                          Admin
                        </span>
                        <span className="text-[9px] text-charcoal/40">
                          {formatRelative(r.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm text-charcoal leading-relaxed">
                        {r.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Reply box */}
            <div className="border-t border-pebble p-4 md:p-5 bg-cream/30">
              <p className="text-[10px] font-bold text-charcoal/50 uppercase tracking-wider mb-2 inline-flex items-center gap-1.5">
                <MessageSquare className="w-3 h-3" strokeWidth={2} aria-hidden="true" />
                Balas Pesan
              </p>
              <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Tulis balasan untuk calon pembeli…"
                rows={3}
                className="w-full px-3 py-2.5 text-sm bg-pure-white border border-pebble rounded-lg text-charcoal placeholder:text-charcoal/40 focus:border-gold focus:ring-4 focus:ring-gold/15 outline-none transition-all resize-none"
              />
              <div className="flex items-center justify-between mt-2.5">
                <p className="text-[11px] text-charcoal/50">
                  Balasan akan dikirim via email
                </p>
                <button
                  type="button"
                  onClick={handleSendReply}
                  disabled={!reply.trim()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-gold hover:bg-gold-dark text-charcoal text-sm font-bold rounded-lg transition-colors min-h-[40px] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-3.5 h-3.5" strokeWidth={2.5} aria-hidden="true" />
                  Kirim Balasan
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
            <Inbox
              className="w-14 h-14 text-charcoal/20 mb-3"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <p className="text-base font-semibold text-charcoal mb-1">
              Pilih pesan untuk membaca
            </p>
            <p className="text-sm text-charcoal/55 max-w-xs">
              Detail pesan dari calon pembeli akan tampil di sini
            </p>
          </div>
        )}
      </div>

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
