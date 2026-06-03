"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { User, Lock, ArrowRight, ArrowLeft, Eye, EyeOff } from "lucide-react";

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

export function LoginForm() {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.85]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, remember }),
      });
      const payload = (await response.json().catch(() => null)) as { message?: string } | null;

      if (!response.ok) {
        setError(payload?.message ?? "Email atau kata sandi tidak sesuai.");
        return;
      }

      const next = new URLSearchParams(window.location.search).get("next");
      router.push(next || "/agent/dashboard");
      router.refresh();
    } catch {
      setError("Login belum berhasil. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
            "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80')",
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
            "linear-gradient(135deg, rgba(26,26,26,0.82) 0%, rgba(26,26,26,0.35) 40%, rgba(26,26,26,0.65) 100%)",
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

      {/* Login Card */}
      <motion.div
        className="relative z-10 w-full max-w-md mx-5 md:mx-auto"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Brand logo */}
        <motion.div
          variants={fadeUp}
          className="mb-8 flex justify-center"
        >
          <Image
            src="/logo/logo_prime_white.png"
            alt="Prime Property"
            width={175}
            height={70}
            className="h-10 w-auto"
            priority
          />
        </motion.div>

        {/* Gold accent line */}
        <motion.div
          className="w-12 h-0.5 bg-gold mx-auto mb-6 origin-center"
          variants={lineVariant}
        />

        {/* Uppercase label */}
        <motion.p
          className="text-center text-[11px] font-bold tracking-[0.2em] text-gold/80 uppercase mb-6"
          variants={fadeUp}
        >
          Portal Agen
        </motion.p>

        <motion.p
          className="text-center text-base text-cream/70 leading-relaxed max-w-sm mx-auto mb-8"
          variants={fadeUp}
        >
          Selamat datang kembali. Silakan masuk untuk mengelola listing properti
          Anda.
        </motion.p>

        {/* Form Card */}
        <motion.div
          className="bg-pure-white/95 backdrop-blur-md rounded-2xl border border-pure-white/40 shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.35)] p-8 transition-shadow duration-500"
          variants={fadeUp}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
            {error && (
              <div className="rounded-xl bg-calm-red/10 border border-calm-red/20 px-4 py-3 text-sm text-calm-red" role="alert">
                {error}
              </div>
            )}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-charcoal mb-1.5"
              >
                Email / Username
              </label>
              <div className="relative">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40 pointer-events-none"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="agent@primeproperty.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-pure-white border border-pebble rounded-xl pl-11 pr-4 py-3 text-sm text-charcoal placeholder:text-charcoal/35 focus:border-gold focus:ring-4 focus:ring-gold/20 focus:shadow-[0_0_0_3px_rgba(201,169,97,0.15)] outline-none transition-all duration-300"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-charcoal mb-1.5"
              >
                Kata Sandi
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40 pointer-events-none"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-pure-white border border-pebble rounded-xl pl-11 pr-20 py-3 text-sm text-charcoal placeholder:text-charcoal/35 focus:border-gold focus:ring-4 focus:ring-gold/20 focus:shadow-[0_0_0_3px_rgba(201,169,97,0.15)] outline-none transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center gap-1 text-xs font-semibold text-charcoal/55 hover:text-gold transition-colors px-2 py-1.5 rounded-lg hover:bg-cream"
                  aria-label={
                    showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                  ) : (
                    <Eye className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                  )}
                </button>
              </div>
              <div className="flex items-center justify-between mt-2.5">
                <label className="inline-flex items-center gap-2 text-xs text-charcoal/65 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="w-4 h-4 rounded border-pebble text-gold focus:ring-gold/30 accent-[#C9A961]"
                  />
                  Ingat saya
                </label>
                <Link
                  href="/agent/lupa-sandi"
                  className="text-xs font-semibold text-gold-dark hover:text-gold transition-colors"
                >
                  Lupa kata sandi?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gold hover:bg-gold-dark text-charcoal font-bold text-sm rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] min-h-[48px] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin" />
                  Memproses...
                </>
              ) : (
                <>
                  Masuk ke Dashboard
                  <ArrowRight
                    className="w-4 h-4"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6" aria-hidden="true">
            <span className="flex-1 h-px bg-pebble" />
            <span className="text-[10px] font-bold tracking-[0.2em] text-charcoal/40 uppercase">
              atau
            </span>
            <span className="flex-1 h-px bg-pebble" />
          </div>

          {/* Secondary CTA */}
          <Link
            href="/agent/daftar"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 border border-pebble hover:border-gold text-charcoal text-sm font-semibold rounded-xl transition-colors duration-300 min-h-[44px]"
          >
            Daftar sebagai Agen Baru
          </Link>
        </motion.div>

        {/* Footer links */}
        <motion.div className="mt-6 text-center" variants={fadeUp}>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-cream/55 hover:text-gold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
            Kembali ke Beranda
          </Link>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mt-6 text-center text-[11px] text-cream/65 leading-relaxed"
        >
          Dengan masuk, Anda menyetujui{" "}
          <Link href="/syarat-ketentuan" className="underline hover:text-gold">
            Syarat &amp; Ketentuan
          </Link>{" "}
          serta{" "}
          <Link href="/kebijakan-privasi" className="underline hover:text-gold">
            Kebijakan Privasi
          </Link>{" "}
          Prime Property.
        </motion.p>
      </motion.div>
    </section>
  );
}
