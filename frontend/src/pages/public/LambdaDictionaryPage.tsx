import { useCallback, useMemo } from 'react'
import { useAsyncData } from '@/hooks/useAsyncData'
import { tipsService } from '@/services/tipsService'
import { TipListPage } from './TipListPage'

export function LambdaDictionaryPage() {
  const loadTips = useCallback(() => tipsService.getAllResult(), [])
  const { data, isLoading, isFallback, error, reload } = useAsyncData(loadTips)
  const tips = useMemo(() => (data ?? []).filter((tip) => tip.category === 'lambda'), [data])

  return (
    <TipListPage
      eyebrow="Kamus LAMBDA"
      title="Kamus LAMBDA untuk Formula Modern"
      subtitle="20 contoh fungsi custom di Name Manager seperti MARGIN, MARKUP, LABABERSIH, CPL, ROAS, CONVRATE, CICILANFLAT, BERSIHTEKS, dan STATUSLEAD."
      tips={tips}
      isLoading={isLoading}
      isFallback={isFallback}
      error={error}
      onRetry={reload}
    />
  )
}
