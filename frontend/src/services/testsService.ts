import { digitalProducts, tests, unavailableAutoCheck, type CheckAnswerResult, type DigitalProduct, type ExcelTest } from '@/data/tests'
import { apiClient, type ApiResponse, withFallbackResult, withLocalFallback } from './apiClient'

type TestApi = {
  slug: string
  title: string
  description: string
  question: string
  level: ExcelTest['level'] | string
  category: string
  autoCheckType: ExcelTest['autoCheckType'] | string
  estimatedTime: string
  formulaSkills: string[]
}

type ProductApi = {
  slug: string
  type: DigitalProduct['type'] | string
  title: string
  description: string
  price: number
  accessType: DigitalProduct['accessType'] | string
  isActive: boolean
}

type ExplanationPreview = {
  isLocked: boolean
  preview: string
  solutionFileAvailable: boolean
}

function toTest(item: TestApi): ExcelTest {
  const fallback = tests.find((test) => test.slug === item.slug)
  return {
    slug: item.slug,
    title: item.title,
    description: item.description,
    question: item.question,
    level: isTestLevel(item.level) ? item.level : fallback?.level ?? 'Pemula',
    category: item.category,
    autoCheckType: item.autoCheckType === 'exact_text' || item.autoCheckType === 'normalized_text' ? item.autoCheckType : 'normalized_text',
    estimatedTime: item.estimatedTime,
    formulaSkills: item.formulaSkills,
    answerProductSlug: fallback?.answerProductSlug ?? `jawaban-${item.slug}`,
    tutorialProductSlug: fallback?.tutorialProductSlug ?? `tutorial-${item.slug}`,
  }
}

function toProduct(item: ProductApi, slug: string): DigitalProduct {
  return {
    slug: item.slug,
    relatedTestSlug: slug,
    type: item.type === 'answer_tutorial' || item.type === 'template' ? item.type : 'answer',
    title: item.title,
    description: item.description,
    price: item.price,
    accessType: item.accessType === 'free' ? 'free' : 'paid',
    isActive: item.isActive,
  }
}

function isTestLevel(value: string): value is ExcelTest['level'] {
  return value === 'Pemula' || value === 'Menengah' || value === 'Lanjutan'
}

function fallbackCheck(slug: string): CheckAnswerResult {
  const test = tests.find((item) => item.slug === slug) ?? tests[0]
  return unavailableAutoCheck(test)
}

// Legacy/support endpoint: dipakai untuk test lama, produk jawaban, dan explanation preview.
// Halaman utama /test-excel memakai playCasesService sebagai sumber utama.
const fetchAll = () => apiClient.get<ApiResponse<TestApi[]>>('/tests').then((response) => response.data.data.map(toTest))
const fetchBySlug = (slug: string) => apiClient.get<ApiResponse<TestApi>>(`/tests/${slug}`).then((response) => toTest(response.data.data))
const fetchProducts = (slug: string) => apiClient.get<ApiResponse<ProductApi[]>>(`/tests/${slug}/products`).then((response) => response.data.data.map((item) => toProduct(item, slug)))
const fetchExplanation = (slug: string) => apiClient.get<ApiResponse<ExplanationPreview>>(`/tests/${slug}/explanation-preview`).then((response) => response.data.data)

export const testsService = {
  getAll: () => withLocalFallback(fetchAll(), tests),
  getAllResult: () => withFallbackResult(fetchAll(), tests),
  getBySlug: (slug: string) => withLocalFallback(fetchBySlug(slug), tests.find((item) => item.slug === slug) ?? tests[0]),
  getBySlugResult: (slug: string) => withFallbackResult(fetchBySlug(slug), tests.find((item) => item.slug === slug) ?? tests[0]),
  checkAnswer: (slug: string, answer: string) => withLocalFallback(
    apiClient.post<ApiResponse<CheckAnswerResult>>(`/tests/${slug}/check`, { answer }).then((response) => response.data.data),
    fallbackCheck(slug),
  ),
  checkAnswerResult: (slug: string, answer: string) => withFallbackResult(
    apiClient.post<ApiResponse<CheckAnswerResult>>(`/tests/${slug}/check`, { answer }).then((response) => response.data.data),
    fallbackCheck(slug),
  ),
  getProducts: (slug: string) => withLocalFallback(fetchProducts(slug), digitalProducts.filter((item) => item.relatedTestSlug === slug)),
  getProductsResult: (slug: string) => withFallbackResult(fetchProducts(slug), digitalProducts.filter((item) => item.relatedTestSlug === slug)),
  getExplanationPreview: (slug: string) => withFallbackResult(fetchExplanation(slug), {
    isLocked: true,
    preview: 'Jawaban dan tutorial lengkap terkunci sebagai produk digital.',
    solutionFileAvailable: false,
  }),
}
