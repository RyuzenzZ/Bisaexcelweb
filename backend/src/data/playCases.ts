export type PlayLevel = 'Pemula' | 'Dasar' | 'Menengah' | 'Mahir' | 'Advanced' | 'Professional'
export type PlayMode = 'latihan' | 'challenge' | 'kompetisi'
export type PlayQuestionLevel = 1 | 2 | 3 | 4 | 5 | 'bonus'
export type PlayInputType = 'manual_input' | 'multiple_choice'
export type PlayAnswerType = 'number' | 'text' | 'choice'

export type PlayCase = {
  id: string
  title: string
  slug: string
  description: string
  category: string
  professionCategory?: string
  level: PlayLevel
  mode: PlayMode
  durationMinutes: number
  totalPoints: number
  questionCount: number
  skills: string[]
  formulas: string[]
  file: {
    fileName?: string
    fileUrl?: string
    hasDownload: boolean
    sheets: string[]
  }
  rules: string[]
  datasetDescription: string
  isPublished: boolean
  isPremiumSolution: boolean
  createdAt?: string
  updatedAt?: string
}

export type PlayQuestion = {
  id: string
  caseId: string
  orderIndex: number
  level: PlayQuestionLevel
  questionText: string
  inputType: PlayInputType
  answerType: PlayAnswerType
  choices?: { label: string; value: string }[]
  correctAnswer: string
  acceptedAnswers?: string[]
  points: number
  formulaSkills: string[]
  hint?: string
  isBonus: boolean
}

export type PlayAnswerSubmission = {
  questionId: string
  answer: string
}

export type PlayResult = {
  caseId: string
  score: number
  totalPoints: number
  accuracy: number
  correctCount: number
  questionCount: number
  durationSeconds?: number
  isSaved: boolean
  answers: {
    questionId: string
    userAnswer: string
    isCorrect: boolean
    pointsEarned: number
    level: PlayQuestionLevel
  }[]
  skillsEarned: string[]
  message: string
}

