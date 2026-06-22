import { CalendarDays, MapPin, MessageSquare } from 'lucide-react'
import { useCallback, useMemo, useState, type FormEvent } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { EmptyState } from '@/components/shared/EmptyState'
import { ErrorState } from '@/components/shared/ErrorState'
import { LoadingState } from '@/components/shared/LoadingState'
import { PageMeta } from '@/components/shared/PageMeta'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import { useAsyncData } from '@/hooks/useAsyncData'
import { classesService } from '@/services/classesService'

type SubmitStatus = { type: 'success' | 'error'; message: string } | null

export function ClassesPage() {
  const location = useLocation()
  const loadClasses = useCallback(() => classesService.getAllResult(), [])
  const { data: classes, isLoading, isFallback, error, reload } = useAsyncData(loadClasses)
  const activeFormat = location.pathname.endsWith('/online') ? 'online' : location.pathname.endsWith('/offline') ? 'offline' : location.pathname.endsWith('/private') ? 'private' : 'all'
  const filteredClasses = useMemo(() => activeFormat === 'all' ? classes ?? [] : (classes ?? []).filter((item) => item.format === activeFormat), [activeFormat, classes])

  return (
    <PublicLayout>
      <PageMeta title="Kelas Excel" />
      <section className="hero-grid pt-28 sm:pt-32"><div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="max-w-3xl"><span className="inline-flex rounded-full border border-green-700/50 bg-green-950/60 px-3 py-1 text-xs font-bold text-green-300">Kelas online, offline, private</span><h1 className="mt-5 font-display text-4xl font-bold text-[#E8F0EA] sm:text-5xl">Belajar Excel dengan pendampingan mentor</h1><p className="mt-4 text-base leading-8 text-[#8BA98F]">Pilih format kelas sesuai kebutuhan: online, offline, atau private. Payment belum aktif, gunakan CTA konsultasi untuk tahap MVP.</p></div>
        <div className="mt-6 flex flex-wrap gap-2">
          {[{ label: 'Semua', to: ROUTES.CLASSES }, { label: 'Online', to: ROUTES.CLASS_ONLINE }, { label: 'Offline', to: ROUTES.CLASS_OFFLINE }, { label: 'Private', to: ROUTES.CLASS_PRIVATE }].map((item) => <Button asChild key={item.to} variant={location.pathname === item.to ? 'primary' : 'outline'}><Link to={item.to}>{item.label}</Link></Button>)}
        </div>
        {isFallback ? <div className="mt-8"><ErrorState message={`Backend kelas belum bisa diakses, halaman memakai fallback lokal. ${error ?? ''}`} onRetry={reload} /></div> : null}
        {isLoading ? <div className="mt-10"><LoadingState label="Memuat kelas..." /></div> : null}
        {!isLoading && !filteredClasses.length ? <div className="mt-10"><EmptyState message="Kelas untuk format ini belum tersedia." icon={CalendarDays} /></div> : null}
        {!isLoading && filteredClasses.length ? <div className="mt-10 grid gap-5 md:grid-cols-3">{filteredClasses.map((item) => <div className="rounded-2xl border border-[#1E3022] bg-[#111E14] p-6 shadow-card" key={item.slug}><CalendarDays className="h-7 w-7 text-green-400" /><h2 className="mt-4 font-heading text-xl font-bold text-[#E8F0EA]">{item.title}</h2><p className="mt-2 text-sm leading-6 text-[#8BA98F]">{item.description}</p><p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-green-400">{item.format}</p><Button asChild className="mt-5 w-full"><Link to={ROUTES.CONTACT}>{item.ctaLabel}</Link></Button></div>)}</div> : null}
      </div></section>
    </PublicLayout>
  )
}

export function InhousePage() {
  const [status, setStatus] = useState<SubmitStatus>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus(null)
    const form = new FormData(event.currentTarget)
    const payload = {
      name: String(form.get('name') ?? '').trim(),
      email: String(form.get('email') ?? '').trim(),
      phone: String(form.get('phone') ?? '').trim(),
      company: String(form.get('company') ?? '').trim(),
      message: String(form.get('message') ?? '').trim(),
      needType: 'inhouse' as const,
    }

    if (!payload.name || !payload.email || !payload.message) {
      setStatus({ type: 'error', message: 'Nama, email, dan kebutuhan training wajib diisi.' })
      return
    }

    setIsSubmitting(true)
    try {
      await classesService.createInhouseRequest(payload)
      event.currentTarget.reset()
      setStatus({ type: 'success', message: 'Permintaan training berhasil dikirim ke backend.' })
    } catch {
      setStatus({ type: 'error', message: 'Permintaan belum terkirim. Backend tidak merespons atau data tidak valid.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <PublicLayout>
      <PageMeta title="Training Perusahaan" />
      <section className="hero-grid pt-28 sm:pt-32"><div className="mx-auto max-w-4xl px-4 pb-20 sm:px-6"><div className="rounded-2xl border border-[#254A2A] bg-[#111E14] p-6 shadow-card sm:p-8"><MapPin className="h-9 w-9 text-green-400" /><h1 className="mt-5 font-display text-4xl font-bold text-[#E8F0EA]">Training Excel untuk tim dan perusahaan</h1><p className="mt-4 text-base leading-8 text-[#8BA98F]">Materi bisa disesuaikan untuk admin, HRD, finance, sales, dan operasional. Form ini mengirim request ke backend MVP.</p><div className="mt-6 grid gap-3 sm:grid-cols-2">{['Materi custom', 'Studi kasus perusahaan', 'Online atau offline', 'Evaluasi skill tim'].map((item) => <div className="rounded-xl border border-[#1E3022] bg-[#0D1610] p-4 text-sm text-[#8BA98F]" key={item}>{item}</div>)}</div>
        <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
          <input className="rounded-lg border border-[#1E3022] bg-[#0F1A12] px-4 py-3 text-sm text-[#E8F0EA] outline-none focus:border-green-600" name="name" placeholder="Nama" />
          <input className="rounded-lg border border-[#1E3022] bg-[#0F1A12] px-4 py-3 text-sm text-[#E8F0EA] outline-none focus:border-green-600" name="email" placeholder="Email" type="email" />
          <div className="grid gap-4 sm:grid-cols-2"><input className="rounded-lg border border-[#1E3022] bg-[#0F1A12] px-4 py-3 text-sm text-[#E8F0EA] outline-none focus:border-green-600" name="phone" placeholder="Nomor HP" /><input className="rounded-lg border border-[#1E3022] bg-[#0F1A12] px-4 py-3 text-sm text-[#E8F0EA] outline-none focus:border-green-600" name="company" placeholder="Perusahaan" /></div>
          <textarea className="min-h-32 rounded-lg border border-[#1E3022] bg-[#0F1A12] px-4 py-3 text-sm text-[#E8F0EA] outline-none focus:border-green-600" name="message" placeholder="Ceritakan kebutuhan training" />
          {status ? <div className={status.type === 'success' ? 'rounded-xl border border-green-700/40 bg-green-950/30 p-4 text-sm text-green-300' : 'rounded-xl border border-amber-800/40 bg-amber-950/30 p-4 text-sm text-amber-300'}>{status.message}</div> : null}
          <Button className="w-full sm:w-fit" disabled={isSubmitting} type="submit"><MessageSquare className="h-4 w-4" />{isSubmitting ? 'Mengirim...' : 'Ajukan Kebutuhan Training'}</Button>
        </form>
      </div></div></section>
    </PublicLayout>
  )
}

