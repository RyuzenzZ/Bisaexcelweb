import { getVideoDescription, videos, youtubePlaylistUrl, type VideoLesson, type VideoLessonLevel } from '@/data/videos'
import { apiClient, type ApiResponse, withFallbackResult, withLocalFallback } from './apiClient'

type VideoApi = {
  slug: string
  title: string
  description?: string | null
  youtubeUrl: string
  youtubePlaylistUrl?: string | null
  orderIndex: number
  level: VideoLessonLevel | string
  durationLabel: string
  isExclusive?: boolean
  isPublished?: boolean
}

function toVideo(item: VideoApi): VideoLesson {
  const fallback = videos.find((video) => video.slug === item.slug)
  const merged: VideoLesson = {
    id: fallback?.id,
    module: fallback?.module ?? `Video ${item.orderIndex}`,
    title: item.title || fallback?.title || `Video ${item.orderIndex}`,
    slug: item.slug,
    videoId: fallback?.videoId ?? parseYouTubeVideoId(item.youtubeUrl) ?? '',
    youtubeUrl: item.youtubeUrl || fallback?.youtubeUrl || youtubePlaylistUrl,
    thumbnailUrl: fallback?.thumbnailUrl ?? '',
    duration: item.durationLabel || fallback?.duration || '-',
    durationSeconds: fallback?.durationSeconds ?? 0,
    level: isVideoLevel(item.level) ? item.level : fallback?.level ?? 'Pemula',
    category: fallback?.category ?? item.level ?? 'Video Pembelajaran',
    orderIndex: item.orderIndex,
    description: item.description || fallback?.description,
    isExclusive: item.isExclusive ?? fallback?.isExclusive ?? false,
    isPublished: item.isPublished ?? fallback?.isPublished ?? true,
  }

  return { ...merged, description: getVideoDescription(merged) }
}

function parseYouTubeVideoId(url: string): string | undefined {
  const match = url.match(/[?&]v=([^&]+)/)
  return match?.[1]
}

function isVideoLevel(value: string): value is VideoLessonLevel {
  return value === 'Pemula' || value === 'Dasar' || value === 'Menengah' || value === 'Advanced' || value === 'Professional'
}

const fetchAll = () => apiClient.get<ApiResponse<VideoApi[]>>('/videos').then((response) => response.data.data.map(toVideo).sort((a, b) => a.orderIndex - b.orderIndex))
const fetchBySlug = (slug: string) => apiClient.get<ApiResponse<VideoApi>>(`/videos/${slug}`).then((response) => toVideo(response.data.data))

export const videosService = {
  getAll: () => withLocalFallback(fetchAll(), videos),
  getAllResult: () => withFallbackResult(fetchAll(), videos),
  getBySlug: (slug: string) => withLocalFallback(fetchBySlug(slug), videos.find((item) => item.slug === slug) ?? videos[0]),
  getBySlugResult: (slug: string) => withFallbackResult(fetchBySlug(slug), videos.find((item) => item.slug === slug) ?? videos[0]),
}