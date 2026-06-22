import { Mail, MessageSquare } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { PageMeta } from '@/components/shared/PageMeta'
import { Button } from '@/components/ui/button'
import { classesService } from '@/services/classesService'

type SubmitStatus = { type: 'success' | 'error'; message: string } | null

export function ContactPage() {
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
      needType: 'general' as const,
    }

    if (!payload.name || !payload.email || !payload.message) {
      setStatus({ type: 'error', message: 'Nama, email, dan pesan wajib diisi.' })
      return
    }

    setIsSubmitting(true)
    try {
      await classesService.createInhouseRequest(payload)
      event.currentTarget.reset()
      setStatus({ type: 'success', message: 'Pesan berhasil dikirim ke backend.' })
    } catch {
      setStatus({ type: 'error', message: 'Pesan belum terkirim. Backend tidak merespons atau data tidak valid.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <PublicLayout>
      <PageMeta title="Kontak" />
      <section className="hero-grid pt-28 sm:pt-32">
        <div className="mx-auto max-w-4xl px-4 pb-20 sm:px-6">
          <h1 className="font-display text-4xl font-bold text-[#E8F0EA] sm:text-5xl">Kontak BisaExcel.com</h1>
          <p className="mt-5 text-base leading-8 text-[#8BA98F]">Kirim kebutuhan partnership, training perusahaan, template, atau dukungan peserta. Form ini mengirim data ke endpoint backend MVP.</p>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-[#1E3022] bg-[#111E14] p-6"><Mail className="h-8 w-8 text-green-400" /><h2 className="mt-4 font-heading text-xl font-bold">Email</h2><p className="mt-2 text-[#8BA98F]">hello@bisaexcel.com</p></div>
            <div className="rounded-2xl border border-[#1E3022] bg-[#111E14] p-6"><MessageSquare className="h-8 w-8 text-green-400" /><h2 className="mt-4 font-heading text-xl font-bold">Training Perusahaan</h2><p className="mt-2 text-[#8BA98F]">Kirim kebutuhan training Excel tim Anda.</p></div>
          </div>
          <form className="mt-8 grid gap-4 rounded-2xl border border-[#254A2A] bg-[#111E14] p-5" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2"><input className="rounded-lg border border-[#1E3022] bg-[#0F1A12] px-4 py-3 text-sm text-[#E8F0EA] outline-none focus:border-green-600" name="name" placeholder="Nama" /><input className="rounded-lg border border-[#1E3022] bg-[#0F1A12] px-4 py-3 text-sm text-[#E8F0EA] outline-none focus:border-green-600" name="email" placeholder="Email" type="email" /></div>
            <div className="grid gap-4 sm:grid-cols-2"><input className="rounded-lg border border-[#1E3022] bg-[#0F1A12] px-4 py-3 text-sm text-[#E8F0EA] outline-none focus:border-green-600" name="phone" placeholder="Nomor HP" /><input className="rounded-lg border border-[#1E3022] bg-[#0F1A12] px-4 py-3 text-sm text-[#E8F0EA] outline-none focus:border-green-600" name="company" placeholder="Perusahaan" /></div>
            <textarea className="min-h-32 rounded-lg border border-[#1E3022] bg-[#0F1A12] px-4 py-3 text-sm text-[#E8F0EA] outline-none focus:border-green-600" name="message" placeholder="Pesan atau kebutuhan Anda" />
            {status ? <div className={status.type === 'success' ? 'rounded-xl border border-green-700/40 bg-green-950/30 p-4 text-sm text-green-300' : 'rounded-xl border border-amber-800/40 bg-amber-950/30 p-4 text-sm text-amber-300'}>{status.message}</div> : null}
            <Button className="w-full sm:w-fit" disabled={isSubmitting} type="submit">{isSubmitting ? 'Mengirim...' : 'Hubungi Tim BisaExcel'}</Button>
          </form>
        </div>
      </section>
    </PublicLayout>
  )
}
