import { useCallback, useMemo } from 'react'
import { useAsyncData } from '@/hooks/useAsyncData'
import { tipsService } from '@/services/tipsService'
import { TipListPage } from './TipListPage'

export function RegexPatternPage() {
  const loadTips = useCallback(() => tipsService.getAllResult(), [])
  const { data, isLoading, isFallback, error, reload } = useAsyncData(loadTips)
  const tips = useMemo(() => (data ?? []).filter((tip) => tip.category === 'regex'), [data])

  return (
    <TipListPage
      eyebrow="Kamus REGEX"
      title="Pattern REGEX untuk Membersihkan Data"
      subtitle="30 pattern siap pakai untuk cek, ekstrak, dan bersihkan email, nomor WA, invoice, rupiah, URL, tanggal, domain, kode booking, dan input teks."
      tips={tips}
      isLoading={isLoading}
      isFallback={isFallback}
      error={error}
      onRetry={reload}
    />
  )
}
