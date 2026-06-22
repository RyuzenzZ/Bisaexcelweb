import { ROUTES } from '@/constants/routes'

export type ArticleLevel = 'Pemula' | 'Dasar' | 'Menengah' | 'Advanced' | 'Professional'

export type ArticleSection = {
  title: string
  body: string[]
}

export type ArticleCaseStudy = {
  title: string
  description: string
  skills: string[]
}

export type Article = {
  id: string
  title: string
  slug: string
  excerpt: string
  category: string
  level: ArticleLevel
  estimatedReadTime: string
  orderIndex: number
  intro: string[]
  learningGoals: string[]
  sections: ArticleSection[]
  caseStudy?: ArticleCaseStudy
  commonMistakes: string[]
  reflectionPrompt?: string
  summary: string[]
  isPublished: boolean
}

const mentorIntro = {
  mindset: [
    'Kalau kamu baru mulai belajar Excel, wajar kalau awalnya terasa membingungkan. Banyak menu, banyak rumus, dan kadang kita tidak tahu harus mulai dari mana.',
    'Tapi sebenarnya, Excel akan jauh lebih mudah dipahami kalau kamu tidak langsung mengejar rumus. Mulailah dari cara Excel membaca data, karena dari sanalah semua rumus dan laporan bekerja.',
  ],
  workbook: [
    'Saat pertama kali membuka Excel, yang terlihat mungkin hanya kotak-kotak kosong. Tapi kotak-kotak itu punya pola yang sangat teratur, dan pola inilah yang akan sering kamu pakai di pekerjaan.',
    'Sebelum belajar rumus, kamu perlu nyaman dulu dengan istilah workbook, worksheet, cell, dan range. Ini seperti mengenal meja kerja sebelum mulai menyusun dokumen di atasnya.',
  ],
  table: [
    'Banyak file Excel terasa sulit bukan karena rumusnya rumit, tetapi karena datanya tidak rapi sejak awal. Kalau tabelnya berantakan, rumus sederhana pun bisa terasa membingungkan.',
    'Di materi ini, kamu akan belajar melihat tabel sebagai fondasi. Begitu tabel sudah rapi, filter, sort, rumus, pivot, dan dashboard akan jauh lebih mudah dibuat.',
  ],
}

