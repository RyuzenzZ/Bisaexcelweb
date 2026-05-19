import { CheckCircle2, Clock3, Download, ExternalLink, FileText } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link, useSearchParams } from 'react-router-dom'
import { FeatureNavigation } from '@/components/layout/FeatureNavigation'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { PageMeta } from '@/components/shared/PageMeta'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/lib/utils'

type PreviewVideo = {
  slug: string
  title: string
  topic: string
  sourceUrl: string
  embedUrl: string
}

const previewVideos: PreviewVideo[] = [
  {
    slug: 'admin-hrd',
    title: 'Study Kasus Excel untuk Admin HRD | 5 Fitur Penting yang Wajib Dikuasai!',
    topic: 'Admin HRD',
    sourceUrl: 'https://youtu.be/6A3VFcgm8Y0?si=TWBIdVNHrUKCMaUd',
    embedUrl: 'https://www.youtube.com/embed/6A3VFcgm8Y0',
  },
  {
    slug: 'vlookup-advanced',
    title: 'VLOOKUP Advanced di Excel | 9 Trik Pro yang Jarang Diketahui!',
    topic: 'Lookup Formula',
    sourceUrl: 'https://youtu.be/PcenuQ8O1ek?si=yXDhWuMPjfWYk4yj',
    embedUrl: 'https://www.youtube.com/embed/PcenuQ8O1ek',
  },
  {
    slug: 'upah-kerja',
    title: 'Menghitung Upah Kerja dengan Excel: Langkah Praktis',
    topic: 'Payroll Excel',
    sourceUrl: 'https://youtu.be/tFf1cLZHwSI?si=jWdmTGmqfVWIfBxy',
    embedUrl: 'https://www.youtube.com/embed/tFf1cLZHwSI',
  },
]

export function VideoLearningPage() {
  const [searchParams] = useSearchParams()
  const selectedSlug = searchParams.get('video')
  const selectedVideo =
    previewVideos.find((video) => video.slug === selectedSlug) ?? previewVideos[0]

  return (
    <PublicLayout>
      <PageMeta title="Video Pembelajaran" />
      <section className="hero-grid pt-28 pb-16 lg:pt-32">
        <FeatureNavigation />
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
          >
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-green-400">
                Video pembelajaran
              </p>
              <h1 className="font-display text-5xl font-bold text-[#E8F0EA] sm:text-6xl">
                Belajar lewat video, latihan, transkrip, dan progress otomatis.
              </h1>
              <p className="mt-5 text-base leading-8 text-[#8BA98F]">
                Tonton preview video Excel yang sudah terhubung langsung ke YouTube. Nantinya area
                ini akan menjadi ruang belajar utama dengan progress otomatis, materi, dan kuis bab.
              </p>
            </div>

            <div className="rounded-2xl border border-[#254A2A] bg-[#111E14] p-3 shadow-[0_24px_80px_rgba(0,0,0,.55)]">
              <div className="aspect-video overflow-hidden rounded-xl border border-[#1E3022] bg-[#000]">
                <iframe
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="h-full w-full"
                  referrerPolicy="strict-origin-when-cross-origin"
                  src={selectedVideo.embedUrl}
                  title={selectedVideo.title}
                />
              </div>
              <div className="p-3">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-green-900/60 bg-green-950/80 px-2.5 py-1 text-xs font-semibold text-green-300">
                    Preview Gratis
                  </span>
                  <span className="rounded-full border border-sky-800/40 bg-sky-950/70 px-2.5 py-1 text-xs font-medium text-sky-400">
                    {selectedVideo.topic}
                  </span>
                </div>
                <p className="font-heading text-xl font-semibold text-[#E8F0EA]">
                  {selectedVideo.title}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#0D1610] py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.25fr]">
          <aside className="rounded-xl border border-[#1E3022] bg-[#111E14] p-5 shadow-card">
            <h2 className="font-heading text-xl font-semibold text-[#E8F0EA]">
              Daftar Video Preview
            </h2>
            <div className="mt-5 space-y-3">
              {previewVideos.map((video, index) => (
                <Link
                  className={cn(
                    'flex items-start gap-3 rounded-lg border p-3 transition-colors',
                    video.slug === selectedVideo.slug
                      ? 'border-green-700/50 bg-green-950/30'
                      : 'border-[#1E3022] bg-[#0D1610] hover:bg-[#1C2E20]',
                  )}
                  key={video.slug}
                  to={`${ROUTES.videos}?video=${video.slug}`}
                >
                  <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-green-950 text-xs font-bold text-green-400">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[#E8F0EA]">{video.title}</p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-[#8BA98F]">
                      <Clock3 className="h-3.5 w-3.5" />
                      {video.topic}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </aside>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              { icon: CheckCircle2, title: 'Auto-resume', body: 'Video lanjut dari detik terakhir.' },
              { icon: FileText, title: 'Transkrip', body: 'Materi bisa dibaca ulang setelah menonton.' },
              { icon: Download, title: 'File latihan', body: 'Download workbook Excel per video.' },
            ].map((item) => (
              <div className="rounded-xl border border-[#1E3022] bg-[#111E14] p-5 shadow-card" key={item.title}>
                <item.icon className="mb-4 h-6 w-6 text-green-400" />
                <h3 className="font-heading text-xl font-semibold text-[#E8F0EA]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#8BA98F]">{item.body}</p>
              </div>
            ))}
            <div className="rounded-xl border border-amber-800/40 bg-[#111E14] p-5 shadow-card md:col-span-3">
              <p className="font-heading text-xl font-semibold text-[#E8F0EA]">
                3 video preview sudah siap ditampilkan.
              </p>
              <p className="mt-2 text-sm leading-6 text-[#8BA98F]">
                Setiap video saat ini memakai embed YouTube. Saat backend Laravel dibuat, link ini
                bisa dipindah ke database agar admin dapat mengelola video dari dashboard.
              </p>
              <Button asChild className="mt-5" variant="outline">
                <a href={selectedVideo.sourceUrl} rel="noreferrer" target="_blank">
                  Buka di YouTube
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
