import { challenges, type Challenge } from '@/data/challenges'
import { apiClient, type ApiResponse, withFallbackResult, withLocalFallback } from './apiClient'
import type { AuthProgress } from './authService'

type ChallengeApi = Challenge & { level: string }

type CompleteChallengePayload = {
  checklist?: string[]
  skillsEarned?: string[]
}

type CompleteChallengeResult = {
  completion: Record<string, unknown>
  progress: AuthProgress
}

function toChallenge(item: ChallengeApi): Challenge {
  return {
    ...item,
    level: item.level === 'Pemula' || item.level === 'Menengah' || item.level === 'Lanjutan' ? item.level : 'Pemula',
  }
}

const fetchAll = () => apiClient.get<ApiResponse<ChallengeApi[]>>('/challenges').then((response) => response.data.data.map(toChallenge))
const fetchBySlug = (slug: string) => apiClient.get<ApiResponse<ChallengeApi>>(`/challenges/${slug}`).then((response) => toChallenge(response.data.data))

export const challengesService = {
  getAll: () => withLocalFallback(fetchAll(), challenges),
  getAllResult: () => withFallbackResult(fetchAll(), challenges),
  getBySlug: (slug: string) => withLocalFallback(fetchBySlug(slug), challenges.find((item) => item.slug === slug) ?? challenges[0]),
  getBySlugResult: (slug: string) => withFallbackResult(fetchBySlug(slug), challenges.find((item) => item.slug === slug) ?? challenges[0]),
  completeChallenge: (slug: string, payload: CompleteChallengePayload = {}) => apiClient.post<ApiResponse<CompleteChallengeResult>>(`/challenges/${slug}/complete`, payload).then((response) => response.data),
}
