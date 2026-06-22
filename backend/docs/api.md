# API BisaExcel MVP

Base URL lokal: `http://localhost:8000/api/v1`

Format respons sukses:

```json
{
  "data": {},
  "message": "Pesan sukses.",
  "errors": null
}
```

Format respons error:

```json
{
  "data": null,
  "message": "Pesan error.",
  "errors": {}
}
```

## Health

`GET /health`

Mengembalikan status API.

## Articles

`GET /articles`

Daftar artikel belajar Excel.

`GET /articles/:slug`

Detail artikel berdasarkan slug.

## Videos

`GET /videos`

Daftar video belajar dari playlist BisaExcel. Data seed masih placeholder judul/durasi jika metadata YouTube belum diisi manual.

`GET /videos/:slug`

Detail video berdasarkan slug.

## Test Excel

`GET /tests`

Daftar test Excel publik. Field `expectedAnswer` tidak dikirim ke frontend.

`GET /tests/:slug`

Detail test Excel publik. Field `expectedAnswer` tidak dikirim ke frontend.

`POST /tests/:slug/check`

Body:

```json
{
  "answer": "=SUMIF(C:C,\"A\",D:D)"
}
```

Response mengembalikan `isCorrect`, `score`, dan `formulaSkills`. Pengecekan MVP memakai normalisasi teks sederhana: trim, lowercase, dan hapus spasi.

`GET /tests/:slug/products`

Daftar produk digital terkait test, misalnya jawaban atau jawaban + tutorial.

`GET /tests/:slug/explanation-preview`

Preview penjelasan. Jika terkunci, API tidak mengirim jawaban penuh.

## Challenges

`GET /challenges`

Daftar challenge praktik Excel.

`GET /challenges/:slug`

Detail challenge praktik.

## Tips

`GET /tips`

Daftar tips Excel, rumus bisnis, LAMBDA, REGEX, dan tips kerja.

`GET /tips/:slug`

Detail tips berdasarkan slug.

## Templates

`GET /templates`

Daftar template Excel.

`GET /templates/:slug`

Detail template Excel.

## Classes

`GET /classes`

Daftar program kelas online, private, dan inhouse.

`POST /inhouse-requests`

Body:

```json
{
  "name": "Budi",
  "email": "budi@example.com",
  "phone": "08123456789",
  "company": "PT Contoh",
  "message": "Butuh training Excel untuk admin sales.",
  "needType": "inhouse"
}
```

`needType`: `inhouse`, `private_class`, `template`, atau `general`.

## Certificate

`GET /certificates`

Daftar certificate MVP.

`GET /certificates/:code`

Validasi dan tampilkan certificate berdasarkan kode.

## Portfolio

`GET /portfolios`

Daftar portfolio skill MVP.

`GET /portfolios/:username`

Tampilkan portfolio skill Excel publik berdasarkan username.

## Belum Aktif di MVP

- Register/login/logout.
- Payment Midtrans.
- Upload file jawaban.
- Unlock premium otomatis setelah pembayaran.
- Admin CRUD.
