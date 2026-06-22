export type SkillLevel = 'Pemula' | 'Dasar' | 'Menengah' | 'Advanced' | 'Professional'

export type MockUserProfile = {
  id: string
  name: string
  username: string
  email: string
  avatarUrl: string
  bio: string
  joinedAt: string
  level: SkillLevel
  testsCompleted: number
  challengesCompleted: number
  averageScore: number
  ranking: number
  progressPercent: number
  formulasMastered: string[]
  skills: string[]
  certificates: string[]
  recommendations: string[]
}

export const mockUser: MockUserProfile = {
  id: 'demo-user-1',
  name: 'Damar Pratama',
  username: 'damar_excel',
  email: 'damar@bisaexcel.com',
  avatarUrl: '',
  bio: 'Lagi bangun skill Excel dari nol buat kerja admin dan laporan sales.',
  joinedAt: 'Juni 2026',
  level: 'Menengah',
  testsCompleted: 8,
  challengesCompleted: 3,
  averageScore: 86,
  ranking: 12,
  progressPercent: 68,
  formulasMastered: ['SUM', 'AVERAGE', 'IF', 'COUNTIF', 'SUMIF', 'XLOOKUP'],
  skills: ['Rumus dasar', 'Data cleaning', 'Rekap penjualan', 'Lookup dasar'],
  certificates: ['BE-CERT-0001'],
  recommendations: ['Lanjutkan materi lookup', 'Coba challenge rekap penjualan', 'Naikkan skor rata-rata ke 90'],
}

export function getMockAuthState() {
  const isAuthenticated = typeof window !== 'undefined' && window.localStorage.getItem('bisaexcel_mock_auth') === '1'
  return { isAuthenticated, currentUser: isAuthenticated ? mockUser : null, isMock: true }
}

export function signInMock() {
  if (typeof window === 'undefined') return
  window.localStorage.setItem('bisaexcel_mock_auth', '1')
}

export function signOutMock() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem('bisaexcel_mock_auth')
}

export function getLevelFromCompletedTests(testsCompleted: number): SkillLevel {
  if (testsCompleted <= 2) return 'Pemula'
  if (testsCompleted <= 5) return 'Dasar'
  if (testsCompleted <= 10) return 'Menengah'
  if (testsCompleted <= 20) return 'Advanced'
  return 'Professional'
}

export function getNextLevelCopy(user: MockUserProfile): string {
  if (user.level === 'Professional') return 'Kamu sudah ada di level simulasi tertinggi MVP.'
  return 'Level ini bantu kamu tahu posisi belajar sekarang, bukan buat bikin kamu buru-buru jago.'
}