"use client";

import Link from "next/link";

export function HeroCtas() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button
        type="button"
        onClick={() => {
          document
            .getElementById("properti")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
        className="px-8 py-3 bg-gold text-charcoal font-semibold rounded hover:bg-gold-dark transition-colors duration-300 min-h-[44px]"
      >
        Telusuri Properti
      </button>
      <Link
        href="/kontak"
        className="px-8 py-3 border border-pure-white text-pure-white font-semibold rounded hover:bg-pure-white/10 transition-colors duration-300 min-h-[44px] inline-flex items-center justify-center"
      >
        Hubungi Kami
      </Link>
    </div>
  );
}
