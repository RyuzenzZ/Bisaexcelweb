import { CheckCircle2, Crown, GraduationCap, Sparkles, Swords, Youtube } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FeatureNavigation } from '@/components/layout/FeatureNavigation'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { PageMeta } from '@/components/shared/PageMeta'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/lib/utils'

const plans = [
  {
    badge: 'FREE',
    name: 'The Explorer',
    subtitle: 'Mulai belajar Excel dari dasar secara gratis.',
    price: 'GRATIS',
    note: 'Community Access',
    icon: Youtube,
    cta: 'Mulai Gratis',
    to: ROUTES.videos,
    benefit: 'Cocok untuk pemula, mahasiswa, fresh graduate, dan user baru.',
    featured: false,
    features: [
      'Akses video dasar',
      'Daily Excel Tips',
      'Shorts & podcast',
      'Free resource download',
      'Community forum',
      'Basic challenge',
      'Request insight',
      'Progress tracking dasar',
    ],
  },
  {
    badge: 'STARTER',
    name: 'Career Starter',
    subtitle: 'Persiapan tes kerja dan simulasi dunia kantor.',
    price: 'Rp 99.000 - Rp 199.000',
    note: 'Lifetime Access',
    icon: GraduationCap,
    cta: 'Mulai Career Path',
    to: ROUTES.career,
    benefit: 'Fokus membantu lolos tes kerja dan memahami dunia admin kantor.',
    featured: false,
    features: [
      '72+ bank soal kerja',
      'Simulasi admin kantor',
      'Simulasi HRD',
      'Timed office test',
      'File latihan premium',
      'Quiz & ranking',
      'Beginner Excel Esport',
      'Sertifikat penyelesaian',
      'Progress analytics',
    ],
  },
  {
    badge: 'MOST POPULAR',
    name: 'Logic Master',
    subtitle: 'Kuasai logika Excel tingkat tinggi dan bekerja lebih cepat.',
    price: 'Rp 349.000 - Rp 599.000',
    note: 'Advanced Professional',
    icon: Swords,
    cta: 'Upgrade Skill Sekarang',
    to: ROUTES.esports,
    benefit: 'Untuk speed kerja, problem solving, advanced logic, dan workflow profesional.',
    featured: true,
    features: [
      'Excel Esport Masterclass',
      'Logic Arena',
      'Advanced Formula System',
      'Productivity Bootcamp',
      'Excel Tanpa Klik',
      'Ranked Battle',
      'National Leaderboard',
      'Tournament Access',
      'Advanced Work Simulation',
      'Professional Certification',
      'AI Excel Assistant',
      'Premium Resource Vault',
    ],
  },
  {
    badge: 'VIP',
    name: 'VIP Mentoring',
    subtitle: 'Pendampingan langsung untuk percepatan skill dan solusi kerja nyata.',
    price: 'Rp 350k - Rp 3.5jt',
    note: 'Personal Training',
    icon: Crown,
    cta: 'Booking Mentoring',
    to: ROUTES.career,
    benefit: 'Untuk profesional serius, owner bisnis, dan corporate team.',
    featured: false,
    features: [
      'One-on-one mentoring',
      'Zoom / Google Meet',
      'Custom learning path',
      'Office problem solving',
      'Personal guidance',
      'File review',
      'Career consultation',
      'Intensive growth system',
      'Corporate mentoring',
      'Priority support',
    ],
  },
] as const

const comparisonRows = [
  { feature: 'Video Course', free: 'Ya', starter: 'Ya', logic: 'Ya', vip: 'Ya' },
  { feature: 'Simulasi Kerja', free: '-', starter: 'Ya', logic: 'Ya', vip: 'Ya' },
  { feature: 'Excel Esport', free: 'Basic', starter: 'Basic', logic: 'Full', vip: 'Full' },
  { feature: 'Tournament', free: '-', starter: '-', logic: 'Ya', vip: 'Ya' },
  { feature: 'AI Assistant', free: '-', starter: '-', logic: 'Ya', vip: 'Ya' },
  { feature: 'Mentoring', free: '-', starter: '-', logic: '-', vip: 'Ya' },
] as const

const journey = ['Explorer', 'Career Starter', 'Logic Master', 'VIP Mentoring'] as const

