# DESIGN.md — BisaExcel.com
> **File ini adalah referensi desain WAJIB** untuk semua AI agent (Codex, Claude Code, Cursor, Copilot) dan developer.
> Baca **SELURUH** file ini sebelum membuat atau mengubah satu komponen pun.
> Jika ada konflik antara file ini dan keinginan improvisasi agent, **file ini yang menang.**
> Baca bersama **AGENTS.md** sebelum memulai coding apapun.
> Versi: **2.0** — Mei 2026 | Stack: **Vite + React + Laravel**

---

## 0. VISI DESAIN

```
Tema       : Dark Premium Green
Karakter   : Profesional, Ambisius, Gamified, Trustworthy
Inspirasi  : Bloomberg Terminal × Duolingo × Notion
Audiens    : Pekerja kantoran Indonesia yang ingin naik karir via Excel
Perasaan   : "Platform ini serius, tapi belajar di sini terasa seru"
Stack      : Vite (React 18 + TypeScript) — Frontend
             Laravel 11 (PHP 8.3) — Backend API
```

**Satu kalimat desain:**
*"Tampilan premium seperti tool profesional Wall Street, tapi energi belajarnya seaktif game."*

**Anti-pattern yang HARUS dihindari:**
- ❌ Tampilan startup generik (putih bersih + gradien ungu)
- ❌ Terlalu "sekolahan" atau kaku seperti LMS jadul
- ❌ Terlalu playful hingga terkesan tidak profesional
- ❌ Warna hijau neon/terang yang murahan
- ❌ Dark mode setengah-setengah (elemen terang bercampur gelap tanpa logika)
- ❌ Komponen yang tidak konsisten antar halaman

---

## 1. PALET WARNA — SUMBER KEBENARAN TUNGGAL

> ⚠️ **HANYA** gunakan token warna di bawah ini.
> Dilarang menggunakan nilai hex atau Tailwind class warna sembarangan di luar daftar ini.

### 1A. Dark Surface (Background Layer)

```css
--bg-base       : #080E0A;   /* Hitam kehijauan — layer paling bawah (body bg) */
--bg-elevated   : #0D1610;   /* Sedikit lebih terang — panel, sidebar */
--bg-card       : #111E14;   /* Card, modal, dropdown */
--bg-card-hover : #162419;   /* Card saat di-hover */
--bg-overlay    : #1C2E20;   /* Overlay ringan, tooltip bg */
--bg-input      : #0F1A12;   /* Input field background */
```

### 1B. Green Accent (Primary Brand)

```css
--green-50  : #E8F5E9;   /* Teks di atas dark — jarang dipakai */
--green-100 : #C8E6C9;
--green-200 : #A5D6A7;
--green-300 : #81C784;   /* Teks sukses / label ringan */
--green-400 : #66BB6A;   /* Elemen pendukung aktif */
--green-500 : #4CAF50;   /* Warna brand utama */
--green-600 : #16A34A;   /* CTA primer (tombol utama) */
--green-700 : #15803D;   /* Hover state CTA */
--green-800 : #166534;   /* Active/pressed state */
--green-900 : #14532D;   /* Border aksen hijau gelap */
--green-950 : #0A2E18;   /* Background tint sangat gelap */

/* Alias semantic */
--color-primary       : var(--green-600);      /* #16A34A */
--color-primary-hover : var(--green-700);      /* #15803D */
--color-primary-glow  : rgba(22,163,74,.20);   /* glow shadow untuk CTA */
```

### 1C. Gold/Amber Accent (XP, Reward, Achievement)

```css
--gold-300 : #FDE68A;   /* Teks reward di dark bg */
--gold-400 : #FBBF24;   /* Star, streak icon */
--gold-500 : #F59E0B;   /* Badge XP, level badge */
--gold-600 : #D97706;   /* Hover badge */

/* Alias semantic */
--color-xp      : var(--gold-500);   /* #F59E0B */
--color-streak  : var(--gold-400);   /* #FBBF24 */
```

### 1D. Sky Accent (Info, Highlight, Secondary CTA)

```css
--sky-400 : #38BDF8;   /* Link, info badge */
--sky-500 : #0EA5E9;   /* Secondary CTA, highlight */
--sky-600 : #0284C7;   /* Hover info */

/* Alias semantic */
--color-info : var(--sky-500);
```

### 1E. Status Colors

