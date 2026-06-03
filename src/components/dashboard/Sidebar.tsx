"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Inbox,
  Users,
  LogOut,
  X,
  Menu,
  type LucideIcon,
} from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
}

const navItems: NavItem[] = [
  { href: "/agent/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/agent/dashboard/properti", label: "Properti", icon: Building2 },
  { href: "/agent/dashboard/leads", label: "Leads", icon: Inbox, badge: 4 },
  { href: "/agent/dashboard/agen", label: "Agen", icon: Users },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/agent/dashboard") {
      return pathname === "/agent/dashboard";
    }
    return pathname?.startsWith(href);
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => null);
    router.push("/agent/login");
    router.refresh();
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-30 inline-flex items-center justify-center w-11 h-11 rounded-lg bg-charcoal text-cream shadow-lg"
        aria-label="Buka menu dashboard"
      >
        <Menu className="w-5 h-5" aria-hidden="true" />
      </button>

      {open && (
        <div
          className="md:hidden fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-40"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 w-64 h-screen bg-charcoal text-cream flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
        aria-label="Navigasi dashboard"
      >
        <div className="md:hidden absolute top-4 right-4">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-cream/70 hover:text-gold hover:bg-cream/5 transition-colors"
            aria-label="Tutup menu"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <Link
          href="/"
          className="flex items-center px-6 py-6 border-b border-cream/10"
          aria-label="Prime Property — Beranda"
        >
          <Image
            src="/logo/logo_prime_white.png"
            alt="Prime Property"
            width={140}
            height={56}
            className="h-8 w-auto"
            priority
          />
        </Link>

        <div className="px-6 pt-6 pb-2">
          <p className="text-[10px] font-bold tracking-[0.2em] text-gold/80 uppercase">
            Dashboard
          </p>
        </div>

        <nav className="flex-1 px-3 overflow-y-auto" aria-label="Menu utama">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      active
                        ? "bg-cream/5 text-gold"
                        : "text-cream/70 hover:text-cream hover:bg-cream/5"
                    }`}
                  >
                    <span
                      className={`absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-r-full transition-all ${
                        active ? "bg-gold" : "bg-transparent"
                      }`}
                      aria-hidden="true"
                    />
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        active ? "text-gold" : "text-cream/60 group-hover:text-cream"
                      }`}
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    <span className="flex-1">{item.label}</span>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span
                        className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-bold ${
                          active
                            ? "bg-gold text-charcoal"
                            : "bg-gold/20 text-gold"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-cream/10 p-3">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg">
            <div
              className="w-9 h-9 rounded-full bg-gold text-charcoal flex items-center justify-center text-sm font-bold shrink-0"
              aria-hidden="true"
            >
              AP
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-cream truncate">
                Admin Prime
              </p>
              <p className="text-[11px] text-cream/50 truncate">
                admin@primeproperty.com
              </p>
            </div>
            <button
              type="button"
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-cream/50 hover:text-gold hover:bg-cream/5 transition-colors"
              aria-label="Keluar"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
