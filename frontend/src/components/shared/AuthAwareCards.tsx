import { Award, BarChart3, BriefcaseBusiness, CheckCircle2, Lock, Medal, UserCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import type { MockUserProfile, SkillLevel } from '@/lib/authMock'

export function LevelBadge({ level }: { level: SkillLevel }) {
  return <span className="inline-flex rounded-full border border-green-700/50 bg-green-600/15 px-3 py-1 text-xs font-bold text-green-300">Level {level}</span>
}

export function GuestNotice({ children = 'Kamu bisa coba fitur ini tanpa login. Tapi hasilnya cuma tampil sementara dan nggak akan masuk ke portfolio, level, ranking belajar, atau certificate kamu.' }: { children?: string }) {
  return <div className="rounded-2xl border border-amber-800/40 bg-amber-950/20 p-5 text-sm text-amber-100"><div className="flex gap-3"><Lock className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" /><div><h2 className="font-heading font-bold">Mode guest aktif</h2><p className="mt-1 leading-6 text-amber-200">{children}</p><div className="mt-3 flex flex-wrap gap-2"><Button asChild size="sm"><Link to={ROUTES.LOGIN}>Masuk biar progress tersimpan</Link></Button><Button asChild size="sm" variant="outline"><Link to={ROUTES.REGISTER}>Daftar gratis</Link></Button></div></div></div></div>
}

export function LoginPromptCard({ title = 'Masuk dulu biar progress kamu nggak hilang.', body = 'Kalau kamu login, hasil test, challenge, level, ranking belajar, portfolio, dan certificate bisa disiapkan untuk akun kamu.' }: { title?: string; body?: string }) {
  return <div className="rounded-2xl border border-[#254A2A] bg-[#111E14] p-6 shadow-card"><UserCircle className="h-8 w-8 text-green-400" /><h2 className="mt-4 font-heading text-xl font-bold text-[#E8F0EA]">{title}</h2><p className="mt-2 text-sm leading-6 text-[#8BA98F]">{body}</p><div className="mt-5 flex flex-col gap-2 sm:flex-row"><Button asChild><Link to={ROUTES.LOGIN}>Masuk</Link></Button><Button asChild variant="outline"><Link to={ROUTES.REGISTER}>Daftar Gratis</Link></Button></div></div>
}

export function ProfileSummaryCard({ user }: { user: MockUserProfile }) {
  return <div className="rounded-2xl border border-[#254A2A] bg-[#111E14] p-6 shadow-card"><div className="flex flex-col gap-5 sm:flex-row sm:items-center"><div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-green-700/50 bg-green-950/60 text-2xl font-bold text-green-300">{user.name.charAt(0)}</div><div className="min-w-0"><p className="text-sm text-green-400">Halo, {user.name}</p><h1 className="mt-1 font-heading text-3xl font-bold text-[#E8F0EA]">@{user.username}</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-[#8BA98F]">{user.bio}</p></div><div className="sm:ml-auto"><LevelBadge level={user.level} /></div></div></div>
}

export function SkillProgressCard({ user }: { user: MockUserProfile }) {
  return <div className="rounded-2xl border border-[#1E3022] bg-[#111E14] p-6"><div className="flex items-center justify-between gap-4"><div><h2 className="font-heading text-xl font-bold">Progress belajar</h2><p className="mt-1 text-sm text-[#8BA98F]">Pelan-pelan aja, yang penting naik level.</p></div><BarChart3 className="h-7 w-7 text-green-400" /></div><div className="mt-5 h-2 overflow-hidden rounded-full bg-[#1E3022]"><div className="h-full rounded-full bg-gradient-to-r from-green-600 to-green-400" style={{ width: `${user.progressPercent}%` }} /></div><div className="mt-5 grid gap-3 sm:grid-cols-3"><MiniStat label="Test selesai" value={String(user.testsCompleted)} /><MiniStat label="Challenge" value={String(user.challengesCompleted)} /><MiniStat label="Skor rata-rata" value={String(user.averageScore)} /></div></div>
}

export function RankingPreview({ user }: { user: MockUserProfile }) {
  return <div className="rounded-2xl border border-[#1E3022] bg-[#111E14] p-6"><Medal className="h-8 w-8 text-amber-400" /><h2 className="mt-4 font-heading text-xl font-bold">Ranking Belajar</h2><p className="mt-2 text-sm leading-6 text-[#8BA98F]">Ranking belajar ini dibuat buat bantu kamu lihat progress, bukan buat bikin kamu minder. Pelan-pelan aja, yang penting naik level.</p><p className="mt-4 font-display text-3xl font-bold text-[#E8F0EA]">#{user.ranking}</p></div>
}

export function PortfolioPreview({ user }: { user: MockUserProfile }) {
  return <div className="rounded-2xl border border-[#1E3022] bg-[#111E14] p-6"><BriefcaseBusiness className="h-8 w-8 text-green-400" /><h2 className="mt-4 font-heading text-xl font-bold">Portfolio Skill</h2><p className="mt-2 text-sm leading-6 text-[#8BA98F]">Portfolio ini jadi tempat kamu ngumpulin bukti skill Excel dari test, challenge, dan certificate.</p><div className="mt-4 flex flex-wrap gap-2">{user.formulasMastered.map((formula) => <span className="rounded-full border border-[#254A2A] px-2.5 py-1 text-xs text-green-300" key={formula}>{formula}</span>)}</div><Button asChild className="mt-5" variant="outline"><Link to={ROUTES.PORTFOLIO_DETAIL(user.username)}>Lihat Portfolio</Link></Button></div>
}

export function CertificateEligibilityCard({ user }: { user?: MockUserProfile | null }) {
  if (!user) return <LoginPromptCard title="Masuk dulu untuk membuat certificate berdasarkan hasil test kamu." body="Guest tetap bisa belajar dan mencoba test, tapi certificate baru aktif setelah hasil test tersimpan di akun." />
  return <div className="rounded-2xl border border-[#1E3022] bg-[#111E14] p-6"><Award className="h-8 w-8 text-amber-400" /><h2 className="mt-4 font-heading text-xl font-bold">Certificate Eligibility</h2><p className="mt-2 text-sm leading-6 text-[#8BA98F]">Certificate ini bukan cuma tampilan keren. Bagian bukti kompetensi akan menampilkan rumus, skill, test, challenge, dan skor yang sudah kamu bangun.</p><div className="mt-4 space-y-2">{['User login', `${user.testsCompleted} test selesai`, `Skor rata-rata ${user.averageScore}`, `${user.certificates.length} certificate aktif`].map((item) => <p className="flex items-center gap-2 text-sm text-[#8BA98F]" key={item}><CheckCircle2 className="h-4 w-4 text-green-400" />{item}</p>)}</div></div>
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return <div className="rounded-xl border border-[#1E3022] bg-[#0D1610] p-4"><p className="text-xs text-[#8BA98F]">{label}</p><p className="mt-1 font-display text-2xl font-bold text-[#E8F0EA]">{value}</p></div>
}