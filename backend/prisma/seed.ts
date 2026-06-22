import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { articlesSeed } from './articles-seed.js'
import { excelTipsSeed } from './tips-seed.js'
import { videosSeed } from './videos-seed.js'
import { playCases as seedPlayCases, playQuestions as seedPlayQuestions, type PlayCase as SeedPlayCase, type PlayQuestion as SeedPlayQuestion } from '../src/data/playCases.js'
import { hashPassword } from '../src/utils/password.js'

const prisma = new PrismaClient()

function normalizePlayMode(mode: SeedPlayCase['mode']) {
  if (mode === 'kompetisi') return 'ranked'
  if (mode === 'challenge') return 'challenge'
  return 'practice'
}

function normalizeDifficulty(level: string) {
  const value = level.toLowerCase()
  if (value.includes('advanced') || value.includes('mahir') || value.includes('professional')) return 'advanced'
  if (value.includes('menengah')) return 'menengah'
  return 'dasar'
}

function questionType(question: SeedPlayQuestion) {
  if (question.inputType === 'multiple_choice') return 'choice'
  return question.answerType === 'text' ? 'text' : 'number'
}

function levelLabel(order: number, sourceLevel: SeedPlayQuestion['level']) {
  if (sourceLevel === 'bonus') return `Checkpoint ${order} - Bonus Ketelitian`
  if (order <= 3) return `Soal ${order} - Pemanasan Data`
  if (order <= 7) return `Soal ${order} - Naik Ritme`
  return `Soal ${order} - Gas Akurasi`
}


type RekapQuestionSeed = {
  questionText: string
  correctAnswer: string
  acceptedAnswers?: string[]
  skill: string
  hint: string
  answerType?: 'number' | 'text'
  points?: number
}

function makeRekapQuestion(item: RekapQuestionSeed, index: number): SeedPlayQuestion {
  const answerType = item.answerType ?? (/^[\d.,%]+$/.test(item.correctAnswer) ? 'number' : 'text')
  return {
    id: `rp-v2-${String(index + 1).padStart(3, '0')}`,
    caseId: 'rekap-penjualan-harian',
    orderIndex: index + 1,
    level: index >= 54 ? 'bonus' : ((index % 5) + 1) as SeedPlayQuestion['level'],
    questionText: item.questionText,
    inputType: 'manual_input',
    answerType,
    correctAnswer: item.correctAnswer,
    acceptedAnswers: item.acceptedAnswers ?? [item.correctAnswer],
    points: item.points ?? (index < 10 ? 10 : index < 30 ? 12 : index < 50 ? 15 : 20),
    formulaSkills: [item.skill],
    hint: item.hint,
    isBonus: index >= 54,
  }
}

