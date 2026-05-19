import {
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  Bot,
  Briefcase,
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Download,
  FileSpreadsheet,
  Gauge,
  GraduationCap,
  MessageSquareText,
  MonitorPlay,
  NotebookPen,
  PlayCircle,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Swords,
  Target,
  Timer,
  Trophy,
  Users,
  Zap,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FeatureNavigation } from '@/components/layout/FeatureNavigation'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { PageMeta } from '@/components/shared/PageMeta'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'

type CoursePreview = {
  title: string
  level: string
  duration: string
  lessons: number
  price: string
  rating: string
  previewVideoSlug: string
  description: string
}

type LearningStep = {
  step: string
  title: string
  status: string
}

type CourseModule = {
  title: string
  topics: string[]
  duration: string
  level: string
  progress: number
}

const coursePreviews: CoursePreview[] = [
  {
    title: 'Study Kasus Excel untuk Admin HRD',
    level: 'Pemula',
    duration: 'Preview video',
    lessons: 28,
    price: 'Gratis',
    rating: '4,9',
    previewVideoSlug: 'admin-hrd',
    description: '5 fitur penting Excel yang wajib dikuasai untuk pekerjaan Admin HRD.',
  },
  {
    title: 'VLOOKUP Advanced di Excel',
    level: 'Menengah',
    duration: 'Preview video',
    lessons: 36,
    price: 'Rp149.000',
    rating: '4,8',
    previewVideoSlug: 'vlookup-advanced',
    description: '9 trik pro VLOOKUP yang jarang diketahui untuk pekerjaan data harian.',
  },
  {
    title: 'Menghitung Upah Kerja dengan Excel',
    level: 'Mahir',
    duration: 'Preview video',
    lessons: 31,
    price: 'Rp179.000',
    rating: '5,0',
    previewVideoSlug: 'upah-kerja',
    description: 'Langkah praktis menghitung upah kerja dengan Excel untuk kebutuhan payroll.',
  },
]

const learningPath: LearningStep[] = [
  { step: 'STEP 1', title: 'Dasar Excel Kantor', status: 'Selesai' },
  { step: 'STEP 2', title: 'Rumus Office', status: 'Aktif' },
  { step: 'STEP 3', title: 'Lookup & Database', status: 'Berikutnya' },
  { step: 'STEP 4', title: 'Studi Kasus Kantor', status: 'Terkunci' },
  { step: 'STEP 5', title: 'Tes Simulasi Kerja', status: 'Terkunci' },
  { step: 'STEP 6', title: 'Challenge & Esport', status: 'Terkunci' },
]

const modules: CourseModule[] = [
  {
    title: 'Modul 1 - Dasar Excel Kantor',
    topics: ['Interface', 'Tabel', 'Formatting', 'Shortcut dasar'],
    duration: '1 jam 20 menit',
    level: 'Pemula',
    progress: 100,
  },
  {
    title: 'Modul 2 - Formula Office',
    topics: ['IF', 'SUMIFS', 'COUNTIFS', 'DATEDIF'],
    duration: '2 jam 10 menit',
    level: 'Menengah',
    progress: 62,
  },
  {
    title: 'Modul 3 - Database & Lookup',
    topics: ['VLOOKUP', 'XLOOKUP', 'INDEX MATCH'],
    duration: '2 jam 45 menit',
    level: 'Menengah',
    progress: 24,
  },
  {
    title: 'Modul 4 - Simulasi HRD',
    topics: ['Payroll', 'Absensi', 'Database staff'],
    duration: '3 jam',
    level: 'Mahir',
    progress: 0,
  },
]

