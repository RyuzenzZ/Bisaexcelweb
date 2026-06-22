import { Link } from 'react-router-dom'
import { EmptyState } from '@/components/shared/EmptyState'
import { ErrorState } from '@/components/shared/ErrorState'
import { LoadingState } from '@/components/shared/LoadingState'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { PageMeta } from '@/components/shared/PageMeta'
import { ROUTES } from '@/constants/routes'
import type { ExcelTip } from '@/types'

type TipListPageProps = {
  title: string
  subtitle: string
  eyebrow: string
  tips: ExcelTip[]
  isLoading?: boolean
  isFallback?: boolean
  error?: string
  onRetry?: () => void
}

export function TipListPage({ title, subtitle, eyebrow, tips, isLoading = false, isFallback = false, error, onRetry }: TipListPageProps) {
  return (
    <PublicLayout>
      <PageMeta title={title} />
      <section className="hero-grid pt-28 sm:pt-32">
        <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-green-700/50 bg-green-950/60 px-3 py-1 text-xs font-bold text-green-300">{eyebrow}</span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-[#E8F0EA] sm:text-5xl">{title}</h1>
            <p className="mt-4 text-base leading-8 text-[#8BA98F]">{subtitle}</p>
          </div>
          {isFallback ? <div className="mt-8"><ErrorState message={`Backend tips belum bisa diakses, halaman memakai fallback lokal. ${error ?? ''}`} onRetry={onRetry} /></div> : null}
          {isLoading ? <div className="mt-10"><LoadingState label="Memuat tips..." /></div> : null}
          {!isLoading && !tips.length ? <div className="mt-10"><EmptyState message="Tips untuk kategori ini belum tersedia." /></div> : null}
          {!isLoading && tips.length ? (
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {tips.map((tip) => (
                <Link className="rounded-2xl border border-[#1E3022] bg-[#111E14] p-5 shadow-card transition-all hover:-translate-y-1 hover:border-[#254A2A] hover:bg-[#162419]" key={tip.slug} to={ROUTES.EXCEL_TIP_DETAIL(tip.slug)}>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-400">{tip.role}</p>
                  <h2 className="mt-3 font-heading text-xl font-bold text-[#E8F0EA]">{tip.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-[#8BA98F]">{tip.description}</p>
                  <code className="mt-4 block rounded-lg bg-[#0F1A12] px-3 py-2 font-mono text-xs text-green-300">{tip.formula ?? tip.pattern ?? tip.shortcut}</code>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </PublicLayout>
  )
}
