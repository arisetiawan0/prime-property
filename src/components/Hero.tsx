"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { HeroCtas } from "./HeroCtas";
import { ChevronDown } from "lucide-react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const lineVariant = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const, delay: 0.1 } },
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.5, 0.85]);

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center min-h-screen overflow-hidden"
    >
      {/* Background — parallax zoom */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80)",
          y: bgY,
          scale: bgScale,
        }}
        aria-hidden="true"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
      />

      {/* Gradient overlay — reacts to scroll */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(26,26,26,0.8) 0%, rgba(26,26,26,0.3) 40%, rgba(26,26,26,0.6) 100%)",
          opacity: overlayOpacity,
        }}
      />

      {/* Decorative gold corner accents */}
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
        className="relative z-10 text-center px-5 md:px-20 max-w-4xl mx-auto"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Gold accent line above heading */}
        <motion.div
          className="w-12 h-0.5 bg-gold mx-auto mb-6 origin-center"
          variants={lineVariant}
        />

        <motion.h1
          className="text-4xl md:text-[56px] md:leading-[1.15] font-bold text-cream tracking-tight mb-4"
          variants={fadeUp}
        >
          Rumah yang Nyaman adalah Awal Cerita Indah Keluarga Anda
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-cream/80 leading-relaxed max-w-2xl mx-auto mb-8"
          variants={fadeUp}
        >
          Kami menyajikan data properti secara jujur, transparan, dan akurat.
        </motion.p>

        <motion.div variants={fadeUp}>
          <HeroCtas />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <span className="text-xs font-medium text-cream/50 tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-gold/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
