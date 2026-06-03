<!DOCTYPE html>

<html lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Contact Us - Aura Prestigia</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "primary-fixed": "#e5e2e1",
                        "on-error": "#ffffff",
                        "secondary-container": "#ffdc8e",
                        "inverse-surface": "#2f3131",
                        "on-surface-variant": "#444748",
                        "surface": "#f9f9f9",
                        "on-secondary-fixed-variant": "#5a4302",
                        "surface-bright": "#f9f9f9",
                        "on-primary-fixed-variant": "#474746",
                        "surface-tint": "#5f5e5e",
                        "surface-container": "#eeeeee",
                        "on-tertiary": "#ffffff",
                        "primary-fixed-dim": "#c8c6c5",
                        "surface-dim": "#dadada",
                        "primary-container": "#1c1b1b",
                        "tertiary-container": "#1a1c1a",
                        "secondary-fixed-dim": "#e4c278",
                        "on-secondary-container": "#795f1f",
                        "tertiary-fixed": "#e3e2e0",
                        "inverse-on-surface": "#f1f1f1",
                        "background": "#f9f9f9",
                        "on-tertiary-fixed": "#1a1c1a",
                        "on-tertiary-fixed-variant": "#464745",
                        "surface-container-low": "#f3f3f3",
                        "outline": "#747878",
                        "error-bg": "#FEE2E2",
                        "success-bg": "#D1FAE5",
                        "on-background": "#1a1c1c",
                        "surface-container-high": "#e8e8e8",
                        "error-container": "#ffdad6",
                        "on-surface": "#1a1c1c",
                        "surface-variant": "#e2e2e2",
                        "surface-container-lowest": "#ffffff",
                        "info-text": "#4C1D95",
                        "tertiary": "#000000",
                        "inverse-primary": "#c8c6c5",
                        "on-tertiary-container": "#848482",
                        "calm-red": "#B33A3A",
                        "primary": "#000000",
                        "on-error-container": "#93000a",
                        "outline-variant": "#c4c7c7",
                        "on-primary": "#ffffff",
                        "secondary": "#745b1b",
                        "on-secondary": "#ffffff",
                        "info-bg": "#EDE9FE",
                        "surface-container-highest": "#e2e2e2",
                        "warning-text": "#92400E",
                        "warning-bg": "#FEF3C7",
                        "pure-white": "#FFFFFF",
                        "error": "#ba1a1a",
                        "secondary-fixed": "#ffdf9b",
                        "success-text": "#065F46",
                        "on-primary-fixed": "#1c1b1b",
                        "tertiary-fixed-dim": "#c7c6c4",
                        "on-secondary-fixed": "#251a00",
                        "on-primary-container": "#858383"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.125rem",
                        "lg": "0.25rem",
                        "xl": "0.5rem",
                        "full": "0.75rem"
                    },
                    "spacing": {
                        "xs": "8px",
                        "gutter": "24px",
                        "base": "4px",
                        "xl": "64px",
                        "md": "24px",
                        "margin-desktop": "80px",
                        "margin-mobile": "20px",
                        "lg": "32px",
                        "sm": "16px"
                    },
                    "fontFamily": {
                        "label-sm": ["Geist"],
                        "body-md": ["Geist"],
                        "body-lg": ["Geist"],
                        "headline-xl-mobile": ["Geist"],
                        "headline-md": ["Geist"],
                        "headline-xl": ["Geist"],
                        "headline-lg": ["Geist"],
                        "label-md": ["Geist"]
                    },
                    "fontSize": {
                        "label-sm": ["12px", { "lineHeight": "1", "letterSpacing": "0.05em", "fontWeight": "500" }],
                        "body-md": ["16px", { "lineHeight": "1.6rem", "fontWeight": "400" }],
                        "body-lg": ["18px", { "lineHeight": "1.6rem", "fontWeight": "400" }],
                        "headline-xl-mobile": ["36px", { "lineHeight": "1.2", "fontWeight": "700" }],
                        "headline-md": ["24px", { "lineHeight": "1.4", "fontWeight": "700" }],
                        "headline-xl": ["48px", { "lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                        "headline-lg": ["32px", { "lineHeight": "1.3", "fontWeight": "700" }],
                        "label-md": ["14px", { "lineHeight": "1", "fontWeight": "600" }]
                    }
                },
            },
        }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
    </style>
