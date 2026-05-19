import {
  BarChart3,
  Brain,
  CalendarDays,
  Crown,
  Flame,
  Keyboard,
  Lock,
  MessageSquareText,
  Moon,
  ShieldCheck,
  Sparkles,
  Sun,
  Swords,
  Target,
  Timer,
  Trophy,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FeatureNavigation } from '@/components/layout/FeatureNavigation'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { PageMeta } from '@/components/shared/PageMeta'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/lib/utils'

type AccessTier = {
  packageName: string
  access: string
  status: 'open' | 'locked'
  icon: LucideIcon
}

type HubCard = {
  title: string
  description: string
  icon: LucideIcon
  meta: string
  access: 'Free' | 'Starter' | 'Logic Master' | 'VIP'
  to?: string
  locked?: boolean
}

type Player = {
  rank: number
  name: string
  title: string
  xp: string
  winRate: string
  mode: string
}

const accessTiers: AccessTier[] = [
  {
    packageName: 'Free',
    access: 'Basic Quiz & Daily Challenge',
    status: 'open',
    icon: Target,
  },
  {
    packageName: 'Starter',
    access: 'Timed Test & Flash Quiz',
    status: 'open',
    icon: Timer,
  },
  {
    packageName: 'Logic Master',
    access: 'Full Ranked Match & Tournament',
    status: 'locked',
    icon: Swords,
  },
  {
    packageName: 'VIP',
    access: 'Semua fitur + private arena',
    status: 'locked',
    icon: Crown,
  },
]

const trainingModes: HubCard[] = [
  {
    title: 'Daily Quiz',
    description: '5 soal baru setiap hari dengan timer, bonus XP, dan streak harian.',
    icon: CalendarDays,
    meta: '+20 XP',
    access: 'Free',
    to: ROUTES.dailyQuiz,
  },
  {
    title: 'Challenge Bank',
    description: 'Gudang latihan VLOOKUP, Pivot, IF, SUMIFS, Logic Formula, dan Text Formula.',
    icon: Brain,
    meta: 'Easy - Expert',
    access: 'Free',
    to: ROUTES.trainingArena,
  },
  {
    title: 'Flash Quiz',
    description: '20 soal dalam 5 menit dengan live score, speed combo, dan leaderboard khusus.',
    icon: Zap,
    meta: '5 menit',
    access: 'Starter',
    to: ROUTES.trainingArena,
  },
  {
    title: 'Excel Simulator',
    description: 'Spreadsheet mini di browser untuk membuat formula dan menyelesaikan tugas kantor.',
    icon: BarChart3,
    meta: 'Premium',
    access: 'Logic Master',
    locked: true,
  },
  {
    title: 'Case Study Arena',
    description: 'Latihan payroll, inventory, laporan keuangan, dan HR database dengan AI Review.',
    icon: ShieldCheck,
    meta: 'AI Review',
    access: 'Logic Master',
    locked: true,
  },
]

const rankedModes: HubCard[] = [
  {
    title: 'Speed Formula Match',
    description: 'Fokus kecepatan menyelesaikan soal rumus dan lookup.',
    icon: Timer,
    meta: 'Speed 30%',
    access: 'Logic Master',
    locked: true,
  },
  {
    title: 'Logic Arena Match',
    description: 'Problem solving tingkat tinggi dengan formula kombinasi.',
    icon: Brain,
    meta: 'Accuracy 50%',
    access: 'Logic Master',
    locked: true,
  },
  {
    title: 'No Click Match',
    description: 'Shortcut keyboard untuk menyelesaikan tugas tanpa mouse.',
    icon: Keyboard,
    meta: 'Efficiency 20%',
    access: 'Logic Master',
    locked: true,
  },
  {
    title: 'Real Work Match',
    description: 'Simulasi pekerjaan nyata berbasis payroll, report, dan database.',
    icon: Swords,
    meta: 'Ranked',
    access: 'VIP',
    locked: true,
  },
]

const players: Player[] = [
  { rank: 1, name: 'Ayu Pratiwi', title: 'Excel King', xp: '18.420 XP', winRate: '76%', mode: 'Logic Arena' },
  { rank: 2, name: 'Rizky Maulana', title: 'Excel Elite', xp: '16.980 XP', winRate: '72%', mode: 'Flash Quiz' },
  { rank: 3, name: 'Nadia Sari', title: 'Excel Warrior', xp: '15.770 XP', winRate: '69%', mode: 'No Click' },
]

const xpActivities = [
  { activity: 'Video selesai', xp: '+10' },
  { activity: 'Quiz bab', xp: '+30' },
  { activity: 'Daily Quiz', xp: '+20' },
  { activity: 'Flash Quiz Perfect', xp: '+75' },
  { activity: 'Ranked Win', xp: '+100' },
  { activity: 'Streak 7 hari', xp: '+50' },
] as const

const levelSystem = [
  { level: '1-5', title: 'Pemula Excel' },
  { level: '6-10', title: 'Pengguna Excel' },
  { level: '11-15', title: 'Excel Expert' },
  { level: '16-20', title: 'Excel Master' },
  { level: '21-25', title: 'Excel Grandmaster' },
  { level: '26+', title: 'Excel Legend' },
] as const

const achievements = [
  { title: 'Speed Demon', body: 'Cepat menyelesaikan soal.', icon: Flame },
  { title: 'Formula King', body: 'Accuracy tinggi.', icon: Crown },
  { title: 'Logic Monster', body: 'Problem solving expert.', icon: Brain },
  { title: 'Shortcut Master', body: 'Ahli shortcut keyboard.', icon: Keyboard },
  { title: 'Night Owl', body: 'Belajar malam.', icon: Moon },
  { title: 'Early Bird', body: 'Aktif pagi hari.', icon: Sun },
] as const

const sectionMotion = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.4, ease: 'easeOut' },
} as const

export function EsportsPage() {
  return (
    <PublicLayout>
      <PageMeta title="Excel Esport Hub" />
      <HeroEsportSection />
      <PackageAccessSection />
      <TrainingArenaSection />
      <RankedMatchSection />
      <LiveLeaderboardSection />
      <XpLevelSection />
      <TournamentHubSection />
      <AchievementSection />
      <CommunitySocialSection />
      <UpgradeConversionSection />
    </PublicLayout>
  )
}

function HeroEsportSection() {
  return (
    <section className="hero-grid pt-28 pb-16 lg:pt-32">
      <FeatureNavigation />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <motion.div {...sectionMotion}>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-900/60 bg-green-950/50 px-3 py-1.5 text-xs font-semibold text-green-300">
            <Sparkles className="h-3.5 w-3.5" />
            Competitive Learning Arena
          </div>
          <h1 className="font-display text-5xl font-bold leading-tight text-[#E8F0EA] sm:text-6xl">
            Train, compete, rank up, master Excel.
          </h1>
          <p className="mt-5 text-base leading-8 text-[#8BA98F]">
            Esport Hub adalah pusat kompetitif BisaExcel. User bisa latihan dulu, memilih mode,
            melihat akses paket, lalu masuk ranked match saat skill sudah siap.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link to={ROUTES.rankedMatch}>
                Mulai Ranked Match
                <Swords className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to={ROUTES.trainingArena}>
                Latihan Dulu
                <Target className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>

        <PlayerHubCard />
      </div>
    </section>
  )
}

