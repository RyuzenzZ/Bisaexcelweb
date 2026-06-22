import { ArrowRight, CheckCircle2, ClipboardCheck, Download } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { GuestNotice, LoginPromptCard } from '@/components/shared/AuthAwareCards'
import { EmptyState } from '@/components/shared/EmptyState'
import { ErrorState } from '@/components/shared/ErrorState'
import { LoadingState } from '@/components/shared/LoadingState'
import { PageMeta } from '@/components/shared/PageMeta'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import type { PlayCase } from '@/data/playCases'
import { useAsyncData } from '@/hooks/useAsyncData'
import { useAuth } from '@/contexts/AuthContext'
import { challengesService } from '@/services/challengesService'
import { playCasesService } from '@/services/playCasesService'

export function ChallengePage() {
  const { isAuthenticated } = useAuth()
  const loadCases = useCallback(() => playCasesService.getAllResult(), [])
  const { data: cases, isLoading, isFallback, error, reload } = useAsyncData(loadCases)
  const challenges = useMemo(() => (cases ?? []).filter((playCase) => playCase.mode === 'challenge'), [cases])

  return (
    <PublicLayout>
      <PageMeta title="Challenge" />
      <section className="hero-grid pt-28 sm:pt-32"><div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="max-w-3xl"><span className="inline-flex rounded-full border border-green-700/50 bg-green-950/60 px-3 py-1 text-xs font-bold text-green-300">Challenge praktik</span><h1 className="mt-5 font-display text-4xl font-bold text-[#E8F0EA] sm:text-5xl">Mini task Excel dari sheet kerja</h1><p className="mt-4 text-base leading-8 text-[#8BA98F]">Challenge fokus ke output kerja: rapikan data, bikin rekap, atau susun monitoring. Nggak semua harus auto grading penuh, tapi progress bisa masuk profile kalau kamu login.</p></div>
        {!isAuthenticated ? <div className="mt-8"><GuestNotice>Kamu bisa coba challenge ini tanpa login, tapi progress-nya belum bisa tersimpan. Masuk dulu biar hasilnya masuk ke profile kamu.</GuestNotice></div> : null}
        {isFallback ? <div className="mt-8"><ErrorState message={`Backend play-cases belum bisa diakses, challenge memakai data lokal. ${error ?? ''}`} onRetry={reload} /></div> : null}
        {isLoading ? <div className="mt-10"><LoadingState label="Memuat challenge..." /></div> : null}
        {!isLoading && !challenges.length ? <div className="mt-10"><EmptyState message="Belum ada challenge praktik." icon={ClipboardCheck} /></div> : null}
        {!isLoading && challenges.length ? <div className="mt-10 grid gap-5 md:grid-cols-2">{challenges.map((challenge) => <ChallengeCard challenge={challenge} key={challenge.slug} />)}</div> : null}
      </div></section>
    </PublicLayout>
  )
}

export function ChallengeDetailPage() {
  const { isAuthenticated } = useAuth()
  const { slug = '' } = useParams()
  const loadCase = useCallback(() => playCasesService.getBySlugResult(slug), [slug])
  const { data: challenge, isLoading, isFallback, error, reload } = useAsyncData(loadCase, [slug])

  return (
    <PublicLayout>
      <PageMeta title={challenge?.title ?? 'Challenge'} />
      <section className="hero-grid pt-28 sm:pt-32"><div className="mx-auto max-w-4xl px-4 pb-20 sm:px-6">
        {isFallback ? <div className="mb-6"><ErrorState message={`Backend belum bisa diakses, detail memakai fallback lokal. ${error ?? ''}`} onRetry={reload} /></div> : null}
        {isLoading ? <LoadingState label="Memuat detail challenge..." /> : null}
        {!isLoading && !challenge ? <EmptyState message="Challenge tidak ditemukan." icon={ClipboardCheck} /> : null}
        {!isLoading && challenge ? <div className="space-y-5">{!isAuthenticated ? <GuestNotice>Kamu bisa membuka instruksi challenge ini. Status selesai belum tersimpan selama kamu masih guest.</GuestNotice> : null}<ChallengeDetailCard challenge={challenge} /></div> : null}
      </div></section>
    </PublicLayout>
  )
}