</head>
<body class="bg-surface font-body-md text-on-surface antialiased min-h-screen flex flex-col">
<!-- TopNavBar -->
<header class="fixed top-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop py-md bg-[#1A1A1A]">
<a class="font-headline-md text-headline-md text-pure-white tracking-tight" href="#">Aura Prestigia</a>
<!-- Desktop Nav -->
<nav class="hidden md:flex gap-gutter items-center">
<a class="font-label-md text-label-md text-pure-white hover:text-secondary-fixed transition-colors" href="#">Beranda</a>
<a class="font-label-md text-label-md text-pure-white hover:text-secondary-fixed transition-colors" href="#">Tentang Kami</a>
<a class="font-label-md text-label-md text-secondary-fixed border-b-2 border-secondary-fixed pb-1" href="#">Kontak</a>
</nav>
<a class="hidden md:inline-flex items-center justify-center font-label-md text-label-md px-sm py-xs border border-pure-white text-pure-white rounded hover:bg-pure-white/10 transition-colors" href="#">
            Login Agent
        </a>
<!-- Mobile Menu Button -->
<button aria-label="Menu" class="md:hidden text-pure-white p-xs">
<span class="material-symbols-outlined text-headline-md">menu</span>
</button>
</header>
<main class="flex-grow">
<!-- Hero Mini Section -->
<section class="pt-[140px] pb-xl px-margin-mobile md:px-margin-desktop text-center relative overflow-hidden">
<div class="relative z-10 max-w-3xl mx-auto">
<h1 class="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl text-primary mb-md">Hubungi Kami</h1>
<p class="font-body-lg text-body-lg text-on-surface-variant">Kami selalu siap mendengarkan. Silakan hubungi kami untuk mendiskusikan kebutuhan properti impian Anda atau menjadwalkan kunjungan eksklusif.</p>
</div>
<div class="absolute top-0 left-0 w-full h-full -z-10 bg-gradient-to-b from-surface-variant/30 to-surface"></div>
</section>
<!-- Main Content (2-column layout) -->
<section class="py-xl px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto">
<div class="grid grid-cols-1 md:grid-cols-2 gap-xl items-start">
<!-- Left Column (Contact Info) -->
<div class="bg-surface-container-lowest p-xl rounded-xl border border-surface-variant shadow-sm flex flex-col gap-lg h-full">
<div>
<h2 class="font-headline-lg text-headline-lg text-primary mb-sm">Mari Berbincang</h2>
<p class="font-body-md text-body-md text-on-surface-variant">Kunjungi kantor pemasaran kami atau hubungi kami melalui saluran yang tersedia. Konsultan properti kami siap memberikan layanan personal terbaik.</p>
</div>
<div class="flex flex-col gap-md flex-grow">
<!-- Address -->
<div class="flex gap-sm items-start">
<span class="material-symbols-outlined text-secondary text-[24px] mt-1" style="font-variation-settings: 'FILL' 1;">location_on</span>
<div>
<h3 class="font-label-md text-label-md text-primary mb-xs">Kantor Pemasaran Utama</h3>
<p class="font-body-md text-body-md text-on-surface-variant">Aura Tower, Lt. 15<br/>Jl. Jend. Sudirman Kav. 52-53<br/>Jakarta Selatan 12190, Indonesia</p>
</div>
</div>
<!-- Phone -->
<div class="flex gap-sm items-start">
<img alt="Phone icon" class="w-6 h-6 object-contain mt-1" src="https://lh3.googleusercontent.com/aida/AP1WRLsHaH_PsHuPKCJoCvGH_wKkg94h1hwLrjiCR_WU8fbi0rXf8Np1I-5tBXFZdcjsYBlYEnGz3nQnqqakr_RY0fl2NNJq37cpQeSi-YLM6sdWPArxAkmF9bCpbUcK2DxdTEetIVkiXBwHwfSjE7naeDkM7k2C6L-EMZZnpWIYyQrdi3G0KT4ljdp29xQ4yx3xQ7HGXZyePvk2ExWs_m_VsaKSEID8pUndTp1AOztN-f_nEQiaPFzg6reVLmQ"/>
<div>
<h3 class="font-label-md text-label-md text-primary mb-xs">Telepon (Hunting)</h3>
<p class="font-body-md text-body-md text-on-surface-variant">+62 811 1222 333</p>
</div>
</div>
<!-- Email -->
<div class="flex gap-sm items-start">
<span class="material-symbols-outlined text-secondary text-[24px] mt-1" style="font-variation-settings: 'FILL' 1;">mail</span>
<div>
<h3 class="font-label-md text-label-md text-primary mb-xs">Email</h3>
<p class="font-body-md text-body-md text-on-surface-variant">halo@primeproperty.com</p>
</div>
</div>
</div>
<!-- WhatsApp CTA -->
<div class="mt-auto pt-md border-t border-surface-variant">
<a class="inline-flex items-center justify-center w-full gap-sm font-label-md text-label-md px-md py-sm bg-secondary-fixed text-on-secondary-fixed rounded hover:bg-secondary-fixed-dim transition-colors" href="#">
<svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewbox="0 0 24 24">
<path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.832.926 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.161.453-.834.864-1.161.895-.35.033-.923.116-2.821-.662-2.271-1.026-3.766-3.327-3.882-3.483-.116-.156-.928-1.236-.928-2.358 0-1.122.58-1.674.793-1.9.213-.226.463-.283.618-.283.155 0 .31.001.449.008.148.007.345-.059.54.409.201.483.676 1.649.738 1.774.062.125.103.272.026.427-.078.156-.118.252-.236.388-.118.136-.252.285-.356.398-.115.125-.236.264-.103.493.133.228.591.972 1.268 1.574.873.775 1.606 1.01 1.821 1.114.215.104.341.088.471-.061.13-.149.56-.653.71-.878.151-.226.302-.189.516-.112.214.077 1.349.635 1.58.749.231.114.385.172.441.267.056.096.056.551-.105 1.004z"></path>
</svg>
                            Chat via WhatsApp
                        </a>
