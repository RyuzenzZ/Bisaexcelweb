import { BarChart3, BookOpen, ClipboardList, CreditCard, FileSpreadsheet, Lightbulb, Users } from 'lucide-react'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { PageMeta } from '@/components/shared/PageMeta'

const stats = [
  { label: 'Peserta terdaftar', value: 'Belum aktif', icon: Users },
  { label: 'Artikel belajar', value: 'Seed MVP', icon: BookOpen },
  { label: 'Tips Excel', value: 'Seed MVP', icon: Lightbulb },
  { label: 'Test Excel', value: 'Seed MVP', icon: ClipboardList },
  { label: 'Template produk', value: 'Seed MVP', icon: FileSpreadsheet },
] as const

export function AdminDashboardPage() {
  return (
    <AdminLayout>
      <PageMeta title="Admin Dashboard" />
      <section className="space-y-6">
        <div className="rounded-2xl border border-[#254A2A] bg-[#111E14] p-6 shadow-card">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-400">Admin Overview</p>
          <h1 className="mt-2 font-heading text-3xl font-bold">Ringkasan konten BisaExcel</h1>
          <p className="mt-2 text-sm leading-6 text-[#8BA98F]">Area admin masih kerangka frontend. CRUD admin, auth, dan role permission akan dibuat setelah fondasi public API stabil.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {stats.map((item) => {
            const Icon = item.icon
            return <div className="rounded-xl border border-[#1E3022] bg-[#111E14] p-5" key={item.label}><Icon className="h-6 w-6 text-amber-400" /><p className="mt-4 text-sm text-[#8BA98F]">{item.label}</p><p className="font-display text-2xl font-bold">{item.value}</p></div>
          })}
        </div>
        <div className="rounded-2xl border border-[#1E3022] bg-[#111E14] p-6">
          <BarChart3 className="h-8 w-8 text-green-400" />
          <h2 className="mt-4 font-heading text-xl font-bold">Prioritas admin berikutnya</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {['CRUD artikel dan tips', 'Kelola test dan template', 'Review request inhouse'].map((item) => <div className="rounded-xl border border-[#1E3022] bg-[#0D1610] p-4 text-sm text-[#8BA98F]" key={item}>{item}</div>)}
          </div>
        </div>
      </section>
    </AdminLayout>
  )
}

function SimpleAdminPage({ title, description, icon: Icon }: { title: string; description: string; icon: typeof BookOpen }) {
  return (
    <AdminLayout>
      <PageMeta title={title} />
      <section className="rounded-2xl border border-[#254A2A] bg-[#111E14] p-6 shadow-card">
        <Icon className="h-8 w-8 text-amber-400" />
        <h1 className="mt-4 font-heading text-3xl font-bold">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#8BA98F]">{description}</p>
        <div className="mt-6 overflow-hidden rounded-xl border border-[#1E3022]">
          {['Draft konten', 'Review admin', 'Siap publish'].map((status, index) => (
            <div className="grid grid-cols-[1fr_auto] border-b border-[#1E3022] bg-[#0D1610] p-4 text-sm last:border-b-0" key={status}>
              <span className="text-[#E8F0EA]">Contoh item #{index + 1}</span>
              <span className="text-[#8BA98F]">{status}</span>
            </div>
          ))}
        </div>
      </section>
    </AdminLayout>
  )
}

export function AdminCoursesPage() { return <SimpleAdminPage title="Admin Materi" description="Kerangka untuk mengelola artikel, video, dan struktur belajar Excel." icon={BookOpen} /> }
export function AdminExcelTipsPage() { return <SimpleAdminPage title="Admin Excel Tips" description="Kerangka untuk mengelola rumus bisnis, LAMBDA, REGEX, dan tips kerja." icon={Lightbulb} /> }
export function AdminQuizPage() { return <SimpleAdminPage title="Admin Test Excel" description="Kerangka untuk bank soal, auto-check, produk jawaban, dan tutorial premium." icon={ClipboardList} /> }
export function AdminUsersPage() { return <SimpleAdminPage title="Admin Users" description="Kerangka untuk daftar peserta, role, dan status akun setelah auth dibuat." icon={Users} /> }
export function AdminPaymentsPage() { return <SimpleAdminPage title="Admin Transaksi" description="Kerangka untuk transaksi produk digital setelah payment dibuat." icon={CreditCard} /> }
export function AdminAnalyticsPage() { return <SimpleAdminPage title="Admin Analytics" description="Kerangka untuk metrik belajar, penggunaan template, dan request kelas." icon={BarChart3} /> }
