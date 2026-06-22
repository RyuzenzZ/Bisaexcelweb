import { ArrowLeft, ArrowRight, Clock, Filter, ListVideo, PlayCircle, Search } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { EmptyState } from '@/components/shared/EmptyState'
import { ErrorState } from '@/components/shared/ErrorState'
import { LoadingState } from '@/components/shared/LoadingState'
import { PageMeta } from '@/components/shared/PageMeta'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import { formatTotalDuration, videoCategories, videoLevels, videoModules, videoProgramLabel, videoProgramName, videos as fallbackVideos, youtubeChannelName, youtubePlaylistEmbedUrl, youtubePlaylistUrl, type VideoLessonLevel } from '@/data/videos'
import { useAsyncData } from '@/hooks/useAsyncData'
import { videosService } from '@/services/videosService'

const allFilter = 'Semua'
type LevelFilter = typeof allFilter | VideoLessonLevel

export function VideoPage() {
  const [query, setQuery] = useState('')
  const [level, setLevel] = useState<LevelFilter>(allFilter)
  const [category, setCategory] = useState(allFilter)
  const [module, setModule] = useState(allFilter)
  const loadVideos = useCallback(() => videosService.getAllResult(), [])
  const { data, isLoading, isFallback, error, reload } = useAsyncData(loadVideos)
  const videos = useMemo(() => [...(data ?? [])].sort((a, b) => a.orderIndex - b.orderIndex), [data])
  const stats = useMemo(() => {
    const totalSeconds = videos.reduce((sum, video) => sum + video.durationSeconds, 0)
    return {
      totalVideos: videos.length,
      totalDuration: formatTotalDuration(totalSeconds),
      totalModules: new Set(videos.map((video) => video.module)).size,
      totalCategories: new Set(videos.map((video) => video.category)).size,
    }
  }, [videos])

  const filteredVideos = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return videos.filter((video) => {
      const matchesQuery = !normalizedQuery || `${video.title} ${video.module} ${video.category} ${video.level}`.toLowerCase().includes(normalizedQuery)
      const matchesLevel = level === allFilter || video.level === level
      const matchesCategory = category === allFilter || video.category === category
      const matchesModule = module === allFilter || video.module === module
      return matchesQuery && matchesLevel && matchesCategory && matchesModule
    })
  }, [category, level, module, query, videos])

  return (
    <PublicLayout>
      <PageMeta title="Video Pembelajaran Excel dari Nol" />
      <section className="hero-grid pt-28 sm:pt-32">
        <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <span className="inline-flex rounded-full border border-green-700/50 bg-green-950/60 px-3 py-1 text-xs font-bold text-green-300">{videoProgramLabel}</span>
              <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-[#E8F0EA] sm:text-6xl">Video Pembelajaran Excel dari Nol</h1>
              <p className="mt-5 text-base leading-8 text-[#8BA98F] sm:text-lg">Ikuti ecourse Excel gratis dari channel {youtubeChannelName}. Materi disusun bertahap mulai dari pengenalan Excel, rumus dasar, logika, lookup, tanggal, sampai studi kasus kerja.</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {['Ecourse Gratis', `${fallbackVideos.length} Video`, 'Embed YouTube', 'Belajar Berurutan'].map((badge) => <span className="rounded-full border border-[#254A2A] bg-[#111E14] px-3 py-1.5 text-xs font-bold text-green-300" key={badge}>{badge}</span>)}
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg"><Link to={ROUTES.VIDEO_DETAIL(fallbackVideos[0].slug)}>Mulai dari Modul 1<ArrowRight className="h-4 w-4" /></Link></Button>
                <Button asChild size="lg" variant="outline"><a href="#daftar-video">Lihat Semua Video</a></Button>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-[#254A2A] bg-[#111E14] p-3 shadow-card">
              <iframe allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen className="aspect-video w-full rounded-xl bg-black" loading="lazy" src={youtubePlaylistEmbedUrl} title="Playlist Belajar Excel dari Nol - E Course Bisa Excel" />
              <div className="flex flex-col gap-2 px-2 pb-1 pt-3 text-sm text-[#8BA98F] sm:flex-row sm:items-center sm:justify-between">
                <span>{videoProgramName}</span>
                <a className="font-semibold text-green-400 hover:text-green-300" href={youtubePlaylistUrl} target="_blank" rel="noreferrer">Buka playlist YouTube</a>
              </div>
            </div>
          </div>

          {isFallback ? <div className="mt-8"><ErrorState title="Data video memakai silabus lokal" message={`Backend belum merespons tepat waktu. Daftar video tetap ditampilkan dari data resmi lokal. ${error ?? ''}`} onRetry={reload} /></div> : null}

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Total video" value={String(stats.totalVideos || fallbackVideos.length)} />
            <StatCard label="Total durasi" value={stats.totalDuration} />
            <StatCard label="Jumlah modul" value={String(stats.totalModules)} />
            <StatCard label="Jumlah kategori" value={String(stats.totalCategories)} />
          </div>

          <section className="mt-12 rounded-2xl border border-[#254A2A] bg-[#111E14] p-4 shadow-card" id="daftar-video">
            <div className="flex items-center gap-2 text-green-400"><Filter className="h-5 w-5" /><h2 className="font-heading text-xl font-bold text-[#E8F0EA]">Cari dan filter silabus</h2></div>
            <div className="mt-5 grid gap-3 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#4D6650]" />
                <input className="h-12 w-full rounded-xl border border-[#1E3022] bg-[#0F1A12] pl-12 pr-4 text-sm font-medium text-[#E8F0EA] outline-none placeholder:text-[#4D6650] focus:border-green-600" onChange={(event) => setQuery(event.target.value)} placeholder="Cari lookup, SUM, tanggal, modul..." value={query} />
              </div>
              <SelectFilter label="Level" value={level} values={videoLevels} onChange={(value) => setLevel(value as LevelFilter)} />
              <SelectFilter label="Kategori" value={category} values={[allFilter, ...videoCategories]} onChange={setCategory} />
              <SelectFilter label="Modul" value={module} values={[allFilter, ...videoModules]} onChange={setModule} />
            </div>
          </section>

          {isLoading ? <div className="mt-10"><LoadingState label="Memuat daftar video..." /></div> : null}
          {!isLoading && !filteredVideos.length ? <div className="mt-10"><EmptyState title="Video tidak ditemukan." message="Coba gunakan kata kunci atau kategori lain." icon={PlayCircle} /></div> : null}
          {!isLoading && filteredVideos.length ? (
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredVideos.map((video) => (
                <article className="overflow-hidden rounded-2xl border border-[#1E3022] bg-[#111E14] shadow-card transition-all hover:-translate-y-1 hover:border-[#254A2A] hover:bg-[#162419]" key={video.slug}>
                  <Link to={ROUTES.VIDEO_DETAIL(video.slug)}>
                    <img alt={video.title} className="aspect-video w-full bg-[#080E0A] object-cover" loading="lazy" src={video.thumbnailUrl} />
                  </Link>
                  <div className="p-5">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#8BA98F]"><span className="rounded-full border border-[#254A2A] px-2.5 py-1 text-green-300">{video.module}</span><span>{video.duration}</span><span>{video.level}</span></div>
                    <h3 className="mt-3 font-heading text-lg font-bold leading-snug text-[#E8F0EA]">{video.title}</h3>
                    <p className="mt-2 text-sm text-[#8BA98F]">{video.category}</p>
                    <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                      <Button asChild className="flex-1"><Link to={ROUTES.VIDEO_DETAIL(video.slug)}><PlayCircle className="h-4 w-4" />Tonton Video</Link></Button>
                      <Button asChild className="flex-1" variant="outline"><Link to={ROUTES.VIDEO_DETAIL(video.slug)}>Detail</Link></Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </PublicLayout>
  )
}

export function VideoDetailPage() {
  const { slug = '' } = useParams()
  const loadVideo = useCallback(() => videosService.getBySlugResult(slug), [slug])
  const loadVideos = useCallback(() => videosService.getAllResult(), [])
  const { data: video, isLoading, isFallback, error, reload } = useAsyncData(loadVideo, [slug])
  const { data: allVideos } = useAsyncData(loadVideos)
  const syllabus = useMemo(() => [...(allVideos ?? fallbackVideos)].sort((a, b) => a.orderIndex - b.orderIndex), [allVideos])
  const currentIndex = syllabus.findIndex((item) => item.slug === slug)
  const previousVideo = currentIndex > 0 ? syllabus[currentIndex - 1] : undefined
  const nextVideo = currentIndex >= 0 && currentIndex < syllabus.length - 1 ? syllabus[currentIndex + 1] : undefined

  return (
    <PublicLayout>
      <PageMeta title={video?.title ?? 'Video Pembelajaran'} />
      <section className="hero-grid pt-28 sm:pt-32">
        <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
          <Button asChild variant="ghost"><Link to={ROUTES.VIDEO}><ArrowLeft className="h-4 w-4" />Kembali ke Video</Link></Button>
          {isFallback ? <div className="mt-6"><ErrorState title="Detail video memakai silabus lokal" message={`Backend belum merespons tepat waktu. Detail video tetap ditampilkan dari data resmi lokal. ${error ?? ''}`} onRetry={reload} /></div> : null}
          {isLoading ? <div className="mt-6"><LoadingState label="Memuat detail video..." /></div> : null}
          {!isLoading && !video ? <div className="mt-6"><EmptyState message="Video tidak ditemukan." icon={PlayCircle} /></div> : null}
          {!isLoading && video ? (
            <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
              <main>
                <div className="overflow-hidden rounded-2xl border border-[#254A2A] bg-[#111E14] p-4 shadow-card sm:p-6">
                  <iframe allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen className="aspect-video w-full rounded-xl bg-black" loading="lazy" src={`https://www.youtube.com/embed/${video.videoId}`} title={video.title} />
                  <div className="mt-6">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#8BA98F]"><span className="rounded-full border border-green-700/50 bg-green-950/60 px-3 py-1 text-green-300">{video.module}</span><span>{video.duration}</span><span>{video.level}</span><span>{video.category}</span><span>Urutan {video.orderIndex}</span></div>
                    <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-[#E8F0EA] sm:text-4xl">{video.title}</h1>
                    <p className="mt-4 text-sm leading-7 text-[#8BA98F]">{video.description}</p>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {previousVideo ? <Button asChild variant="outline"><Link to={ROUTES.VIDEO_DETAIL(previousVideo.slug)}><ArrowLeft className="h-4 w-4" />Video Sebelumnya</Link></Button> : <Button disabled variant="outline"><ArrowLeft className="h-4 w-4" />Video Sebelumnya</Button>}
                  {nextVideo ? <Button asChild><Link to={ROUTES.VIDEO_DETAIL(nextVideo.slug)}>Video Berikutnya<ArrowRight className="h-4 w-4" /></Link></Button> : <Button asChild><Link to={ROUTES.TEST_EXCEL}>Lanjut ke Test Excel<ArrowRight className="h-4 w-4" /></Link></Button>}
                </div>

                <div className="mt-6 rounded-2xl border border-[#254A2A] bg-[#111E14] p-6 shadow-card">
                  <h2 className="font-heading text-2xl font-bold text-[#E8F0EA]">Sudah selesai menonton?</h2>
                  <p className="mt-2 text-sm leading-6 text-[#8BA98F]">Coba Test Excel untuk mengukur pemahamanmu.</p>
                  <Button asChild className="mt-5"><Link to={ROUTES.TEST_EXCEL}>Coba Test Excel<ArrowRight className="h-4 w-4" /></Link></Button>
                </div>
              </main>

              <aside className="rounded-2xl border border-[#254A2A] bg-[#111E14] p-4 shadow-card lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-auto">
                <div className="flex items-center gap-2 text-green-400"><ListVideo className="h-5 w-5" /><h2 className="font-heading text-lg font-bold text-[#E8F0EA]">Sidebar Silabus</h2></div>
                <div className="mt-4 space-y-2">
                  {syllabus.map((item) => {
                    const isActive = item.slug === video.slug
                    return (
                      <Link className={isActive ? 'block rounded-xl border border-green-700/60 bg-green-600/10 p-3' : 'block rounded-xl border border-[#1E3022] bg-[#0D1610] p-3 hover:border-[#254A2A] hover:bg-[#162419]'} key={item.slug} to={ROUTES.VIDEO_DETAIL(item.slug)}>
                        <div className="flex items-center justify-between gap-3 text-xs text-[#8BA98F]"><span>{item.module}</span><span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{item.duration}</span></div>
                        <p className="mt-1 line-clamp-2 text-sm font-semibold text-[#E8F0EA]">{item.title}</p>
                      </Link>
                    )
                  })}
                </div>
              </aside>
            </div>
          ) : null}
        </div>
      </section>
    </PublicLayout>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-[#1E3022] bg-[#111E14] p-5 shadow-card"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-400">{label}</p><p className="mt-2 font-display text-3xl font-bold text-[#E8F0EA]">{value}</p></div>
}

function SelectFilter({ label, value, values, onChange }: { label: string; value: string; values: readonly string[]; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <select className="h-12 w-full rounded-xl border border-[#1E3022] bg-[#0F1A12] px-3 text-sm font-medium text-[#E8F0EA] outline-none focus:border-green-600" onChange={(event) => onChange(event.target.value)} value={value}>
        {values.map((item) => <option key={`${label}-${item}`} value={item}>{label}: {item}</option>)}
      </select>
    </label>
  )
}