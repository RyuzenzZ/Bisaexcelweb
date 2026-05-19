# AGENTS.md — BisaExcel.com
> **Master Instruksi untuk semua AI Agent: Claude Code, OpenAI Codex, Cursor, GitHub Copilot.**
> Baca **SELURUH** file ini sebelum menulis satu baris kode pun.
> Baca juga **DESIGN.md** untuk semua keputusan visual dan styling.
> Baca juga **CONTEXT.md** untuk fitur lengkap dan roadmap.
> Jika ada konflik antara file ini dan instruksi lain → **file ini yang menang.**
> Versi: 3.0 — Mei 2026

---

## ⚠️ PERINGATAN ANTI-HALUSINASI — BACA SEBELUM APAPUN

```
Agent DILARANG KERAS melakukan hal berikut:
  1. Mengarang nama fungsi, komponen, Model, Controller, atau file yang belum ada
  2. Mengasumsikan schema database tanpa membaca types/database.ts (frontend)
     atau database/migrations/ (Laravel backend)
  3. Menulis kode untuk library yang tidak ada di tech stack resmi
  4. Menggunakan warna/font/spacing yang tidak ada di DESIGN.md
  5. "Meningkatkan" kode dengan fitur yang tidak diminta
  6. Menganggap kode sebelumnya sudah ada jika tidak ditampilkan di konteks
  7. Membuat endpoint API tanpa dokumentasi di /docs/api/
  8. Melewati Laravel Policy atau middleware auth tanpa konfirmasi eksplisit

Jika ragu → TANYA, bukan mengarang.
Jika file tidak ada di konteks → MINTA file tersebut sebelum menulis kode yang bergantung padanya.
Jika endpoint API belum ada → buat terlebih dahulu di backend sebelum memanggil di frontend.
```

---

## 0. IDENTITAS PROJECT

```
Nama         : BisaExcel.com
Tagline      : "Kuasai Excel, Kuasai Karirmu"
Jenis        : Platform LMS (Learning Management System) Excel berbahasa Indonesia
Tujuan       : Platform belajar Excel interaktif dengan gamifikasi & kompetisi
Owner        : Non-developer yang dibantu penuh oleh AI
Arsitektur   : Decoupled — Vite SPA (Frontend) ↔ Laravel REST API (Backend)
Versi doc    : 3.0 — Mei 2026
```

**Referensi konteks lengkap:**
- `AGENTS.md` (file ini) → aturan teknis, kode, workflow agent
- `DESIGN.md` → semua keputusan visual: warna, tipografi, komponen UI
- `CONTEXT.md` → fitur lengkap, roadmap, skema database
- `docs/api/` → dokumentasi endpoint REST API (wajib update setiap buat endpoint baru)

---

## 1. TECH STACK (TIDAK BOLEH DIGANTI TANPA PERSETUJUAN)

### 1A. Frontend — Vite + React

```
BUNDLER      : Vite 5.x (bukan Create React App, bukan Webpack murni)
FRAMEWORK    : React 18.x
LANGUAGE     : TypeScript 5.x (strict mode ON — tidak boleh ada `any`)
ROUTING      : React Router v6 (file-based via createBrowserRouter)
STYLING      : Tailwind CSS v3 + token warna dari DESIGN.md
UI COMPONENTS: shadcn/ui (wajib untuk semua komponen dasar)
STATE GLOBAL : Zustand 4.x
STATE SERVER : TanStack Query v5 (React Query) — untuk semua data fetching & caching
FORM         : React Hook Form 7.x + Zod 3.x (validasi)
HTTP CLIENT  : Axios (instance terpusat di /src/lib/axios.ts)
ANIMASI      : Framer Motion 11.x
ICON         : Lucide React
NOTIFIKASI   : Sonner 1.x (toast)
PAYMENT UI   : Midtrans Snap.js (script tag di index.html)
DEPLOY       : Vercel (static SPA)
TEMA VISUAL  : Dark Premium Green — lihat DESIGN.md
```

### 1B. Backend — Laravel

```
FRAMEWORK    : Laravel 11.x
LANGUAGE     : PHP 8.3+ (typed properties, enums, readonly wajib digunakan)
ARSITEKTUR   : REST API — JSON only, tidak ada Blade view untuk halaman
DATABASE     : MySQL 8.x (via Supabase PostgreSQL atau PlanetScale jika cloud)
AUTH         : Laravel Sanctum (token-based untuk SPA)
STORAGE      : Laravel + S3-compatible (Supabase Storage / Cloudflare R2)
PAYMENT      : Midtrans (via HTTP Client Laravel)
EMAIL        : Laravel Mail + Resend SMTP / Mailgun
QUEUE        : Laravel Queue (database driver untuk MVP, Redis untuk produksi)
CACHE        : Redis (atau database driver untuk MVP)
DEPLOY       : Railway / Fly.io / VPS (bukan Vercel — Laravel butuh server PHP)
API FORMAT   : JSON:API-lite — selalu kembalikan `data`, `message`, `errors`
```

### 1C. Versi Package — Frontend

```json
{
  "vite": "^5.x",
  "react": "^18.x",
  "react-dom": "^18.x",
  "react-router-dom": "^6.x",
  "typescript": "^5.x",
  "tailwindcss": "^3.x",
  "@tanstack/react-query": "^5.x",
  "axios": "^1.x",
  "framer-motion": "^11.x",
  "react-hook-form": "^7.x",
  "zod": "^3.x",
  "zustand": "^4.x",
  "sonner": "^1.x",
  "lucide-react": "^0.x",
  "@radix-ui/react-*": "latest"
}
```

### 1D. Versi Package — Backend (composer.json)

