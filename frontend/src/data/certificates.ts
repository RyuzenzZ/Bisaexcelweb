export type CertificatePreview = {
  id: string
  userName: string
  certificateCode: string
  testTitle: string
  score: number
  level: string
  issuedAt: string
  skills: string[]
  formulaMastered: string[]
  verificationStatus: string
}

export const certificates: CertificatePreview[] = [
  {
    id: 'cert-demo-001',
    userName: 'Peserta Demo',
    certificateCode: 'BE-CERT-0001',
    testTitle: 'Test Excel Dasar',
    score: 88,
    level: 'Pemula Siap Kerja',
    issuedAt: '2026-06-19',
    skills: ['Membaca range', 'Menggunakan kriteria', 'Menyusun rumus dasar'],
    formulaMastered: ['SUM', 'AVERAGE', 'IF', 'COUNTIF', 'SUMIF', 'VLOOKUP', 'XLOOKUP', 'Pivot Table dasar'],
    verificationStatus: 'Preview fitur - verifikasi backend belum aktif',
  },
]
