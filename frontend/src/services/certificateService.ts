import { apiClient, type ApiResponse } from './apiClient'
import type { CertificateEligibility } from './dashboardService'
import type { UserCertificate } from './profileService'

export type GeneratedCertificateResult = {
  certificate: UserCertificate | null
  eligibility: CertificateEligibility
}

export type VerifiedCertificateResult = {
  isValid: boolean
  certificateCode?: string
  name?: string
  username?: string
  title?: string
  level?: string
  issuedAt?: string
  skillEvidence?: string[]
  formulaMastered?: string[]
}

export const certificateService = {
  generateMyCertificate: () => apiClient.post<ApiResponse<GeneratedCertificateResult>>('/me/certificates/generate').then((response) => response.data),
  verify: (code: string) => apiClient.get<ApiResponse<VerifiedCertificateResult>>(`/certificates/verify/${code}`).then((response) => response.data.data),
}