export function PricingPage() {
  return (
    <PublicLayout>
      <PageMeta title="Harga" />
      <section className="hero-grid pt-28 pb-16 lg:pt-32">
        <FeatureNavigation />
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-green-400">
              Career Growth Pricing Ecosystem
            </p>
            <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold text-[#E8F0EA] sm:text-6xl">
              Harga dibuat seperti tangga perkembangan skill.
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[#8BA98F]">
              Pilih tier sesuai posisi Anda sekarang. Semakin tinggi tier, semakin kuat skill,
              workflow, kompetisi, dan kesiapan karir yang dibangun.
            </p>
          </motion.div>

          <div className="mx-auto mt-9 flex max-w-4xl flex-col gap-3 rounded-2xl border border-[#1E3022] bg-[#0D1610] p-3 md:flex-row md:items-center md:justify-between">
            {journey.map((step, index) => (
              <div className="flex items-center gap-3 md:flex-1" key={step}>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-green-700/50 bg-green-950/70 font-mono text-xs font-bold text-green-400">
                  {index + 1}
                </span>
                <span className="text-sm font-semibold text-[#E8F0EA]">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0D1610] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-green-400">
                Pricing grid
              </p>
              <h2 className="font-heading text-3xl font-bold text-[#E8F0EA]">
                Naik level dari gratis sampai mentoring premium.
              </h2>
            </div>
            <div className="flex w-fit rounded-xl border border-[#1E3022] bg-[#111E14] p-1">
              {['Lifetime', 'Corporate'].map((mode, index) => (
                <span
                  className={cn(
                    'rounded-lg px-4 py-2 text-sm font-semibold',
                    index === 0 ? 'bg-green-600/15 text-green-400' : 'text-[#8BA98F]',
                  )}
                  key={mode}
                >
                  {mode}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {plans.map((plan, index) => (
              <motion.article
                className={cn(
                  'relative rounded-xl border bg-[#111E14] p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:bg-[#162419] hover:shadow-card-hover',
                  plan.featured
                    ? 'border-green-600 shadow-[0_0_0_1px_rgba(22,163,74,.25),0_12px_36px_rgba(0,0,0,.55)] xl:-mt-4 xl:pb-10'
                    : 'border-[#1E3022] hover:border-[#254A2A]',
                )}
                initial={{ opacity: 0, y: 18 }}
                key={plan.name}
                transition={{ delay: index * 0.05, duration: 0.35, ease: 'easeOut' }}
                viewport={{ once: true, margin: '-80px' }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <span
                    className={cn(
                      'rounded-full border px-2.5 py-1 text-xs font-bold',
                      plan.featured
                        ? 'border-amber-800/50 bg-amber-950/70 text-amber-400'
                        : 'border-green-900/60 bg-green-950/80 text-green-400',
                    )}
                  >
                    {plan.badge}
                  </span>
                  <plan.icon className={cn('h-6 w-6', plan.featured ? 'text-amber-400' : 'text-green-400')} />
                </div>

                <h3 className="mt-6 font-heading text-2xl font-semibold text-[#E8F0EA]">
                  {plan.name}
                </h3>
                <p className="mt-3 min-h-12 text-sm leading-6 text-[#8BA98F]">{plan.subtitle}</p>
                <p className="mt-6 font-display text-3xl font-bold text-[#E8F0EA]">{plan.price}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-amber-400">
                  {plan.note}
                </p>

                <div className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <p className="flex gap-2 text-sm leading-5 text-[#8BA98F]" key={feature}>
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
                      {feature}
                    </p>
                  ))}
                </div>

                <div className="mt-6 rounded-xl border border-[#1E3022] bg-[#0D1610] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#8BA98F]">
                    Highlight benefit
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#E8F0EA]">{plan.benefit}</p>
                </div>

                <Button
                  asChild
                  className="mt-7 w-full"
                  variant={plan.featured ? 'primary' : 'outline'}
                >
                  <Link to={plan.to}>
                    {plan.cta}
                    {plan.featured ? <Sparkles className="h-4 w-4" /> : null}
                  </Link>
                </Button>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 max-w-3xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-green-400">
              Feature comparison
            </p>
            <h2 className="font-heading text-3xl font-bold text-[#E8F0EA]">
              Bandingkan fitur utama antar tier.
            </h2>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[#254A2A] bg-[#111E14] shadow-card">
            <div className="grid grid-cols-[1.2fr_repeat(4,1fr)] border-b border-[#1E3022] bg-[#0D1610] text-sm font-semibold text-[#E8F0EA]">
              {['Feature', 'Free', 'Starter', 'Logic Master', 'VIP'].map((header) => (
                <div className="border-r border-[#1E3022] p-4 last:border-r-0" key={header}>
                  {header}
                </div>
              ))}
            </div>
            {comparisonRows.map((row) => (
              <div
                className="grid grid-cols-[1.2fr_repeat(4,1fr)] border-b border-[#1E3022] text-sm text-[#8BA98F] last:border-b-0"
                key={row.feature}
              >
                <div className="border-r border-[#1E3022] p-4 font-semibold text-[#E8F0EA]">
                  {row.feature}
                </div>
                <div className="border-r border-[#1E3022] p-4">{row.free}</div>
                <div className="border-r border-[#1E3022] p-4">{row.starter}</div>
                <div className="border-r border-[#1E3022] p-4 text-green-400">{row.logic}</div>
                <div className="p-4 text-amber-400">{row.vip}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