export function CoursesPage() {
  return (
    <PublicLayout>
      <PageMeta title="Kursus Excel" />
      <section className="hero-grid pt-28 pb-16 lg:pt-32">
        <FeatureNavigation />
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_420px] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-900/60 bg-green-950/50 px-3 py-1.5 text-xs font-semibold text-green-300">
              <Sparkles className="h-3.5 w-3.5" />
              Professional Learning Experience
            </div>
            <h1 className="font-display text-5xl font-bold leading-tight text-[#E8F0EA] sm:text-6xl">
              HR Admin Masterclass
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[#8BA98F]">
              Pelajari skill Excel HRD mulai dari payroll, absensi, database karyawan, sampai
              simulasi kerja nyata dengan sistem latihan, analytics, dan sertifikasi.
            </p>

            <div className="mt-7 flex flex-wrap gap-3 text-xs">
              {['Menengah', '9 jam total', '4 modul', '18 latihan', '6 challenge', '12.400 peserta'].map(
                (item) => (
                  <span
                    className="rounded-full border border-[#254A2A] bg-[#111E14] px-3 py-1.5 font-medium text-[#8BA98F]"
                    key={item}
                  >
                    {item}
                  </span>
                ),
              )}
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-800/50 bg-amber-950/70 px-3 py-1.5 font-bold text-amber-400">
                <Star className="h-3.5 w-3.5 fill-current" />
                4,9 rating
              </span>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link to={`${ROUTES.videos}?video=admin-hrd`}>
                  Mulai Preview
                  <PlayCircle className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to={ROUTES.career}>
                  Lihat Roadmap Karir
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>

          <QuickInfoCard />
        </div>
      </section>

      <LearningPathSection />
      <CourseContentSection />
      <VideoExperienceSection />
      <PracticeSection />
      <CareerSimulationSection />
      <EsportIntegrationSection />
      <AnalyticsSection />
      <MentorshipCommunitySection />
      <CertificationEnhancementSection />
    </PublicLayout>
  )
}

