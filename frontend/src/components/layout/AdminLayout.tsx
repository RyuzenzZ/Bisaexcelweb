import { BarChart3, BookOpen, ClipboardList, CreditCard, FileSpreadsheet, Home, Lightbulb, Users } from 'lucide-react'
import { type ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/lib/utils'

type AdminLayoutProps = {
  children: ReactNode
}

const adminNav = [
  { label: 'Overview', to: ROUTES.ADMIN, icon: Home },
  { label: 'Kursus', to: ROUTES.ADMIN_COURSES, icon: BookOpen },
  { label: 'Excel Tips', to: ROUTES.ADMIN_EXCEL_TIPS, icon: Lightbulb },
  { label: 'Quiz', to: ROUTES.ADMIN_QUIZZES, icon: ClipboardList },
  { label: 'Users', to: ROUTES.ADMIN_USERS, icon: Users },
  { label: 'Transaksi', to: ROUTES.ADMIN_PAYMENTS, icon: CreditCard },
  { label: 'Analytics', to: ROUTES.ADMIN_ANALYTICS, icon: BarChart3 },
] as const

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <main className="min-h-screen bg-[#080E0A] text-[#E8F0EA] lg:grid lg:grid-cols-[256px_1fr]">
      <aside className="border-b border-[#1E3022] bg-[#0D1610] lg:min-h-screen lg:border-b-0 lg:border-r">
        <div className="flex h-16 items-center border-b border-[#1E3022] px-4 lg:px-6">
          <Link className="flex items-center gap-3" to={ROUTES.ADMIN}>
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber-700/50 bg-amber-950/50 text-amber-400">
              <FileSpreadsheet className="h-5 w-5" />
            </span>
            <span className="font-heading text-base font-bold">Admin BisaExcel</span>
          </Link>
        </div>
        <nav className="flex gap-2 overflow-x-auto px-3 py-3 lg:block lg:space-y-1 lg:overflow-visible lg:py-4">
          {adminNav.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                className={({ isActive }) =>
                  cn(
                    'flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors',
                    isActive ? 'border border-amber-700/30 bg-amber-500/10 text-amber-300' : 'text-[#8BA98F] hover:bg-[#1C2E20] hover:text-[#E8F0EA]',
                  )
                }
                key={item.to}
                to={item.to}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            )
          })}
        </nav>
      </aside>

      <section className="min-w-0">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#1E3022] bg-[#080E0A]/88 px-4 backdrop-blur-md sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">Admin Console</p>
            <h1 className="font-heading text-lg font-bold">Manajemen Platform</h1>
          </div>
          <Link className="rounded-lg border border-[#254A2A] px-3 py-2 text-sm font-semibold text-[#8BA98F] hover:bg-[#1C2E20] hover:text-[#E8F0EA]" to={ROUTES.HOME}>
            Lihat Website
          </Link>
        </header>
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </section>
    </main>
  )
}
