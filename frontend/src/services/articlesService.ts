import { articles, type Article, type ArticleLevel } from '@/data/articles'
import { apiClient, type ApiResponse, withFallbackResult, withLocalFallback } from './apiClient'

type ArticleApi = {
  slug: string
  title: string
  category: string
  level: ArticleLevel | string
  excerpt?: string
  summary?: string
  content?: string
  isPublished?: boolean
}

function toArticle(item: ArticleApi): Article {
  const fallback = articles.find((article) => article.slug === item.slug)
  return {
    id: fallback?.id ?? item.slug,
    slug: item.slug,
    title: item.title || fallback?.title || 'Materi Excel',
    category: item.category || fallback?.category || 'Dasar Excel',
    level: isArticleLevel(item.level) ? item.level : fallback?.level ?? 'Pemula',
    estimatedReadTime: fallback?.estimatedReadTime ?? '8 menit',
    excerpt: item.excerpt ?? item.summary ?? fallback?.excerpt ?? item.content ?? '',
    orderIndex: fallback?.orderIndex ?? 999,
    intro: fallback?.intro ?? [item.content ?? 'Materi ini sedang disiapkan agar lebih mudah dipahami.'],
    learningGoals: fallback?.learningGoals ?? ['Memahami konsep utama materi ini', 'Melihat contoh penerapannya dalam pekerjaan', 'Menentukan langkah praktik berikutnya'],
    sections: fallback?.sections ?? [{ title: 'Penjelasan sederhana', body: item.content ? [item.content] : ['Konten materi sedang disiapkan.'] }],
    caseStudy: fallback?.caseStudy,
    commonMistakes: fallback?.commonMistakes ?? ['Membaca materi terlalu cepat tanpa mencoba contoh kecil.'],
    reflectionPrompt: fallback?.reflectionPrompt,
    summary: fallback?.summary ?? ['Pahami konsepnya pelan-pelan.', 'Coba praktikkan dengan data sederhana.'],
    isPublished: item.isPublished ?? fallback?.isPublished ?? true,
  }
}

function isArticleLevel(value: string): value is ArticleLevel {
  return value === 'Pemula' || value === 'Dasar' || value === 'Menengah' || value === 'Advanced' || value === 'Professional'
}

const sortArticles = (items: Article[]) => [...items].filter((item) => item.isPublished).sort((a, b) => a.orderIndex - b.orderIndex)
const fetchAll = () => apiClient.get<ApiResponse<ArticleApi[]>>('/articles').then((response) => sortArticles(response.data.data.map(toArticle)))
const fetchBySlug = (slug: string) => apiClient.get<ApiResponse<ArticleApi>>(`/articles/${slug}`).then((response) => toArticle(response.data.data))

export const articlesService = {
  getAll: () => withLocalFallback(fetchAll(), sortArticles(articles)),
  getAllResult: () => withFallbackResult(fetchAll(), sortArticles(articles)),
  getBySlug: (slug: string) => withLocalFallback(fetchBySlug(slug), articles.find((item) => item.slug === slug) ?? articles[0]),
  getBySlugResult: (slug: string) => withFallbackResult(fetchBySlug(slug), articles.find((item) => item.slug === slug) ?? articles[0]),
}