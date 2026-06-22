import { ROUTES } from '@/constants/routes'

const excelTipsCategory = (category: string) => `${ROUTES.EXCEL_TIPS}?category=${category}`

export const publicNavigation = [
  { label: 'Belajar', to: ROUTES.LEARN },
  { label: 'Video', to: ROUTES.VIDEO },
  { label: 'Test Excel', to: ROUTES.TEST_EXCEL },

  {
    label: 'Excel Tips',
    to: ROUTES.EXCEL_TIPS,
    children: [
      { label: 'Rumus Bisnis', to: excelTipsCategory('rumus-bisnis') },
      { label: 'Kamus LAMBDA', to: excelTipsCategory('lambda') },
      { label: 'Pattern REGEX', to: excelTipsCategory('regex') },
      { label: 'Tips & Trick', to: excelTipsCategory('tips-trick') },
      { label: 'Shortcut Excel', to: excelTipsCategory('shortcut') },
    ],
  },
  { label: 'Template', to: ROUTES.TEMPLATES },
  { label: 'Kelas', to: ROUTES.CLASSES },
] as const