"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { X } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { href: string; label: string }[];
  currentPath: string;
}

export function MobileMenu({
  isOpen,
  onClose,
  navLinks,
  currentPath,
}: MobileMenuProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const trapFocus = useCallback(
    (e: KeyboardEvent) => {
      if (!menuRef.current) return;

      const focusable = menuRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    },
    []
  );

  useEffect(() => {
    if (!isOpen) return;

    closeRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      trapFocus(e);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose, trapFocus]);

  if (!isOpen) return null;

  return (
    <div
      id="mobile-menu"
      ref={menuRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menu navigasi"
      className="fixed inset-0 z-50 bg-charcoal/95 backdrop-blur-lg flex flex-col items-center justify-center gap-8 animate-in fade-in duration-300"
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        className="absolute top-5 right-5 w-11 h-11 flex items-center justify-center text-cream hover:text-gold transition-colors"
        aria-label="Tutup menu"
      >
        <X className="w-6 h-6" />
      </button>

      <nav className="flex flex-col items-center gap-6" aria-label="Menu mobile">
        {navLinks.map((link) => {
          const isActive = currentPath === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              aria-current={isActive ? "page" : undefined}
              className={`text-2xl font-bold transition-colors duration-200 ${
                isActive ? "text-gold" : "text-cream hover:text-gold"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

    </div>
  );
}
