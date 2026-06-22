import { Download, Lock } from 'lucide-react'
import { useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { EmptyState } from '@/components/shared/EmptyState'
import { ErrorState } from '@/components/shared/ErrorState'
import { LoadingState } from '@/components/shared/LoadingState'
import { PageMeta } from '@/components/shared/PageMeta'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import { useAsyncData } from '@/hooks/useAsyncData'
import { templatesService } from '@/services/templatesService'

function formatPrice(price: number): string {
  return price ? `Rp${price.toLocaleString('id-ID')}` : 'Free'
}

export function TemplatePage() {
  const loadTemplates = useCallback(() => templatesService.getAllResult(), [])
  const { data: templates, isLoading, isFallback, error, reload } = useAsyncData(loadTemplates)

  return (
    <PublicLayout>
      <PageMeta title="Template Excel" />
      <section className="hero-grid pt-28 sm:pt-32">
        <div className="motion-page mx-auto max-w-7xl px-4 pb-20 sm:px-6">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-green-700/50 bg-green-950/60 px-3 py-1 text-xs font-bold text-green-300">Template siap pakai</span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-[#E8F0EA] sm:text-5xl">Template Excel untuk pekerjaan harian</h1>
            <p className="mt-4 text-base leading-8 text-[#8BA98F]">Template adalah produk digital. Beberapa template berbayar, tetapi payment belum aktif di fase MVP.</p>
          </div>
          {isFallback ? <div className="mt-8"><ErrorState message={`Backend template belum bisa diakses, halaman memakai fallback lokal. ${error ?? ''}`} onRetry={reload} /></div> : null}
          {isLoading ? <div className="mt-10"><LoadingState label="Memuat template..." /></div> : null}
          {!isLoading && !templates?.length ? <div className="mt-10"><EmptyState message="Belum ada template Excel." icon={Download} /></div> : null}
          {!isLoading && templates?.length ? (
            <div className="motion-stagger mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {templates.map((template) => (
                <Link className="motion-card rounded-2xl border border-[#1E3022] bg-[#111E14] p-5 shadow-card transition-all hover:border-[#254A2A] hover:bg-[#162419]" key={template.slug} to={ROUTES.TEMPLATE_DETAIL(template.slug)}>
                  <Download className="motion-icon h-7 w-7 text-green-400" />
                  <span className="mt-4 inline-flex items-center gap-1 rounded-full border border-[#254A2A] px-2.5 py-1 text-xs text-[#8BA98F]">{template.access === 'Premium' ? <Lock className="h-3 w-3 text-amber-400" /> : null}{template.access} - {formatPrice(template.price)}</span>
                  <h2 className="mt-4 font-heading text-xl font-bold text-[#E8F0EA]">{template.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-[#8BA98F]">{template.benefit}</p>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </PublicLayout>
  )
}

export function TemplateDetailPage() {
  const { slug = '' } = useParams()
  const loadTemplate = useCallback(() => templatesService.getBySlugResult(slug), [slug])
  const { data: template, isLoading, isFallback, error, reload } = useAsyncData(loadTemplate, [slug])

  return (
    <PublicLayout>
      <PageMeta title={template?.title ?? 'Template Excel'} />
      <section className="hero-grid pt-28 sm:pt-32">
        <div className="mx-auto max-w-4xl px-4 pb-20 sm:px-6">
          <Button asChild variant="ghost"><Link to={ROUTES.TEMPLATES}>Kembali ke Template</Link></Button>
          {isFallback ? <div className="mt-6"><ErrorState message={`Backend template belum bisa diakses, detail memakai fallback lokal. ${error ?? ''}`} onRetry={reload} /></div> : null}
          {isLoading ? <div className="mt-6"><LoadingState label="Memuat detail template..." /></div> : null}
          {!isLoading && !template ? <div className="mt-6"><EmptyState message="Template tidak ditemukan." icon={Download} /></div> : null}
          {!isLoading && template ? (
            <div className="motion-page mt-6 rounded-2xl border border-[#254A2A] bg-[#111E14] p-6 shadow-card sm:p-8">
              <span className="inline-flex rounded-full border border-[#254A2A] px-3 py-1 text-xs font-semibold text-[#8BA98F]">{template.category}</span>
              <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-[#E8F0EA]">{template.title}</h1>
              <p className="mt-4 text-base leading-8 text-[#8BA98F]">{template.benefit}</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-[#1E3022] bg-[#0D1610] p-5 text-sm leading-6 text-[#8BA98F]">Target pengguna: <strong className="text-[#E8F0EA]">{template.suitableFor}</strong></div>
                <div className="rounded-xl border border-[#1E3022] bg-[#0D1610] p-5 text-sm leading-6 text-[#8BA98F]">Harga placeholder: <strong className="text-[#E8F0EA]">{formatPrice(template.price)}</strong></div>
              </div>
              <div className="mt-6 rounded-xl border border-amber-800/40 bg-amber-950/30 p-4 text-sm text-amber-300">{template.access === 'Premium' ? 'Akses template belum aktif otomatis. Untuk sekarang, hubungi admin BisaExcel untuk akses template ini.' : 'Template gratis akan bisa diunduh saat sistem file tersedia.'}</div>
              <Button asChild className="mt-6"><Link to={ROUTES.CONTACT}>{template.access === 'Premium' ? 'Hubungi Admin BisaExcel' : 'Tanya Detail Template'}</Link></Button>
            </div>
          ) : null}
        </div>
      </section>
    </PublicLayout>
  )
}
