import { AlertTriangle, ArrowLeft, ArrowRight, CheckCircle2, Download, FileLock2, Lock, Search, Trophy, XCircle } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { GuestNotice, LoginPromptCard } from '@/components/shared/AuthAwareCards'
import { EmptyState } from '@/components/shared/EmptyState'
import { ErrorState } from '@/components/shared/ErrorState'
import { LoadingState } from '@/components/shared/LoadingState'
import { PageMeta } from '@/components/shared/PageMeta'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/contexts/AuthContext'
import type { PlayAnswerSubmission, PlayCase, PlayMode, PlayResult, PlayStartResult } from '@/data/playCases'
import { useAsyncData } from '@/hooks/useAsyncData'
import { playCasesService } from '@/services/playCasesService'

const resultKey = (slug: string) => `bisaexcel_play_result_${slug}`
const startKey = (slug: string) => `bisaexcel_play_start_${slug}`

const modeLabels: Record<PlayMode, string> = {
  practice: 'Mode Latihan',
  challenge: 'Mode Simulasi',
  ranked: 'Mode Ranked',
  latihan: 'Mode Latihan',
  kompetisi: 'Mode Ranked',
}

const modeCopy: Record<'practice' | 'challenge' | 'ranked', string> = {
  practice: 'Cocok buat belajar santai. Bisa coba berkali-kali.',
  challenge: 'Cocok buat uji skill dengan timer dan target waktu.',
  ranked: 'Hasil masuk progress dan ranked point kalau kamu login.',
}

const modeOptions: Array<'practice' | 'challenge' | 'ranked'> = ['practice', 'challenge', 'ranked']
const questionOptions = [
  { count: 10, label: '10 Soal', title: 'Cek Cepat', copy: 'Cocok buat latihan singkat dan pemanasan skill.', estimate: '10-15 menit' },
  { count: 20, label: '20 Soal', title: 'Latihan Fokus', copy: 'Cocok buat menguji pemahaman rumus dan logika dasar-menengah.', estimate: '20-30 menit' },
  { count: 30, label: '30 Soal', title: 'Skill Check', copy: 'Cocok buat mengukur kesiapan kerja dengan variasi soal lebih banyak.', estimate: '35-45 menit' },
  { count: 60, label: '60 Soal', title: 'Full Simulation', copy: 'Simulasi lebih lengkap untuk menguji ketahanan, ketelitian, dan kecepatan kerja.', estimate: '60-90 menit' },
] as const

