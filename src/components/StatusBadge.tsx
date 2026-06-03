import { type PropertyStatus, statusConfig } from "@/data/properties";

interface StatusBadgeProps {
  status: PropertyStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-sm ${config.bgClass} ${config.textClass}`}
    >
      {config.label}
    </span>
  );
}