</div>
</div>
<!-- Right Column (Contact Form) -->
<div class="bg-surface-container-lowest p-xl rounded-xl border border-surface-variant shadow-sm relative overflow-hidden">
<!-- Subtle background texture inside the form card -->
<div class="absolute top-0 right-0 w-64 h-64 bg-surface-variant/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
<h2 class="font-headline-lg text-headline-lg text-primary mb-xs relative z-10">Tinggalkan Pesan</h2>
<p class="font-body-md text-body-md text-on-surface-variant mb-lg relative z-10">Kami akan membaca pesan Anda secara personal dan membalas dalam 24 jam.</p>
<form class="flex flex-col gap-md relative z-10">
<div>
<label class="block font-label-md text-label-md text-on-surface mb-xs" for="name">Nama Lengkap</label>
<input class="w-full bg-surface-bright border border-outline-variant rounded p-sm font-body-md text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors" id="name" name="name" placeholder="Nama lengkap Anda" type="text"/>
</div>
<div class="grid grid-cols-1 sm:grid-cols-2 gap-md">
<div>
<label class="block font-label-md text-label-md text-on-surface mb-xs" for="email">Alamat Email</label>
<input class="w-full bg-surface-bright border border-outline-variant rounded p-sm font-body-md text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors" id="email" name="email" placeholder="john@example.com" type="email"/>
</div>
<div>
<label class="block font-label-md text-label-md text-on-surface mb-xs" for="phone">Nomor Telepon</label>
<input class="w-full bg-surface-bright border border-outline-variant rounded p-sm font-body-md text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors" id="phone" name="phone" placeholder="0812 3456 7890" type="tel"/>
</div>
</div>
<div>
<label class="block font-label-md text-label-md text-on-surface mb-xs" for="interest">Ketertarikan</label>
<select class="w-full bg-surface-bright border border-outline-variant rounded p-sm font-body-md text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors appearance-none cursor-pointer" id="interest" name="interest">
<option disabled="" selected="" value="">Pilih jenis layanan...</option>
<option value="buy">Membeli Properti</option>
<option value="sell">Menjual Properti</option>
<option value="rent">Menyewa Properti</option>
<option value="consultation">Konsultasi Investasi</option>
<option value="other">Lainnya</option>
</select>
</div>
<div>
<label class="block font-label-md text-label-md text-on-surface mb-xs" for="message">Pesan Anda</label>
<textarea class="w-full bg-surface-bright border border-outline-variant rounded p-sm font-body-md text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors resize-y" id="message" name="message" placeholder="Ceritakan keperluan Anda, kami siap mendengarkan..." rows="4"></textarea>
</div>
<button class="mt-sm font-label-md text-label-md px-lg py-sm bg-secondary-fixed text-on-secondary-fixed rounded hover:bg-secondary-fixed-dim transition-colors self-start shadow-sm" type="button">
                            Kirim Pesan
                        </button>
