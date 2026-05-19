import {
  Bot,
  CheckCircle2,
  Crown,
  FileSpreadsheet,
  Gift,
  GraduationCap,
  Sparkles,
  Store,
  Swords,
  Youtube,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FeatureNavigation } from '@/components/layout/FeatureNavigation'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { PageMeta } from '@/components/shared/PageMeta'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'

const tiers = [
  {
    tier: 'Tier 1',
    badge: 'FREE',
    name: 'The Explorer',
    focus: 'Awareness & Community',
    price: 'GRATIS',
    icon: Youtube,
    description: 'Belajar gratis, mengenal dunia Excel, dan masuk ke komunitas BisaExcel.',
    audience: ['Pemula', 'Fresh graduate', 'Mahasiswa', 'Penonton YouTube'],
    features: [
      'YouTube learning integration',
      'Free resource vault',
      'Community forum',
      'Daily quick tips',
      'Basic quiz challenge',
    ],
    business: 'Audience Engine',
  },
  {
    tier: 'Tier 2',
    badge: 'STARTER',
    name: 'Career Starter',
    focus: 'Persiapan Kerja',
    price: 'Rp 99.000 - Rp 199.000',
    icon: GraduationCap,
    description: 'Persiapan tes kerja, simulasi admin kantor, dan latihan berbasis dunia kerja.',
    audience: ['Pencari kerja', 'Admin pemula', 'Fresh graduate', 'Mahasiswa akhir'],
    features: [
      'Structured job-test course',
      '72+ interactive question bank',
      'Career simulation module',
      'Practice file ecosystem',
      'Beginner Excel Esport',
    ],
    business: 'Conversion Product',
  },
  {
    tier: 'Tier 3',
    badge: 'ADVANCED',
    name: 'Logic Master',
    focus: 'Professional Skill',
    price: 'Rp 349.000 - Rp 599.000',
    icon: Swords,
    description: 'Naik dari user biasa menjadi power user dengan logic, speed, dan workflow advanced.',
    audience: ['Profesional kantor', 'Admin senior', 'Data analyst', 'HRD'],
    features: [
      'Excel Esport Masterclass',
      'Productivity Bootcamp',
      'Advanced Formula Combinator',
      'Real Work Simulation',
      'Advanced Excel Esport',
      'Professional Certification',
    ],
    business: 'Core Premium Product',
  },
  {
    tier: 'Tier 4',
    badge: 'VIP',
    name: 'VIP Mentoring',
    focus: 'Pendampingan Intensif',
    price: 'Rp 350k - Rp 3.5jt',
    icon: Crown,
    description: 'Solusi personal, percepatan skill, dan mentoring langsung untuk kebutuhan khusus.',
    audience: ['Profesional serius', 'Owner bisnis', 'Perusahaan', 'User khusus'],
    features: [
      'One-on-one private session',
      'Custom learning path',
      'Office problem solving',
      'Intensive growth program',
      'Corporate mentoring',
    ],
    business: 'High Profit Premium Service',
  },
] as const

const ecosystemFeatures = [
  {
    icon: Swords,
    title: 'Excel Esport System',
    body: 'Mode kompetitif untuk menjaga retention, latihan harian, ranked battle, dan leaderboard.',
  },
  {
    icon: Gift,
    title: 'Achievement & XP System',
    body: 'Reward belajar yang membuat user termotivasi menyelesaikan materi dan challenge.',
  },
  {
    icon: Bot,
    title: 'AI Excel Assistant',
    body: 'AI membantu user memahami rumus, menemukan topik lemah, dan mempercepat belajar.',
  },
  {
    icon: Store,
    title: 'Marketplace Template',
    body: 'Ruang jual beli template Excel untuk membuka monetisasi tambahan dan ekosistem creator.',
  },
] as const

const journeySteps = [
  'Menonton YouTube',
  'Masuk platform gratis',
  'Menggunakan free resource',
  'Membeli starter pack',
  'Masuk Excel Esport & advanced system',
  'Mengikuti mentoring premium',
] as const