```css
--color-success    : #22C55E;                  /* green-500 */
--color-warning    : #F59E0B;                  /* amber-500 */
--color-danger     : #EF4444;                  /* red-500 */
--color-danger-bg  : rgba(239,68,68,.10);      /* background error ringan */
```

### 1F. Neutral / Text

```css
--text-primary   : #E8F0EA;   /* Teks utama di dark bg (bukan pure white) */
--text-secondary : #8BA98F;   /* Teks pendukung / placeholder */
--text-muted     : #4D6650;   /* Teks disabled / metadata */
--text-inverse   : #0F172A;   /* Teks di atas background terang (tombol) */

--border-subtle  : #1E3022;   /* Border sangat halus */
--border-default : #254A2A;   /* Border standar card */
--border-strong  : #2D6A35;   /* Border focus / aktif */
--border-glow    : rgba(22,163,74,.40);   /* Border glow untuk focus input */
```

---

## 2. TIPOGRAFI

### 2A. Font Stack

```css
/*
  src/index.css — import via Google Fonts @import
  Pastikan diimport SEBELUM @tailwind directives
*/
--font-heading : 'Plus Jakarta Sans', sans-serif;   /* Heading, tagline */
--font-body    : 'DM Sans', sans-serif;             /* Body, UI label */
--font-mono    : 'JetBrains Mono', monospace;       /* Formula Excel, kode */
--font-display : 'Syne', sans-serif;                /* Hero, angka besar, XP counter */
```

> **Mengapa font ini?**
> - *Plus Jakarta Sans* — clean, modern, sedikit karakter kuat → cocok heading profesional
> - *DM Sans* — sangat readable di dark background, geometric tapi hangat
> - *Syne* — display/impact font untuk angka gamifikasi, leaderboard rank
> - *JetBrains Mono* — formula Excel = kode = harus mono, VIP treatment

### 2B. Skala Ukuran

```
DISPLAY (Syne)
  display-2xl : text-6xl  font-bold    (60px) — Hero headline landing
  display-xl  : text-5xl  font-bold    (48px) — Section hero
  display-lg  : text-4xl  font-bold    (36px) — Halaman utama h1

HEADING (Plus Jakarta Sans)
  h1 : text-3xl  font-bold     (30px) — Judul halaman dashboard
  h2 : text-2xl  font-semibold (24px) — Judul section
  h3 : text-xl   font-semibold (20px) — Judul card/panel
  h4 : text-base font-semibold (16px) — Sub-label

BODY (DM Sans)
  body-lg : text-base  font-normal  (16px) — Konten utama
  body    : text-sm    font-normal  (14px) — Body umum
  body-xs : text-xs    font-normal  (12px) — Caption, metadata

MONO (JetBrains Mono)
  mono-lg : text-base  — Formula Excel besar
  mono    : text-sm    — Inline formula
  mono-xs : text-xs    — Badge formula kecil

GAMIFICATION (Syne / Plus Jakarta Sans bold)
  xp-counter    : text-4xl  font-bold      — Angka XP besar
  level-display : text-2xl  font-bold      — Level number
  rank-number   : text-5xl  font-extrabold — Leaderboard rank #1
```

---

## 3. LAYOUT & SPACING

### 3A. Grid System

```
Breakpoint mobile  : 375px  — 1 kolom, padding 16px
Breakpoint sm      : 640px  — masih 1 kolom
Breakpoint md      : 768px  — 2 kolom (tablet)
Breakpoint lg      : 1024px — sidebar + content
Breakpoint xl      : 1280px — layout penuh
Breakpoint 2xl     : 1440px — max-width 1400px, center

Max content width  : max-w-7xl (1280px) dengan px-6
Sidebar width      : 256px (fixed) | 72px (collapsed)
```

### 3B. Spacing Scale (WAJIB konsisten)

```
Padding card        : p-5 atau p-6 (20–24px)
Padding section     : py-16 lg:py-24
Gap grid kursus     : gap-5 lg:gap-6
Gap dalam card      : gap-3 atau gap-4
Gap inline (badge)  : gap-1.5 atau gap-2
Margin heading-body : mb-2 atau mb-3
Stack section       : space-y-8 lg:space-y-12
```

### 3C. Border Radius

