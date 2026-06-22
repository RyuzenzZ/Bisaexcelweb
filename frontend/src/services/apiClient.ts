import axios from 'axios'

export type ApiResponse<T> = {
  data: T
  message: string
  errors?: Record<string, string[]> | string | null
}

export type DataResult<T> = {
  data: T
  source: 'backend' | 'fallback'
  error?: string
}

export const AUTH_TOKEN_KEY = 'bisaexcel_access_token'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8000/api/v1',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 20000,
})

apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = window.localStorage.getItem(AUTH_TOKEN_KEY)
    if (token) config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export async function withLocalFallback<T>(request: Promise<T>, fallback: T): Promise<T> {
  try {
    return await request
  } catch {
    return fallback
  }
}

export async function withFallbackResult<T>(request: Promise<T>, fallback: T): Promise<DataResult<T>> {
  try {
    return { data: await request, source: 'backend' }
  } catch (error) {
    return { data: fallback, source: 'fallback', error: getErrorMessage(error) }
  }
}

function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.code === 'ECONNABORTED') return 'Backend belum merespons. Coba refresh atau pastikan server lokalnya lagi jalan.'
    if (error.code === 'ERR_NETWORK') return 'Backend belum merespons. Coba refresh atau pastikan server lokalnya lagi jalan.'
    return error.response?.data?.message ?? error.message
  }
  return error instanceof Error ? error.message : 'Gagal mengambil data dari backend.'
}