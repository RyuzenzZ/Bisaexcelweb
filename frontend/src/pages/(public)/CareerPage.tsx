import {
  Brain,
  Briefcase,
  CheckCircle2,
  ClipboardCheck,
  GraduationCap,
  Keyboard,
  LineChart,
  Target,
  Trophy,
  Users,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FeatureNavigation } from '@/components/layout/FeatureNavigation'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { PageMeta } from '@/components/shared/PageMeta'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'

const careerStages = [
  {
    stage: '01',
    title: 'Tahap Fondasi',
    role: 'Admin Perkantoran',
    level: 'Entry Level',
    icon: Briefcase,
    focus: 'Penguasaan dasar Excel yang paling sering digunakan di pekerjaan administratif.',
    materials: [
      'Mengolah data mentah menjadi laporan penjualan dalam waktu singkat',
      'Latihan Excel pemula yang dirancang khusus untuk dunia kerja',
    ],
    target:
      'Mampu menyusun laporan sederhana dan memahami alur kerja data di kantor.',
  },
  {
    stage: '02',
    title: 'Tahap Spesialisasi',
    role: 'Professional Admin & HRD',
    level: 'Role Specialist',
    icon: Users,
    focus: 'Pendalaman fungsi spesifik untuk posisi profesional seperti HR Admin dan admin operasional.',
    materials: [
      'Rumus DATEDIF untuk menghitung masa kerja dan umur karyawan otomatis',
      'Menghitung upah kerja dan mengelola database karyawan dengan 5 fitur esensial HRD',
    ],
    target:
      'Mampu mengelola administrasi kepegawaian atau operasional secara akurat.',
  },
  {
    stage: '03',
    title: 'Tahap Power User',
    role: 'Master Efisiensi',
    level: 'Productivity Master',
    icon: Keyboard,
    focus: 'Meningkatkan speed dan efisiensi kerja agar terlihat profesional di depan atasan.',
    materials: [
      'Seri Excel Tanpa Klik untuk navigasi dan olah data memakai keyboard',
      'Seri 1 Video 1 Shortcut untuk menguasai pintasan Excel penting',
    ],
    target:
      'Bekerja cepat tanpa bergantung pada mouse melalui pola Excel speed-working.',
  },
  {
    stage: '04',
    title: 'Tahap Ahli',
    role: 'Data Logic & Problem Solver',
    level: 'Expert Level',
    icon: Brain,
    focus: 'Menyelesaikan masalah logika kompleks setara challenge kompetitif.',
    materials: [
      'Kombinasi VLOOKUP + SWITCH, INDEX + MATCH + SWITCH, dan SUMPRODUCT multi-kriteria',
      'Tantangan Excel Esport seperti Moro Langlayangan, The Lookups, dan In Excel We Trust',
    ],
    target:
      'Membangun sistem logika data fleksibel dan menyelesaikan masalah data rumit.',
  },
  {
    stage: '05',
    title: 'Tahap Final',
    role: 'Kesiapan Kerja & Mentorship',
    level: 'Career Ready',
    icon: GraduationCap,
    focus: 'Memastikan skill siap diuji dalam rekrutmen, tes kerja, atau konsultasi nyata.',
    materials: [
      'Latihan intensif 1 jam untuk persiapan tes kerja kantor',
      '72 soal latihan dan Private Training One-on-One paket 1, 3, atau 9 pertemuan',
    ],
    target:
      'Siap bersaing sebagai Excel Expert di pasar kerja profesional Indonesia.',
  },
] as const

const skillMetrics = [
  { label: 'Foundation', value: 'Laporan kerja', icon: ClipboardCheck },
  { label: 'Specialist', value: 'HR & admin ops', icon: Users },
  { label: 'Productivity', value: 'Tanpa klik', icon: Keyboard },
  { label: 'Expert', value: 'Logic solver', icon: Brain },
] as const

