import { useCallback, useEffect, useState, type DependencyList } from 'react'
import type { DataResult } from '@/services/apiClient'

type AsyncState<T> = {
  data: T | null
  isLoading: boolean
  isFallback: boolean
  error?: string
  reload: () => void
}

export function useAsyncData<T>(loader: () => Promise<DataResult<T>>, deps: DependencyList = []): AsyncState<T> {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isFallback, setIsFallback] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const [version, setVersion] = useState(0)

  const reload = useCallback(() => setVersion((current) => current + 1), [])

  useEffect(() => {
    let active = true
    setIsLoading(true)

    loader()
      .then((result) => {
        if (!active) return
        setData(result.data)
        setIsFallback(result.source === 'fallback')
        setError(result.error)
      })
      .finally(() => {
        if (active) setIsLoading(false)
      })

    return () => {
      active = false
    }
  }, [loader, version, ...deps])

  return { data, isLoading, isFallback, error, reload }
}
