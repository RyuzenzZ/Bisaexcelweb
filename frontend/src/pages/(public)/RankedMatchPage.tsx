import { Brain, CheckCircle2, Clock3, Gauge, Keyboard, Lock, Swords, Trophy } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FeatureNavigation } from '@/components/layout/FeatureNavigation'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { PageMeta } from '@/components/shared/PageMeta'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'

const rankedModes = [
  {
    title: 'Speed Formula Match',
    icon: Clock3,
    focus: 'Kecepatan menyelesaikan soal formula, lookup, dan SUMIFS.',
  },
  {
    title: 'Logic Arena Match',
    icon: Brain,
    focus: 'Problem solving tingkat tinggi dengan kombinasi rumus.',
  },
  {
    title: 'No Click Match',
    icon: Keyboard,
    focus: 'Shortcut keyboard dan workflow tanpa mouse.',
  },
  {
    title: 'Real Work Match',
    icon: Swords,
    focus: 'Simulasi payroll, report, inventory, dan database HR.',
  },
] as const

const matchmaking = ['Rank tier', 'Accuracy', 'Speed score', 'Level user'] as const

export function RankedMatchPage() {
  return (
    <PublicLayout>
      <PageMeta title="Ranked Match" />
      <section className="hero-grid pt-28 pb-16 lg:pt-32">
        <FeatureNavigation />
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-green-400">
              Competitive Match
            </p>
            <h1 className="font-display text-5xl font-bold leading-tight text-[#E8F0EA] sm:text-6xl">
              Ranked Match untuk menguji skill Excel nyata.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[#8BA98F]">
              Sistem mencari lawan berdasarkan rank, level, akurasi, dan speed. Mode ranked penuh
              tersedia untuk Logic Master dan VIP.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link to={ROUTES.pricing}>
                  Unlock Ranked
                  <Lock className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to={ROUTES.trainingArena}>Latihan Dulu</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-[#254A2A] bg-[#111E14] p-6 shadow-card"
            initial={{ opacity: 0, y: 22 }}
            transition={{ delay: 0.12, duration: 0.45, ease: 'easeOut' }}
          >
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { label: 'Accuracy', value: '50%' },
                { label: 'Speed', value: '30%' },
                { label: 'Efficiency', value: '20%' },
              ].map((item) => (
                <div className="rounded-xl border border-[#1E3022] bg-[#0D1610] p-4" key={item.label}>
                  <p className="text-xs uppercase text-[#8BA98F]">{item.label}</p>
                  <p className="mt-1 font-display text-3xl font-bold text-amber-400">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-xl border border-[#1E3022] bg-[#0D1610] p-4">
              <p className="flex items-center gap-2 font-heading text-lg font-semibold text-[#E8F0EA]">
                <Gauge className="h-5 w-5 text-green-400" />
                Matchmaking Signal
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {matchmaking.map((item) => (
                  <p className="flex gap-2 text-sm text-[#8BA98F]" key={item}>
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-green-400" />
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#0D1610] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-green-400">
              Ranked modes
            </p>
            <h2 className="font-heading text-3xl font-bold text-[#E8F0EA]">
              Pilih match sesuai skill yang ingin diuji.
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {rankedModes.map((mode) => (
              <article className="rounded-xl border border-[#1E3022] bg-[#111E14] p-6 shadow-card" key={mode.title}>
                <mode.icon className="mb-5 h-6 w-6 text-green-400" />
                <h3 className="font-heading text-xl font-semibold text-[#E8F0EA]">{mode.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#8BA98F]">{mode.focus}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="rounded-2xl border border-[#254A2A] bg-[#111E14] p-6 shadow-card lg:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-green-400">
                  Ranked locked
                </p>
                <h2 className="font-heading text-3xl font-bold text-[#E8F0EA]">
                  Ranked penuh dibuka lewat Logic Master.
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-[#8BA98F]">
                  Coba Training Arena terlebih dahulu, lalu upgrade saat siap masuk ranked match
                  dan tournament.
                </p>
              </div>
              <Button asChild>
                <Link to={ROUTES.pricing}>
                  Lihat Paket
                  <Trophy className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
