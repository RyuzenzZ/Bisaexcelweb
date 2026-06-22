export type BisaExcelClass = {
  slug: string
  title: string
  format: 'online' | 'offline' | 'private'
  description: string
  targetUser: string
  topics: string[]
  ctaLabel: string
}

export const classes: BisaExcelClass[] = [
  {
    slug: 'kelas-online-excel-dasar',
    title: 'Kelas Online Excel Dasar',
    format: 'online',
    description: 'Kelas live untuk peserta yang ingin belajar Excel dari nol dengan panduan mentor.',
    targetUser: 'Pemula, mahasiswa, fresh graduate, admin kantor',
    topics: ['Dasar Excel', 'Rumus dasar', 'Format data', 'Latihan laporan'],
    ctaLabel: 'Tanya Jadwal',
  },
  {
    slug: 'kelas-offline-excel-kerja',
    title: 'Kelas Offline Excel untuk Kerja',
    format: 'offline',
    description: 'Kelas tatap muka untuk praktik intensif memakai studi kasus pekerjaan.',
    targetUser: 'Karyawan, admin, finance, HRD, operasional',
    topics: ['Data cleaning', 'Rumus kerja', 'Pivot Table', 'Dashboard sederhana'],
    ctaLabel: 'Konsultasi Kelas',
  },
  {
    slug: 'kelas-private-excel',
    title: 'Kelas Private Excel',
    format: 'private',
    description: 'Sesi private sesuai kebutuhan pekerjaan, file kerja, atau target skill peserta.',
    targetUser: 'Individu atau tim kecil yang butuh pendampingan khusus',
    topics: ['Materi custom', 'Review file kerja', 'Formula troubleshooting'],
    ctaLabel: 'Hubungi Admin',
  },
]
