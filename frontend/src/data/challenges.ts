export type Challenge = {
  slug: string
  title: string
  description: string
  sheetLabel: string
  taskInstruction: string
  level: 'Pemula' | 'Menengah' | 'Lanjutan'
  category: string
  estimatedTime: string
}

export const challenges: Challenge[] = [
  {
    slug: 'rapikan-data-customer-sheet-1',
    title: 'Rapikan Data Customer dari Sheet 1',
    description: 'Tantangan praktik untuk membersihkan nama, email, dan nomor HP customer.',
    sheetLabel: 'Sheet 1',
    taskInstruction: 'Bersihkan spasi berlebih, tandai email tidak valid, dan pisahkan nomor HP yang kosong.',
    level: 'Pemula',
    category: 'Data Cleaning',
    estimatedTime: '25 menit',
  },
  {
    slug: 'rekap-penjualan-sederhana-sheet-1',
    title: 'Buat Rekap Penjualan Sederhana',
    description: 'Buat ringkasan total penjualan per produk dari data transaksi sederhana.',
    sheetLabel: 'Sheet 1',
    taskInstruction: 'Gunakan rumus atau pivot sederhana untuk membuat tabel rekap per produk.',
    level: 'Pemula',
    category: 'Reporting',
    estimatedTime: '30 menit',
  },
]
