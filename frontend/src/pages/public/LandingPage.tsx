import { ArrowRight, BadgeCheck, BarChart3, BookOpen, BriefcaseBusiness, Building2, CheckCircle2, FileSpreadsheet, GraduationCap, Lightbulb, LineChart, Linkedin, PlayCircle, Sparkles, Target, Users, Wrench, Youtube } from 'lucide-react'
import type { ComponentType, ReactNode } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { PageMeta } from '@/components/shared/PageMeta'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'

const problemCards = [
  {
    title: 'Belajar Excel masih acak',
    body: 'Banyak orang tahu rumus, tapi belum tahu kapan dan bagaimana memakainya dalam pekerjaan.',
  },
  {
    title: 'Tutorial sering tidak terstruktur',
    body: 'Materi tersebar, tapi tidak selalu membentuk alur belajar dari pemula sampai siap kerja.',
  },
  {
    title: 'Latihan kurang realistis',
    body: 'Belajar Excel akan lebih terasa kalau langsung dipakai untuk membaca data, membuat laporan, dan menyelesaikan kasus.',
  },
] as const

const productPillars = [
  {
    title: 'Belajar Terstruktur',
    body: 'Materi disusun dari dasar agar pemula tidak bingung harus mulai dari mana.',
    icon: BookOpen,
  },
  {
    title: 'Video Tutorial',
    body: 'Belajar lewat video Excel berbahasa Indonesia yang mudah diikuti.',
    icon: PlayCircle,
  },
  {
    title: 'Latihan dan Test',
    body: 'Kerjakan soal dan file kasus agar skill Excel tidak berhenti di teori.',
    icon: Wrench,
  },
  {
    title: 'Progress Belajar',
    body: 'Pantau skor, waktu, badge, level, dan perkembangan skill kamu.',
    icon: LineChart,
  },
] as const

const audiences = [
  { title: 'Pemula', body: 'Baru mulai belajar Excel dan ingin punya alur belajar yang jelas.', icon: Sparkles },
  { title: 'Karyawan Kantor', body: 'Ingin lebih cepat mengolah data, membuat laporan, dan bekerja lebih efisien.', icon: BriefcaseBusiness },
  { title: 'Mahasiswa dan Pelajar', body: 'Ingin punya skill Excel yang berguna untuk tugas, magang, dan persiapan kerja.', icon: GraduationCap },
  { title: 'Guru dan Tenaga Pendidikan', body: 'Ingin mengelola nilai, data siswa, dan administrasi dengan lebih rapi.', icon: Users },
  { title: 'UMKM', body: 'Ingin membuat laporan sederhana untuk penjualan, stok, keuangan, dan operasional.', icon: BarChart3 },
  { title: 'HRD dan Perusahaan', body: 'Ingin membantu tim meningkatkan kemampuan Excel untuk kebutuhan kerja.', icon: Building2 },
] as const

const skills = [
  'Rumus dasar Excel',
  'Fungsi IF, SUMIF, COUNTIF',
  'Lookup dan pencarian data',
  'Tabel dan format data',
  'Pivot table',
  'Dashboard sederhana',
  'Pengolahan data kerja',
  'Laporan penjualan',
  'Laporan HRD',
  'Analisis bisnis sederhana',
  'Tips kerja cepat dengan Excel',
  'Pattern REGEX dan LAMBDA untuk kebutuhan lanjutan',
] as const

const learningSteps = [
  { title: 'Mulai dari Dasar', body: 'Kenali tampilan Excel, cell, sheet, table, dan konsep data.' },
  { title: 'Pelajari Rumus Penting', body: 'Kuasai rumus yang paling sering dipakai di kantor dan bisnis.' },
  { title: 'Tonton Video Tutorial', body: 'Ikuti penjelasan bertahap lewat video berbahasa Indonesia.' },
  { title: 'Kerjakan Latihan dan File Kasus', body: 'Gunakan file Excel untuk latihan dari contoh data yang lebih realistis.' },
  { title: 'Ikuti Test Excel', body: 'Ukur kemampuan kamu lewat soal, skor, waktu, dan progress belajar.' },
] as const

