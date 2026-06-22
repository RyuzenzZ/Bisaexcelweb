import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { PageMeta } from '@/components/shared/PageMeta'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'

type AuthFormPageProps = {
  title: string
  description: string
  children: ReactNode
  footer: ReactNode
  notice?: string
}

export function AuthFormPage({ title, description, children, footer, notice = 'Mode akun masih simulasi frontend. Kamu bisa masuk untuk mencoba dashboard, progress, level, ranking, certificate, dan portfolio tanpa membuat akun production.' }: AuthFormPageProps) {
  return (
    <AuthLayout>
      <PageMeta title={title} />
      <h1 className="font-heading text-2xl font-bold text-[#E8F0EA]">{title}</h1>
      <p className="mt-2 text-sm leading-6 text-[#8BA98F]">{description}</p>
      <div className="mt-4 rounded-lg border border-amber-800/40 bg-amber-950/30 px-3 py-2 text-xs leading-5 text-amber-300">{notice}</div>
      <form className="mt-6 space-y-4">
        {children}
      </form>
      <div className="mt-6 text-center text-sm text-[#8BA98F]">{footer}</div>
    </AuthLayout>
  )
}

export function AuthInput({ label, type = 'text', placeholder }: { label: string; type?: string; placeholder: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#8BA98F]">{label}</span>
      <input className="w-full rounded-lg border border-[#1E3022] bg-[#0F1A12] px-4 py-2.5 text-sm font-medium text-[#E8F0EA] outline-none placeholder:text-[#4D6650] focus:border-green-600 focus:ring-1 focus:ring-green-600/30" placeholder={placeholder} type={type} />
    </label>
  )
}

export function AuthLink({ to, children }: { to: string; children: ReactNode }) {
  return <Link className="font-semibold text-green-400 hover:text-green-300" to={to}>{children}</Link>
}

export { Button, ROUTES }