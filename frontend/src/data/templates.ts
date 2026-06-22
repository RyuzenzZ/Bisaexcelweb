export type ExcelTemplate = {
  slug: string
  title: string
  category: string
  suitableFor: string
  benefit: string
  access: 'Gratis' | 'Premium'
  price: number
}

export const templates: ExcelTemplate[] = [
  {
    slug: 'dashboard-sales',
    title: 'Dashboard Sales',
    category: 'Sales',
    suitableFor: 'Sales, owner bisnis, marketing',
    benefit: 'Melihat penjualan, target, dan performa produk dalam satu dashboard.',
    access: 'Premium',
    price: 79000,
  },
  {
    slug: 'dashboard-hrd',
    title: 'Dashboard HRD',
    category: 'HRD',
    suitableFor: 'HR staff dan admin personalia',
    benefit: 'Memantau absensi, status karyawan, dan ringkasan payroll.',
    access: 'Premium',
    price: 89000,
  },
  {
    slug: 'inventory-tracker',
    title: 'Inventory Tracker',
    category: 'Operasional',
    suitableFor: 'UMKM, gudang, admin operasional',
    benefit: 'Memonitor stok masuk, stok keluar, dan barang yang perlu restock.',
    access: 'Gratis',
    price: 0,
  },
  {
    slug: 'payroll-sederhana',
    title: 'Payroll Sederhana',
    category: 'Finance & HR',
    suitableFor: 'HRD, finance, admin kantor',
    benefit: 'Menghitung gaji, tunjangan, potongan, dan total pembayaran.',
    access: 'Premium',
    price: 59000,
  },
]