```json
{
  "laravel/framework": "^11.x",
  "laravel/sanctum": "^4.x",
  "spatie/laravel-permission": "^6.x",
  "spatie/laravel-query-builder": "^5.x",
  "spatie/laravel-media-library": "^11.x",
  "intervention/image": "^3.x",
  "guzzlehttp/guzzle": "^7.x",
  "league/flysystem-aws-s3-v3": "^3.x"
}
```

---

## 2. STRUKTUR FOLDER

### 2A. Frontend — `/frontend` (Vite + React)

```
frontend/
├── public/
│   └── favicon.ico
│
├── src/
│   ├── app/
│   │   ├── router.tsx              # createBrowserRouter — semua route di sini
│   │   └── providers.tsx           # QueryClientProvider, ToasterProvider, dll.
│   │
│   ├── pages/
│   │   ├── (auth)/
│   │   │   ├── LoginPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   └── ForgotPasswordPage.tsx
│   │   ├── (dashboard)/
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── KursusPage.tsx
│   │   │   ├── KursusDetailPage.tsx
│   │   │   ├── BelajarPage.tsx
│   │   │   ├── KuisPage.tsx
│   │   │   ├── LeaderboardPage.tsx
│   │   │   ├── TurnamenPage.tsx
│   │   │   ├── ProfilPage.tsx
│   │   │   └── SertifikatPage.tsx
│   │   ├── (public)/
│   │   │   └── LandingPage.tsx
│   │   └── (admin)/
│   │       ├── AdminDashboardPage.tsx
│   │       ├── AdminKursusPage.tsx
│   │       ├── AdminpenggunaPage.tsx
│   │       └── AdminTransaksiPage.tsx
│   │
│   ├── components/
│   │   ├── ui/                     # shadcn/ui — JANGAN edit
│   │   ├── layout/                 # AppLayout, DashboardLayout, AdminLayout
│   │   ├── course/                 # CourseCard, CourseList, VideoPlayer
│   │   ├── quiz/                   # QuizCard, QuizTimer, QuizResult
│   │   ├── gamification/           # XPBar, LevelBadge, Leaderboard, StreakCalendar
│   │   ├── payment/                # CheckoutButton, PaymentStatus
│   │   ├── tournament/             # TournamentCard, LiveScoreboard
│   │   └── shared/                 # EmptyState, ErrorState, LoadingCard, PageMeta
│   │
│   ├── lib/
│   │   ├── axios.ts                # Axios instance — baseURL, interceptors, token
│   │   ├── queryClient.ts          # TanStack Query client config
│   │   └── utils.ts                # cn(), formatCurrency(), formatDate()
│   │
│   ├── api/                        # Semua fungsi HTTP — DIPISAH PER DOMAIN
│   │   ├── auth.api.ts
│   │   ├── courses.api.ts
│   │   ├── quiz.api.ts
│   │   ├── payment.api.ts
│   │   ├── gamification.api.ts
│   │   └── users.api.ts
│   │
│   ├── hooks/                      # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useCourse.ts
│   │   ├── useQuiz.ts
│   │   ├── useXP.ts
│   │   └── useLeaderboard.ts
│   │
│   ├── stores/                     # Zustand stores — hanya untuk state UI global
│   │   ├── useAuthStore.ts
│   │   ├── useQuizStore.ts
│   │   └── useTournamentStore.ts
│   │
│   ├── types/
│   │   ├── api.types.ts            # Response shape dari Laravel API
│   │   ├── models.types.ts         # User, Course, Quiz, dll.
│   │   └── index.ts
│   │
│   └── constants/
│       ├── xp.ts
│       ├── levels.ts
│       └── routes.ts
│
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── .env
```

### 2B. Backend — `/backend` (Laravel 11)

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Api/V1/
│   │   │   │   ├── AuthController.php
│   │   │   │   ├── CourseController.php
│   │   │   │   ├── LessonController.php
│   │   │   │   ├── QuizController.php
│   │   │   │   ├── PaymentController.php
│   │   │   │   ├── GamificationController.php
│   │   │   │   ├── LeaderboardController.php
│   │   │   │   ├── TournamentController.php
│   │   │   │   ├── CertificateController.php
│   │   │   │   └── Admin/
│   │   │   │       ├── AdminCourseController.php
│   │   │   │       ├── AdminUserController.php
│   │   │   │       └── AdminTransactionController.php
│   │   │   └── WebhookController.php    # Midtrans webhook
│   │   │
│   │   ├── Middleware/
│   │   │   ├── EnsureUserIsAdmin.php
│   │   │   └── EnsureEnrolled.php
│   │   │
│   │   └── Requests/               # Form Request Validation (WAJIB)
│   │       ├── Auth/
│   │       │   ├── LoginRequest.php
│   │       │   └── RegisterRequest.php
│   │       ├── Course/
│   │       │   └── StoreCourseRequest.php
│   │       └── Quiz/
│   │           └── SubmitQuizRequest.php
│   │
│   ├── Models/
│   │   ├── User.php
│   │   ├── Course.php
│   │   ├── Chapter.php
│   │   ├── Lesson.php
│   │   ├── Quiz.php
│   │   ├── Question.php
│   │   ├── Enrollment.php
│   │   ├── VideoProgress.php
│   │   ├── QuizAttempt.php
│   │   ├── XPLog.php
│   │   ├── Transaction.php
│   │   ├── Certificate.php
│   │   └── Tournament.php
│   │
│   ├── Services/                   # Business logic — DIPISAH dari Controller
│   │   ├── GamificationService.php
│   │   ├── PaymentService.php
│   │   ├── CertificateService.php
│   │   └── QuizService.php
│   │
│   ├── Enums/
│   │   ├── CourseLevel.php         # Pemula | Menengah | Mahir
│   │   ├── TransactionStatus.php   # Pending | Paid | Failed | Refunded
│   │   └── UserRole.php            # Student | Admin | Instructor
│   │
│   └── Policies/
│       ├── CoursePolicy.php
│       └── QuizPolicy.php
│
├── database/
│   ├── migrations/                 # ← BACA INI sebelum query apapun
│   └── seeders/
│
├── routes/
│   ├── api.php                     # Semua route API — prefix /api/v1
│   └── web.php                     # Hanya webhook & health-check
│
├── docs/
│   └── api/                        # Dokumentasi endpoint — update setiap buat route baru
│       ├── auth.md
│       ├── courses.md
│       └── payments.md
│
└── .env
```

---

## 3. DESIGN SYSTEM — POINTER KE DESIGN.MD

> ⚠️ Section ini hanya ringkasan. Detail lengkap ada di **DESIGN.md**.
> Agent WAJIB membaca DESIGN.md sebelum menyentuh styling apapun.

### 3A. Aturan Warna (Ringkasan)

```
Tema         : Dark Premium Green (gelap sebagai default, bukan light mode)
Background   : #080E0A (body), #0D1610 (elevated), #111E14 (card)
Primary CTA  : #16A34A (green-600) dengan glow shadow
XP/Reward    : #F59E0B (amber-500)
Text utama   : #E8F0EA
Text muted   : #8BA98F
Border       : #1E3022 (subtle) / #254A2A (default)

