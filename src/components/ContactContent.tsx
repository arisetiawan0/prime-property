"use client";

import { useState, type FormEvent } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
} from "lucide-react";
import { Select } from "@/components/ui/Select";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

const ease = [0.25, 0.1, 0.25, 1] as const;

const WHATSAPP_NUMBER = "628111222333";
const PHONE_DISPLAY = "(021) 555-0123";
const EMAIL = "halo@primeproperty.com";

const interestOptions = [
  { value: "", label: "Pilih jenis layanan...", disabled: true },
  { value: "buy", label: "Membeli Properti" },
  { value: "sell", label: "Menjual Properti" },
  { value: "rent", label: "Menyewa Properti" },
  { value: "consultation", label: "Konsultasi Investasi" },
  { value: "other", label: "Lainnya" },
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  phone?: string;
  interest?: string;
  message?: string;
}

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  interest: "",
  message: "",
};

export function ContactContent() {
  return (
    <section className="bg-cream px-5 md:px-20 pt-10 pb-20 md:pt-12 md:pb-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <ContactInfo />
        <ContactForm />
      </div>
    </section>
  );
}

/* ── Info Column ── */
function ContactInfo() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const items = [
    {
      icon: MapPin,
      title: "Kantor Pemasaran Utama",
      lines: [
        "Prime Tower, Lt. 15",
        "Jl. Jend. Sudirman Kav. 45",
        "Jakarta Selatan 12190, Indonesia",
      ],
    },
    {
      icon: Phone,
      title: "Telepon (Hunting)",
      lines: [PHONE_DISPLAY],
    },
    {
      icon: WhatsAppIcon,
      title: "WhatsApp",
      lines: ["+62 811 1222 333"],
    },
    {
      icon: Mail,
      title: "Email",
      lines: [EMAIL],
    },
    {
      icon: Clock,
      title: "Jam Operasional",
      lines: ["Senin – Sabtu · 09.00 – 18.00 WIB"],
    },
  ];

  return (
    <motion.div
      ref={ref}
      className="bg-pure-white p-8 md:p-10 rounded-2xl border border-pebble shadow-sm flex flex-col gap-8 h-full"
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.7, ease }}
    >
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <span className="w-10 h-0.5 bg-gold origin-left" />
          <span className="text-[10px] font-bold tracking-[0.25em] text-gold-dark uppercase">
            Mari Berbincang
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-charcoal tracking-tight mb-3">
          Konsultan Properti Anda
        </h2>
        <p className="text-base text-charcoal/70 leading-relaxed">
          Kunjungi kantor pemasaran kami atau hubungi kami melalui saluran yang
          tersedia. Konsultan properti kami siap memberikan layanan personal
          terbaik.
        </p>
      </div>

      {/* Contact items */}
      <ul className="flex flex-col gap-5 flex-grow">
        {items.map((item, i) => (
          <motion.li
            key={item.title}
            className="flex gap-4 items-start"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 * i, ease }}
          >
            <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
              <item.icon
                className="w-5 h-5 text-gold"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </div>
            <div>
              <h3 className="text-sm font-bold text-charcoal mb-1">
                {item.title}
              </h3>
              {item.lines.map((line) => (
                <p key={line} className="text-sm text-charcoal/70 leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
          </motion.li>
        ))}
      </ul>

      {/* WhatsApp CTA */}
      <div className="pt-6 mt-auto border-t border-pebble">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-gold hover:bg-gold-dark text-charcoal font-bold rounded-xl transition-colors duration-300 shadow-md hover:shadow-lg min-h-[48px]"
          >
            <WhatsAppIcon solid className="w-5 h-5" />
            Chat via WhatsApp
          </a>
      </div>
    </motion.div>
  );
}