```
Radius page/modal   : rounded-2xl (16px)
Radius card         : rounded-xl  (12px)
Radius button       : rounded-lg  (8px)
Radius input        : rounded-lg  (8px)
Radius badge/chip   : rounded-full
Radius avatar       : rounded-full
Radius progress bar : rounded-full
Radius tooltip      : rounded-md  (6px)
```

---

## 4. KOMPONEN UI — SPESIFIKASI LENGKAP

### 4A. Buttons

```tsx
/* ===== PRIMARY CTA ===== */
/* Gunakan untuk: Daftar, Beli Kursus, Submit, Mulai Belajar */
<button className="
  inline-flex items-center justify-center gap-2
  bg-green-600 hover:bg-green-700 active:bg-green-800
  text-white font-semibold text-sm
  px-5 py-2.5 rounded-lg
  shadow-[0_0_20px_rgba(22,163,74,0.30)]
  hover:shadow-[0_0_28px_rgba(22,163,74,0.45)]
  transition-all duration-200
  focus-visible:outline-none focus-visible:ring-2
  focus-visible:ring-green-500 focus-visible:ring-offset-2
  focus-visible:ring-offset-[#080E0A]
  disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none
">

/* ===== SECONDARY / OUTLINE ===== */
/* Gunakan untuk: aksi sekunder, "Lihat Detail" */
<button className="
  inline-flex items-center gap-2
  bg-transparent border border-green-700 hover:border-green-500
  text-green-400 hover:text-green-300
  font-medium text-sm
  px-5 py-2.5 rounded-lg
  hover:bg-green-950/50
  transition-all duration-200
">

/* ===== GHOST ===== */
/* Gunakan untuk: navigasi, aksi tidak penting */
<button className="
  inline-flex items-center gap-2
  bg-transparent hover:bg-[#1C2E20]
  text-[#8BA98F] hover:text-[#E8F0EA]
  font-medium text-sm
  px-4 py-2 rounded-lg
  transition-colors duration-150
">

/* ===== LOADING STATE ===== */
/* WAJIB dipakai saat ada async — JANGAN biarkan button tidak ada feedback */
<button disabled className="... opacity-60">
  <svg className="animate-spin h-4 w-4" .../>
  Memproses...
</button>

/* ===== DANGER ===== */
<button className="
  bg-transparent border border-red-700/60 hover:border-red-500
  text-red-400 hover:text-red-300 hover:bg-red-950/40
  ... rounded-lg transition-all
">
```

### 4B. Cards

```tsx
/* ===== CARD STANDAR ===== */
<div className="
  bg-[#111E14] border border-[#1E3022]
  hover:border-[#254A2A] hover:bg-[#162419]
  rounded-xl shadow-[0_2px_12px_rgba(0,0,0,.40)]
  hover:shadow-[0_4px_24px_rgba(0,0,0,.60)]
  transition-all duration-200
  p-6
">

/* ===== COURSE CARD ===== */
/* Selalu punya: thumbnail (16:9), badge level, judul, instruktur, harga, rating */
<div className="
  bg-[#111E14] border border-[#1E3022]
  rounded-xl overflow-hidden
  hover:border-green-900 hover:shadow-[0_0_0_1px_rgba(22,163,74,.15),0_8px_32px_rgba(0,0,0,.5)]
  hover:-translate-y-1
  transition-all duration-200
  group
">
  {/* Thumbnail dengan overlay gradient di bottom */}
  <div className="relative h-44 overflow-hidden">
    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#111E14] via-transparent to-transparent" />
    <span className="absolute top-3 left-3 ...badge level..."/>
  </div>
  <div className="p-4 space-y-3">
    {/* konten */}
  </div>
</div>

/* ===== STAT CARD (dashboard) ===== */
/* Gunakan untuk: Total XP, Streak, Rank, Kursus selesai */
<div className="
  bg-[#111E14] border border-[#1E3022]
  rounded-xl p-5
  relative overflow-hidden
">
  {/* Accent glow di sudut */}
  <div className="absolute -top-8 -right-8 w-32 h-32
    rounded-full bg-green-600/10 blur-2xl pointer-events-none" />
  {/* konten */}
</div>
```

### 4C. Form & Input

