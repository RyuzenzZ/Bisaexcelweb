import { certificates, type CertificatePreview } from '@/data/certificates'
import { apiClient, type ApiResponse, withFallbackResult, withLocalFallback } from './apiClient'

type CertificateApi = Omit<CertificatePreview, 'id' | 'issuedAt' | 'verificationStatus'> & {
  id: number | string
  issuedAt: string
}

function toCertificate(item: CertificateApi): CertificatePreview {
  return {
    ...item,
    id: String(item.id),
    issuedAt: item.issuedAt.slice(0, 10),
    verificationStatus: 'Terverifikasi dari backend MVP',
  }
}

const fetchAll = () => apiClient.get<ApiResponse<CertificateApi[]>>('/certificates').then((response) => response.data.data.map(toCertificate))
const fetchByCode = (code: string) => apiClient.get<ApiResponse<CertificateApi>>(`/certificates/${code}`).then((response) => toCertificate(response.data.data))

export const certificatesService = {
  getAll: () => withLocalFallback(fetchAll(), certificates),
  getAllResult: () => withFallbackResult(fetchAll(), certificates),
  getByCode: (code: string) => withLocalFallback(fetchByCode(code), certificates.find((item) => item.certificateCode === code || item.id === code) ?? certificates[0]),
  getByCodeResult: (code: string) => withFallbackResult(fetchByCode(code), certificates.find((item) => item.certificateCode === code || item.id === code) ?? certificates[0]),
  getPreview: () => withLocalFallback(fetchAll(), certificates),
  getPreviewResult: () => withFallbackResult(fetchAll(), certificates),
}