export const articles: Article[] = [
  {
    id: 'learn-001',
    title: 'Mindset Belajar Excel dari Nol',
    slug: 'mindset-belajar-excel-dari-nol',
    excerpt: 'Mulai belajar Excel dari cara berpikir data, bukan dari menghafal rumus sebanyak mungkin.',
    category: 'Mindset Excel',
    level: 'Pemula',
    estimatedReadTime: '10 menit',
    orderIndex: 1,
    intro: mentorIntro.mindset,
    learningGoals: ['Memahami kenapa Excel sebaiknya dipelajari dari data dulu', 'Melihat rumus sebagai alat bantu, bukan tujuan utama', 'Menentukan urutan belajar yang lebih tenang dan tidak lompat-lompat', 'Menghubungkan Excel dengan pekerjaan nyata'],
    sections: [
      { title: 'Kenapa materi ini penting', body: ['Kalau kamu langsung masuk ke rumus, kamu mungkin bisa menghafal SUM, IF, atau VLOOKUP. Tapi saat bentuk datanya berubah sedikit, kamu akan bingung lagi karena belum memahami dasar masalahnya.', 'Excel dipakai untuk membaca data. Rumus hanya membantu kita menghitung, mencari, membandingkan, atau merapikan data itu. Jadi cara belajar yang lebih sehat adalah memahami data terlebih dahulu, baru masuk ke rumus.'] },
      { title: 'Penjelasan sederhana', body: ['Bayangkan Excel seperti buku catatan yang sangat teratur. Setiap informasi punya tempat: ada baris, kolom, cell, dan tabel. Jika tempatnya jelas, Excel bisa membantu kamu menghitung dan membaca informasi dengan cepat.', 'Karena itu, belajar Excel bukan dimulai dari menghafal semua fungsi. Belajar Excel dimulai dari bertanya: data apa yang saya punya, hasil apa yang ingin saya lihat, dan susunan seperti apa yang paling mudah dibaca?'] },
      { title: 'Contoh di dunia kerja', body: ['Misalnya kamu bekerja sebagai admin sales. Kamu punya data tanggal, nama customer, produk, sales, status, dan nilai transaksi. Dari data seperti ini, kamu bisa membuat laporan omzet, jumlah closing, atau performa tiap sales.', 'Kalau datanya rapi, rumus seperti SUMIF dan COUNTIF akan terasa masuk akal. Kamu tidak lagi menulis rumus karena hafal, tetapi karena tahu masalah yang sedang ingin diselesaikan.'] },
      { title: 'Kesalahan umum pemula', body: ['Kesalahan paling sering adalah merasa harus menguasai banyak rumus dulu sebelum berani memakai Excel. Akibatnya, belajar terasa berat dan cepat membuat lelah.', 'Kesalahan lain adalah membuat file yang terlihat bagus, tetapi struktur datanya sulit dibaca. Padahal untuk pekerjaan, file yang mudah dihitung lebih penting daripada file yang hanya terlihat ramai.'] },
      { title: 'Cara mulai mempraktikkan', body: ['Ambil satu contoh data sederhana. Bisa data penjualan, daftar hadir, atau pengeluaran pribadi. Tulis kolomnya dengan jelas, lalu coba tanyakan: angka apa yang ingin saya hitung dari data ini?', 'Dari situ, baru pilih rumus yang dibutuhkan. Kalau ingin total, gunakan SUM. Kalau ingin menghitung status tertentu, gunakan COUNTIF. Kalau ingin menjumlahkan berdasarkan kategori, gunakan SUMIF.'] },
      { title: 'Ringkasan', body: ['Excel akan lebih mudah dipahami kalau kamu mulai dari cara berpikir data. Jangan terburu-buru menghafal rumus. Pahami dulu bentuk data, susunan tabel, dan tujuan laporan yang ingin dibuat.', 'Saat fondasinya benar, rumus tidak lagi terasa seperti hafalan. Rumus akan terasa seperti alat yang membantu kamu menyelesaikan pekerjaan.'] },
    ],
    caseStudy: { title: 'Rekap penjualan harian', description: 'Bayangkan kamu diminta membuat rekap penjualan harian. Kalau datanya belum rapi, rumus apa pun akan terasa sulit. Tapi kalau kolom tanggal, produk, jumlah, harga, dan total sudah tersusun jelas, kamu bisa mulai memakai SUM, AVERAGE, atau SUMIF dengan lebih mudah.', skills: ['Struktur data', 'Tabel', 'SUM dasar'] },
    commonMistakes: ['Langsung menghafal rumus tanpa memahami bentuk data.', 'Membuat tabel asal-asalan sehingga rumus sulit dibaca.', 'Tidak membedakan antara data mentah dan laporan.', 'Terlalu cepat pindah materi sebelum paham dasar.'],
    reflectionPrompt: 'Sebelum lanjut, coba lihat file Excel yang pernah kamu buat. Apakah datanya sudah tersusun per kolom dengan jelas? Apakah setiap kolom punya nama yang mudah dipahami? Kalau belum, itu bisa menjadi latihan pertama kamu.',
    summary: ['Excel dimulai dari data, bukan dari rumus.', 'Rumus akan lebih mudah dipahami jika tabelnya rapi.', 'Belajar dari studi kasus membuat Excel terasa lebih nyata.', 'Mulailah dari masalah sederhana sebelum masuk ke rumus yang lebih panjang.'],
    isPublished: true,
  },
  {
    id: 'learn-002',
    title: 'Mengenal Workbook, Worksheet, Cell, dan Range',
    slug: 'mengenal-workbook-worksheet-cell-dan-range',
    excerpt: 'Pahami bagian paling dasar Excel agar tidak bingung saat mulai membaca dan menulis data.',
    category: 'Dasar Excel',
    level: 'Pemula',
    estimatedReadTime: '10 menit',
    orderIndex: 2,
    intro: mentorIntro.workbook,
    learningGoals: ['Memahami perbedaan workbook dan worksheet', 'Mengenali cell, row, column, dan range', 'Membaca alamat seperti A1 dan B2:C10', 'Mengerti kenapa range sangat penting dalam rumus'],
    sections: [
      { title: 'Kenapa materi ini penting', body: ['Hampir semua pekerjaan Excel akan memakai alamat cell atau range. Saat kamu menulis rumus, membuat filter, atau memilih data untuk chart, Excel perlu tahu bagian mana yang sedang kamu maksud.', 'Kalau kamu belum nyaman membaca cell dan range, rumus sederhana pun akan terasa menakutkan. Karena itu, bagian ini perlu dipahami pelan-pelan.'] },
      { title: 'Penjelasan sederhana', body: ['Workbook adalah file Excel. Di dalamnya ada worksheet, yaitu lembar kerja. Di dalam worksheet ada kotak-kotak kecil bernama cell. Cell punya alamat seperti A1, B2, atau C10.', 'Range adalah kumpulan cell. Misalnya A2:A10 berarti kumpulan cell dari A2 sampai A10. Kalau A2:D10, berarti area dari kolom A sampai D dan baris 2 sampai 10.'] },
      { title: 'Contoh di dunia kerja', body: ['Misalnya kamu punya data penjualan dari A1 sampai F100. Saat ingin menjumlahkan kolom omzet, kamu mungkin memilih range F2:F100. Saat ingin membuat filter seluruh tabel, kamu memilih A1:F100.', 'Dengan memahami range, kamu bisa lebih percaya diri saat menulis rumus. Kamu tahu data mana yang sedang dihitung, bukan hanya menyalin rumus dari contoh.'] },
      { title: 'Kesalahan umum pemula', body: ['Pemula sering memilih range yang terlalu pendek, sehingga data baru tidak ikut dihitung. Ada juga yang memilih range terlalu luas sehingga total manual atau catatan ikut masuk ke perhitungan.', 'Kesalahan lain adalah tidak memperhatikan header. Header sebaiknya tidak ikut dihitung sebagai angka, tetapi tetap dipakai sebagai nama kolom agar data mudah dibaca.'] },
      { title: 'Cara mulai mempraktikkan', body: ['Buka sheet kosong, lalu tulis beberapa data sederhana. Coba klik satu cell dan perhatikan alamatnya di Name Box. Setelah itu blok beberapa cell dan perhatikan area yang kamu pilih.', 'Latihan sederhana ini kelihatannya kecil, tetapi akan sangat membantu saat kamu mulai memakai SUM, AVERAGE, COUNTIF, atau membuat tabel.'] },
      { title: 'Ringkasan', body: ['Workbook, worksheet, cell, dan range adalah bahasa dasar Excel. Kalau kamu memahami bagian ini, kamu akan lebih mudah memahami rumus dan laporan.', 'Jangan anggap materi ini terlalu sederhana. Justru dari sinilah kemampuan Excel yang rapi mulai dibangun.'] },
    ],
    caseStudy: { title: 'Data customer sederhana', description: 'Misalnya kamu punya daftar customer dengan kolom nama, nomor WA, project, status, dan tanggal follow up. Sebelum menghitung apa pun, kamu perlu tahu range data utama dan kolom mana yang akan dipakai dalam rumus.', skills: ['Cell reference', 'Range', 'Navigasi sheet'] },
    commonMistakes: ['Tidak tahu alamat cell yang sedang dipakai.', 'Memilih range yang tidak lengkap.', 'Mencampur header, data, dan total dalam satu area hitung.', 'Menghapus baris atau kolom tanpa tahu efeknya ke rumus.'],
    reflectionPrompt: 'Coba buka satu file Excel. Pilih satu cell, lalu sebutkan alamatnya. Setelah itu blok satu tabel kecil dan tuliskan range-nya. Latihan ini sederhana, tetapi penting untuk membangun rasa familiar.',
    summary: ['Workbook adalah file Excel.', 'Worksheet adalah lembar kerja di dalam file.', 'Cell adalah kotak tempat data ditulis.', 'Range adalah kumpulan cell yang sering dipakai dalam rumus.'],
    isPublished: true,
  },
  {
    id: 'learn-003',
    title: 'Cara Membuat Tabel yang Rapi',
    slug: 'cara-membuat-tabel-yang-rapi',
    excerpt: 'Tabel yang rapi membuat filter, sort, rumus, pivot, dan dashboard jauh lebih mudah dibuat.',
    category: 'Tabel dan Data',
    level: 'Dasar',
    estimatedReadTime: '11 menit',
    orderIndex: 3,
    intro: mentorIntro.table,
    learningGoals: ['Menentukan header tabel yang jelas', 'Menghindari merge cell pada data mentah', 'Membuat data mudah difilter dan dihitung', 'Memahami kenapa Ctrl + T sangat membantu'],
    sections: [
      { title: 'Kenapa materi ini penting', body: ['Tabel adalah fondasi hampir semua pekerjaan Excel. Kalau tabelnya rapi, kamu bisa memakai filter, sort, rumus, pivot, dan dashboard dengan lebih mudah.', 'Sebaliknya, jika tabel berantakan, kamu akan menghabiskan waktu untuk memperbaiki data sebelum bisa membuat laporan. Ini sering terjadi di file kerja sehari-hari.'] },
      { title: 'Penjelasan sederhana', body: ['Tabel yang rapi punya header yang jelas, satu jenis data per kolom, dan setiap baris mewakili satu record. Misalnya satu baris berarti satu transaksi, satu customer, atau satu absensi.', 'Hindari mencampur judul besar, catatan, total manual, dan data mentah dalam satu area yang sama. Data mentah sebaiknya bersih dan konsisten. Laporan bisa dibuat di area atau sheet lain.'] },
      { title: 'Contoh di dunia kerja', body: ['Untuk rekap penjualan, kamu bisa membuat kolom tanggal, customer, produk, sales, status, harga, dan total. Dari tabel seperti ini, kamu bisa menghitung omzet per sales atau jumlah closing dengan mudah.', 'Untuk daftar hadir, kamu bisa membuat kolom tanggal, nama karyawan, jam masuk, jam pulang, dan status. Tabel seperti ini lebih mudah dihitung daripada data yang ditulis bebas tanpa pola.'] },
      { title: 'Kesalahan umum pemula', body: ['Kesalahan yang sering terjadi adalah memakai merge cell di data mentah. Merge cell terlihat rapi secara visual, tetapi bisa mengganggu filter, sort, dan rumus.', 'Kesalahan lain adalah membuat beberapa header dalam satu tabel atau menaruh total di tengah data. Excel akan kesulitan membaca mana data utama dan mana ringkasan.'] },
      { title: 'Cara mulai mempraktikkan', body: ['Ambil satu data sederhana, lalu susun ulang menjadi tabel. Pastikan setiap kolom punya nama yang jelas dan setiap baris punya pola yang sama.', 'Setelah itu tekan Ctrl + T untuk mengubah range menjadi Excel Table. Dengan format Table, Excel lebih mudah mengenali area data, dan range bisa otomatis bertambah saat data baru masuk.'] },
      { title: 'Ringkasan', body: ['Tabel yang rapi membuat Excel terasa jauh lebih mudah. Banyak rumus yang tampak rumit sebenarnya menjadi sederhana kalau struktur datanya sudah benar.', 'Sebelum mengejar rumus panjang, biasakan dulu membuat tabel yang bersih, konsisten, dan siap dihitung.'] },
    ],
    caseStudy: { title: 'Tabel penjualan rapi', description: 'Bayangkan kamu menerima catatan penjualan dari beberapa sales. Agar bisa dihitung, setiap transaksi perlu masuk ke baris sendiri dengan kolom yang konsisten: tanggal, sales, produk, status, harga, dan total.', skills: ['Ctrl + T', 'Header tabel', 'Data cleaning dasar'] },
    commonMistakes: ['Memakai merge cell di data mentah.', 'Mencampur data input dan laporan dalam satu area.', 'Tidak memberi nama kolom yang jelas.', 'Menulis data sejenis dengan format berbeda-beda.', 'Menaruh total manual di tengah tabel utama.'],
    reflectionPrompt: 'Coba lihat satu tabel yang pernah kamu buat. Apakah setiap kolom punya fungsi yang jelas? Apakah satu baris hanya berisi satu record? Jika belum, coba rapikan satu tabel kecil dulu sebelum lanjut ke rumus.',
    summary: ['Tabel rapi punya header jelas dan data konsisten.', 'Satu baris sebaiknya mewakili satu record.', 'Hindari merge cell untuk data mentah.', 'Gunakan Ctrl + T agar range lebih mudah dikelola.'],
    isPublished: true,
  },
]

