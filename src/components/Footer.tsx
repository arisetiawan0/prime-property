"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/tentang-kami", label: "Tentang Kami" },
  { href: "/kontak", label: "Kontak" },
];

const ease = [0.25, 0.1, 0.25, 1] as const;

export function Footer() {
  const pathname = usePathname();
  const isAuthRoute = pathname?.startsWith("/agent/");
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  if (isAuthRoute) {
    return null;
  }

  return (
    <footer ref={ref} className="bg-charcoal text-cream px-5 md:px-20 pt-20 pb-8 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
        >
          <Link href="/" aria-label="Prime Property — Beranda" className="block">
            <Image
              src="/logo/logo_prime_white.png"
              alt="Prime Property"
              width={160}
              height={64}
              className="h-10 w-auto"
            />
          </Link>
          <p className="text-base opacity-80 leading-relaxed max-w-xs">
            Menghadirkan hunian eksklusif dengan standar kenyamanan tinggi dan
            transparansi penuh untuk masa depan keluarga Anda.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.12, ease }}
        >
          <h3 className="text-xl font-bold">Tautan Cepat</h3>
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-base hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.24, ease }}
        >
          <h3 className="text-xl font-bold">Hubungi Kami</h3>
          <div className="flex flex-col gap-2">
            <a
              href="https://wa.me/628111222333"
              className="flex items-center gap-2 text-base hover:text-gold transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon solid className="w-5 h-5 shrink-0" />
              +62 811 1222 333 (WhatsApp)
            </a>
            <div className="flex items-center gap-2 text-base">
              <Mail className="w-5 h-5 shrink-0" aria-hidden="true" />
              halo@primeproperty.com
            </div>
            <div className="flex items-center gap-2 text-base">
              <Phone className="w-5 h-5 shrink-0" aria-hidden="true" />
              (021) 555-0123
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/10"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.4, ease }}
      >
        <p className="text-xs font-medium opacity-60 text-center md:text-left">
          &copy; 2026 Prime Property. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
}
