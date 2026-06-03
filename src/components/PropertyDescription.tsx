"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { type Property } from "@/data/properties";

const ease = [0.25, 0.1, 0.25, 1] as const;

interface PropertyDescriptionProps {
  property: Property;
}

export function PropertyDescription({ property }: PropertyDescriptionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-10 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.7, ease }}
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="w-10 h-0.5 bg-gold origin-left" />
          <span className="text-[10px] font-bold tracking-[0.25em] text-gold-dark uppercase">
            Deskripsi
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-5 tracking-tight">
          Tentang Properti Ini
        </h2>

        <p className="text-base text-charcoal/75 leading-relaxed">
          {property.description}
        </p>
      </motion.div>
    </section>
  );
}