export const playCases: PlayCase[] = [
  {
    "id": "rekap-penjualan-harian",
    "title": "Rekap Penjualan Harian",
    "slug": "rekap-penjualan-harian",
    "description": "Melatih kemampuan membaca transaksi penjualan dan membuat rekap omzet sederhana.",
    "category": "Admin Sales",
    "professionCategory": "Admin Sales",
    "level": "Dasar",
    "mode": "latihan",
    "durationMinutes": 30,
    "totalPoints": 100,
    "questionCount": 6,
    "skills": [
      "SUM",
      "COUNT",
      "SUMIF",
      "MAX",
      "growth calculation"
    ],
    "formulas": [
      "SUM",
      "COUNT",
      "SUMIF",
      "MAX"
    ],
    "file": {
      "fileName": "rekap-penjualan-harian.xlsx",
      "fileUrl": "/cases/rekap-penjualan-harian.xlsx",
      "hasDownload": true,
      "sheets": [
        "Rules",
        "Dataset",
        "Questions",
        "Reference",
        "Output Expected"
      ]
    },
    "rules": [
      "Buka sheet Dataset dan pahami struktur data transaksi.",
      "Kerjakan perhitungan di Excel atau Google Sheets.",
      "Isi jawaban akhir di web BisaExcel.",
      "Tidak ada pengurangan poin untuk jawaban salah.",
      "Kunci jawaban tidak tersedia di file latihan."
    ],
    "datasetDescription": "Dataset berisi tanggal transaksi, invoice, sales, produk, kategori, wilayah, qty, harga satuan, dan diskon.",
    "isPublished": true,
    "isPremiumSolution": true
  },
  {
    "id": "upah-lembur-karyawan",
    "title": "Upah dan Lembur Karyawan",
    "slug": "upah-lembur-karyawan",
    "description": "Melatih perhitungan upah, lembur, dan rekap data HRD.",
    "category": "Admin HRD",
    "professionCategory": "Admin HRD",
    "level": "Menengah",
    "mode": "latihan",
    "durationMinutes": 40,
    "totalPoints": 100,
    "questionCount": 6,
    "skills": [
      "IF",
      "SUM",
      "SUMIF",
      "perhitungan lembur"
    ],
    "formulas": [
      "IF",
      "SUM",
      "SUMIF"
    ],
    "file": {
      "fileName": "upah-lembur-karyawan.xlsx",
      "fileUrl": "/cases/upah-lembur-karyawan.xlsx",
      "hasDownload": true,
      "sheets": [
        "Rules",
        "Dataset",
        "Questions",
        "Reference",
        "Output Expected"
      ]
    },
    "rules": [
      "Baca data absensi dan lembur dengan teliti.",
      "Hitung upah lembur berdasarkan Jam Lembur x Tarif Lembur/Jam.",
      "Isi jawaban akhir di web BisaExcel.",
      "Jawaban salah tidak mengurangi poin.",
      "Kunci jawaban tidak tersedia di file public."
    ],
    "datasetDescription": "Dataset berisi tanggal, ID karyawan, nama, divisi, jam kerja, jam lembur, tarif harian, tarif lembur, dan status hari.",
    "isPublished": true,
    "isPremiumSolution": true
  },
  {
    "id": "tes-excel-staff-admin",
    "title": "Tes Excel Staff Admin",
    "slug": "tes-excel-staff-admin",
    "description": "Simulasi soal Excel untuk posisi staff admin.",
    "category": "Persiapan Karir",
    "professionCategory": "Persiapan Karir",
    "level": "Dasar",
    "mode": "kompetisi",
    "durationMinutes": 30,
    "totalPoints": 100,
    "questionCount": 6,
    "skills": [
      "SUM",
      "AVERAGE",
      "COUNTIF",
      "SUMIF",
      "SUMPRODUCT"
    ],
    "formulas": [
      "SUM",
      "AVERAGE",
      "COUNTIF",
      "SUMIF"
    ],
    "file": {
      "fileName": "tes-excel-staff-admin.xlsx",
      "fileUrl": "/cases/tes-excel-staff-admin.xlsx",
      "hasDownload": true,
      "sheets": [
        "Rules",
        "Dataset",
        "Questions",
        "Reference",
        "Output Expected"
      ]
    },
    "rules": [
      "Kerjakan soal seperti simulasi tes Excel staff admin.",
      "Gunakan rumus dasar dan fungsi rekap sederhana.",
      "Isi jawaban akhir di web BisaExcel.",
      "Tidak ada minus untuk jawaban salah.",
      "Jawaban detail tersedia sebagai pembahasan premium nantinya."
    ],
    "datasetDescription": "Dataset berisi customer, kota, produk, qty, harga, status pembayaran, dan kode sales.",
    "isPublished": true,
    "isPremiumSolution": true
  },
  {
    "id": "growth-omzet-penjualan",
    "title": "Growth Omzet Penjualan",
    "slug": "growth-omzet-penjualan",
    "description": "Melatih analisis pertumbuhan omzet penjualan.",
    "category": "Admin Sales",
    "professionCategory": "Admin Sales",
    "level": "Menengah",
    "mode": "kompetisi",
    "durationMinutes": 45,
    "totalPoints": 100,
    "questionCount": 6,
    "skills": [
      "persentase",
      "IF",
      "SUMIFS",
      "growth calculation"
    ],
    "formulas": [
      "IF",
      "SUMIFS"
    ],
    "file": {
      "fileName": "growth-omzet-penjualan.xlsx",
      "fileUrl": "/cases/growth-omzet-penjualan.xlsx",
      "hasDownload": true,
      "sheets": [
        "Rules",
        "Dataset",
        "Questions",
        "Reference",
        "Output Expected"
      ]
    },
    "rules": [
      "Bandingkan omzet 2025 dan 2026.",
      "Gunakan rumus persentase growth dengan benar.",
      "Isi jawaban akhir di web BisaExcel.",
      "Format persen boleh memakai titik atau koma desimal.",
      "Kunci jawaban tidak tersedia di file public."
    ],
    "datasetDescription": "Dataset berisi bulan, region, produk, omzet 2025, omzet 2026, dan target 2026.",
    "isPublished": true,
    "isPremiumSolution": true
  },
  {
    "id": "lookup-data-karyawan",
    "title": "Lookup Data Karyawan",
    "slug": "lookup-data-karyawan",
    "description": "Melatih pencarian data karyawan memakai fungsi lookup.",
    "category": "Lookup",
    "professionCategory": "Lookup",
    "level": "Menengah",
    "mode": "latihan",
    "durationMinutes": 35,
    "totalPoints": 100,
    "questionCount": 6,
    "skills": [
      "VLOOKUP",
      "XLOOKUP",
      "INDEX MATCH",
      "IFERROR"
    ],
    "formulas": [
      "VLOOKUP",
      "XLOOKUP",
      "INDEX",
      "MATCH",
      "IFERROR"
    ],
    "file": {
      "fileName": "lookup-data-karyawan.xlsx",
      "fileUrl": "/cases/lookup-data-karyawan.xlsx",
      "hasDownload": true,
      "sheets": [
        "Rules",
        "Dataset",
        "Questions",
        "Reference",
        "Output Expected"
      ]
    },
    "rules": [
      "Gunakan ID Karyawan sebagai kunci pencarian utama.",
      "Kerjakan lookup di Excel/Google Sheets.",
      "Isi jawaban akhir di web BisaExcel.",
      "Kunci jawaban tidak ada di file public.",
      "Gunakan rumus yang paling sesuai dengan kasus."
    ],
    "datasetDescription": "Dataset berisi ID karyawan, nama, divisi, jabatan, gaji pokok, tanggal masuk, status, dan manager.",
    "isPublished": true,
    "isPremiumSolution": true
  },
  {
    "id": "monitoring-training-karyawan",
    "title": "Monitoring Training Karyawan",
    "slug": "monitoring-training-karyawan",
    "description": "Melatih monitoring training karyawan dan dashboard ringkas.",
    "category": "Admin HRD / Dashboard",
    "professionCategory": "Admin HRD / Dashboard",
    "level": "Advanced",
    "mode": "challenge",
    "durationMinutes": 60,
    "totalPoints": 100,
    "questionCount": 6,
    "skills": [
      "COUNTIF",
      "AVERAGEIF",
      "SUMIFS",
      "IF",
      "dashboard summary"
    ],
    "formulas": [
      "COUNTIF",
      "COUNTIFS",
      "AVERAGEIF",
      "IF"
    ],
    "file": {
      "fileName": "monitoring-training-karyawan.xlsx",
      "fileUrl": "/cases/monitoring-training-karyawan.xlsx",
      "hasDownload": true,
      "sheets": [
        "Rules",
        "Dataset",
        "Questions",
        "Reference",
        "Output Expected"
      ]
    },
    "rules": [
      "Baca data training dan status peserta dengan teliti.",
      "Gunakan rumus rekap untuk menghitung kehadiran, kelulusan, dan rata-rata nilai.",
      "Isi jawaban akhir di web BisaExcel.",
      "Tidak ada minus untuk jawaban salah.",
      "File public tidak berisi kunci jawaban."
    ],
    "datasetDescription": "Dataset berisi peserta training, divisi, jenis training, tanggal, status hadir, pre-test, post-test, dan status lulus.",
    "isPublished": true,
    "isPremiumSolution": true
  }
]