LARANGAN KERAS:
  ❌ bg-white, bg-slate-50, bg-gray-100 — jangan pakai ini
  ❌ text-gray-900, text-slate-900 — jangan pakai ini sebagai base
  ❌ Warna hex bebas yang tidak ada di DESIGN.md Section 1
```

### 3B. Font (Ringkasan)

```
Heading : Plus Jakarta Sans (weight 600–800)
Body    : DM Sans (weight 400–500)
Mono    : JetBrains Mono (formula Excel)
Display : Syne (angka gamifikasi, hero, leaderboard rank)
```

### 3C. Komponen UI — Wajib Gunakan Template DESIGN.md

```
Semua komponen (Button, Card, Input, Badge, Progress Bar, Toast, Modal)
WAJIB mengikuti spesifikasi di DESIGN.md Section 4.
Jangan improvisasi styling tanpa dasar dari DESIGN.md.
```

---

## 4. ATURAN KODE FRONTEND (VITE + REACT)

### 4A. TypeScript Strict — Frontend

```typescript
// ❌ DILARANG
const data: any = await fetchCourse()
function getUser(id) { ... }

// ✅ WAJIB — gunakan types dari /src/types/models.types.ts
import type { Course } from '@/types/models.types'

const data: Course = await fetchCourse()
function getUser(id: string): Promise<User> { ... }
```

### 4B. Axios — Instance Terpusat

```typescript
// src/lib/axios.ts — SATU-SATUNYA tempat konfigurasi HTTP
import axios from 'axios'
import { useAuthStore } from '@/stores/useAuthStore'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // http://localhost:8000/api/v1
  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
  withCredentials: false,
})

// Request interceptor — inject token
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Response interceptor — handle 401
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default apiClient
```

### 4C. API Layer — Dipisah Per Domain

```typescript
// src/api/courses.api.ts
// ❌ DILARANG — fetch langsung di komponen atau hook
// ✅ WAJIB — semua HTTP call di /src/api/*.api.ts

import apiClient from '@/lib/axios'
import type { Course, ApiResponse } from '@/types'

export const coursesApi = {
  getAll: (params?: { level?: string; search?: string }) =>
    apiClient.get<ApiResponse<Course[]>>('/courses', { params }),

  getBySlug: (slug: string) =>
    apiClient.get<ApiResponse<Course>>(`/courses/${slug}`),

  enroll: (courseId: string) =>
    apiClient.post<ApiResponse<{ enrollment_id: string }>>(`/courses/${courseId}/enroll`),
}
```

### 4D. TanStack Query — Data Fetching

```typescript
// src/hooks/useCourse.ts
// ❌ DILARANG — useEffect + fetch manual untuk server data
// ✅ WAJIB — TanStack Query untuk semua data dari API

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { coursesApi } from '@/api/courses.api'
import { toast } from 'sonner'

export function useCourseDetail(slug: string) {
  return useQuery({
    queryKey: ['course', slug],
    queryFn: () => coursesApi.getBySlug(slug).then(r => r.data.data),
    staleTime: 5 * 60 * 1000, // 5 menit
    enabled: !!slug,
  })
}

export function useEnrollCourse() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (courseId: string) => coursesApi.enroll(courseId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['course'] })
      toast.success('Berhasil mendaftar kursus!')
    },
    onError: () => toast.error('Gagal mendaftar. Coba lagi.'),
  })
}
```

### 4E. Zustand — Hanya untuk State UI Global

```typescript
// src/stores/useAuthStore.ts
// Zustand HANYA untuk: auth token, quiz state aktif, tournament state
// BUKAN untuk server data — gunakan TanStack Query untuk itu

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/types'

type AuthStore = {
  user: User | null
  token: string | null
  setAuth: (user: User, token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    { name: 'auth-storage' }
  )
)
```

### 4F. Vite Config — Wajib

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') }, // wajib — gunakan @/ bukan ../../../
  },
  server: {
    port: 3000,
    proxy: {
      '/api': { target: 'http://localhost:8000', changeOrigin: true }, // dev proxy ke Laravel
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          query: ['@tanstack/react-query'],
          ui: ['framer-motion', 'sonner'],
        },
      },
    },
  },
})
```

### 4G. Komponen — Struktur Standar Frontend

