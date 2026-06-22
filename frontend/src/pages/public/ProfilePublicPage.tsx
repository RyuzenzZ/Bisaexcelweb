import { Award, BarChart3, BriefcaseBusiness, CheckCircle2, Medal, UserCircle } from 'lucide-react'
import { useCallback, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { LoginPromptCard } from '@/components/shared/AuthAwareCards'
import { EmptyState } from '@/components/shared/EmptyState'
import { ErrorState } from '@/components/shared/ErrorState'
import { LoadingState } from '@/components/shared/LoadingState'
import { PageMeta } from '@/components/shared/PageMeta'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/contexts/AuthContext'
import { certificates as fallbackCertificates } from '@/data/certificates'
import { playCases } from '@/data/playCases'
import { useAsyncData } from '@/hooks/useAsyncData'
import type { AuthProgress } from '@/services/authService'
import { certificateService, type VerifiedCertificateResult } from '@/services/certificateService'
import { emptyEligibility, profileService, type ProfileCertificatesData, type PublicPortfolioData, type PublicProfileData, type UserCertificate } from '@/services/profileService'
import { mockUser } from '@/lib/authMock'

function fallbackProfile(username: string): PublicProfileData {
  const progress: AuthProgress = {
    id: 'fallback-progress',
    userId: 'fallback-user',
    level: mockUser.level,
    totalScore: mockUser.averageScore * mockUser.testsCompleted,
    testsCompleted: mockUser.testsCompleted,
    challengesCompleted: mockUser.challengesCompleted,
    competitionsCompleted: 0,
    averageScore: mockUser.averageScore,
    formulasMastered: mockUser.formulasMastered,
    skills: mockUser.skills,
    rank: mockUser.ranking,
    updatedAt: new Date().toISOString(),
  }
  return {
    user: { id: 'fallback-user', name: username === 'demo-user' ? 'Peserta Demo' : username.replace(/[-_]/g, ' '), username, email: `${username}@preview.local`, avatarUrl: null, role: 'USER' },
    profile: { id: 'fallback-profile', userId: 'fallback-user', bio: 'Profile preview lokal saat backend belum merespons.', level: mockUser.level, headline: 'Belajar Excel dari nol', location: null, joinedAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    progress,
  }
}

function fallbackPortfolio(username: string): PublicPortfolioData {
  const profile = fallbackProfile(username)
  return {
    ...profile,
    attempts: [],
    challenges: [],
    certificates: [],
    recommendations: mockUser.recommendations,
    emptyMessage: 'Profile ini belum punya progress. Coba selesaikan Test Excel pertama biar portfolio mulai kebentuk.',
  }
}

function fallbackCertificateData(progress?: AuthProgress | null): ProfileCertificatesData {
  return { certificates: [], eligibility: emptyEligibility(progress) }
}

export function PublicProfilePage() {
  const { isAuthenticated } = useAuth()
  const { username = 'demo-user' } = useParams()
  const loadProfile = useCallback(() => profileService.getByUsernameResult(username, fallbackProfile(username)), [username])
  const { data, isLoading, isFallback, error, reload } = useAsyncData(loadProfile, [username])

  return <ProfileShell active="overview" data={data} fallbackMessage={isFallback ? error : undefined} isLoading={isLoading} onRetry={reload}><div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"><ProgressPanel progress={data?.progress ?? null} /><RankingPanel progress={data?.progress ?? null} /></div><ActivityPanel username={username} />{!isAuthenticated ? <LoginPromptCard title="Ini profile publik. Masuk dulu biar profile kamu sendiri aktif." body="Kalau login, hasil play, challenge, level, ranking belajar, portfolio, dan certificate bisa disiapkan untuk akun kamu." /> : null}</ProfileShell>
}

export function PublicProfilePortfolioPage() {
  const { username = 'demo-user' } = useParams()
  const loadPortfolio = useCallback(() => profileService.getPortfolioResult(username, fallbackPortfolio(username)), [username])
  const { data, isLoading, isFallback, error, reload } = useAsyncData(loadPortfolio, [username])
  const progress = data?.progress ?? null
  const formulas = asStringArray(progress?.formulasMastered)
  const skills = asStringArray(progress?.skills)

  return <ProfileShell active="portfolio" data={data} fallbackMessage={isFallback ? error : undefined} isLoading={isLoading} onRetry={reload}><div className="rounded-2xl border border-[#254A2A] bg-[#111E14] p-6 shadow-card"><BriefcaseBusiness className="h-9 w-9 text-green-400" /><h2 className="mt-4 font-heading text-2xl font-bold">Portfolio Skill</h2><p className="mt-2 text-sm leading-6 text-[#8BA98F]">Portfolio ini ngumpulin bukti skill dari test, challenge, certificate, dan studi kasus yang sudah selesai.</p><div className="mt-6 grid gap-3 sm:grid-cols-4"><Stat label="Test selesai" value={String(progress?.testsCompleted ?? 0)} /><Stat label="Challenge" value={String(progress?.challengesCompleted ?? 0)} /><Stat label="Skor rata-rata" value={String(progress?.averageScore ?? 0)} /><Stat label="Ranking" value={progress?.rank ? `#${progress.rank}` : '-'} /></div><div className="mt-8 grid gap-6 md:grid-cols-2"><List title="Rumus dikuasai" items={formulas} empty="Belum ada rumus tercatat." /><List title="Skill badge" items={skills} empty="Belum ada skill tercatat." /></div></div><div className="rounded-2xl border border-[#1E3022] bg-[#111E14] p-6"><h2 className="font-heading text-xl font-bold">Studi kasus selesai</h2><RecordList items={data?.attempts ?? []} empty={data?.emptyMessage ?? 'Profile ini belum punya progress. Coba selesaikan Test Excel pertama biar portfolio mulai kebentuk.'} /></div><RecommendationPanel recommendations={data?.recommendations ?? []} /></ProfileShell>
}

export function PublicProfileCertificatePage() {
  const { username = 'demo-user' } = useParams()
  const loadProfile = useCallback(() => profileService.getByUsernameResult(username, fallbackProfile(username)), [username])
  const { data: profileData } = useAsyncData(loadProfile, [username])
  const loadCertificates = useCallback(() => profileService.getCertificatesResult(username, fallbackCertificateData(profileData?.progress)), [profileData?.progress, username])
  const { data, isLoading, isFallback, error, reload } = useAsyncData(loadCertificates, [username, profileData?.progress])

  return <ProfileShell active="certificate" data={profileData} fallbackMessage={isFallback ? error : undefined} isLoading={isLoading} onRetry={reload}><div className="rounded-2xl border border-[#254A2A] bg-[#111E14] p-6 shadow-card"><Award className="h-9 w-9 text-amber-400" /><h2 className="mt-4 font-heading text-2xl font-bold">Certificate</h2><p className="mt-2 text-sm leading-6 text-[#8BA98F]">Certificate muncul kalau hasil test sudah memenuhi syarat. Bagian bukti kompetensi menampilkan skill, rumus, dan studi kasus pendukung.</p><div className="mt-6 grid gap-3 md:grid-cols-2"><CertificateCards certificates={data?.certificates ?? []} username={username} /></div></div><EligibilityPanel data={data} /></ProfileShell>
}

export function PublicProfileCertificateDetailPage() {
  const { username = 'demo-user', id = 'BE-CERT-0001' } = useParams()
  const loadVerified = useCallback(() => certificateService.verify(id).then((data) => ({ data, source: 'backend' as const })).catch((error) => ({ data: fallbackVerifiedCertificate(id, username), source: 'fallback' as const, error: error instanceof Error ? error.message : 'Certificate belum bisa diverifikasi.' })), [id, username])
  const { data, isLoading, isFallback, error, reload } = useAsyncData<VerifiedCertificateResult>(loadVerified, [id, username])

  return <ProfileShell active="certificate" data={fallbackProfile(data?.username ?? username)} fallbackMessage={isFallback ? error : undefined} isLoading={isLoading} onRetry={reload}><div className="rounded-2xl border border-[#254A2A] bg-[#111E14] p-8 shadow-card"><Award className="h-12 w-12 text-amber-400" /><p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-green-400">Certificate utama</p><h1 className="mt-3 font-display text-4xl font-bold text-[#E8F0EA]">{data?.name ?? 'Peserta BisaExcel'}</h1><p className="mt-4 text-[#8BA98F]">Menyelesaikan {data?.title ?? 'Test Excel'} dengan level kemampuan {data?.level ?? 'Pemula'}.</p><div className="mt-6 grid gap-3 sm:grid-cols-3"><Stat label="Tanggal" value={formatDate(data?.issuedAt)} /><Stat label="ID" value={data?.certificateCode ?? id} /><Stat label="Status" value={data?.isValid ? 'Terverifikasi' : 'Preview MVP'} /></div></div><div className="rounded-2xl border border-[#254A2A] bg-[#111E14] p-8 shadow-card"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-400">Bukti kompetensi</p><h2 className="mt-3 font-heading text-3xl font-bold">Skill Evidence</h2><p className="mt-2 text-sm text-[#8BA98F]">Bukti ini berisi rumus, skill, dan studi kasus yang mendukung certificate.</p><div className="mt-6 grid gap-6 md:grid-cols-2"><List title="Rumus yang dikuasai" items={data?.formulaMastered ?? []} empty="Belum ada rumus tercatat." /><List title="Skill terbukti" items={data?.skillEvidence ?? []} empty="Belum ada skill evidence tercatat." /></div></div></ProfileShell>
}

function ProfileShell({ data, active, children, isLoading, fallbackMessage, onRetry }: { data: PublicProfileData | null; active: 'overview' | 'portfolio' | 'certificate'; children: ReactNode; isLoading?: boolean; fallbackMessage?: string; onRetry?: () => void }) {
  const progress = data?.progress
  return <PublicLayout><PageMeta title={`Profile ${data?.user.username ?? 'BisaExcel'}`} /><section className="hero-grid pt-28 sm:pt-32"><div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">{fallbackMessage ? <div className="mb-6"><ErrorState message={`Backend profile belum bisa diakses penuh, fallback lokal dipakai. ${fallbackMessage}`} onRetry={onRetry} /></div> : null}{isLoading ? <LoadingState label="Memuat profile..." /> : null}{!isLoading && !data ? <EmptyState message="Profile ini belum punya progress. Coba selesaikan Test Excel pertama biar portfolio mulai kebentuk." /> : null}{!isLoading && data ? <><div className="rounded-2xl border border-[#254A2A] bg-[#111E14] p-6 shadow-card sm:p-8"><div className="flex flex-col gap-5 sm:flex-row sm:items-center"><div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-green-700/50 bg-green-950/60 text-3xl font-bold text-green-300"><UserCircle className="h-10 w-10" /></div><div><p className="text-sm text-green-400">Profile BisaExcel</p><h1 className="mt-1 font-display text-4xl font-bold text-[#E8F0EA]">{data.user.name}</h1><p className="mt-1 text-sm text-[#8BA98F]">@{data.user.username} - {data.profile?.bio ?? 'Profile ini belum punya progress. Coba selesaikan Test Excel pertama biar portfolio mulai kebentuk.'}</p></div><div className="sm:ml-auto"><span className="rounded-full border border-green-700/50 bg-green-600/15 px-3 py-1 text-xs font-bold text-green-300">Level {progress?.level ?? data.profile?.level ?? 'Pemula'}</span></div></div><div className="mt-6 grid gap-3 sm:grid-cols-5"><Stat label="Ranking" value={progress?.rank ? `#${progress.rank}` : '-'} /><Stat label="Total skor" value={String(progress?.totalScore ?? 0)} /><Stat label="Test" value={String(progress?.testsCompleted ?? 0)} /><Stat label="Challenge" value={String(progress?.challengesCompleted ?? 0)} /><Stat label="Rata-rata" value={String(progress?.averageScore ?? 0)} /></div><div className="mt-6 flex flex-wrap gap-2"><Tab active={active === 'overview'} to={ROUTES.PROFILE_PUBLIC(data.user.username)}>Overview</Tab><Tab active={active === 'portfolio'} to={ROUTES.PROFILE_PORTFOLIO(data.user.username)}>Portfolio</Tab><Tab active={active === 'certificate'} to={ROUTES.PROFILE_CERTIFICATE(data.user.username)}>Certificate</Tab></div></div><div className="mt-6 space-y-6">{children}</div></> : null}</div></section></PublicLayout>
}

function Tab({ active, to, children }: { active: boolean; to: string; children: string }) { return <Link className={`rounded-full border px-4 py-2 text-sm font-bold ${active ? 'border-green-600 bg-green-600 text-white' : 'border-[#254A2A] text-[#8BA98F] hover:text-[#E8F0EA]'}`} to={to}>{children}</Link> }
function ProgressPanel({ progress }: { progress: AuthProgress | null }) { return <div className="rounded-2xl border border-[#1E3022] bg-[#111E14] p-6"><BarChart3 className="h-8 w-8 text-green-400" /><h2 className="mt-4 font-heading text-xl font-bold">Progress level</h2><div className="mt-4 h-2 rounded-full bg-[#1E3022]"><div className="h-full rounded-full bg-green-500" style={{ width: `${Math.min(100, (progress?.testsCompleted ?? 0) * 12 + (progress?.challengesCompleted ?? 0) * 10)}%` }} /></div><p className="mt-3 text-sm text-[#8BA98F]">{progress ? `Level ${progress.level}, total skor ${progress.totalScore}.` : 'Profile ini belum punya progress. Coba selesaikan Test Excel pertama biar portfolio mulai kebentuk.'}</p></div> }
function RankingPanel({ progress }: { progress: AuthProgress | null }) { return <div className="rounded-2xl border border-[#1E3022] bg-[#111E14] p-6"><Medal className="h-8 w-8 text-amber-400" /><h2 className="mt-4 font-heading text-xl font-bold">Ranking belajar</h2><p className="mt-2 text-sm text-[#8BA98F]">Ranking dibuat buat bantu lihat progress, bukan buat bikin minder.</p><p className="mt-4 font-display text-4xl font-bold">{progress?.rank ? `#${progress.rank}` : '-'}</p></div> }
function ActivityPanel({ username }: { username: string }) { const completedCases = playCases.slice(0, 3); return <div className="rounded-2xl border border-[#1E3022] bg-[#111E14] p-6"><h2 className="font-heading text-xl font-bold">Aktivitas publik</h2><p className="mt-2 text-sm text-[#8BA98F]">Aktivitas real user akan tampil dari backend setelah ada PlayAttempt atau ChallengeCompletion untuk @{username}.</p><div className="mt-4 grid gap-3">{completedCases.map((item) => <Link className="rounded-xl border border-[#1E3022] bg-[#0D1610] p-4 text-sm text-[#8BA98F] hover:border-[#254A2A]" key={item.slug} to={ROUTES.TEST_EXCEL_DETAIL(item.slug)}>{item.title}</Link>)}</div></div> }
function RecommendationPanel({ recommendations }: { recommendations: string[] }) { return <div className="rounded-2xl border border-[#1E3022] bg-[#111E14] p-6"><h2 className="font-heading text-xl font-bold">Rekomendasi belajar</h2><div className="mt-4 grid gap-3">{recommendations.length ? recommendations.map((item) => <p className="rounded-xl border border-[#1E3022] bg-[#0D1610] p-4 text-sm text-[#8BA98F]" key={item}>{item}</p>) : <p className="text-sm text-[#8BA98F]">Rekomendasi muncul setelah progress mulai kebaca.</p>}</div><Button asChild className="mt-5"><Link to={ROUTES.TEST_EXCEL}>Gas lanjut test</Link></Button></div> }
function EligibilityPanel({ data }: { data: ProfileCertificatesData | null }) { return <div className="rounded-2xl border border-[#1E3022] bg-[#111E14] p-6"><h2 className="font-heading text-xl font-bold">Status eligible certificate</h2><div className="mt-4 space-y-2">{(data?.eligibility.requirements ?? []).map((item) => <p className="flex items-center gap-2 text-sm text-[#8BA98F]" key={item.label}><CheckCircle2 className={`h-4 w-4 ${item.passed ? 'text-green-400' : 'text-amber-400'}`} />{item.label}: {item.current}/{item.target}</p>)}</div></div> }
function CertificateCards({ certificates, username }: { certificates: UserCertificate[]; username: string }) { if (!certificates.length) return <p className="text-sm text-[#8BA98F]">Belum ada certificate personal dari backend.</p>; return <>{certificates.map((certificate) => <Link className="rounded-xl border border-[#1E3022] bg-[#0D1610] p-5 hover:border-[#254A2A]" key={certificate.certificateCode} to={ROUTES.PROFILE_CERTIFICATE_DETAIL(username, certificate.certificateCode)}><p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">{certificate.certificateCode}</p><h3 className="mt-2 font-heading text-lg font-bold">{certificate.title}</h3><p className="mt-2 text-sm text-[#8BA98F]">Skor {certificate.score} - {certificate.level}</p></Link>)}</> }
function RecordList({ items, empty }: { items: Array<Record<string, unknown>>; empty: string }) { if (!items.length) return <p className="text-sm text-[#8BA98F]">{empty}</p>; return <div className="mt-4 grid gap-3">{items.map((item, index) => <Link className="rounded-xl border border-[#1E3022] bg-[#0D1610] p-4 hover:border-[#254A2A]" key={String(item.id ?? index)} to={ROUTES.TEST_EXCEL_DETAIL(String(item.slug ?? 'rekap-penjualan-harian'))}><p className="font-semibold text-[#E8F0EA]">{String(item.slug ?? 'Studi kasus')}</p><p className="mt-1 text-sm text-[#8BA98F]">Skor {String(item.score ?? 0)} - {String(item.totalPoints ?? 0)} poin</p></Link>)}</div> }
function Stat({ label, value }: { label: string; value: string }) { return <div className="rounded-xl border border-[#1E3022] bg-[#0D1610] p-4"><p className="text-xs text-[#8BA98F]">{label}</p><p className="mt-1 font-display text-xl font-bold text-[#E8F0EA]">{value}</p></div> }
function List({ title, items, empty }: { title: string; items: string[]; empty: string }) { return <div><h3 className="font-heading text-lg font-bold">{title}</h3><div className="mt-3 space-y-2">{items.length ? items.map((item) => <p className="flex items-center gap-2 text-sm text-[#8BA98F]" key={item}><CheckCircle2 className="h-4 w-4 text-green-400" />{item}</p>) : <p className="text-sm text-[#8BA98F]">{empty}</p>}</div></div> }
function asStringArray(value: unknown): string[] { return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [] }
function formatDate(value?: string) { return value ? value.slice(0, 10) : '-' }
function fallbackVerifiedCertificate(id: string, username: string): VerifiedCertificateResult { const certificate = fallbackCertificates.find((item) => item.certificateCode === id || item.id === id); return { isValid: Boolean(certificate), certificateCode: certificate?.certificateCode ?? id, name: certificate?.userName ?? username.replace(/[-_]/g, ' '), username, title: certificate?.testTitle ?? 'Certificate BisaExcel', level: certificate?.level ?? 'Pemula', issuedAt: certificate?.issuedAt, formulaMastered: certificate?.formulaMastered ?? [], skillEvidence: certificate?.skills ?? [] } }
