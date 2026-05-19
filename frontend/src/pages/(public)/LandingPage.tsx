import {
  ArrowRight,
  Bot,
  BookOpen,
  Brain,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Crown,
  Database,
  FileSpreadsheet,
  GraduationCap,
  HelpCircle,
  Keyboard,
  Library,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Star,
  Swords,
  Target,
  Trophy,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { PageMeta } from '@/components/shared/PageMeta'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/lib/utils'

type StatItem = {
  value: string
  label: string
}

type IconCard = {
  title: string
  description: string
  icon: LucideIcon
  items: string[]
}

type CareerCard = {
  title: string
  level: string
  duration: string
  challenge: string
  skills: string[]
}

type PricingCard = {
  name: string
  price: string
  subtitle: string
  target: string
  features: string[]
  cta: string
  to: string
  featured?: boolean
}

const heroStats: StatItem[] = [
  { value: '260+', label: 'Video pembelajaran' },
  { value: '72+', label: 'Bank soal kerja' },
  { value: '12.000+', label: 'Peserta belajar' },
  { value: 'Live', label: 'Leaderboard aktif' },
]

const ecosystemCards: IconCard[] = [
  {
    title: 'Career Learning',
    description: 'Belajar Excel berdasarkan pekerjaan nyata, bukan teori kosong.',
    icon: Briefcase,
    items: ['HRD', 'Office admin', 'Finance', 'Inventory'],
  },
  {
    title: 'Excel Esport',
    description: 'Mode kompetitif untuk mengukur skill Excel secara objektif.',
    icon: Swords,
    items: ['Leaderboard', 'Ranked battle', 'Logic arena', 'Speed challenge'],
  },
  {
    title: 'Practice System',
    description: 'Latihan interaktif berbasis studi kasus dan simulasi kantor.',
    icon: ClipboardCheck,
    items: ['Simulasi kerja', 'Timed challenge', 'Quiz', 'Practice file'],
  },
  {
    title: 'Mentorship',
    description: 'Pendampingan privat untuk solusi kerja dan percepatan skill.',
    icon: Users,
    items: ['Private session', 'Custom learning', 'Office problem solving'],
  },
]

const careerPaths: CareerCard[] = [
  {
    title: 'HR Admin Path',
    level: 'Pemula - Menengah',
    duration: '4 minggu',
    challenge: 'Payroll case',
    skills: ['Payroll', 'Absensi', 'Database karyawan'],
  },
  {
    title: 'Office Admin Path',
    level: 'Entry Level',
    duration: '3 minggu',
    challenge: 'Office report',
    skills: ['Laporan kantor', 'Data entry', 'Inventory'],
  },
  {
    title: 'Finance Path',
    level: 'Menengah',
    duration: '5 minggu',
    challenge: 'Cashflow sprint',
    skills: ['Cashflow', 'Budgeting', 'Laporan bulanan'],
  },
  {
    title: 'Data & Logic Path',
    level: 'Advanced',
    duration: '6 minggu',
    challenge: 'Logic arena',
    skills: ['Lookup', 'Dashboard', 'Advanced formula'],
  },
]

const esportModes: IconCard[] = [
  {
    title: 'Logic Arena',
    description: 'Problem solving formula dan kombinasi logika tingkat lanjut.',
    icon: Brain,
    items: ['Lookup logic', 'Formula chain', 'Case scoring'],
  },
  {
    title: 'Speed Formula',
    description: 'Tantangan menyelesaikan soal dengan cepat dan akurat.',
    icon: Zap,
    items: ['Timer', 'Accuracy', 'Speed score'],
  },
  {
    title: 'No Click Challenge',
    description: 'Latihan shortcut dan workflow tanpa mouse.',
    icon: Keyboard,
    items: ['Shortcut', 'Navigation', 'Efficiency'],
  },
  {
    title: 'Battle VS Player',
    description: 'Dua user mengerjakan kasus sama dengan scoring live.',
    icon: Swords,
    items: ['Ranked', 'Casual', 'Custom room'],
  },
]

const leaderboard = [
  { rank: 1, name: 'Ayu Pratiwi', title: 'Excel King', xp: '18.420 XP', winRate: '76%' },
  { rank: 2, name: 'Rizky Maulana', title: 'Excel Elite', xp: '16.980 XP', winRate: '72%' },
  { rank: 3, name: 'Nadia Sari', title: 'Excel Warrior', xp: '15.770 XP', winRate: '69%' },
] as const

const courses = [
  {
    title: 'HR Admin Masterclass',
    level: 'Career Starter',
    progress: '82%',
    rating: '4.9',
    exercises: '24 latihan',
    esport: 'Speed quiz',
  },
  {
    title: 'VLOOKUP Advanced',
    level: 'Logic Master',
    progress: '68%',
    rating: '4.8',
    exercises: '18 latihan',
    esport: 'Logic arena',
  },
  {
    title: 'Excel Tanpa Klik',
    level: 'Productivity',
    progress: '76%',
    rating: '5.0',
    exercises: '31 shortcut',
    esport: 'No click',
  },
] as const

const practiceFeatures: IconCard[] = [
  {
    title: 'Interactive Excel Simulator',
    description: 'Latihan langsung di browser dengan input rumus dan validasi.',
    icon: FileSpreadsheet,
    items: ['Formula input', 'Auto check', 'Real dataset'],
  },
  {
    title: 'Timed Test',
    description: 'Simulasi tes kerja dengan batas waktu dan skor otomatis.',
    icon: Clock3,
    items: ['Timer', 'Score', 'Pembahasan'],
  },
  {
    title: 'Practice File',
    description: 'Download file payroll, inventory, finance, dan laporan kerja.',
    icon: Library,
    items: ['Payroll', 'Inventory', 'Finance'],
  },
  {
    title: 'AI Review',
    description: 'Analisa jawaban dan rekomendasi topik yang perlu diperbaiki.',
    icon: Bot,
    items: ['Weakness', 'Feedback', 'Next step'],
  },
]

const whyItems: IconCard[] = [
  {
    title: 'Berbasis dunia kerja',
    description: 'Materi memakai studi kasus kantor yang relevan dengan pekerjaan.',
    icon: Briefcase,
    items: ['Admin', 'HRD', 'Finance'],
  },
  {
    title: 'Excel Esport System',
    description: 'Belajar kompetitif dengan leaderboard, rank, dan challenge.',
    icon: Trophy,
    items: ['Rank', 'Battle', 'Tournament'],
  },
  {
    title: 'Simulasi kerja nyata',
    description: 'User terbiasa dengan file mentah, instruksi kerja, dan deadline.',
    icon: Database,
    items: ['Dataset', 'Deadline', 'Score'],
  },
  {
    title: 'Logic development',
    description: 'Melatih problem solving, bukan sekadar hafal rumus.',
    icon: Brain,
    items: ['Lookup', 'SUMPRODUCT', 'Dynamic array'],
  },
  {
    title: 'Mentorship intensif',
    description: 'Pendampingan langsung untuk masalah kerja dan akselerasi karir.',
    icon: GraduationCap,
    items: ['Private', 'Corporate', 'Review'],
  },
]

const pricingCards: PricingCard[] = [
  {
    name: 'Explorer',
    price: 'Gratis',
    subtitle: 'Mulai belajar Excel dari dasar.',
    target: 'Pemula, mahasiswa, fresh graduate.',
    features: ['Video dasar', 'Daily tips', 'Community forum'],
    cta: 'Mulai Gratis',
    to: ROUTES.videos,
  },
  {
    name: 'Career Starter',
    price: 'Rp 99k - 199k',
    subtitle: 'Persiapan kerja dan simulasi kantor.',
    target: 'Pencari kerja dan admin pemula.',
    features: ['72+ bank soal', 'Simulasi HRD', 'Sertifikat'],
    cta: 'Lihat Career Path',
    to: ROUTES.career,
  },
  {
    name: 'Logic Master',
    price: 'Rp 349k - 599k',
    subtitle: 'Advanced professional skill.',
    target: 'Power user, HRD, finance, analyst.',
    features: ['Logic arena', 'Ranked battle', 'AI assistant'],
    cta: 'Upgrade Skill',
    to: ROUTES.pricing,
    featured: true,
  },
  {
    name: 'VIP Mentoring',
    price: 'Rp 350k - 3.5jt',
    subtitle: 'Pendampingan personal.',
    target: 'Profesional serius dan corporate.',
    features: ['One-on-one', 'File review', 'Problem solving'],
    cta: 'Booking Session',
    to: ROUTES.pricing,
  },
]

const communityItems = [
  'Forum diskusi per modul',
  'Request insight dan voting topik',
  'Challenge komunitas mingguan',
  'Leaderboard komunitas',
] as const

const insights = [
  'Gen Z vs Kolonial di dunia kerja',
  'Shortcut kerja yang membuat admin terlihat profesional',
  'Cara membaca data kantor tanpa panik',
  'Career tips untuk tes Excel perusahaan',
] as const

const faqs = [
  {
    question: 'Apakah cocok untuk pemula?',
    answer: 'Ya. User bisa mulai dari Explorer, video dasar, daily tips, dan latihan ringan.',
  },
  {
    question: 'Apakah ada sertifikat?',
    answer: 'Ada di tier Career Starter, Logic Master, dan program tertentu yang selesai dinilai.',
  },
  {
    question: 'Apakah akses selamanya?',
    answer: 'Paket Career Starter dan Logic Master dirancang sebagai lifetime access.',
  },
  {
    question: 'Bagaimana sistem esport?',
    answer: 'User mengerjakan challenge Excel dengan penilaian speed, logic, accuracy, dan efficiency.',
  },
  {
    question: 'Apakah ada mentoring?',
    answer: 'Ada VIP Mentoring untuk sesi privat, custom learning path, dan problem solving kantor.',
  },
] as const

const sectionMotion = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.45, ease: 'easeOut' },
} as const