function makeArticle(partial: Omit<Article, 'intro' | 'sections' | 'commonMistakes' | 'reflectionPrompt' | 'summary' | 'isPublished'> & { focus: string; practice: string }): Article {
  return {
    ...partial,
    intro: [`Di materi ini, kita pelan-pelan membahas ${partial.focus}. Kamu tidak perlu langsung paham semuanya dalam sekali baca. Yang penting, kamu mulai melihat pola dan tahu kenapa materi ini berguna dalam pekerjaan.`, 'Baca materi ini dengan tenang. Setelah paham alurnya, kamu bisa mencoba latihan kecil dari data sederhana yang kamu punya.'],
    sections: [
      { title: 'Kenapa materi ini penting', body: [`${partial.focus} sering muncul dalam pekerjaan Excel sehari-hari. Jika kamu memahami dasarnya, kamu akan lebih mudah membaca file kerja dan memperbaiki laporan yang kurang rapi.`, 'Materi ini juga menjadi jembatan sebelum kamu masuk ke rumus atau studi kasus yang lebih kompleks.'] },
      { title: 'Penjelasan sederhana', body: [`Secara sederhana, ${partial.focus} membantu kamu mengubah data mentah menjadi informasi yang lebih mudah dipahami. Jangan fokus pada hafalan dulu, fokuslah pada masalah yang ingin diselesaikan.`, 'Saat kamu tahu tujuan hitungannya, memilih rumus atau langkah Excel akan terasa lebih masuk akal.'] },
      { title: 'Contoh di dunia kerja', body: [`Dalam pekerjaan, kamu bisa memakai materi ini untuk membantu rekap, validasi data, atau membaca status dari sebuah laporan. Contohnya bisa muncul di laporan sales, absensi, stok, atau data customer.`, 'Kuncinya adalah selalu mulai dari data yang rapi, lalu tentukan hasil yang ingin kamu tampilkan.'] },
      { title: 'Kesalahan umum pemula', body: ['Pemula sering langsung menyalin rumus tanpa memahami range, kriteria, atau hasil yang diharapkan. Saat ada error, akhirnya bingung sendiri.', 'Kesalahan lain adalah terlalu cepat pindah ke materi berikutnya sebelum mencoba contoh kecil. Padahal pemahaman Excel tumbuh dari praktik yang berulang.'] },
      { title: 'Cara mulai mempraktikkan', body: [partial.practice, 'Gunakan data yang kecil dulu. Lima sampai sepuluh baris data sudah cukup untuk memahami pola sebelum kamu memakainya di file kerja yang besar.'] },
      { title: 'Ringkasan', body: [`${partial.focus} akan lebih mudah dipahami jika kamu menghubungkannya dengan kebutuhan kerja nyata. Jangan hanya membaca, coba praktikkan dengan data sederhana.`, 'Jika masih terasa sulit, ulangi dari contoh kecil. Excel memang lebih mudah dipahami saat kamu melihat hasilnya langsung.'] },
    ],
    commonMistakes: ['Menyalin rumus tanpa memahami tujuan.', 'Tidak mengecek range atau data sumber.', 'Mencampur data mentah dan laporan.', 'Berpindah materi terlalu cepat sebelum mencoba contoh kecil.'],
    reflectionPrompt: `Sebelum lanjut, coba pikirkan satu file kerja yang berhubungan dengan materi ini. Bagian mana yang bisa kamu rapikan atau hitung dengan lebih sederhana? ${partial.practice}`,
    summary: ['Mulai dari data yang rapi.', 'Pahami tujuan sebelum memilih rumus.', 'Coba contoh kecil sebelum memakai data besar.', 'Ulangi materi jika hasilnya belum masuk akal.'],
    isPublished: true,
  }
}

