import type { AuthPayload, AuthProgress } from './authService'
import { apiClient, type ApiResponse, type DataResult, withFallbackResult } from './apiClient'

export type DashboardData = Omit<AuthPayload, 'token'> & {
  recentAttempts: Array<Record<string, unknown>>
  recentChallenges: Array<Record<string, unknown>>
  certificates: Array<Record<string, unknown>>
  ranking: { rank: number | null; label: string }
  recommendations: string[]
  certificateEligibility: CertificateEligibility
}

export type CertificateEligibility = {
  isEligible: boolean
  requirements: Array<{ label: string; current: number; target: number; passed: boolean }>
}

const emptyProgress: AuthProgress = {
  id: '',
  userId: '',
  level: 'Pemula',
  totalScore: 0,
  testsCompleted: 0,
  challengesCompleted: 0,
  competitionsCompleted: 0,
  averageScore: 0,
  formulasMastered: [],
  skills: [],
  rank: null,
  updatedAt: '',
}

export const dashboardService = {
  async getMeResult(): Promise<DataResult<DashboardData>> {
    try {
      const response = await apiClient.get<ApiResponse<DashboardData>>('/dashboard/me')
      return { data: response.data.data, source: 'backend' }
    } catch (error) {
      return { data: null as unknown as DashboardData, source: 'fallback', error: error instanceof Error ? error.message : 'Dashboard backend belum tersedia.' }
    }
  },
  getProgressResult: () => withFallbackResult(
    apiClient.get<ApiResponse<AuthProgress | null>>('/me/progress').then((response) => response.data.data ?? emptyProgress),
    emptyProgress,
  ),
  getAttemptsResult: () => withFallbackResult(
    apiClient.get<ApiResponse<Array<Record<string, unknown>>>>('/me/attempts').then((response) => response.data.data),
    [],
  ),
  getRecommendationsResult: () => withFallbackResult(
    apiClient.get<ApiResponse<string[]>>('/me/recommendations').then((response) => response.data.data),
    ['Mulai dari satu studi kasus yang paling dekat dengan kerjaan kamu.'],
  ),
}