```tsx
/* ===== INPUT STANDAR ===== */
<input className="
  w-full bg-[#0F1A12] border border-[#1E3022]
  focus:border-green-600 focus:ring-1 focus:ring-green-600/30
  text-[#E8F0EA] placeholder:text-[#4D6650]
  text-sm font-medium
  px-4 py-2.5 rounded-lg
  outline-none transition-all duration-150
  disabled:opacity-40 disabled:cursor-not-allowed
" />

/* ===== LABEL ===== */
<label className="block text-xs font-semibold text-[#8BA98F] uppercase tracking-wider mb-1.5">

/* ===== ERROR MESSAGE ===== */
<p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
  <AlertCircle className="h-3 w-3 flex-shrink-0" />
  {errorMessage}
</p>

/* ===== SEARCH INPUT (khusus) ===== */
<div className="relative">
  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#4D6650]" />
  <input className="pl-10 ... (sama seperti input standar)" placeholder="Cari kursus Excel..." />
</div>
```

### 4D. Badges & Labels

```tsx
/* ===== LEVEL BADGE ===== */
<span className="inline-flex items-center gap-1.5
  bg-green-950/80 border border-green-900/60
  text-green-400 text-xs font-semibold
  px-2.5 py-1 rounded-full">
  <ShieldCheck className="h-3 w-3" />
  Level 5 — Excel Expert
</span>

/* ===== XP REWARD BADGE ===== */
<span className="inline-flex items-center gap-1
  bg-amber-950/70 border border-amber-800/50
  text-amber-400 text-xs font-bold
  px-2.5 py-1 rounded-full">
  <Zap className="h-3 w-3" />
  +30 XP
</span>

/* ===== STATUS KURSUS ===== */
/* Sedang Belajar */
<span className="bg-sky-950/70 border border-sky-800/40 text-sky-400 text-xs font-medium px-2.5 py-1 rounded-full">
  Sedang Belajar
</span>
/* Selesai */
<span className="bg-green-950/70 border border-green-800/50 text-green-400 text-xs font-medium px-2.5 py-1 rounded-full">
  <Check className="inline h-3 w-3 mr-1" />Selesai
</span>
/* Gratis */
<span className="bg-amber-950/70 border border-amber-700/50 text-amber-300 text-xs font-bold px-2.5 py-1 rounded-full">
  GRATIS
</span>

/* ===== KURSUS LEVEL ===== */
/* Pemula */   <span className="bg-[#0A2E18] text-green-300 ...">Pemula</span>
/* Menengah */ <span className="bg-sky-950/60 text-sky-300 ...">Menengah</span>
/* Mahir */    <span className="bg-purple-950/60 text-purple-300 ...">Mahir</span>
```

### 4E. Progress Bars

```tsx
/* ===== XP PROGRESS BAR ===== */
/* Selalu tampilkan persentase dan label level */
<div className="space-y-1.5">
  <div className="flex justify-between items-center text-xs">
    <span className="text-[#8BA98F] font-medium">Level 5 — Excel Expert</span>
    <span className="text-amber-400 font-bold font-mono">720 / 1000 XP</span>
  </div>
  <div className="h-2 bg-[#1E3022] rounded-full overflow-hidden">
    <div
      className="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full
        shadow-[0_0_10px_rgba(22,163,74,0.5)]
        transition-all duration-700 ease-out"
      style={{ width: '72%' }}
    />
  </div>
</div>

/* ===== COURSE PROGRESS BAR ===== */
<div className="h-1.5 bg-[#1E3022] rounded-full overflow-hidden">
  <div className="h-full bg-green-500 rounded-full transition-all duration-500"
    style={{ width: `${progress}%` }} />
</div>

/* ===== QUIZ TIMER BAR ===== */
/* Berubah dari hijau → kuning → merah sesuai sisa waktu */
<div className="h-1 bg-[#1E3022] rounded-full overflow-hidden">
  <div className="h-full rounded-full transition-all duration-1000 linear"
    style={{
      width: `${timePercent}%`,
      backgroundColor: timePercent > 50 ? '#16A34A' : timePercent > 25 ? '#F59E0B' : '#EF4444',
      boxShadow: `0 0 8px ${timePercent > 50 ? 'rgba(22,163,74,.5)' : timePercent > 25 ? 'rgba(245,158,11,.5)' : 'rgba(239,68,68,.5)'}`
    }}
  />
</div>
```

### 4F. Navigation & Sidebar