export function TestExcelPage() {
  const { isAuthenticated } = useAuth()
  const loadCases = useCallback(() => playCasesService.getAllResult(), [])
  const { data: cases, isLoading, isFallback, error, reload } = useAsyncData(loadCases)
  const [query, setQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('semua')
  const [levelFilter, setLevelFilter] = useState('semua')
  const [countFilter, setCountFilter] = useState('semua')

  const filteredCases = useMemo(() => (cases ?? []).filter((playCase) => {
    const availableCounts = playCase.availableQuestionCounts ?? [10]
    const searchable = [playCase.title, playCase.category, playCase.description, playCase.mode, playCase.level, playCase.difficulty, playCase.skills.join(' '), playCase.formulas.join(' '), playCase.tags?.join(' ')].filter(Boolean).join(' ').toLowerCase()
    const matchesQuery = searchable.includes(query.toLowerCase())
    const normalizedMode = normalizeMode(playCase.mode)
    const hasFile = Boolean(getDownloadUrl(playCase))
    const matchesType = typeFilter === 'semua'
      || (typeFilter === 'file' && hasFile)
      || (typeFilter === 'rumus' && searchable.match(/sum|count|if|lookup|average|rumus/))
      || (typeFilter === 'simulasi' && (normalizedMode === 'challenge' || searchable.includes('simulasi') || searchable.includes('kerja')))
      || (typeFilter === 'ranked' && normalizedMode === 'ranked')
    const matchesLevel = levelFilter === 'semua' || playCase.difficulty === levelFilter || playCase.level.toLowerCase() === levelFilter
    const matchesCount = countFilter === 'semua' || availableCounts.includes(Number(countFilter))
    return matchesQuery && matchesType && matchesLevel && matchesCount
  }), [cases, countFilter, levelFilter, query, typeFilter])

  return (
    <PublicLayout>
      <PageMeta title="Test Excel" />
      <section className="hero-grid pt-28 sm:pt-32">
        <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-end">
            <div>
              <span className="inline-flex rounded-full border border-green-700/50 bg-green-950/60 px-3 py-1 text-xs font-bold text-green-300">Test Excel</span>
              <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-[#E8F0EA] sm:text-6xl">Test Excel Buat Latihan Skill Kerja Nyata</h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-[#8BA98F] sm:text-lg">Latihan pakai file kasus, kerjakan di Excel, isi jawaban di web, lalu lihat skor, waktu, akurasi, dan progress kamu.</p>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-[#8BA98F]">Mulai dari soal singkat dulu atau langsung ambil simulasi lengkap. Cocok buat admin, finance, data support, fresh graduate, dan siapa pun yang mau lebih siap pakai Excel di dunia kerja.</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button asChild><a href="#pilih-test">Mulai Test Excel</a></Button>
                <Button asChild variant="outline"><a href="#cara-kerja">Lihat Cara Kerjanya</a></Button>
              </div>
            </div>
            {!isAuthenticated ? <GuestNotice>Belum login tetap bisa coba. Tapi kalau mau skor dan progress tersimpan, masuk dulu ya.</GuestNotice> : null}
          </div>

          {isFallback ? <div className="mt-8"><ErrorState message={`${error ?? 'Backend belum merespons. Coba lagi sebentar atau pastikan server lokalnya sedang aktif.'} Mode offline/fallback aktif.`} onRetry={reload} /></div> : null}

          <HowItWorksSection />
          <BenefitsSection />
          <PackageOverviewSection />

          <section className="mt-14" id="pilih-test">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="font-heading text-3xl font-bold text-[#E8F0EA]">Pilih Test Excel</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#8BA98F]">Cari topik, pilih paket soal, lalu mulai dari case yang paling dekat dengan kebutuhan kerjamu.</p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-[#254A2A] bg-[#111E14] p-4 shadow-card">
              <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_420px]">
                <div>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4D6650]" />
                    <input className="h-14 w-full rounded-xl border border-[#1E3022] bg-[#0F1A12] pl-11 pr-4 text-sm text-[#E8F0EA] outline-none placeholder:text-[#4D6650] focus:border-green-600" onChange={(event) => setQuery(event.target.value)} placeholder="Cari topik, rumus, posisi kerja, atau jenis soal..." value={query} />
                  </div>
                  <p className="mt-2 text-xs text-[#8BA98F]">Contoh: admin, finance, SUMIF, laporan, sales, HRD, dashboard</p>
                </div>
                <div className="grid gap-3">
                  <FilterGroup label="Jenis Latihan" onChange={setTypeFilter} options={[['semua', 'Semua'], ['file', 'File Kasus'], ['rumus', 'Rumus Cepat'], ['simulasi', 'Simulasi Kerja'], ['ranked', 'Ranked']]} value={typeFilter} />
                  <FilterGroup label="Level" onChange={setLevelFilter} options={[['semua', 'Semua Level'], ['dasar', 'Dasar'], ['menengah', 'Menengah'], ['advanced', 'Advanced']]} value={levelFilter} />
                  <FilterGroup label="Jumlah Soal" onChange={setCountFilter} options={[['semua', 'Semua Paket'], ['10', '10 Soal'], ['20', '20 Soal'], ['30', '30 Soal'], ['60', '60 Soal']]} value={countFilter} />
                </div>
              </div>
            </div>

            {isLoading ? <div className="mt-10"><LoadingState label="Memuat paket Test Excel..." /></div> : null}
            {!isLoading && !filteredCases.length ? <div className="mt-10"><EmptyState message="Belum ada test yang cocok. Coba keyword atau filter lain dulu." /></div> : null}
            {!isLoading && filteredCases.length ? <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{filteredCases.map((playCase) => <PlayCaseCard key={playCase.slug} playCase={playCase} />)}</div> : null}
          </section>
        </div>
      </section>
    </PublicLayout>
  )
}
export function TestExcelDetailPage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const { slug = '' } = useParams()
  const loadCase = useCallback(() => playCasesService.getBySlugResult(slug), [slug])
  const { data: playCase, isLoading, isFallback, error, reload } = useAsyncData(loadCase, [slug])
  const [mode, setMode] = useState<'practice' | 'challenge' | 'ranked'>('practice')
  const [questionCount, setQuestionCount] = useState(10)
  const [isStarting, setIsStarting] = useState(false)
  const [startError, setStartError] = useState<string | null>(null)

  const availableCounts = playCase?.availableQuestionCounts?.length ? playCase.availableQuestionCounts : [10]
  const timerSeconds = getTimerSeconds(playCase, mode, questionCount)

  useEffect(() => {
    if (playCase && !availableCounts.includes(questionCount)) setQuestionCount(availableCounts[0] ?? 10)
  }, [availableCounts, playCase, questionCount])

  async function startArena() {
    if (!playCase) return
    setIsStarting(true)
    setStartError(null)
    const result = await playCasesService.startResult(playCase.slug, { mode, questionCount, difficulty: playCase.difficulty })
    if (typeof window !== 'undefined') window.sessionStorage.setItem(startKey(playCase.slug), JSON.stringify(result.data))
    setIsStarting(false)
    if (result.source === 'fallback' && result.error) setStartError(result.error)
    navigate(ROUTES.TEST_EXCEL_PLAY(playCase.slug))
  }

  return (
    <PublicLayout>
      <PageMeta title={playCase?.title ?? 'Test Excel'} />
      <section className="hero-grid pt-28 sm:pt-32">
        <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
          <Button asChild variant="ghost"><Link to={ROUTES.TEST_EXCEL}><ArrowLeft className="h-4 w-4" />Kembali ke Test Excel</Link></Button>
          {isFallback ? <div className="mt-6"><ErrorState message={`${error ?? 'Backend belum merespons. Coba refresh atau pastikan server lokalnya lagi jalan.'} Mode offline/fallback aktif.`} onRetry={reload} /></div> : null}
          {startError ? <div className="mt-6"><ErrorState message={startError} /></div> : null}
          {isLoading ? <div className="mt-8"><LoadingState label="Memuat start screen test..." /></div> : null}
          {!isLoading && !playCase ? <div className="mt-8"><EmptyState message="Studi kasus tidak ditemukan." /></div> : null}
          {!isLoading && playCase ? (
            <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
              <div className="space-y-6">
                {!isAuthenticated ? <GuestNotice>Kamu bisa coba sebagai guest. Hasil keluar, tapi progress dan ranked point belum tersimpan.</GuestNotice> : null}
                <section className="rounded-2xl border border-[#254A2A] bg-[#111E14] p-6 shadow-card sm:p-8">
                  <div className="flex flex-wrap gap-2"><Badge>{modeLabels[normalizeMode(playCase.mode)]}</Badge><Badge>{playCase.level}</Badge><Badge>{playCase.category}</Badge></div>
                  <h2 className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-green-400">Tentang Case Ini</h2>
                  <h1 className="mt-3 font-display text-4xl font-bold text-[#E8F0EA] sm:text-5xl">{playCase.title}</h1>
                  <p className="mt-4 text-base leading-8 text-[#8BA98F]">{playCase.heroCopy ?? `Di test ini kamu akan menyelesaikan ${playCase.title.toLowerCase()} dari file kasus nyata. Cocok buat kamu yang mau siap kerja sebagai admin, finance, atau data support.`}</p>
                </section>
                <section className="rounded-2xl border border-[#1E3022] bg-[#111E14] p-6 shadow-card">
                  <Download className="h-8 w-8 text-green-400" />
                  <h2 className="mt-4 font-heading text-2xl font-bold">Cara Pakai File Kasus</h2>
                  <p className="mt-2 text-sm leading-6 text-[#8BA98F]">Download workbook, buka di Excel, lalu pakai sheet Dataset dan Questions sebagai bahan kerja.</p>
                  <p className="mt-3 text-sm text-[#8BA98F]">Sheet: {getSheets(playCase).join(', ')}</p>
                  {getDownloadUrl(playCase) ? <Button asChild className="mt-5"><a download href={getDownloadUrl(playCase)}>Unduh File Latihan</a></Button> : <p className="mt-5 rounded-lg border border-amber-800/40 bg-amber-950/20 px-3 py-2 text-sm text-amber-200">File latihan sedang disiapkan.</p>}
                </section>
              </div>
              <aside className="h-fit rounded-2xl border border-[#254A2A] bg-[#111E14] p-6 shadow-card">
                <h2 className="font-heading text-2xl font-bold">Pilih paket dan mode test</h2>
                <p className="mt-2 text-sm leading-6 text-[#8BA98F]">Pilih jumlah soal sesuai waktu dan target latihanmu.</p>
                <h3 className="mt-5 font-heading text-lg font-bold">Mode test</h3>
                <div className="mt-3 grid gap-2">
                  {modeOptions.map((item) => <ChoiceButton active={mode === item} key={item} onClick={() => setMode(item)} title={modeLabels[item]} body={modeCopy[item]} />)}
                </div>
                <h3 className="mt-6 font-heading text-lg font-bold">Paket soal</h3>
                <div className="mt-3 grid gap-2">
                  {questionOptions.map((option) => {
                    const disabled = !availableCounts.includes(option.count)
                    return <ChoiceButton active={questionCount === option.count} body={disabled ? 'Belum tersedia untuk case ini. Soal tambahan sedang disiapkan.' : option.copy} disabled={disabled} key={option.count} onClick={() => setQuestionCount(option.count)} title={option.label} />
                  })}
                </div>
                <div className="mt-6 rounded-xl border border-[#1E3022] bg-[#0D1610] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8BA98F]">Estimasi waktu</p>
                  <p className="mt-2 font-display text-3xl font-bold text-[#E8F0EA]">{formatDuration(timerSeconds)}</p>
                  <p className="mt-2 text-sm text-[#8BA98F]">Timer mulai saat kamu klik Mulai Test Sekarang.</p>
                </div>
                <Button className="mt-6 w-full" disabled={isStarting} onClick={startArena} type="button">{isStarting ? 'Menyiapkan...' : 'Mulai Test Sekarang'}<ArrowRight className="h-4 w-4" /></Button>
              </aside>
            </div>
          ) : null}
        </div>
      </section>
    </PublicLayout>
  )
}

