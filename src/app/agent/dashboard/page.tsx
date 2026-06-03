"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  CheckCircle2,
  Tag,
  Inbox,
  ArrowRight,
  Plus,
  TrendingUp,
  User,
  MessageSquare,
  Edit3,
} from "lucide-react";
import { properties as initialProperties, statusConfig, type Property, type PropertyStatus } from "@/data/properties";
import { leads as initialLeads, leadStatusConfig, type Lead } from "@/data/leads";
import { formatRupiah } from "@/lib/format";
import { StatCard } from "@/components/dashboard/StatCard";

const ease = [0.25, 0.1, 0.25, 1] as const;

const statusOrder: PropertyStatus[] = [
  "in_stock",
  "siap_huni",
  "siap_kosong",
  "sold_out",
];

export default function DashboardOverview() {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [leads, setLeads] = useState<Lead[]>(initialLeads);

  useEffect(() => {
    let cancelled = false;

    async function loadDashboardData() {
      const [propertiesResponse, leadsResponse] = await Promise.all([
        fetch("/api/admin/properties"),
        fetch("/api/admin/leads"),
      ]);

      if (cancelled) return;

      if (propertiesResponse.ok) {
        const payload = (await propertiesResponse.json()) as { data?: Property[] };
        if (payload.data) setProperties(payload.data);
      }

      if (leadsResponse.ok) {
        const payload = (await leadsResponse.json()) as { data?: Lead[] };
        if (payload.data) setLeads(payload.data);
      }
    }

    loadDashboardData().catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  const totalProperties = properties.length;
  const available = properties.filter((p) => p.status === "in_stock").length;
  const sold = properties.filter((p) => p.status === "sold_out").length;
  const newLeads = leads.filter((l) => l.status === "baru").length;

  const distribution = statusOrder.map((s) => ({
    status: s,
    count: properties.filter((p) => p.status === s).length,
    config: statusConfig[s],
  }));
  const maxCount = Math.max(...distribution.map((d) => d.count), 1);

  const recentLeads = [...leads]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 4);

  const recentActivity = [
    {
      id: "act-1",
      type: "lead" as const,
      title: "Lead baru dari Budi Hartono",
      meta: "Tanya detail Villa Serenity",
      time: "2 jam lalu",
    },
    {
      id: "act-2",
      type: "property" as const,
      title: "Status Villa Serenity diperbarui",
      meta: "Diubah menjadi Siap Huni",
      time: "5 jam lalu",
    },
    {
      id: "act-3",
      type: "lead" as const,
      title: "Pesan dibalas untuk Reza Mahendra",
      meta: "Subjek: Survey lokasi Ruko Bisnis Prime",
      time: "Kemarin",
    },
    {
      id: "act-4",
      type: "property" as const,
      title: "Properti baru ditambahkan",
      meta: "Kavling Eksklusif — Bukit Permata",
      time: "2 hari lalu",
    },
    {
      id: "act-5",
      type: "agent" as const,
      title: "Agen baru bergabung",
      meta: "Dimas Prasetyo — Junior Agent",
      time: "3 hari lalu",
    },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-7xl">
      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-charcoal tracking-tight">
          Selamat datang kembali, Admin
        </h2>
        <p className="text-sm md:text-base text-charcoal/60 mt-1">
          Berikut ringkasan aktivitas Prime Property hari ini, 1 Juni 2026.
        </p>
      </motion.div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        <StatCard
          label="Total Properti"
          value={totalProperties}
          icon={Building2}
          iconBgClass="bg-gold/10"
          iconColorClass="text-gold-dark"
          trend={{ value: "+2 bulan ini", positive: true }}
          index={0}
        />
        <StatCard
          label="Tersedia"
          value={available}
          icon={CheckCircle2}
          iconBgClass="bg-emerald-50"
          iconColorClass="text-emerald-600"
          trend={{ value: "Stabil", positive: true }}
          index={1}
        />
        <StatCard
          label="Terjual"
          value={sold}
          icon={Tag}
          iconBgClass="bg-rose-50"
          iconColorClass="text-calm-red"
          trend={{ value: "+1 minggu ini", positive: true }}
          index={2}
        />
        <StatCard
          label="Leads Baru"
          value={newLeads}
          icon={Inbox}
          iconBgClass="bg-amber-50"
          iconColorClass="text-amber-600"
          trend={{ value: "Butuh balasan", positive: false }}
          index={3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.3 }}
          className="lg:col-span-2 bg-pure-white rounded-2xl border border-pebble p-5 md:p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base md:text-lg font-bold text-charcoal">
                Distribusi Status Properti
              </h3>
              <p className="text-xs text-charcoal/55 mt-0.5">
                Jumlah listing per status
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-charcoal/55">
              <TrendingUp className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
              Update real-time
            </span>
          </div>
          <div className="flex flex-col gap-4">
            {distribution.map((d) => {
              const pct = Math.round((d.count / maxCount) * 100);
              return (
                <div key={d.status}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase ${d.config.bgClass} ${d.config.textClass}`}
                    >
                      {d.config.label}
                    </span>
                    <span className="text-sm font-bold text-charcoal">
                      {d.count} <span className="text-charcoal/40 font-medium">properti</span>
                    </span>
                  </div>
                  <div className="h-2 bg-pebble rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gold rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, ease, delay: 0.4 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Quick actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.4 }}
          className="bg-pure-white rounded-2xl border border-pebble p-5 md:p-6 shadow-sm"
        >
          <h3 className="text-base md:text-lg font-bold text-charcoal mb-1">
            Aksi Cepat
          </h3>
          <p className="text-xs text-charcoal/55 mb-5">
            Pintasan ke aktivitas umum
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href="/agent/dashboard/properti/baru"
              className="group flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-gold hover:bg-gold-dark text-charcoal font-semibold text-sm transition-colors duration-200"
            >
              <span className="inline-flex items-center gap-2.5">
                <Plus className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
                Tambah Properti
              </span>
              <ArrowRight
                className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                strokeWidth={2}
                aria-hidden="true"
              />
            </Link>
            <Link
              href="/agent/dashboard/leads"
              className="group flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-pebble hover:border-gold text-charcoal font-semibold text-sm transition-colors duration-200"
            >
              <span className="inline-flex items-center gap-2.5">
                <Inbox className="w-4 h-4 text-gold-dark" strokeWidth={1.75} aria-hidden="true" />
                Lihat Semua Leads
              </span>
              <ArrowRight
                className="w-4 h-4 text-charcoal/40 group-hover:text-gold group-hover:translate-x-0.5 transition-all"
                strokeWidth={2}
                aria-hidden="true"
              />
            </Link>
            <Link
              href="/agent/dashboard/agen"
              className="group flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-pebble hover:border-gold text-charcoal font-semibold text-sm transition-colors duration-200"
            >
              <span className="inline-flex items-center gap-2.5">
                <User className="w-4 h-4 text-gold-dark" strokeWidth={1.75} aria-hidden="true" />
                Kelola Agen
              </span>
              <ArrowRight
                className="w-4 h-4 text-charcoal/40 group-hover:text-gold group-hover:translate-x-0.5 transition-all"
                strokeWidth={2}
                aria-hidden="true"
              />
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Recent leads */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.5 }}
          className="bg-pure-white rounded-2xl border border-pebble shadow-sm overflow-hidden"
        >
          <div className="flex items-center justify-between p-5 md:p-6 border-b border-pebble">
            <div>
              <h3 className="text-base md:text-lg font-bold text-charcoal">
                Leads Terbaru
              </h3>
              <p className="text-xs text-charcoal/55 mt-0.5">
                Pesan masuk yang perlu ditindaklanjuti
              </p>
            </div>
            <Link
              href="/agent/dashboard/leads"
              className="inline-flex items-center gap-1 text-xs font-semibold text-gold-dark hover:text-gold transition-colors"
            >
              Lihat semua
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} aria-hidden="true" />
            </Link>
          </div>
          <ul className="divide-y divide-pebble">
            {recentLeads.map((lead) => {
              const cfg = leadStatusConfig[lead.status];
              const initials = lead.name
                .split(" ")
                .map((p) => p[0])
                .slice(0, 2)
                .join("");
              return (
                <li key={lead.id}>
                  <Link
                    href="/agent/dashboard/leads"
                    className="flex items-start gap-3 p-4 hover:bg-cream/60 transition-colors"
                  >
                    <span
                      className="w-9 h-9 rounded-full bg-gold/15 text-gold-dark flex items-center justify-center text-xs font-bold shrink-0"
                      aria-hidden="true"
                    >
                      {initials}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold text-charcoal truncate">
                          {lead.name}
                        </p>
                        <span
                          className={`shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold tracking-widest uppercase ${cfg.bgClass} ${cfg.textClass}`}
                        >
                          {cfg.label}
                        </span>
                      </div>
                      <p className="text-xs text-charcoal/60 mt-0.5 truncate">
                        {lead.subject}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </motion.div>

        {/* Recent activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.6 }}
          className="bg-pure-white rounded-2xl border border-pebble shadow-sm overflow-hidden"
        >
          <div className="p-5 md:p-6 border-b border-pebble">
            <h3 className="text-base md:text-lg font-bold text-charcoal">
              Aktivitas Terbaru
            </h3>
            <p className="text-xs text-charcoal/55 mt-0.5">
              Riwayat perubahan sistem 7 hari terakhir
            </p>
          </div>
          <ul className="p-5 md:p-6 flex flex-col gap-4">
            {recentActivity.map((act) => {
              const Icon =
                act.type === "lead"
                  ? MessageSquare
                  : act.type === "property"
                  ? Edit3
                  : User;
              return (
                <li key={act.id} className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-lg bg-gold/10 text-gold-dark flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-charcoal">
                      {act.title}
                    </p>
                    <p className="text-xs text-charcoal/55 mt-0.5">{act.meta}</p>
                  </div>
                  <span className="text-[11px] text-charcoal/45 shrink-0 mt-0.5">
                    {act.time}
                  </span>
                </li>
              );
            })}
          </ul>
        </motion.div>
      </div>

      {/* Top property highlight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease, delay: 0.7 }}
        className="bg-pure-white rounded-2xl border border-pebble shadow-sm p-5 md:p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base md:text-lg font-bold text-charcoal">
            Listing dengan Nilai Tertinggi
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...properties]
            .sort((a, b) => b.price - a.price)
            .slice(0, 3)
            .map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-3 p-3 rounded-xl border border-pebble"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-charcoal truncate">
                    {p.name}
                  </p>
                  <p className="text-[11px] text-charcoal/55 truncate">
                    {p.area}
                  </p>
                  <p className="text-sm font-bold text-gold-dark mt-1">
                    {formatRupiah(p.price)}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </motion.div>
    </div>
  );
}