function rekapPenjualanQuestionBank(): SeedPlayQuestion[] {
  const bank: RekapQuestionSeed[] = [
    { questionText: 'Berapa total transaksi pada dataset?', correctAnswer: '60', acceptedAnswers: ['60', '60 transaksi'], skill: 'COUNT', hint: 'Hitung jumlah baris transaksi.', answerType: 'number' },
    { questionText: 'Berapa total omzet bersih seluruh transaksi setelah diskon?', correctAnswer: '4148700', acceptedAnswers: ['4148700', 'Rp 4.148.700', '4148700'], skill: 'SUM', hint: 'Gunakan Qty, Harga Satuan, dan Diskon.', answerType: 'number' },
    { questionText: 'Produk apa yang memiliki total omzet bersih tertinggi?', correctAnswer: 'Matcha Latte', acceptedAnswers: ['Matcha Latte', 'matcha latte'], skill: 'SUMIF', hint: 'Buat rekap omzet per produk.', answerType: 'text' },
    { questionText: 'Rumus apa yang paling tepat untuk menghitung total penjualan per produk?', correctAnswer: 'SUMIF', acceptedAnswers: ['SUMIF'], skill: 'SUMIF', hint: 'Butuh penjumlahan dengan satu kriteria.', answerType: 'text' },
    { questionText: 'Berapa persen growth omzet dari hari pertama ke hari terakhir?', correctAnswer: '16.60%', acceptedAnswers: ['16.60%', '16,60%', '16.6'], skill: 'growth calculation', hint: 'Bandingkan total omzet tanggal terakhir dengan tanggal pertama.', answerType: 'number' },
    { questionText: 'Siapa sales dengan total omzet bersih tertinggi?', correctAnswer: 'Dimas', acceptedAnswers: ['Dimas', 'dimas'], skill: 'SUMIF', hint: 'Buat rekap omzet per sales.', answerType: 'text' },
    { questionText: 'Fungsi apa yang cocok untuk menghitung jumlah transaksi berdasarkan nama sales?', correctAnswer: 'COUNTIF', acceptedAnswers: ['COUNTIF'], skill: 'COUNTIF', hint: 'Butuh menghitung baris dengan satu kriteria.', answerType: 'text' },
    { questionText: 'Fungsi apa yang cocok untuk menghitung omzet berdasarkan sales dan produk sekaligus?', correctAnswer: 'SUMIFS', acceptedAnswers: ['SUMIFS'], skill: 'SUMIFS', hint: 'Butuh penjumlahan dengan lebih dari satu kriteria.', answerType: 'text' },
    { questionText: 'Kolom apa yang perlu dikalikan untuk menghitung omzet kotor per transaksi?', correctAnswer: 'Qty dan Harga Satuan', acceptedAnswers: ['Qty dan Harga Satuan', 'qty harga satuan', 'qty x harga satuan'], skill: 'perkalian', hint: 'Omzet kotor berasal dari jumlah unit dan harga per unit.', answerType: 'text' },
    { questionText: 'Jika ada diskon, hasil akhir transaksi sebaiknya disebut apa?', correctAnswer: 'Omzet bersih', acceptedAnswers: ['Omzet bersih', 'omzet bersih'], skill: 'discount calculation', hint: 'Nilai setelah potongan diskon.', answerType: 'text' },
    { questionText: 'Fungsi apa yang paling cepat untuk mencari nilai omzet terbesar?', correctAnswer: 'MAX', acceptedAnswers: ['MAX'], skill: 'MAX', hint: 'Cari nilai paling besar pada range angka.', answerType: 'text' },
    { questionText: 'Fungsi apa yang paling cepat untuk mencari nilai omzet terkecil?', correctAnswer: 'MIN', acceptedAnswers: ['MIN'], skill: 'MIN', hint: 'Cari nilai paling kecil pada range angka.', answerType: 'text' },
    { questionText: 'Fungsi apa untuk menghitung rata-rata omzet per transaksi?', correctAnswer: 'AVERAGE', acceptedAnswers: ['AVERAGE'], skill: 'AVERAGE', hint: 'Butuh rata-rata dari range angka.', answerType: 'text' },
    { questionText: 'Fungsi apa untuk menghitung jumlah invoice unik secara praktis di Excel 365?', correctAnswer: 'UNIQUE', acceptedAnswers: ['UNIQUE'], skill: 'UNIQUE', hint: 'Ambil daftar unik dulu sebelum dihitung.', answerType: 'text' },
    { questionText: 'Fungsi apa untuk mengambil daftar transaksi hanya wilayah tertentu?', correctAnswer: 'FILTER', acceptedAnswers: ['FILTER'], skill: 'FILTER', hint: 'Menampilkan baris yang memenuhi kriteria.', answerType: 'text' },
    { questionText: 'Fungsi apa untuk mengurutkan produk berdasarkan omzet tertinggi?', correctAnswer: 'SORT', acceptedAnswers: ['SORT', 'SORTBY'], skill: 'SORT', hint: 'Urutkan rekap dari nilai terbesar.', answerType: 'text' },
    { questionText: 'Fungsi modern apa yang lebih fleksibel untuk mengambil nama produk dari kode produk?', correctAnswer: 'XLOOKUP', acceptedAnswers: ['XLOOKUP'], skill: 'XLOOKUP', hint: 'Lookup modern bisa mencari ke kiri atau kanan.', answerType: 'text' },
    { questionText: 'Rumus logika apa untuk memberi status Target Tercapai atau Belum?', correctAnswer: 'IF', acceptedAnswers: ['IF'], skill: 'IF', hint: 'Gunakan percabangan benar/salah.', answerType: 'text' },
    { questionText: 'Fungsi apa untuk menghitung jumlah transaksi dengan status tertentu?', correctAnswer: 'COUNTIF', acceptedAnswers: ['COUNTIF'], skill: 'COUNTIF', hint: 'Hitung jumlah data berdasarkan teks status.', answerType: 'text' },
    { questionText: 'Fungsi apa untuk menghitung omzet dengan kriteria tanggal dan produk?', correctAnswer: 'SUMIFS', acceptedAnswers: ['SUMIFS'], skill: 'SUMIFS', hint: 'Butuh lebih dari satu kriteria.', answerType: 'text' },
    { questionText: 'Format apa yang paling cocok untuk kolom tanggal transaksi?', correctAnswer: 'Date', acceptedAnswers: ['Date', 'Tanggal', 'date'], skill: 'format data', hint: 'Tanggal harus dikenali Excel sebagai date.', answerType: 'text' },
    { questionText: 'Format apa yang paling cocok untuk kolom omzet?', correctAnswer: 'Currency', acceptedAnswers: ['Currency', 'Accounting', 'Rupiah', 'Mata uang'], skill: 'format data', hint: 'Nilai uang lebih mudah dibaca dengan format mata uang.', answerType: 'text' },
    { questionText: 'Fitur apa yang sebaiknya dipakai agar range data otomatis ikut bertambah?', correctAnswer: 'Excel Table', acceptedAnswers: ['Excel Table', 'Table', 'Format as Table', 'Ctrl T'], skill: 'Excel Table', hint: 'Ubah range menjadi tabel resmi Excel.', answerType: 'text' },
    { questionText: 'Shortcut apa untuk mengubah range menjadi Excel Table?', correctAnswer: 'Ctrl + T', acceptedAnswers: ['Ctrl + T', 'Ctrl T'], skill: 'shortcut', hint: 'Shortcut table di Excel Windows.', answerType: 'text' },
    { questionText: 'Shortcut apa untuk mengaktifkan filter cepat?', correctAnswer: 'Ctrl + Shift + L', acceptedAnswers: ['Ctrl + Shift + L', 'Ctrl Shift L'], skill: 'shortcut', hint: 'Filter bisa dinyalakan tanpa klik ribbon.', answerType: 'text' },
    { questionText: 'Fitur apa untuk menghapus invoice yang dobel?', correctAnswer: 'Remove Duplicates', acceptedAnswers: ['Remove Duplicates', 'hapus duplikat'], skill: 'data cleaning', hint: 'Ada di tab Data.', answerType: 'text' },
    { questionText: 'Fitur apa untuk membatasi input kategori agar konsisten?', correctAnswer: 'Data Validation', acceptedAnswers: ['Data Validation', 'validasi data'], skill: 'data validation', hint: 'Bisa dibuat dropdown kategori.', answerType: 'text' },
    { questionText: 'Fitur apa untuk menandai omzet di bawah target dengan warna otomatis?', correctAnswer: 'Conditional Formatting', acceptedAnswers: ['Conditional Formatting', 'format bersyarat'], skill: 'conditional formatting', hint: 'Warna otomatis berdasarkan aturan.', answerType: 'text' },
    { questionText: 'Fitur apa yang cocok untuk membuat ringkasan omzet per produk tanpa banyak rumus?', correctAnswer: 'Pivot Table', acceptedAnswers: ['Pivot Table', 'PivotTable'], skill: 'Pivot Table', hint: 'Ringkas data transaksi menjadi laporan.', answerType: 'text' },
    { questionText: 'Bagian Pivot Table mana yang cocok untuk nama produk?', correctAnswer: 'Rows', acceptedAnswers: ['Rows', 'Baris'], skill: 'Pivot Table', hint: 'Produk biasanya jadi label baris.', answerType: 'text' },
    { questionText: 'Bagian Pivot Table mana yang cocok untuk nilai omzet?', correctAnswer: 'Values', acceptedAnswers: ['Values', 'Nilai'], skill: 'Pivot Table', hint: 'Angka yang dijumlahkan masuk area values.', answerType: 'text' },
    { questionText: 'Chart apa yang cocok untuk membandingkan omzet antar produk?', correctAnswer: 'Column Chart', acceptedAnswers: ['Column Chart', 'Bar Chart', 'Grafik kolom', 'Grafik batang'], skill: 'chart', hint: 'Gunakan grafik perbandingan kategori.', answerType: 'text' },
    { questionText: 'Chart apa yang cocok untuk melihat tren omzet per tanggal?', correctAnswer: 'Line Chart', acceptedAnswers: ['Line Chart', 'Grafik garis'], skill: 'chart', hint: 'Tren waktu cocok memakai garis.', answerType: 'text' },
    { questionText: 'KPI apa yang menunjukkan total nilai penjualan?', correctAnswer: 'Omzet', acceptedAnswers: ['Omzet', 'Revenue', 'Penjualan'], skill: 'KPI', hint: 'Nilai total transaksi.', answerType: 'text' },
    { questionText: 'KPI apa yang menunjukkan jumlah transaksi?', correctAnswer: 'Jumlah transaksi', acceptedAnswers: ['Jumlah transaksi', 'transaksi', 'count transaksi'], skill: 'KPI', hint: 'Bukan nilai uang, tapi jumlah baris/order.', answerType: 'text' },
    { questionText: 'KPI apa yang menunjukkan rata-rata nilai order?', correctAnswer: 'Average Order Value', acceptedAnswers: ['Average Order Value', 'AOV', 'rata-rata order'], skill: 'KPI', hint: 'Omzet dibagi jumlah transaksi.', answerType: 'text' },
    { questionText: 'Rumus konsep untuk Average Order Value adalah apa?', correctAnswer: 'Omzet / Jumlah Transaksi', acceptedAnswers: ['Omzet / Jumlah Transaksi', 'omzet/jumlah transaksi', 'revenue/order'], skill: 'KPI', hint: 'Total nilai dibagi jumlah order.', answerType: 'text' },
    { questionText: 'Rumus konsep growth adalah apa?', correctAnswer: '(Nilai Baru - Nilai Lama) / Nilai Lama', acceptedAnswers: ['(Nilai Baru - Nilai Lama) / Nilai Lama', '(baru-lama)/lama'], skill: 'growth calculation', hint: 'Bandingkan perubahan terhadap nilai lama.', answerType: 'text' },
    { questionText: 'Jika ingin menghitung omzet per wilayah dan sales, fungsi apa yang paling cocok?', correctAnswer: 'SUMIFS', acceptedAnswers: ['SUMIFS'], skill: 'SUMIFS', hint: 'Ada dua kriteria: wilayah dan sales.', answerType: 'text' },
    { questionText: 'Jika ingin menghitung transaksi per wilayah dan status, fungsi apa yang paling cocok?', correctAnswer: 'COUNTIFS', acceptedAnswers: ['COUNTIFS'], skill: 'COUNTIFS', hint: 'Hitung dengan lebih dari satu kriteria.', answerType: 'text' },
    { questionText: 'Fungsi apa untuk menggabungkan teks invoice dan nama sales?', correctAnswer: 'TEXTJOIN', acceptedAnswers: ['TEXTJOIN', 'CONCAT', 'CONCATENATE'], skill: 'text function', hint: 'Gabungkan beberapa teks dalam satu cell.', answerType: 'text' },
    { questionText: 'Fungsi apa untuk merapikan spasi berlebih pada nama sales?', correctAnswer: 'TRIM', acceptedAnswers: ['TRIM'], skill: 'data cleaning', hint: 'Membersihkan spasi ekstra.', answerType: 'text' },
    { questionText: 'Fungsi apa untuk membersihkan karakter tidak terlihat dari hasil export?', correctAnswer: 'CLEAN', acceptedAnswers: ['CLEAN'], skill: 'data cleaning', hint: 'Membersihkan karakter non-printable.', answerType: 'text' },
    { questionText: 'Fungsi apa untuk mengubah nama produk menjadi format Proper Case?', correctAnswer: 'PROPER', acceptedAnswers: ['PROPER'], skill: 'text function', hint: 'Huruf awal kata menjadi kapital.', answerType: 'text' },
    { questionText: 'Fungsi apa untuk mengambil bulan dari tanggal transaksi?', correctAnswer: 'MONTH', acceptedAnswers: ['MONTH'], skill: 'date function', hint: 'Ambil angka bulan dari tanggal.', answerType: 'text' },
    { questionText: 'Fungsi apa untuk mengambil tahun dari tanggal transaksi?', correctAnswer: 'YEAR', acceptedAnswers: ['YEAR'], skill: 'date function', hint: 'Ambil tahun dari tanggal.', answerType: 'text' },
    { questionText: 'Fungsi apa untuk mencari akhir bulan dari tanggal transaksi?', correctAnswer: 'EOMONTH', acceptedAnswers: ['EOMONTH'], skill: 'date function', hint: 'Akhir bulan berguna untuk rekap bulanan.', answerType: 'text' },
    { questionText: 'Jika kolom angka terbaca sebagai teks, fitur apa yang bisa membantu konversi cepat?', correctAnswer: 'Text to Columns', acceptedAnswers: ['Text to Columns', 'Convert to Number'], skill: 'data cleaning', hint: 'Ada di tab Data atau warning cell.', answerType: 'text' },
    { questionText: 'Kesalahan apa yang sering membuat sort/filter bermasalah pada data transaksi?', correctAnswer: 'Merge Cells', acceptedAnswers: ['Merge Cells', 'Merge Cell', 'cell digabung'], skill: 'data hygiene', hint: 'Hindari penggabungan cell di data mentah.', answerType: 'text' },
    { questionText: 'Struktur sheet yang baik untuk dashboard adalah memisahkan data mentah dan apa?', correctAnswer: 'Dashboard', acceptedAnswers: ['Dashboard', 'laporan', 'summary'], skill: 'workbook structure', hint: 'Data input sebaiknya tidak dicampur dengan tampilan laporan.', answerType: 'text' },
    { questionText: 'Sheet apa yang sebaiknya dipakai sebagai sumber utama perhitungan?', correctAnswer: 'Dataset', acceptedAnswers: ['Dataset', 'Data', 'Sheet Dataset'], skill: 'workbook structure', hint: 'Gunakan data mentah yang rapi.', answerType: 'text' },
    { questionText: 'Sheet apa yang membantu memahami konteks soal latihan?', correctAnswer: 'Questions', acceptedAnswers: ['Questions', 'Pertanyaan', 'Sheet Questions'], skill: 'workbook structure', hint: 'Sheet ini berisi arahan soal.', answerType: 'text' },
    { questionText: 'Sheet apa yang biasanya berisi contoh hasil yang diharapkan?', correctAnswer: 'Output Expected', acceptedAnswers: ['Output Expected', 'Expected Output'], skill: 'workbook structure', hint: 'Dipakai sebagai referensi bentuk output.', answerType: 'text' },
    { questionText: 'Apa yang harus dicek pertama sebelum membuat rumus rekap penjualan?', correctAnswer: 'Struktur data', acceptedAnswers: ['Struktur data', 'header', 'kolom data'], skill: 'data analysis', hint: 'Pahami header dan tipe data dulu.', answerType: 'text' },
    { questionText: 'Apa yang harus dilakukan sebelum submit jawaban di web?', correctAnswer: 'Cek ulang jawaban akhir', acceptedAnswers: ['Cek ulang jawaban akhir', 'cek jawaban', 'validasi jawaban'], skill: 'quality check', hint: 'Pastikan angka/teks final sudah sesuai pertanyaan.', answerType: 'text' },
    { questionText: 'Jika hasil SUMIF nol padahal data ada, hal apa yang paling sering perlu dicek?', correctAnswer: 'Kriteria tidak sama', acceptedAnswers: ['Kriteria tidak sama', 'criteria mismatch', 'kriteria beda'], skill: 'troubleshooting', hint: 'Cek spasi, ejaan, dan format data.', answerType: 'text' },
    { questionText: 'Jika hasil angka terlihat aneh, format data apa yang perlu dicek?', correctAnswer: 'Number format', acceptedAnswers: ['Number format', 'format angka', 'angka sebagai teks'], skill: 'troubleshooting', hint: 'Pastikan angka bukan teks.', answerType: 'text' },
    { questionText: 'Jika laporan dipakai tim, apa yang sebaiknya dilakukan pada area rumus?', correctAnswer: 'Protect Sheet', acceptedAnswers: ['Protect Sheet', 'proteksi sheet', 'kunci rumus'], skill: 'file protection', hint: 'Lindungi formula dari edit tidak sengaja.', answerType: 'text' },
    { questionText: 'Apa kebiasaan aman sebelum mengubah file kasus yang penting?', correctAnswer: 'Backup file', acceptedAnswers: ['Backup file', 'buat salinan', 'copy file'], skill: 'file safety', hint: 'Simpan salinan sebelum eksperimen.', answerType: 'text' },
    { questionText: 'Apa output utama yang dicari dari latihan rekap penjualan harian?', correctAnswer: 'Ringkasan penjualan', acceptedAnswers: ['Ringkasan penjualan', 'rekap penjualan', 'summary penjualan'], skill: 'reporting', hint: 'Tujuan akhirnya adalah laporan yang mudah dibaca.', answerType: 'text' },
    { questionText: 'Apa indikator bahwa kamu sudah siap naik ke paket soal lebih panjang?', correctAnswer: 'Akurasi stabil', acceptedAnswers: ['Akurasi stabil', 'akurasi tinggi', 'jawaban konsisten'], skill: 'self assessment', hint: 'Bukan cuma cepat, tapi juga benar.', answerType: 'text' },
  ]
  return bank.slice(0, 60).map(makeRekapQuestion)
}
function expandQuestions(playCase: SeedPlayCase) {
  if (playCase.id === 'rekap-penjualan-harian') return rekapPenjualanQuestionBank()

  const originals = seedPlayQuestions
    .filter((question) => question.caseId === playCase.id)
    .sort((a, b) => a.orderIndex - b.orderIndex)

  if (originals.length >= 10) return originals.slice(0, 60)

  const expanded: SeedPlayQuestion[] = [...originals]
  let cursor = 0
  while (expanded.length < 10 && originals.length) {
    const source = originals[cursor % originals.length]
    expanded.push({
      ...source,
      id: `${source.id}-extra-${expanded.length + 1}`,
      orderIndex: expanded.length + 1,
      level: expanded.length >= 9 ? 'bonus' : source.level,
      questionText: `${source.questionText} (checkpoint tambahan)`,
      hint: source.hint ? `${source.hint} Fokus ke hasil akhirnya.` : 'Fokus isi hasil akhir dari file Excel.',
      isBonus: expanded.length >= 9,
    })
    cursor += 1
  }
  return expanded
}

