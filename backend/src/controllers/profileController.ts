import type { Request, Response } from 'express'
import { prisma } from '../config/prisma.js'
import type { AuthenticatedRequest } from '../middlewares/authMiddleware.js'
import { checkEligibility } from '../services/certificateService.js'
import { recommendationsFromProgress } from '../services/userProgressService.js'
import { sendError, sendSuccess } from '../utils/apiResponse.js'
import { getRouteParam } from '../utils/routeParams.js'

function safeUser(user: { id: string; name: string; username: string; email: string; avatarUrl: string | null; role: string }) {
  return { id: user.id, name: user.name, username: user.username, email: user.email, avatarUrl: user.avatarUrl, role: user.role }
}

async function profileByUsername(username: string) {
  return prisma.user.findUnique({ where: { username }, include: { profile: true, progress: true, certificates: { orderBy: { issuedAt: 'desc' } } } })
}

export async function profileMe(req: AuthenticatedRequest, res: Response) {
  if (!req.user) return sendError(res, 'Kamu perlu login dulu untuk melihat profile.', null, 401)
  const user = await profileByUsername(req.user.username)
  if (!user) return sendError(res, 'Profile tidak ditemukan.', null, 404)
  return sendSuccess(res, { user: safeUser(user), profile: user.profile, progress: user.progress }, 'Profile berhasil dimuat.')
}

export async function publicProfile(req: Request, res: Response) {
  const user = await profileByUsername(getRouteParam(req, 'username'))
  if (!user) return sendError(res, 'Profile tidak ditemukan.', null, 404)
  return sendSuccess(res, { user: safeUser(user), profile: user.profile, progress: user.progress }, 'Profile berhasil dimuat.')
}

export async function publicPortfolio(req: Request, res: Response) {
  const user = await profileByUsername(getRouteParam(req, 'username'))
  if (!user) return sendError(res, 'Profile tidak ditemukan.', null, 404)
  const attempts = await prisma.playAttempt.findMany({ where: { userId: user.id, isSaved: true }, orderBy: { submittedAt: 'desc' } })
  const challenges = await prisma.challengeCompletion.findMany({ where: { userId: user.id }, orderBy: { completedAt: 'desc' } })
  return sendSuccess(res, {
    user: safeUser(user),
    profile: user.profile,
    progress: user.progress,
    attempts,
    challenges,
    certificates: user.certificates,
    recommendations: recommendationsFromProgress(user.progress),
    emptyMessage: attempts.length ? null : 'Portfolio kamu masih kosong. Coba selesaikan Test Excel pertama biar skill kamu mulai tercatat.',
  }, 'Portfolio berhasil dimuat.')
}

export async function publicCertificates(req: Request, res: Response) {
  const user = await profileByUsername(getRouteParam(req, 'username'))
  if (!user) return sendError(res, 'Profile tidak ditemukan.', null, 404)
  const eligibility = await checkEligibility(user.id)
  return sendSuccess(res, { certificates: user.certificates, eligibility: { isEligible: eligibility.isEligible, requirements: eligibility.requirements } }, 'Certificate profile berhasil dimuat.')
}