articles.push(
  makeArticle({ id: 'learn-004', title: 'Kesalahan Umum Pemula Saat Menggunakan Excel', slug: 'kesalahan-umum-pemula-saat-menggunakan-excel', excerpt: 'Kenali kebiasaan yang sering membuat file Excel sulit dirawat dan hasil rumus tidak akurat.', category: 'Mindset Excel', level: 'Dasar', estimatedReadTime: '8 menit', orderIndex: 4, learningGoals: ['Menghindari format data yang merusak analisis', 'Memahami kenapa data mentah dan laporan perlu dipisah', 'Mengenali sumber error umum'], caseStudy: { title: 'Standarisasi status lead', description: 'Merapikan variasi status follow up agar bisa dihitung dengan akurat.', skills: ['Data validation', 'COUNTIF', 'Data cleaning'] }, focus: 'kesalahan umum yang sering membuat file Excel sulit dipakai', practice: 'Ambil satu tabel lama, lalu cek apakah ada merge cell, format tanggal yang salah, atau status yang ditulis tidak konsisten.' }),
  makeArticle({ id: 'learn-005', title: 'Operator Matematika di Excel', slug: 'operator-matematika-di-excel', excerpt: 'Pelajari penjumlahan, pengurangan, perkalian, pembagian, dan urutan hitung dasar di Excel.', category: 'Rumus Dasar', level: 'Dasar', estimatedReadTime: '8 menit', orderIndex: 5, learningGoals: ['Memakai operator +, -, *, /', 'Memahami urutan operasi hitung', 'Membuat rumus total sederhana'], caseStudy: { title: 'Hitung total transaksi', description: 'Menghitung total dari jumlah, harga, diskon, dan pajak.', skills: ['Operator matematika', 'Referensi cell', 'Kurung rumus'] }, focus: 'operator matematika dasar seperti tambah, kurang, kali, dan bagi', practice: 'Buat tiga kolom sederhana: jumlah, harga, dan total. Lalu hitung total dengan perkalian antar cell.' }),
  makeArticle({ id: 'learn-006', title: 'Rumus SUM dan AVERAGE untuk Pemula', slug: 'rumus-sum-dan-average-untuk-pemula', excerpt: 'Gunakan SUM dan AVERAGE untuk membuat rekap angka paling dasar dalam laporan kerja.', category: 'Rumus Dasar', level: 'Dasar', estimatedReadTime: '9 menit', orderIndex: 6, learningGoals: ['Menjumlahkan angka dengan SUM', 'Menghitung rata-rata dengan AVERAGE', 'Memilih range angka yang benar'], caseStudy: { title: 'Rekap omzet mingguan', description: 'Menjumlahkan penjualan tujuh hari dan menghitung rata-rata transaksi.', skills: ['SUM', 'AVERAGE', 'Range angka'] }, focus: 'SUM dan AVERAGE untuk rekap angka dasar', practice: 'Tulis angka penjualan selama tujuh hari, lalu hitung totalnya dengan SUM dan rata-ratanya dengan AVERAGE.' }),
  makeArticle({ id: 'learn-007', title: 'IF Dasar untuk Mengambil Keputusan', slug: 'if-dasar-untuk-mengambil-keputusan', excerpt: 'Gunakan IF untuk membuat label otomatis seperti tercapai, belum tercapai, lulus, atau perlu follow up.', category: 'Logika Excel', level: 'Menengah', estimatedReadTime: '9 menit', orderIndex: 7, learningGoals: ['Memahami logika jika-maka', 'Menulis IF sederhana', 'Membuat label otomatis berdasarkan kondisi'], caseStudy: { title: 'Status target sales', description: 'Memberi label otomatis berdasarkan realisasi dan target.', skills: ['IF', 'Operator perbandingan', 'KPI'] }, focus: 'IF dasar untuk membuat keputusan otomatis', practice: 'Buat kolom target dan realisasi, lalu beri status Tercapai atau Belum Tercapai dengan IF.' }),
  makeArticle({ id: 'learn-008', title: 'COUNTIF dan SUMIF untuk Rekap Data', slug: 'countif-dan-sumif-untuk-rekap-data', excerpt: 'Hitung dan jumlahkan data berdasarkan kriteria seperti sales, project, status, atau kategori produk.', category: 'Rumus Dasar', level: 'Menengah', estimatedReadTime: '10 menit', orderIndex: 8, learningGoals: ['Menghitung data dengan COUNTIF', 'Menjumlahkan data dengan SUMIF', 'Memahami range kriteria dan range jumlah'], caseStudy: { title: 'Rekap omzet per sales', description: 'Menghitung transaksi dan omzet setiap sales dari satu tabel utama.', skills: ['COUNTIF', 'SUMIF', 'Kriteria'] }, focus: 'COUNTIF dan SUMIF untuk rekap berdasarkan kriteria', practice: 'Buat daftar transaksi sederhana, lalu hitung jumlah transaksi untuk satu sales dan total omzetnya.' }),
  makeArticle({ id: 'learn-009', title: 'Cara Membaca Data dengan VLOOKUP dan XLOOKUP', slug: 'cara-membaca-data-dengan-vlookup-dan-xlookup', excerpt: 'Pahami konsep lookup untuk mencari data customer, harga produk, project, atau status berdasarkan kode tertentu.', category: 'Logika Excel', level: 'Menengah', estimatedReadTime: '11 menit', orderIndex: 9, learningGoals: ['Memahami konsep lookup', 'Membedakan VLOOKUP dan XLOOKUP', 'Menyiapkan tabel referensi yang rapi'], caseStudy: { title: 'Cari data customer', description: 'Mengambil nama, project, dan status dari database customer.', skills: ['VLOOKUP', 'XLOOKUP', 'Tabel referensi'] }, focus: 'lookup untuk membaca data dari tabel referensi', practice: 'Buat tabel kode produk dan harga, lalu coba ambil harga berdasarkan kode produk dengan lookup.' }),
  makeArticle({ id: 'learn-010', title: 'Studi Kasus Rekap Penjualan Sederhana', slug: 'studi-kasus-rekap-penjualan-sederhana', excerpt: 'Gabungkan konsep tabel, SUM, IF, COUNTIF, SUMIF, dan lookup dalam satu contoh laporan penjualan.', category: 'Studi Kasus Kerja', level: 'Menengah', estimatedReadTime: '12 menit', orderIndex: 10, learningGoals: ['Menyusun tabel penjualan sederhana', 'Membuat rekap berdasarkan sales dan status', 'Menentukan langkah praktik setelah membaca materi'], caseStudy: { title: 'Laporan penjualan mingguan', description: 'Membuat ringkasan omzet, closing, target, dan status performa.', skills: ['SUMIF', 'COUNTIF', 'IF', 'Lookup dasar'] }, focus: 'studi kasus rekap penjualan sederhana', practice: 'Buat tabel transaksi kecil, lalu hitung omzet per sales, jumlah closing, dan status target.' }),
)