```tsx
/* ===== SIDEBAR ===== */
<aside className="
  w-64 h-screen fixed left-0 top-0
  bg-[#0D1610] border-r border-[#1E3022]
  flex flex-col
  z-40
">
  {/* Logo area */}
  <div className="h-16 flex items-center px-6 border-b border-[#1E3022]">
    {/* Logo BisaExcel */}
  </div>
  {/* Nav items */}
  <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
    {/* ACTIVE nav item */}
    <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg
      bg-green-600/15 border border-green-600/20
      text-green-400 font-semibold text-sm">
      <LayoutDashboard className="h-4 w-4" />
      Dashboard
    </a>
    {/* INACTIVE nav item */}
    <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg
      text-[#8BA98F] hover:text-[#E8F0EA] hover:bg-[#1C2E20]
      font-medium text-sm transition-colors">
      <BookOpen className="h-4 w-4" />
      Kursus
    </a>
  </nav>
  {/* User profile area (bottom) */}
  <div className="p-4 border-t border-[#1E3022]">
    {/* XP bar mini + avatar + nama */}
  </div>
</aside>

/* ===== TOP NAVBAR (public/landing) ===== */
<header className="
  fixed top-0 left-0 right-0 z-50
  bg-[#080E0A]/80 backdrop-blur-md
  border-b border-[#1E3022]
  h-16 flex items-center
">
```

### 4G. Toast Notifications

```tsx
/* Setup Sonner dengan dark theme — di main.tsx */
<Toaster
  theme="dark"
  toastOptions={{
    classNames: {
      toast: 'bg-[#111E14] border-[#254A2A] text-[#E8F0EA]',
      success: 'border-green-700/50',
      error: 'border-red-700/50',
    }
  }}
/>

/* XP Gained — custom toast (WAJIB animasi counter) */
toast.custom((t) => (
  <div className="flex items-center gap-3
    bg-[#111E14] border border-amber-800/50
    rounded-xl px-4 py-3 shadow-[0_4px_24px_rgba(0,0,0,.5)]">
    <div className="w-10 h-10 rounded-full bg-amber-950 border border-amber-700/50
      flex items-center justify-center flex-shrink-0">
      <Zap className="h-5 w-5 text-amber-400" />
    </div>
    <div>
      <p className="text-amber-300 font-bold text-sm">+30 XP Diperoleh!</p>
      <p className="text-[#8BA98F] text-xs">Kuis bab berhasil diselesaikan</p>
    </div>
  </div>
))
```

### 4H. Modal & Dialog

```tsx
/* Gunakan shadcn Dialog dengan override styling dark */
<DialogContent className="
  bg-[#111E14] border border-[#254A2A]
  text-[#E8F0EA]
  rounded-2xl
  shadow-[0_24px_64px_rgba(0,0,0,.7)]
  max-w-lg
">
  <DialogHeader>
    <DialogTitle className="text-[#E8F0EA] font-bold text-xl" />
    <DialogDescription className="text-[#8BA98F] text-sm" />
  </DialogHeader>
</DialogContent>
```

### 4I. Loading Skeletons (Dark Version)

```tsx
/* Card skeleton */
<div className="bg-[#111E14] rounded-xl overflow-hidden border border-[#1E3022]">
  <div className="h-44 bg-[#1C2E20] animate-pulse" />
  <div className="p-4 space-y-3">
    <div className="h-4 bg-[#1C2E20] rounded animate-pulse w-3/4" />
    <div className="h-3 bg-[#1C2E20] rounded animate-pulse w-1/2" />
    <div className="h-3 bg-[#1C2E20] rounded animate-pulse w-1/3" />
  </div>
</div>
```

---

## 5. HALAMAN — SPESIFIKASI VISUAL

### 5A. Landing Page

```
STRUKTUR SECTION (urutan wajib):
  1. Navbar (fixed, blur backdrop)
  2. Hero Section
  3. Stats Bar (angka social proof)
  4. Feature Grid (3–4 fitur unggulan)
  5. Course Preview Carousel
  6. Gamification Showcase (XP, Level, Leaderboard preview)
  7. Testimonial
  8. Pricing
  9. Final CTA
  10. Footer

HERO SECTION:
  - Background: #080E0A dengan animated grid pattern SVG (garis hijau sangat redup)
  - Tagline: "Kuasai Excel, Kuasai Karirmu" → font Syne, display-xl, gradient text
  - Gradient text: from-green-400 to-green-200
  - Sub-tagline: DM Sans regular, text-[#8BA98F]
  - Glow blob: 2 circle blur (green-600/20 + sky-500/10) di background
  - CTA utama: Primary button dengan glow shadow
  - Social proof kecil: "12.000+ pelajar aktif" dengan avatar stack

STATS BAR:
  - Background: bg-[#0D1610] border-y border-[#1E3022]
  - 4 angka besar menggunakan font Syne: pelajar, kursus, rating, sertifikat
  - Animasi counter saat section masuk viewport (Framer Motion useInView)
```

