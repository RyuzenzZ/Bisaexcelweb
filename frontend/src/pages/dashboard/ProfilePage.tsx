import { Link } from 'react-router-dom'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { PageMeta } from '@/components/shared/PageMeta'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/contexts/AuthContext'

export function ProfilePage() {
  const { user, profile, progress } = useAuth()
  const formulas = Array.isArray(progress?.formulasMastered) ? progress.formulasMastered : []
  const skills = Array.isArray(progress?.skills) ? progress.skills : []

  return (
    <DashboardLayout>
      <PageMeta title="Profile" />
      <section className="space-y-6">
        <div className="rounded-2xl border border-[#254A2A] bg-[#111E14] p-6 shadow-card">
          <p className="text-sm text-green-400">Profile backend</p>
          <h1 className="mt-1 font-heading text-3xl font-bold text-[#E8F0EA]">{user?.name}</h1>
          <p className="mt-2 text-sm text-[#8BA98F]">@{user?.username} - {profile?.bio ?? 'Belum ada bio.'}</p>
          <p className="mt-3 text-sm text-amber-300">Level {progress?.level ?? profile?.level ?? 'Pemula'} - Ranking {progress?.rank ? `#${progress.rank}` : 'belum ada'}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          <Stat label="Total skor" value={String(progress?.totalScore ?? 0)} />
          <Stat label="Test selesai" value={String(progress?.testsCompleted ?? 0)} />
          <Stat label="Challenge" value={String(progress?.challengesCompleted ?? 0)} />
          <Stat label="Rata-rata" value={String(progress?.averageScore ?? 0)} />
        </div>
        <div className="rounded-2xl border border-[#1E3022] bg-[#111E14] p-6">
          <h2 className="font-heading text-xl font-bold">Skill dan rumus</h2>
          <div className="mt-4 flex flex-wrap gap-2">{[...formulas, ...skills].length ? Array.from(new Set([...formulas, ...skills])).map((item) => <span className="rounded-full border border-[#254A2A] px-3 py-1 text-sm text-green-300" key={item}>{item}</span>) : <p className="text-sm text-[#8BA98F]">Belum ada skill tercatat. Submit play case pertama dulu.</p>}</div>
          <Button asChild className="mt-5"><Link to={ROUTES.TEST_EXCEL}>Gas lanjut test</Link></Button>
        </div>
      </section>
    </DashboardLayout>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-[#1E3022] bg-[#111E14] p-5"><p className="text-xs text-[#8BA98F]">{label}</p><p className="mt-2 font-display text-2xl font-bold text-[#E8F0EA]">{value}</p></div>
}