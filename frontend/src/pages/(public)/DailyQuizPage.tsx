import { CheckCircle2, Clock3, Flame, HelpCircle, RotateCcw, Trophy, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FeatureNavigation } from '@/components/layout/FeatureNavigation'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { PageMeta } from '@/components/shared/PageMeta'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/lib/utils'

const answers = ['=SUMIFS(F:F,C:C,"HRD")', '=COUNTIF(C:C,"HRD")', '=VLOOKUP("HRD",A:F,6,0)', '=FILTER(F:F,C:C="HRD")'] as const

export function DailyQuizPage() {
  return (
    <PublicLayout>
      <PageMeta title="Daily Quiz" />
      <section className="hero-grid pt-28 pb-16 lg:pt-32">
        <FeatureNavigation />
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-green-400">
              Daily Quiz
            </p>
            <h1 className="font-display text-5xl font-bold leading-tight text-[#E8F0EA] sm:text-6xl">
              5 soal baru setiap hari untuk menjaga streak.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[#8BA98F]">
              Latihan ringan untuk semua user dengan timer, bonus XP, dan progress kompetitif.
              Cocok untuk pemanasan sebelum Flash Quiz atau Ranked Match.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link to={ROUTES.trainingArena}>Pilih Training Lain</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to={ROUTES.rankedMatch}>Lihat Ranked</Link>
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
                { label: 'Timer', value: '04:12', icon: Clock3 },
                { label: 'Reward', value: '+20 XP', icon: Zap },
                { label: 'Streak', value: '9 hari', icon: Flame },
              ].map((item) => (
                <div className="rounded-xl border border-[#1E3022] bg-[#0D1610] p-4" key={item.label}>
                  <item.icon className="mb-3 h-5 w-5 text-green-400" />
                  <p className="text-xs uppercase text-[#8BA98F]">{item.label}</p>
                  <p className="mt-1 font-display text-2xl font-bold text-[#E8F0EA]">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#1E3022]">
              <div className="h-full w-[40%] rounded-full bg-gradient-to-r from-green-600 to-green-400 shadow-[0_0_10px_rgba(22,163,74,0.5)]" />
            </div>
            <p className="mt-2 text-xs text-[#8BA98F]">Soal 2 dari 5</p>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#0D1610] py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="rounded-2xl border border-[#254A2A] bg-[#111E14] p-6 shadow-card">
            <div className="mb-6 flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-green-700/50 bg-green-950/70 text-green-400">
                <HelpCircle className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#8BA98F]">
                  Question 02
                </p>
                <h2 className="mt-2 font-heading text-2xl font-semibold leading-9 text-[#E8F0EA]">
                  Rumus apa yang paling tepat untuk menjumlahkan total gaji hanya untuk departemen
                  HRD?
                </h2>
              </div>
            </div>

            <div className="grid gap-3">
              {answers.map((answer, index) => (
                <button
                  className={cn(
                    'flex items-center justify-between rounded-xl border bg-[#0D1610] p-4 text-left font-mono text-sm transition-all duration-200 hover:border-green-600 hover:bg-green-950/30',
                    index === 0 ? 'border-green-600 bg-green-950/30 text-green-300' : 'border-[#1E3022] text-[#8BA98F]',
                  )}
                  key={answer}
                  type="button"
                >
                  {answer}
                  {index === 0 ? <CheckCircle2 className="h-5 w-5 text-green-400" /> : null}
                </button>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
              <Button type="button" variant="outline">
                <RotateCcw className="h-4 w-4" />
                Reset Jawaban
              </Button>
              <Button type="button">
                Submit & Lanjut
                <Trophy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