```typescript
// src/components/course/CourseCard.tsx
'use client' — JANGAN PAKAI ini di Vite. Ini Next.js-only.

import { type FC } from 'react'
import { motion } from 'framer-motion'
import type { Course } from '@/types/models.types'

// 1. Types — selalu eksplisit
type CourseCardProps = {
  course: Course
  onClick?: () => void
}

// 2. Komponen — styling mengikuti DESIGN.md Section 4B
const CourseCard: FC<CourseCardProps> = ({ course, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="bg-[#111E14] border border-[#1E3022] hover:border-green-900
        rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,.40)]
        hover:shadow-[0_0_0_1px_rgba(22,163,74,.15),0_8px_32px_rgba(0,0,0,.5)]
        transition-all duration-200 cursor-pointer group"
    >
      {/* konten */}
    </motion.div>
  )
}

// 3. Skeleton — WAJIB ada di setiap komponen data-driven
export const CourseCardSkeleton: FC = () => (
  <div className="bg-[#111E14] border border-[#1E3022] rounded-xl overflow-hidden">
    <div className="h-44 bg-[#1C2E20] animate-pulse" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-[#1C2E20] rounded animate-pulse w-3/4" />
      <div className="h-3 bg-[#1C2E20] rounded animate-pulse w-1/2" />
    </div>
  </div>
)

export default CourseCard
```

---

## 5. ATURAN KODE BACKEND (LARAVEL 11)

### 5A. PHP Typing — Wajib Strict

```php
<?php
// ❌ DILARANG
function createUser($data) {
    $user = new User();
    $user->name = $data['name'];
}

// ✅ WAJIB — typed parameters, return types, PHP 8.3 features
declare(strict_types=1);

use App\Enums\UserRole;

final class UserService
{
    public function createUser(
        string $name,
        string $email,
        string $password,
        UserRole $role = UserRole::Student,
    ): User {
        return User::create([
            'name'     => $name,
            'email'    => $email,
            'password' => bcrypt($password),
            'role'     => $role,
        ]);
    }
}
```

### 5B. Response Format API — Wajib Konsisten

```php
// Selalu kembalikan format yang sama dari semua endpoint

// ✅ SUKSES
return response()->json([
    'data'    => CourseResource::collection($courses),
    'message' => 'Kursus berhasil dimuat',
], 200);

// ✅ ERROR VALIDASI (sudah otomatis dari FormRequest)
// Laravel Sanctum akan return 422 dengan format errors

// ✅ ERROR SERVER
return response()->json([
    'data'    => null,
    'message' => 'Gagal memuat kursus. Silakan coba lagi.',
    'errors'  => app()->isLocal() ? $e->getMessage() : null,
], 500);

// ✅ NOT FOUND
return response()->json([
    'data'    => null,
    'message' => 'Kursus tidak ditemukan.',
], 404);
```

### 5C. Controller — Tipis, Logic di Service

```php
// ❌ DILARANG — logic bisnis di dalam Controller
class QuizController extends Controller
{
    public function submit(Request $request, Quiz $quiz): JsonResponse
    {
        $score = 0;
        foreach ($request->answers as $qId => $answer) { // jangan — ini urusan Service
            $question = Question::find($qId);
            if ($question->correct_answer === $answer) $score++;
        }
        // ... 50 baris logic di sini
    }
}

// ✅ WAJIB — Controller hanya: validasi, panggil service, return response
class QuizController extends Controller
{
    public function __construct(private readonly QuizService $quizService) {}

    public function submit(SubmitQuizRequest $request, Quiz $quiz): JsonResponse
    {
        $result = $this->quizService->evaluateAttempt(
            quiz: $quiz,
            userId: $request->user()->id,
            answers: $request->validated('answers'),
        );

        return response()->json([
            'data'    => $result,
            'message' => 'Kuis berhasil dikumpulkan',
        ]);
    }
}
```

### 5D. Form Request Validation — Wajib

```php
// ❌ DILARANG — validasi manual di Controller
$request->validate([...]);

// ✅ WAJIB — gunakan Form Request di app/Http/Requests/
class SubmitQuizRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('submit', $this->route('quiz'));
    }

    public function rules(): array
    {
        return [
            'answers'         => ['required', 'array'],
            'answers.*'       => ['required', 'string', 'in:a,b,c,d'],
            'time_spent_secs' => ['required', 'integer', 'min:1'],
        ];
    }

    public function messages(): array
    {
        return [
            'answers.required' => 'Jawaban tidak boleh kosong',
        ];
    }
}
```

### 5E. Model — Selalu Definisikan Fillable, Casts, Relations

```php
class Course extends Model
{
    // ✅ WAJIB — $fillable eksplisit, bukan $guarded = []
    protected $fillable = [
        'title', 'slug', 'description', 'price',
        'thumbnail_url', 'level', 'is_published',
    ];

    // ✅ WAJIB — casts untuk tipe data
    protected $casts = [
        'price'        => 'integer',
        'is_published' => 'boolean',
        'level'        => CourseLevel::class, // PHP 8.1 Enum cast
    ];

    // ✅ Relations — selalu type-hint return type
    public function chapters(): HasMany
    {
        return $this->hasMany(Chapter::class)->orderBy('order');
    }

    public function enrollments(): HasMany
    {
        return $this->hasMany(Enrollment::class);
    }

    public function instructor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'instructor_id');
    }
}
```

### 5F. Routes API — Dipisah Per Grup

```php
// routes/api.php
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {

    // Public routes — tidak perlu auth
    Route::post('auth/register', [AuthController::class, 'register']);
    Route::post('auth/login',    [AuthController::class, 'login']);
    Route::get('courses',        [CourseController::class, 'index']);
    Route::get('courses/{slug}', [CourseController::class, 'show']);

    // Authenticated routes
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('auth/logout',               [AuthController::class, 'logout']);
        Route::get('auth/me',                    [AuthController::class, 'me']);
        Route::post('courses/{course}/enroll',   [CourseController::class, 'enroll']);
        Route::post('lessons/{lesson}/progress', [LessonController::class, 'updateProgress']);
        Route::post('quizzes/{quiz}/submit',     [QuizController::class, 'submit']);
        Route::get('leaderboard',                [LeaderboardController::class, 'index']);
        Route::get('me/certificates',            [CertificateController::class, 'index']);
        Route::post('payments/initiate',         [PaymentController::class, 'initiate']);
    });

    // Admin routes
    Route::middleware(['auth:sanctum', 'role:admin'])->prefix('admin')->group(function () {
        Route::apiResource('courses',      AdminCourseController::class);
        Route::apiResource('users',        AdminUserController::class);
        Route::get('transactions',         [AdminTransactionController::class, 'index']);
    });

});

// Webhook — bukan di bawah /api/v1
Route::post('webhooks/midtrans', [WebhookController::class, 'midtrans']);
```

