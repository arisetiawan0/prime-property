"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ease = [0.25, 0.1, 0.25, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const lineVariant = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.8, ease, delay: 0.05 } },
};

export function ContactHero() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="relative pt-32 md:pt-36 pb-8 md:pb-10 px-5 md:px-20 bg-cream overflow-hidden"
    >
      {/* Subtle dot pattern backdrop */}
      <div
        className="absolute inset-0 opacity-[0.18] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #C9A961 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />

      {/* Subtle gold corner accents */}
      <motion.div
        className="absolute top-24 left-5 md:left-20 w-12 h-12 border-t-2 border-l-2 border-gold/30 hidden md:block"
        initial={{ opacity: 0, x: -10, y: -10 }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
      />
      <motion.div
        className="absolute top-24 right-5 md:right-20 w-12 h-12 border-t-2 border-r-2 border-gold/30 hidden md:block"
        initial={{ opacity: 0, x: 10, y: -10 }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
      />

      <motion.div
        className="relative z-10 text-center max-w-3xl mx-auto"
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
      >
        <motion.div
          className="w-12 h-0.5 bg-gold mx-auto mb-6 origin-center"
          variants={lineVariant}
        />

        <motion.h1
          className="text-4xl md:text-5xl font-bold text-charcoal tracking-tight mb-4"
          variants={fadeUp}
        >
          Hubungi Kami
        </motion.h1>

        <motion.p
          className="text-base md:text-lg text-charcoal/70 leading-relaxed max-w-2xl mx-auto"
          variants={fadeUp}
        >
          Kami selalu siap mendengarkan. Silakan hubungi kami untuk
          mendiskusikan kebutuhan properti impian Anda atau menjadwalkan
          kunjungan eksklusif.
        </motion.p>
      </motion.div>
    </section>
  );
}
