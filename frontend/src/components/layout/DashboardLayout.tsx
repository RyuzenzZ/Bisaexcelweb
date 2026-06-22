import { BarChart3, BookOpen, Bookmark, FileSpreadsheet, Home, LogOut, Medal, Settings, UserCircle } from 'lucide-react'
import { type ReactNode } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/lib/utils'

type DashboardLayoutProps = {
  children: ReactNode
}

const dashboardNav = [
  { label: 'Dashboard', to: ROUTES.DASHBOARD, icon: Home },
  { label: 'Profile', to: ROUTES.PROFILE, icon: UserCircle },
  { label: 'Kursus Saya', to: ROUTES.MY_COURSES, icon: BookOpen },
  { label: 'Progress', to: ROUTES.PROGRESS, icon: BarChart3 },
  { label: 'Bookmark', to: ROUTES.BOOKMARKS, icon: Bookmark },
  { label: 'Sertifikat', to: '/dashboard/sertifikat', icon: Medal },
  { label: 'Pengaturan', to: ROUTES.SETTINGS, icon: Settings },
] as const

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, progress, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate(ROUTES.HOME)
  }

  return (
    <main className="min-h-screen bg-[#080E0A] text-[#E8F0EA] lg:grid lg:grid-cols-[256px_1fr]">
      <aside className="border-b border-[#1E3022] bg-[#0D1610] lg:min-h-screen lg:border-b-0 lg:border-r">
        <div className="flex h-16 items-center justify-between border-b border-[#1E3022] px-4 lg:px-6">
          <Link className="flex items-center gap-3" to={ROUTES.DASHBOARD}>
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-green-700/50 bg-green-950/70 text-green-400">
              <FileSpreadsheet className="h-5 w-5" />
            </span>
            <span className="font-heading text-base font-bold">BisaExcel</span>
          </Link>
        </div>
        <nav className="flex gap-2 overflow-x-auto px-3 py-3 lg:block lg:space-y-1 lg:overflow-visible lg:py-4">
          {dashboardNav.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                className={({ isActive }) =>
                  cn(
                    'flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors',
                    isActive ? 'border border-green-600/20 bg-green-600/15 text-green-400' : 'text-[#8BA98F] hover:bg-[#1C2E20] hover:text-[#E8F0EA]',
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
        <div className="hidden border-t border-[#1E3022] p-4 lg:block">
          <div className="rounded-xl border border-[#1E3022] bg-[#111E14] p-4">
            <div className="flex items-center justify-between text-xs text-[#8BA98F]">
              <span>{progress ? `Level ${progress.level}` : 'Belum ada progress'}</span>
              <span className="font-mono text-amber-400">{progress ? `${Math.min(100, progress.testsCompleted * 10)}% Progress` : '0%'}</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#1E3022]">
              <div className="h-full rounded-full bg-gradient-to-r from-green-600 to-green-400" style={{ width: `${progress ? Math.min(100, progress.testsCompleted * 10) : 0}%` }} />
            </div>
          </div>
        </div>
      </aside>

      <section className="min-w-0">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#1E3022] bg-[#080E0A]/88 px-4 backdrop-blur-md sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-400">Student Area</p>
            <h1 className="font-heading text-lg font-bold">{user ? `Halo, ${user.name}` : 'Dashboard Belajar'}</h1>
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-[#8BA98F] hover:bg-[#1C2E20] hover:text-[#E8F0EA]" onClick={handleLogout} type="button">
            <LogOut className="h-4 w-4" />
            Keluar
          </button>
        </header>
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </section>
    </main>
  )
}