### 5G. Enum PHP 8.1+ — Wajib untuk Status dan Level

```php
// app/Enums/CourseLevel.php
enum CourseLevel: string
{
    case Pemula    = 'pemula';
    case Menengah  = 'menengah';
    case Mahir     = 'mahir';

    public function label(): string
    {
        return match($this) {
            self::Pemula   => '🌱 Pemula',
            self::Menengah => '⚡ Menengah',
            self::Mahir    => '🏆 Mahir',
        };
    }
}

// app/Enums/TransactionStatus.php
enum TransactionStatus: string
{
    case Pending  = 'pending';
    case Paid     = 'paid';
    case Failed   = 'failed';
    case Refunded = 'refunded';
}
```

### 5H. Midtrans — Payment Service

```php
// app/Services/PaymentService.php
class PaymentService
{
    private string $serverKey;
    private string $baseUrl;

    public function __construct()
    {
        $this->serverKey = config('services.midtrans.server_key');
        $this->baseUrl   = config('services.midtrans.is_production')
            ? 'https://api.midtrans.com'
            : 'https://api.sandbox.midtrans.com';
    }

    public function createSnapToken(Transaction $transaction): string
    {
        $response = Http::withBasicAuth($this->serverKey, '')
            ->post("{$this->baseUrl}/snap/v1/transactions", [
                'transaction_details' => [
                    'order_id'     => $transaction->order_id,
                    'gross_amount' => $transaction->amount,
                ],
                'customer_details' => [
                    'first_name' => $transaction->user->name,
                    'email'      => $transaction->user->email,
                ],
                'item_details' => [[
                    'id'       => $transaction->course_id,
                    'price'    => $transaction->amount,
                    'quantity' => 1,
                    'name'     => $transaction->course->title,
                ]],
                'callbacks' => [
                    'finish' => config('app.frontend_url') . '/pembayaran/selesai',
                ],
            ]);

        if ($response->failed()) {
            throw new \RuntimeException('Gagal membuat transaksi Midtrans: ' . $response->body());
        }

        return $response->json('token');
    }
}
```

### 5I. Gamifikasi — GamificationService

```php
// app/Services/GamificationService.php
class GamificationService
{
    // XP Values — sync dengan constants/xp.ts di frontend
    public const XP_VALUES = [
        'WATCH_VIDEO'       => 10,
        'PASS_QUIZ'         => 30,
        'DAILY_QUIZ'        => 20,
        'DAILY_QUIZ_STREAK' => 40,
        'COMPLETE_COURSE'   => 100,
        'FLASH_QUIZ_PERFECT'=> 75,
        'STREAK_7_DAYS'     => 50,
        'REFERRAL'          => 100,
    ];

    public function addXP(User $user, string $reason, ?string $referenceId = null): XPLog
    {
        $amount = self::XP_VALUES[$reason]
            ?? throw new \InvalidArgumentException("XP reason tidak valid: {$reason}");

        $log = XPLog::create([
            'user_id'      => $user->id,
            'amount'       => $amount,
            'reason'       => $reason,
            'reference_id' => $referenceId,
        ]);

        $user->increment('xp_total', $amount);
        $this->checkAndUpdateLevel($user);

        return $log;
    }

    private function checkAndUpdateLevel(User $user): void
    {
        $newLevel = $this->getLevelFromXP($user->fresh()->xp_total);
        if ($newLevel !== $user->level) {
            $user->update(['level' => $newLevel]);
        }
    }

    private function getLevelFromXP(int $xp): int
    {
        $levels = [
            26 => 22000, 21 => 11000, 16 => 5000, 11 => 2000,
            6  => 700,   5  => 500,   2  => 100,   1  => 0,
        ];
        foreach ($levels as $level => $minXp) {
            if ($xp >= $minXp) return $level;
        }
        return 1;
    }
}
```

---

## 6. KOMUNIKASI FRONTEND ↔ BACKEND

### 6A. Standard Response Type — Frontend

```typescript
// src/types/api.types.ts — Selalu cocokkan dengan format Laravel response

export type ApiResponse<T> = {
  data: T
  message: string
  errors?: Record<string, string[]> | null
}

export type PaginatedResponse<T> = {
  data: T[]
  message: string
  meta: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}
```

### 6B. Error Handling di Frontend

```typescript
// src/lib/handleApiError.ts
import type { AxiosError } from 'axios'
import { toast } from 'sonner'

export function handleApiError(error: unknown, fallback = 'Terjadi kesalahan'): void {
  const axiosError = error as AxiosError<{ message: string }>
  const message = axiosError.response?.data?.message ?? fallback
  toast.error(message)
  console.error('[API Error]', axiosError.response?.data)
}
```

### 6C. Endpoint Base URL

```
Development : Frontend port 3000 → proxy /api ke Laravel port 8000 (via vite.config.ts)
Production  : Frontend → https://bisaexcel.com (Vercel)
              Backend  → https://api.bisaexcel.com (Railway / Fly.io)
CORS        : Laravel harus allowOrigin untuk domain frontend — config di config/cors.php
```

---

## 7. ATURAN HALAMAN & FITUR