const features = [
  { title: 'Belajar', body: 'Materi Excel dari dasar sampai kebutuhan kerja.', to: ROUTES.LEARN, icon: BookOpen },
  { title: 'Video', body: 'Tutorial Excel Bahasa Indonesia yang mudah diikuti.', to: ROUTES.VIDEO, icon: PlayCircle },
  { title: 'Test Excel', body: 'Latihan soal, file kasus, timer, skor, dan progress.', to: ROUTES.TEST_EXCEL, icon: Target },
  { title: 'Excel Tips', body: 'Pusat rumus bisnis, LAMBDA, REGEX, shortcut, dan tips Excel praktis.', to: ROUTES.EXCEL_TIPS, icon: Lightbulb },
  { title: 'Template', body: 'File siap pakai untuk membantu pekerjaan dan latihan.', to: ROUTES.TEMPLATES, icon: FileSpreadsheet },
  { title: 'Kelas', body: 'Program belajar untuk individu, tim, atau perusahaan.', to: ROUTES.CLASSES, icon: Users },
] as const

const gamificationPoints = ['XP dan level', 'badge belajar', 'streak latihan', 'skor test', 'ranked point', 'leaderboard belajar'] as const

const trustBadges = ['10+ Tahun di Dunia Training', 'Certified Trainer BNSP', 'People Development', 'Excel Enthusiast', 'YouTube Channel'] as const

// TODO: Lengkapi data mentor/founder setelah audit LinkedIn manual selesai.
const mentorProfile = {
  name: 'Sofyan Sori',
  headline: '10+ Years Experience in People Development',
  credentials: ['Certified Trainer BNSP', 'Soft Skill Trainer', 'Retail Trainer', 'Excellent Service Trainer', 'Excel Enthusiast', 'OBS Enthusiast', 'Ex. Education Training Division Indomaret Group'],
  location: 'East Java, Indonesia',
  followers: '3.472 followers',
  connections: '500+ connections',
  linkedinUrl: 'https://www.linkedin.com/in/sofyan-sori-c-ctr/?isSelfProfile=false',
  youtubeUrl: 'https://www.youtube.com/@Bisa_Excel',
  photoUrl: '/images/mentors/SofyanSori.png',
  bannerUrl: '/images/mentors/Banner.png',
}

export function LandingPage() {
  return (
    <PublicLayout>
      <PageMeta title="Kuasai Excel, Kuasai Karirmu" />
      <HeroSection />
      <WhySection />
      <WhatIsSection />
      <AudienceSection />
      <SkillsSection />
      <LearningFlowSection />
      <FeaturesSection />
      <GamificationSection />
      <CredibilitySection />
      <FinalCtaSection />
    </PublicLayout>
  )
}

