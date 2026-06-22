import type { Response } from 'express'
import { prisma } from '../config/prisma.js'
import type { AuthenticatedRequest } from '../middlewares/authMiddleware.js'
import { checkEligibility } from '../services/certificateService.js'
import { recommendationsFromProgress } from '../services/userProgressService.js'
import { sendError, sendSuccess } from '../utils/apiResponse.js'

function safeUser(user: { id: string; name: string; username: string; email: string; avatarUrl: string | null; role: string }) {
  return { id: user.id, name: user.name, username: user.username, email: user.email, avatarUrl: user.avatarUrl, role: user.role }
}

export async function dashboardMe(req: AuthenticatedRequest, res: Response) {
  if (!req.user) return sendError(res, 'Kamu perlu login dulu untuk membuka dashboard.', null, 401)
  const user = await prisma.user.findUnique({ where: { id: req.user.id }, include: { profile: true, progress: true, certificates: { orderBy: { issuedAt: 'desc' } } } })
  if (!user) return sendError(res, 'User tidak ditemukan.', null, 404)
  const recentAttempts = await prisma.playAttempt.findMany({ where: { userId: user.id, isSaved: true }, orderBy: { submittedAt: 'desc' }, take: 5 })
  const recentChallenges = await prisma.challengeCompletion.findMany({ where: { userId: user.id }, orderBy: { completedAt: 'desc' }, take: 5 })
  const certificateEligibility = await checkEligibility(user.id)
  return sendSuccess(res, {
    user: safeUser(user),
    profile: user.profile,
    progress: user.progress,
    recentAttempts,
    recentChallenges,
    certificates: user.certificates,
    ranking: { rank: user.progress?.rank ?? null, label: 'Ranking belajar MVP' },
    recommendations: recommendationsFromProgress(user.progress),
    certificateEligibility: { isEligible: certificateEligibility.isEligible, requirements: certificateEligibility.requirements },
  }, 'Dashboard berhasil dimuat.')
}

export async function myProgress(req: AuthenticatedRequest, res: Response) {
  if (!req.user) return sendError(res, 'Kamu perlu login dulu untuk melihat progress.', null, 401)
  const progress = await prisma.userProgress.findUnique({ where: { userId: req.user.id } })
  return sendSuccess(res, progress, 'Progress berhasil dimuat.')
}

export async function myAttempts(req: AuthenticatedRequest, res: Response) {
  if (!req.user) return sendError(res, 'Kamu perlu login dulu untuk melihat riwayat test.', null, 401)
  const attempts = await prisma.playAttempt.findMany({ where: { userId: req.user.id, isSaved: true }, orderBy: { submittedAt: 'desc' } })
  return sendSuccess(res, attempts, 'Riwayat attempt berhasil dimuat.')
}

export async function myRecommendations(req: AuthenticatedRequest, res: Response) {
  if (!req.user) return sendError(res, 'Kamu perlu login dulu untuk melihat rekomendasi.', null, 401)
  const progress = await prisma.userProgress.findUnique({ where: { userId: req.user.id } })
  return sendSuccess(res, recommendationsFromProgress(progress), 'Rekomendasi berhasil dimuat.')
}