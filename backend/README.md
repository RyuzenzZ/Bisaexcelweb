# BisaExcel Backend

Backend MVP BisaExcel memakai Node.js, Express, TypeScript, Prisma, dan SQLite untuk development lokal.

## Stack

- Runtime: Node.js
- Framework: Express
- Language: TypeScript strict
- ORM: Prisma 6.19.0
- Database lokal: SQLite
- Base path API: `/api/v1`

## Setup Lokal

1. Install dependencies:

```bash
npm install
```

2. Buat file `.env` dari `.env.example`:

```env
DATABASE_URL="file:./dev.db"
PORT=8000
FRONTEND_URL="http://localhost:3000"
```

3. Generate Prisma Client:

```bash
npx prisma generate --schema prisma/schema.prisma
```

4. Buat database SQLite lokal:

```bash
npm run db:setup
```

Catatan: `npm run prisma:migrate -- --name init` tetap tersedia, tetapi pada mesin ini Prisma schema engine gagal start tanpa pesan detail. Untuk MVP lokal, `db:setup` membuat tabel SQLite dari schema yang sama agar API bisa langsung dites.

5. Seed data MVP:

```bash
npm run prisma:seed
```

6. Jalankan server dev:

```bash
npm run dev
```

API berjalan di `http://localhost:8000/api/v1`.

## Catatan MVP

- Auth belum aktif.
- Payment belum aktif.
- Produk digital jawaban dan tutorial sudah dimodelkan, tetapi akses premium masih placeholder.
- Video YouTube memakai playlist client sebagai sumber URL. Judul dan durasi asli perlu diisi manual jika metadata playlist belum tersedia.
