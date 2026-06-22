import { ArrowRight, Award, BarChart3, BookOpen, Bookmark, CheckCircle2, Settings } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { EmptyState } from '@/components/shared/EmptyState'
import { LoadingState } from '@/components/shared/LoadingState'
import { PageMeta } from '@/components/shared/PageMeta'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/contexts/AuthContext'
import type { AuthProgress } from '@/services/authService'
import { certificateService } from '@/services/certificateService'
import { dashboardService, type CertificateEligibility, type DashboardData } from '@/services/dashboardService'
import { emptyEligibility, profileService, type ProfileCertificatesData, type UserCertificate } from '@/services/profileService'

export function DashboardPage() {
  const { user, progress, refreshMe } = useAuth()
  const [dashboard, setDashboard] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [version, setVersion] = useState(0)

  useEffect(() => {
    let active = true
    setIsLoading(true)
    dashboardService.getMeResult().then((result) => {
      if (!active) return
      if (result.source === 'backend') {
        setDashboard(result.data)
        setError('')
      } else {
        setError('Dashboard backend belum bisa diakses. Coba refresh sebentar lagi.')
      }
    }).finally(() => {
      if (active) setIsLoading(false)
    })
    return () => { active = false }
  }, [version])

  async function handleGenerateCertificate() {
    setIsGenerating(true)
    setNotice('')
    try {
      const response = await certificateService.generateMyCertificate()
      if (response.data.certificate) {
        setNotice('Certificate kamu berhasil dibuat. Skill evidence-nya sudah masuk ke profile kamu.')
        setVersion((current) => current + 1)
        await refreshMe()
      } else {
        setNotice('Belum bisa generate certificate. Selesaikan dulu syarat yang masih kurang ya.')
      }
    } catch {
      setNotice('Generate certificate belum berhasil. Coba cek syarat dan koneksi backend dulu ya.')
    } finally {
      setIsGenerating(false)
    }
  }

  const currentProgress = dashboard?.progress ?? progress
  const formulas = asStringArray(currentProgress?.formulasMastered)
  const skills = asStringArray(currentProgress?.skills)
  const recommendations = dashboard?.recommendations ?? []
  const attempts = dashboard?.recentAttempts ?? []
  const eligibility = dashboard?.certificateEligibility

  return (
    <DashboardLayout>
      <PageMeta title="Dashboard" />
      {isLoading ? <LoadingState label="Memuat dashboard kamu..." /> : null}
      {!isLoading ? (
        <section className="space-y-6">
          {error ? <Notice tone="warning">{error}</Notice> : null}
          {notice ? <Notice tone={notice.startsWith('Certificate') ? 'success' : 'warning'}>{notice}</Notice> : null}
          <div className="rounded-2xl border border-[#254A2A] bg-[#111E14] p-6 shadow-card">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-400">Progress kamu</p>
            <h2 className="mt-2 font-heading text-3xl font-bold">Halo, {user?.name}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#8BA98F]">Dashboard ini mengambil data dari backend. Setiap hasil play yang kamu submit saat login akan masuk ke progress, portfolio, dan eligibility certificate.</p>
            {!attempts.length ? <p className="mt-3 text-sm text-amber-300">Belum ada test yang tersimpan. Mulai dari Test Excel pertama dulu, gas pelan-pelan.</p> : null}
          </div>

          <StatsGrid progress={currentProgress} rank={dashboard?.ranking?.rank ?? null} />

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <Panel title="Rumus dan skill yang tercatat">
              <ChipList items={[...formulas, ...skills]} empty="Belum ada rumus/skill tersimpan. Submit play case pertama dulu." />
              <Button asChild className="mt-5"><Link to={ROUTES.TEST_EXCEL}>Gas lanjut test<ArrowRight className="h-4 w-4" /></Link></Button>
            </Panel>
            <Panel title="Certificate eligibility">
              <EligibilityList eligibility={eligibility} />
              {eligibility?.isEligible ? <Button className="mt-5" disabled={isGenerating} onClick={handleGenerateCertificate} type="button">{isGenerating ? 'Menyiapkan...' : 'Generate Certificate'}</Button> : null}
            </Panel>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Panel title="Riwayat test terbaru"><AttemptList attempts={attempts} /></Panel>
            <Panel title="Rekomendasi belajar"><RecommendationList recommendations={recommendations} /></Panel>
          </div>
        </section>
      ) : null}
    </DashboardLayout>
  )
}

export function MyCoursesPage() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    dashboardService.getMeResult().then((result) => {
      if (!active) return
      if (result.source === 'backend') setDashboard(result.data)
      else setError('Aktivitas belajar belum bisa diambil dari backend.')
    }).finally(() => {
      if (active) setIsLoading(false)
    })
    return () => { active = false }
  }, [])

  return (
    <DashboardLayout>
      <PageMeta title="Materi Saya" />
      <DashboardHeader icon={BookOpen} title="Materi Saya" description="Aktivitas terakhir, test yang pernah dikerjakan, challenge selesai, dan rekomendasi lanjut belajar." />
      {error ? <Notice tone="warning">{error}</Notice> : null}
      {isLoading ? <LoadingState label="Memuat aktivitas belajar..." /> : <div className="grid gap-6 lg:grid-cols-2"><Panel title="Test yang pernah dikerjakan"><AttemptList attempts={dashboard?.recentAttempts ?? []} /></Panel><Panel title="Challenge selesai"><RecordList items={dashboard?.recentChallenges ?? []} empty="Belum ada challenge selesai." /></Panel><Panel title="Rekomendasi lanjut"><RecommendationList recommendations={dashboard?.recommendations ?? []} /></Panel><Panel title="Langkah berikutnya"><Button asChild><Link to={ROUTES.TEST_EXCEL}>Buka Test Excel</Link></Button></Panel></div>}
    </DashboardLayout>
  )
}

export function ProgressPage() {
  const [progress, setProgress] = useState<AuthProgress | null>(null)
  const [attempts, setAttempts] = useState<Array<Record<string, unknown>>>([])
  const [recommendations, setRecommendations] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    Promise.all([
      dashboardService.getProgressResult(),
      dashboardService.getAttemptsResult(),
      dashboardService.getRecommendationsResult(),
    ]).then(([progressResult, attemptsResult, recommendationResult]) => {
      if (!active) return
      setProgress(progressResult.data)
      setAttempts(attemptsResult.data)
      setRecommendations(recommendationResult.data)
      if ([progressResult, attemptsResult, recommendationResult].some((result) => result.source === 'fallback')) setError('Sebagian data progress memakai fallback karena backend belum merespons penuh.')
    }).finally(() => {
      if (active) setIsLoading(false)
    })
    return () => { active = false }
  }, [])

  return (
    <DashboardLayout>
      <PageMeta title="Progress Belajar" />
      <DashboardHeader icon={BarChart3} title="Progress Belajar" description="Ringkasan level, skor, rumus, skill, attempt terbaru, dan rekomendasi dari backend." />
      {error ? <Notice tone="warning">{error}</Notice> : null}
      {isLoading ? <LoadingState label="Memuat progress..." /> : <section className="space-y-6"><StatsGrid progress={progress} rank={progress?.rank ?? null} /><Panel title="Formula dan skill mastered"><ChipList items={[...asStringArray(progress?.formulasMastered), ...asStringArray(progress?.skills)]} empty="Belum ada skill tercatat. Coba submit play case pertama dulu." /></Panel><div className="grid gap-6 lg:grid-cols-2"><Panel title="Attempt terbaru"><AttemptList attempts={attempts} /></Panel><Panel title="Rekomendasi belajar"><RecommendationList recommendations={recommendations} /></Panel></div></section>}
    </DashboardLayout>
  )
}

