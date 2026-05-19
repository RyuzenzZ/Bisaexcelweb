import { BarChart3, Brain, CalendarDays, CheckCircle2, FileSpreadsheet, ShieldCheck, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FeatureNavigation } from '@/components/layout/FeatureNavigation'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { PageMeta } from '@/components/shared/PageMeta'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'

const trainingMenus = [
  {
    title: 'Daily Quiz',
    icon: CalendarDays,
    body: '5 soal baru setiap hari dengan timer, bonus XP, dan streak harian.',
    access: 'Free',
    to: ROUTES.dailyQuiz,
  },
  {
    title: 'Challenge Bank',
    icon: Brain,
    body: 'Latihan VLOOKUP, Pivot, IF, SUMIFS, Logic Formula, dan Text Formula.',
    access: 'Free',
    to: ROUTES.trainingArena,
  },
  {
    title: 'Flash Quiz',
    icon: Zap,
    body: '20 soal, 5 menit, live score, speed combo, dan leaderboard khusus.',
    access: 'Starter',
    to: ROUTES.pricing,
  },
  {
    title: 'Excel Simulator',
    icon: BarChart3,
    body: 'Spreadsheet mini di browser untuk menyelesaikan tugas kantor.',
    access: 'Logic Master',
    to: ROUTES.pricing,
  },
  {
    title: 'Case Study Arena',
    icon: ShieldCheck,
    body: 'Payroll, inventory, laporan keuangan, HR database, dan AI Review.',
    access: 'Logic Master',
    to: ROUTES.pricing,
  },
] as const

const categories = ['VLOOKUP', 'Pivot', 'IF', 'SUMIFS', 'Logic Formula', 'Text Formula'] as const
const difficulties = ['Easy', 'Medium', 'Hard', 'Expert'] as const

export function TrainingArenaPage() {
  return (
    <PublicLayout>
      <PageMeta title="Training Arena" />
      <section className="hero-grid pt-28 pb-16 lg:pt-32">
        <FeatureNavigation />
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-green-400">
              Training Arena
            </p>
            <h1 className="font-display text-5xl font-bold leading-tight text-[#E8F0EA] sm:text-6xl">
              Latihan dulu sebelum masuk ranked.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[#8BA98F]">
              Pilih latihan berdasarkan topik, mode, dan tingkat kesulitan. Training Arena
              membantu user membangun speed, accuracy, logic, dan efficiency.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link to={ROUTES.dailyQuiz}>Mulai Daily Quiz</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to={ROUTES.rankedMatch}>Lihat Ranked Match</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-[#254A2A] bg-[#111E14] p-6 shadow-card"
            initial={{ opacity: 0, y: 22 }}
            transition={{ delay: 0.12, duration: 0.45, ease: 'easeOut' }}
          >
            <FileSpreadsheet className="mb-5 h-8 w-8 text-green-400" />
            <p className="font-heading text-2xl font-semibold text-[#E8F0EA]">Challenge Filters</p>
            <div className="mt-5 space-y-5">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#8BA98F]">
                  Topic
                </p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((item) => (
                    <span className="rounded-full border border-green-900/60 bg-green-950/80 px-2.5 py-1 text-xs font-semibold text-green-300" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#8BA98F]">
                  Difficulty
                </p>
                <div className="flex flex-wrap gap-2">
                  {difficulties.map((item) => (
                    <span className="rounded-full border border-[#254A2A] bg-[#0D1610] px-2.5 py-1 text-xs text-[#8BA98F]" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#0D1610] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-green-400">
              Menu training
            </p>
            <h2 className="font-heading text-3xl font-bold text-[#E8F0EA]">
              Pilih mode latihan sesuai kebutuhan skill.
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {trainingMenus.map((menu) => (
              <article className="rounded-xl border border-[#1E3022] bg-[#111E14] p-5 shadow-card transition-all duration-200 hover:border-[#254A2A] hover:bg-[#162419]" key={menu.title}>
                <menu.icon className="mb-5 h-6 w-6 text-green-400" />
                <h3 className="font-heading text-xl font-semibold text-[#E8F0EA]">{menu.title}</h3>
                <p className="mt-3 min-h-24 text-sm leading-6 text-[#8BA98F]">{menu.body}</p>
                <span className="mt-5 inline-flex rounded-full border border-green-900/60 bg-green-950/80 px-2.5 py-1 text-xs font-semibold text-green-300">
                  {menu.access}
                </span>
                <Button asChild className="mt-6 w-full" size="sm" variant="outline">
                  <Link to={menu.to}>{menu.access === 'Free' ? 'Buka' : 'Lihat Akses'}</Link>
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="rounded-2xl border border-[#254A2A] bg-[#111E14] p-6 shadow-card">
            <div className="grid gap-5 md:grid-cols-3">
              {['Accuracy', 'Formula Efficiency', 'Speed'].map((item, index) => (
                <div className="rounded-xl border border-[#1E3022] bg-[#0D1610] p-5" key={item}>
                  <CheckCircle2 className="mb-4 h-6 w-6 text-green-400" />
                  <p className="font-display text-3xl font-bold text-amber-400">0{index + 1}</p>
                  <h3 className="mt-3 font-heading text-xl font-semibold text-[#E8F0EA]">{item}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#8BA98F]">
                    Semua latihan diarahkan untuk meningkatkan metrik kompetitif user.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