function HeroSection() {
  return (
    <section className="hero-grid pt-28 sm:pt-32">
      <div className="motion-page mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:pb-24">
        <div className="max-w-4xl">
          <span className="inline-flex rounded-full border border-green-700/50 bg-green-950/60 px-3 py-1.5 text-xs font-bold text-green-300">Belajar Excel dalam Bahasa Indonesia</span>
          <h1 className="mt-6 max-w-4xl font-display text-5xl font-bold leading-tight text-[#E8F0EA] sm:text-6xl lg:text-7xl">Kuasai Excel, Kuasai Karirmu</h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-[#8BA98F] sm:text-lg">Belajar Microsoft Excel dari dasar dengan video tutorial, materi terstruktur, latihan kasus, dan test interaktif yang dibuat untuk kebutuhan kerja nyata.</p>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#8BA98F] sm:text-base">Cocok untuk pemula, karyawan kantor, pelajar, mahasiswa, guru, UMKM, admin, finance, HRD, dan siapa pun yang ingin lebih percaya diri menggunakan Excel.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg"><Link to={ROUTES.LEARN}>Mulai Belajar<ArrowRight className="h-4 w-4" /></Link></Button>
            <Button asChild size="lg" variant="outline"><a href="#alur-belajar">Lihat Alur Belajar</a></Button>
          </div>
        </div>
      </div>
    </section>
  )
}

function WhySection() {
  return (
    <SectionFrame>
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <SectionHeading eyebrow="Kenapa" title="Kenapa BisaExcel Dibuat?" description="Excel dipakai hampir di semua pekerjaan, tapi banyak orang belajar Excel secara acak: menonton tutorial terpisah, menghafal rumus tanpa konteks, lalu bingung saat harus mengerjakan data kerja yang sebenarnya." />
        <div>
          <p className="text-base leading-8 text-[#8BA98F]">BisaExcel hadir untuk membantu kamu belajar Excel dengan alur yang lebih jelas: mulai dari dasar, memahami rumus penting, latihan dari file kasus, sampai mengukur kemampuan lewat test.</p>
          <div className="motion-stagger mt-6 grid gap-4 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {problemCards.map((item) => <InfoCard key={item.title} title={item.title} body={item.body} />)}
          </div>
        </div>
      </div>
    </SectionFrame>
  )
}

function WhatIsSection() {
  return (
    <SectionFrame tone="muted">
      <SectionHeading eyebrow="Platform" title="Apa Itu BisaExcel?" description="BisaExcel.com adalah platform belajar Microsoft Excel dalam Bahasa Indonesia yang membantu kamu memahami rumus, fungsi, tabel, pivot, lookup, dashboard, dan fitur penting Excel lainnya secara lebih terarah." />
      <p className="mt-5 max-w-3xl text-base leading-8 text-[#8BA98F]">Di sini kamu bisa belajar lewat video, membaca materi, mencoba latihan, mengunduh file kasus, mengikuti test Excel, dan melihat progress kemampuanmu dari waktu ke waktu.</p>
      <div className="motion-stagger mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {productPillars.map((pillar) => <IconCard key={pillar.title} item={pillar} />)}
      </div>
    </SectionFrame>
  )
}

function AudienceSection() {
  return (
    <SectionFrame>
      <SectionHeading eyebrow="Pengguna" title="BisaExcel Cocok Untuk Siapa?" description="BisaExcel dibuat untuk orang yang ingin belajar Excel dengan alur praktis, bukan sekadar mengumpulkan rumus tanpa konteks kerja." />
      <div className="motion-stagger mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {audiences.map((item) => <IconCard key={item.title} item={item} />)}
      </div>
    </SectionFrame>
  )
}

function SkillsSection() {
  return (
    <SectionFrame tone="muted">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <SectionHeading eyebrow="Materi" title="Apa yang Bisa Kamu Pelajari?" description="Materi belajar Excel dibuat agar kamu tidak hanya tahu rumus, tapi juga paham cara memakai Excel untuk menyelesaikan pekerjaan nyata." />
        <div className="motion-stagger grid gap-3 sm:grid-cols-2">
          {skills.map((skill) => (
            <div className="motion-card flex items-start gap-3 rounded-xl border border-[#1E3022] bg-[#111E14] px-4 py-3" key={skill}>
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
              <span className="text-sm leading-6 text-[#E8F0EA]">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </SectionFrame>
  )
}

function LearningFlowSection() {
  return (
    <SectionFrame id="alur-belajar">
      <SectionHeading eyebrow="Alur" title="Alur Belajar yang Lebih Jelas" description="Mulai dari dasar, naik ke rumus penting, lalu latihan lewat file kasus dan test Excel agar progress belajar lebih terlihat." />
      <div className="motion-stagger mt-10 grid gap-4 lg:grid-cols-5">
        {learningSteps.map((step, index) => (
          <div className="motion-card rounded-2xl border border-[#1E3022] bg-[#111E14] p-5 shadow-card" key={step.title}>
            <span className="font-display text-3xl font-bold text-green-400">{index + 1}</span>
            <h3 className="mt-4 font-heading text-lg font-bold text-[#E8F0EA]">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-[#8BA98F]">{step.body}</p>
          </div>
        ))}
      </div>
    </SectionFrame>
  )
}

function FeaturesSection() {
  return (
    <SectionFrame tone="muted">
      <SectionHeading eyebrow="Fitur" title="Fitur Utama BisaExcel" description="Fitur detail seperti Test Excel, Excel Tips, Video, Template, dan Kelas diperkenalkan singkat agar homepage tetap clean dan mudah dipahami." />
      <div className="motion-stagger mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <Link className="motion-card group rounded-2xl border border-[#1E3022] bg-[#111E14] p-5 shadow-card transition-colors hover:border-[#254A2A] hover:bg-[#162419]" key={feature.title} to={feature.to}>
              <Icon className="motion-icon h-7 w-7 text-green-400" />
              <h3 className="mt-4 font-heading text-lg font-bold text-[#E8F0EA]">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#8BA98F]">{feature.body}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-green-400 group-hover:text-green-300">Pelajari fitur ini<ArrowRight className="motion-icon h-4 w-4" /></span>
            </Link>
          )
        })}
      </div>
    </SectionFrame>
  )
}

function GamificationSection() {
  return (
    <SectionFrame>
      <div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-center">
        <SectionHeading eyebrow="Progress" title="Belajar Lebih Terarah, Progress Lebih Terlihat" description="BisaExcel juga menyiapkan elemen gamifikasi seperti XP, level, badge, streak, dan leaderboard agar proses belajar terasa lebih hidup. Kamu bisa melihat perkembangan skill dari waktu ke waktu, bukan sekadar menonton materi lalu lupa." />
        <div className="motion-card rounded-2xl border border-[#254A2A] bg-[#111E14] p-5 shadow-card">
          <div className="motion-stagger grid gap-3 sm:grid-cols-2">
            {gamificationPoints.map((point) => <span className="motion-card rounded-xl border border-[#1E3022] bg-[#0D1610] px-4 py-3 text-sm font-semibold text-[#E8F0EA]" key={point}>{point}</span>)}
          </div>
        </div>
      </div>
    </SectionFrame>
  )
}

function CredibilitySection() {
  return (
    <SectionFrame tone="muted">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-center">
        <div>
          <SectionHeading eyebrow="Mentor" title="Dibangun dari Pengalaman Training dan Edukasi Skill Kerja" description="BisaExcel terinspirasi dari pengalaman Sofyan Sori di dunia training, people development, dan edukasi skill kerja selama lebih dari 10 tahun. Sebagai Certified Trainer BNSP dan praktisi training, pendekatan BisaExcel dibuat agar belajar Excel terasa lebih terarah, praktis, dan mudah dipahami." />
          <p className="mt-5 max-w-3xl text-base leading-8 text-[#8BA98F]">Di BisaExcel, pengguna tidak hanya menghafal rumus. Mereka diarahkan untuk belajar dari dasar, mencoba file latihan, memahami fungsi penting Excel, lalu mengukur kemampuan lewat Test Excel.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {trustBadges.map((badge) => <span className="rounded-full border border-[#254A2A] bg-[#111E14] px-3 py-1.5 text-xs font-semibold text-green-300" key={badge}>{badge}</span>)}
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a className="inline-flex items-center gap-2 text-sm font-semibold text-green-400 hover:text-green-300" href={mentorProfile.youtubeUrl} rel="noreferrer" target="_blank"><Youtube className="h-4 w-4" />Lihat Channel YouTube</a>
            <a className="inline-flex items-center gap-2 text-sm font-semibold text-green-400 hover:text-green-300" href={mentorProfile.linkedinUrl} rel="noreferrer" target="_blank"><Linkedin className="h-4 w-4" />Lihat Profil LinkedIn</a>
          </div>
        </div>
        <MentorProfileCard />
      </div>
    </SectionFrame>
  )
}

function MentorProfileCard() {
  const [profileImageFailed, setProfileImageFailed] = useState(false)
  const [bannerImageFailed, setBannerImageFailed] = useState(false)

  return (
    <div className="motion-card rounded-2xl border border-[#254A2A] bg-[#111E14] p-5 shadow-card">
      <div className="overflow-hidden rounded-2xl border border-[#1E3022] bg-[#0D1610] shadow-[0_18px_60px_rgba(0,0,0,.35)]">
        {!bannerImageFailed ? (
          <img
            alt="Banner pengalaman training Sofyan Sori lebih dari 10 tahun."
            className="aspect-[4/1] w-full object-cover object-center"
            loading="lazy"
            onError={() => setBannerImageFailed(true)}
            src={mentorProfile.bannerUrl}
          />
        ) : (
          <div className="flex aspect-[4/1] w-full items-center justify-center bg-[#0D1610] px-5 text-center">
            <span className="text-sm font-bold text-amber-300 sm:text-base">10+ Tahun di Dunia Training</span>
          </div>
        )}
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-[128px_minmax(0,1fr)] sm:items-center lg:grid-cols-1">
        <div className="relative overflow-hidden rounded-2xl border border-[#1E3022] bg-[#0D1610] shadow-[0_18px_60px_rgba(0,0,0,.35)]">
          {!profileImageFailed ? (
            <img
              alt="Foto Sofyan Sori, Certified Trainer BNSP dan praktisi people development."
              className="aspect-[4/5] w-full object-cover object-top"
              loading="lazy"
              onError={() => setProfileImageFailed(true)}
              src={mentorProfile.photoUrl}
            />
          ) : (
            <div className="flex aspect-[4/5] w-full items-center justify-center bg-[#0D1610]">
              <span className="flex h-20 w-20 items-center justify-center rounded-2xl border border-green-700/50 bg-green-950/60 font-display text-3xl font-bold text-green-300">SS</span>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-[#1E3022] bg-[#0D1610] p-4">
          <h3 className="font-heading text-xl font-bold text-[#E8F0EA]">{mentorProfile.name}</h3>
          <p className="mt-1 text-sm font-semibold text-green-300">Certified Trainer BNSP</p>
          <p className="mt-3 text-sm leading-6 text-[#8BA98F]">10+ Tahun di Dunia Training</p>
          <p className="text-sm leading-6 text-[#8BA98F]">People Development • Excel Enthusiast</p>
          <p className="mt-3 text-sm text-[#8BA98F]">{mentorProfile.location}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-[#8BA98F]">
            <span className="rounded-full border border-[#254A2A] px-2.5 py-1">{mentorProfile.followers}</span>
            <span className="rounded-full border border-[#254A2A] px-2.5 py-1">{mentorProfile.connections}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
function FinalCtaSection() {
  return (
    <section className="motion-section bg-[#0D1610] py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <BadgeCheck className="mx-auto h-10 w-10 text-green-400" />
        <h2 className="mt-5 font-display text-4xl font-bold text-[#E8F0EA]">Mulai Belajar Excel dengan Alur yang Lebih Jelas</h2>
        <p className="mt-4 text-base leading-8 text-[#8BA98F]">Belajar pelan-pelan dari dasar, latihan dari file kasus, lalu ukur kemampuan kamu lewat Test Excel.</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg"><Link to={ROUTES.LEARN}>Mulai Belajar<ArrowRight className="h-4 w-4" /></Link></Button>
          <Link className="text-sm font-semibold text-green-400 hover:text-green-300" to={ROUTES.TEST_EXCEL}>Lihat Test Excel</Link>
        </div>
      </div>
    </section>
  )
}

function SectionFrame({ children, tone = 'default', id }: { children: ReactNode; tone?: 'default' | 'muted'; id?: string }) {
  return <section className={tone === 'muted' ? 'motion-section bg-[#0D1610] py-16 lg:py-24' : 'motion-section py-16 lg:py-24'} id={id}><div className="mx-auto max-w-7xl px-4 sm:px-6">{children}</div></section>
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <div className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-400">{eyebrow}</p><h2 className="mt-3 font-heading text-3xl font-bold leading-tight text-[#E8F0EA] sm:text-4xl">{title}</h2><p className="mt-3 text-sm leading-7 text-[#8BA98F] sm:text-base">{description}</p></div>
}

function InfoCard({ title, body }: { title: string; body: string }) {
  return <div className="motion-card rounded-2xl border border-[#1E3022] bg-[#111E14] p-5 shadow-card"><h3 className="font-heading text-lg font-bold text-[#E8F0EA]">{title}</h3><p className="mt-2 text-sm leading-6 text-[#8BA98F]">{body}</p></div>
}

function IconCard({ item }: { item: { title: string; body: string; icon: ComponentType<{ className?: string }> } }) {
  const Icon = item.icon
  return <div className="motion-card rounded-2xl border border-[#1E3022] bg-[#111E14] p-5 shadow-card"><Icon className="motion-icon h-7 w-7 text-green-400" /><h3 className="mt-4 font-heading text-lg font-bold text-[#E8F0EA]">{item.title}</h3><p className="mt-2 text-sm leading-6 text-[#8BA98F]">{item.body}</p></div>
}









