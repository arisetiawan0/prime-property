"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BadgeCheck, Ruler, Radar } from "lucide-react";

const valueProps = [
  {
    icon: BadgeCheck,
    title: "Tanpa Clickbait",
    description:
      "Informasi lengkap, akurat, dan terbuka. Tidak ada biaya tersembunyi dalam setiap transaksi properti Anda.",
  },
  {
    icon: Ruler,
    title: "Dimensi Akurat & Fisik",
    description:
      "Setiap data properti diverifikasi langsung di lapangan. Anda mendapat informasi yang benar-benar nyata.",
  },
  {
    icon: Radar,
    title: "Status Real-Time",
    description:
      "Pantau ketersediaan properti secara langsung. Tidak ada kejutan, hanya kepastian.",
  },
];

const ease = [0.25, 0.1, 0.25, 1] as const;

export function WhyUs() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-pebble px-5 md:px-20 pt-16 pb-20">
      <motion.div
        className="max-w-4xl mx-auto text-center mb-14"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.7, ease }}
      >
        <motion.div
          className="w-10 h-0.5 bg-gold mx-auto mb-5"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-2 tracking-tight">
          Mengapa Prime Property?
        </h2>
        <p className="text-base text-charcoal/70 leading-relaxed">
          Komitmen kami untuk memberikan pengalaman pencarian properti terbaik,
          transparan, dan aman bagi Anda.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto gap-6">
        {valueProps.map((item, i) => (
          <motion.div
            key={item.title}
            className="group relative bg-pure-white p-8 rounded-2xl border border-pebble shadow-sm hover:shadow-xl hover:border-gold/30 transition-all duration-500 overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0.15 * i, ease }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
          >
            {/* Subtle corner accent */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-gold/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Editorial number */}
            <span className="relative block text-[11px] font-bold tracking-[0.25em] text-gold/70 mb-5">
              0{i + 1}
            </span>

            {/* Refined icon container */}
            <motion.div
              className="relative w-14 h-14 mb-6 rounded-2xl bg-gold/10 border border-gold/25 flex items-center justify-center group-hover:bg-gold group-hover:border-gold group-hover:shadow-lg group-hover:shadow-gold/20 transition-all duration-500"
              initial={{ scale: 0, rotate: -8 }}
              animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -8 }}
              transition={{
                duration: 0.6,
                delay: 0.15 * i + 0.1,
                type: "spring",
                stiffness: 180,
                damping: 14,
              }}
            >
              <item.icon
                className="w-7 h-7 text-gold group-hover:text-charcoal transition-colors duration-500"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </motion.div>

            {/* Title with animated underline */}
            <div className="relative mb-3">
              <h3 className="text-xl font-bold text-charcoal leading-snug">
                {item.title}
              </h3>
              <span className="absolute -bottom-1 left-0 w-6 h-px bg-gold/60 origin-left transition-all duration-500 group-hover:w-12 group-hover:bg-gold" />
            </div>

            <p className="relative text-base text-charcoal/70 leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