export function LandingPage() {
  return (
    <PublicLayout>
      <PageMeta title="Professional Excel Learning Ecosystem" />
      <HeroSection />
      <TrustSection />
      <LearningEcosystemSection />
      <CareerPathSection />
      <ExcelEsportSection />
      <FeaturedCourseSection />
      <InteractivePracticeSection />
      <WhySection />
      <PricingEcosystemSection />
      <CommunitySection />
      <MentorshipSection />
      <BlogInsightSection />
      <FaqSection />
      <FinalCtaSection />
    </PublicLayout>
  )
}

function HeroSection() {
  return (
    <section className="hero-grid relative min-h-[760px] pt-28 sm:pt-32 lg:pt-36">
      <div className="absolute inset-x-0 top-16 h-px bg-gradient-to-r from-transparent via-green-600/30 to-transparent" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 sm:px-6 lg:grid-cols-[1fr_540px] lg:pb-24">
        <motion.div {...sectionMotion} className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-900/60 bg-green-950/50 px-3 py-1.5 text-xs font-semibold text-green-300">
            <Sparkles className="h-3.5 w-3.5" />
            Professional Excel Learning Ecosystem
          </div>
          <h1 className="font-display text-5xl font-bold leading-tight tracking-normal text-[#E8F0EA] sm:text-6xl lg:text-7xl">
            Kuasai Excel,
            <span className="block bg-gradient-to-r from-green-400 to-green-200 bg-clip-text text-transparent">
              Kuasai Karirmu
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#8BA98F] sm:text-lg">
            Belajar Excel dengan praktik dunia kerja, simulasi kantor, leaderboard, challenge,
            Excel Esport, dan mentorship untuk meningkatkan skill serta karir secara nyata.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link to={ROUTES.videos}>
                Mulai Belajar Gratis
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to={ROUTES.career}>
                Jelajahi Career Path
                <Target className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to={ROUTES.esports}>
                Masuk Excel Esport
                <Swords className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            {heroStats.map((stat) => (
              <div className="rounded-xl border border-[#1E3022] bg-[#0D1610]/80 p-3" key={stat.label}>
                <p className="font-display text-2xl font-bold text-[#E8F0EA]">{stat.value}</p>
                <p className="mt-1 text-xs text-[#8BA98F]">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, -6, 0] }}
          className="relative"
          transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
        >
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  )
}