export function ChallengePlayPage() {
  const { isAuthenticated, refreshMe } = useAuth()
  const { slug = '' } = useParams()
  const loadCase = useCallback(() => playCasesService.getBySlugResult(slug), [slug])
  const { data: challenge, isLoading } = useAsyncData(loadCase, [slug])
  const [completed, setCompleted] = useState(false)
  const [status, setStatus] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const checklist = ['Baca rules dan output yang diharapkan', 'Buka dataset di Excel atau spreadsheet', 'Buat rekap atau dashboard sesuai instruksi', 'Cek hasil akhir sebelum ditandai selesai', 'Simpan file kerja kamu secara lokal']

  async function handleComplete() {
    if (!challenge) return
    if (!isAuthenticated) {
      setCompleted(true)
      setStatus('Kamu bisa coba challenge ini tanpa login, tapi progress-nya belum bisa tersimpan. Masuk dulu biar hasilnya masuk ke profile kamu.')
      return
    }

    setIsSaving(true)
    setStatus('')
    try {
      await challengesService.completeChallenge(challenge.slug, { checklist, skillsEarned: challenge.skills })
      await refreshMe()
      setCompleted(true)
      setStatus('Mantap, challenge selesai dan progress kamu sudah tersimpan.')
    } catch {
      setStatus('Challenge belum berhasil disimpan. Coba lagi sebentar lagi ya.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <PublicLayout>
      <PageMeta title={`Play Challenge ${challenge?.title ?? ''}`} />
      <section className="hero-grid pt-28 sm:pt-32"><div className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
        {isLoading ? <LoadingState label="Menyiapkan challenge..." /> : null}
        {!isLoading && challenge ? <div className="space-y-6">
          {!isAuthenticated ? <GuestNotice>Kamu bisa coba challenge ini tanpa login, tapi progress-nya belum bisa tersimpan. Masuk dulu biar hasilnya masuk ke profile kamu.</GuestNotice> : null}
          <div className="rounded-2xl border border-[#254A2A] bg-[#111E14] p-6 shadow-card sm:p-8"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-400">{challenge.category} - {challenge.level}</p><h1 className="mt-3 font-display text-4xl font-bold text-[#E8F0EA]">{challenge.title}</h1><p className="mt-4 text-base leading-8 text-[#8BA98F]">{challenge.description}</p><div className="mt-6 grid gap-4 md:grid-cols-2"><InfoBox title="Instruksi" body={challenge.datasetDescription} /><InfoBox title="Output yang diharapkan" body="File kerja rapi, ringkasan bisa dibaca, rumus utama berjalan, dan insight utama terlihat jelas." /></div><div className="mt-6 rounded-xl border border-[#1E3022] bg-[#0D1610] p-5"><Download className="h-7 w-7 text-green-400" /><h2 className="mt-3 font-heading text-lg font-bold">File latihan</h2><p className="mt-2 text-sm text-[#8BA98F]">Sheet: {challenge.file.sheets.join(', ')}</p>{challenge.file.hasDownload && challenge.file.fileUrl ? <Button asChild className="mt-4"><a download href={challenge.file.fileUrl}>Unduh File Kasus</a></Button> : <p className="mt-3 text-sm text-amber-300">File latihan sedang disiapkan.</p>}</div><div className="mt-6 rounded-xl border border-[#1E3022] bg-[#0D1610] p-5"><h2 className="font-heading text-lg font-bold">Checklist challenge</h2><div className="mt-3 space-y-2">{checklist.map((item) => <p className="flex items-center gap-2 text-sm text-[#8BA98F]" key={item}><CheckCircle2 className="h-4 w-4 text-green-400" />{item}</p>)}</div></div><Button className="mt-6" disabled={isSaving || completed} onClick={handleComplete} type="button">{isSaving ? 'Menyimpan...' : completed ? 'Challenge selesai' : 'Tandai Selesai'}</Button>{status ? <div className={`mt-5 rounded-xl border p-4 text-sm ${isAuthenticated && completed ? 'border-green-700/40 bg-green-950/25 text-green-200' : 'border-amber-800/40 bg-amber-950/20 text-amber-200'}`}>{status}</div> : null}{!isAuthenticated ? <div className="mt-5"><LoginPromptCard title="Masuk dulu biar checklist challenge kamu tersimpan." body="Kalau login, challenge selesai bisa masuk portfolio dan bantu progress level kamu." /></div> : null}</div>
        </div> : null}
      </div></section>
    </PublicLayout>
  )
}

function ChallengeCard({ challenge }: { challenge: PlayCase }) {
  return <Link className="rounded-2xl border border-[#1E3022] bg-[#111E14] p-6 shadow-card hover:border-[#254A2A] hover:bg-[#162419]" to={ROUTES.CHALLENGE_DETAIL(challenge.slug)}><ClipboardCheck className="h-7 w-7 text-green-400" /><p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-green-400">{challenge.category} - {challenge.level}</p><h2 className="mt-2 font-heading text-xl font-bold text-[#E8F0EA]">{challenge.title}</h2><p className="mt-2 text-sm leading-6 text-[#8BA98F]">{challenge.description}</p><div className="mt-5 flex flex-wrap gap-2">{challenge.skills.map((skill) => <span className="rounded-full border border-[#254A2A] px-2.5 py-1 text-xs text-green-300" key={skill}>{skill}</span>)}</div><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-green-400">Mulai challenge <ArrowRight className="h-4 w-4" /></span></Link>
}

function ChallengeDetailCard({ challenge }: { challenge: PlayCase }) {
  return <div className="rounded-2xl border border-[#254A2A] bg-[#111E14] p-6 shadow-card sm:p-8"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-400">{challenge.category} - {challenge.level}</p><h1 className="mt-3 font-display text-4xl font-bold text-[#E8F0EA]">{challenge.title}</h1><p className="mt-4 text-base leading-8 text-[#8BA98F]">{challenge.description}</p><div className="mt-6 grid gap-3 sm:grid-cols-3"><Stat label="Stage" value={challenge.file.sheets[Math.max(0, challenge.file.sheets.length - 2)] ?? 'Sheet'} /><Stat label="Durasi" value={`${challenge.durationMinutes} menit`} /><Stat label="Progress" value="Login required" /></div><div className="mt-8 rounded-xl border border-[#1E3022] bg-[#0D1610] p-5"><h2 className="font-heading text-xl font-bold">Instruksi tugas</h2><p className="mt-2 text-sm leading-6 text-[#8BA98F]">{challenge.datasetDescription}</p></div><Button asChild className="mt-6"><Link to={ROUTES.CHALLENGE_PLAY(challenge.slug)}>Mulai Challenge<ArrowRight className="h-4 w-4" /></Link></Button></div>
}

function InfoBox({ title, body }: { title: string; body: string }) { return <div className="rounded-xl border border-[#1E3022] bg-[#0D1610] p-5"><h2 className="font-heading text-lg font-bold">{title}</h2><p className="mt-2 text-sm leading-6 text-[#8BA98F]">{body}</p></div> }
function Stat({ label, value }: { label: string; value: string }) { return <div className="rounded-xl border border-[#1E3022] bg-[#0D1610] p-4"><p className="text-xs text-[#8BA98F]">{label}</p><p className="mt-1 font-display text-xl font-bold text-[#E8F0EA]">{value}</p></div> }
