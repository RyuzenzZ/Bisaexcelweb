export type CourseLevel = 'Pemula' | 'Menengah' | 'Mahir'

export type Course = {
  id: string
  slug: string
  title: string
  level: CourseLevel
  duration: string
  lessons: number
  description: string
}
