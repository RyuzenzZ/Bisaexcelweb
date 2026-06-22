import type { Response } from 'express'
import { z } from 'zod'
import { prisma } from '../config/prisma.js'
import type { AuthenticatedRequest } from '../middlewares/authMiddleware.js'
import { ensureUserProgress } from '../services/userProgressService.js'
import { sendError, sendSuccess } from '../utils/apiResponse.js'
import { signAccessToken } from '../utils/jwt.js'
import { hashPassword, verifyPassword } from '../utils/password.js'

const registerSchema = z.object({
  name: z.string().min(2),
  username: z.string().min(3).max(32).regex(/^[a-z0-9_]+$/),
  email: z.string().email(),
  password: z.string().min(8),
})

const loginSchema = z.object({
  emailOrUsername: z.string().min(3),
  password: z.string().min(8),
})

const forgotPasswordSchema = z.object({ email: z.string().email() })
const resetPasswordSchema = z.object({ token: z.string().optional(), password: z.string().min(8).optional() })

function safeUser(user: { id: string; name: string; username: string; email: string; avatarUrl: string | null; role: string }) {
  return { id: user.id, name: user.name, username: user.username, email: user.email, avatarUrl: user.avatarUrl, role: user.role }
}

function tokenFor(user: { id: string; email: string; username: string; role: string }) {
  return signAccessToken({ sub: user.id, email: user.email, username: user.username, role: user.role })
}

async function authPayload(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId }, include: { profile: true, progress: true } })
  if (!user) return null
  return { user: safeUser(user), profile: user.profile, progress: user.progress, token: tokenFor(user) }
}

export async function register(req: AuthenticatedRequest, res: Response) {
  const parsed = registerSchema.safeParse({ ...req.body, username: typeof req.body?.username === 'string' ? req.body.username.toLowerCase().trim() : req.body?.username, email: typeof req.body?.email === 'string' ? req.body.email.toLowerCase().trim() : req.body?.email })
  if (!parsed.success) return sendError(res, 'Data daftar belum valid. Cek nama, username, email, dan password ya.', parsed.error.flatten(), 422)

  const existing = await prisma.user.findFirst({ where: { OR: [{ email: parsed.data.email }, { username: parsed.data.username }] } })
  if (existing) return sendError(res, 'Email atau username sudah dipakai. Coba pakai yang lain ya.', null, 409)

  const user = await prisma.user.create({
    data: {
      name: parsed.data.name,
      username: parsed.data.username,
      email: parsed.data.email,
      passwordHash: await hashPassword(parsed.data.password),
      profile: { create: { bio: 'Lagi bangun skill Excel bareng BisaExcel.', level: 'Pemula' } },
      progress: { create: {} },
    },
  })
  await ensureUserProgress(user.id)
  const payload = await authPayload(user.id)
  return sendSuccess(res, payload, 'Akun berhasil dibuat. Gas mulai belajar.', 201)
}

export async function login(req: AuthenticatedRequest, res: Response) {
  const parsed = loginSchema.safeParse(req.body)
  if (!parsed.success) return sendError(res, 'Email/username atau password belum cocok. Coba cek lagi ya.', null, 401)

  const identifier = parsed.data.emailOrUsername.toLowerCase().trim()
  const user = await prisma.user.findFirst({ where: { OR: [{ email: identifier }, { username: identifier }] } })
  if (!user) return sendError(res, 'Email/username atau password belum cocok. Coba cek lagi ya.', null, 401)
  const passwordOk = await verifyPassword(parsed.data.password, user.passwordHash)
  if (!passwordOk) return sendError(res, 'Email/username atau password belum cocok. Coba cek lagi ya.', null, 401)

  const payload = await authPayload(user.id)
  return sendSuccess(res, payload, 'Login berhasil. Progress kamu siap dicatat.')
}

export async function me(req: AuthenticatedRequest, res: Response) {
  if (!req.user) return sendError(res, 'Kamu perlu login dulu untuk mengakses fitur ini.', null, 401)
  const payload = await authPayload(req.user.id)
  if (!payload) return sendError(res, 'User tidak ditemukan.', null, 404)
  return sendSuccess(res, payload, 'Berhasil mengambil data user.')
}

export async function logout(_req: AuthenticatedRequest, res: Response) {
  return sendSuccess(res, { ok: true }, 'Logout berhasil. Sampai ketemu lagi.')
}

export async function forgotPassword(req: AuthenticatedRequest, res: Response) {
  const parsed = forgotPasswordSchema.safeParse(req.body)
  if (!parsed.success) return sendError(res, 'Format email belum valid.', parsed.error.flatten(), 422)
  return sendSuccess(res, { sent: false }, 'Kalau email terdaftar, instruksi reset akan dikirim saat email service sudah aktif.')
}

export async function resetPassword(req: AuthenticatedRequest, res: Response) {
  const parsed = resetPasswordSchema.safeParse(req.body)
  if (!parsed.success) return sendError(res, 'Data reset password belum valid.', parsed.error.flatten(), 422)
  return sendSuccess(res, { reset: false }, 'Reset password backend sudah punya route, tapi email delivery belum diaktifkan.')
}