### 5B. Dashboard

```
LAYOUT:
  - Sidebar 256px + konten utama
  - Top greeting: "Selamat pagi, Budi 👋" (font Plus Jakarta Sans)

GRID ATAS (4 stat cards):
  - Total XP (ikon Zap kuning)
  - Level saat ini (ikon Shield hijau)
  - Streak harian (ikon Flame oranye)
  - Rank leaderboard (ikon Trophy gold)
  - Setiap card: accent glow circle di sudut kanan atas

PROGRESS SECTION:
  - "Lanjutkan Belajar" — tampilkan kursus yang sedang dikerjakan
  - Card kursus dengan progress bar terintegrasi
  - Tombol "Lanjut Belajar" primer

DAILY QUEST:
  - Card khusus dengan border amber/gold subtle
  - Checklist quest hari ini
  - Progress bar quest
  - Reward XP yang bisa didapat

LEADERBOARD MINI:
  - Top 3 dengan crown icon (gold/silver/bronze)
  - Posisi user sendiri selalu ditampilkan (highlight hijau)
```

### 5C. Halaman Belajar (Video Player)

```
LAYOUT: Full-screen immersive, sidebar collapsed
  - Video player area: bg-black, 16:9, max-w-4xl
  - Panel kanan (25%): silabus kursus + progress

VIDEO PLAYER WRAPPER:
  - bg-[#000] rounded-xl overflow-hidden
  - Custom controls overlay dengan green accent
  - "Selesai" checkmark saat 90% ditonton

QUIZ SETELAH VIDEO:
  - Slide masuk dari kanan (Framer Motion)
  - Card opsi pilihan ganda: border highlight hijau saat dipilih
  - Correct: bg-green-950 border-green-600 text-green-300
  - Wrong: bg-red-950/50 border-red-700 text-red-300
  - XP popup: toast custom amber saat jawab benar
```

### 5D. Leaderboard

```
ELEMEN WAJIB:
  - Tab: Mingguan / Bulanan / Sepanjang Waktu
  - Top 3 highlight besar: podium visual
    #1: Crown gold, nama besar (Syne font), bg card gold-tinted
    #2: Crown silver, sedikit lebih kecil
    #3: Crown bronze
  - Tabel ranking: alternating row bg (#111E14 / #0D1610)
  - Kolom: Rank | Avatar | Nama | Level | XP minggu ini | Total XP
  - Posisi user sendiri: border-l-2 border-green-600 + bg highlight
  - Realtime badge "LIVE" di pojok kanan atas tab
```

### 5E. Halaman Kuis

```
TIMER:
  - Lingkaran progress SVG stroke di tengah atas
  - Warna berubah: hijau → kuning → merah
  - Angka detik: font Syne besar

OPSI JAWABAN:
  - 4 card opsi: bg-[#111E14] border hover:border-green-600
  - Dipilih: border-green-600 bg-green-950/30
  - Benar: border-green-500 bg-green-950/50 + check icon
  - Salah: border-red-600 bg-red-950/30 + X icon

HASIL KUIS:
  - Score besar (font Syne) dengan warna sesuai nilai
    > 80%: text-green-400 + confetti Framer Motion
    50–80%: text-amber-400
    < 50%: text-red-400
  - Breakdown jawaban benar/salah
  - XP earned badge
  - Tombol: "Coba Lagi" (outline) | "Kursus Berikutnya" (primary)
```

---

## 6. EFEK VISUAL & ANIMASI

### 6A. Aturan Animasi

