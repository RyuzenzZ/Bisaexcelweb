import { PublicLayout } from '@/components/layout/PublicLayout'
import { PageMeta } from '@/components/shared/PageMeta'

export function AboutPage() {
  return (
    <PublicLayout>
      <PageMeta title="Tentang" />
      <section className="hero-grid pt-28 sm:pt-32">
        <div className="mx-auto max-w-4xl px-4 pb-20 sm:px-6">
          <h1 className="font-display text-4xl font-bold text-[#E8F0EA] sm:text-5xl">Tentang BisaExcel.com</h1>
          <p className="mt-5 text-base leading-8 text-[#8BA98F]">BisaExcel.com dibangun sebagai platform LMS Excel berbahasa Indonesia untuk membantu mahasiswa, fresh graduate, karyawan, UMKM, dan perusahaan meningkatkan skill kerja berbasis spreadsheet.</p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {['Kursus terstruktur', 'Latihan interaktif', 'Referensi rumus kerja'].map((item) => <div className="rounded-xl border border-[#1E3022] bg-[#111E14] p-5 font-heading font-bold" key={item}>{item}</div>)}
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}

