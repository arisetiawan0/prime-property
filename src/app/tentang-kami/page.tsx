"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { ShieldCheck, Sparkles, HandHeart, ChevronDown } from "lucide-react";

const ease = [0.25, 0.1, 0.25, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const lineVariant = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.8, ease, delay: 0.1 } },
};

const companyValues = [
  {
    icon: ShieldCheck,
    title: "Integritas Tanpa Kompromi",
    description:
      "Kejujuran mutlak dalam penyajian data dan interaksi, membangun kepercayaan yang kokoh.",
  },
  {
    icon: Sparkles,
    title: "Inovasi yang Membumi",
    description:
      "Teknologi mutakhir yang dirancang untuk kenyamanan manusia, meminimalkan beban kognitif dalam mencari hunian.",
  },
  {
    icon: HandHeart,
    title: "Dedikasi Personal",
    description:
      "Layanan yang tulus dan responsif, memperlakukan setiap perjalanan pencarian properti Anda secara istimewa.",
  },
];

const missionItems = [
  "Menyajikan kurasi properti eksklusif yang memenuhi standar tertinggi kualitas dan desain.",
  "Memberikan informasi yang transparan, akurat, dan mudah dipahami untuk meminimalkan beban kognitif klien.",
  "Membangun hubungan jangka panjang yang didasari pada kepercayaan dan integritas profesional.",
  "Menghadirkan layanan pelanggan yang responsif dan personal di setiap tahap perjalanan klien.",
];

export default function TentangKamiPage() {
  return (
    <>
      <AboutHero />
      <ProfilSection />
      <VisiMisiSection />
      <NilaiPerusahaanSection />
    </>
  );
}

/* ── Hero (matches landing Hero.tsx) ── */
function AboutHero() {
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
      className="relative flex items-center justify-center min-h-[70vh] md:min-h-screen overflow-hidden"
    >
      {/* Background — parallax zoom */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80')",
          y: bgY,
          scale: bgScale,
        }}
        aria-hidden="true"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease }}
      />

      {/* Gradient overlay — reacts to scroll */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(26,26,26,0.85) 0%, rgba(26,26,26,0.4) 40%, rgba(26,26,26,0.7) 100%)",
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
        <motion.div
          className="w-12 h-0.5 bg-gold mx-auto mb-6 origin-center"
          variants={lineVariant}
        />

        <motion.h1
          className="text-4xl md:text-[56px] md:leading-[1.15] font-bold text-cream tracking-tight mb-4"
          variants={fadeUp}
        >
          Tentang Kami
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-cream/80 leading-relaxed max-w-2xl mx-auto"
          variants={fadeUp}
        >
          Membangun kepercayaan dan kenyamanan dalam setiap langkah investasi
          properti Anda.
        </motion.p>
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

/* ── Profil (matches FeaturedProperties header style) ── */
function ProfilSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-cream px-5 md:px-20 py-20">
      <motion.div
        className="text-center mb-12"
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
        <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-2">
          Profil Prime Property
        </h2>
        <p className="text-base text-charcoal/70 leading-relaxed max-w-2xl mx-auto">
          Mitra tepercaya Anda dalam menemukan properti premium yang bermakna.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center max-w-7xl mx-auto">
        <motion.div
          className="col-span-1 md:col-span-7"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease }}
        >
          <div className="space-y-4 text-charcoal/70 leading-relaxed text-base">
            <p>
              Prime Property lahir dari pemahaman mendalam akan kebutuhan akan
              hunian mewah yang tidak hanya menawarkan estetika, tetapi juga
              kedamaian batin. Kami percaya bahwa setiap properti bukan sekadar
              bangunan, melainkan ruang sanctuary yang mendukung well-being
              penghuninya.
            </p>
            <p>
              Pendekatan kami tidak hanya tercermin dalam platform digital,
              tetapi juga dalam cara kami merancang dan menyajikan setiap
              properti. Kami menghindari informasi yang berlebihan dan
              memprioritaskan transparansi, memastikan Anda dapat mengambil
              keputusan penting dengan pikiran yang tenang dan jernih.
            </p>
            <p>
              Komitmen kami adalah memberikan pengalaman pencarian properti yang
              elegan, minim distorsi, dan berpusat pada kenyamanan emosional
              klien kami, memposisikan kami sebagai mitra tepercaya di kelas
              premium.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="col-span-1 md:col-span-5"
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease }}
        >
          <div className="relative rounded-xl overflow-hidden aspect-[4/5] md:aspect-square">
            <Image
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80"
              alt="Interior rumah modern elegan dengan pencahayaan hangat dan material alami"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 42vw"
            />
            <div className="absolute inset-0 bg-charcoal/10" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Visi & Misi ── */
function VisiMisiSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-pure-white px-5 md:px-20 py-20">
      <motion.div
        className="max-w-4xl mx-auto text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease }}
      >
        <motion.div
          className="w-10 h-0.5 bg-gold mx-auto mb-5"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-4">
          Visi & Misi
        </h2>
        <p className="text-lg md:text-xl text-gold italic leading-snug max-w-3xl mx-auto">
          &ldquo;Menjadi pionir dalam menyediakan properti premium yang
          mengutamakan kedamaian mental dan transparansi, menciptakan sanctuary
          bagi setiap individu.&rdquo;
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 max-w-5xl mx-auto">
        <motion.div
          className="bg-cream p-8 rounded-xl border border-pebble"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease }}
        >
          <h3 className="text-xl font-bold text-charcoal mb-4 pb-2 border-b border-pebble inline-block">
            Misi Kami
          </h3>
          <ul className="mt-4 space-y-5">
            {missionItems.map((item) => (
              <li key={item} className="group flex items-baseline gap-4">
                <span className="h-px w-6 bg-gold shrink-0 mt-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                <p className="text-charcoal/70 leading-relaxed text-base">
                  {item}
                </p>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="hidden md:block rounded-xl overflow-hidden relative group"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25, ease }}
        >
          <Image
            src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80"
            alt="Detail arsitektur kantor modern dengan pencahayaan hangat"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 42vw"
          />
          <div className="absolute inset-0 bg-charcoal/5" />
        </motion.div>
      </div>
    </section>
  );
}

/* ── Nilai Perusahaan (matches WhyUs.tsx pattern) ── */
function NilaiPerusahaanSection() {
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
          Nilai Perusahaan
        </h2>
        <p className="text-base text-charcoal/70 leading-relaxed max-w-2xl mx-auto">
          Pondasi yang membimbing setiap interaksi dan keputusan kami.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto gap-6">
        {companyValues.map((value, i) => (
          <motion.div
            key={value.title}
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
              <value.icon
                className="w-7 h-7 text-gold group-hover:text-charcoal transition-colors duration-500"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </motion.div>

            {/* Title with animated underline */}
            <div className="relative mb-3">
              <h3 className="text-xl font-bold text-charcoal leading-snug">
                {value.title}
              </h3>
              <span className="absolute -bottom-1 left-0 w-6 h-px bg-gold/60 origin-left transition-all duration-500 group-hover:w-12 group-hover:bg-gold" />
            </div>

            <p className="relative text-base text-charcoal/70 leading-relaxed">
              {value.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