### 7A. Setiap Halaman (Frontend) WAJIB Punya

```
✅ Document title — via komponen <PageMeta title="..." />
✅ Loading state — Skeleton dark (sesuai DESIGN.md Section 4I), gunakan TanStack Query isLoading
✅ Empty state — komponen: components/shared/EmptyState.tsx
✅ Error state — komponen: components/shared/ErrorState.tsx + TanStack Query isError
✅ Responsive: mobile (375px), tablet (768px), desktop (1280px)
✅ Protected route — gunakan komponen <ProtectedRoute> jika butuh auth
```

```typescript
// Pattern halaman standar
export default function KursusPage() {
  const { data: courses, isLoading, isError } = useCourses()

  if (isLoading) return <CourseListSkeleton />
  if (isError)   return <ErrorState message="Gagal memuat kursus" onRetry={() => refetch()} />
  if (!courses?.length) return <EmptyState icon={BookOpen} message="Belum ada kursus" />

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map(course => <CourseCard key={course.id} course={course} />)}
    </div>
  )
}
```

### 7B. Setiap Endpoint API (Backend) WAJIB

```
✅ FormRequest validation
✅ Policy authorization (jika resource-specific)
✅ API Resource (bukan raw model) untuk response
✅ Dokumentasi di docs/api/[domain].md
✅ Error handling dengan try-catch dan response format standar
```

### 7C. Gamifikasi — Konstanta (Sync FE & BE)

```typescript
// frontend/src/constants/xp.ts — HARUS SAMA dengan GamificationService::XP_VALUES
export const XP_VALUES = {
  WATCH_VIDEO          : 10,
  PASS_QUIZ            : 30,
  DAILY_QUIZ           : 20,
  DAILY_QUIZ_STREAK    : 40,
  COMPLETE_COURSE      : 100,
  FLASH_QUIZ_PERFECT   : 75,
  STREAK_7_DAYS        : 50,
  REFERRAL             : 100,
} as const

// frontend/src/constants/levels.ts
export const LEVELS = [
  { level: 1,  min_xp: 0,     title: 'Pemula Excel' },
  { level: 2,  min_xp: 100,   title: 'Pemula Excel' },
  { level: 5,  min_xp: 500,   title: 'Pemula Excel' },
  { level: 6,  min_xp: 700,   title: 'Pengguna Excel' },
  { level: 10, min_xp: 1500,  title: 'Pengguna Excel' },
  { level: 11, min_xp: 2000,  title: 'Excel Expert' },
  { level: 15, min_xp: 4000,  title: 'Excel Expert' },
  { level: 16, min_xp: 5000,  title: 'Excel Master' },
  { level: 20, min_xp: 9000,  title: 'Excel Master' },
  { level: 21, min_xp: 11000, title: 'Excel Grandmaster' },
  { level: 25, min_xp: 18000, title: 'Excel Grandmaster' },
  { level: 26, min_xp: 22000, title: 'Excel Legend' },
] as const
```

### 7D. Video Player — Frontend

```typescript
// src/components/course/VideoPlayer.tsx
const SAVE_INTERVAL_SECONDS = 5
const COMPLETE_THRESHOLD = 0.9

export function VideoPlayer({ lessonId, videoUrl, lastWatchedSeconds = 0 }: VideoPlayerProps) {
  const playerRef = useRef<HTMLVideoElement>(null)
  const lastSavedRef = useRef(0)
  const { mutate: updateProgress } = useUpdateVideoProgress()
  const { mutate: markComplete } = useMarkLessonComplete()

  const handleTimeUpdate = useCallback(() => {
    const video = playerRef.current
    if (!video) return
    const currentTime = Math.floor(video.currentTime)
    const progress = video.currentTime / video.duration

    if (currentTime - lastSavedRef.current >= SAVE_INTERVAL_SECONDS) {
      lastSavedRef.current = currentTime
      updateProgress({ lessonId, watchSeconds: currentTime })
    }
    if (progress >= COMPLETE_THRESHOLD) {
      markComplete({ lessonId })
    }
  }, [lessonId, updateProgress, markComplete])

  return (
    <video
      ref={playerRef}
      src={videoUrl}
      onTimeUpdate={handleTimeUpdate}
      onLoadedMetadata={() => {
        if (playerRef.current && lastWatchedSeconds > 0)
          playerRef.current.currentTime = lastWatchedSeconds
      }}
      controls
      className="w-full rounded-xl"
    />
  )
}
```

---

## 8. ATURAN KERJA AGENT (UNTUK CODEX & SEMUA AI)

### 8A. SEBELUM Mulai Coding — Wajib Output Ini

```
1. TASK            : [Apa yang akan dibuat — spesifik]
2. LAYER           : [Frontend / Backend / Keduanya]
3. FILES BARU      : [Daftar lengkap path file baru — pisahkan FE dan BE]
4. FILES DIUBAH    : [Daftar lengkap path file yang diedit + bagian yang berubah]
5. ENDPOINT BARU   : [Method + path API, atau "Tidak ada"]
6. DATABASE        : [Migration baru / perubahan schema, atau "Tidak ada"]
7. DEPENDENSI      : [Package npm/composer baru, atau "Tidak ada"]
8. DESIGN REF      : [Section DESIGN.md yang relevan untuk task ini]
9. ASUMSI          : [Sebutkan semua asumsi sebelum lanjut]
```

### 8B. SESUDAH Selesai Coding — Wajib Output Ini

```
1. CARA TEST  : [Langkah test step-by-step — pisahkan FE dan BE]
2. ENV VARS   : [Variable baru yang harus ditambah di .env FE dan/atau BE]
3. MIGRATION  : [Perintah: php artisan migrate, atau "Tidak ada"]
4. BELUM DIBUAT: [Bagian yang di-skip + alasan]
5. CATATAN    : [Hal penting untuk owner]
```