export function CertificatesPage() {
  const { user, progress, refreshMe } = useAuth()
  const [data, setData] = useState<ProfileCertificatesData>({ certificates: [], eligibility: emptyEligibility(progress) })
  const [isLoading, setIsLoading] = useState(true)
  const [notice, setNotice] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const username = user?.username ?? 'demo-user'

  useEffect(() => {
    let active = true
    profileService.getCertificatesResult(username, { certificates: [], eligibility: emptyEligibility(progress) }).then((result) => {
      if (!active) return
      setData(result.data)
      if (result.source === 'fallback') setNotice('Certificate backend belum merespons, data ditampilkan secara terbatas.')
    }).finally(() => {
      if (active) setIsLoading(false)
    })
    return () => { active = false }
  }, [progress, username])

  async function handleGenerateCertificate() {
    setIsGenerating(true)
    setNotice('')
    try {
      const response = await certificateService.generateMyCertificate()
      if (response.data.certificate) {
        setNotice('Certificate kamu berhasil dibuat. Skill evidence-nya sudah masuk ke profile kamu.')
        setData({ certificates: [response.data.certificate, ...data.certificates], eligibility: response.data.eligibility })
        await refreshMe()
      } else {
        setData((current) => ({ ...current, eligibility: response.data.eligibility }))
        setNotice('Belum bisa generate certificate. Selesaikan dulu syarat yang masih kurang ya.')
      }
    } catch {
      setNotice('Generate certificate belum berhasil. Coba lagi setelah backend stabil ya.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <DashboardLayout>
      <PageMeta title="Sertifikat" />
      <DashboardHeader icon={Award} title="Sertifikat" description="Certificate pribadi dari backend, termasuk eligibility dan skill evidence." />
      {notice ? <Notice tone={notice.startsWith('Certificate') ? 'success' : 'warning'}>{notice}</Notice> : null}
      {isLoading ? <LoadingState label="Memuat certificate..." /> : <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]"><Panel title="Eligibility"><EligibilityList eligibility={data.eligibility} />{data.eligibility.isEligible ? <Button className="mt-5" disabled={isGenerating} onClick={handleGenerateCertificate} type="button">{isGenerating ? 'Menyiapkan...' : 'Generate Certificate'}</Button> : <p className="mt-4 text-sm text-[#8BA98F]">Belum bisa generate certificate. Selesaikan dulu syarat yang masih kurang ya.</p>}</Panel><Panel title="Certificate kamu"><CertificateList certificates={data.certificates} username={username} /></Panel></section>}
    </DashboardLayout>
  )
}

export function BookmarksPage() {
  return (
    <DashboardLayout>
      <PageMeta title="Bookmark" />
      <DashboardHeader icon={Bookmark} title="Bookmark" description="Bookmark backend belum aktif. Nanti kamu bisa simpan materi, video, tips, dan template favorit di sini." />
      <EmptyState title="Bookmark belum aktif" message="Bookmark backend belum aktif. Nanti kamu bisa simpan materi, video, tips, dan template favorit di sini." icon={Bookmark} />
    </DashboardLayout>
  )
}

export function AccountSettingsPage() {
  const { user, profile, progress } = useAuth()
  return (
    <DashboardLayout>
      <PageMeta title="Pengaturan Akun" />
      <DashboardHeader icon={Settings} title="Pengaturan Akun" description="Data akun sudah dibaca dari backend. Edit profile masuk fase berikutnya, jadi belum ada update palsu di sini." />
      <div className="grid gap-6 lg:grid-cols-2"><Panel title="Data akun"><InfoRow label="Nama" value={user?.name ?? '-'} /><InfoRow label="Username" value={`@${user?.username ?? '-'}`} /><InfoRow label="Email" value={user?.email ?? '-'} /><InfoRow label="Role" value={user?.role ?? '-'} /></Panel><Panel title="Profile belajar"><InfoRow label="Bio" value={profile?.bio ?? 'Belum ada bio.'} /><InfoRow label="Headline" value={profile?.headline ?? 'Belum diisi.'} /><InfoRow label="Level" value={progress?.level ?? profile?.level ?? 'Pemula'} /><InfoRow label="Ranking" value={progress?.rank ? `#${progress.rank}` : 'Belum ada'} /></Panel></div>
      <Notice tone="warning">Edit profile dan pengaturan keamanan belum aktif. Fitur ini perlu endpoint update profile/settings di fase berikutnya.</Notice>
    </DashboardLayout>
  )
}

function DashboardHeader({ icon: Icon, title, description }: { icon: typeof BookOpen; title: string; description: string }) {
  return <section className="mb-6 rounded-2xl border border-[#254A2A] bg-[#111E14] p-6 shadow-card"><Icon className="h-8 w-8 text-green-400" /><h1 className="mt-4 font-heading text-3xl font-bold">{title}</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-[#8BA98F]">{description}</p></section>
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return <div className="rounded-2xl border border-[#1E3022] bg-[#111E14] p-6"><h3 className="font-heading text-xl font-bold">{title}</h3><div className="mt-4">{children}</div></div>
}

function StatsGrid({ progress, rank }: { progress?: AuthProgress | null; rank: number | null }) {
  return <div className="grid gap-4 md:grid-cols-5"><Stat label="Level" value={progress?.level ?? 'Pemula'} /><Stat label="Total skor" value={String(progress?.totalScore ?? 0)} /><Stat label="Test selesai" value={String(progress?.testsCompleted ?? 0)} /><Stat label="Challenge" value={String(progress?.challengesCompleted ?? 0)} /><Stat label="Ranking" value={rank ? `#${rank}` : '-'} /></div>
}

function Stat({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-[#1E3022] bg-[#111E14] p-5"><p className="text-xs text-[#8BA98F]">{label}</p><p className="mt-2 font-display text-2xl font-bold text-[#E8F0EA]">{value}</p></div>
}

function ChipList({ items, empty }: { items: string[]; empty: string }) {
  if (!items.length) return <p className="text-sm text-[#8BA98F]">{empty}</p>
  return <div className="flex flex-wrap gap-2">{Array.from(new Set(items)).map((item) => <span className="rounded-full border border-[#254A2A] px-3 py-1 text-sm text-green-300" key={item}>{item}</span>)}</div>
}

function EligibilityList({ eligibility }: { eligibility?: CertificateEligibility }) {
  if (!eligibility) return <p className="text-sm text-[#8BA98F]">Eligibility akan muncul setelah dashboard backend merespons.</p>
  return <div className="space-y-2">{eligibility.requirements.map((item) => <p className="flex items-center gap-2 text-sm text-[#8BA98F]" key={item.label}><CheckCircle2 className={`h-4 w-4 ${item.passed ? 'text-green-400' : 'text-amber-400'}`} />{item.label}: {item.current}/{item.target}</p>)}</div>
}

function AttemptList({ attempts }: { attempts: Array<Record<string, unknown>> }) {
  if (!attempts.length) return <p className="text-sm text-[#8BA98F]">Belum ada attempt tersimpan.</p>
  return <div className="space-y-3">{attempts.slice(0, 6).map((attempt, index) => <div className="rounded-xl border border-[#1E3022] bg-[#0D1610] p-4 text-sm text-[#8BA98F]" key={String(attempt.id ?? index)}>{String(attempt.slug ?? 'test-excel')} - skor {String(attempt.score ?? 0)}/{String(attempt.totalPoints ?? 0)}</div>)}</div>
}

function RecordList({ items, empty }: { items: Array<Record<string, unknown>>; empty: string }) {
  if (!items.length) return <p className="text-sm text-[#8BA98F]">{empty}</p>
  return <div className="space-y-3">{items.slice(0, 6).map((item, index) => <div className="rounded-xl border border-[#1E3022] bg-[#0D1610] p-4 text-sm text-[#8BA98F]" key={String(item.id ?? index)}>{String(item.slug ?? item.title ?? 'Aktivitas belajar')}</div>)}</div>
}

function RecommendationList({ recommendations }: { recommendations: string[] }) {
  if (!recommendations.length) return <p className="text-sm text-[#8BA98F]">Rekomendasi akan muncul setelah progress mulai kebaca.</p>
  return <div className="space-y-3">{recommendations.map((item) => <div className="rounded-xl border border-[#1E3022] bg-[#0D1610] p-4 text-sm text-[#8BA98F]" key={item}>{item}</div>)}</div>
}

function CertificateList({ certificates, username }: { certificates: UserCertificate[]; username: string }) {
  if (!certificates.length) return <p className="text-sm text-[#8BA98F]">Belum ada certificate pribadi. Selesaikan Test Excel dan Challenge dulu ya.</p>
  return <div className="grid gap-3">{certificates.map((certificate) => <Link className="rounded-xl border border-[#1E3022] bg-[#0D1610] p-4 text-sm hover:border-[#254A2A]" key={certificate.certificateCode} to={ROUTES.PROFILE_CERTIFICATE_DETAIL(username, certificate.certificateCode)}><p className="font-semibold text-[#E8F0EA]">{certificate.title}</p><p className="mt-1 text-[#8BA98F]">{certificate.certificateCode} - skor {certificate.score} - {certificate.level}</p></Link>)}</div>
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return <div className="border-b border-[#1E3022] py-3 last:border-b-0"><p className="text-xs text-[#8BA98F]">{label}</p><p className="mt-1 text-sm font-semibold text-[#E8F0EA]">{value}</p></div>
}

function Notice({ tone, children }: { tone: 'success' | 'warning'; children: ReactNode }) {
  const className = tone === 'success' ? 'border-green-700/40 bg-green-950/25 text-green-200' : 'border-amber-800/40 bg-amber-950/20 text-amber-200'
  return <div className={`rounded-xl border p-4 text-sm ${className}`}>{children}</div>
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : []
}
