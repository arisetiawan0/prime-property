"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

const ease = [0.25, 0.1, 0.25, 1] as const;

interface StatCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  iconBgClass?: string;
  iconColorClass?: string;
  trend?: { value: string; positive?: boolean };
  index?: number;
}

export function StatCard({
  label,
  value,
  icon: Icon,
  iconBgClass = "bg-gold/10",
  iconColorClass = "text-gold-dark",
  trend,
  index = 0,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease, delay: index * 0.08 }}
      className="group bg-pure-white rounded-2xl border border-pebble p-5 md:p-6 shadow-sm hover:shadow-xl hover:border-gold/30 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-11 h-11 rounded-xl ${iconBgClass} ${iconColorClass} flex items-center justify-center`}
        >
          <Icon className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
        </div>
        {trend && (
          <span
            className={`inline-flex items-center gap-0.5 text-[11px] font-bold ${
              trend.positive ? "text-emerald-600" : "text-calm-red"
            }`}
          >
            <ArrowUpRight
              className={`w-3 h-3 ${trend.positive ? "" : "rotate-90"}`}
              strokeWidth={2.5}
              aria-hidden="true"
            />
            {trend.value}
          </span>
        )}
      </div>
      <p className="text-xs font-semibold text-charcoal/55 uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className="text-2xl md:text-3xl font-bold text-charcoal leading-none">
        {value}
      </p>
    </motion.div>
  );
}
