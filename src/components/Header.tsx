"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { MobileMenu } from "./MobileMenu";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/tentang-kami", label: "Tentang Kami" },
  { href: "/kontak", label: "Kontak" },
];

export function Header() {
  const pathname = usePathname();
  const isAuthRoute = pathname?.startsWith("/agent/");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  if (isAuthRoute) {
    return null;
  }

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-40 transition-colors duration-300 ${
          isScrolled
            ? "bg-charcoal/90 backdrop-blur-xl border-b border-gold/20"
            : "bg-charcoal/60 backdrop-blur-xl border-b border-gold/20"
        }`}
        role="navigation"
        aria-label="Navigasi utama"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-5 md:px-20 py-4">
          <Link
            href="/"
            className="flex items-center"
            aria-label="Prime Property — Beranda"
          >
            <Image
              src="/logo/logo_prime_white.png"
              alt="Prime Property"
              width={140}
              height={56}
              className="h-8 md:h-9 w-auto"
              priority
            />
          </Link>

          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`text-sm font-semibold pb-1 border-b-2 transition-colors duration-200 ${
                    isActive
                      ? "text-gold border-gold"
                      : "text-cream border-transparent hover:text-gold hover:border-gold/50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/agent/login"
              className="hidden sm:inline-flex items-center px-4 py-2 border border-gold text-gold text-sm font-semibold rounded hover:bg-gold hover:text-charcoal transition-colors duration-300 min-h-[44px]"
            >
              Login Agent
            </Link>
            <button
              type="button"
              className="md:hidden flex items-center justify-center w-11 h-11 text-cream hover:text-gold transition-colors"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Buka menu navigasi"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navLinks={navLinks}
        currentPath={pathname}
      />
    </>
  );
}
