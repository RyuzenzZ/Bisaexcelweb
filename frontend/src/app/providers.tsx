import { QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode } from 'react'
import { Toaster } from 'sonner'
import { AuthProvider } from '@/contexts/AuthContext'
import { queryClient } from '@/lib/queryClient'

type AppProvidersProps = {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
      <Toaster
        theme="dark"
        toastOptions={{
          classNames: {
            toast: 'bg-[#111E14] border-[#254A2A] text-[#E8F0EA]',
            success: 'border-green-700/50',
            error: 'border-red-700/50',
          },
        }}
      />
    </QueryClientProvider>
  )
}