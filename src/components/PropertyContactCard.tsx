"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, Mail, ShieldCheck } from "lucide-react";
import { type Property } from "@/data/properties";
import { formatRupiah } from "@/lib/format";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

const ease = [0.25, 0.1, 0.25, 1] as const;

interface PropertyContactCardProps {
  property: Property;
}

const WHATSAPP_NUMBER = "628111222333";
const PHONE_NUMBER = "(021) 555-0123";
const EMAIL = "halo@primeproperty.com";

function buildWhatsAppUrl(property: Property) {
  const message = encodeURIComponent(
    `Halo Prime Property, saya tertarik dengan properti "${property.name}" (${formatRupiah(property.price)}). Mohon informasi lebih lanjut.`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

export function PropertyContactCard({ property }: PropertyContactCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.aside
      ref={ref}
      className="lg:sticky lg:top-28"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, ease }}
    >
      <div className="bg-pure-white rounded-2xl border border-pebble shadow-lg overflow-hidden">
        {/* Header */}
        <div className="relative bg-charcoal p-6 overflow-hidden">
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-gold/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] text-gold uppercase mb-2">
              <span className="w-5 h-px bg-gold" />
              Konsultasi Gratis
            </span>
            <h3 className="text-xl font-bold text-cream leading-snug">
              Tertarik dengan properti ini?
            </h3>
            <p className="text-sm text-cream/70 mt-1.5 leading-relaxed">
              Tim kami siap membantu Anda 24/7 dengan respons cepat.
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-3">
          {/* WhatsApp — primary CTA */}
          <a
            href={buildWhatsAppUrl(property)}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-gold hover:bg-gold-dark text-charcoal font-bold rounded-xl transition-colors duration-300 shadow-md hover:shadow-lg min-h-[48px]"
          >
            <WhatsAppIcon solid className="w-5 h-5" />
            Hubungi via WhatsApp
          </a>

          {/* Phone */}
          <a
            href={`tel:${PHONE_NUMBER.replace(/[^0-9+]/g, "")}`}
            className="group flex items-center gap-3 w-full px-4 py-3 bg-cream hover:bg-pebble border border-pebble rounded-xl transition-colors duration-300 min-h-[48px]"
          >
            <span className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
              <Phone
                className="w-4 h-4 text-gold-dark"
                strokeWidth={2}
                aria-hidden="true"
              />
            </span>
            <div className="text-left">
              <span className="block text-[10px] font-semibold tracking-widest text-charcoal/50 uppercase">
                Telepon
              </span>
              <span className="text-sm font-semibold text-charcoal">
                {PHONE_NUMBER}
              </span>
            </div>
          </a>

          {/* Email */}
          <a
            href={`mailto:${EMAIL}?subject=${encodeURIComponent(
              `Konsultasi ${property.name}`
            )}`}
            className="group flex items-center gap-3 w-full px-4 py-3 bg-cream hover:bg-pebble border border-pebble rounded-xl transition-colors duration-300 min-h-[48px]"
          >
            <span className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
              <Mail
                className="w-4 h-4 text-gold-dark"
                strokeWidth={2}
                aria-hidden="true"
              />
            </span>
            <div className="text-left min-w-0">
              <span className="block text-[10px] font-semibold tracking-widest text-charcoal/50 uppercase">
                Email
              </span>
              <span className="text-sm font-semibold text-charcoal truncate block">
                {EMAIL}
              </span>
            </div>
          </a>

          {/* Trust badge */}
          <div className="flex items-start gap-2.5 pt-3 mt-1 border-t border-pebble">
            <ShieldCheck
              className="w-4 h-4 text-gold shrink-0 mt-0.5"
              strokeWidth={2}
              aria-hidden="true"
            />
            <p className="text-xs text-charcoal/60 leading-relaxed">
              Setiap konsultasi bersifat privat. Data Anda tidak akan
              dibagikan kepada pihak ketiga.
            </p>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