```
PRINSIP:
  - Animasi harus BERMAKNA, bukan dekoratif semata
  - Durasi pendek: 150–300ms untuk interaksi
  - Durasi sedang: 300–500ms untuk transisi halaman
  - Durasi panjang: 600–1000ms hanya untuk gamifikasi (XP counter, level up)
  - Gunakan ease-out untuk elemen masuk, ease-in untuk keluar

JANGAN animasikan:
  - Teks panjang yang sedang dibaca
  - Form input biasa
  - Loading skeleton (cukup pulse)

WAJIB dianimasi:
  - Page transition (opacity + y offset)
  - Card list (stagger)
  - XP counter naik (spring animation)
  - Level up notification (scale + opacity)
  - Progress bar (width transition)
  - Quiz result score counter
```

### 6B. Efek Khusus (Hanya Untuk Elemen Spesifik)

```css
/* Glow button CTA */
.btn-primary-glow {
  box-shadow: 0 0 20px rgba(22, 163, 74, 0.30);
}
.btn-primary-glow:hover {
  box-shadow: 0 0 32px rgba(22, 163, 74, 0.50);
}

/* XP bar glow */
.xp-bar-fill {
  box-shadow: 0 0 10px rgba(22, 163, 74, 0.50),
              0 0 20px rgba(22, 163, 74, 0.20);
}

/* Active nav item left accent */
.nav-active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 25%;
  height: 50%;
  width: 3px;
  background: #16A34A;
  border-radius: 0 4px 4px 0;
}

/* Card hover glow ring */
.card-interactive:hover {
  box-shadow: 0 0 0 1px rgba(22,163,74,.15),
              0 8px 32px rgba(0,0,0,.5);
}

/* Grid pattern (hero background) */
.hero-grid {
  background-image:
    linear-gradient(rgba(22,163,74,.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(22,163,74,.04) 1px, transparent 1px);
  background-size: 48px 48px;
}
```

### 6C. Level Up Sequence (Gamifikasi Premium)

```tsx
/* Saat user naik level — WAJIB tampilan ini, bukan toast biasa */
/* Implementasi: komponen LevelUpOverlay */

// 1. Overlay gelap fade in
// 2. Card muncul dengan scale spring (0.5 → 1.05 → 1.0)
// 3. Level badge pulse + glow
// 4. Teks level baru counter naik
// 5. XP reward animasi
// 6. Confetti (menggunakan canvas-confetti)
// 7. Delay 3 detik → fade out otomatis

// Warna confetti: #16A34A, #22C55E, #F59E0B, #38BDF8
```

---

## 7. DARK MODE ADALAH DEFAULT

```
BisaExcel.com menggunakan DARK MODE sebagai mode utama dan SATU-SATUNYA.
Tidak ada light mode toggle.

Alasan:
  - Identitas visual "premium dark" adalah keunggulan kompetitif
  - Konsistensi penuh lebih baik dari dua mode setengah-setengah
  - Target audiens (pekerja kantoran) sering pakai platform malam hari

KONSEKUENSI:
  - Semua class Tailwind yang digunakan adalah versi dark
  - Jangan pakai bg-white, text-gray-900, atau warna terang sebagai base
  - shadcn/ui: override semua CSS variable ke dark theme di src/index.css
  - Image/thumbnail kursus: tampilkan dengan overlay gradient bawah agar menyatu
```

---

## 8. SRC/INDEX.CSS — SETUP WAJIB (Vite)

```css
/* src/index.css — Vite entry CSS untuk BisaExcel dark theme */

@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Syne:wght@700;800&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 3%;        /* #080E0A approximate */
    --foreground: 120 10% 93%;    /* #E8F0EA approximate */
    --card: 120 20% 9%;
    --card-foreground: 120 10% 93%;
    --primary: 142 72% 42%;       /* green-600 */
    --primary-foreground: 0 0% 100%;
    --secondary: 120 15% 14%;
    --secondary-foreground: 120 8% 70%;
    --muted: 120 10% 12%;
    --muted-foreground: 120 8% 55%;
    --accent: 120 15% 16%;
    --accent-foreground: 120 8% 80%;
    --destructive: 0 84% 60%;
    --border: 120 20% 14%;
    --input: 120 20% 10%;
    --ring: 142 72% 42%;
    --radius: 0.75rem;
  }

  * {
    @apply border-[#1E3022];
  }

  body {
    @apply bg-[#080E0A] text-[#E8F0EA];
    font-family: 'DM Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Plus Jakarta Sans', sans-serif;
  }

  /* Scrollbar dark */
  ::-webkit-scrollbar        { width: 6px; }
  ::-webkit-scrollbar-track  { background: #0D1610; }
  ::-webkit-scrollbar-thumb  { background: #254A2A; border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: #2D6A35; }
}
```

