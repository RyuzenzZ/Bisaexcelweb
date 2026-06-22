export type VideoLessonLevel = 'Pemula' | 'Dasar' | 'Menengah' | 'Advanced' | 'Professional'

export type VideoLesson = {
  id?: string
  module: string
  title: string
  slug: string
  videoId: string
  youtubeUrl: string
  thumbnailUrl: string
  duration: string
  durationSeconds: number
  level: VideoLessonLevel
  category: string
  orderIndex: number
  description?: string
  isExclusive?: boolean
  isPublished?: boolean
}

export const youtubePlaylistUrl = 'https://www.youtube.com/playlist?list=PLNZ8iqpnPoyEziIGVjl8Nu7Sv_t0k7IP2'
export const youtubePlaylistEmbedUrl = 'https://www.youtube.com/embed/videoseries?list=PLNZ8iqpnPoyEziIGVjl8Nu7Sv_t0k7IP2'
export const youtubeChannelName = 'Bisa Excel'
export const videoProgramName = 'Belajar Excel dari Nol - E Course'
export const videoProgramLabel = 'Ecourse Excel dari Nol'

export const videos: VideoLesson[] = [
  { module: 'Modul 1', title: 'Modul 1 - Berkenalan dengan Excel', slug: 'modul-1-berkenalan-dengan-excel', videoId: '75xRDnyoJC8', youtubeUrl: 'https://www.youtube.com/watch?v=75xRDnyoJC8', thumbnailUrl: 'https://i.ytimg.com/vi/75xRDnyoJC8/maxresdefault.jpg', duration: '17:57', durationSeconds: 1077, level: 'Pemula', category: 'Pengenalan Excel', orderIndex: 1 },
  { module: 'Modul 2.1', title: 'MODUL 2.1 - CARA MENGISI CELL DI EXCEL', slug: 'modul-2-1-cara-mengisi-cell-di-excel', videoId: 'X3ngqk7UH8Y', youtubeUrl: 'https://www.youtube.com/watch?v=X3ngqk7UH8Y', thumbnailUrl: 'https://i.ytimg.com/vi/X3ngqk7UH8Y/maxresdefault.jpg', duration: '13:57', durationSeconds: 837, level: 'Pemula', category: 'Dasar Excel', orderIndex: 2 },
  { module: 'Modul 2.2', title: 'Modul 2.2 - Aturan dalam membuat table di excel', slug: 'modul-2-2-aturan-membuat-table-di-excel', videoId: '_lawDmV1u6Q', youtubeUrl: 'https://www.youtube.com/watch?v=_lawDmV1u6Q', thumbnailUrl: 'https://i.ytimg.com/vi/_lawDmV1u6Q/maxresdefault.jpg', duration: '22:16', durationSeconds: 1336, level: 'Pemula', category: 'Dasar Tabel', orderIndex: 3 },
  { module: 'Modul 2.3', title: 'MODUL 2.3 - MEMBUAT TABLE PERTAMA YANG PROPPER', slug: 'modul-2-3-membuat-table-pertama-yang-proper', videoId: 'xuUkVgjiWcI', youtubeUrl: 'https://www.youtube.com/watch?v=xuUkVgjiWcI', thumbnailUrl: 'https://i.ytimg.com/vi/xuUkVgjiWcI/maxresdefault.jpg', duration: '33:40', durationSeconds: 2020, level: 'Pemula', category: 'Dasar Tabel', orderIndex: 4 },
  { module: 'Modul 3.1', title: 'MODUL 3.1 - JENIS JENIS ERROR DI EXCEL', slug: 'modul-3-1-jenis-jenis-error-di-excel', videoId: 'Q8f4raLYVog', youtubeUrl: 'https://www.youtube.com/watch?v=Q8f4raLYVog', thumbnailUrl: 'https://i.ytimg.com/vi/Q8f4raLYVog/maxresdefault.jpg', duration: '7:06', durationSeconds: 426, level: 'Pemula', category: 'Error Excel', orderIndex: 5 },
  { module: 'Modul 3.2', title: 'MODUL 3.2 - OPERATOR MATEMATIKA', slug: 'modul-3-2-operator-matematika', videoId: 'cQMG3ODKh44', youtubeUrl: 'https://www.youtube.com/watch?v=cQMG3ODKh44', thumbnailUrl: 'https://i.ytimg.com/vi/cQMG3ODKh44/maxresdefault.jpg', duration: '23:32', durationSeconds: 1412, level: 'Pemula', category: 'Operator Matematika', orderIndex: 6 },
  { module: 'Modul 4.1 Part 1', title: 'MODUL 4.1 PART 1 - MENGUASAI RUMUS SUM SAMPE AKARNYA', slug: 'modul-4-1-part-1-menguasai-rumus-sum', videoId: '9iYinE-Rsts', youtubeUrl: 'https://www.youtube.com/watch?v=9iYinE-Rsts', thumbnailUrl: 'https://i.ytimg.com/vi/9iYinE-Rsts/maxresdefault.jpg', duration: '22:06', durationSeconds: 1326, level: 'Dasar', category: 'Rumus Dasar', orderIndex: 7 },
  { module: 'Modul 4.1 Part 2', title: 'MODUL 4.1 PART 2 - FUNGSI SUMPRODUCT, PRODUCT, MODE.MULT, MODE.SGL, MOD, QUOTIENT', slug: 'modul-4-1-part-2-sumproduct-product-mode-mod-quotient', videoId: '6IG7W3CqSEQ', youtubeUrl: 'https://www.youtube.com/watch?v=6IG7W3CqSEQ', thumbnailUrl: 'https://i.ytimg.com/vi/6IG7W3CqSEQ/maxresdefault.jpg', duration: '17:00', durationSeconds: 1020, level: 'Dasar', category: 'Rumus Matematika', orderIndex: 8 },
  { module: 'Modul 4.2', title: 'MODUL 4.2 - PEMBULATAN', slug: 'modul-4-2-pembulatan', videoId: 'URY2cilSgA4', youtubeUrl: 'https://www.youtube.com/watch?v=URY2cilSgA4', thumbnailUrl: 'https://i.ytimg.com/vi/URY2cilSgA4/maxresdefault.jpg', duration: '28:11', durationSeconds: 1691, level: 'Dasar', category: 'Rumus Matematika', orderIndex: 9 },
  { module: 'Modul 5.1', title: 'MODUL 5.1 - MIN, MAX, MEDIAN', slug: 'modul-5-1-min-max-median', videoId: 'StWcFa18v0k', youtubeUrl: 'https://www.youtube.com/watch?v=StWcFa18v0k', thumbnailUrl: 'https://i.ytimg.com/vi/StWcFa18v0k/maxresdefault.jpg', duration: '15:02', durationSeconds: 902, level: 'Dasar', category: 'Statistik Dasar', orderIndex: 10 },
  { module: 'Modul 5.2', title: 'MODUL 5.2 - AVERAGE, COUNT, COUNTA, COUNTBLANK', slug: 'modul-5-2-average-count-counta-countblank', videoId: 'UORJOUCqdn0', youtubeUrl: 'https://www.youtube.com/watch?v=UORJOUCqdn0', thumbnailUrl: 'https://i.ytimg.com/vi/UORJOUCqdn0/maxresdefault.jpg', duration: '7:51', durationSeconds: 471, level: 'Dasar', category: 'Statistik Dasar', orderIndex: 11 },
  { module: 'Modul 5.3', title: 'MODUL 5.3 - COUNTIFS, SUMIFS, AVERAGEIFS, MINIFS, MAXIFS', slug: 'modul-5-3-countifs-sumifs-averageifs-minifs-maxifs', videoId: 'gDt1spwS7PI', youtubeUrl: 'https://www.youtube.com/watch?v=gDt1spwS7PI', thumbnailUrl: 'https://i.ytimg.com/vi/gDt1spwS7PI/maxresdefault.jpg', duration: '9:17', durationSeconds: 557, level: 'Menengah', category: 'Rumus Bersyarat', orderIndex: 12 },
  { module: 'Modul 5.4', title: 'MODUL 5.4 - WILD CARD', slug: 'modul-5-4-wild-card', videoId: '1bo5ZMovJ0o', youtubeUrl: 'https://www.youtube.com/watch?v=1bo5ZMovJ0o', thumbnailUrl: 'https://i.ytimg.com/vi/1bo5ZMovJ0o/maxresdefault.jpg', duration: '20:56', durationSeconds: 1256, level: 'Menengah', category: 'Rumus Bersyarat', orderIndex: 13 },
  { module: 'Modul 6.1', title: 'MODUL 6.1 - IF, IFS, SWITCH, CHOOSE', slug: 'modul-6-1-if-ifs-switch-choose', videoId: '5tBbTO8s73M', youtubeUrl: 'https://www.youtube.com/watch?v=5tBbTO8s73M', thumbnailUrl: 'https://i.ytimg.com/vi/5tBbTO8s73M/maxresdefault.jpg', duration: '19:03', durationSeconds: 1143, level: 'Menengah', category: 'Logika Excel', orderIndex: 14 },
  { module: 'Modul 6.2', title: 'MODUL 6.2 - AND, OR, XOR, NOT, LOGIKA ALJABAR', slug: 'modul-6-2-and-or-xor-not-logika-aljabar', videoId: 'PxAbvCbmvKg', youtubeUrl: 'https://www.youtube.com/watch?v=PxAbvCbmvKg', thumbnailUrl: 'https://i.ytimg.com/vi/PxAbvCbmvKg/maxresdefault.jpg', duration: '19:30', durationSeconds: 1170, level: 'Menengah', category: 'Logika Excel', orderIndex: 15 },
  { module: 'Modul 6.3', title: 'MODUL 6.3 - IS LOGICAL', slug: 'modul-6-3-is-logical', videoId: 'oTTjIz07sQI', youtubeUrl: 'https://www.youtube.com/watch?v=oTTjIz07sQI', thumbnailUrl: 'https://i.ytimg.com/vi/oTTjIz07sQI/maxresdefault.jpg', duration: '7:25', durationSeconds: 445, level: 'Menengah', category: 'Logika Excel', orderIndex: 16 },
  { module: 'Modul 7.2', title: 'MODUL 7.2 - TEXT FUNCTION', slug: 'modul-7-2-text-function', videoId: 'wBPelAIZyr8', youtubeUrl: 'https://www.youtube.com/watch?v=wBPelAIZyr8', thumbnailUrl: 'https://i.ytimg.com/vi/wBPelAIZyr8/maxresdefault.jpg', duration: '17:08', durationSeconds: 1028, level: 'Menengah', category: 'Text Function', orderIndex: 17 },
  { module: 'Modul 7.3', title: 'MODUL 7.3 - TEXTSPLIT, TEXTBEFORE, TEXTAFTER, TEXTJOIN', slug: 'modul-7-3-textsplit-textbefore-textafter-textjoin', videoId: 'Eyt9woBhm7Y', youtubeUrl: 'https://www.youtube.com/watch?v=Eyt9woBhm7Y', thumbnailUrl: 'https://i.ytimg.com/vi/Eyt9woBhm7Y/maxresdefault.jpg', duration: '20:38', durationSeconds: 1238, level: 'Menengah', category: 'Text Function', orderIndex: 18 },
  { module: 'Modul 8.1 Part 1', title: 'MODUL 8.1 - PART 1 - OPENING DAN PENJELASAN LOOKUP SERIES', slug: 'modul-8-1-part-1-opening-lookup-series', videoId: '4RseruR0MGA', youtubeUrl: 'https://www.youtube.com/watch?v=4RseruR0MGA', thumbnailUrl: 'https://i.ytimg.com/vi/4RseruR0MGA/maxresdefault.jpg', duration: '17:12', durationSeconds: 1032, level: 'Menengah', category: 'Lookup', orderIndex: 19 },
  { module: 'Modul 8.1', title: 'MODUL 8.1 - VLOOKUP, XLOOKUP, INDEX MATCH', slug: 'modul-8-1-vlookup-xlookup-index-match', videoId: 'PfiCdn2Jl5o', youtubeUrl: 'https://www.youtube.com/watch?v=PfiCdn2Jl5o', thumbnailUrl: 'https://i.ytimg.com/vi/PfiCdn2Jl5o/maxresdefault.jpg', duration: '53:05', durationSeconds: 3185, level: 'Menengah', category: 'Lookup', orderIndex: 20 },
  { module: 'Modul 8.2', title: 'MODUL 8.2 - LOOKUP DATA TERAKHIR', slug: 'modul-8-2-lookup-data-terakhir', videoId: 'Wpsj9SWsGKE', youtubeUrl: 'https://www.youtube.com/watch?v=Wpsj9SWsGKE', thumbnailUrl: 'https://i.ytimg.com/vi/Wpsj9SWsGKE/maxresdefault.jpg', duration: '8:17', durationSeconds: 497, level: 'Menengah', category: 'Lookup', orderIndex: 21 },
  { module: 'Modul 8.3', title: 'MODUL 8.3 - Bukan Cuma MATCH, INDEX Punya Kekuatan Tersembunyi! Simak Tutorialnya', slug: 'modul-8-3-kekuatan-index-match', videoId: '2og7cyQUX-k', youtubeUrl: 'https://www.youtube.com/watch?v=2og7cyQUX-k', thumbnailUrl: 'https://i.ytimg.com/vi/2og7cyQUX-k/maxresdefault.jpg', duration: '21:56', durationSeconds: 1316, level: 'Menengah', category: 'Lookup', orderIndex: 22 },
  { module: 'Modul 8.4', title: 'MODUL 8.4 - PENYEBAB ERROR #N/A VLOOKUP', slug: 'modul-8-4-penyebab-error-na-vlookup', videoId: 'J3F8F89JpLA', youtubeUrl: 'https://www.youtube.com/watch?v=J3F8F89JpLA', thumbnailUrl: 'https://i.ytimg.com/vi/J3F8F89JpLA/maxresdefault.jpg', duration: '10:14', durationSeconds: 614, level: 'Menengah', category: 'Lookup', orderIndex: 23 },
  { module: 'Modul 9.1', title: 'MODUL - 9,1 DATE, DAY, MONTH, YEAR, TODAY, NOW', slug: 'modul-9-1-date-day-month-year-today-now', videoId: 'yxdApAY5uIk', youtubeUrl: 'https://www.youtube.com/watch?v=yxdApAY5uIk', thumbnailUrl: 'https://i.ytimg.com/vi/yxdApAY5uIk/maxresdefault.jpg', duration: '16:10', durationSeconds: 970, level: 'Menengah', category: 'Date & Time', orderIndex: 24 },
  { module: 'Modul 9.2', title: 'MODUL 9,2  DATEDIF, DAYS, EDATE', slug: 'modul-9-2-datedif-days-edate', videoId: '-wRnsiPuuRg', youtubeUrl: 'https://www.youtube.com/watch?v=-wRnsiPuuRg', thumbnailUrl: 'https://i.ytimg.com/vi/-wRnsiPuuRg/maxresdefault.jpg', duration: '15:31', durationSeconds: 931, level: 'Menengah', category: 'Date & Time', orderIndex: 25 },
  { module: 'Modul 9.3', title: 'MODUL 9.3 - WORKDAY, WORKDAY.INTL, NETWORKDAY, NETWORKDAY.INTL, WEEKNUM, ISOWEEKNUM', slug: 'modul-9-3-workday-networkday-weeknum-isoweeknum', videoId: 'uVM7IH2Lod4', youtubeUrl: 'https://www.youtube.com/watch?v=uVM7IH2Lod4', thumbnailUrl: 'https://i.ytimg.com/vi/uVM7IH2Lod4/maxresdefault.jpg', duration: '30:14', durationSeconds: 1814, level: 'Menengah', category: 'Date & Time', orderIndex: 26 },
  { module: 'Modul 9.4', title: 'MODUL 9.4 - STUDY KASUS DATE', slug: 'modul-9-4-study-kasus-date', videoId: 'FtEwuURKDCk', youtubeUrl: 'https://www.youtube.com/watch?v=FtEwuURKDCk', thumbnailUrl: 'https://i.ytimg.com/vi/FtEwuURKDCk/maxresdefault.jpg', duration: '13:33', durationSeconds: 813, level: 'Menengah', category: 'Date & Time', orderIndex: 27 },
  { module: 'Modul 10.1', title: 'MODUL 10.1 BOCORAN SOAL TEST EXCEL CALON MANAGER SALES', slug: 'modul-10-1-soal-test-excel-calon-manager-sales', videoId: 'sNTeQMsBag4', youtubeUrl: 'https://www.youtube.com/watch?v=sNTeQMsBag4', thumbnailUrl: 'https://i.ytimg.com/vi/sNTeQMsBag4/maxresdefault.jpg', duration: '29:05', durationSeconds: 1745, level: 'Professional', category: 'Studi Kasus Kerja', orderIndex: 28 },
]

export const videoCategories = Array.from(new Set(videos.map((video) => video.category)))
export const videoModules = Array.from(new Set(videos.map((video) => video.module)))
export const videoLevels: Array<'Semua' | VideoLessonLevel> = ['Semua', 'Pemula', 'Dasar', 'Menengah', 'Advanced', 'Professional']

export function getVideoDescription(video: VideoLesson): string {
  return video.description ?? `Pada materi ini, kamu akan mempelajari topik ${video.category} sebagai bagian dari alur belajar Excel dari nol. Ikuti video sampai selesai, lalu lanjutkan ke materi berikutnya atau coba Test Excel terkait.`
}

export function formatTotalDuration(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.round((totalSeconds % 3600) / 60)
  return `${hours} jam ${minutes} menit`
}