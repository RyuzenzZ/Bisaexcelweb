import { useCallback, useMemo } from 'react'
import { useAsyncData } from '@/hooks/useAsyncData'
import { tipsService } from '@/services/tipsService'
import { TipListPage } from './TipListPage'

export function TipsTrickPage() {
  const loadTips = useCallback(() => tipsService.getAllResult(), [])
  const { data, isLoading, isFallback, error, reload } = useAsyncData(loadTips)
  const tips = useMemo(() => (data ?? []).filter((tip) => tip.category === 'tips-trick'), [data])

  return (
    <TipListPage
      eyebrow="Tips & Trick"
      title="Tips & Trick Excel untuk Kerja Lebih Cepat"
      subtitle="Shortcut wajib, data cleaning, dashboard bisnis, keamanan file, struktur workbook, dan kebiasaan kerja cepat di Excel."
      tips={tips}
      isLoading={isLoading}
      isFallback={isFallback}
      error={error}
      onRetry={reload}
    />
  )
}
