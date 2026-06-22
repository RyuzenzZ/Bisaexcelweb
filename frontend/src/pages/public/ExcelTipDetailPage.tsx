import { AlertTriangle, ArrowLeft, CheckCircle2, Lightbulb } from 'lucide-react'
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
import { tipsService } from '@/services/tipsService'
import type { ExcelTip, ExcelTipCategory } from '@/types'

const categoryLabels: Record<ExcelTipCategory, string> = {
  'rumus-bisnis': 'Rumus Bisnis',
  lambda: 'Kamus LAMBDA',
  regex: 'Pattern REGEX',
  'tips-trick': 'Tips & Trick',
  shortcut: 'Shortcut',
}

export function ExcelTipDetailPage() {
  const { slug = '' } = useParams()
  const loadTip = useCallback(() => tipsService.getBySlugResult(slug), [slug])
  const { data: tip, isLoading, isFallback, error, reload } = useAsyncData(loadTip, [slug])

  return (
    <PublicLayout>
      <PageMeta title={tip?.title ?? 'Excel Tips'} />
      <section className="hero-grid pt-28 sm:pt-32">
        <div className="mx-auto max-w-4xl px-4 pb-20 sm:px-6">
          <Button asChild variant="ghost"><Link to={ROUTES.EXCEL_TIPS}><ArrowLeft className="h-4 w-4" />Kembali ke Excel Tips</Link></Button>
          {isFallback ? <div className="mt-6"><ErrorState message={`Backend tips belum bisa diakses, detail memakai fallback lokal. ${error ?? ''}`} onRetry={reload} /></div> : null}
          {isLoading ? <div className="mt-6"><LoadingState label="Memuat detail Excel Tips..." /></div> : null}
          {!isLoading && !tip ? <div className="mt-6"><EmptyState message="Excel Tips tidak ditemukan." /></div> : null}
          {!isLoading && tip ? <TipArticle tip={tip} /> : null}
        </div>
      </section>
    </PublicLayout>
  )
}

function TipArticle({ tip }: { tip: ExcelTip }) {
  const displayValue = getDisplayValue(tip)
  const displayLabel = getDisplayLabel(tip)

  return (
    <article className="mt-6 rounded-2xl border border-[#254A2A] bg-[#111E14] p-6 shadow-card sm:p-8">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex rounded-full border border-green-700/50 bg-green-950/60 px-3 py-1 text-xs font-bold text-green-300">{categoryLabels[tip.category]}</span>
        <span className="inline-flex rounded-full border border-[#254A2A] bg-[#0D1610] px-3 py-1 text-xs font-bold text-[#8BA98F]">{tip.level}</span>
      </div>

      <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-[#E8F0EA] sm:text-5xl">{tip.title}</h1>
      <p className="mt-4 text-base leading-8 text-[#8BA98F]">{tip.description}</p>

      {displayValue ? (
        <div className="mt-8 rounded-xl border border-[#1E3022] bg-[#0F1A12] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8BA98F]">{displayLabel}</p>
          <code className="mt-3 block break-words font-mono text-base leading-7 text-green-300 sm:text-lg">{displayValue}</code>
        </div>
      ) : null}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <InfoBlock title="Use case" content={tip.useCase} />
        <InfoBlock title="Cocok untuk" content={tip.tags.length ? tip.tags.join(', ') : tip.role} />
      </div>

      <section className="mt-8">
        <h2 className="font-heading text-2xl font-bold text-[#E8F0EA]">Penjelasan</h2>
        <p className="mt-3 text-sm leading-7 text-[#8BA98F]">{tip.explanation}</p>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        <InfoBlock title="Contoh input" content={tip.exampleInput ?? 'Data kerja harian di Excel.'} />
        <InfoBlock title="Contoh output" content={tip.exampleOutput ?? 'Hasil yang siap dipakai untuk laporan.'} />
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        <ListBlock icon={<AlertTriangle className="h-5 w-5 text-amber-400" />} title="Kesalahan umum" items={tip.commonMistakes} />
        <ListBlock icon={<Lightbulb className="h-5 w-5 text-green-400" />} title="Tips tambahan" items={tip.extraTips} />
      </section>

      <div className="mt-8 flex flex-wrap gap-2">
        {tip.tags.map((tag) => <span className="rounded-full bg-green-600/10 px-3 py-1.5 text-xs font-semibold text-green-300" key={tag}>{tag}</span>)}
      </div>
    </article>
  )
}

function InfoBlock({ title, content }: { title: string; content: string }) {
  return (
    <div className="rounded-xl border border-[#1E3022] bg-[#0D1610] p-5">
      <h2 className="font-heading font-bold text-[#E8F0EA]">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-[#8BA98F]">{content}</p>
    </div>
  )
}

function ListBlock({ icon, title, items }: { icon: JSX.Element; title: string; items: string[] }) {
  return (
    <div className="rounded-xl border border-[#1E3022] bg-[#0D1610] p-5">
      <div className="flex items-center gap-2">
        {icon}
        <h2 className="font-heading font-bold text-[#E8F0EA]">{title}</h2>
      </div>
      <div className="mt-4 grid gap-3">
        {items.map((item) => (
          <div className="flex gap-3 text-sm leading-6 text-[#8BA98F]" key={item}>
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function getDisplayValue(tip: ExcelTip): string | undefined {
  return tip.formula ?? tip.pattern ?? tip.shortcut
}

function getDisplayLabel(tip: ExcelTip): string {
  if (tip.pattern) return 'Pattern REGEX'
  if (tip.shortcut) return 'Shortcut'
  return 'Formula / LAMBDA'
}