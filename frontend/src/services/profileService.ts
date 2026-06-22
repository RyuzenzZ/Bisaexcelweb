import type { AuthPayload, AuthProgress } from './authService'
import { apiClient, type ApiResponse, type DataResult, withFallbackResult } from './apiClient'
import type { CertificateEligibility } from './dashboardService'

export type PublicProfileData = Omit<AuthPayload, 'token'>

export type PublicPortfolioData = PublicProfileData & {
  attempts: Array<Record<string, unknown>>
  challenges: Array<Record<string, unknown>>
  certificates: Array<UserCertificate>
  recommendations: string[]
  emptyMessage: string | null
}

export type UserCertificate = {
  id: string
  userId: string
  certificateCode: string
  title: string
  level: string
  score: number
  formulaMastered: string[]
  skillEvidence: string[]
  relatedPlayCases: string[]
  completedTests: number
  completedChallenges: number
  accuracy: number
  issuedAt: string
}

export type ProfileCertificatesData = {
  certificates: UserCertificate[]
  eligibility: CertificateEligibility
}

export function emptyEligibility(progress?: AuthProgress | null): CertificateEligibility {
  return {
    isEligible: false,
    requirements: [
      { label: 'Minimal 3 test selesai', current: progress?.testsCompleted ?? 0, target: 3, passed: (progress?.testsCompleted ?? 0) >= 3 },
      { label: 'Skor rata-rata minimal 75', current: progress?.averageScore ?? 0, target: 75, passed: (progress?.averageScore ?? 0) >= 75 },
      { label: 'Minimal 1 challenge selesai', current: progress?.challengesCompleted ?? 0, target: 1, passed: (progress?.challengesCompleted ?? 0) >= 1 },
      { label: 'Minimal 5 rumus atau skill tercatat', current: [...(progress?.formulasMastered ?? []), ...(progress?.skills ?? [])].length, target: 5, passed: [...(progress?.formulasMastered ?? []), ...(progress?.skills ?? [])].length >= 5 },
    ],
  }
}

const fetchProfile = (username: string) => apiClient.get<ApiResponse<PublicProfileData>>(`/profiles/${username}`).then((response) => response.data.data)
const fetchPortfolio = (username: string) => apiClient.get<ApiResponse<PublicPortfolioData>>(`/profiles/${username}/portfolio`).then((response) => response.data.data)
const fetchCertificates = (username: string) => apiClient.get<ApiResponse<ProfileCertificatesData>>(`/profiles/${username}/certificates`).then((response) => response.data.data)
const fetchMe = () => apiClient.get<ApiResponse<PublicProfileData>>('/profiles/me').then((response) => response.data.data)

export const profileService = {
  getByUsernameResult(username: string, fallback: PublicProfileData) {
    return withFallbackResult(fetchProfile(username), fallback)
  },
  getPortfolioResult(username: string, fallback: PublicPortfolioData) {
    return withFallbackResult(fetchPortfolio(username), fallback)
  },
  getCertificatesResult(username: string, fallback: ProfileCertificatesData) {
    return withFallbackResult(fetchCertificates(username), fallback)
  },
  getMeResult(fallback: PublicProfileData): Promise<DataResult<PublicProfileData>> {
    return withFallbackResult(fetchMe(), fallback)
  },
}