function QuickInfoCard() {
  return (
    <aside className="rounded-2xl border border-[#254A2A] bg-[#111E14] p-5 shadow-[0_24px_80px_rgba(0,0,0,.55)]">
      <div className="relative mb-5 aspect-video overflow-hidden rounded-xl border border-[#1E3022] bg-[#080E0A] p-4">
        <div className="grid h-full grid-cols-6 grid-rows-4 gap-2">
          {Array.from({ length: 24 }, (_, index) => (
            <span
              className={`rounded border border-[#254A2A] ${
                index === 8 || index === 15 || index === 19 ? 'bg-green-600' : 'bg-[#0D1610]'
              }`}
              key={index}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#111E14] via-transparent to-transparent" />
        <p className="absolute bottom-4 left-4 font-heading text-xl font-semibold text-[#E8F0EA]">
          Dashboard Excel HRD
        </p>
      </div>

      <div className="space-y-3">
        {[
          { icon: Users, label: 'Cocok untuk', value: 'HR Admin, Office Admin, Fresh Graduate' },
          { icon: Target, label: 'Skill', value: 'Payroll, absensi, lookup, database staff' },
          { icon: FileSpreadsheet, label: 'Software', value: 'Microsoft Excel / Google Sheets' },
          { icon: Award, label: 'Sertifikat', value: 'Tersedia dengan kode verifikasi' },
          { icon: MonitorPlay, label: 'Tipe belajar', value: 'Video, praktik, simulasi, challenge' },
        ].map((item) => (
          <div className="flex gap-3 rounded-lg border border-[#1E3022] bg-[#0D1610] p-3" key={item.label}>
            <item.icon className="mt-0.5 h-4 w-4 text-green-400" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8BA98F]">
                {item.label}
              </p>
              <p className="mt-1 text-sm font-medium text-[#E8F0EA]">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}

function LearningPathSection() {
  return (
    <section className="border-y border-[#1E3022] bg-[#0D1610] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionIntro
          eyebrow="Roadmap pembelajaran"
          title="User melihat perjalanan belajar seperti milestone skill kerja."
          description="Roadmap membuat user tahu posisi saat ini, checkpoint berikutnya, dan estimasi waktu tersisa."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {learningPath.map((item, index) => (
            <article className="rounded-xl border border-[#1E3022] bg-[#111E14] p-5 shadow-card" key={item.step}>
              <span className="font-mono text-xs font-bold text-green-400">{item.step}</span>
              <h3 className="mt-3 font-heading text-lg font-semibold text-[#E8F0EA]">{item.title}</h3>
              <p className="mt-2 text-xs font-semibold text-amber-400">{item.status}</p>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#1E3022]">
                <div
                  className="h-full rounded-full bg-green-500"
                  style={{ width: index === 0 ? '100%' : index === 1 ? '62%' : '0%' }}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function CourseContentSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionIntro
            eyebrow="Materi pembelajaran utama"
            title="Modul dibuat rapi agar kursus terasa seperti program training."
            description="Setiap modul memiliki durasi, tingkat kesulitan, latihan, dan progress yang jelas."
          />
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4D6650]" />
            <input
              className="w-full rounded-lg border border-[#1E3022] bg-[#0F1A12] px-4 py-2.5 pl-10 text-sm font-medium text-[#E8F0EA] outline-none transition-all placeholder:text-[#4D6650] focus:border-green-600 focus:ring-1 focus:ring-green-600/30"
              placeholder="Cari modul, formula, atau simulasi..."
            />
          </div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-4">
          {modules.map((module) => (
            <article
              className="rounded-xl border border-[#1E3022] bg-[#111E14] p-5 shadow-card transition-all duration-200 hover:border-[#254A2A] hover:bg-[#162419]"
              key={module.title}
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg border border-green-800/50 bg-green-950/70 text-green-400">
                <BookOpen className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-[#E8F0EA]">{module.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {module.topics.map((topic) => (
                  <span
                    className="rounded-full border border-[#254A2A] bg-[#0D1610] px-2.5 py-1 text-xs font-medium text-[#8BA98F]"
                    key={topic}
                  >
                    {topic}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between text-xs text-[#8BA98F]">
                <span>{module.duration}</span>
                <span>{module.level}</span>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#1E3022]">
                <div className="h-full rounded-full bg-green-500" style={{ width: `${module.progress}%` }} />
              </div>
            </article>
          ))}
        </div>

        <PreviewCourseCards />
      </div>
    </section>
  )
}

function PreviewCourseCards() {
  return (
    <div className="mt-12">
      <SectionIntro
        eyebrow="Video preview"
        title="Preview nyata dari materi yang sudah tersedia."
        description="Tiga video ini sudah terhubung ke halaman video pembelajaran."
      />
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {coursePreviews.map((course) => (
          <article
            className="group overflow-hidden rounded-xl border border-[#1E3022] bg-[#111E14] shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-green-900 hover:shadow-[0_0_0_1px_rgba(22,163,74,.15),0_8px_32px_rgba(0,0,0,.5)]"
            key={course.title}
          >
            <div className="relative h-44 overflow-hidden bg-[#080E0A] p-4">
              <div className="grid h-full grid-cols-6 grid-rows-4 gap-2">
                {Array.from({ length: 24 }, (_, index) => (
                  <span
                    className={`rounded border border-[#254A2A] ${
                      index === 8 || index === 15 ? 'bg-green-600' : 'bg-[#0D1610]'
                    }`}
                    key={index}
                  />
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#111E14] via-transparent to-transparent" />
              <span className="absolute left-3 top-3 rounded-full border border-green-900/60 bg-green-950/80 px-2.5 py-1 text-xs font-semibold text-green-300">
                {course.level}
              </span>
            </div>
            <div className="space-y-4 p-5">
              <div>
                <h2 className="font-heading text-xl font-semibold text-[#E8F0EA]">{course.title}</h2>
                <p className="mt-2 text-sm leading-6 text-[#8BA98F]">{course.description}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#8BA98F]">
                <span className="inline-flex items-center gap-1">
                  <Clock3 className="h-3.5 w-3.5" />
                  {course.duration}
                </span>
                <span className="inline-flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5" />
                  {course.lessons} lesson
                </span>
                <span className="inline-flex items-center gap-1 text-amber-400">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  {course.rating}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-[#1E3022] pt-4">
                <p className="font-heading text-lg font-bold text-[#E8F0EA]">{course.price}</p>
                <Button asChild size="sm" variant="outline">
                  <Link to={`${ROUTES.videos}?video=${course.previewVideoSlug}`}>Lihat Video</Link>
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

function VideoExperienceSection() {
  return (
    <section className="bg-[#0D1610] py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <SectionIntro
            eyebrow="Video learning experience"
            title="Belajar modern dengan progress, notes, dan mini quiz."
            description="Video player disiapkan untuk auto save progress, speed control, subtitle, fullscreen, auto next lesson, dan quality selector."
          />
          <div className="mt-8 aspect-video overflow-hidden rounded-xl border border-[#254A2A] bg-[#000]">
            <div className="flex h-full flex-col justify-between p-5">
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-green-900/60 bg-green-950/80 px-2.5 py-1 text-xs font-semibold text-green-300">
                  Auto-save progress
                </span>
                <span className="text-xs font-medium text-[#8BA98F]">1.25x</span>
              </div>
              <div>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-glow-green">
                  <PlayCircle className="h-7 w-7" />
                </div>
                <p className="font-heading text-xl font-semibold text-[#E8F0EA]">
                  Simulasi payroll dan absensi HRD
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-5">
          {[
            { icon: NotebookPen, title: 'Smart Note System', body: 'Catatan timestamp, bookmark, dan bagian penting.' },
            { icon: ClipboardCheck, title: 'Floating Mini Quiz', body: 'Quiz kecil muncul setelah video tertentu.' },
            { icon: Bot, title: 'AI Learning Prompt', body: 'Rekomendasi latihan setelah video selesai.' },
          ].map((item) => (
            <article className="rounded-xl border border-[#1E3022] bg-[#111E14] p-5 shadow-card" key={item.title}>
              <item.icon className="mb-4 h-6 w-6 text-green-400" />
              <h3 className="font-heading text-xl font-semibold text-[#E8F0EA]">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#8BA98F]">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function PracticeSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionIntro
          eyebrow="Practice & exercise system"
          title="Belajar Excel harus praktik, bukan hanya menonton."
          description="User mengisi rumus, menyelesaikan tabel, memperbaiki data, dan mengerjakan latihan dengan batas waktu."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { icon: FileSpreadsheet, title: 'Interactive Practice', body: 'Latihan rumus dan tabel langsung di browser.' },
            { icon: Download, title: 'Download Practice File', body: 'Payroll, inventory, sales report, absensi, database.' },
            { icon: Timer, title: 'Timed Practice', body: 'Latihan berbatas waktu untuk simulasi tekanan kerja.' },
          ].map((item) => (
            <article className="rounded-xl border border-[#1E3022] bg-[#111E14] p-6 shadow-card" key={item.title}>
              <item.icon className="mb-5 h-6 w-6 text-green-400" />
              <h3 className="font-heading text-xl font-semibold text-[#E8F0EA]">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#8BA98F]">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function CareerSimulationSection() {
  return (
    <section className="bg-[#0D1610] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionIntro
          eyebrow="Career simulation"
          title="Simulasi pekerjaan nyata membuat skill lebih siap kerja."
          description="Setiap simulasi dinilai berdasarkan accuracy, speed, dan efficiency."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { title: 'HRD Simulation', items: ['Hitung gaji', 'Lembur', 'Absensi'] },
            { title: 'Office Admin Simulation', items: ['Laporan harian', 'Data entry', 'Inventory'] },
            { title: 'Finance Simulation', items: ['Cashflow', 'Budgeting', 'Laporan bulanan'] },
          ].map((sim) => (
            <article className="rounded-xl border border-[#1E3022] bg-[#111E14] p-6 shadow-card" key={sim.title}>
              <Briefcase className="mb-5 h-6 w-6 text-green-400" />
              <h3 className="font-heading text-xl font-semibold text-[#E8F0EA]">{sim.title}</h3>
              <div className="mt-4 space-y-2">
                {sim.items.map((item) => (
                  <p className="flex items-center gap-2 text-sm text-[#8BA98F]" key={item}>
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    {item}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function EsportIntegrationSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <SectionIntro
          eyebrow="Excel esport integration"
          title="Mode kompetitif mengukur skill dari speed, logic, accuracy, dan efficiency."
          description="Leaderboard, ranked challenge, battle mode, dan logic arena membuat belajar lebih seru dan terukur."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { icon: Trophy, label: 'Leaderboard', value: 'Top 184 weekly' },
            { icon: Swords, label: 'Battle Mode', value: 'Accuracy 60% + Speed 40%' },
            { icon: Gauge, label: 'Speed Score', value: '842' },
            { icon: Zap, label: 'Ranked Challenge', value: '+48 rank point' },
          ].map((item) => (
            <div className="rounded-xl border border-[#1E3022] bg-[#111E14] p-5 shadow-card" key={item.label}>
              <item.icon className="mb-4 h-6 w-6 text-green-400" />
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8BA98F]">{item.label}</p>
              <p className="mt-1 font-heading text-lg font-semibold text-[#E8F0EA]">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AnalyticsSection() {
  return (
    <section className="bg-[#0D1610] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionIntro
          eyebrow="Course analytics"
          title="User melihat perkembangan skill, bukan hanya progress video."
          description="Analytics membantu user tahu total belajar, latihan, accuracy, speed score, topik kuat, dan topik lemah."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Clock3, label: 'Total Belajar', value: '12 jam' },
            { icon: ClipboardCheck, label: 'Total Latihan', value: '48 task' },
            { icon: Target, label: 'Accuracy Rate', value: '89%' },
            { icon: BarChart3, label: 'Topik Lemah', value: 'Lookup Formula' },
          ].map((item) => (
            <div className="rounded-xl border border-[#1E3022] bg-[#111E14] p-5 shadow-card" key={item.label}>
              <item.icon className="mb-4 h-6 w-6 text-green-400" />
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8BA98F]">{item.label}</p>
              <p className="mt-1 font-display text-2xl font-bold text-[#E8F0EA]">{item.value}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 rounded-xl border border-amber-800/40 bg-amber-950/30 p-4 text-sm leading-6 text-amber-300">
          AI Weakness Detection: Kamu masih lemah di Lookup Formula.
        </p>
      </div>
    </section>
  )
}

function MentorshipCommunitySection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2">
        <article className="rounded-xl border border-[#1E3022] bg-[#111E14] p-6 shadow-card">
          <GraduationCap className="mb-5 h-6 w-6 text-green-400" />
          <h2 className="font-heading text-2xl font-semibold text-[#E8F0EA]">
            Mentorship Integration
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#8BA98F]">
            Booking mentor, pilih jadwal, pilih paket, upload tugas, dan konsultasi langsung.
          </p>
        </article>
        <article className="rounded-xl border border-[#1E3022] bg-[#111E14] p-6 shadow-card">
          <MessageSquareText className="mb-5 h-6 w-6 text-green-400" />
          <h2 className="font-heading text-2xl font-semibold text-[#E8F0EA]">
            Community Learning
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#8BA98F]">
            Diskusi per modul, request insight, voting topik baru, dan sharing solusi antar user.
          </p>
        </article>
      </div>
    </section>
  )
}

function CertificationEnhancementSection() {
  return (
    <section className="bg-[#0D1610] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionIntro
          eyebrow="Certification & experience enhancement"
          title="Bukti skill nyata ditambah reward agar kursus tidak membosankan."
          description="Sertifikat berbasis nilai, challenge, simulasi kerja, dan kode verifikasi online."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: ShieldCheck, title: 'Verified Certificate', body: 'Kode sertifikat dan badge skill.' },
            { icon: CalendarCheck, title: 'Daily Learning Streak', body: 'Reward belajar harian.' },
            { icon: Award, title: 'Achievement Badge', body: 'Formula Master, HRD Expert, Speed User.' },
            { icon: Bot, title: 'Smart Recommendation', body: 'Materi, latihan, dan challenge berikutnya.' },
          ].map((item) => (
            <article className="rounded-xl border border-[#1E3022] bg-[#111E14] p-6 shadow-card" key={item.title}>
              <item.icon className="mb-5 h-6 w-6 text-green-400" />
              <h3 className="font-heading text-xl font-semibold text-[#E8F0EA]">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#8BA98F]">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function SectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div className="max-w-3xl">
      <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-green-400">{eyebrow}</p>
      <h2 className="font-heading text-3xl font-bold leading-tight text-[#E8F0EA] sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-sm leading-7 text-[#8BA98F] sm:text-base">{description}</p>
    </div>
  )
}
