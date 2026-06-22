import type { Response } from 'express'
import { z } from 'zod'
import { prisma } from '../config/prisma.js'
import type { AuthenticatedRequest } from '../middlewares/authMiddleware.js'
import { updateChallengeProgress } from '../services/userProgressService.js'
import { sendError, sendSuccess } from '../utils/apiResponse.js'
import { getRouteParam } from '../utils/routeParams.js'

const completeSchema = z.object({
  checklist: z.array(z.string()).optional(),
  skillsEarned: z.array(z.string()).optional(),
})

export async function completeChallenge(req: AuthenticatedRequest, res: Response) {
  if (!req.user) return sendError(res, 'Kamu perlu login dulu supaya challenge bisa tersimpan.', null, 401)
  const parsed = completeSchema.safeParse(req.body ?? {})
  if (!parsed.success) return sendError(res, 'Data challenge belum valid.', parsed.error.flatten(), 422)
  const slug = getRouteParam(req, 'slug')
  const skillsEarned = parsed.data.skillsEarned ?? ['Challenge praktik']
  const completion = await prisma.challengeCompletion.create({
    data: {
      userId: req.user.id,
      challengeId: slug,
      slug,
      skillsEarned,
    },
  })
  const progress = await updateChallengeProgress(req.user.id, skillsEarned)
  return sendSuccess(res, { completion, progress }, 'Challenge selesai dan progress kamu tersimpan.')
}