export function TestExcelPlayPage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const { slug = '' } = useParams()
  const loadCase = useCallback(() => playCasesService.getBySlugResult(slug), [slug])
  const { data: playCase, isLoading, isFallback, error } = useAsyncData(loadCase, [slug])
  const [start, setStart] = useState<PlayStartResult | null>(() => readStart(slug))
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [activeIndex, setActiveIndex] = useState(0)
  const [now, setNow] = useState(Date.now())
  const [showConfirm, setShowConfirm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!start && playCase) {
      playCasesService.startResult(playCase.slug, { mode: 'practice', questionCount: 10, difficulty: playCase.difficulty }).then((result) => {
        if (typeof window !== 'undefined') window.sessionStorage.setItem(startKey(playCase.slug), JSON.stringify(result.data))
        setStart(result.data)
      })
    }
  }, [playCase, start])

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const questions = start?.selectedQuestions ?? []
  const currentQuestion = questions[activeIndex]
  const answeredCount = Object.values(answers).filter((answer) => answer.trim()).length
  const startedAtMs = start ? new Date(start.startedAt).getTime() : now
  const durationSeconds = Math.max(0, Math.round((now - startedAtMs) / 1000))
  const remainingSeconds = Math.max(0, (start?.timerSeconds ?? 0) - durationSeconds)

  async function submitAnswers() {
    if (!playCase || !start) return
    setIsSubmitting(true)
    const submissions: PlayAnswerSubmission[] = questions.map((question) => ({ questionId: question.id, answer: answers[question.id] ?? '' }))
    const payload = { attemptId: start.attemptId, mode: start.mode, questionCount: start.questionCount, startedAt: start.startedAt, completedAt: new Date().toISOString(), durationSeconds, answers: submissions }
    const result = await playCasesService.submitResult(playCase.slug, payload, isAuthenticated)
    if (typeof window !== 'undefined') window.sessionStorage.setItem(resultKey(playCase.slug), JSON.stringify(result.data))
    setIsSubmitting(false)
    setShowConfirm(false)
    navigate(ROUTES.TEST_EXCEL_RESULT(playCase.slug))
  }

  return (
    <PublicLayout>
      <PageMeta title={`Test Excel ${playCase?.title ?? ''}`} />
      <section className="hero-grid pt-24 sm:pt-28">
        <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
          {isFallback ? <div className="mb-6"><ErrorState message={`${error ?? 'Backend belum merespons. Coba refresh atau pastikan server lokalnya lagi jalan.'} Mode offline/fallback aktif.`} /></div> : null}
          {isLoading || !start ? <LoadingState label="Menyiapkan test..." /> : null}
          {playCase && start ? (
            <div className="space-y-6">
              <div className="sticky top-16 z-30 rounded-2xl border border-[#254A2A] bg-[#111E14]/95 p-4 shadow-card backdrop-blur">
                <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto_auto] lg:items-center">
                  <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-green-400">Waktu berjalan</p><h1 className="font-heading text-lg font-bold text-[#E8F0EA]">{playCase.title}</h1></div>
                  <Stat label="Mode" value={modeLabels[start.mode]} />
                  <Stat label="Soal" value={`${start.questionCount} soal`} />
                  <Stat label="Timer" value={remainingSeconds ? formatDuration(remainingSeconds) : formatDuration(durationSeconds)} />
                </div>
              </div>

              {!isAuthenticated ? <GuestNotice>Kamu masih mode guest. Hasil bisa dilihat, tapi belum masuk profile.</GuestNotice> : null}

              <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
                <aside className="h-fit rounded-2xl border border-[#1E3022] bg-[#111E14] p-5 shadow-card">
                  <h2 className="font-heading text-lg font-bold">Checkpoint Soal</h2>
                  <p className="mt-1 text-sm text-[#8BA98F]">{answeredCount} dari {questions.length} sudah diisi.</p>
                  <div className="mt-4 grid grid-cols-5 gap-2">
                    {questions.map((question, index) => <button className={questionNavClass(index === activeIndex, Boolean(answers[question.id]?.trim()))} key={question.id} onClick={() => setActiveIndex(index)} type="button">{index + 1}</button>)}
                  </div>
                  <Button asChild className="mt-5 w-full" variant="outline"><Link to={ROUTES.TEST_EXCEL_DETAIL(playCase.slug)}>Keluar Test</Link></Button>
                </aside>

                {currentQuestion ? (
                  <article className="rounded-2xl border border-[#254A2A] bg-[#111E14] p-6 shadow-card sm:p-8">
                    <div className="flex flex-wrap items-center gap-2"><Badge>Soal {activeIndex + 1} dari {questions.length}</Badge><Badge>{currentQuestion.skill ?? currentQuestion.formulaSkills[0] ?? 'Excel'}</Badge><Badge>{answers[currentQuestion.id]?.trim() ? 'Sudah dijawab' : 'Belum dijawab'}</Badge></div>
                    <h2 className="mt-5 font-display text-3xl font-bold text-[#E8F0EA]">{currentQuestion.levelLabel ?? `Checkpoint ${activeIndex + 1} - Baca Struktur Data`}</h2>
                    <p className="mt-4 text-base leading-8 text-[#8BA98F]">{currentQuestion.questionText}</p>
                    {currentQuestion.helperText || currentQuestion.hint ? <p className="mt-4 rounded-xl border border-[#1E3022] bg-[#0D1610] p-4 text-sm text-amber-200">Hint: {currentQuestion.helperText ?? currentQuestion.hint}</p> : null}
                    <label className="mt-6 block"><span className="text-sm font-semibold text-[#E8F0EA]">Jawaban akhir</span><input className="mt-2 h-14 w-full rounded-xl border border-[#1E3022] bg-[#0F1A12] px-4 text-sm text-[#E8F0EA] outline-none placeholder:text-[#4D6650] focus:border-green-600" onChange={(event) => setAnswers((current) => ({ ...current, [currentQuestion.id]: event.target.value }))} placeholder="Tulis jawaban akhir kamu..." value={answers[currentQuestion.id] ?? ''} /></label>
                    <p className="mt-3 text-sm text-[#8BA98F]">Cukup isi hasil akhirnya. Rumusnya kamu kerjakan di file Excel.</p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
                      <Button disabled={activeIndex === 0} onClick={() => setActiveIndex((value) => Math.max(0, value - 1))} type="button" variant="outline">Sebelumnya</Button>
                      {activeIndex < questions.length - 1 ? <Button onClick={() => setActiveIndex((value) => Math.min(questions.length - 1, value + 1))} type="button">Berikutnya</Button> : <Button disabled={answeredCount === 0} onClick={() => setShowConfirm(true)} type="button">Submit Jawaban</Button>}
                    </div>
                  </article>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </section>
      {showConfirm ? <SubmitConfirmModal isSubmitting={isSubmitting} onCancel={() => setShowConfirm(false)} onConfirm={submitAnswers} /> : null}
    </PublicLayout>
  )
}

export function TestExcelResultPage() {
  const { isAuthenticated } = useAuth()
  const { slug = '' } = useParams()
  const loadCase = useCallback(() => playCasesService.getBySlugResult(slug), [slug])
  const { data: playCase } = useAsyncData(loadCase, [slug])
  const result = readResult(slug)
  return <PublicLayout><PageMeta title={`Hasil ${playCase?.title ?? 'Test Excel'}`} /><section className="hero-grid pt-28 sm:pt-32"><div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">{!result ? <EmptyState message="Belum ada hasil submit di sesi ini. Mulai test dulu ya." /> : <PlayResultSummary isAuthenticated={isAuthenticated} playCase={playCase ?? undefined} result={result} />}</div></section></PublicLayout>
}

export function TestExcelAnswerPage() { return <PremiumTestPage mode="answer" /> }
export function TestExcelTutorialPage() { return <PremiumTestPage mode="tutorial" /> }

function PlayCaseCard({ playCase }: { playCase: PlayCase }) {
  const normalizedMode = normalizeMode(playCase.mode)
  return <div className="rounded-2xl border border-[#1E3022] bg-[#111E14] p-6 shadow-card transition-all hover:-translate-y-1 hover:border-[#254A2A] hover:bg-[#162419]"><div className="flex flex-wrap gap-2"><Badge>{modeLabels[normalizedMode]}</Badge><Badge>{playCase.difficulty ?? playCase.level}</Badge><Badge>{getDownloadUrl(playCase) ? 'File tersedia' : 'File disiapkan'}</Badge></div><h2 className="mt-4 font-heading text-xl font-bold text-[#E8F0EA]">{playCase.title}</h2><p className="mt-2 text-sm leading-6 text-[#8BA98F]">{playCase.description}</p><div className="mt-4 flex flex-wrap gap-2">{(playCase.tags ?? playCase.formulas).slice(0, 4).map((tag) => <span className="rounded-full border border-[#254A2A] px-2.5 py-1 text-xs text-green-300" key={tag}>{tag}</span>)}</div><div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs text-[#8BA98F]"><span>{playCase.estimatedMinutes ?? playCase.durationMinutes} menit</span><span>{(playCase.availableQuestionCounts ?? [10]).join('/')} soal</span><span>{playCase.basePoints ?? playCase.totalPoints} poin</span></div><div className="mt-5 flex flex-col gap-2 sm:flex-row"><Button asChild><Link to={ROUTES.TEST_EXCEL_DETAIL(playCase.slug)}>Mulai Test <ArrowRight className="h-4 w-4" /></Link></Button><Button asChild variant="outline"><Link to={ROUTES.TEST_EXCEL_DETAIL(playCase.slug)}>Lihat Detail</Link></Button></div></div>
}

function PlayResultSummary({ result, playCase, isAuthenticated }: { result: PlayResult; playCase?: PlayCase; isAuthenticated: boolean }) {
  const strong = result.accuracy >= 75
  return <div className="space-y-6"><div className="rounded-2xl border border-[#254A2A] bg-[#111E14] p-6 shadow-card sm:p-8"><Trophy className="h-12 w-12 text-amber-400" /><p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-green-400">Hasil Test Excel</p><h1 className="mt-3 font-display text-4xl font-bold text-[#E8F0EA]">{strong ? 'Mantap, kamu mulai kelihatan siap kerja dengan Excel.' : 'Belum maksimal, tapi ini justru bahan latihan paling penting.'}</h1><p className="mt-3 text-sm leading-6 text-[#8BA98F]">{result.message}</p><div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-6"><Stat label="Skor" value={`${result.score}/${result.totalPoints}`} /><Stat label="Benar" value={`${result.correctCount}/${result.questionCount}`} /><Stat label="Akurasi" value={`${result.accuracy}%`} /><Stat label="Durasi" value={formatDuration(result.durationSeconds ?? 0)} /><Stat label="Mode" value={result.mode ? modeLabels[result.mode] : '-'} /><Stat label="Ranked Point" value={String(result.rankPoints ?? 0)} /></div><p className="mt-4 rounded-xl border border-[#1E3022] bg-[#0D1610] p-4 text-sm text-[#8BA98F]">Ranked point ini jadi bukti progress latihanmu. Makin cepat dan akurat, makin tinggi poinnya.</p>{!isAuthenticated || !result.isSaved ? <div className="mt-6"><LoginPromptCard title="Hasil kamu belum tersimpan karena kamu belum login." body="Masuk dulu biar skor, durasi, dan progress kamu masuk ke profile." /></div> : <div className="mt-6 rounded-xl border border-green-700/40 bg-green-950/25 p-4 text-sm text-green-200">Mantap, hasil test kamu sudah masuk ke progress profile.</div>}</div><div className="rounded-2xl border border-[#1E3022] bg-[#111E14] p-6"><h2 className="font-heading text-xl font-bold">Review jawaban</h2><div className="mt-4 space-y-3">{result.answers.map((answer, index) => <div className="rounded-xl border border-[#1E3022] bg-[#0D1610] p-4" key={answer.questionId}><div className="flex items-start gap-3">{answer.isCorrect ? <CheckCircle2 className="h-5 w-5 text-green-400" /> : <XCircle className="h-5 w-5 text-red-400" />}<div><p className="text-sm font-semibold text-[#E8F0EA]">Soal {index + 1}: {answer.questionText ?? answer.questionId}</p><p className="mt-1 text-xs text-[#8BA98F]">Jawaban kamu: {answer.userAnswer || '-'} - Poin: {answer.pointsEarned}/{answer.maxPoints ?? 0}</p>{answer.explanation ? <p className="mt-2 text-xs leading-5 text-[#8BA98F]">{answer.explanation}</p> : null}</div></div></div>)}</div></div><div className="flex flex-col gap-3 sm:flex-row"><Button asChild><Link to={playCase ? ROUTES.TEST_EXCEL_DETAIL(playCase.slug) : ROUTES.TEST_EXCEL}>Coba Lagi</Link></Button><Button asChild variant="outline"><Link to={ROUTES.LOGIN}>Masuk / Daftar</Link></Button><Button asChild variant="outline"><Link to={ROUTES.DASHBOARD}>Lihat Dashboard</Link></Button></div></div>
}

function PremiumTestPage({ mode }: { mode: 'answer' | 'tutorial' }) {
  const isTutorial = mode === 'tutorial'
  return <PublicLayout><PageMeta title={isTutorial ? 'Tutorial Test Excel' : 'Jawaban Test Excel'} /><section className="hero-grid pt-28 sm:pt-32"><div className="mx-auto max-w-3xl px-4 pb-20 sm:px-6"><div className="rounded-2xl border border-amber-800/50 bg-[#111E14] p-6 shadow-card sm:p-8"><FileLock2 className="h-10 w-10 text-amber-400" /><h1 className="mt-5 font-display text-4xl font-bold text-[#E8F0EA]">{isTutorial ? 'Tutorial lengkap' : 'Jawaban lengkap'}</h1><p className="mt-4 text-base leading-8 text-[#8BA98F]">Bagian ini disiapkan untuk jawaban dan pembahasan premium. Payment belum aktif, jadi jawaban penuh tidak ditampilkan pada MVP.</p><div className="mt-6 rounded-xl border border-[#1E3022] bg-[#0D1610] p-4 text-sm text-[#8BA98F]"><Lock className="mr-2 inline h-4 w-4 text-amber-400" />Tidak ada payment palsu. Status ini hanya preview fitur premium.</div></div></div></section></PublicLayout>
}

function SubmitConfirmModal({ onCancel, onConfirm, isSubmitting }: { onCancel: () => void; onConfirm: () => void; isSubmitting: boolean }) {
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"><div className="w-full max-w-md rounded-2xl border border-[#254A2A] bg-[#111E14] p-6 shadow-card"><AlertTriangle className="h-8 w-8 text-amber-400" /><h2 className="mt-4 font-heading text-xl font-bold">Yakin submit sekarang?</h2><p className="mt-2 text-sm leading-6 text-[#8BA98F]">Cek lagi jawaban kosong biar poinmu nggak kebuang.</p><div className="mt-6 flex justify-end gap-3"><Button onClick={onCancel} type="button" variant="outline">Cek lagi</Button><Button disabled={isSubmitting} onClick={onConfirm} type="button">{isSubmitting ? 'Submit...' : 'Submit Jawaban'}</Button></div></div></div>
}

function HowItWorksSection() {
  const steps = [
    { title: '1. Pilih Paket Soal', body: 'Pilih 10, 20, 30, atau 60 soal sesuai waktu dan target latihanmu.' },
    { title: '2. Unduh File Kasus', body: 'Buka file Excel yang disediakan. Di dalamnya ada dataset, instruksi, dan bahan kerja.' },
    { title: '3. Kerjakan di Excel', body: 'Gunakan rumus, logika, dan analisis kamu untuk menemukan jawaban akhir.' },
    { title: '4. Submit Jawaban', body: 'Masukkan jawaban di web, lalu sistem akan menilai skor, waktu, akurasi, dan progress kamu.' },
  ]
  return <section className="mt-16" id="cara-kerja"><div className="flex flex-col gap-2"><h2 className="font-heading text-3xl font-bold text-[#E8F0EA]">Cara Kerja Test Excel</h2><p className="text-sm leading-6 text-[#8BA98F]">Belum login tetap bisa coba. Tapi kalau mau skor dan progress tersimpan, masuk dulu ya.</p></div><div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{steps.map((step) => <div className="rounded-2xl border border-[#1E3022] bg-[#111E14] p-5 shadow-card" key={step.title}><h3 className="font-heading text-lg font-bold text-[#E8F0EA]">{step.title}</h3><p className="mt-2 text-sm leading-6 text-[#8BA98F]">{step.body}</p></div>)}</div></section>
}

function BenefitsSection() {
  const benefits = [
    { title: 'Latihan Rumus Kerja', body: 'Belajar SUMIF, COUNTIF, XLOOKUP, IF, AVERAGE, dan rumus yang sering dipakai di kantor.' },
    { title: 'Kerjakan File Kasus', body: 'Bukan cuma teori. Kamu akan latihan dari dataset dan studi kasus yang lebih realistis.' },
    { title: 'Pilih Jumlah Soal', body: 'Mau cepat 10 soal atau full test 60 soal, kamu bisa pilih sesuai kebutuhan.' },
    { title: 'Lihat Skor dan Akurasi', body: 'Setelah submit, kamu bisa lihat berapa jawaban benar, salah, skor, dan akurasimu.' },
    { title: 'Pantau Durasi', body: 'Timer mencatat berapa lama kamu menyelesaikan test. Cocok buat ukur kecepatan kerja.' },
    { title: 'Bangun Progress Profile', body: 'Kalau login, hasil test bisa masuk ke profile, progress, dan ranked point.' },
  ]
  return <section className="mt-16"><h2 className="font-heading text-3xl font-bold text-[#E8F0EA]">Apa yang Bisa Kamu Lakukan di Test Excel?</h2><div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{benefits.map((item) => <div className="rounded-2xl border border-[#1E3022] bg-[#111E14] p-5 shadow-card" key={item.title}><CheckCircle2 className="h-6 w-6 text-green-400" /><h3 className="mt-3 font-heading text-lg font-bold text-[#E8F0EA]">{item.title}</h3><p className="mt-2 text-sm leading-6 text-[#8BA98F]">{item.body}</p></div>)}</div></section>
}

function PackageOverviewSection() {
  return <section className="mt-16"><div><h2 className="font-heading text-3xl font-bold text-[#E8F0EA]">Pilih Paket Test</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-[#8BA98F]">Pilih jumlah soal sesuai waktu dan level latihanmu. Mulai ringan dulu, lalu naik ke simulasi yang lebih serius.</p></div><div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{questionOptions.map((option) => <div className="rounded-2xl border border-[#1E3022] bg-[#111E14] p-5 shadow-card" key={option.count}><p className="text-xs font-bold uppercase tracking-[0.16em] text-green-400">{option.label}</p><h3 className="mt-3 font-heading text-xl font-bold text-[#E8F0EA]">{option.title}</h3><p className="mt-2 text-sm leading-6 text-[#8BA98F]">{option.copy}</p><p className="mt-4 text-sm font-semibold text-amber-300">Estimasi: {option.estimate}</p></div>)}</div></section>
}

function FilterGroup({ label, options, value, onChange }: { label: string; options: Array<[string, string]>; value: string; onChange: (value: string) => void }) {
  return <div><p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#8BA98F]">{label}</p><div className="flex gap-2 overflow-x-auto pb-1">{options.map(([optionValue, optionLabel]) => <FilterButton active={value === optionValue} key={optionValue} onClick={() => onChange(optionValue)}>{optionLabel}</FilterButton>)}</div></div>
}

function ChoiceButton({ active, disabled = false, onClick, title, body }: { active: boolean; disabled?: boolean; onClick: () => void; title: string; body: string }) { return <button className={`rounded-xl border p-4 text-left transition-colors ${active ? 'border-green-600 bg-green-950/40' : 'border-[#1E3022] bg-[#0D1610]'} ${disabled ? 'cursor-not-allowed opacity-50' : 'hover:border-[#254A2A] hover:bg-[#162419]'}`} disabled={disabled} onClick={onClick} type="button"><span className="font-heading text-sm font-bold text-[#E8F0EA]">{title}</span><span className="mt-1 block text-xs leading-5 text-[#8BA98F]">{body}</span></button> }
function FilterButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: string }) { return <button className={`rounded-full border px-3 py-1.5 text-xs font-bold ${active ? 'border-green-600 bg-green-600 text-white' : 'border-[#254A2A] text-[#8BA98F] hover:text-[#E8F0EA]'}`} onClick={onClick} type="button">{children}</button> }
function Badge({ children }: { children: ReactNode }) { return <span className="inline-flex rounded-full border border-green-700/50 bg-green-950/60 px-3 py-1 text-xs font-bold text-green-300">{children}</span> }
function Stat({ label, value }: { label: string; value: string }) { return <div className="rounded-xl border border-[#1E3022] bg-[#0D1610] p-3"><p className="text-xs text-[#8BA98F]">{label}</p><p className="mt-1 font-display text-lg font-bold text-[#E8F0EA]">{value}</p></div> }
function questionNavClass(active: boolean, answered: boolean) { if (active) return 'h-10 rounded-lg bg-green-600 text-sm font-bold text-white'; if (answered) return 'h-10 rounded-lg border border-green-700/50 bg-green-950/40 text-sm font-bold text-green-300'; return 'h-10 rounded-lg border border-[#254A2A] bg-[#0D1610] text-sm font-bold text-[#8BA98F]' }
function normalizeMode(mode: PlayMode): 'practice' | 'challenge' | 'ranked' { if (mode === 'kompetisi') return 'ranked'; if (mode === 'latihan') return 'practice'; return mode }
function getDownloadUrl(playCase: PlayCase) { return playCase.downloadUrl ?? playCase.file.fileUrl }
function getSheets(playCase: PlayCase) { return playCase.workbookSheets?.length ? playCase.workbookSheets : playCase.file.sheets }
function getTimerSeconds(playCase: PlayCase | null | undefined, mode: PlayMode, questionCount: number) { if (questionCount === 60) return 5400; const difficulty = playCase?.difficulty ?? playCase?.level?.toLowerCase() ?? 'dasar'; const table: Record<string, Record<number, number>> = { dasar: { 10: 900, 20: 1500, 30: 2400, 60: 5400 }, menengah: { 10: 1200, 20: 2100, 30: 3000, 60: 5400 }, advanced: { 10: 1500, 20: 2700, 30: 3600, 60: 5400 } }; const base = table[difficulty]?.[questionCount] ?? table.dasar[questionCount] ?? 900; return mode === 'ranked' ? Math.round(base * 0.9) : mode === 'practice' ? Math.round(base * 1.15) : base }
function formatDuration(seconds: number) { const safe = Math.max(0, Math.round(seconds)); const minutes = Math.floor(safe / 60); const rest = safe % 60; return `${minutes}:${String(rest).padStart(2, '0')}` }
function readStart(slug: string): PlayStartResult | null { if (typeof window === 'undefined' || !slug) return null; const raw = window.sessionStorage.getItem(startKey(slug)); if (!raw) return null; try { return JSON.parse(raw) as PlayStartResult } catch { return null } }
function readResult(slug: string): PlayResult | null { if (typeof window === 'undefined' || !slug) return null; const raw = window.sessionStorage.getItem(resultKey(slug)); if (!raw) return null; try { return JSON.parse(raw) as PlayResult } catch { return null } }




