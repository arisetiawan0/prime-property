"use client";

import { useMemo, useState, useRef } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import { type Property } from "@/data/properties";
import { PropertyCard } from "./PropertyCard";

const ease = [0.25, 0.1, 0.25, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.25 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const lineVariant = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.8, ease, delay: 0.1 } },
};

interface PropertyListingProps {
  properties: Property[];
}

export function PropertyListing({ properties }: PropertyListingProps) {
  const types = useMemo(() => {
    const set = new Set<string>(["Semua"]);
    properties.forEach((p) => set.add(p.type));
    return Array.from(set);
  }, [properties]);

  const [activeType, setActiveType] = useState("Semua");

  const filtered = useMemo(() => {
    if (activeType === "Semua") return properties;
    return properties.filter((p) => p.type === activeType);
  }, [activeType, properties]);

  return (
    <>
      <ListingHero total={properties.length} />
      <FilterBar
        types={types}
        activeType={activeType}
        onChange={setActiveType}
        count={filtered.length}
      />
      <ListingGrid properties={filtered} />
    </>
  );
}

/* ── Hero ── */
function ListingHero({ total }: { total: number }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.8]);

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center min-h-[50vh] md:min-h-[55vh] overflow-hidden"
    >
      {/* Background parallax */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80')",
          y: bgY,
          scale: bgScale,
        }}
        aria-hidden="true"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease }}
      />

      {/* Gradient overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(26,26,26,0.8) 0%, rgba(26,26,26,0.4) 40%, rgba(26,26,26,0.7) 100%)",
          opacity: overlayOpacity,
        }}
      />

      {/* Gold corner accents */}
      <motion.div
        className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-gold/40 hidden md:block"
        initial={{ opacity: 0, x: -20, y: -20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
      />
      <motion.div
        className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-gold/40 hidden md:block"
        initial={{ opacity: 0, x: 20, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-5 md:px-20 max-w-4xl mx-auto pt-20"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div
          className="w-12 h-0.5 bg-gold mx-auto mb-6 origin-center"
          variants={lineVariant}
        />

        <motion.h1
          className="text-4xl md:text-[56px] md:leading-[1.15] font-bold text-cream tracking-tight mb-4"
          variants={fadeUp}
        >
          Koleksi Properti
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-cream/80 leading-relaxed max-w-2xl mx-auto"
          variants={fadeUp}
        >
          {total} pilihan properti premium yang dikurasi khusus untuk Anda.
        </motion.p>
      </motion.div>
    </section>
  );
}

/* ── Filter ── */
interface FilterBarProps {
  types: string[];
  activeType: string;
  onChange: (type: string) => void;
  count: number;
}

function FilterBar({ types, activeType, onChange, count }: FilterBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="bg-cream px-5 md:px-20 pt-12 pb-6 sticky top-16 md:top-20 z-30 border-b border-pebble">
      <div
        ref={ref}
        className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <motion.div
          className="flex items-center gap-2.5"
          initial={{ opacity: 0, x: -10 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
          transition={{ duration: 0.6, ease }}
        >
          <SlidersHorizontal
            className="w-4 h-4 text-gold"
            strokeWidth={2}
            aria-hidden="true"
          />
          <span className="text-[11px] font-bold tracking-[0.2em] text-charcoal/70 uppercase">
            Filter
          </span>
          <span className="text-xs text-charcoal/50">
            · {count} {count === 1 ? "properti" : "properti"}
          </span>
        </motion.div>

        <motion.div
          className="flex items-center gap-2 overflow-x-auto -mx-5 px-5 md:mx-0 md:px-0 md:flex-wrap scrollbar-hide"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          role="tablist"
          aria-label="Filter tipe properti"
        >
          {types.map((type) => {
            const isActive = activeType === type;
            return (
              <button
                key={type}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onChange(type)}
                className={`relative shrink-0 px-4 py-2 text-xs font-semibold rounded-full border transition-all duration-300 ${
                  isActive
                    ? "bg-gold border-gold text-charcoal shadow-md"
                    : "bg-pure-white border-pebble text-charcoal/70 hover:border-gold/50 hover:text-charcoal"
                }`}
              >
                {type}
              </button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Grid ── */
function ListingGrid({ properties }: { properties: Property[] }) {
  const ref = useRef<HTMLElement>(null);

  return (
    <section ref={ref} className="bg-cream px-5 md:px-20 pt-8 pb-20">
      <AnimatePresence mode="wait">
        <motion.div
          key={properties.map((p) => p.id).join("-")}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {properties.map((property, i) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.06 * i,
                ease,
              }}
            >
              <PropertyCard property={property} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {properties.length === 0 && (
        <div className="max-w-7xl mx-auto text-center py-20">
          <p className="text-charcoal/60 text-base">
            Tidak ada properti untuk tipe ini.
          </p>
        </div>
      )}
    </section>
  );
}