</form>
</div>
</div>
</section>
<!-- Aesthetic Office Image Section -->
<section class="py-xl px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto">
<div class="rounded-xl overflow-hidden shadow-sm h-[400px] relative w-full bg-surface-variant flex items-center justify-center bg-cover bg-center" data-alt="A warm, modern, and minimalist luxury real estate office interior. The scene features a high-end wooden desk, subtle soft cream and soft charcoal tones, and elegant glassmorphic architectural details. Natural light streams through large windows, creating a welcoming, premium, and trustworthy atmosphere indicative of the Aura Prestigia brand." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuC66SPrcjGQpIyeUn7L4fzps3Uj6Z5ecuK86Ly0wEvkbmi1mVwgJ_N2NgE-f6fAI5pzVNS3RURONTszjF9I2rSBabH_2--2LmMvlLKE1VaWM0rltJ91yVBkTnoMZNWiosY_EQrUoNoEKeZOldOWJy7hNoh39WH1ys9iT9cvfR39bgGK4mepLjmj-Qld1_F_34wBZONcKHG2AlX8UCSe050m1P_se8mIOCZtpTOHRQ3jsoowTWp4lw2T4vCBkVY0o1xOE5v7JD7kN0g');">
<div class="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
</div>
</section>
</main>
<!-- Footer -->
<footer class="w-full px-margin-desktop py-xl flex flex-col md:flex-row justify-between items-start md:items-center bg-[#1A1A1A] border-t border-outline-variant text-pure-white gap-xl">
<div class="mb-md md:mb-0 max-w-sm">
<span class="font-headline-md text-headline-md text-pure-white block mb-sm">Aura Prestigia</span>
<p class="font-body-md text-body-md text-surface-variant mt-xs">Mewujudkan impian hunian mewah Anda melalui layanan eksklusif dan properti prestisius pilihan.</p>
</div>
<div class="grid grid-cols-2 gap-xl w-full md:w-auto">
<nav class="flex flex-col gap-sm">
<h4 class="font-label-md text-label-md text-pure-white mb-xs">Tautan Cepat</h4>
<a class="font-body-md text-body-md text-surface-variant hover:text-secondary-fixed transition-colors" href="#">Beranda</a>
<a class="font-body-md text-body-md text-surface-variant hover:text-secondary-fixed transition-colors" href="#">Tentang Kami</a>
<a class="font-body-md text-body-md text-surface-variant hover:text-secondary-fixed transition-colors" href="#">Properti</a>
</nav>
<nav class="flex flex-col gap-sm">
<h4 class="font-label-md text-label-md text-pure-white mb-xs">Hubungi Kami</h4>
<a class="font-body-md text-body-md text-surface-variant hover:text-secondary-fixed transition-colors" href="#">Kontak</a>
<a class="font-body-md text-body-md text-surface-variant hover:text-secondary-fixed transition-colors" href="#">Karir</a>
<a class="font-body-md text-body-md text-surface-variant hover:text-secondary-fixed transition-colors" href="#">FAQ</a>
</nav>
</div>
</footer>
<div class="bg-[#1A1A1A] w-full px-margin-mobile md:px-margin-desktop py-md border-t border-surface-tint/20 text-center">
<p class="font-body-md text-body-md text-surface-variant">© 2024 Aura Prestigia Excellence. All rights reserved.</p>
</div>
</body></html>