async function seedPlayArena() {
  await prisma.playQuestion.deleteMany()
  await prisma.playCase.deleteMany()

  for (const playCase of seedPlayCases) {
    const questions = expandQuestions(playCase)
    await prisma.playCase.create({
      data: {
        id: playCase.id,
        slug: playCase.slug,
        title: playCase.title,
        subtitle: playCase.professionCategory ?? playCase.category,
        description: playCase.description,
        category: playCase.category,
        mode: normalizePlayMode(playCase.mode),
        difficulty: normalizeDifficulty(playCase.level),
        level: playCase.level,
        estimatedMinutes: playCase.durationMinutes,
        basePoints: playCase.totalPoints,
        isPublished: playCase.isPublished,
        isPremium: playCase.isPremiumSolution,
        hasDownload: playCase.file.hasDownload,
        downloadUrl: playCase.file.fileUrl,
        workbookSheets: playCase.file.sheets,
        tags: Array.from(new Set([playCase.category, ...playCase.formulas, ...playCase.skills])),
        skills: playCase.skills,
        heroCopy: `Di test ini kamu akan menyelesaikan ${playCase.title.toLowerCase()} dari file kasus nyata. Download workbook, kerjakan di Excel, lalu submit jawaban akhir di sini.`,
        instruction: playCase.rules.join('\n'),
        questions: {
          create: questions.map((question, index) => ({
            id: question.id,
            order: index + 1,
            questionText: question.questionText,
            helperText: question.hint,
            type: questionType(question),
            difficulty: normalizeDifficulty(playCase.level),
            points: question.points,
            correctAnswer: question.correctAnswer,
            acceptedAnswers: question.acceptedAnswers ?? [question.correctAnswer],
            explanation: question.hint ?? 'Cek lagi perhitungan di file Excel dan pastikan hasil akhirnya sesuai pertanyaan.',
            formulaHint: question.formulaSkills.join(', '),
            skill: question.formulaSkills[0] ?? playCase.skills[0] ?? 'Excel dasar',
            levelLabel: levelLabel(index + 1, question.level),
            isPublished: true,
          })),
        },
      },
    })
  }
}