export const playQuestions: PlayQuestion[] = [
  {
    "id": "rp-001",
    "caseId": "rekap-penjualan-harian",
    "orderIndex": 1,
    "level": 1,
    "questionText": "Berapa total transaksi pada dataset?",
    "inputType": "manual_input",
    "answerType": "number",
    "points": 10,
    "formulaSkills": [
      "COUNT",
      "membaca dataset"
    ],
    "hint": "Hitung jumlah baris transaksi.",
    "isBonus": false,
    "correctAnswer": "60",
    "acceptedAnswers": [
      "60",
      "60 transaksi"
    ]
  },
  {
    "id": "rp-002",
    "caseId": "rekap-penjualan-harian",
    "orderIndex": 2,
    "level": 2,
    "questionText": "Berapa total omzet bersih seluruh transaksi setelah diskon?",
    "inputType": "manual_input",
    "answerType": "number",
    "points": 15,
    "formulaSkills": [
      "SUM",
      "perkalian",
      "diskon"
    ],
    "hint": "Gunakan Qty, Harga Satuan, dan Diskon.",
    "isBonus": false,
    "correctAnswer": "4148700",
    "acceptedAnswers": [
      "4148700",
      "Rp 4.148.700",
      "4148700"
    ]
  },
  {
    "id": "rp-003",
    "caseId": "rekap-penjualan-harian",
    "orderIndex": 3,
    "level": 3,
    "questionText": "Produk apa yang memiliki total omzet bersih tertinggi?",
    "inputType": "manual_input",
    "answerType": "text",
    "points": 20,
    "formulaSkills": [
      "SUMIF",
      "rekap per produk"
    ],
    "hint": "Buat rekap omzet per produk.",
    "isBonus": false,
    "correctAnswer": "Matcha Latte",
    "acceptedAnswers": [
      "Matcha Latte",
      "matcha latte"
    ]
  },
  {
    "id": "rp-004",
    "caseId": "rekap-penjualan-harian",
    "orderIndex": 4,
    "level": 4,
    "questionText": "Rumus apa yang paling tepat untuk menghitung total penjualan per produk?",
    "inputType": "multiple_choice",
    "answerType": "choice",
    "choices": [
      {
        "label": "SUM",
        "value": "SUM"
      },
      {
        "label": "SUMIF",
        "value": "SUMIF"
      },
      {
        "label": "COUNTIF",
        "value": "COUNTIF"
      },
      {
        "label": "AVERAGE",
        "value": "AVERAGE"
      }
    ],
    "points": 20,
    "formulaSkills": [
      "SUMIF"
    ],
    "hint": "Butuh penjumlahan dengan kriteria produk.",
    "isBonus": false,
    "correctAnswer": "SUMIF",
    "acceptedAnswers": [
      "SUMIF"
    ]
  },
  {
    "id": "rp-005",
    "caseId": "rekap-penjualan-harian",
    "orderIndex": 5,
    "level": 5,
    "questionText": "Berapa persen growth omzet dari hari pertama ke hari terakhir? Bulatkan 2 angka desimal dan gunakan format persen.",
    "inputType": "manual_input",
    "answerType": "number",
    "points": 25,
    "formulaSkills": [
      "growth calculation",
      "SUMIF tanggal"
    ],
    "hint": "Bandingkan total omzet tanggal terakhir dengan tanggal pertama.",
    "isBonus": false,
    "correctAnswer": "16.60%",
    "acceptedAnswers": [
      "16.60%",
      "16,60%",
      "16.6"
    ]
  },
  {
    "id": "rp-bonus",
    "caseId": "rekap-penjualan-harian",
    "orderIndex": 6,
    "level": "bonus",
    "questionText": "Siapa sales dengan total omzet bersih tertinggi?",
    "inputType": "manual_input",
    "answerType": "text",
    "points": 10,
    "formulaSkills": [
      "SUMIF",
      "ranking sales"
    ],
    "hint": "Buat rekap omzet per sales.",
    "isBonus": true,
    "correctAnswer": "Dimas",
    "acceptedAnswers": [
      "Dimas",
      "dimas"
    ]
  },
  {
    "id": "ul-001",
    "caseId": "upah-lembur-karyawan",
    "orderIndex": 1,
    "level": 1,
    "questionText": "Berapa jumlah karyawan unik dalam dataset?",
    "inputType": "manual_input",
    "answerType": "number",
    "points": 10,
    "formulaSkills": [
      "COUNTUNIQUE",
      "membaca ID"
    ],
    "hint": "Hitung ID Karyawan unik.",
    "isBonus": false,
    "correctAnswer": "15",
    "acceptedAnswers": [
      "15"
    ]
  },
  {
    "id": "ul-002",
    "caseId": "upah-lembur-karyawan",
    "orderIndex": 2,
    "level": 2,
    "questionText": "Berapa total jam lembur seluruh karyawan?",
    "inputType": "manual_input",
    "answerType": "number",
    "points": 15,
    "formulaSkills": [
      "SUM"
    ],
    "hint": "Jumlahkan kolom Jam Lembur.",
    "isBonus": false,
    "correctAnswer": "106",
    "acceptedAnswers": [
      "106",
      "106 jam"
    ]
  },
  {
    "id": "ul-003",
    "caseId": "upah-lembur-karyawan",
    "orderIndex": 3,
    "level": 3,
    "questionText": "Berapa total upah lembur untuk Andi?",
    "inputType": "manual_input",
    "answerType": "number",
    "points": 20,
    "formulaSkills": [
      "SUMIF",
      "perkalian"
    ],
    "hint": "Jam Lembur x Tarif Lembur/Jam untuk nama Andi.",
    "isBonus": false,
    "correctAnswer": "170000",
    "acceptedAnswers": [
      "170000",
      "Rp 170.000",
      "170000"
    ]
  },
  {
    "id": "ul-004",
    "caseId": "upah-lembur-karyawan",
    "orderIndex": 4,
    "level": 4,
    "questionText": "Divisi mana yang memiliki total jam lembur paling tinggi?",
    "inputType": "manual_input",
    "answerType": "text",
    "points": 20,
    "formulaSkills": [
      "SUMIF",
      "ranking"
    ],
    "hint": "Buat rekap jam lembur per divisi.",
    "isBonus": false,
    "correctAnswer": "Gudang",
    "acceptedAnswers": [
      "Gudang",
      "gudang"
    ]
  },
  {
    "id": "ul-005",
    "caseId": "upah-lembur-karyawan",
    "orderIndex": 5,
    "level": 5,
    "questionText": "Rumus logika apa yang cocok untuk memberi status 'Lembur' jika Jam Lembur lebih dari 0?",
    "inputType": "multiple_choice",
    "answerType": "choice",
    "choices": [
      {
        "label": "SUM",
        "value": "SUM"
      },
      {
        "label": "IF",
        "value": "IF"
      },
      {
        "label": "VLOOKUP",
        "value": "VLOOKUP"
      },
      {
        "label": "LEFT",
        "value": "LEFT"
      }
    ],
    "points": 20,
    "formulaSkills": [
      "IF"
    ],
    "hint": "Butuh rumus logika.",
    "isBonus": false,
    "correctAnswer": "IF",
    "acceptedAnswers": [
      "IF"
    ]
  },
  {
    "id": "ul-bonus",
    "caseId": "upah-lembur-karyawan",
    "orderIndex": 6,
    "level": "bonus",
    "questionText": "Berapa total seluruh upah lembur dalam dataset?",
    "inputType": "manual_input",
    "answerType": "number",
    "points": 15,
    "formulaSkills": [
      "SUMPRODUCT",
      "perkalian"
    ],
    "hint": "Jam Lembur x Tarif Lembur/Jam untuk semua baris.",
    "isBonus": true,
    "correctAnswer": "2920000",
    "acceptedAnswers": [
      "2920000",
      "Rp 2.920.000",
      "2920000"
    ]
  },
  {
    "id": "sa-001",
    "caseId": "tes-excel-staff-admin",
    "orderIndex": 1,
    "level": 1,
    "questionText": "Berapa total Qty seluruh transaksi?",
    "inputType": "manual_input",
    "answerType": "number",
    "points": 10,
    "formulaSkills": [
      "SUM"
    ],
    "hint": "Jumlahkan kolom Qty.",
    "isBonus": false,
    "correctAnswer": "171",
    "acceptedAnswers": [
      "171"
    ]
  },
  {
    "id": "sa-002",
    "caseId": "tes-excel-staff-admin",
    "orderIndex": 2,
    "level": 2,
    "questionText": "Berapa jumlah transaksi dengan status Lunas?",
    "inputType": "manual_input",
    "answerType": "number",
    "points": 15,
    "formulaSkills": [
      "COUNTIF"
    ],
    "hint": "Hitung Status Pembayaran = Lunas.",
    "isBonus": false,
    "correctAnswer": "25",
    "acceptedAnswers": [
      "25"
    ]
  },
  {
    "id": "sa-003",
    "caseId": "tes-excel-staff-admin",
    "orderIndex": 3,
    "level": 3,
    "questionText": "Berapa total nilai transaksi sebelum memperhatikan status pembayaran?",
    "inputType": "manual_input",
    "answerType": "number",
    "points": 20,
    "formulaSkills": [
      "SUMPRODUCT"
    ],
    "hint": "Qty x Harga untuk semua baris.",
    "isBonus": false,
    "correctAnswer": "15200000",
    "acceptedAnswers": [
      "15200000",
      "Rp 15.200.000",
      "15200000"
    ]
  },
  {
    "id": "sa-004",
    "caseId": "tes-excel-staff-admin",
    "orderIndex": 4,
    "level": 4,
    "questionText": "Rumus apa yang paling tepat untuk menghitung jumlah transaksi dengan status tertentu?",
    "inputType": "multiple_choice",
    "answerType": "choice",
    "choices": [
      {
        "label": "COUNTIF",
        "value": "COUNTIF"
      },
      {
        "label": "SUM",
        "value": "SUM"
      },
      {
        "label": "AVERAGE",
        "value": "AVERAGE"
      },
      {
        "label": "RIGHT",
        "value": "RIGHT"
      }
    ],
    "points": 20,
    "formulaSkills": [
      "COUNTIF"
    ],
    "hint": "Butuh menghitung berdasarkan kriteria.",
    "isBonus": false,
    "correctAnswer": "COUNTIF",
    "acceptedAnswers": [
      "COUNTIF"
    ]
  },
  {
    "id": "sa-005",
    "caseId": "tes-excel-staff-admin",
    "orderIndex": 5,
    "level": 5,
    "questionText": "Berapa total Qty untuk Produk Paket C?",
    "inputType": "manual_input",
    "answerType": "number",
    "points": 25,
    "formulaSkills": [
      "SUMIF"
    ],
    "hint": "Jumlahkan Qty berdasarkan nama produk.",
    "isBonus": false,
    "correctAnswer": "36",
    "acceptedAnswers": [
      "36"
    ]
  },
  {
    "id": "sa-bonus",
    "caseId": "tes-excel-staff-admin",
    "orderIndex": 6,
    "level": "bonus",
    "questionText": "Berapa rata-rata nilai transaksi per baris? Bulatkan 2 angka desimal.",
    "inputType": "manual_input",
    "answerType": "number",
    "points": 10,
    "formulaSkills": [
      "AVERAGE"
    ],
    "hint": "Total nilai transaksi dibagi jumlah transaksi.",
    "isBonus": true,
    "correctAnswer": "304000.0",
    "acceptedAnswers": [
      "304000.0",
      "304000"
    ]
  },
  {
    "id": "go-001",
    "caseId": "growth-omzet-penjualan",
    "orderIndex": 1,
    "level": 1,
    "questionText": "Berapa total omzet 2026 seluruh data?",
    "inputType": "manual_input",
    "answerType": "number",
    "points": 10,
    "formulaSkills": [
      "SUM"
    ],
    "hint": "Jumlahkan kolom Omzet 2026.",
    "isBonus": false,
    "correctAnswer": "1469478500",
    "acceptedAnswers": [
      "1469478500",
      "Rp 1.469.478.500",
      "1469478500"
    ]
  },
  {
    "id": "go-002",
    "caseId": "growth-omzet-penjualan",
    "orderIndex": 2,
    "level": 2,
    "questionText": "Berapa persen growth total omzet dari 2025 ke 2026? Bulatkan 2 angka desimal.",
    "inputType": "manual_input",
    "answerType": "number",
    "points": 15,
    "formulaSkills": [
      "growth calculation"
    ],
    "hint": "(Omzet 2026 - Omzet 2025) / Omzet 2025.",
    "isBonus": false,
    "correctAnswer": "13.73%",
    "acceptedAnswers": [
      "13.73%",
      "13,73%",
      "13.73"
    ]
  },
  {
    "id": "go-003",
    "caseId": "growth-omzet-penjualan",
    "orderIndex": 3,
    "level": 3,
    "questionText": "Produk apa yang memiliki growth persentase tertinggi?",
    "inputType": "manual_input",
    "answerType": "text",
    "points": 20,
    "formulaSkills": [
      "SUMIF",
      "growth calculation"
    ],
    "hint": "Hitung growth per produk.",
    "isBonus": false,
    "correctAnswer": "Paket D",
    "acceptedAnswers": [
      "Paket D",
      "paket d"
    ]
  },
  {
    "id": "go-004",
    "caseId": "growth-omzet-penjualan",
    "orderIndex": 4,
    "level": 4,
    "questionText": "Rumus apa yang cocok untuk memberi status 'Tercapai' jika Omzet 2026 >= Target 2026?",
    "inputType": "multiple_choice",
    "answerType": "choice",
    "choices": [
      {
        "label": "IF",
        "value": "IF"
      },
      {
        "label": "LEFT",
        "value": "LEFT"
      },
      {
        "label": "COUNT",
        "value": "COUNT"
      },
      {
        "label": "TODAY",
        "value": "TODAY"
      }
    ],
    "points": 20,
    "formulaSkills": [
      "IF"
    ],
    "hint": "Butuh logika benar/salah.",
    "isBonus": false,
    "correctAnswer": "IF",
    "acceptedAnswers": [
      "IF"
    ]
  },
  {
    "id": "go-005",
    "caseId": "growth-omzet-penjualan",
    "orderIndex": 5,
    "level": 5,
    "questionText": "Berapa persen growth omzet Region Jakarta? Bulatkan 2 angka desimal.",
    "inputType": "manual_input",
    "answerType": "number",
    "points": 25,
    "formulaSkills": [
      "SUMIFS",
      "growth calculation"
    ],
    "hint": "Filter region Jakarta lalu bandingkan 2025 vs 2026.",
    "isBonus": false,
    "correctAnswer": "13.75%",
    "acceptedAnswers": [
      "13.75%",
      "13,75%",
      "13.75"
    ]
  },
  {
    "id": "go-bonus",
    "caseId": "growth-omzet-penjualan",
    "orderIndex": 6,
    "level": "bonus",
    "questionText": "Berapa jumlah baris yang Omzet 2026-nya belum mencapai target?",
    "inputType": "manual_input",
    "answerType": "number",
    "points": 10,
    "formulaSkills": [
      "COUNTIF",
      "IF"
    ],
    "hint": "Hitung baris Omzet 2026 < Target 2026.",
    "isBonus": true,
    "correctAnswer": "40",
    "acceptedAnswers": [
      "40"
    ]
  },
  {
    "id": "lk-001",
    "caseId": "lookup-data-karyawan",
    "orderIndex": 1,
    "level": 1,
    "questionText": "Berapa total karyawan dalam master data?",
    "inputType": "manual_input",
    "answerType": "number",
    "points": 10,
    "formulaSkills": [
      "COUNT"
    ],
    "hint": "Hitung jumlah ID Karyawan.",
    "isBonus": false,
    "correctAnswer": "60",
    "acceptedAnswers": [
      "60"
    ]
  },
  {
    "id": "lk-002",
    "caseId": "lookup-data-karyawan",
    "orderIndex": 2,
    "level": 2,
    "questionText": "Berapa gaji pokok untuk ID KRY-0017?",
    "inputType": "manual_input",
    "answerType": "number",
    "points": 15,
    "formulaSkills": [
      "VLOOKUP",
      "XLOOKUP"
    ],
    "hint": "Cari berdasarkan ID Karyawan.",
    "isBonus": false,
    "correctAnswer": "6600000",
    "acceptedAnswers": [
      "6600000",
      "Rp 6.600.000",
      "6600000"
    ]
  },
  {
    "id": "lk-003",
    "caseId": "lookup-data-karyawan",
    "orderIndex": 3,
    "level": 3,
    "questionText": "Divisi apa untuk ID KRY-0042?",
    "inputType": "manual_input",
    "answerType": "text",
    "points": 20,
    "formulaSkills": [
      "XLOOKUP"
    ],
    "hint": "Cari kolom Divisi berdasarkan ID.",
    "isBonus": false,
    "correctAnswer": "Marketing",
    "acceptedAnswers": [
      "Marketing",
      "marketing"
    ]
  },
  {
    "id": "lk-004",
    "caseId": "lookup-data-karyawan",
    "orderIndex": 4,
    "level": 4,
    "questionText": "Rumus mana yang lebih fleksibel untuk lookup ke kiri dan kanan di Excel modern?",
    "inputType": "multiple_choice",
    "answerType": "choice",
    "choices": [
      {
        "label": "VLOOKUP",
        "value": "VLOOKUP"
      },
      {
        "label": "XLOOKUP",
        "value": "XLOOKUP"
      },
      {
        "label": "SUM",
        "value": "SUM"
      },
      {
        "label": "DATEDIF",
        "value": "DATEDIF"
      }
    ],
    "points": 20,
    "formulaSkills": [
      "XLOOKUP"
    ],
    "hint": "Fungsi lookup modern Microsoft 365.",
    "isBonus": false,
    "correctAnswer": "XLOOKUP",
    "acceptedAnswers": [
      "XLOOKUP"
    ]
  },
  {
    "id": "lk-005",
    "caseId": "lookup-data-karyawan",
    "orderIndex": 5,
    "level": 5,
    "questionText": "Berapa jumlah karyawan dengan status Aktif?",
    "inputType": "manual_input",
    "answerType": "number",
    "points": 25,
    "formulaSkills": [
      "COUNTIF"
    ],
    "hint": "Hitung Status = Aktif.",
    "isBonus": false,
    "correctAnswer": "36",
    "acceptedAnswers": [
      "36"
    ]
  },
  {
    "id": "lk-bonus",
    "caseId": "lookup-data-karyawan",
    "orderIndex": 6,
    "level": "bonus",
    "questionText": "Siapa nama manager untuk divisi IT?",
    "inputType": "manual_input",
    "answerType": "text",
    "points": 10,
    "formulaSkills": [
      "XLOOKUP",
      "FILTER"
    ],
    "hint": "Cari salah satu baris Divisi IT.",
    "isBonus": true,
    "correctAnswer": "Manager IT",
    "acceptedAnswers": [
      "Manager IT",
      "manager it"
    ]
  },
  {
    "id": "mt-001",
    "caseId": "monitoring-training-karyawan",
    "orderIndex": 1,
    "level": 1,
    "questionText": "Berapa jumlah peserta yang hadir?",
    "inputType": "manual_input",
    "answerType": "number",
    "points": 10,
    "formulaSkills": [
      "COUNTIF"
    ],
    "hint": "Hitung Status Hadir = Hadir.",
    "isBonus": false,
    "correctAnswer": "70",
    "acceptedAnswers": [
      "70"
    ]
  },
  {
    "id": "mt-002",
    "caseId": "monitoring-training-karyawan",
    "orderIndex": 2,
    "level": 2,
    "questionText": "Berapa rata-rata Post-Test untuk training Excel Dasar? Bulatkan 2 angka desimal.",
    "inputType": "manual_input",
    "answerType": "number",
    "points": 15,
    "formulaSkills": [
      "AVERAGEIF"
    ],
    "hint": "Rata-rata Post-Test dengan kriteria Training = Excel Dasar.",
    "isBonus": false,
    "correctAnswer": "81.0",
    "acceptedAnswers": [
      "81.0",
      "81"
    ]
  },
  {
    "id": "mt-003",
    "caseId": "monitoring-training-karyawan",
    "orderIndex": 3,
    "level": 3,
    "questionText": "Berapa persen completion rate peserta yang Lulus? Bulatkan 2 angka desimal.",
    "inputType": "manual_input",
    "answerType": "number",
    "points": 20,
    "formulaSkills": [
      "COUNTIF",
      "persentase"
    ],
    "hint": "Jumlah Lulus / total peserta.",
    "isBonus": false,
    "correctAnswer": "75.00%",
    "acceptedAnswers": [
      "75.00%",
      "75,00%",
      "75.0"
    ]
  },
  {
    "id": "mt-004",
    "caseId": "monitoring-training-karyawan",
    "orderIndex": 4,
    "level": 4,
    "questionText": "Rumus apa yang cocok untuk menghitung jumlah peserta berdasarkan Status Hadir?",
    "inputType": "multiple_choice",
    "answerType": "choice",
    "choices": [
      {
        "label": "COUNTIF",
        "value": "COUNTIF"
      },
      {
        "label": "SUM",
        "value": "SUM"
      },
      {
        "label": "XLOOKUP",
        "value": "XLOOKUP"
      },
      {
        "label": "DATEDIF",
        "value": "DATEDIF"
      }
    ],
    "points": 20,
    "formulaSkills": [
      "COUNTIF"
    ],
    "hint": "Butuh menghitung berdasarkan satu kriteria.",
    "isBonus": false,
    "correctAnswer": "COUNTIF",
    "acceptedAnswers": [
      "COUNTIF"
    ]
  },
  {
    "id": "mt-005",
    "caseId": "monitoring-training-karyawan",
    "orderIndex": 5,
    "level": 5,
    "questionText": "Divisi apa yang memiliki jumlah peserta Lulus terbanyak?",
    "inputType": "manual_input",
    "answerType": "text",
    "points": 25,
    "formulaSkills": [
      "COUNTIFS",
      "dashboard summary"
    ],
    "hint": "Buat rekap Lulus per divisi.",
    "isBonus": false,
    "correctAnswer": "Sales",
    "acceptedAnswers": [
      "Sales",
      "sales"
    ]
  },
  {
    "id": "mt-bonus",
    "caseId": "monitoring-training-karyawan",
    "orderIndex": 6,
    "level": "bonus",
    "questionText": "Berapa rata-rata kenaikan nilai dari Pre-Test ke Post-Test? Bulatkan 2 angka desimal.",
    "inputType": "manual_input",
    "answerType": "number",
    "points": 10,
    "formulaSkills": [
      "AVERAGE",
      "helper column"
    ],
    "hint": "Post-Test - Pre-Test untuk setiap peserta lalu rata-rata.",
    "isBonus": true,
    "correctAnswer": "18.88",
    "acceptedAnswers": [
      "18.88",
      "19"
    ]
  }
]

