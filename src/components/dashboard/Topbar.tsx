"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Search, Bell, ChevronDown, LogOut, User, Settings } from "lucide-react";

const titleMap: { match: RegExp; title: string }[] = [
  { match: /^\/agent\/dashboard\/properti\/baru/, title: "Tambah Properti" },
  { match: /^\/agent\/dashboard\/properti\/[^/]+$/, title: "Detail Properti" },
  { match: /^\/agent\/dashboard\/properti/, title: "Manajemen Properti" },
  { match: /^\/agent\/dashboard\/leads/, title: "Inbox Leads" },
  { match: /^\/agent\/dashboard\/agen/, title: "Manajemen Agen" },
  { match: /^\/agent\/dashboard/, title: "Overview" },
];

function getPageTitle(pathname: string | null): string {
  if (!pathname) return "Dashboard";
  for (const { match, title } of titleMap) {
    if (match.test(pathname)) return title;
  }
  return "Dashboard";
}

export function Topbar() {
  const pathname = usePathname();
  const router = useRouter();
  const title = getPageTitle(pathname);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => null);
    setMenuOpen(false);
    router.push("/agent/login");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-20 bg-pure-white/90 backdrop-blur-md border-b border-pebble">
      <div className="flex items-center justify-between gap-4 px-5 md:px-8 h-16">
        <div className="flex-1 min-w-0 pl-12 md:pl-0">
          <h1 className="text-lg md:text-xl font-bold text-charcoal truncate">
            {title}
          </h1>
        </div>

        <div className="hidden md:flex flex-1 max-w-md">
          <div className="relative w-full">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40"
              strokeWidth={1.75}
              aria-hidden="true"
            />
            <input
              type="search"
              placeholder="Cari properti, leads, atau agen…"
              className="w-full pl-10 pr-4 py-2 text-sm bg-pebble/60 border border-transparent rounded-lg text-charcoal placeholder:text-charcoal/40 focus:bg-pure-white focus:border-gold focus:ring-4 focus:ring-gold/15 outline-none transition-all duration-200"
              aria-label="Cari di dashboard"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <button
            type="button"
            className="relative inline-flex items-center justify-center w-10 h-10 rounded-lg text-charcoal/60 hover:text-charcoal hover:bg-pebble transition-colors"
            aria-label="Notifikasi"
          >
            <Bell className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
            <span
              className="absolute top-2 right-2 w-2 h-2 bg-gold rounded-full"
              aria-hidden="true"
            />
          </button>

          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className="inline-flex items-center gap-2 pl-1.5 pr-2 py-1.5 rounded-lg hover:bg-pebble transition-colors"
              aria-expanded={menuOpen}
              aria-haspopup="menu"
              aria-label="Menu pengguna"
            >
              <span
                className="w-8 h-8 rounded-full bg-gold text-charcoal flex items-center justify-center text-xs font-bold"
                aria-hidden="true"
              >
                AP
              </span>
              <span className="hidden sm:flex flex-col items-start text-left">
                <span className="text-xs font-semibold text-charcoal leading-tight">
                  Admin
                </span>
                <span className="text-[10px] text-charcoal/50 leading-tight">
                  Super Admin
                </span>
              </span>
              <ChevronDown
                className={`hidden sm:block w-3.5 h-3.5 text-charcoal/50 transition-transform ${
                  menuOpen ? "rotate-180" : ""
                }`}
                strokeWidth={2}
                aria-hidden="true"
              />
            </button>

            {menuOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full mt-2 w-56 bg-pure-white rounded-xl border border-pebble shadow-2xl py-2 z-30"
              >
                <div className="px-4 py-3 border-b border-pebble">
                  <p className="text-sm font-semibold text-charcoal">
                    Admin Prime
                  </p>
                  <p className="text-xs text-charcoal/55 truncate">
                    admin@primeproperty.com
                  </p>
                </div>
                <div className="py-1">
                  <button
                    type="button"
                    role="menuitem"
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-charcoal/75 hover:bg-cream hover:text-charcoal transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    <User className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                    Profil Saya
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-charcoal/75 hover:bg-cream hover:text-charcoal transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Settings className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                    Pengaturan
                  </button>
                </div>
                <div className="border-t border-pebble pt-1">
                  <button
                    type="button"
                    role="menuitem"
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-charcoal/75 hover:bg-cream hover:text-calm-red transition-colors"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                    Keluar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
