import { excelTips } from '@/data/excelTips'
import type { ExcelTip, ExcelTipCategory, ExcelTipLevel } from '@/types'
import { apiClient, type ApiResponse, withFallbackResult, withLocalFallback } from './apiClient'

type TipApi = {
  id?: string | number
  slug: string
  title: string
  category: string
  description: string
  formula?: string | null
  pattern?: string | null
  shortcut?: string | null
  exampleInput?: string | null
  exampleOutput?: string | null
  useCase: string
  explanation?: string | null
  commonMistakes?: string[] | null
  extraTips?: string[] | null
  level: string
  tags: string[]
  isPublished?: boolean
}

function toTip(item: TipApi): ExcelTip {
  const fallback = excelTips.find((tip) => tip.slug === item.slug)
  const category = normalizeCategory(item.category, item.tags ?? [], item.formula ?? item.pattern ?? item.shortcut ?? fallback?.formula ?? fallback?.pattern ?? fallback?.shortcut ?? '')
  const formulaValue = item.formula ?? fallback?.formula
  const patternValue = item.pattern ?? fallback?.pattern
  const shortcutValue = item.shortcut ?? fallback?.shortcut ?? (category === 'shortcut' ? formulaValue : undefined)
  const tags = item.tags?.length ? item.tags : fallback?.tags ?? []

  return {
    id: String(item.id ?? fallback?.id ?? item.slug),
    slug: item.slug,
    title: item.title,
    category,
    description: item.description,
    formula: category === 'regex' || category === 'shortcut' ? undefined : formulaValue ?? undefined,
    pattern: category === 'regex' ? patternValue ?? formulaValue ?? undefined : undefined,
    shortcut: category === 'shortcut' ? shortcutValue ?? formulaValue ?? undefined : undefined,
    exampleInput: item.exampleInput ?? fallback?.exampleInput ?? exampleInputFor(category),
    exampleOutput: item.exampleOutput ?? fallback?.exampleOutput ?? exampleOutputFor(category),
    useCase: item.useCase,
    explanation: item.explanation ?? fallback?.explanation ?? explanationFor(item.title, item.description, category),
    commonMistakes: item.commonMistakes ?? fallback?.commonMistakes ?? commonMistakesFor(category),
    extraTips: item.extraTips ?? fallback?.extraTips ?? extraTipsFor(category),
    level: normalizeLevel(item.level, fallback?.level),
    tags,
    isPublished: item.isPublished ?? fallback?.isPublished ?? true,
    role: tags.length ? tags.join(', ') : fallback?.role ?? item.level,
  }
}

function normalizeCategory(category: string, tags: string[], displayValue: string): ExcelTipCategory {
  const value = category.toLowerCase()
  const searchable = `${value} ${tags.join(' ')} ${displayValue}`.toLowerCase()
  if (value === 'rumus-bisnis' || value === 'business') return 'rumus-bisnis'
  if (value === 'lambda') return 'lambda'
  if (value === 'regex') return 'regex'
  if (value === 'shortcut' || searchable.includes('shortcut') || /^(ctrl|alt|shift|f\d|data >|review >|onedrive|google drive)/i.test(displayValue.trim())) return 'shortcut'
  return 'tips-trick'
}

function normalizeLevel(value: string, fallback?: ExcelTipLevel): ExcelTipLevel {
  if (value === 'Pemula' || value === 'Dasar' || value === 'Menengah' || value === 'Advanced' || value === 'Professional') return value
  return fallback ?? 'Dasar'
}

function exampleInputFor(category: ExcelTipCategory) {
  if (category === 'regex') return 'Email: user@bisaexcel.com, WA: 081234567890, Invoice: INV-1024.'
  if (category === 'shortcut') return 'Sheet laporan panjang yang perlu dirapikan cepat.'
  return 'Data sales, target, omzet, biaya, atau customer di Excel.'
}

function exampleOutputFor(category: ExcelTipCategory) {
  if (category === 'regex') return 'Teks yang cocok dengan pattern, misalnya email, nomor HP, kode, atau angka.'
  if (category === 'shortcut') return 'Kerjaan lebih cepat tanpa terlalu banyak klik menu.'
  return 'Angka hasil perhitungan yang siap masuk laporan atau dashboard.'
}

function explanationFor(title: string, description: string, category: ExcelTipCategory) {
  const prefix = category === 'lambda'
    ? `Kalau ${title} sering kamu pakai berulang, LAMBDA bikin rumusnya jadi function sendiri.`
    : category === 'regex'
      ? `Kalau data teks kamu berantakan, pattern ini bantu nangkap bagian pentingnya.`
      : category === 'shortcut'
        ? `Shortcut ini cocok buat kamu yang pengin kerja lebih cepat tanpa bolak-balik klik ribbon.`
        : `Kalau kamu sering bikin laporan kerja, konsep ini wajib masuk toolkit Excel kamu.`
  return `${prefix} ${description}`
}

function commonMistakesFor(category: ExcelTipCategory) {
  if (category === 'regex') return ['Tidak mengecek variasi format data asli.', 'Pattern terlalu longgar sehingga menangkap teks yang salah.', 'Lupa mencoba pattern di beberapa contoh input.']
  if (category === 'shortcut') return ['Shortcut dicoba saat cell/range yang aktif belum tepat.', 'Lupa bahwa beberapa shortcut bisa beda di Mac.', 'Belum menyimpan file sebelum operasi besar.']
  return ['Range tidak sesuai panjang data.', 'Format angka masih tersimpan sebagai teks.', 'Rumus langsung dicopy tanpa menyesuaikan nama kolom.']
}

function extraTipsFor(category: ExcelTipCategory) {
  if (category === 'regex') return ['Uji pattern di data kecil dulu.', 'Simpan contoh input dan output supaya pattern gampang diaudit.', 'Gunakan pattern yang spesifik kalau datanya sensitif.']
  if (category === 'shortcut') return ['Latih 3 shortcut dulu sampai hafal.', 'Gabungkan shortcut dengan Excel Table biar makin ngebut.', 'Tempel catatan shortcut favorit di meja kerja kalau perlu.']
  return ['Rapikan header sebelum menulis rumus.', 'Coba rumus di 5 baris dulu sebelum dipakai massal.', 'Pakai Excel Table agar range lebih aman saat data bertambah.']
}

const fetchAll = () => apiClient.get<ApiResponse<TipApi[]>>('/tips').then((response) => response.data.data.map(toTip))
const fetchBySlug = (slug: string) => apiClient.get<ApiResponse<TipApi>>(`/tips/${slug}`).then((response) => toTip(response.data.data))

export const tipsService = {
  getAll: () => withLocalFallback(fetchAll(), excelTips),
  getAllResult: () => withFallbackResult(fetchAll(), excelTips),
  getBySlug: (slug: string) => withLocalFallback(fetchBySlug(slug), excelTips.find((item) => item.slug === slug) ?? excelTips[0]),
  getBySlugResult: (slug: string) => withFallbackResult(fetchBySlug(slug), excelTips.find((item) => item.slug === slug) ?? excelTips[0]),
}

export const excelTipsService = tipsService