export function getPlayCaseBySlug(slug: string) {
  return playCases.find((playCase) => playCase.slug === slug)
}

export function getQuestionsByCaseId(caseId: string) {
  return playQuestions.filter((question) => question.caseId === caseId).sort((a, b) => a.orderIndex - b.orderIndex)
}

export function getQuestionsBySlug(slug: string) {
  const playCase = getPlayCaseBySlug(slug)
  return playCase ? getQuestionsByCaseId(playCase.id) : []
}

export function scorePlayAttempt(playCase: PlayCase, questions: PlayQuestion[], submissions: PlayAnswerSubmission[], isSaved: boolean, durationSeconds?: number): PlayResult {
  const answers = questions.map((question) => {
    const userAnswer = submissions.find((submission) => submission.questionId === question.id)?.answer ?? ''
    const isCorrect = isAnswerCorrect(question, userAnswer)
    return {
      questionId: question.id,
      userAnswer,
      isCorrect,
      pointsEarned: isCorrect ? question.points : 0,
      level: question.level,
    }
  })
  const score = answers.reduce((sum, answer) => sum + answer.pointsEarned, 0)
  const correctCount = answers.filter((answer) => answer.isCorrect).length
  const skillsEarned = Array.from(new Set(questions.filter((question) => answers.some((answer) => answer.questionId === question.id && answer.isCorrect)).flatMap((question) => question.formulaSkills)))
  return {
    caseId: playCase.id,
    score,
    totalPoints: playCase.totalPoints,
    accuracy: Math.round((score / playCase.totalPoints) * 100),
    correctCount,
    questionCount: questions.length,
    durationSeconds,
    isSaved,
    answers,
    skillsEarned,
    message: isSaved ? 'Mantap, hasil kamu tersimpan. Skill yang kamu kuasai masuk ke profile dan portfolio.' : 'Hasil kamu sudah keluar, tapi belum tersimpan karena kamu belum login.',
  }
}

function isAnswerCorrect(question: PlayQuestion, userAnswer: string) {
  if (!userAnswer.trim()) return false
  const accepted = [question.correctAnswer, ...(question.acceptedAnswers ?? [])]
  return accepted.some((answer) => normalizeAnswer(answer, question.answerType) === normalizeAnswer(userAnswer, question.answerType))
}

function normalizeAnswer(value: string, answerType: PlayAnswerType) {
  const compact = value.trim().replace(/\s+/g, ' ')
  if (answerType === 'number') {
    const numeric = compact.replace(/%$/, '').replace(/\./g, '').replace(',', '.')
    const parsed = Number(numeric)
    if (Number.isFinite(parsed)) return String(parsed)
  }
  return compact.toLowerCase()
}