export function EcosystemPage() {
  return (
    <PublicLayout>
      <PageMeta title="Ekosistem BisaExcel" />
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
                Ekosistem BisaExcel.com
              </p>
              <h1 className="max-w-5xl font-display text-5xl font-bold text-[#E8F0EA] sm:text-6xl">
                Dari pemula sampai Excel Professional dalam satu ekosistem.
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-[#8BA98F]">
                BisaExcel dirancang bukan hanya sebagai platform kursus, tetapi sebagai pusat
                belajar, latihan kerja, kompetisi Excel, career improvement system, dan komunitas
                Excel Indonesia.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild>
                  <Link to={ROUTES.pricing}>
                    Lihat Tier Ekosistem
                    <Sparkles className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to={ROUTES.courses}>
                    Mulai Belajar
                    <FileSpreadsheet className="h-4 w-4" />
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
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8BA98F]">
                Tujuan ekosistem
              </p>
              <div className="mt-5 space-y-3">
                {[
                  'Menarik user gratis dari YouTube',
                  'Mengubah penonton menjadi member',
                  'Meningkatkan skill secara bertahap',
                  'Membangun loyalitas komunitas',
                  'Membuka monetisasi berlapis',
                ].map((goal) => (
                  <p className="flex gap-2 text-sm leading-6 text-[#8BA98F]" key={goal}>
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-green-400" />
                    {goal}
                  </p>
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
              Struktur 4 tier
            </p>
            <h2 className="font-heading text-3xl font-bold text-[#E8F0EA]">
              Setiap tier punya peran bisnis dan perkembangan skill yang jelas.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {tiers.map((tier, index) => (
              <motion.article
                className="rounded-xl border border-[#1E3022] bg-[#111E14] p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-[#254A2A] hover:bg-[#162419] hover:shadow-card-hover"
                initial={{ opacity: 0, y: 18 }}
                key={tier.name}
                transition={{ delay: index * 0.05, duration: 0.35, ease: 'easeOut' }}
                viewport={{ once: true, margin: '-80px' }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="rounded-full border border-green-900/60 bg-green-950/80 px-2.5 py-1 text-xs font-semibold text-green-400">
                    {tier.badge}
                  </span>
                  <tier.icon className="h-6 w-6 text-green-400" />
                </div>
                <p className="mt-6 font-mono text-xs uppercase text-[#8BA98F]">{tier.tier}</p>
                <h3 className="mt-2 font-heading text-2xl font-semibold text-[#E8F0EA]">
                  {tier.name}
                </h3>
                <p className="mt-1 text-sm font-semibold text-amber-400">{tier.focus}</p>
                <p className="mt-4 font-display text-2xl font-bold text-[#E8F0EA]">{tier.price}</p>
                <p className="mt-4 text-sm leading-6 text-[#8BA98F]">{tier.description}</p>
                <div className="mt-5 space-y-2">
                  {tier.features.map((feature) => (
                    <p className="flex gap-2 text-sm text-[#8BA98F]" key={feature}>
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
                      {feature}
                    </p>
                  ))}
                </div>
                <div className="mt-6 rounded-xl border border-[#1E3022] bg-[#0D1610] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#8BA98F]">
                    Business role
                  </p>
                  <p className="mt-2 font-heading text-base font-semibold text-[#E8F0EA]">
                    {tier.business}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-green-400">
              Journey user
            </p>
            <h2 className="font-heading text-3xl font-bold text-[#E8F0EA]">
              Belajar, latihan, bertanding, naik skill, lalu naik karir.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#8BA98F]">
              Alur ekosistem dibuat agar user gratis punya jalan alami menuju produk premium dan
              mentoring intensif tanpa merasa membeli kursus secara acak.
            </p>
          </div>

          <div className="rounded-2xl border border-[#254A2A] bg-[#111E14] p-6 shadow-card">
            <div className="grid gap-3 md:grid-cols-2">
              {journeySteps.map((step, index) => (
                <div className="rounded-xl border border-[#1E3022] bg-[#0D1610] p-5" key={step}>
                  <p className="font-display text-3xl font-bold text-amber-400">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <p className="mt-3 font-heading text-base font-semibold text-[#E8F0EA]">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0D1610] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-green-400">
              Fitur tambahan
            </p>
            <h2 className="font-heading text-3xl font-bold text-[#E8F0EA]">
              Sistem pendukung yang membuat ekosistem tetap aktif.
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {ecosystemFeatures.map((feature) => (
              <article
                className="rounded-xl border border-[#1E3022] bg-[#111E14] p-6 shadow-card transition-all duration-200 hover:border-[#254A2A] hover:bg-[#162419]"
                key={feature.title}
              >
                <feature.icon className="mb-5 h-6 w-6 text-green-400" />
                <h3 className="font-heading text-xl font-semibold text-[#E8F0EA]">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#8BA98F]">{feature.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
