export type PortfolioPreview = {
  username: string
  displayName: string
  summary: string
  testsCompleted: number
  averageScore: number
  skills: string[]
  formulaMastered: string[]
  certificates: string[]
  updatedAt: string
}

export const portfolios: PortfolioPreview[] = [
  {
    username: 'peserta-demo',
    displayName: 'Peserta Demo',
    summary: 'Portfolio skill Excel yang berkembang seiring peserta menyelesaikan Test Excel dan Challenge praktik.',
    testsCompleted: 12,
    averageScore: 86,
    skills: ['Rumus dasar', 'Data cleaning', 'Rekap laporan', 'Pivot Table dasar'],
    formulaMastered: ['SUM', 'COUNTIF', 'SUMIF', 'IF', 'VLOOKUP', 'XLOOKUP'],
    certificates: ['BE-CERT-0001'],
    updatedAt: '2026-06-19',
  },
]
