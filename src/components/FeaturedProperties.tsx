"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { properties as fallbackProperties, type Property } from "@/data/properties";
import { PropertyCard } from "./PropertyCard";

const sectionHeader = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const ease = [0.25, 0.1, 0.25, 1] as const;

export function FeaturedProperties({ initialProperties = fallbackProperties }: { initialProperties?: Property[] }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [properties, setProperties] = useState<Property[]>(initialProperties);

  useEffect(() => {
    let cancelled = false;

    async function loadFeaturedProperties() {
      const response = await fetch("/api/properties/featured");
      if (!response.ok) return;
      const payload = (await response.json()) as { data?: Property[] };
      if (!cancelled && payload.data) setProperties(payload.data);
    }

    loadFeaturedProperties().catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="properti" ref={ref} className="bg-cream px-5 md:px-20 pt-20 pb-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12 md:mb-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <motion.div
            className="max-w-2xl"
            variants={sectionHeader}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.span
              className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] text-gold-dark uppercase mb-3"
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ duration: 0.6, ease }}
            >
              <span className="w-6 h-px bg-gold" />
              Koleksi Eksklusif
            </motion.span>

            <motion.div
              className="w-10 h-0.5 bg-gold mb-5 origin-left"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            />

            <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-2 tracking-tight">
              Properti Unggulan
            </h2>
            <p className="text-base text-charcoal/70 leading-relaxed">
              Pilihan properti terbaik untuk investasi dan hunian keluarga Anda.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.6, ease, delay: 0.3 }}
          >
            <Link
              href="/properti"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-charcoal hover:text-gold-dark transition-colors duration-300"
            >
              Lihat Semua Properti
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-charcoal/20 group-hover:border-gold group-hover:bg-gold transition-all duration-300">
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" strokeWidth={2.5} />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {properties.map((property, i) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{
              duration: 0.7,
              delay: 0.12 * i,
              ease,
            }}
          >
            <PropertyCard property={property} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
