import { Award, CheckCircle2, FileText } from 'lucide-react'
import { useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { LoginPromptCard } from '@/components/shared/AuthAwareCards'
import { ErrorState } from '@/components/shared/ErrorState'
import { LoadingState } from '@/components/shared/LoadingState'
import { PageMeta } from '@/components/shared/PageMeta'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/contexts/AuthContext'
import { useAsyncData } from '@/hooks/useAsyncData'
import { certificatesService } from '@/services/certificatesService'

export function CertificatePage() {
  const { isAuthenticated, progress } = useAuth()
  const loadCertificates = useCallback(() => certificatesService.getPreviewResult(), [])
  const { data: certificates, isFallback, error } = useAsyncData(loadCertificates)

  return (
    <PublicLayout>
      <PageMeta title="Certificate" />
      <section className="hero-grid pt-28 sm:pt-32"><div className="mx-auto max-w-5xl px-4 pb-20 sm:px-6"><div className="max-w-3xl"><span className="inline-flex rounded-full border border-green-700/50 bg-green-950/60 px-3 py-1 text-xs font-bold text-green-300">Certificate</span><h1 className="mt-5 font-display text-4xl font-bold text-[#E8F0EA] sm:text-5xl">Certificate dari hasil Test Excel kamu</h1><p className="mt-4 text-base leading-8 text-[#8BA98F]">Certificate ini bukan cuma tampilan keren. Bagian bukti kompetensi akan membaca rumus dan skill yang tersimpan di backend.</p></div>{isFallback ? <div className="mt-8"><ErrorState message={error ?? 'Daftar certificate memakai fallback lokal; detail certificate tetap mencoba endpoint backend.'} /></div> : null}<div className="mt-8"><EligibilityInfo progress={progress} /></div>{!isAuthenticated ? <p className="mt-6 text-sm text-[#8BA98F]">Di bawah ini contoh certificate demo. Certificate pribadi kamu baru aktif setelah login dan hasil test tersimpan.</p> : null}<div className="mt-8 grid gap-5">{(certificates ?? []).map((certificate) => <Link className="rounded-2xl border border-[#1E3022] bg-[#111E14] p-6 hover:border-[#254A2A]" key={certificate.id} to={ROUTES.CERTIFICATE_DETAIL(certificate.certificateCode)}><Award className="h-8 w-8 text-amber-400" /><h2 className="mt-4 font-heading text-xl font-bold">{certificate.testTitle}</h2><p className="mt-2 text-sm text-[#8BA98F]">{certificate.userName} - Skor {certificate.score} - {certificate.level}</p></Link>)}</div></div></section>
    </PublicLayout>
  )
}

export function CertificateDetailPage() {
  const { isAuthenticated } = useAuth()
  const { id = 'BE-CERT-0001' } = useParams()
  const loadCertificate = useCallback(() => certificatesService.getByCodeResult(id), [id])
  const { data: certificate, isLoading, isFallback, error, reload } = useAsyncData(loadCertificate, [id])

  return (
    <PublicLayout>
      <PageMeta title={certificate?.certificateCode ?? 'Certificate'} />
      <section className="hero-grid pt-28 sm:pt-32"><div className="mx-auto max-w-5xl space-y-6 px-4 pb-20 sm:px-6">
        {!isAuthenticated ? <LoginPromptCard title="Masuk dulu untuk membuat certificate berdasarkan hasil test kamu." body="Guest bisa melihat contoh certificate, tapi certificate pribadi hanya diterbitkan kalau hasil test tersimpan di akun." /> : null}
        {isFallback ? <ErrorState message={`Backend certificate belum bisa diakses, detail memakai fallback lokal. ${error ?? ''}`} onRetry={reload} /> : null}
        {isLoading ? <LoadingState label="Memuat certificate..." /> : null}
        {!isLoading && certificate ? <><div className="rounded-2xl border border-[#254A2A] bg-[#111E14] p-8 shadow-card"><Award className="h-12 w-12 text-amber-400" /><p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-green-400">Halaman 1 - Certificate Utama</p><h1 className="mt-3 font-display text-4xl font-bold text-[#E8F0EA]">{certificate.userName}</h1><p className="mt-4 text-[#8BA98F]">Menyelesaikan {certificate.testTitle} dengan skor {certificate.score}. Level kemampuan: {certificate.level}.</p><div className="mt-6 grid gap-3 sm:grid-cols-3"><Info label="Tanggal" value={certificate.issuedAt} /><Info label="ID Certificate" value={certificate.certificateCode} /><Info label="Status" value={isAuthenticated ? certificate.verificationStatus : 'Preview guest'} /></div></div><div className="rounded-2xl border border-[#254A2A] bg-[#111E14] p-8 shadow-card"><FileText className="h-10 w-10 text-green-400" /><p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-green-400">Halaman 2 - Skill Evidence</p><h2 className="mt-3 font-heading text-3xl font-bold">Bukti Kompetensi</h2><p className="mt-2 text-sm text-[#8BA98F]">Bukti ini berisi rumus, kategori test, skor, challenge relevan, dan studi kasus yang mendukung certificate.</p><div className="mt-6 grid gap-6 md:grid-cols-2"><SkillList title="Rumus yang dikuasai" items={certificate.formulaMastered} /><SkillList title="Skill terbukti" items={certificate.skills} /></div></div></> : null}
      </div></section>
    </PublicLayout>
  )
}

function EligibilityInfo({ progress }: { progress: { testsCompleted: number; averageScore: number; challengesCompleted: number; formulasMastered: string[]; skills: string[] } | null }) {
  const skillCount = [...(progress?.formulasMastered ?? []), ...(progress?.skills ?? [])].length
  const items = [
    `Test selesai: ${progress?.testsCompleted ?? 0}/3`,
    `Skor rata-rata: ${progress?.averageScore ?? 0}/75`,
    `Challenge selesai: ${progress?.challengesCompleted ?? 0}/1`,
    `Rumus atau skill tercatat: ${skillCount}/5`,
  ]
  return <div className="rounded-2xl border border-[#1E3022] bg-[#111E14] p-6"><Award className="h-8 w-8 text-amber-400" /><h2 className="mt-4 font-heading text-xl font-bold">Certificate Eligibility</h2><p className="mt-2 text-sm leading-6 text-[#8BA98F]">Status ini membaca progress login dari backend kalau kamu sudah masuk.</p><div className="mt-4 space-y-2">{items.map((item) => <p className="flex items-center gap-2 text-sm text-[#8BA98F]" key={item}><CheckCircle2 className="h-4 w-4 text-green-400" />{item}</p>)}</div></div>
}

function Info({ label, value }: { label: string; value: string }) { return <div className="rounded-xl border border-[#1E3022] bg-[#0D1610] p-4"><p className="text-xs text-[#8BA98F]">{label}</p><p className="mt-1 text-sm font-bold text-[#E8F0EA]">{value}</p></div> }
function SkillList({ title, items }: { title: string; items: string[] }) { return <div><h3 className="font-heading text-lg font-bold">{title}</h3><div className="mt-3 space-y-2">{items.map((item) => <p className="flex items-center gap-2 text-sm text-[#8BA98F]" key={item}><CheckCircle2 className="h-4 w-4 text-green-400" />{item}</p>)}</div></div> }