### 8C. Scope Control — SANGAT PENTING

```
❌ DILARANG tanpa instruksi eksplisit:
  - Membuat fitur yang tidak diminta
  - Mengubah file yang tidak relevan (termasuk lintas layer)
  - Mengganti library/package
  - Melakukan "improvement" atau "refactor" yang tidak diminta
  - Improvisasi warna/font/layout di luar DESIGN.md
  - Menambah halaman/komponen/endpoint baru selain yang diminta
  - Mengubah migrations yang sudah dijalankan — buat migration baru

✅ WAJIB dilakukan:
  - Tanya sebelum mulai jika ada ambiguitas
  - Kerjakan SATU fitur sampai selesai
  - Ikuti struktur folder (2A untuk FE, 2B untuk BE)
  - Ikuti DESIGN.md untuk semua keputusan visual
  - Buat endpoint backend dulu, lalu konsumsi di frontend
  - Update docs/api/ setiap buat endpoint baru
```

### 8D. Ketika Ada Error

```
1. JANGAN fix dengan cara yang mengubah arsitektur
2. Tampilkan error message LENGKAP (copy-paste, bukan ringkasan)
3. Jelaskan 1–3 kemungkinan penyebab
4. Tanyakan konfirmasi sebelum apply fix
5. Untuk error CORS: cek config/cors.php di Laravel, bukan ubah Axios
6. Untuk error 401: cek Sanctum config, bukan bypass middleware
```

### 8E. Kapan Harus Bertanya (Bukan Mengarang)

```
Agent WAJIB bertanya jika:
  ✋ Schema tabel yang akan di-query tidak ada di konteks migration
  ✋ Endpoint API yang akan di-konsumsi frontend belum terdokumentasi di docs/api/
  ✋ Task membutuhkan akses ke resource yang dilindungi Policy tapi Policy belum ada
  ✋ Ada dua cara implementasi yang mempengaruhi arsitektur
  ✋ Instruksi task bertentangan dengan aturan di AGENTS.md atau DESIGN.md

Agent TIDAK perlu bertanya untuk:
  ✓ Detail styling — gunakan DESIGN.md
  ✓ Nama file/folder — ikuti struktur Section 2
  ✓ Error handling pattern — ikuti Section 4B (FE) / Section 5B (BE)
  ✓ Response format API — selalu ikuti Section 5B
  ✓ Query builder syntax — gunakan Eloquent / spatie/laravel-query-builder
```

---

## 9. CHECKLIST KUALITAS PER FASE

### FASE 1 — MVP

```
SETUP PROJECT
□ Vite + React + TypeScript + Tailwind init
□ shadcn/ui init + konfigurasi dark theme
□ Laravel 11 + Sanctum init
□ CORS dikonfigurasi untuk localhost:3000
□ .env FE dan BE dikonfigurasi

AUTH
□ Register email + password (FE form + BE endpoint)
□ Login email + password (simpan token di Zustand persist)
□ Logout (hapus token, invalidate semua query)
□ Middleware ProtectedRoute di frontend
□ Laravel Policy dasar terpasang

LANDING PAGE
□ Hero section + CTA (lihat DESIGN.md Section 5A)
□ Stats bar (animasi counter — Framer Motion)
□ Preview kursus populer (fetch dari API publik)
□ Responsive mobile

KATALOG KURSUS
□ Grid kursus dengan CourseCard (dark theme)
□ Filter level (pemula/menengah/mahir) — query param ke API
□ Search (debounced, query param ke API)
□ Halaman detail kursus
□ Preview gratis (video pertama tanpa login)

VIDEO PLAYER
□ Putar video (HTML5 <video>)
□ Auto-resume posisi terakhir (dari API progress)
□ Tandai selesai otomatis (90% threshold)
□ Simpan progress setiap 5 detik ke API

KUIS
□ Pilihan ganda dengan timer (state di useQuizStore)
□ Submit ke API → terima score + XP earned
□ Pembahasan setelah jawab
□ Quiz result screen (lihat DESIGN.md Section 5E)

XP & GAMIFIKASI
□ XP ditambah di backend setelah video selesai
□ XP ditambah di backend setelah kuis lulus
□ XP bar di profile/dashboard (data dari API)

PAYMENT
□ Inisiasi transaksi → dapat Snap token dari API
□ Open Midtrans Snap popup di frontend
□ Webhook Laravel update status transaksi
□ Halaman konfirmasi setelah bayar

DEPLOY
□ Frontend: Vercel (vite build → dist)
□ Backend: Railway / Fly.io (PHP server)
□ Environment variables terkonfigurasi di kedua platform
□ CORS production domain dikonfigurasi di Laravel
□ Dark theme konsisten di semua halaman
```

---

## 10. ENVIRONMENT VARIABLES

### 10A. Frontend — `.env` (Vite)

```bash
# frontend/.env — JANGAN commit ke GitHub

VITE_APP_NAME=BisaExcel.com
VITE_APP_URL=http://localhost:3000

# Laravel API
VITE_API_URL=http://localhost:8000/api/v1

# Midtrans (client-side Snap.js)
VITE_MIDTRANS_CLIENT_KEY=SB-Mid-client-xxx
VITE_MIDTRANS_SNAP_URL=https://app.sandbox.midtrans.com/snap/snap.js
```

### 10B. Backend — `.env` (Laravel)

