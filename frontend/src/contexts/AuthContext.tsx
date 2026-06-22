import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
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

  const refreshMe = useCallback(async () => {
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
  }, [])

  useEffect(() => {
    void refreshMe()
  }, [refreshMe])

  const login = useCallback(async (input: LoginInput) => {
    setPayload(await authService.login(input))
  }, [])

  const register = useCallback(async (input: RegisterInput) => {
    setPayload(await authService.register(input))
  }, [])

  const logout = useCallback(async () => {
    await authService.logout()
    setPayload(null)
  }, [])

  const value = useMemo<AuthContextValue>(() => ({
    user: payload?.user ?? null,
    profile: payload?.profile ?? null,
    progress: payload?.progress ?? null,
    isAuthenticated: Boolean(payload?.user),
    isLoading,
    login,
    register,
    logout,
    refreshMe,
  }), [isLoading, login, logout, payload, refreshMe, register])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const value = useContext(AuthContext)
  if (!value) throw new Error('useAuth must be used inside AuthProvider')
  return value
}