function HeroVisual() {
  return (
    <div className="rounded-2xl border border-[#254A2A] bg-[#0D1610] p-3 shadow-[0_24px_80px_rgba(0,0,0,.55)]">
      <div className="rounded-xl border border-[#1E3022] bg-[#111E14]">
        <div className="flex items-center justify-between border-b border-[#1E3022] px-4 py-3">
          <div>
            <p className="font-heading text-sm font-semibold text-[#E8F0EA]">BisaExcel Command Center</p>
            <p className="text-xs text-[#8BA98F]">Learning, career, esport, analytics</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full border border-amber-800/50 bg-amber-950/70 px-2.5 py-1 text-xs font-bold text-amber-400">
            <Zap className="h-3 w-3" />
            +720 XP
          </span>
        </div>

        <div className="grid gap-3 p-4">
          <div className="grid gap-3 sm:grid-cols-[1.2fr_0.8fr]">
            <div className="aspect-video overflow-hidden rounded-xl border border-[#1E3022] bg-[#080E0A] p-4">
              <div className="grid h-full grid-cols-6 grid-rows-4 gap-2">
                {Array.from({ length: 24 }, (_, index) => (
                  <span
                    className={cn(
                      'rounded border border-[#254A2A] bg-[#0D1610]',
                      index === 8 || index === 15 || index === 20 ? 'bg-green-600' : '',
                      index === 4 || index === 18 ? 'bg-amber-500' : '',
                    )}
                    key={index}
                  />
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-[#1E3022] bg-[#0D1610] p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8BA98F]">
                Live Rank
              </p>
              <p className="mt-3 font-display text-4xl font-bold text-amber-400">#12</p>
              <p className="mt-1 text-sm text-[#E8F0EA]">Gold II</p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#1E3022]">
                <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-green-600 to-green-400 shadow-[0_0_10px_rgba(22,163,74,0.5)]" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Simulation', value: 'HRD' },
              { label: 'Challenge', value: 'Live' },
              { label: 'Accuracy', value: '94%' },
            ].map((item) => (
              <div className="rounded-xl border border-[#1E3022] bg-[#0D1610] p-3" key={item.label}>
                <p className="text-xs text-[#8BA98F]">{item.label}</p>
                <p className="mt-1 font-heading text-base font-semibold text-[#E8F0EA]">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function TrustSection() {
  return (
    <section className="border-y border-[#1E3022] bg-[#0D1610] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {heroStats.map((stat) => (
              <motion.div {...sectionMotion} className="rounded-xl border border-[#1E3022] bg-[#111E14] p-4 text-center" key={stat.label}>
                <p className="font-display text-3xl font-bold text-[#E8F0EA]">{stat.value}</p>
                <p className="mt-2 text-xs text-[#8BA98F]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
          <motion.div {...sectionMotion} className="rounded-xl border border-[#1E3022] bg-[#111E14] p-6">
            <div className="mb-4 flex w-fit items-center gap-1 text-amber-400">
              {Array.from({ length: 5 }, (_, index) => (
                <Star className="h-4 w-4 fill-current" key={index} />
              ))}
            </div>
            <blockquote className="font-heading text-xl font-semibold leading-8 text-[#E8F0EA]">
              “Saya dulu cuma hafal rumus. Sekarang bisa menyelesaikan studi kasus kantor dan lebih percaya diri saat tes Excel.”
            </blockquote>
            <p className="mt-4 text-sm font-semibold text-green-400">Alumni Career Starter</p>
            <p className="text-sm text-[#8BA98F]">Admin HRD, Jakarta</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function LearningEcosystemSection() {
  return (
    <section className="py-16 lg:py-24" id="ekosistem">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Learning ecosystem"
          title="Ekosistem pembelajaran lengkap, bukan sekadar playlist video."
          description="Setiap sistem dirancang untuk membawa user dari belajar, praktik, bertanding, sampai siap kerja."
        />
        <CardGrid items={ecosystemCards} columns="lg:grid-cols-4" />
      </div>
    </section>
  )
}

function CareerPathSection() {
  return (
    <section className="bg-[#0D1610] py-16 lg:py-24" id="karir">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Career path"
            title="Belajar sesuai jalur karir yang ingin dikuasai."
            description="Setiap path memiliki skill, level, durasi, challenge, dan sertifikat agar progres terasa relevan dengan pekerjaan."
          />
          <Button asChild variant="outline">
            <Link to={ROUTES.career}>Lihat Career Path</Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {careerPaths.map((path) => (
            <motion.article {...sectionMotion} className="rounded-xl border border-[#1E3022] bg-[#111E14] p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-[#254A2A] hover:bg-[#162419]" key={path.title}>
              <Briefcase className="mb-5 h-6 w-6 text-green-400" />
              <h3 className="font-heading text-xl font-semibold text-[#E8F0EA]">{path.title}</h3>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-amber-400">{path.level}</p>
              <div className="mt-5 space-y-2">
                {path.skills.map((skill) => (
                  <p className="flex gap-2 text-sm text-[#8BA98F]" key={skill}>
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-green-400" />
                    {skill}
                  </p>
                ))}
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
                <span className="rounded-lg border border-[#1E3022] bg-[#0D1610] px-3 py-2 text-[#8BA98F]">{path.duration}</span>
                <span className="rounded-lg border border-[#1E3022] bg-[#0D1610] px-3 py-2 text-[#8BA98F]">{path.challenge}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ExcelEsportSection() {
  return (
    <section className="py-16 lg:py-24" id="esport">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            eyebrow="Competitive learning experience"
            title="Excel Esport membuat homepage terasa hidup."
            description="User bisa melihat rank, XP, win rate, score, mode battle, dan turnamen yang sedang berjalan."
          />
          <div className="mt-8 rounded-xl border border-amber-800/40 bg-[#111E14] p-5 shadow-card">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-amber-400">Upcoming Event</p>
                <h3 className="mt-1 font-heading text-2xl font-bold text-[#E8F0EA]">
                  National Excel Cup
                </h3>
                <p className="mt-2 text-sm text-[#8BA98F]">Weekend Double XP dan hadiah template premium.</p>
              </div>
              <CalendarDays className="h-9 w-9 text-amber-400" />
            </div>
          </div>
        </div>

        <motion.div {...sectionMotion} className="grid gap-5 md:grid-cols-2">
          <LeaderboardPreview />
          <div className="grid gap-3">
            {esportModes.map((mode) => (
              <div className="rounded-xl border border-[#1E3022] bg-[#111E14] p-4" key={mode.title}>
                <div className="flex items-center gap-3">
                  <mode.icon className="h-5 w-5 text-green-400" />
                  <p className="font-heading font-semibold text-[#E8F0EA]">{mode.title}</p>
                </div>
                <p className="mt-2 text-sm leading-6 text-[#8BA98F]">{mode.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function LeaderboardPreview() {
  return (
    <div className="rounded-xl border border-[#1E3022] bg-[#111E14] p-5 shadow-card">
      <div className="mb-5 flex items-center justify-between">
        <p className="font-heading font-semibold text-[#E8F0EA]">Live Leaderboard</p>
        <span className="rounded-full border border-green-800/50 bg-green-950/70 px-2.5 py-1 text-xs font-bold text-green-400">
          LIVE
        </span>
      </div>
      <div className="space-y-3">
        {leaderboard.map((player) => (
          <div className="rounded-lg border border-[#1E3022] bg-[#0D1610] p-3" key={player.rank}>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className={cn('font-display text-2xl font-bold', player.rank === 1 ? 'text-amber-400' : player.rank === 2 ? 'text-sky-400' : 'text-orange-300')}>
                  #{player.rank}
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#E8F0EA]">{player.name}</p>
                  <p className="text-xs text-[#8BA98F]">{player.title}</p>
                </div>
              </div>
              <Crown className={cn('h-5 w-5', player.rank === 1 ? 'text-amber-400' : 'text-[#8BA98F]')} />
            </div>
            <div className="mt-3 flex justify-between text-xs text-[#8BA98F]">
              <span>{player.xp}</span>
              <span>WR {player.winRate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function FeaturedCourseSection() {
  return (
    <section className="bg-[#0D1610] py-16 lg:py-24" id="kursus">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Kursus unggulan"
          title="Course populer dengan latihan, rating, progress, dan esport support."
          description="User bisa mulai dari course kerja nyata, advanced formula, atau productivity challenge."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {courses.map((course) => (
            <motion.article {...sectionMotion} className="group overflow-hidden rounded-xl border border-[#1E3022] bg-[#111E14] shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-green-900" key={course.title}>
              <div className="relative h-44 bg-[#080E0A] p-4">
                <div className="grid h-full grid-cols-5 grid-rows-4 gap-2">
                  {Array.from({ length: 20 }, (_, index) => (
                    <span className={cn('rounded border border-[#254A2A] bg-[#0D1610]', index === 7 || index === 13 ? 'bg-green-600' : '')} key={index} />
                  ))}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#111E14] via-transparent to-transparent" />
                <span className="absolute left-3 top-3 rounded-full border border-green-900/60 bg-green-950/80 px-2.5 py-1 text-xs font-semibold text-green-300">
                  {course.level}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-heading text-xl font-semibold text-[#E8F0EA]">{course.title}</h3>
                <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-[#8BA98F]">
                  <span>Progress {course.progress}</span>
                  <span className="text-amber-400">Rating {course.rating}</span>
                  <span>{course.exercises}</span>
                  <span>{course.esport}</span>
                </div>
                <Button asChild className="mt-6 w-full" variant="outline">
                  <Link to={ROUTES.courses}>Lihat Kursus</Link>
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function InteractivePracticeSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Belajar tidak hanya menonton"
          title="Practice system membuat skill Excel benar-benar terpakai."
          description="User berlatih langsung, mengikuti timed test, download file, dan mendapat AI review."
        />
        <CardGrid items={practiceFeatures} columns="lg:grid-cols-4" />
      </div>
    </section>
  )
}

function WhySection() {
  return (
    <section className="bg-[#0D1610] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Kenapa BisaExcel berbeda"
          title="Platform ini menggabungkan training center, simulator kerja, dan kompetisi skill."
          description="BisaExcel dibangun untuk membantu user membuktikan kemampuan Excel secara nyata."
        />
        <CardGrid items={whyItems} columns="lg:grid-cols-5" compact />
      </div>
    </section>
  )
}

function PricingEcosystemSection() {
  return (
    <section className="py-16 lg:py-24" id="harga">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          align="center"
          eyebrow="Pilih level skill kamu"
          title="Pricing dibuat sebagai roadmap pengembangan diri."
          description="Setiap tier terasa seperti naik level karir, bukan sekadar membeli akses kursus."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {pricingCards.map((plan) => (
            <motion.article
              {...sectionMotion}
              className={cn(
                'rounded-xl border bg-[#111E14] p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:bg-[#162419]',
                plan.featured ? 'border-green-600 shadow-[0_0_0_1px_rgba(22,163,74,.25),0_12px_36px_rgba(0,0,0,.55)] xl:-mt-4' : 'border-[#1E3022]',
              )}
              key={plan.name}
            >
              <p className={cn('text-xs font-bold uppercase tracking-wider', plan.featured ? 'text-amber-400' : 'text-green-400')}>
                {plan.featured ? 'Most Popular' : plan.name}
              </p>
              <h3 className="mt-3 font-heading text-2xl font-semibold text-[#E8F0EA]">{plan.name}</h3>
              <p className="mt-3 text-sm leading-6 text-[#8BA98F]">{plan.subtitle}</p>
              <p className="mt-5 font-display text-3xl font-bold text-[#E8F0EA]">{plan.price}</p>
              <p className="mt-4 text-sm text-amber-400">{plan.target}</p>
              <div className="mt-5 space-y-2">
                {plan.features.map((feature) => (
                  <p className="flex gap-2 text-sm text-[#8BA98F]" key={feature}>
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-green-400" />
                    {feature}
                  </p>
                ))}
              </div>
              <Button asChild className="mt-7 w-full" variant={plan.featured ? 'primary' : 'outline'}>
                <Link to={plan.to}>{plan.cta}</Link>
              </Button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function CommunitySection() {
  return (
    <section className="bg-[#0D1610] py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading
          eyebrow="Belajar bersama komunitas"
          title="Komunitas membuat user tetap aktif dan merasa tidak belajar sendiri."
          description="Forum, request insight, challenge komunitas, dan leaderboard menciptakan engagement berulang."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {communityItems.map((item) => (
            <motion.div {...sectionMotion} className="rounded-xl border border-[#1E3022] bg-[#111E14] p-5" key={item}>
              <MessageSquareText className="mb-4 h-6 w-6 text-green-400" />
              <p className="font-heading text-lg font-semibold text-[#E8F0EA]">{item}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function MentorshipSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <SectionHeading
          eyebrow="Belajar langsung dengan mentor"
          title="VIP Mentoring untuk percepatan skill dan problem solving kantor."
          description="Pilih paket mentoring, jadwal sesi, file review, career consultation, hingga corporate mentoring."
        />
        <motion.div {...sectionMotion} className="rounded-2xl border border-[#254A2A] bg-[#111E14] p-6 shadow-card">
          {['1 Sesi: Rp 350k - 500k', '3 Sesi: Rp 900k - 1.35jt', '9 Sesi: Rp 2.5jt - 3.5jt'].map((item) => (
            <div className="flex items-center justify-between border-b border-[#1E3022] py-4 last:border-b-0" key={item}>
              <span className="text-sm font-semibold text-[#E8F0EA]">{item}</span>
              <ShieldCheck className="h-5 w-5 text-green-400" />
            </div>
          ))}
          <Button asChild className="mt-6 w-full">
            <Link to={ROUTES.pricing}>Booking Session</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

function BlogInsightSection() {
  return (
    <section className="bg-[#0D1610] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Excel & dunia kerja"
          title="Insight yang menghubungkan Excel dengan realita kantor."
          description="Konten insight menjaga platform tetap relevan dengan produktivitas, budaya kerja, dan tips karir."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {insights.map((insight) => (
            <motion.article {...sectionMotion} className="rounded-xl border border-[#1E3022] bg-[#111E14] p-5 shadow-card" key={insight}>
              <BookOpen className="mb-4 h-6 w-6 text-green-400" />
              <h3 className="font-heading text-lg font-semibold leading-7 text-[#E8F0EA]">{insight}</h3>
              <p className="mt-3 text-sm text-[#8BA98F]">Artikel insight</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function FaqSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading
          align="center"
          eyebrow="FAQ"
          title="Pertanyaan yang sering ditanyakan."
          description="Ringkasan cepat sebelum user mulai belajar atau memilih paket."
        />
        <div className="mt-10 space-y-3">
          {faqs.map((faq) => (
            <motion.div {...sectionMotion} className="rounded-xl border border-[#1E3022] bg-[#111E14] p-5 shadow-card" key={faq.question}>
              <div className="flex gap-3">
                <HelpCircle className="mt-1 h-5 w-5 shrink-0 text-green-400" />
                <div>
                  <h3 className="font-heading text-lg font-semibold text-[#E8F0EA]">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#8BA98F]">{faq.answer}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCtaSection() {
  return (
    <section className="border-y border-[#1E3022] bg-[#0D1610] py-16 lg:py-20">
      <motion.div {...sectionMotion} className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 sm:px-6 lg:flex-row lg:items-center">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-green-400">
            Mulai tingkatkan skill Excel
          </p>
          <h2 className="max-w-3xl font-heading text-3xl font-bold text-[#E8F0EA] sm:text-4xl">
            Naikkan level karirmu lewat belajar, latihan, kompetisi, dan mentoring.
          </h2>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link to={ROUTES.videos}>Mulai Gratis</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to={ROUTES.career}>Lihat Career Path</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to={ROUTES.esports}>Masuk Logic Arena</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  )
}

function CardGrid({
  items,
  columns,
  compact = false,
}: {
  items: IconCard[]
  columns: string
  compact?: boolean
}) {
  return (
    <div className={cn('mt-10 grid gap-5 md:grid-cols-2', columns)}>
      {items.map((item) => (
        <motion.article
          {...sectionMotion}
          className="rounded-xl border border-[#1E3022] bg-[#111E14] p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-[#254A2A] hover:bg-[#162419]"
          key={item.title}
        >
          <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg border border-green-800/50 bg-green-950/70 text-green-400">
            <item.icon className="h-5 w-5" />
          </div>
          <h3 className="font-heading text-xl font-semibold text-[#E8F0EA]">{item.title}</h3>
          <p className="mt-3 text-sm leading-6 text-[#8BA98F]">{item.description}</p>
          {!compact ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {item.items.map((tag) => (
                <span className="rounded-full border border-[#254A2A] bg-[#0D1610] px-2.5 py-1 text-xs font-medium text-[#8BA98F]" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </motion.article>
      ))}
    </div>
  )
}

function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: {
  eyebrow: string
  title: string
  description: string
  align?: 'left' | 'center'
}) {
  return (
    <motion.div {...sectionMotion} className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-green-400">{eyebrow}</p>
      <h2 className="font-heading text-3xl font-bold leading-tight text-[#E8F0EA] sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-sm leading-7 text-[#8BA98F] sm:text-base">{description}</p>
    </motion.div>
  )
}
