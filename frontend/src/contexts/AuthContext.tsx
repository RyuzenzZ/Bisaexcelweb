import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { authService, clearStoredToken, getStoredToken, type AuthPayload, type LoginInput, type RegisterInput } from '@/services/authService'

type AuthContextValue = {
  user: AuthPayload['user'] | null
  profile: AuthPayload['profile'] | null
  progress: AuthPayload['progress'] | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (input: LoginInput) => Promise<void>
  register: (input: RegisterInput) => Promise<void>
  logout: () => Promise<void>
  refreshMe: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [payload, setPayload] = useState<AuthPayload | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  async function refreshMe() {
    if (!getStoredToken()) {
      setPayload(null)
      setIsLoading(false)
      return
    }
    try {
      setPayload(await authService.me())
    } catch {
      clearStoredToken()
      setPayload(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void refreshMe()
  }, [])

  const value = useMemo<AuthContextValue>(() => ({
    user: payload?.user ?? null,
    profile: payload?.profile ?? null,
    progress: payload?.progress ?? null,
    isAuthenticated: Boolean(payload?.user),
    isLoading,
    async login(input) {
      setPayload(await authService.login(input))
    },
    async register(input) {
      setPayload(await authService.register(input))
    },
    async logout() {
      await authService.logout()
      setPayload(null)
    },
    refreshMe,
  }), [isLoading, payload])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const value = useContext(AuthContext)
  if (!value) throw new Error('useAuth must be used inside AuthProvider')
  return value
}