import { ArrowRight, FileSpreadsheet } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/lib/utils'

type PublicLayoutProps = {
  children: React.ReactNode
}

const navItems = [
  { label: 'Home', to: ROUTES.home },
  { label: 'Video', to: ROUTES.videos },
  { label: 'Kursus', to: ROUTES.courses },
  { label: 'Esports', to: ROUTES.esports },
  { label: 'Karir', to: ROUTES.career },
  { label: 'Ekosistem', to: ROUTES.ecosystem },
  { label: 'Harga', to: ROUTES.pricing },
] as const

export function PublicLayout({ children }: PublicLayoutProps) {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [location.pathname, location.search])

  return (
    <main className="min-h-screen overflow-hidden bg-[#080E0A] text-[#E8F0EA]">
      <SiteHeader />
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 18 }}
        key={location.pathname}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
      <SiteFooter />
    </main>
  )
}

function SiteHeader() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center border-b border-[#1E3022] bg-[#080E0A]/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link className="flex items-center gap-3" to={ROUTES.home} aria-label="BisaExcel.com">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-green-700/50 bg-green-950/70 text-green-400 shadow-glow-green">
            <FileSpreadsheet className="h-5 w-5" />
          </span>
          <span className="font-heading text-base font-bold text-[#E8F0EA] sm:text-lg">
            BisaExcel.com
          </span>
        </Link>

        <div className="flex min-w-0 items-center justify-end gap-2">
          <nav className="hidden min-w-0 items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  cn(
                    'rounded-lg px-2.5 py-2 text-sm font-medium transition-colors hover:bg-[#1C2E20] hover:text-[#E8F0EA] xl:px-3',
                    isActive ? 'bg-green-600/15 text-green-400' : 'text-[#8BA98F]',
                  )
                }
                key={item.to}
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Button asChild className="hidden sm:inline-flex" variant="ghost">
              <Link to={ROUTES.courses}>Masuk</Link>
            </Button>
            <Button asChild>
              <Link to={ROUTES.courses}>
                Daftar
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

function SiteFooter() {
  const footerGroups = [
    {
      title: 'Company',
      links: [
        { label: 'Tentang', to: ROUTES.home },
        { label: 'Kontak', to: ROUTES.home },
        { label: 'Karir', to: ROUTES.career },
      ],
    },
    {
      title: 'Learning',
      links: [
        { label: 'Course', to: ROUTES.courses },
        { label: 'Career Path', to: ROUTES.career },
        { label: 'Esport', to: ROUTES.esports },
        { label: 'Mentorship', to: ROUTES.pricing },
      ],
    },
    {
      title: 'Community',
      links: [
        { label: 'Forum', to: ROUTES.ecosystem },
        { label: 'Request Insight', to: ROUTES.ecosystem },
        { label: 'Leaderboard', to: ROUTES.esports },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'FAQ', to: ROUTES.home },
        { label: 'Bantuan', to: ROUTES.home },
        { label: 'Privacy Policy', to: ROUTES.home },
      ],
    },
  ] as const

  return (
    <footer className="border-t border-[#1E3022] bg-[#080E0A] py-12">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 text-sm text-[#8BA98F] sm:px-6 lg:grid-cols-[1.2fr_repeat(4,1fr)]">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-green-700/50 bg-green-950/70 text-green-400">
              <FileSpreadsheet className="h-5 w-5" />
            </span>
            <span className="font-heading text-base font-bold text-[#E8F0EA]">
              BisaExcel.com
            </span>
          </div>
          <p className="mt-4 max-w-xs leading-6">
            Professional Excel learning ecosystem untuk belajar, latihan, bertanding, dan naik karir.
          </p>
        </div>
        {footerGroups.map((group) => (
          <div key={group.title}>
            <h3 className="font-heading text-sm font-semibold text-[#E8F0EA]">{group.title}</h3>
            <div className="mt-4 space-y-3">
              {group.links.map((item) => (
                <Link className="block hover:text-[#E8F0EA]" key={item.label} to={item.to}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </footer>
  )
}
