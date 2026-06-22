export type UserRole = 'student' | 'admin'

export type SkillLevel = 'Pemula' | 'Dasar' | 'Menengah' | 'Advanced' | 'Professional'

export type User = {
  id: string
  name: string
  username: string
  email: string
  role: UserRole
  avatarUrl?: string
  bio?: string
  level: SkillLevel
  testsCompleted: number
  challengesCompleted: number
  formulasMastered: string[]
  certificates: string[]
  ranking?: number
  joinedAt?: string
}