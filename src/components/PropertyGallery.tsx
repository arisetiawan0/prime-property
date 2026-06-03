"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Bed, Bath, Maximize, FileBadge, Calendar, MapPin } from "lucide-react";
import { type Property, statusConfig } from "@/data/properties";
import { formatRupiah } from "@/lib/format";

const ease = [0.25, 0.1, 0.25, 1] as const;

interface PropertyGalleryProps {
  property: Property;
}

export function PropertyGallery({ property }: PropertyGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const status = statusConfig[property.status];

  return (
    <section className="pt-24 md:pt-28 bg-cream">
      <div className="px-5 md:px-20 pb-6 md:pb-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="max-w-7xl mx-auto mb-5 text-xs text-charcoal/60"
        >
          <ol className="flex items-center gap-2 flex-wrap">
            <li>
              <Link href="/" className="hover:text-gold-dark transition-colors">
                Beranda
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href="/#properti"
                className="hover:text-gold-dark transition-colors"
              >
                Properti
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li
              className="text-charcoal font-semibold truncate"
              aria-current="page"
            >
              {property.name}
            </li>
          </ol>
        </nav>

        {/* Main hero image */}
        <div className="max-w-7xl mx-auto">
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden bg-pebble shadow-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease }}
                className="absolute inset-0"
              >
                <Image
                  src={property.gallery[activeIndex]}
                  alt={`${property.imageAlt} — foto ${activeIndex + 1}`}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 90vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>

            {/* Bottom gradient overlay for badge contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-charcoal/10 pointer-events-none" />

            {/* Top-left status badge */}
            <div className="absolute top-4 left-4 md:top-6 md:left-6">
              <span
                className={`inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-md backdrop-blur-sm ${status.bgClass} ${status.textClass}`}
              >
                {status.label}
              </span>
            </div>

            {/* Bottom-left: type label */}
            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
              <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-charcoal/70 backdrop-blur-md text-cream text-[10px] font-bold tracking-widest uppercase">
                {property.type}
              </span>
            </div>

            {/* Bottom-right: image counter */}
            <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-charcoal/70 backdrop-blur-md text-cream text-xs font-semibold">
                <span className="text-gold">{activeIndex + 1}</span>
                <span className="opacity-50">/</span>
                <span>{property.gallery.length}</span>
              </span>
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className="mt-4 md:mt-5 grid grid-cols-4 gap-3 md:gap-4">
            {property.gallery.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={`Lihat foto ${i + 1}`}
                aria-pressed={i === activeIndex}
                className={`group relative aspect-[4/3] rounded-xl overflow-hidden bg-pebble border-2 transition-all duration-300 ${
                  i === activeIndex
                    ? "border-gold shadow-md"
                    : "border-transparent hover:border-charcoal/20"
                }`}
              >
                <Image
                  src={src}
                  alt={`Thumbnail ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 25vw, 20vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div
                  className={`absolute inset-0 transition-colors duration-300 ${
                    i === activeIndex
                      ? "bg-charcoal/0"
                      : "bg-charcoal/20 group-hover:bg-charcoal/10"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Title block */}
      <div className="px-5 md:px-20 pb-10 md:pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pt-8 border-t border-pebble">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-charcoal tracking-tight mb-3">
                {property.name}
              </h1>
              <div className="flex items-center gap-2 text-charcoal/70">
                <MapPin
                  className="w-4 h-4 text-gold shrink-0"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <span className="text-sm md:text-base">{property.address}</span>
              </div>
            </div>

            <div className="md:text-right">
              <span className="block text-[10px] font-semibold tracking-widest text-charcoal/50 uppercase mb-1">
                Harga Mulai
              </span>
              <span className="text-2xl md:text-3xl font-bold text-gold-dark">
                {formatRupiah(property.price)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PropertySpecsBar({ property }: PropertyGalleryProps) {
  const items = [
    {
      icon: Bed,
      label: "Kamar Tidur",
      value: property.bedrooms > 0 ? `${property.bedrooms}` : "—",
    },
    {
      icon: Bath,
      label: "Kamar Mandi",
      value: property.bathrooms > 0 ? `${property.bathrooms}` : "—",
    },
    {
      icon: Maximize,
      label: "Luas",
      value: `${property.areaSqm} m²`,
    },
    {
      icon: FileBadge,
      label: "Sertifikat",
      value: property.certificate,
    },
    {
      icon: Calendar,
      label: "Tahun",
      value: property.yearBuilt > 0 ? String(property.yearBuilt) : "—",
    },
  ];

  return (
    <div className="bg-pure-white rounded-2xl border border-pebble shadow-sm p-5 md:p-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                <Icon
                  className="w-5 h-5 text-gold"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </div>
              <div className="min-w-0">
                <span className="block text-[10px] font-semibold tracking-widest text-charcoal/50 uppercase truncate">
                  {item.label}
                </span>
                <span className="text-sm font-bold text-charcoal">
                  {item.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
