import { ArrowRight, Briefcase, Calculator, FunctionSquare, Keyboard, Lightbulb, Regex, Search } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
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

const categories = [
  { title: 'Semua', value: 'all', icon: Search },
  { title: 'Rumus Bisnis', value: 'rumus-bisnis', icon: Calculator },
  { title: 'Kamus LAMBDA', value: 'lambda', icon: FunctionSquare },
  { title: 'Pattern REGEX', value: 'regex', icon: Regex },
  { title: 'Tips & Trick', value: 'tips-trick', icon: Lightbulb },
  { title: 'Shortcut', value: 'shortcut', icon: Keyboard },
] as const

const categoryLabels: Record<ExcelTipCategory, string> = {
  'rumus-bisnis': 'Rumus Bisnis',
  lambda: 'Kamus LAMBDA',
  regex: 'Pattern REGEX',
  'tips-trick': 'Tips & Trick',
  shortcut: 'Shortcut',
}

type ActiveCategory = ExcelTipCategory | 'all'

export function TipsPage() {
  const [query, setQuery] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = normalizeCategoryParam(searchParams.get('category'))
  const loadTips = useCallback(() => tipsService.getAllResult(), [])
  const { data: tips, isLoading, isFallback, error, reload } = useAsyncData(loadTips)

  const filteredTips = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return (tips ?? []).filter((tip) => {
      const matchesCategory = activeCategory === 'all' || tip.category === activeCategory
      const searchableText = [
        tip.title,
        tip.description,
        tip.category,
        tip.formula,
        tip.pattern,
        tip.shortcut,
        tip.tags.join(' '),
        tip.useCase,
        tip.exampleInput,
        tip.exampleOutput,
        tip.level,
      ].filter(Boolean).join(' ').toLowerCase()
      const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery)
      return matchesCategory && matchesQuery
    })
  }, [activeCategory, query, tips])

  const setActiveCategory = (category: ActiveCategory) => {
    if (category === 'all') {
      setSearchParams({})
      return
    }
    setSearchParams({ category })
  }

  const resetFilter = () => {
    setQuery('')
    setSearchParams({})
  }

  return (
    <PublicLayout>
      <PageMeta title="Excel Tips" />
      <section className="hero-grid pt-28 sm:pt-32">
        <div className="motion-page mx-auto max-w-7xl px-4 pb-20 sm:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex rounded-full border border-green-700/50 bg-green-950/60 px-3 py-1 text-xs font-bold text-green-300">Excel Tips</span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-[#E8F0EA] sm:text-6xl">Excel Tips: Rumus, LAMBDA, REGEX, dan Shortcut Buat Kerja Lebih Cepat</h1>
            <p className="mt-5 text-base leading-8 text-[#8BA98F] sm:text-lg">Cari rumus bisnis, pattern REGEX, kamus LAMBDA, shortcut, dan tips Excel praktis yang bisa langsung kamu pakai buat kerja, laporan, dan analisis data.</p>
          </div>

          <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-[#254A2A] bg-[#111E14] p-3 shadow-card">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#4D6650]" />
              <input
                className="h-14 w-full rounded-xl border border-[#1E3022] bg-[#0F1A12] pl-12 pr-4 text-sm font-medium text-[#E8F0EA] outline-none placeholder:text-[#4D6650] focus:border-green-600"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Cari SUMIFS, CPL, ROAS, nomor WA, invoice, LAMBDA, REGEX, atau Ctrl + T..."
                value={query}
              />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <button className={filterClass(activeCategory === category.value)} key={category.value} onClick={() => setActiveCategory(category.value)} type="button">
                  <Icon className="h-4 w-4" />
                  {category.title}
                </button>
              )
            })}
          </div>

          {isFallback ? <div className="mt-8"><ErrorState message={`Backend tips belum bisa diakses, halaman memakai fallback lokal. ${error ?? ''}`} onRetry={reload} /></div> : null}
          {isLoading ? <div className="mt-10"><LoadingState label="Memuat Excel Tips..." /></div> : null}

          {!isLoading ? (
            <section className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="font-heading text-2xl font-bold">Hasil Excel Tips</h2>
                    <p className="mt-1 text-sm text-[#8BA98F]">{filteredTips.length} tips ditemukan.</p>
                  </div>
                  {query || activeCategory !== 'all' ? <button className="text-sm font-semibold text-green-400 hover:text-green-300" onClick={resetFilter} type="button">Reset filter</button> : null}
                </div>

                {filteredTips.length ? (
                  <div className="motion-stagger mt-5 grid gap-4 md:grid-cols-2">
                    {filteredTips.map((tip) => <TipCard key={tip.slug} tip={tip} />)}
                  </div>
                ) : <div className="mt-5"><EmptyState title="Excel Tips tidak ditemukan" message="Coba kata kunci lain seperti SUMIFS, margin, CPL, email, nomor WA, invoice, LAMBDA, REGEX, atau shortcut." icon={Search} /></div>}
              </div>

              <aside className="motion-card h-fit rounded-2xl border border-[#254A2A] bg-[#111E14] p-6 shadow-card">
                <Briefcase className="h-8 w-8 text-amber-400" />
                <h2 className="mt-4 font-heading text-2xl font-bold">Fokus kerja nyata</h2>
                <p className="mt-3 text-sm leading-6 text-[#8BA98F]">Satu tempat untuk mencari rumus bisnis, pattern REGEX, fungsi LAMBDA, shortcut, dan kebiasaan workbook yang lebih rapi.</p>
                <div className="mt-5 grid gap-2">
                  {categories.filter((category) => category.value !== 'all').map((category) => (
                    <button className="flex items-center justify-between rounded-lg border border-[#1E3022] bg-[#0D1610] px-3 py-2 text-left text-sm text-[#8BA98F] hover:border-[#254A2A] hover:text-[#E8F0EA]" key={category.value} onClick={() => setActiveCategory(category.value)} type="button">
                      {category.title}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  ))}
                </div>
                <Button asChild className="mt-6 w-full">
                  <Link to={ROUTES.LEARN}>Mulai dari materi dasar</Link>
                </Button>
              </aside>
            </section>
          ) : null}
        </div>
      </section>
    </PublicLayout>
  )
}