async function main() {
  await prisma.inhouseRequest.deleteMany()
  await prisma.portfolio.deleteMany()
  await prisma.certificate.deleteMany()
  await prisma.classProgram.deleteMany()
  await prisma.template.deleteMany()
  await prisma.tip.deleteMany()
  await prisma.challenge.deleteMany()
  await prisma.testExplanation.deleteMany()
  await prisma.digitalProduct.deleteMany()
  await prisma.testExcel.deleteMany()
  await prisma.video.deleteMany()
  await prisma.article.deleteMany()
  await seedPlayArena()

  await Promise.all(
    articlesSeed.map((article) =>
      prisma.article.upsert({
        where: { slug: article.slug },
        update: article,
        create: article,
      }),
    ),
  )
  await Promise.all(
    videosSeed.map((video) =>
      prisma.video.upsert({
        where: { slug: video.slug },
        update: video,
        create: video,
      }),
    ),
  )
  const sumifTest = await prisma.testExcel.create({
    data: {
      title: 'Test Excel SUMIF Penjualan',
      slug: 'test-sumif-penjualan',
      description: 'Uji kemampuan menghitung total penjualan berdasarkan kategori produk.',
      question: 'Tuliskan rumus untuk menjumlahkan total penjualan produk kategori A dari kolom C dan nilai penjualan D.',
      level: 'Pemula',
      category: 'Rumus Dasar',
      expectedAnswer: '=SUMIF(C:C,"A",D:D)',
      autoCheckType: 'normalized_text',
      estimatedTime: '10 menit',
      formulaSkills: ['SUMIF', 'Range', 'Kriteria'],
    },
  })

  const countifTest = await prisma.testExcel.create({
    data: {
      title: 'Test Excel COUNTIF Data Karyawan',
      slug: 'test-countif-data-karyawan',
      description: 'Cek kemampuan menghitung jumlah data berdasarkan departemen.',
      question: 'Tuliskan rumus untuk menghitung jumlah karyawan HRD jika departemen berada di kolom B.',
      level: 'Pemula',
      category: 'Administrasi',
      expectedAnswer: '=COUNTIF(B:B,"HRD")',
      autoCheckType: 'normalized_text',
      estimatedTime: '8 menit',
      formulaSkills: ['COUNTIF', 'Kriteria Teks'],
    },
  })

  for (const test of [sumifTest, countifTest]) {
    await prisma.digitalProduct.createMany({
      data: [
        {
          relatedTestId: test.id,
          type: 'answer',
          title: `Jawaban ${test.title}`,
          slug: `jawaban-${test.slug}`,
          description: 'Produk digital berisi jawaban ringkas. Payment belum aktif di MVP.',
          price: 5000,
          accessType: 'paid',
        },
        {
          relatedTestId: test.id,
          type: 'answer_tutorial',
          title: `Jawaban + Tutorial ${test.title}`,
          slug: `tutorial-${test.slug}`,
          description: 'Produk digital berisi jawaban dan tutorial langkah demi langkah. Payment belum aktif di MVP.',
          price: 15000,
          accessType: 'paid',
        },
      ],
    })

    await prisma.testExplanation.create({
      data: {
        testId: test.id,
        answerText: `Jawaban lengkap untuk ${test.title}`,
        tutorialText: `Tutorial langkah demi langkah untuk ${test.title}`,
        solutionFileUrl: null,
        isLocked: true,
      },
    })
  }

  await prisma.challenge.createMany({
    data: [
      {
        title: 'Rapikan Data Customer dari Sheet 1',
        slug: 'rapikan-data-customer-sheet-1',
        description: 'Tantangan praktik membersihkan nama, email, dan nomor HP customer.',
        sheetLabel: 'Sheet 1',
        taskInstruction: 'Bersihkan spasi berlebih, tandai email tidak valid, dan pisahkan nomor HP kosong.',
        level: 'Pemula',
        category: 'Data Cleaning',
        estimatedTime: '25 menit',
      },
      {
        title: 'Buat Rekap Penjualan Sederhana',
        slug: 'rekap-penjualan-sederhana-sheet-1',
        description: 'Buat ringkasan total penjualan per produk dari data transaksi sederhana.',
        sheetLabel: 'Sheet 1',
        taskInstruction: 'Gunakan rumus atau pivot sederhana untuk membuat tabel rekap per produk.',
        level: 'Pemula',
        category: 'Reporting',
        estimatedTime: '30 menit',
      },
    ],
  })

  await prisma.tip.createMany({
    data: excelTipsSeed,
  })

  await prisma.template.createMany({
    data: [
      {
        title: 'Dashboard Sales',
        slug: 'dashboard-sales',
        description: 'Template dashboard untuk memantau penjualan, target, dan performa produk.',
        category: 'Sales',
        targetUser: 'Sales, owner bisnis, marketing',
        features: ['Ringkasan penjualan', 'Grafik target', 'Top produk'],
        price: 79000,
        isPaid: true,
      },
      {
        title: 'Inventory UMKM',
        slug: 'inventory-umkm',
        description: 'Template untuk memonitor stok masuk, keluar, dan barang yang perlu restock.',
        category: 'Operasional',
        targetUser: 'UMKM, gudang, admin operasional',
        features: ['Stok masuk', 'Stok keluar', 'Restock alert'],
        price: 49000,
        isPaid: true,
      },
    ],
  })

  await prisma.classProgram.createMany({
    data: [
      {
        title: 'Kelas Online Excel Dasar',
        slug: 'kelas-online-excel-dasar',
        format: 'online',
        description: 'Kelas live untuk belajar Excel dari nol dengan panduan mentor.',
        targetUser: 'Pemula, mahasiswa, fresh graduate, admin kantor',
        topics: ['Dasar Excel', 'Rumus dasar', 'Format data'],
        ctaLabel: 'Tanya Jadwal',
      },
      {
        title: 'Kelas Offline Excel untuk Kerja',
        slug: 'kelas-offline-excel-kerja',
        format: 'offline',
        description: 'Kelas tatap muka untuk praktik intensif memakai studi kasus pekerjaan.',
        targetUser: 'Karyawan, admin, finance, HRD, operasional',
        topics: ['Data cleaning', 'Rumus kerja', 'Pivot Table', 'Dashboard sederhana'],
        ctaLabel: 'Konsultasi Kelas',
      },
      {
        title: 'Kelas Private Excel',
        slug: 'kelas-private-excel',
        format: 'private',
        description: 'Sesi private sesuai kebutuhan pekerjaan atau target skill peserta.',
        targetUser: 'Individu atau tim kecil',
        topics: ['Materi custom', 'Review file kerja', 'Formula troubleshooting'],
        ctaLabel: 'Hubungi Admin',
      },
    ],
  })

  await prisma.certificate.create({
    data: {
      userName: 'Peserta Demo',
      certificateCode: 'BE-CERT-0001',
      testTitle: 'Test Excel Dasar',
      score: 88,
      level: 'Pemula Siap Kerja',
      issuedAt: new Date('2026-06-19'),
      skills: ['Membaca range', 'Menggunakan kriteria', 'Menyusun rumus dasar'],
      formulaMastered: ['SUM', 'AVERAGE', 'IF', 'COUNTIF', 'SUMIF', 'VLOOKUP', 'XLOOKUP', 'Pivot Table dasar'],
    },
  })

  await prisma.portfolio.create({
    data: {
      username: 'peserta-demo',
      displayName: 'Peserta Demo',
      summary: 'Portfolio skill Excel yang berkembang seiring peserta menyelesaikan Test Excel dan Challenge praktik.',
      testsCompleted: 12,
      averageScore: 86,
      skills: ['Rumus dasar', 'Data cleaning', 'Rekap laporan', 'Pivot Table dasar'],
      formulaMastered: ['SUM', 'COUNTIF', 'SUMIF', 'IF', 'VLOOKUP', 'XLOOKUP'],
      certificates: ['BE-CERT-0001'],
    },
  })

  const demoPasswordHash = await hashPassword('password123')
  const existingDemoUser = await prisma.user.findFirst({
    where: { OR: [{ email: 'demo@bisaexcel.com' }, { username: 'demo-user' }] },
  })

  const demoUser = existingDemoUser
    ? await prisma.user.update({
      where: { id: existingDemoUser.id },
      data: {
        name: 'Demo User',
        username: 'demo-user',
        email: 'demo@bisaexcel.com',
        passwordHash: demoPasswordHash,
      },
    })
    : await prisma.user.create({
      data: {
        name: 'Demo User',
        username: 'demo-user',
        email: 'demo@bisaexcel.com',
        passwordHash: demoPasswordHash,
      },
    })

  await prisma.userProfile.upsert({
    where: { userId: demoUser.id },
    update: {
      bio: 'Akun demo untuk mencoba dashboard, progress, dan penyimpanan hasil latihan BisaExcel.',
      level: 'Pemula',
      headline: 'Belajar Excel dari nol',
    },
    create: {
      userId: demoUser.id,
      bio: 'Akun demo untuk mencoba dashboard, progress, dan penyimpanan hasil latihan BisaExcel.',
      level: 'Pemula',
      headline: 'Belajar Excel dari nol',
    },
  })

  await prisma.userProgress.upsert({
    where: { userId: demoUser.id },
    update: {},
    create: { userId: demoUser.id },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })

