import { templates, type ExcelTemplate } from '@/data/templates'
import { apiClient, type ApiResponse, withFallbackResult, withLocalFallback } from './apiClient'

type TemplateApi = {
  slug: string
  title: string
  description: string
  category: string
  targetUser: string
  price: number
  isPaid: boolean
}

function toTemplate(item: TemplateApi): ExcelTemplate {
  return {
    slug: item.slug,
    title: item.title,
    category: item.category,
    suitableFor: item.targetUser,
    benefit: item.description,
    access: item.isPaid ? 'Premium' : 'Gratis',
    price: item.price,
  }
}

const fetchAll = () => apiClient.get<ApiResponse<TemplateApi[]>>('/templates').then((response) => response.data.data.map(toTemplate))
const fetchBySlug = (slug: string) => apiClient.get<ApiResponse<TemplateApi>>(`/templates/${slug}`).then((response) => toTemplate(response.data.data))

export const templatesService = {
  getAll: () => withLocalFallback(fetchAll(), templates),
  getAllResult: () => withFallbackResult(fetchAll(), templates),
  getBySlug: (slug: string) => withLocalFallback(fetchBySlug(slug), templates.find((item) => item.slug === slug) ?? templates[0]),
  getBySlugResult: (slug: string) => withFallbackResult(fetchBySlug(slug), templates.find((item) => item.slug === slug) ?? templates[0]),
}