function TipCard({ tip }: { tip: ExcelTip }) {
  const displayValue = getDisplayValue(tip)

  return (
    <Link className="motion-card rounded-2xl border border-[#1E3022] bg-[#111E14] p-5 shadow-card transition-all hover:border-[#254A2A] hover:bg-[#162419]" to={ROUTES.EXCEL_TIP_DETAIL(tip.slug)}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-[#254A2A] bg-[#0D1610] px-2.5 py-1 text-xs font-semibold text-green-300">{categoryLabels[tip.category]}</span>
        <span className="rounded-full border border-[#254A2A] bg-[#0D1610] px-2.5 py-1 text-xs font-semibold text-[#8BA98F]">{tip.level}</span>
      </div>
      <h2 className="mt-4 font-heading text-xl font-bold text-[#E8F0EA]">{tip.title}</h2>
      <p className="mt-2 text-sm leading-6 text-[#8BA98F]">{tip.description}</p>
      {displayValue ? <code className="mt-4 block rounded-lg bg-[#0F1A12] px-3 py-2 font-mono text-xs text-green-300">{displayValue}</code> : null}
      <div className="mt-4 rounded-lg border border-[#1E3022] bg-[#0D1610] p-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#4D6650]">Use case</p>
        <p className="mt-1 text-sm leading-6 text-[#8BA98F]">{tip.useCase}</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {tip.tags.slice(0, 3).map((tag) => <span className="rounded-full bg-green-600/10 px-2.5 py-1 text-xs font-semibold text-green-300" key={tag}>{tag}</span>)}
      </div>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-green-400">Lihat detail <ArrowRight className="motion-icon h-4 w-4" /></span>
    </Link>
  )
}

function normalizeCategoryParam(value: string | null): ActiveCategory {
  if (value === 'business') return 'rumus-bisnis'
  if (value === 'trick') return 'tips-trick'
  if (value === 'rumus-bisnis' || value === 'lambda' || value === 'regex' || value === 'tips-trick' || value === 'shortcut') return value
  return 'all'
}

function getDisplayValue(tip: ExcelTip): string | undefined {
  return tip.formula ?? tip.pattern ?? tip.shortcut
}

function filterClass(isActive: boolean): string {
  return isActive
    ? 'inline-flex items-center gap-2 rounded-full border border-green-700/50 bg-green-600/15 px-3 py-1.5 text-sm font-semibold text-green-300'
    : 'inline-flex items-center gap-2 rounded-full border border-[#254A2A] bg-[#111E14] px-3 py-1.5 text-sm font-semibold text-[#8BA98F] hover:bg-[#1C2E20] hover:text-[#E8F0EA]'
}