/* ── Form Column ── */
function ContactForm() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );
  const [feedback, setFeedback] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (fieldErrors[e.target.name as keyof FieldErrors]) {
      setFieldErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const errors: FieldErrors = {};
    if (!form.name.trim() || form.name.trim().length < 2) errors.name = "Nama minimal 2 karakter.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = "Mohon masukkan alamat email yang valid.";
    if (!form.phone.trim() || !/^[0-9+()\-\s]{10,20}$/.test(form.phone.trim())) errors.phone = "Nomor HP minimal 10 digit.";
    if (!form.message.trim() || form.message.trim().length < 10) errors.message = "Pesan minimal 10 karakter.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status !== "idle") return;
    if (!validateForm()) return;
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, honeypot: "" }),
      });
      const payload = (await response.json().catch(() => null)) as { message?: string } | null;

      if (!response.ok) {
        const errorPayload = payload as { message?: string; issues?: Record<string, string[]> } | null;
        setStatus("error");
        setFeedback(
          errorPayload?.message ??
            "Terjadi kendala pengiriman. Silakan coba lagi atau hubungi kami via WhatsApp."
        );
        if (errorPayload?.issues) {
          const serverErrors: FieldErrors = {};
          Object.entries(errorPayload.issues).forEach(([key, messages]) => {
            if (messages && messages.length > 0) {
              serverErrors[key as keyof FieldErrors] = messages[0];
            }
          });
          setFieldErrors(serverErrors);
        }
        setTimeout(() => {
          setStatus("idle");
          setFeedback(null);
        }, 5000);
        return;
      }

      setStatus("success");
      setFeedback(
        payload?.message ??
          "Pesan Anda telah kami terima dengan baik. Tim kami akan menghubungi Anda dalam waktu dekat."
      );
      setForm(initialForm);
      setTimeout(() => {
        setStatus("idle");
        setFeedback(null);
      }, 5000);
    } catch {
      setStatus("error");
      setFeedback("Terjadi kendala pengiriman. Silakan coba lagi atau hubungi kami via WhatsApp.");
      setTimeout(() => {
        setStatus("idle");
        setFeedback(null);
      }, 5000);
    }
  };

  return (
    <motion.div
      ref={ref}
      className="relative bg-pure-white p-8 md:p-10 rounded-2xl border border-pebble shadow-sm overflow-hidden"
      initial={{ opacity: 0, x: 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
      transition={{ duration: 0.7, ease }}
    >
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-10 h-0.5 bg-gold origin-left" />
            <span className="text-[10px] font-bold tracking-[0.25em] text-gold-dark uppercase">
              Tinggalkan Pesan
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-charcoal tracking-tight mb-3">
            Kirim Pesan
          </h2>
          <p className="text-base text-charcoal/70 leading-relaxed">
            Kami akan membaca pesan Anda secara personal dan membalas dalam 24
            jam.
          </p>
        </div>

        {/* Feedback message */}
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-start gap-3 p-4 bg-status-stock-bg border border-status-stock-text/20 rounded-xl"
            role="status"
          >
            <CheckCircle2
              className="w-5 h-5 text-status-stock-text shrink-0 mt-0.5"
              strokeWidth={2}
              aria-hidden="true"
            />
            <div>
              <p className="text-sm font-semibold text-status-stock-text">
                Pesan berhasil dikirim
              </p>
              <p className="text-xs text-status-stock-text/80 mt-0.5">
                {feedback ?? "Tim kami akan menghubungi Anda dalam 24 jam."}
              </p>
            </div>
          </motion.div>
        )}

        {status === "error" && feedback && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-calm-red text-pure-white rounded-xl"
            role="alert"
          >
            <p className="text-sm font-semibold">Pesan belum terkirim</p>
            <p className="text-xs text-pure-white/85 mt-0.5">{feedback}</p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
          <Field
            label="Nama Lengkap"
            id="name"
            name="name"
            type="text"
            placeholder="Nama lengkap Anda"
            value={form.name}
            onChange={handleChange}
            required
            delay={0.05}
            isInView={isInView}
            error={fieldErrors.name}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field
              label="Alamat Email"
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              value={form.email}
              onChange={handleChange}
              required
              delay={0.1}
              isInView={isInView}
              error={fieldErrors.email}
            />
            <Field
              label="Nomor Telepon"
              id="phone"
              name="phone"
              type="tel"
              placeholder="0812 3456 7890"
              value={form.phone}
              onChange={handleChange}
              required
              delay={0.15}
              isInView={isInView}
              error={fieldErrors.phone}
            />
          </div>

          <SelectField
            label="Ketertarikan"
            id="interest"
            name="interest"
            value={form.interest}
            onChange={(v) => setForm((prev) => ({ ...prev, interest: v }))}
            options={interestOptions}
            required
            delay={0.2}
            isInView={isInView}
          />

          <TextareaField
            label="Pesan Anda"
            id="message"
            name="message"
            placeholder="Ceritakan keperluan Anda, kami siap mendengarkan..."
            value={form.message}
            onChange={handleChange}
            required
            delay={0.25}
            isInView={isInView}
            error={fieldErrors.message}
          />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.3, ease }}
          >
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gold hover:bg-gold-dark text-charcoal font-bold text-sm rounded-xl transition-all duration-300 shadow-md hover:shadow-lg min-h-[48px] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "sending" ? (
                <>
                  <span className="w-4 h-4 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin" />
                  Mengirim...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
                  Kirim Pesan
                </>
              )}
            </button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
}

/* ── Field Components ── */
interface FieldProps {
  label: string;
  id: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  delay: number;
  isInView: boolean;
  error?: string;
}

function Field({
  label,
  id,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
  delay,
  isInView,
  error,
}: FieldProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.5, delay, ease }}
    >
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-charcoal mb-1.5"
      >
        {label}
        {required && <span className="text-calm-red ml-1">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full bg-cream border rounded-xl px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/40 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all ${error ? "border-calm-red" : "border-pebble"}`}
      />
      {error && (
        <p className="text-xs text-calm-red mt-1">{error}</p>
      )}
    </motion.div>
  );
}

interface SelectFieldProps {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; disabled?: boolean }[];
  required?: boolean;
  delay: number;
  isInView: boolean;
}

function SelectField({
  label,
  id,
  name,
  value,
  onChange,
  options,
  required,
  delay,
  isInView,
}: SelectFieldProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.5, delay, ease }}
    >
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-charcoal mb-1.5"
      >
        {label}
        {required && <span className="text-calm-red ml-1">*</span>}
      </label>
      <Select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        options={options}
        variant="form"
        ariaLabel={label}
      />
    </motion.div>
  );
}

interface TextareaFieldProps {
  label: string;
  id: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  delay: number;
  isInView: boolean;
  error?: string;
}

function TextareaField({
  label,
  id,
  name,
  placeholder,
  value,
  onChange,
  required,
  delay,
  isInView,
  error,
}: TextareaFieldProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.5, delay, ease }}
    >
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-charcoal mb-1.5"
      >
        {label}
        {required && <span className="text-calm-red ml-1">*</span>}
      </label>
      <textarea
        id={id}
        name={name}
        rows={4}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full bg-cream border rounded-xl px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/40 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all resize-y ${error ? "border-calm-red" : "border-pebble"}`}
      />
      {error && (
        <p className="text-xs text-calm-red mt-1">{error}</p>
      )}
    </motion.div>
  );
}