export const articleCategories = ['Mindset Excel', 'Dasar Excel', 'Tabel dan Data', 'Rumus Dasar', 'Logika Excel', 'Studi Kasus Kerja'] as const

export const learningRoadmap = [
  { title: 'Pahami Workbook, Worksheet, Cell, dan Range', description: 'Kenali struktur dasar Excel agar kamu tahu tempat data ditulis dan cara range dibaca.', level: 'Pemula', slug: 'mengenal-workbook-worksheet-cell-dan-range' },
  { title: 'Belajar membuat tabel yang rapi', description: 'Susun data dengan header jelas, tanpa merge cell, dan siap difilter atau dihitung.', level: 'Dasar', slug: 'cara-membuat-tabel-yang-rapi' },
  { title: 'Pahami error dasar di Excel', description: 'Kenali sumber kesalahan umum pemula sebelum rumus dan laporan menjadi sulit diperbaiki.', level: 'Dasar', slug: 'kesalahan-umum-pemula-saat-menggunakan-excel' },
  { title: 'Gunakan operator matematika', description: 'Latih perhitungan dasar seperti tambah, kurang, kali, bagi, diskon, dan total transaksi.', level: 'Dasar', slug: 'operator-matematika-di-excel' },
  { title: 'Mulai memakai rumus dasar', description: 'Gunakan SUM dan AVERAGE untuk membuat rekap angka yang sering dipakai dalam kerja.', level: 'Dasar', slug: 'rumus-sum-dan-average-untuk-pemula' },
  { title: 'Pelajari rumus logika', description: 'Gunakan IF untuk membuat status otomatis berdasarkan target, nilai, stok, atau kondisi kerja.', level: 'Menengah', slug: 'if-dasar-untuk-mengambil-keputusan' },
  { title: 'Pelajari fungsi teks', description: 'Rapikan nama, kode, dan data teks sebelum dipakai dalam laporan atau lookup.', level: 'Menengah', slug: 'cara-membuat-tabel-yang-rapi' },
  { title: 'Pelajari lookup', description: 'Cari data customer, produk, project, dan harga dengan VLOOKUP atau XLOOKUP.', level: 'Menengah', slug: 'cara-membaca-data-dengan-vlookup-dan-xlookup' },
  { title: 'Pelajari tanggal dan waktu', description: 'Pahami tanggal, deadline, dan umur data agar laporan kerja lebih akurat.', level: 'Menengah', slug: 'studi-kasus-rekap-penjualan-sederhana' },
  { title: 'Masuk ke studi kasus kerja', description: 'Gabungkan tabel, rumus, logika, dan rekap data dalam contoh pekerjaan nyata.', level: 'Menengah', slug: 'studi-kasus-rekap-penjualan-sederhana' },
]

export const workCaseStudies = [
  { title: 'Rekap Penjualan Harian', benefit: 'Melihat total omzet, transaksi, dan performa sales dari data harian.', skills: ['SUM', 'SUMIF', 'COUNTIF'], to: ROUTES.LEARN_DETAIL('studi-kasus-rekap-penjualan-sederhana') },
  { title: 'Daftar Hadir Karyawan', benefit: 'Mencatat kehadiran, keterlambatan, dan ringkasan absensi tim.', skills: ['IF', 'COUNTIF', 'Tanggal'], to: ROUTES.TEST_EXCEL },
  { title: 'Laporan Keuangan Sederhana', benefit: 'Membaca pemasukan, pengeluaran, saldo akhir, dan margin sederhana.', skills: ['SUM', 'Operator', 'Format angka'], to: ROUTES.EXCEL_TIPS },
  { title: 'Dashboard Monitoring Training', benefit: 'Melihat progress peserta, nilai rata-rata, dan status kelulusan.', skills: ['AVERAGE', 'IF', 'Filter'], to: ROUTES.CHALLENGE },
]