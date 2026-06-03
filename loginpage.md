<!DOCTYPE html>

<html lang="id"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Prime Property - Elite Agent Portal Login</title>
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
                        "background": "#f9f9f9",
                        "surface-container-lowest": "#ffffff",
                        "tertiary-fixed-dim": "#c7c6c4",
                        "surface-container": "#eeeeee",
                        "secondary-fixed-dim": "#e4c278",
                        "inverse-surface": "#2f3131",
                        "warning-bg": "#FEF3C7",
                        "info-bg": "#EDE9FE",
                        "surface": "#f9f9f9",
                        "primary-container": "#1c1b1b",
                        "tertiary": "#000000",
                        "on-primary-fixed": "#1c1b1b",
                        "calm-red": "#B33A3A",
                        "success-text": "#065F46",
                        "secondary-container": "#ffdc8e",
                        "outline-variant": "#c4c7c7",
                        "on-primary": "#ffffff",
                        "surface-variant": "#e2e2e2",
                        "on-background": "#1a1c1c",
                        "on-tertiary": "#ffffff",
                        "primary": "#000000",
                        "on-tertiary-fixed": "#1a1c1a",
                        "on-tertiary-container": "#848482",
                        "surface-bright": "#f9f9f9",
                        "inverse-primary": "#c8c6c5",
                        "on-secondary-container": "#795f1f",
                        "primary-fixed-dim": "#c8c6c5",
                        "on-error": "#ffffff",
                        "secondary": "#745b1b",
                        "surface-dim": "#dadada",
                        "secondary-fixed": "#ffdf9b",
                        "on-secondary-fixed": "#251a00",
                        "on-secondary": "#ffffff",
                        "on-surface": "#1a1c1c",
                        "outline": "#747878",
                        "primary-fixed": "#e5e2e1",
                        "tertiary-fixed": "#e3e2e0",
                        "info-text": "#4C1D95",
                        "tertiary-container": "#1a1c1a",
                        "success-bg": "#D1FAE5",
                        "warning-text": "#92400E",
                        "surface-container-low": "#f3f3f3",
                        "on-surface-variant": "#444748",
                        "on-tertiary-fixed-variant": "#464745",
                        "inverse-on-surface": "#f1f1f1",
                        "surface-tint": "#5f5e5e",
                        "pure-white": "#FFFFFF",
                        "on-primary-container": "#858383",
                        "surface-container-high": "#e8e8e8",
                        "on-secondary-fixed-variant": "#5a4302",
                        "error-bg": "#FEE2E2",
                        "error-container": "#ffdad6",
                        "error": "#ba1a1a",
                        "on-error-container": "#93000a",
                        "surface-container-highest": "#e2e2e2",
                        "on-primary-fixed-variant": "#474746"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.125rem",
                        "lg": "0.25rem",
                        "xl": "0.5rem",
                        "full": "0.75rem"
                    },
                    "spacing": {
                        "base": "4px",
                        "lg": "32px",
                        "xl": "64px",
                        "sm": "16px",
                        "gutter": "24px",
                        "xs": "8px",
                        "margin-desktop": "80px",
                        "md": "24px",
                        "margin-mobile": "20px"
                    },
                    "fontFamily": {
                        "label-sm": ["Geist"],
                        "body-md": ["Geist"],
                        "headline-xl-mobile": ["Geist"],
                        "headline-xl": ["Geist"],
                        "label-md": ["Geist"],
                        "headline-md": ["Geist"],
                        "body-lg": ["Geist"],
                        "headline-lg": ["Geist"]
                    },
                    "fontSize": {
                        "label-sm": ["12px", { "lineHeight": "1", "letterSpacing": "0.05em", "fontWeight": "500" }],
                        "body-md": ["16px", { "lineHeight": "1.6rem", "fontWeight": "400" }],
                        "headline-xl-mobile": ["36px", { "lineHeight": "1.2", "fontWeight": "700" }],
                        "headline-xl": ["48px", { "lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                        "label-md": ["14px", { "lineHeight": "1", "fontWeight": "600" }],
                        "headline-md": ["24px", { "lineHeight": "1.4", "fontWeight": "700" }],
                        "body-lg": ["18px", { "lineHeight": "1.6rem", "fontWeight": "400" }],
                        "headline-lg": ["32px", { "lineHeight": "1.3", "fontWeight": "700" }]
                    }
                }
            }
        }
    </script>
<style>
        body { font-family: 'Geist', sans-serif; }
        .glass-panel {
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
        }
    </style>