export function CareerPage() {
  return (
    <PublicLayout>
      <PageMeta title="Career Path" />
      <section className="hero-grid pt-28 pb-16 lg:pt-32">
        <FeatureNavigation />
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 18 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-green-400">
                Career path system
              </p>
              <h1 className="max-w-4xl font-display text-5xl font-bold text-[#E8F0EA] sm:text-6xl">
                Dari tahu Excel menjadi Excel Expert siap kerja.
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-[#8BA98F]">
                Struktur jenjang karir ini membawa pengguna dari fondasi admin perkantoran,
                spesialisasi HRD, produktivitas tanpa klik, hingga problem solving tingkat expert
                yang siap bersaing di pasar kerja profesional Indonesia.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild>
                  <Link to={ROUTES.courses}>
                    Mulai Dari Fondasi
                    <Target className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to={ROUTES.esports}>
                    Uji Skill Kompetitif
                    <Trophy className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-[#254A2A] bg-[#111E14] p-6 shadow-card"
              initial={{ opacity: 0, y: 22 }}
              transition={{ delay: 0.12, duration: 0.45, ease: 'easeOut' }}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-green-700/50 bg-green-950/70 text-green-400">
                  <LineChart className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#8BA98F]">
                    Transformasi skill
                  </p>
                  <p className="font-heading text-xl font-semibold text-[#E8F0EA]">
                    5 tahap karir terukur
                  </p>
                </div>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {skillMetrics.map((metric) => (
                  <div className="rounded-xl border border-[#1E3022] bg-[#0D1610] p-4" key={metric.label}>
                    <metric.icon className="mb-3 h-5 w-5 text-green-400" />
                    <p className="font-mono text-xs uppercase text-[#8BA98F]">{metric.label}</p>
                    <p className="mt-1 font-heading text-base font-semibold text-[#E8F0EA]">
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-[#0D1610] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-green-400">
              Career roadmap
            </p>
            <h2 className="font-heading text-3xl font-bold text-[#E8F0EA]">
              Jenjang belajar berdasarkan kebutuhan dunia kerja.
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#8BA98F]">
              Setiap tahap memiliki fokus, materi utama, studi kasus, dan target kemampuan yang
              jelas agar pengguna tahu harus belajar apa setelah menyelesaikan satu level.
            </p>
          </div>

          <div className="space-y-5">
            {careerStages.map((stage, index) => (
              <motion.article
                className="grid gap-5 rounded-xl border border-[#1E3022] bg-[#111E14] p-5 shadow-card transition-all duration-200 hover:border-[#254A2A] hover:bg-[#162419] md:grid-cols-[160px_1fr] lg:grid-cols-[190px_1fr_300px]"
                initial={{ opacity: 0, y: 18 }}
                key={stage.stage}
                transition={{ delay: index * 0.05, duration: 0.35, ease: 'easeOut' }}
                viewport={{ once: true, margin: '-80px' }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-start gap-4 md:block">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-green-700/50 bg-green-950/70 text-green-400">
                    <stage.icon className="h-5 w-5" />
                  </span>
                  <div className="md:mt-5">
                    <p className="font-display text-4xl font-bold text-amber-400">{stage.stage}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#8BA98F]">
                      {stage.level}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-green-400">{stage.title}</p>
                  <h3 className="mt-1 font-heading text-2xl font-semibold text-[#E8F0EA]">
                    {stage.role}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#8BA98F]">{stage.focus}</p>
                  <div className="mt-5 grid gap-3 md:grid-cols-2">
                    {stage.materials.map((material) => (
                      <p className="flex gap-2 text-sm leading-6 text-[#8BA98F]" key={material}>
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-green-400" />
                        {material}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-[#1E3022] bg-[#0D1610] p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#8BA98F]">
                    Target kemampuan
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#E8F0EA]">{stage.target}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-6 rounded-2xl border border-[#254A2A] bg-[#111E14] p-6 shadow-card lg:grid-cols-[0.9fr_1.1fr] lg:p-8">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-green-400">
                Career readiness
              </p>
              <h2 className="font-heading text-3xl font-bold text-[#E8F0EA]">
                Bukan hanya menonton tutorial, tapi membuktikan skill kerja nyata.
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#8BA98F]">
                Career path ini menggabungkan materi, studi kasus, shortcut, tantangan logika,
                simulasi tes kerja, dan mentorship agar perkembangan pengguna lebih terstruktur.
              </p>
              <Button asChild className="mt-7">
                <Link to={ROUTES.pricing}>
                  Lihat Paket Mentorship
                  <GraduationCap className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {[
                '72 soal latihan persiapan tes kerja kantor',
                'Private Training One-on-One untuk kendala spesifik',
                'Challenge Excel Esport untuk validasi speed dan logic',
                'Roadmap belajar dari admin sampai expert level',
              ].map((item) => (
                <div className="rounded-xl border border-[#1E3022] bg-[#0D1610] p-5" key={item}>
                  <ClipboardCheck className="mb-4 h-6 w-6 text-green-400" />
                  <p className="text-sm leading-7 text-[#E8F0EA]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
