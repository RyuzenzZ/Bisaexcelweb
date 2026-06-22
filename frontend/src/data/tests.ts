export type ExcelTest = {
  slug: string
  title: string
  description: string
  question: string
  level: 'Pemula' | 'Menengah' | 'Lanjutan'
  category: string
  autoCheckType: 'exact_text' | 'normalized_text'
  estimatedTime: string
  formulaSkills: string[]
  answerProductSlug: string
  tutorialProductSlug: string
}

export type DigitalProduct = {
  slug: string
  relatedTestSlug?: string
  type: 'answer' | 'answer_tutorial' | 'template'
  title: string
  description: string
  price: number
  accessType: 'paid' | 'free'
  isActive: boolean
}

export type CheckAnswerResult = {
  isCorrect: boolean
  score: number
  message: string
  formulaSkills: string[]
}

export const tests: ExcelTest[] = [
  {
    slug: 'test-sumif-penjualan',
    title: 'Test Excel SUMIF Penjualan',
    description: 'Uji kemampuan menghitung total penjualan berdasarkan kategori produk.',
    question: 'Tuliskan rumus untuk menjumlahkan total penjualan produk dengan kategori "A" dari kolom kategori C dan nilai penjualan D.',
    level: 'Pemula',
    category: 'Rumus Dasar',
    autoCheckType: 'normalized_text',
    estimatedTime: '10 menit',
    formulaSkills: ['SUMIF', 'Range', 'Kriteria'],
    answerProductSlug: 'jawaban-test-sumif-penjualan',
    tutorialProductSlug: 'tutorial-test-sumif-penjualan',
  },
  {
    slug: 'test-countif-data-karyawan',
    title: 'Test Excel COUNTIF Data Karyawan',
    description: 'Cek kemampuan menghitung jumlah data berdasarkan departemen.',
    question: 'Tuliskan rumus untuk menghitung jumlah karyawan departemen HRD jika departemen berada di kolom B.',
    level: 'Pemula',
    category: 'Administrasi',
    autoCheckType: 'normalized_text',
    estimatedTime: '8 menit',
    formulaSkills: ['COUNTIF', 'Kriteria Teks'],
    answerProductSlug: 'jawaban-test-countif-data-karyawan',
    tutorialProductSlug: 'tutorial-test-countif-data-karyawan',
  },
]

export const digitalProducts: DigitalProduct[] = tests.flatMap((test) => [
  {
    slug: test.answerProductSlug,
    relatedTestSlug: test.slug,
    type: 'answer',
    title: `Jawaban ${test.title}`,
    description: 'Produk digital berisi jawaban ringkas. Payment belum aktif di MVP.',
    price: 5000,
    accessType: 'paid',
    isActive: true,
  },
  {
    slug: test.tutorialProductSlug,
    relatedTestSlug: test.slug,
    type: 'answer_tutorial',
    title: `Jawaban + Tutorial ${test.title}`,
    description: 'Produk digital berisi jawaban dan pembahasan langkah demi langkah. Payment belum aktif di MVP.',
    price: 15000,
    accessType: 'paid',
    isActive: true,
  },
])

export function unavailableAutoCheck(test: ExcelTest): CheckAnswerResult {
  return {
    isCorrect: false,
    score: 0,
    message: 'Backend auto-check belum tersedia, jadi jawaban tidak diperiksa di frontend agar kunci jawaban tidak bocor.',
    formulaSkills: test.formulaSkills,
  }
}