</head>
<body class="bg-background text-on-background min-h-screen flex items-center justify-center p-margin-mobile md:p-margin-desktop antialiased selection:bg-secondary-container selection:text-on-secondary-container">
<main class="w-full max-w-6xl mx-auto flex rounded-xl overflow-hidden shadow-2xl bg-pure-white border border-outline-variant min-h-[600px] relative">
<!-- Left Side: Login Form -->
<div class="w-full md:w-1/2 p-lg md:p-xl flex flex-col justify-center relative z-10 bg-pure-white">
<div class="mb-lg">
<div class="flex items-center gap-xs mb-md">
<span class="material-symbols-outlined text-secondary" data-icon="domain" style="font-variation-settings: 'FILL' 1;">domain</span>
<span class="font-headline-md text-headline-md text-primary tracking-tight">Prime Property</span>
</div>
<h1 class="font-headline-lg text-headline-lg text-primary mb-xs">Elite Agent Portal</h1>
<p class="font-body-md text-body-md text-on-surface-variant">Selamat datang kembali. Silakan masuk untuk mengelola listing properti Anda.</p>
</div>
<form action="#" class="space-y-md" method="POST">
<!-- Email Field -->
<div class="relative">
<label class="block font-label-md text-label-md text-on-surface mb-xs" for="email">Email / Username</label>
<div class="relative flex items-center">
<span class="material-symbols-outlined absolute left-sm text-on-surface-variant" data-icon="person">person</span>
<input class="w-full pl-xl pr-sm py-sm bg-pure-white border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200 placeholder:text-on-surface-variant/50" id="email" name="email" placeholder="agent@primeproperty.com" required="" type="email"/>
</div>
</div>
<!-- Password Field -->
<div class="relative">
<label class="block font-label-md text-label-md text-on-surface mb-xs" for="password">Kata Sandi</label>
<div class="relative flex items-center">
<span class="material-symbols-outlined absolute left-sm text-on-surface-variant" data-icon="lock">lock</span>
<input class="w-full pl-xl pr-sm py-sm bg-pure-white border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200 placeholder:text-on-surface-variant/50" id="password" name="password" placeholder="••••••••" required="" type="password"/>
</div>
<div class="flex justify-end mt-xs">
<a class="font-label-sm text-label-sm text-secondary hover:text-on-secondary-container transition-colors duration-200" href="#">Lupa kata sandi?</a>
</div>
</div>
<!-- Submit Button -->
<button class="w-full bg-secondary hover:bg-on-secondary-container text-on-secondary font-label-md text-label-md py-sm rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md flex justify-center items-center gap-xs mt-lg" type="submit">
<span>Masuk ke Dashboard</span>
<span class="material-symbols-outlined text-[18px]" data-icon="arrow_forward">arrow_forward</span>
</button>
</form>
<div class="mt-xl text-center">
<a class="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary inline-flex items-center gap-xs transition-colors duration-200" href="#">
<span class="material-symbols-outlined text-[16px]" data-icon="arrow_back">arrow_back</span>
                    Kembali ke Beranda
                </a>
</div>
</div>
<!-- Right Side: Imagery (Hidden on Mobile) -->
<div class="hidden md:block md:w-1/2 relative bg-surface-container-low">
<div class="absolute inset-0 bg-cover bg-center" data-alt="A luxurious modern villa lobby bathed in golden hour sunlight. The interior features warm wood paneling, polished marble floors, and sophisticated minimalist furniture. The lighting is soft and natural, casting elegant shadows across the spacious, uncluttered room. The overall aesthetic is premium, serene, and sophisticated, perfectly matching a high-end real estate brand focusing on warm, accessible luxury." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuChMGCMo1l4yxO6o0DJyQmuZHwix_Ek8cWWl6_PE7IXzxi6TQIEwmBizu2sU7IOfTiMllyUILEl018gNOiVic9Lb0tsGo2TNWvXOVVMfxBPMQsEzNkLArTOlenmpMrGb4Y7AHJsCGLoK9MUY8cmiOW_OZ4JbmBd8ke9rxY4fqdXKZwRZh72w3tZrs_HwttEXMqWr5Qu7hbwNy_V5Y-_-MGa3lIGEFcjUXm364-48b1y8n9lPqyuKqmzhBqh-ngvyMUkaJjpN-P3icw');">
<!-- Overlay for better text contrast if needed, though mostly image here -->
<div class="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
</div>
<!-- Optional subtle brand badge on the image -->
<div class="absolute bottom-lg right-lg glass-panel p-sm rounded-lg flex items-center gap-sm shadow-lg border border-pure-white/20">
<span class="material-symbols-outlined text-secondary text-[32px]" data-icon="verified" style="font-variation-settings: 'FILL' 1;">verified</span>
<div>
<p class="font-label-md text-label-md text-primary">Aura Prestigia</p>
<p class="font-label-sm text-label-sm text-on-surface-variant">Verified Elite Partner</p>
</div>
</div>
</div>
</main>
</body></html>