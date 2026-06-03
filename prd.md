# PRD — Landing Page Prime Property
**Product Requirements Document**
**Versi:** 1.0
**Tanggal:** 24 Mei 2026
**Status:** Draft Final
**Bahasa:** Indonesia

---

## Daftar Isi

1. [Overview & Latar Belakang](#1-overview--latar-belakang)
2. [Tujuan & Sasaran Produk](#2-tujuan--sasaran-produk)
3. [Pengguna & Persona](#3-pengguna--persona)
4. [Ruang Lingkup](#4-ruang-lingkup)
5. [Design System & Brand](#5-design-system--brand)
6. [Spesifikasi Halaman Landing Page](#6-spesifikasi-halaman-landing-page)
7. [Spesifikasi Halaman About Us](#7-spesifikasi-halaman-about-us)
8. [Spesifikasi Halaman Contact Us](#8-spesifikasi-halaman-contact-us)
9. [Komponen Bersama (Shared Components)](#9-komponen-bersama-shared-components)
10. [Aksesibilitas & Inklusivitas](#10-aksesibilitas--inklusivitas)
11. [Performa & Non-Functional Requirements](#11-performa--non-functional-requirements)
12. [Aset Visual & Imagery](#12-aset-visual--imagery)
13. [Acceptance Criteria Ringkas](#13-acceptance-criteria-ringkas)
14. [Out of Scope](#14-out-of-scope)
15. [Open Issues & Keputusan yang Diperlukan](#15-open-issues--keputusan-yang-diperlukan)

---

## 1. Overview & Latar Belakang

**Prime Property** adalah platform manajemen listing properti yang melayani dua segmen pengguna utama: masyarakat umum (publik) yang mencari informasi properti, dan agen properti internal yang mengelola data listing.

Dokumen ini berfokus pada **Landing Page Publik** (termasuk halaman About Us dan Contact Us) yang menjadi wajah utama platform Prime Property kepada dunia luar. Landing page ini harus membangun kepercayaan, menyampaikan nilai transparansi data, dan menjadi pintu masuk yang elegan bagi calon pembeli maupun pengunjung pertama.

Platform ini dirancang dengan pendekatan **Humane UI/UX** — mengutamakan kesehatan mental pengguna, meminimalkan beban kognitif, dan memastikan semua orang dapat mengakses informasi dengan nyaman terlepas dari keterbatasan fisik atau digital mereka.

---

## 2. Tujuan & Sasaran Produk

### 2.1 Tujuan Utama

| # | Tujuan | Indikator Keberhasilan |
|---|--------|----------------------|
| 1 | Membangun kepercayaan publik terhadap Prime Property sebagai platform properti yang transparan dan jujur | Bounce rate < 50%, waktu rata-rata di halaman > 90 detik |
| 2 | Menampilkan properti unggulan sebagai bukti kualitas listing | Klik ke-6 properti unggulan tercatat dan dapat dilacak |
| 3 | Menghasilkan leads melalui form kontak | Form submission rate > 3% dari total pengunjung |
| 4 | Memenuhi standar performa dan aksesibilitas web modern | Lighthouse Score ≥ 85, WCAG AA compliant |

### 2.2 Sasaran Bisnis

- Meningkatkan awareness merek Prime Property di pasar properti lokal
- Menyediakan saluran kontak langsung antara calon pembeli dan tim Prime Property
- Membantu agen internal menggunakan portal melalui jalur login yang tersembunyi namun mudah diakses

---

## 3. Pengguna & Persona

### 3.1 Persona Publik — "Pengunjung Calon Pembeli"

> **Budi, 38 tahun** — Karyawan swasta yang sedang mencari rumah pertama untuk keluarganya. Tidak terlalu melek teknologi, sering browsing di HP saat makan siang. Mudah frustrasi dengan website yang loading-nya lambat atau terlalu banyak informasi sekaligus.

**Kebutuhan:**
- Melihat contoh properti nyata dengan harga jelas tanpa ribet
- Bisa langsung menghubungi tim via WhatsApp atau form sederhana
- Yakin bahwa informasi yang ditampilkan akurat dan tidak menyesatkan

### 3.2 Persona Internal — "Agen Properti"

> **Sari, 27 tahun** — Agen properti yang bekerja di Prime Property. Setiap hari mengakses dashboard internal untuk cek status listing. Butuh akses login yang cepat tanpa harus mencari-cari link di halaman utama.

**Kebutuhan:**
- Tombol "Login Agent" mudah ditemukan di header tanpa menonjol ke publik
- Route `/agent/login` bisa diakses langsung tanpa link di navigasi publik

---

## 4. Ruang Lingkup

### 4.1 Dalam Lingkup (In Scope)

- **Landing Page** (`/`) — Hero section, Featured Properties, Value Proposition, Footer
- **About Us** (`/tentang-kami`) — Profil perusahaan, visi & misi, nilai perusahaan
- **Contact Us** (`/kontak`) — Form kontak, informasi kontak, embed Google Maps (opsional)
- **Navigasi global** (Sticky Header + Footer)
- **Responsivitas** — Mobile, Tablet, Desktop

### 4.2 Luar Lingkup (Out of Scope — lihat juga Seksi 14)

- Dashboard internal agen (dokumen terpisah)
- Sistem autentikasi `/agent/login`
- CRUD properti dan manajemen admin
- Upload gambar oleh pengguna
- Filter & pencarian listing lanjutan

---

## 5. Design System & Brand

### 5.1 Palet Warna

Semua warna dikalibrasi untuk memenuhi standar **WCAG AA** dan mengurangi kelelahan mata pada penggunaan jangka panjang.

| Token | Kode HEX | Penggunaan |
|-------|----------|-----------|
| Soft Charcoal | `#1A1A1A` | Header, teks utama, background gelap |
| Warm Gold | `#C9A961` | CTA primer, highlight, badge, border fokus |
| Calm Red | `#B33A3A` | Status urgen, hover state tertentu, badge sold out |
| Soft Cream White | `#FAF9F6` | Background utama halaman, teks pada bg gelap |
| Pebble Gray | `#F5F5F5` | Background card, section sekunder, divider |
| Pure White | `#FFFFFF` | Background area bersih, form field |

> **Catatan:** Jangan gunakan `#000000` (hitam murni) atau `#FFFFFF` sebagai satu-satunya kontras. Gunakan pasangan `#1A1A1A` ↔ `#FAF9F6` untuk keterbacaan yang hangat dan ramah retina.

### 5.2 Tipografi

| Properti | Nilai |
|----------|-------|
| Font utama | Inter atau Geist (sans-serif modern) |
| Heading | Bold (700), ukuran berjenjang dari `text-4xl` ke `text-lg` |
| Body | Regular (400), minimal `16px` |
| Line-height body | Minimal `1.6rem` (leading-relaxed) |
| Ukuran minimum elemen interaktif | `14px` (text-sm) |

### 5.3 Sistem Grid & Spacing

| Level | Nilai |
|-------|-------|
| Unit dasar | 4px |
| Spacing standar | 4 / 8 / 16 / 24 / 32 px |
| Breakpoint Mobile | ≤ 640px — layout 1 kolom, hamburger menu |
| Breakpoint Tablet | 641px – 1024px — layout 2 kolom |
| Breakpoint Desktop | ≥ 1024px — layout multi-kolom penuh |

### 5.4 Prinsip Micro-Interaction

- Semua transisi menggunakan `ease-in-out` dengan durasi **200ms – 300ms**
- Tidak ada elemen berkedip (flashing) atau animasi yang tiba-tiba
- Hover state menggunakan perubahan warna halus, bukan skala besar

### 5.5 Penempatan Logo

Logo Prime Property **wajib** tampil di:
- Header semua halaman publik (kiri atas, linked ke `/`)
- Footer halaman publik

---

## 6. Spesifikasi Halaman Landing Page

**Route:** `/`

### 6.1 Sticky Header

**Behaviour:** Tetap di bagian atas layar saat di-scroll (sticky/fixed). Background menggunakan `#1A1A1A` dengan sedikit transparansi saat di-scroll.

**Layout:**
```
[Logo Prime Property]  [Beranda] [Tentang Kami] [Kontak]  [Login Agent ▷]
```

**Spesifikasi detail:**
- Logo: tampil di sisi kiri, terhubung ke route `/`
- Urutan menu: `Beranda` → `Tentang Kami` → `Kontak`
- Tombol **"Login Agent"**: sisi kanan, style `outline` (border emas `#C9A961`, teks emas, background transparan), diarahkan ke `/agent/login`
- Active state: item menu yang sedang aktif diberi garis bawah emas atau teks emas
- Mobile: menu navigasi kolaps menjadi **hamburger icon** (☰), membuka drawer/overlay dari sisi kanan

---

### 6.2 Hero Section

**Tujuan:** Memperkenalkan brand dan mendorong pengunjung untuk melihat properti atau menghubungi tim.

**Layout (Desktop):**
```
┌─────────────────────────────────────────────────────────────┐
│  [Background: Gambar Hero Ruang Keluarga Hangat — fullwidth] │
│                                                             │
│  "Rumah yang Nyaman adalah Awal Cerita Indah Keluarga Anda."│
│  Kami menyajikan data properti secara jujur, transparan,    │
│  dan akurat.                                                │
│                                                             │
│           [  Telusuri Properti  ]   [ Hubungi Kami ]        │
└─────────────────────────────────────────────────────────────┘
```

**Spesifikasi:**
| Elemen | Deskripsi |
|--------|-----------|
| Background | Gambar dari Unsplash (lihat Seksi 12), overlay hitam semi-transparan 40–50% |
| Tagline | Heading utama (`h1`), font bold, warna `#FAF9F6`, maks 2 baris |
| Subteks | Font regular, warna `#FAF9F6` dengan opacity 80%, maks 2 kalimat |
| CTA Primer | Button emas (`#C9A961`), teks hitam (`#1A1A1A`), label "Lihat Properti" atau "Telusuri Properti", scroll ke section properti unggulan |
| CTA Sekunder | Button outline putih, label "Hubungi Kami", diarahkan ke `/kontak` |
| Tinggi (Desktop) | Minimal `500px`, ideal `60vh` |
| Mobile | Teks lebih kecil, tombol stack vertikal, tinggi `70vh` |

---

### 6.3 Section Properti Unggulan

**Tujuan:** Menampilkan sampel properti nyata sebagai social proof tanpa fitur filter.

**Spesifikasi:**
| Elemen | Deskripsi |
|--------|-----------|
| Judul section | "Properti Unggulan" (heading `h2`) |
| Jumlah kartu | Maksimum **6 properti** (read-only, dikurasi manual) |
| Layout Desktop | Grid 3 kolom |
| Layout Tablet | Grid 2 kolom |
| Layout Mobile | Grid 1 kolom (stack) |
| Isi kartu properti | Thumbnail tipe visual + Nama Properti + Kawasan + Harga (format Rp) + Tipe (Ruko/Villa) + Status badge |
| Thumbnail | Gambar representatif berdasarkan tipe properti (lihat Seksi 12.2), bukan foto properti asli |
| Status badge | "In Stock" → badge hijau muda; "Sold Out" → badge merah (`#B33A3A`) |
| Harga | Format Indonesia: `Rp 2.500.000.000` (titik sebagai separator ribuan) |
| Interaksi | Kartu non-clickable di landing page publik (tidak ada detail modal) |
| Data source | Dipilih secara statis atau diambil dari API endpoint publik read-only |

---

### 6.4 Section Mengapa Prime Property

**Tujuan:** Membangun kepercayaan dengan menjelaskan nilai unik platform.

**Spesifikasi:**
| Elemen | Deskripsi |
|--------|-----------|
| Judul section | "Mengapa Prime Property?" atau "Mengapa Kami Mengedepankan Kejujuran Data" |
| Jumlah value prop | 3 – 4 item |
| Layout | Grid ikon + judul + deskripsi singkat (maks 2 kalimat per item) |
| Contoh value prop | "Tanpa Clickbait", "Dimensi Akurat & Fisik", "Status Unit Real-Time", "Tim Responsif 24 Jam" |
| Ikon | SVG atau icon library (Lucide / Heroicons), warna emas `#C9A961` |

---

### 6.5 Footer

**Tujuan:** Informasi ringkas dan navigasi sekunder.

**Layout:**
```
[Logo]          [Menu: Beranda | Tentang Kami | Kontak]
[Deskripsi      [Kontak: ☎ 08xx | ✉ email | WhatsApp]
 singkat]       
© 2026 Prime Property. All rights reserved.
```

**Spesifikasi:**
- Background: `#1A1A1A`
- Teks: `#FAF9F6`
- Link kontak: telepon, email, dan link WhatsApp (`wa.me/...`)
- Menu footer: Beranda, Tentang Kami, Kontak
- Copyright line di bagian bawah
- Mobile: layout stack vertikal

---

## 7. Spesifikasi Halaman About Us

**Route:** `/tentang-kami`

### 7.1 Konten yang Diperlukan

| Bagian | Deskripsi |
|--------|-----------|
| Hero mini | Banner singkat dengan judul "Tentang Kami" |
| Profil Perusahaan | Paragraf pengantar tentang Prime Property, sejarah singkat, dan komitmen |
| Visi | Pernyataan visi dalam satu kalimat kuat |
| Misi | 3 – 5 butir misi dengan bullet yang jelas |
| Nilai Perusahaan | 3 – 4 nilai inti (Kejujuran, Transparansi, Profesionalisme, dll.) |

### 7.2 Layout

| Breakpoint | Layout |
|-----------|--------|
| Desktop | 2 kolom — kolom kiri teks (60%), kolom kanan visual/quote (40%) |
| Mobile | 1 kolom penuh, teks lalu visual di bawahnya |

**Elemen visual:** Gambar villa modern minimalis dari Unsplash (lihat Seksi 12.2), dengan alt text deskriptif.

### 7.3 Aturan Konten

- Seluruh teks dalam **Bahasa Indonesia**
- Tidak ada elemen interaktif kompleks selain navigasi standar
- Tidak ada form atau widget pihak ketiga

---

## 8. Spesifikasi Halaman Contact Us

**Route:** `/kontak`

### 8.1 Informasi Kontak

**Tampilkan semua elemen berikut:**
- Alamat kantor lengkap
- Nomor telepon (dengan format lokal Indonesia)
- Alamat email
- Tombol/link WhatsApp (`wa.me/[nomor]`) dengan label "Chat via WhatsApp"
- Embed Google Maps (opsional — tampilkan hanya jika koordinat tersedia)

### 8.2 Form Kontak

**Field yang diperlukan:**

| Field | Tipe | Validasi |
|-------|------|----------|
| Nama | Text input | Wajib, min 2 karakter |
| Email | Email input | Wajib, format email valid |
| Nomor HP | Tel input | Wajib, min 10 digit angka |
| Pesan | Textarea | Wajib, min 10 karakter |

**Tombol submit:** Label "Kirim Pesan" — warna emas (`#C9A961`), teks hitam.

### 8.3 Validasi & Feedback

| Skenario | Behaviour |
|----------|-----------|
| Field kosong saat berpindah (onBlur) | Tampilkan pesan inline di bawah field, warna `#B33A3A` |
| Format email salah | Pesan inline: "Mohon masukkan alamat email yang valid." |
| Nomor HP < 10 digit | Pesan inline: "Nomor HP minimal 10 digit." |
| Submit berhasil | Toast notification: "Pesan Anda telah kami terima dengan baik. Tim kami akan menghubungi Anda dalam waktu dekat." |
| Submit gagal (server error) | Toast error dengan warna `#B33A3A`: "Terjadi kendala pengiriman. Silakan coba lagi atau hubungi kami via WhatsApp." |
| Rate limit tercapai | Pesan: "Anda telah mengirim terlalu banyak pesan. Silakan coba lagi dalam 1 jam." |

### 8.4 Validasi Teknis Form

- Validasi **onBlur** (saat pengguna berpindah field), **bukan** real-time saat mengetik — menghindari tekanan pada pengguna
- Validasi positif: tampilkan centang hijau kecil (✓) ketika field diisi benar
- **Rate limiting:** Maksimum **3 submit per IP per jam**
- Submit mengirim notifikasi email ke admin Prime Property (implementasi backend)
- **Anti-spam:** Implementasi server-side rate limiting; pertimbangkan honeypot field tersembunyi sebagai alternatif CAPTCHA

### 8.5 Humane Microcopy

Gunakan bahasa yang hangat dan solutif, bukan bahasa sistem kaku:

| Skenario | Pesan yang Digunakan |
|----------|---------------------|
| Placeholder field Nama | "Nama lengkap Anda" |
| Placeholder field Pesan | "Ceritakan keperluan Anda, kami siap mendengarkan..." |
| Deskripsi di atas form | "Kami akan membaca pesan Anda secara personal dan membalas dalam 24 jam." |
| Setelah submit sukses | "Pesan Anda telah kami terima dengan baik. Tim kami akan menghubungi Anda dalam waktu dekat." |

---

## 9. Komponen Bersama (Shared Components)

### 9.1 Sticky Header

Sudah dispesifikasikan di Seksi 6.1. Digunakan di semua halaman publik (`/`, `/tentang-kami`, `/kontak`).

### 9.2 Footer

Sudah dispesifikasikan di Seksi 6.5. Digunakan di semua halaman publik.

### 9.3 Toast Notification

| Properti | Nilai |
|----------|-------|
| Posisi | Pojok kanan bawah layar |
| Durasi tampil | 5 detik, lalu fade out |
| Varian sukses | Background hijau muda, teks gelap, ikon ✓ |
| Varian error | Background `#B33A3A`, teks putih, ikon ✕ |
| Interaksi | Bisa di-dismiss manual dengan klik ✕ |
| Aksesibilitas | Role `alert`, `aria-live="assertive"` |

### 9.4 Komponen Badge Status

| Status | Warna Background | Warna Teks |
|--------|-----------------|-----------|
| In Stock | Hijau muda (`#D1FAE5`) | Hijau tua (`#065F46`) |
| Sold Out | Merah muda (`#FEE2E2`) | Merah tua (`#B33A3A`) |
| Siap Huni | Kuning muda (`#FEF3C7`) | Kuning tua (`#92400E`) |
| Siap Kosong | Ungu muda (`#EDE9FE`) | Ungu tua (`#4C1D95`) |

---

## 10. Aksesibilitas & Inklusivitas

### 10.1 Navigasi Keyboard

- Seluruh halaman dapat dinavigasi menggunakan `Tab`, `Arrow keys`, `Enter`, dan `Space`
- Urutan Tab harus logis mengikuti urutan visual konten

### 10.2 Fokus Visual

- Semua elemen interaktif menampilkan **outline berwarna Warm Gold (`#C9A961`)** tebal **2px** saat difokus via keyboard
- Tidak menggunakan `outline: none` tanpa pengganti yang setara

### 10.3 Teks Alternatif (Alt Text)

- Semua gambar memiliki atribut `alt` yang deskriptif
- Ikon dekoratif menggunakan `aria-hidden="true"`
- Ikon fungsional memiliki `aria-label` yang menjelaskan fungsinya

### 10.4 Kontras Warna

- Pasangan warna teks/background memenuhi rasio kontras minimum **4.5:1** (WCAG AA)
- Pasangan utama yang telah diverifikasi:
  - `#FAF9F6` di atas `#1A1A1A` ✓
  - `#1A1A1A` di atas `#C9A961` ✓
  - `#1A1A1A` di atas `#FAF9F6` ✓

### 10.5 Responsivitas

- Tidak ada teks atau elemen interaktif yang terpotong di viewport mobile (min-width 320px)
- Touch target minimal **44x44px** untuk semua tombol dan link di mobile

---

## 11. Performa & Non-Functional Requirements

### 11.1 Performa

| Metrik | Target |
|--------|--------|
| Time to First Contentful Paint (FCP) | < 1.5 detik di koneksi 4G |
| Lighthouse Performance Score | ≥ 85 |
| Ukuran gambar per file | < 150 KB (format WebP atau via CDN terkompresi) |
| Total page weight (Landing Page) | < 2 MB |

### 11.2 SEO Dasar

- Tag `<title>` unik per halaman
- Meta description relevan per halaman
- Struktur heading hierarkis (`h1` → `h2` → `h3`)
- Open Graph tags untuk sharing di media sosial

### 11.3 Keamanan

- Form kontak menggunakan **CSRF protection**
- **Rate limiting**: 3 submit per IP per jam (Contact Form), 100 req/menit/IP (global)
- Input sanitization untuk mencegah XSS
- HTTPS-only di production

### 11.4 Browser Support

| Browser | Versi Minimum |
|---------|--------------|
| Google Chrome | 2 tahun terakhir |
| Mozilla Firefox | 2 tahun terakhir |
| Microsoft Edge | 2 tahun terakhir |
| Apple Safari | 2 tahun terakhir |
| Mobile Safari (iOS) | iOS 14+ |
| Chrome Android | 2 tahun terakhir |

### 11.5 Bahasa & Lokalisasi

- Seluruh UI dalam **Bahasa Indonesia**
- Format mata uang: `Rp 1.350.000.000` (titik sebagai separator ribuan)
- Format tanggal: `24 Mei 2026` atau `24/05/2026`
- Timezone: `Asia/Jakarta` (WIB)

---

## 12. Aset Visual & Imagery

### 12.1 Panduan Gambar

Semua gambar yang digunakan harus memenuhi kriteria berikut:

- **Pencahayaan alami** (golden hour, cahaya pagi) — bukan rendering 3D atau foto studio berlebihan
- **Sentuhan manusiawi** — tampilkan sudut rumah yang terasa dihuni (tanaman, pencahayaan hangat)
- **Format:** WebP atau JPEG via CDN berperforma tinggi
- **Ukuran file:** < 150 KB per gambar

### 12.2 Daftar Aset Gambar Kurasi

| Posisi | Deskripsi | URL |
|--------|-----------|-----|
| Hero Section | Ruang keluarga hangat dengan jendela besar dan cahaya sore | `https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80` |
| About Us Section | Villa modern minimalis dengan aksen kayu dan alam | `https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80` |
| Contact Us / Tim | Meja kerja kayu minimalis dengan pencahayaan hangat | `https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80` |
| Thumbnail — Tipe Villa | Representasi villa santai eksterior | `https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=400&q=80` |
| Thumbnail — Tipe Ruko | Representasi bangunan komersial minimalis | `https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=400&q=80` |

> **Catatan Lisensi:** Semua gambar berasal dari Unsplash dengan lisensi gratis untuk penggunaan komersial. Verifikasi lisensi masing-masing foto sebelum produksi.

---

## 13. Acceptance Criteria Ringkas

Fitur dinyatakan **DONE** apabila memenuhi seluruh kriteria di bawah ini:

### AC-L1 — Landing Page

- [ ] Header sticky tampil di semua halaman publik dengan urutan menu yang benar
- [ ] Logo Prime Property tampil di header (kiri) dan footer
- [ ] Tombol "Login Agent" tampil di kanan header dengan style outline emas
- [ ] Hero section menampilkan tagline + 2 tombol CTA (primer emas, sekunder outline)
- [ ] Section Properti Unggulan menampilkan maksimum 6 kartu properti dengan thumbnail, nama, kawasan, harga, tipe, dan status badge
- [ ] Harga ditampilkan dalam format `Rp X.XXX.XXX.XXX`
- [ ] Section value proposition menampilkan 3–4 item dengan ikon dan deskripsi
- [ ] Footer menampilkan logo, menu, kontak (telp/email/WA), dan copyright
- [ ] Halaman responsif di mobile (≤640px), tablet (≤1024px), dan desktop (≥1024px)

### AC-L2 — About Us

- [ ] Menampilkan profil perusahaan, visi, misi, dan nilai dalam Bahasa Indonesia
- [ ] Layout 2 kolom di desktop, 1 kolom di mobile
- [ ] Gambar villa menggunakan aset dari Seksi 12.2 dengan alt text yang deskriptif
- [ ] Tidak ada elemen interaktif kompleks selain navigasi standar

### AC-L3 — Contact Us

- [ ] Menampilkan: alamat, telepon, email, dan link WhatsApp
- [ ] Form memiliki 4 field: Nama, Email, Nomor HP, Pesan
- [ ] Validasi onBlur (bukan onKeyUp) untuk semua field
- [ ] Pesan error tampil inline di bawah field dengan warna `#B33A3A`
- [ ] Centang hijau ✓ muncul saat field diisi dengan benar
- [ ] Toast sukses muncul setelah submit berhasil
- [ ] Rate limiting 3 submit per IP per jam diterapkan di backend
- [ ] Microcopy menggunakan bahasa humanis sesuai Seksi 8.5

### AC-L4 — Performa & Aksesibilitas

- [ ] FCP < 1.5 detik di koneksi 4G
- [ ] Lighthouse Performance Score ≥ 85 untuk landing page
- [ ] Semua gambar memiliki alt text yang bermakna
- [ ] Navigasi keyboard berfungsi penuh di semua halaman
- [ ] Fokus visual menggunakan outline emas 2px
- [ ] Ukuran gambar < 150 KB per file

---

## 14. Out of Scope

Hal-hal berikut **tidak termasuk** dalam PRD ini dan akan dibahas dalam dokumen terpisah:

| Fitur | Keterangan |
|-------|-----------|
| Halaman Login Agent (`/agent/login`) | Dibahas di PRD Autentikasi Internal |
| Dashboard internal agen | Dibahas di PRD Dashboard & CRUD Properti |
| Fitur filter & pencarian listing lanjutan | Dibahas di PRD Dashboard Internal |
| Upload gambar properti | Tidak akan diimplementasikan (sesuai AC-1.2) |
| Halaman detail properti publik | Out of scope Phase 1; pertimbangkan Phase 2 |
| Halaman Arsip properti | Out of scope Phase 1; Phase 2 optional |
| Manajemen akun admin/superadmin | Dibahas di PRD Dashboard Internal |
| Internasionalisasi (i18n) / multi-bahasa | Out of scope; platform Indonesia-only |

---

## 15. Open Issues & Keputusan yang Diperlukan

| # | Isu / Pertanyaan | Pemilik | Deadline |
|---|-----------------|---------|---------|
| 1 | Apakah 6 properti unggulan di landing page dikurasi manual oleh superadmin, atau diambil otomatis berdasarkan kriteria tertentu (misal: dibuat terbaru, status in_stock)? | Product Owner | Sebelum sprint dimulai |
| 2 | Apakah embed Google Maps di halaman Contact Us wajib atau benar-benar opsional? Jika opsional, apa fallback-nya jika koordinat tidak tersedia? | Product Owner | Sprint 1 |
| 3 | Siapa penerima notifikasi email dari form kontak? Apakah satu email atau bisa multiple penerima? | Tim Operasional | Sprint 1 |
| 4 | Konten aktual untuk halaman About Us (visi, misi, nilai perusahaan) perlu disediakan oleh tim Prime Property | Marketing / Manajemen | Sebelum development About Us |
| 5 | Nomor WhatsApp, telepon, alamat kantor, dan email aktual untuk halaman Contact Us | Tim Operasional | Sebelum development Contact Us |
| 6 | Logo Prime Property dalam format SVG atau PNG transparan diperlukan dari tim desain | Desainer | Sprint 1, hari pertama |
| 7 | Apakah tombol CTA hero mengarah ke section di bawah (scroll anchor) atau ke halaman listing terpisah di publik? | Product Owner | Sebelum sprint dimulai |

---

*Dokumen ini adalah rujukan utama untuk development dan QA selama fase implementasi Landing Page Prime Property. Setiap perubahan pada dokumen ini harus dikomunikasikan kepada seluruh tim dan dicatat pada changelog.*

---

**PRIME PROPERTY** · Product Requirements Document — Landing Page · Versi 1.0
*Dibuat berdasarkan Acceptance Criteria Document v1.0 dan UI/UX Design Specification*