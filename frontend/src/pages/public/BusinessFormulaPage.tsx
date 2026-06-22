import { useCallback, useMemo } from 'react'
import { useAsyncData } from '@/hooks/useAsyncData'
import { tipsService } from '@/services/tipsService'
import { TipListPage } from './TipListPage'

export function BusinessFormulaPage() {
  const loadTips = useCallback(() => tipsService.getAllResult(), [])
  const { data, isLoading, isFallback, error, reload } = useAsyncData(loadTips)
  const tips = useMemo(() => (data ?? []).filter((tip) => tip.category === 'rumus-bisnis'), [data])

  return (
    <TipListPage
      eyebrow="Rumus Bisnis"
      title="Rumus Bisnis Siap Pakai"
      subtitle="Kumpulan rumus siap pakai untuk sales, marketing, properti, finance, dashboard target, data customer, lead, booking, akad, cashflow, ROI, ROAS, dan BEP."
      tips={tips}
      isLoading={isLoading}
      isFallback={isFallback}
      error={error}
      onRetry={reload}
    />
  )
}
