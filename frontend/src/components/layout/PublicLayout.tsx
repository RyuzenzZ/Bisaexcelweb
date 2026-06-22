import { ArrowRight, ChevronDown, FileSpreadsheet, Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import { publicNavigation } from '@/data/navigation'
import { cn } from '@/lib/utils'

type PublicLayoutProps = {
  children: ReactNode
}

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#1E3022] bg-[#080E0A]/88 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <BrandLogo />

        <nav className="hidden min-w-0 items-center gap-1 lg:flex">
          {publicNavigation.map((item) =>
            'children' in item ? <DesktopDropdown item={item} key={item.to} /> : <DesktopNavItem item={item} key={item.to} />,
          )}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <Button asChild variant="ghost">
            <Link to={ROUTES.LOGIN}>Masuk</Link>
          </Button>
          <Button asChild>
            <Link to={ROUTES.REGISTER}>
              Mulai Belajar
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <Button
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
          className="h-10 w-10 border border-[#254A2A] bg-[#111E14] p-0 text-green-400 hover:bg-[#1C2E20] lg:hidden"
          onClick={() => setIsMobileMenuOpen((current) => !current)}
          type="button"
          variant="ghost"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      <AnimatePresence>{isMobileMenuOpen ? <MobileMenuPanel /> : null}</AnimatePresence>
    </header>
  )
}

function BrandLogo() {
  return (
    <Link className="flex min-w-0 items-center gap-2.5 sm:gap-3" to={ROUTES.HOME} aria-label="BisaExcel.com">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-green-700/50 bg-green-950/70 text-green-400 shadow-glow-green">
        <FileSpreadsheet className="h-5 w-5" />
      </span>
      <span className="truncate font-heading text-sm font-bold text-[#E8F0EA] sm:text-lg">BisaExcel.com</span>
    </Link>
  )
}

type PublicNavItem = (typeof publicNavigation)[number]

function DesktopNavItem({ item }: { item: Extract<PublicNavItem, { label: string; to: string }> }) {
  return (
    <NavLink
      className={({ isActive }) =>
        cn(
          'rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-[#1C2E20] hover:text-[#E8F0EA]',
          isActive ? 'bg-green-600/15 text-green-400' : 'text-[#8BA98F]',
        )
      }
      to={item.to}
    >
      {item.label}
    </NavLink>
  )
}

function DesktopDropdown({ item }: { item: Extract<PublicNavItem, { children: readonly unknown[] }> }) {
  const location = useLocation()
  const isActive = location.pathname === item.to || item.children.some((child) => location.pathname === child.to.split('?')[0])

  return (
    <div className="group relative">
      <NavLink
        className={cn(
          'inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-[#1C2E20] hover:text-[#E8F0EA]',
          isActive ? 'bg-green-600/15 text-green-400' : 'text-[#8BA98F]',
        )}
        to={item.to}
      >
        {item.label}
        <ChevronDown className="h-3.5 w-3.5" />
      </NavLink>
      <div className="pointer-events-none absolute left-0 top-full w-56 pt-2 opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100">
        <div className="rounded-xl border border-[#1E3022] bg-[#111E14] p-2 shadow-[0_16px_48px_rgba(0,0,0,.55)]">
          {item.children.map((child) => (
            <Link
              className="block rounded-lg px-3 py-2 text-sm font-medium text-[#8BA98F] transition-colors hover:bg-[#1C2E20] hover:text-[#E8F0EA]"
              key={child.to}
              to={child.to}
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

function MobileMenuPanel() {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="border-t border-[#1E3022] bg-[#0D1610]/96 shadow-[0_16px_40px_rgba(0,0,0,.55)] backdrop-blur-md lg:hidden"
      exit={{ opacity: 0, y: -10 }}
      initial={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <nav aria-label="Menu utama" className="mx-auto grid max-w-7xl gap-2 px-4 py-3 sm:px-6">
        {publicNavigation.map((item) => (
          <div key={item.to} className="rounded-xl border border-[#1E3022] bg-[#111E14] p-2">
            <NavLink
              className={({ isActive }) =>
                cn(
                  'flex h-10 items-center rounded-lg px-3 text-sm font-semibold transition-colors',
                  isActive ? 'bg-green-600/15 text-green-400' : 'text-[#E8F0EA] hover:bg-[#1C2E20]',
                )
              }
              to={item.to}
            >
              {item.label}
            </NavLink>
            {'children' in item ? (
              <div className="mt-1 grid gap-1 pl-3">
                {item.children.map((child) => (
                  <Link className="rounded-lg px-3 py-2 text-sm text-[#8BA98F] hover:bg-[#1C2E20] hover:text-[#E8F0EA]" key={child.to} to={child.to}>
                    {child.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </nav>
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2 border-t border-[#1E3022] px-4 py-3 sm:px-6">
        <Button asChild variant="outline">
          <Link to={ROUTES.LOGIN}>Masuk</Link>
        </Button>
        <Button asChild>
          <Link to={ROUTES.REGISTER}>Mulai Belajar</Link>
        </Button>
      </div>
    </motion.div>
  )
}

function SiteFooter() {
  const footerGroups = [
    {
      title: 'Belajar',
      links: [
        { label: 'Artikel Excel', to: ROUTES.LEARN },
        { label: 'Video', to: ROUTES.VIDEO },
        { label: 'Test Excel', to: ROUTES.TEST_EXCEL },
      ],
    },
    {
      title: 'Praktik',
      links: [
        { label: 'Challenge', to: ROUTES.CHALLENGE },
        { label: 'Profile Demo', to: ROUTES.PROFILE_PUBLIC('demo-user') },
        { label: 'Portfolio Demo', to: ROUTES.PROFILE_PORTFOLIO('demo-user') },
      ],
    },
    {
      title: 'Referensi',
      links: [
        { label: 'Excel Tips', to: ROUTES.EXCEL_TIPS },
        { label: 'Rumus Bisnis', to: `${ROUTES.EXCEL_TIPS}?category=rumus-bisnis` },
        { label: 'Template Excel', to: ROUTES.TEMPLATES },
      ],
    },
    {
      title: 'Layanan',
      links: [
        { label: 'Kelas', to: ROUTES.CLASSES },
        { label: 'Inhouse Training', to: ROUTES.INHOUSE },
        { label: 'Kontak', to: ROUTES.CONTACT },
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
            <span className="font-heading text-base font-bold text-[#E8F0EA]">BisaExcel.com</span>
          </div>
          <p className="mt-4 max-w-xs leading-6">
            Platform belajar Excel dari nol melalui tulisan, video YouTube bersilabus, Test Excel, Challenge, Excel Tips, Template, kelas, dan profile skill.
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



