import { BriefcaseBusiness, CheckCircle2 } from 'lucide-react'
import { useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { LoginPromptCard, PortfolioPreview as PortfolioSummaryCard, ProfileSummaryCard } from '@/components/shared/AuthAwareCards'
import { ErrorState } from '@/components/shared/ErrorState'
import { LoadingState } from '@/components/shared/LoadingState'
import { PageMeta } from '@/components/shared/PageMeta'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import type { PortfolioPreview as PortfolioData } from '@/data/portfolio'
import { useAsyncData } from '@/hooks/useAsyncData'
import { getMockAuthState, type MockUserProfile } from '@/lib/authMock'
import { portfolioService } from '@/services/portfolioService'

function portfolioFromUser(user: MockUserProfile): PortfolioData {
  return {
    username: user.username,
    displayName: user.name,
    summary: `${user.bio} Portfolio ini berisi bukti belajar dari test, challenge, rumus yang dikuasai, dan certificate yang sudah aktif.`,
    testsCompleted: user.testsCompleted,
    averageScore: user.averageScore,
    skills: user.skills,
    formulaMastered: user.formulasMastered,
    certificates: user.certificates,
    updatedAt: user.joinedAt,
  }
}

export function PortfolioPage() {
  const { isAuthenticated, currentUser } = getMockAuthState()
  const loadPortfolios = useCallback(() => portfolioService.getPreviewResult(), [])
  const { data: portfolios, isFallback, error } = useAsyncData(loadPortfolios)

  return (
    <PublicLayout>
      <PageMeta title="Portfolio" />
      <section className="hero-grid pt-28 sm:pt-32">
        <div className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-green-700/50 bg-green-950/60 px-3 py-1 text-xs font-bold text-green-300">Portfolio skill</span>
            <h1 className="mt-5 font-display text-4xl font-bold text-[#E8F0EA] sm:text-5xl">Portfolio Excel yang ngumpulin bukti skill kamu</h1>
            <p className="mt-4 text-base leading-8 text-[#8BA98F]">Portfolio ini jadi tempat kamu menyimpan hasil Test Excel, challenge, rumus yang sudah dikuasai, certificate, dan ringkasan skill yang bisa dibagikan.</p>
          </div>

          {isFallback ? <div className="mt-8"><ErrorState message={error ?? 'Daftar portfolio memakai preview lokal; detail portfolio tetap bisa dibuka.'} /></div> : null}

          <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            {isAuthenticated && currentUser ? (
              <ProfileSummaryCard user={currentUser} />
            ) : (
              <LoginPromptCard title="Portfolio kamu belum aktif karena kamu belum login." body="Guest bisa lihat contoh portfolio, tapi hasil test, challenge, level, ranking, dan certificate nggak akan tersimpan sebelum kamu masuk." />
            )}
            {isAuthenticated && currentUser ? <PortfolioSummaryCard user={currentUser} /> : <PreviewRules />}
          </div>

          <div className="mt-10">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <h2 className="font-heading text-2xl font-bold text-[#E8F0EA]">Contoh portfolio publik</h2>
                <p className="mt-2 text-sm text-[#8BA98F]">Ini preview struktur portfolio. Portfolio personal kamu akan mengikuti hasil belajar yang tersimpan di akun.</p>
              </div>
              {currentUser ? <Button asChild variant="outline"><Link to={ROUTES.PORTFOLIO_DETAIL(currentUser.username)}>Lihat portfolio saya</Link></Button> : null}
            </div>
            <div className="mt-5 grid gap-5">
              {(portfolios ?? []).map((portfolio) => <PortfolioListCard key={portfolio.username} portfolio={portfolio} />)}
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}

export function PortfolioDetailPage() {
  const { isAuthenticated, currentUser } = getMockAuthState()
  const { username = 'peserta-demo' } = useParams()
  const personalPortfolio = currentUser && username === currentUser.username ? portfolioFromUser(currentUser) : null
  const loadPortfolio = useCallback(() => portfolioService.getByUsernameResult(username), [username])
  const { data: portfolio, isLoading, isFallback, error, reload } = useAsyncData(loadPortfolio, [username])
  const visiblePortfolio = personalPortfolio ?? portfolio

  return (
    <PublicLayout>
      <PageMeta title={`Portfolio ${visiblePortfolio?.displayName ?? ''}`} />
      <section className="hero-grid pt-28 sm:pt-32">
        <div className="mx-auto max-w-5xl space-y-6 px-4 pb-20 sm:px-6">
          {!isAuthenticated ? <LoginPromptCard title="Masuk dulu biar portfolio ini bisa jadi milik kamu." body="Guest bisa melihat contoh detail portfolio. Kalau kamu login, hasil test dan challenge bisa masuk ke portfolio pribadi." /> : null}
          {isFallback && !personalPortfolio ? <ErrorState message={`Backend portfolio belum bisa diakses, detail memakai fallback lokal. ${error ?? ''}`} onRetry={reload} /> : null}
          {isLoading && !personalPortfolio ? <LoadingState label="Memuat portfolio..." /> : null}
          {!isLoading || personalPortfolio ? visiblePortfolio ? <PortfolioDetailCard portfolio={visiblePortfolio} isPersonal={Boolean(personalPortfolio)} /> : null : null}
        </div>
      </section>
    </PublicLayout>
  )
}

function PortfolioListCard({ portfolio }: { portfolio: PortfolioData }) {
  return (
    <Link className="rounded-2xl border border-[#1E3022] bg-[#111E14] p-6 hover:border-[#254A2A]" to={ROUTES.PORTFOLIO_DETAIL(portfolio.username)}>
      <BriefcaseBusiness className="h-8 w-8 text-green-400" />
      <h3 className="mt-4 font-heading text-xl font-bold">{portfolio.displayName}</h3>
      <p className="mt-2 text-sm text-[#8BA98F]">{portfolio.testsCompleted} test selesai - skor rata-rata {portfolio.averageScore}</p>
      <div className="mt-4 flex flex-wrap gap-2">{portfolio.formulaMastered.slice(0, 4).map((formula) => <span className="rounded-full border border-[#254A2A] px-2.5 py-1 text-xs text-green-300" key={formula}>{formula}</span>)}</div>
    </Link>
  )
}

function PortfolioDetailCard({ portfolio, isPersonal }: { portfolio: PortfolioData; isPersonal: boolean }) {
  return (
    <div className="rounded-2xl border border-[#254A2A] bg-[#111E14] p-8 shadow-card">
      <BriefcaseBusiness className="h-10 w-10 text-green-400" />
      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-green-400">{isPersonal ? 'Portfolio pribadi' : 'Preview portfolio'}</p>
      <h1 className="mt-3 font-display text-4xl font-bold text-[#E8F0EA]">{portfolio.displayName}</h1>
      <p className="mt-4 text-base leading-8 text-[#8BA98F]">{portfolio.summary}</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Stat label="Test selesai" value={String(portfolio.testsCompleted)} />
        <Stat label="Skor rata-rata" value={String(portfolio.averageScore)} />
        <Stat label="Update" value={portfolio.updatedAt} />
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <List title="Skill terbukti" items={portfolio.skills} />
        <List title="Rumus dikuasai" items={portfolio.formulaMastered} />
      </div>
      <div className="mt-8 rounded-xl border border-[#1E3022] bg-[#0D1610] p-5">
        <h2 className="font-heading text-lg font-bold">Progress ongoing</h2>
        <p className="mt-2 text-sm leading-6 text-[#8BA98F]">Portfolio akan bertambah saat kamu menyelesaikan Test Excel, Challenge, dan certificate baru. Kalau masih guest, progress ini cuma contoh dan belum tersimpan.</p>
      </div>
      <Button asChild className="mt-8"><Link to={ROUTES.CERTIFICATE_DETAIL(portfolio.certificates[0] ?? 'BE-CERT-0001')}>Lihat Certificate</Link></Button>
    </div>
  )
}

function PreviewRules() {
  return (
    <div className="rounded-2xl border border-[#1E3022] bg-[#111E14] p-6">
      <h2 className="font-heading text-xl font-bold">Yang tersimpan setelah login</h2>
      <div className="mt-4 space-y-2">
        {['Riwayat Test Excel dan skor rata-rata', 'Challenge yang selesai dan checklist skill', 'Level, ranking belajar, certificate, dan portfolio'].map((item) => <p className="flex items-center gap-2 text-sm text-[#8BA98F]" key={item}><CheckCircle2 className="h-4 w-4 text-green-400" />{item}</p>)}
      </div>
      <p className="mt-4 text-sm leading-6 text-[#8BA98F]">Mode guest tetap bisa dipakai buat coba-coba. Tapi kalau mau bukti skill kamu tersusun rapi, masuk dulu biar datanya nyangkut ke akun.</p>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) { return <div className="rounded-xl border border-[#1E3022] bg-[#0D1610] p-4"><p className="text-xs text-[#8BA98F]">{label}</p><p className="mt-1 font-display text-2xl font-bold text-[#E8F0EA]">{value}</p></div> }
function List({ title, items }: { title: string; items: string[] }) { return <div><h2 className="font-heading text-lg font-bold">{title}</h2><div className="mt-3 space-y-2">{items.map((item) => <p className="flex items-center gap-2 text-sm text-[#8BA98F]" key={item}><CheckCircle2 className="h-4 w-4 text-green-400" />{item}</p>)}</div></div> }