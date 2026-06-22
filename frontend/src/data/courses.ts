import type { Course } from '@/types'

export const courses: Course[] = [
  {
    id: 'course-1',
    slug: 'excel-fundamental-untuk-kerja',
    title: 'Excel Fundamental untuk Kerja',
    level: 'Pemula',
    duration: '4 jam',
    lessons: 24,
    description: 'Belajar rumus dasar, format data, tabel, dan workflow Excel untuk pekerjaan harian.',
  },
  {
    id: 'course-2',
    slug: 'dashboard-reporting-excel',
    title: 'Dashboard & Reporting Excel',
    level: 'Menengah',
    duration: '6 jam',
    lessons: 32,
    description: 'Bangun laporan KPI, pivot, chart, dan dashboard yang rapi untuk tim bisnis.',
  },
  {
    id: 'course-3',
    slug: 'excel-automation-formula',
    title: 'Formula Automation untuk Analyst',
    level: 'Mahir',
    duration: '8 jam',
    lessons: 40,
    description: 'Gunakan formula modern, LAMBDA, lookup, dan logika otomatisasi tanpa macro.',
  },
]
