export type ExcelTipCategory = 'rumus-bisnis' | 'lambda' | 'regex' | 'tips-trick' | 'shortcut'

export type ExcelTipLevel = 'Pemula' | 'Dasar' | 'Menengah' | 'Advanced' | 'Professional'

export type ExcelTip = {
  id: string
  slug: string
  title: string
  category: ExcelTipCategory
  description: string
  formula?: string
  pattern?: string
  shortcut?: string
  exampleInput?: string
  exampleOutput?: string
  useCase: string
  explanation: string
  commonMistakes: string[]
  extraTips: string[]
  level: ExcelTipLevel
  tags: string[]
  isPublished: boolean
  role: string
}