function PlayerHubCard() {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-[#254A2A] bg-[#111E14] p-5 shadow-[0_24px_80px_rgba(0,0,0,.55)]"
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-amber-700/50 bg-amber-950/70 font-display text-xl font-bold text-amber-400">
            AP
          </div>
          <div>
            <p className="font-heading text-xl font-semibold text-[#E8F0EA]">Ayu Pratiwi</p>
            <p className="text-sm text-[#8BA98F]">Gold II - Finance Analyst</p>
          </div>
        </div>
        <span className="rounded-full border border-amber-800/50 bg-amber-950/70 px-3 py-1 text-xs font-bold text-amber-400">
          Streak 9 hari
        </span>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'XP', value: '9.280' },
          { label: 'Level', value: '8' },
          { label: 'Rank', value: '#184' },
          { label: 'Battle', value: '68%' },
        ].map((item) => (
          <div className="rounded-xl border border-[#1E3022] bg-[#0D1610] p-3" key={item.label}>
            <p className="text-xs text-[#8BA98F]">{item.label}</p>
            <p className="mt-1 font-display text-xl font-bold text-[#E8F0EA]">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-xl border border-[#1E3022] bg-[#0D1610] p-4">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="font-medium text-[#8BA98F]">Progress ke Gold I</span>
          <span className="font-mono font-bold text-amber-400">72%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-[#1E3022]">
          <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-green-600 to-green-400 shadow-[0_0_10px_rgba(22,163,74,0.5)]" />
        </div>
      </div>
    </motion.div>
  )
}

function PackageAccessSection() {
  return (
    <section className="border-y border-[#1E3022] bg-[#0D1610] py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionIntro
          eyebrow="Package access system"
          title="Mode disesuaikan dengan paket tanpa memutus pengalaman user."
          description="User tetap bisa mencoba fitur gratis, melihat mode premium, dan memahami manfaat upgrade secara natural."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {accessTiers.map((tier) => (
            <motion.article
              {...sectionMotion}
              className={cn(
                'rounded-xl border bg-[#111E14] p-6 shadow-card transition-all duration-200 hover:border-[#254A2A] hover:bg-[#162419]',
                tier.status === 'locked' ? 'border-[#1E3022]' : 'border-green-700/40',
              )}
              key={tier.packageName}
            >
              <div className="flex items-start justify-between gap-4">
                <tier.icon className="h-6 w-6 text-green-400" />
                {tier.status === 'locked' ? <Lock className="h-5 w-5 text-[#8BA98F]" /> : null}
              </div>
              <h3 className="mt-5 font-heading text-xl font-semibold text-[#E8F0EA]">
                {tier.packageName}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#8BA98F]">{tier.access}</p>
              <p className={cn('mt-5 text-xs font-bold uppercase tracking-wider', tier.status === 'locked' ? 'text-amber-400' : 'text-green-400')}>
                {tier.status === 'locked' ? 'Upgrade untuk membuka mode ini' : 'Terbuka'}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function TrainingArenaSection() {
  return (
    <section className="py-16 lg:py-24" id="training-arena">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionIntro
          eyebrow="Training arena"
          title="Latihan dulu sebelum masuk ranked."
          description="Training Arena memberi ruang untuk membangun speed, akurasi, dan confidence sebelum bertanding."
        />
        <HubCardGrid items={trainingModes} />
      </div>
    </section>
  )
}

function RankedMatchSection() {
  return (
    <section className="bg-[#0D1610] py-16 lg:py-24" id="ranked-match">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionIntro
            eyebrow="Competitive match"
            title="Ranked match mencari lawan berdasarkan level, accuracy, speed, dan rank tier."
            description="Penilaian ranked: Accuracy 50%, Speed 30%, Efficiency 20%. Mode premium tetap terlihat, tetapi akses dibuka sesuai paket."
          />
          <div className="rounded-2xl border border-[#254A2A] bg-[#111E14] p-6 shadow-card">
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
          </div>
        </div>
        <HubCardGrid items={rankedModes} />
      </div>
    </section>
  )
}

function LiveLeaderboardSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionIntro
          eyebrow="Top Excel Players"
          title="Leaderboard global, weekly, monthly, dan by mode."
          description="Top 1, 2, 3 diberi efek spesial agar kompetisi terasa hidup dan tetap profesional."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {players.map((player) => (
            <motion.article
              {...sectionMotion}
              className={cn(
                'rounded-xl border p-6 shadow-card',
                player.rank === 1
                  ? 'border-amber-700/60 bg-amber-950/30 shadow-glow-gold'
                  : player.rank === 2
                    ? 'border-[#254A2A] bg-[#111E14]'
                    : 'border-amber-900/40 bg-[#111E14]',
              )}
              key={player.rank}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-5xl font-extrabold text-amber-400">
                  #{player.rank}
                </span>
                <Crown className={cn('h-7 w-7', player.rank === 1 ? 'text-amber-400' : 'text-[#8BA98F]')} />
              </div>
              <h3 className="mt-5 font-heading text-2xl font-bold text-[#E8F0EA]">{player.name}</h3>
              <p className="mt-1 text-sm font-semibold text-amber-400">{player.title}</p>
              <div className="mt-5 grid grid-cols-3 gap-2 text-xs">
                <span className="rounded-lg border border-[#1E3022] bg-[#0D1610] p-2 text-[#8BA98F]">
                  {player.xp}
                </span>
                <span className="rounded-lg border border-[#1E3022] bg-[#0D1610] p-2 text-[#8BA98F]">
                  WR {player.winRate}
                </span>
                <span className="rounded-lg border border-[#1E3022] bg-[#0D1610] p-2 text-[#8BA98F]">
                  {player.mode}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function XpLevelSection() {
  return (
    <section className="bg-[#0D1610] py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <SectionIntro
            eyebrow="Progress kompetitif"
            title="XP dan level membuat perkembangan skill terasa terukur."
            description="XP didapat dari video, quiz, daily challenge, flash quiz, ranked win, dan streak."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {xpActivities.map((item) => (
              <div className="rounded-xl border border-[#1E3022] bg-[#111E14] p-4" key={item.activity}>
                <p className="text-sm text-[#8BA98F]">{item.activity}</p>
                <p className="mt-1 font-mono text-lg font-bold text-amber-400">{item.xp}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-[#254A2A] bg-[#111E14] p-6 shadow-card">
          {levelSystem.map((level) => (
            <div className="flex items-center justify-between border-b border-[#1E3022] py-4 last:border-b-0" key={level.level}>
              <span className="font-mono text-sm font-bold text-green-400">Level {level.level}</span>
              <span className="font-heading text-sm font-semibold text-[#E8F0EA]">{level.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TournamentHubSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionIntro
          eyebrow="Excel Combat Arena"
          title="Tournament Hub menampilkan event, countdown, hadiah, peserta, dan bracket."
          description="Weekly Cup, Monthly Championship, Corporate Battle, dan Campus Battle membuka kompetisi skala besar."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {['Weekly Cup', 'Monthly Championship', 'Corporate Battle', 'Campus Battle'].map((event) => (
            <article className="rounded-xl border border-[#1E3022] bg-[#111E14] p-6 shadow-card" key={event}>
              <Trophy className="mb-5 h-6 w-6 text-amber-400" />
              <h3 className="font-heading text-xl font-semibold text-[#E8F0EA]">{event}</h3>
              <p className="mt-3 text-sm leading-6 text-[#8BA98F]">
                Countdown, bracket, hadiah, dan real-time score untuk peserta.
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function AchievementSection() {
  return (
    <section className="bg-[#0D1610] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionIntro
          eyebrow="Competitive Achievement"
          title="Badge membuat progres kompetitif punya identitas."
          description="Badge memberi alasan user untuk kembali, membangun reputasi, dan membagikan pencapaian."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {achievements.map((item) => (
            <article className="rounded-xl border border-[#1E3022] bg-[#111E14] p-6 shadow-card" key={item.title}>
              <item.icon className="mb-5 h-6 w-6 text-amber-400" />
              <h3 className="font-heading text-xl font-semibold text-[#E8F0EA]">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#8BA98F]">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function CommunitySocialSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionIntro
          eyebrow="Komunitas competitive learning"
          title="Challenge teman, share badge, dan share leaderboard."
          description="Komunitas membuat pengalaman esport terasa sosial tanpa keluar dari fokus pembelajaran Excel."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {['Komentar match', 'Challenge teman', 'Mention user', 'Share badge', 'Share leaderboard', 'Private arena'].map((item) => (
            <div className="rounded-xl border border-[#1E3022] bg-[#111E14] p-5" key={item}>
              <MessageSquareText className="mb-4 h-6 w-6 text-green-400" />
              <p className="font-heading text-lg font-semibold text-[#E8F0EA]">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function UpgradeConversionSection() {
  return (
    <section className="border-y border-[#1E3022] bg-[#0D1610] py-16 lg:py-20">
      <motion.div
        {...sectionMotion}
        className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 sm:px-6 lg:flex-row lg:items-center"
      >
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-green-400">
            Natural premium conversion
          </p>
          <h2 className="max-w-3xl font-heading text-3xl font-bold text-[#E8F0EA] sm:text-4xl">
            Coba fitur dulu, rasakan kompetisi, lalu upgrade saat siap masuk ranked penuh.
          </h2>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link to={ROUTES.dailyQuiz}>Coba Daily Quiz</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to={ROUTES.pricing}>Upgrade Logic Master</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  )
}

function HubCardGrid({ items }: { items: HubCard[] }) {
  return (
    <div className={cn('mt-10 grid gap-5 md:grid-cols-2', items.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-5')}>
      {items.map((item) => (
        <motion.article
          {...sectionMotion}
          className={cn(
            'relative min-h-[292px] overflow-hidden rounded-xl border bg-[#111E14] p-5 shadow-card transition-all duration-200 hover:border-[#254A2A] hover:bg-[#162419]',
            item.locked ? 'border-[#1E3022] pb-32' : 'border-green-700/40',
          )}
          key={item.title}
        >
          <div className={cn(item.locked ? 'opacity-45 blur-[1px]' : '')}>
            <item.icon className="mb-5 h-6 w-6 text-green-400" />
            <h3 className="font-heading text-xl font-semibold leading-7 text-[#E8F0EA]">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-[#8BA98F]">{item.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full border border-green-900/60 bg-green-950/80 px-2.5 py-1 text-xs font-semibold text-green-300">
                {item.access}
              </span>
              <span className="rounded-full border border-[#254A2A] bg-[#0D1610] px-2.5 py-1 text-xs font-medium text-[#8BA98F]">
                {item.meta}
              </span>
            </div>
          </div>
          {item.locked ? (
            <div className="absolute inset-x-4 bottom-4 z-10 rounded-xl border border-amber-800/50 bg-[#0D1610]/95 p-4 shadow-card backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-amber-800/50 bg-amber-950/70 text-amber-400">
                  <Lock className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-bold text-amber-400">Mode terkunci</p>
                  <p className="mt-1 text-xs leading-5 text-[#8BA98F]">
                    Upgrade untuk membuka mode ini.
                  </p>
                </div>
              </div>
              <Button asChild className="mt-3 w-full" size="sm" variant="outline">
                <Link to={ROUTES.pricing}>Lihat Paket</Link>
              </Button>
            </div>
          ) : item.to ? (
            <Button asChild className="mt-6 w-full" size="sm" variant="outline">
              <Link to={item.to}>Buka Mode</Link>
            </Button>
          ) : null}
        </motion.article>
      ))}
    </div>
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
    <motion.div {...sectionMotion} className="max-w-3xl">
      <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-green-400">{eyebrow}</p>
      <h2 className="font-heading text-3xl font-bold leading-tight text-[#E8F0EA] sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-sm leading-7 text-[#8BA98F] sm:text-base">{description}</p>
    </motion.div>
  )
}
