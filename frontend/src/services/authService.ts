import { apiClient, AUTH_TOKEN_KEY, type ApiResponse } from './apiClient'

export type AuthUser = {
  id: string
  name: string
  username: string
  email: string
  avatarUrl?: string | null
  role: string
}

export type AuthProfile = {
  id: string
  userId: string
  bio?: string | null
  level: string
  headline?: string | null
  location?: string | null
  joinedAt: string
  updatedAt: string
}

export type AuthProgress = {
  id: string
  userId: string
  level: string
  totalScore: number
  testsCompleted: number
  challengesCompleted: number
  competitionsCompleted: number
  averageScore: number
  formulasMastered: string[]
  skills: string[]
  rank?: number | null
  updatedAt: string
}

export type AuthPayload = {
  user: AuthUser
  profile: AuthProfile | null
  progress: AuthProgress | null
  token: string
}

export type LoginInput = { emailOrUsername: string; password: string }
export type RegisterInput = { name: string; username: string; email: string; password: string }

function storeToken(token: string) {
  window.localStorage.setItem(AUTH_TOKEN_KEY, token)
}

export function getStoredToken() {
  if (typeof window === 'undefined') return null
  return window.localStorage.getItem(AUTH_TOKEN_KEY)
}

export function clearStoredToken() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(AUTH_TOKEN_KEY)
  window.localStorage.removeItem('bisaexcel_mock_auth')
}

export const authService = {
  async login(input: LoginInput) {
    const response = await apiClient.post<ApiResponse<AuthPayload>>('/auth/login', input)
    storeToken(response.data.data.token)
    return response.data.data
  },
  async register(input: RegisterInput) {
    const response = await apiClient.post<ApiResponse<AuthPayload>>('/auth/register', input)
    storeToken(response.data.data.token)
    return response.data.data
  },
  async me() {
    const response = await apiClient.get<ApiResponse<AuthPayload>>('/auth/me')
    if (response.data.data.token) storeToken(response.data.data.token)
    return response.data.data
  },
  async logout() {
    try {
      await apiClient.post<ApiResponse<{ ok: boolean }>>('/auth/logout')
    } finally {
      clearStoredToken()
    }
  },
}