---

## 9. TAILWIND CONFIG — Vite Setup Wajib

```ts
// tailwind.config.ts — Vite + React setup
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  // Vite: scan semua file di src/
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand tokens — gunakan ini di class Tailwind
        'be-base'         : '#080E0A',
        'be-elevated'     : '#0D1610',
        'be-card'         : '#111E14',
        'be-overlay'      : '#1C2E20',
        'be-border'       : '#1E3022',
        'be-border-strong': '#254A2A',
        'be-text'         : '#E8F0EA',
        'be-muted'        : '#8BA98F',
        'be-dim'          : '#4D6650',
      },
      fontFamily: {
        'heading' : ['Plus Jakarta Sans', 'sans-serif'],
        'body'    : ['DM Sans', 'sans-serif'],
        'mono'    : ['JetBrains Mono', 'monospace'],
        'display' : ['Syne', 'sans-serif'],
      },
      boxShadow: {
        'glow-green'    : '0 0 20px rgba(22,163,74,0.30)',
        'glow-green-lg' : '0 0 40px rgba(22,163,74,0.25)',
        'glow-gold'     : '0 0 16px rgba(245,158,11,0.30)',
        'card'          : '0 2px 12px rgba(0,0,0,0.40)',
        'card-hover'    : '0 4px 24px rgba(0,0,0,0.60)',
      },
      keyframes: {
        'xp-pulse': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(22,163,74,.4)' },
          '50%':      { boxShadow: '0 0 20px rgba(22,163,74,.7)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        'xp-pulse' : 'xp-pulse 2s ease-in-out infinite',
        'float'    : 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
```

---

## 10. VITE CONFIG — Setup Wajib

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@'         : path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages'    : path.resolve(__dirname, './src/pages'),
      '@hooks'    : path.resolve(__dirname, './src/hooks'),
      '@stores'   : path.resolve(__dirname, './src/stores'),
      '@lib'      : path.resolve(__dirname, './src/lib'),
      '@types'    : path.resolve(__dirname, './src/types'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      // Proxy API calls ke Laravel dev server saat development
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '/sanctum': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
})
```

---

## 11. CHECKLIST DESAIN — WAJIB SEBELUM PUSH

```
SETIAP KOMPONEN / HALAMAN BARU:
□ Menggunakan warna dari token di Section 1 (bukan hex bebas)
□ Dark background — tidak ada bg-white atau bg-slate-50
□ Hover state terdefinisi untuk semua elemen interaktif
□ Focus state aksesibel (focus-visible ring dengan offset dark)
□ Loading skeleton sudah ada (dark version)
□ Empty state sudah ada dengan ilustrasi/ikon + pesan
□ Error state sudah ada (termasuk API error dari Laravel)
□ Responsive (375px, 768px, 1280px) sudah dicek
□ Tidak ada warna Tailwind sembarangan di luar design token
□ Animasi menggunakan Framer Motion (bukan CSS keyframe ad-hoc)
□ Font yang dipakai sesuai hierarki di Section 2
□ Semua teks punya kontras cukup di atas dark background
□ API loading state ditangani (TanStack Query isLoading/isError)
```

---

## 12. REFERENSI CEPAT KELAS TAILWIND (MOST USED)

```
Background:
  bg-[#080E0A]    → body
  bg-[#0D1610]    → sidebar, elevated
  bg-[#111E14]    → card, modal
  bg-[#1C2E20]    → hover overlay, tooltip

Text:
  text-[#E8F0EA]  → primary text
  text-[#8BA98F]  → secondary/muted text
  text-[#4D6650]  → disabled/dim text
  text-green-400  → green accent text
  text-amber-400  → xp/reward text

Border:
  border-[#1E3022]      → subtle border
  border-[#254A2A]      → default border
  border-green-700/50   → green subtle border
  border-green-600      → active/focus border

Shadow:
  shadow-[0_2px_12px_rgba(0,0,0,.40)]   → card default
  shadow-[0_0_20px_rgba(22,163,74,.30)] → green glow
```

---

*DESIGN.md v2.0 — BisaExcel.com*
*Stack: Vite (React 18 + TypeScript) + Laravel 11*
*Selalu update file ini setiap ada keputusan visual baru*
*Baca bersama AGENTS.md sebelum memulai*