```bash
# backend/.env — JANGAN commit ke GitHub

APP_NAME="BisaExcel.com"
APP_ENV=local
APP_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000

# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=bisaexcel
DB_USERNAME=root
DB_PASSWORD=

# Sanctum
SANCTUM_STATEFUL_DOMAINS=localhost:3000

# Supabase Storage (S3-compatible)
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx
AWS_DEFAULT_REGION=ap-southeast-1
AWS_BUCKET=bisaexcel-storage
AWS_ENDPOINT=https://xxxx.supabase.co/storage/v1/s3

# Midtrans
MIDTRANS_SERVER_KEY=SB-Mid-server-xxx
MIDTRANS_IS_PRODUCTION=false

# Resend / Mail
MAIL_MAILER=smtp
MAIL_HOST=smtp.resend.com
MAIL_PORT=465
MAIL_USERNAME=resend
MAIL_PASSWORD=re_xxx
MAIL_FROM_ADDRESS=noreply@bisaexcel.com

# Queue & Cache
QUEUE_CONNECTION=database
CACHE_DRIVER=file
```

---

## 11. PROMPT PEMBUKA SESI BARU ✅

**Copy-paste prompt ini setiap kali mulai sesi baru (Claude Code / Cursor / Codex):**

```
Kamu adalah senior full-stack developer yang membantu saya membangun BisaExcel.com.
Arsitektur: Vite + React (Frontend) ↔ Laravel 11 REST API (Backend).

LANGKAH PERTAMA — sebelum apapun:
1. Baca AGENTS.md → pahami semua aturan teknis, kode, struktur, dan workflow
2. Baca DESIGN.md → pahami SEMUA keputusan visual: warna, font, komponen
3. Baca CONTEXT.md → pahami fitur lengkap dan roadmap
4. Konfirmasi dengan menjawab:
   "Sudah baca AGENTS.md v3.0, DESIGN.md, dan CONTEXT.md. Siap membantu.
    Tema: Dark Premium Green (#080E0A). Stack: Vite 5 + React 18 + TypeScript strict
    + Tailwind + shadcn/ui (frontend) | Laravel 11 + Sanctum + MySQL (backend)."

ATURAN TIDAK BOLEH DILANGGAR:
  FRONTEND:
  - Tidak boleh ada warna/font/spacing yang bertentangan dengan DESIGN.md
  - Tidak boleh ada `any` di TypeScript
  - Tidak boleh fetch API langsung di komponen — selalu via /src/api/*.api.ts + TanStack Query
  - Axios instance HANYA di /src/lib/axios.ts
  - Jangan gunakan 'use client' — itu Next.js, bukan Vite

  BACKEND:
  - Tidak boleh ada logic bisnis di Controller — pindahkan ke Service
  - Tidak boleh bypass Form Request validation
  - Tidak boleh ubah migration yang sudah dijalankan — buat migration baru
  - Selalu gunakan Policy untuk otorisasi resource
  - Response format HARUS konsisten: { data, message, errors }

  UMUM:
  - Tidak boleh membuat fitur di luar scope task yang diminta
  - Jika ragu → TANYA, jangan mengarang
  - Buat endpoint backend dulu sebelum konsumsi di frontend
  - Update docs/api/ setiap kali buat endpoint baru

Saat ini saya di [FASE 1 / 2 / 3].
Layer yang dikerjakan: [Frontend / Backend / Keduanya].

Task yang ingin dikerjakan sekarang:
[TULIS SATU FITUR SPESIFIK DI SINI]

Sebelum coding, output:
- Layer mana yang akan disentuh (FE / BE / keduanya)
- Files yang akan dibuat/diubah (pisahkan FE dan BE)
- Endpoint API baru (jika ada)
- Migration baru (jika ada)
- Section DESIGN.md yang relevan
- Semua asumsi yang kamu buat
```

---

## 12. REFERENSI CEPAT

### Frontend

```
Axios instance global        → src/lib/axios.ts
Query client config          → src/lib/queryClient.ts
Semua route aplikasi         → src/app/router.tsx
Auth store (token, user)     → src/stores/useAuthStore.ts
Quiz state aktif             → src/stores/useQuizStore.ts
API functions kursus         → src/api/courses.api.ts
Hook data kursus             → src/hooks/useCourse.ts
Hook auth                    → src/hooks/useAuth.ts
Hook XP & level              → src/hooks/useXP.ts
Type API response            → src/types/api.types.ts
Type models                  → src/types/models.types.ts
Handle API error             → src/lib/handleApiError.ts
XP constants                 → src/constants/xp.ts (sync dengan backend)
Level constants              → src/constants/levels.ts
Route constants              → src/constants/routes.ts
```

### Backend

```
Semua route API              → routes/api.php
Auth endpoints               → AuthController.php
Kursus endpoints             → CourseController.php
Quiz submit logic            → QuizService.php
Tambah XP user               → GamificationService::addXP()
Buat transaksi Midtrans      → PaymentService::createSnapToken()
Webhook Midtrans             → WebhookController.php
Generate sertifikat          → CertificateService.php
Model user + relations       → app/Models/User.php
Enums status & level         → app/Enums/
CORS config                  → config/cors.php
Queue jobs                   → app/Jobs/
```

### Design

```
Warna token utama            → DESIGN.md Section 1
Komponen Button              → DESIGN.md Section 4A
Komponen Card                → DESIGN.md Section 4B
Progress Bar                 → DESIGN.md Section 4E
Sidebar / Navbar             → DESIGN.md Section 4F
Toast / Notifikasi           → DESIGN.md Section 4G
Spec halaman Dashboard       → DESIGN.md Section 5B
Spec halaman Leaderboard     → DESIGN.md Section 5D
Spec halaman Kuis            → DESIGN.md Section 5E
Animasi Framer Motion        → DESIGN.md Section 6A
globals.css setup            → DESIGN.md Section 8
tailwind.config setup        → DESIGN.md Section 9
```

---

*AGENTS.md v3.0 — BisaExcel.com*
*Stack: Vite 5 + React 18 (Frontend) | Laravel 11 (Backend)*
*Update file ini setiap kali ada keputusan arsitektur baru*
*Selalu baca bersama DESIGN.md dan CONTEXT.md*