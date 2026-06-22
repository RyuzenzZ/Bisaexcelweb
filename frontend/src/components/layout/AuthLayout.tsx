import { ArrowLeft, FileSpreadsheet } from 'lucide-react'
import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

type AuthLayoutProps = {
  children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-[#080E0A] px-4 py-8 text-[#E8F0EA]">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl flex-col">
        <div className="flex items-center justify-between">
          <Link className="flex items-center gap-3" to={ROUTES.HOME}>
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-green-700/50 bg-green-950/70 text-green-400 shadow-glow-green">
              <FileSpreadsheet className="h-5 w-5" />
            </span>
            <span className="font-heading text-lg font-bold">BisaExcel.com</span>
          </Link>
          <Link className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-[#8BA98F] hover:bg-[#1C2E20] hover:text-[#E8F0EA]" to={ROUTES.HOME}>
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </Link>
        </div>

        <div className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1fr_440px]">
          <section className="hidden lg:block">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-green-400">Kuasai Excel, Kuasai Karirmu</p>
            <h1 className="mt-4 max-w-2xl font-display text-5xl font-bold leading-tight text-[#E8F0EA]">
              Akun belajar untuk kursus, challenge, dan referensi rumus Excel.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#8BA98F]">
              Sistem akun sedang disiapkan. Untuk MVP ini, kamu bisa mencoba alur login simulasi agar dashboard, progress, level, ranking, certificate, dan portfolio sudah terasa dari sekarang.
            </p>
          </section>

          <section className="rounded-2xl border border-[#254A2A] bg-[#111E14] p-6 shadow-[0_24px_64px_rgba(0,0,0,.45)] sm:p-8">
            {children}
          </section>
        </div>
      </div>
    </main>
  )
}
