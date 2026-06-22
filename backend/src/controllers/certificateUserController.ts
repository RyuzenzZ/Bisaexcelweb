import type { Request, Response } from 'express'
import { prisma } from '../config/prisma.js'
import type { AuthenticatedRequest } from '../middlewares/authMiddleware.js'
import { generateCertificate } from '../services/certificateService.js'
import { sendError, sendSuccess } from '../utils/apiResponse.js'
import { getRouteParam } from '../utils/routeParams.js'

export async function generateMyCertificate(req: AuthenticatedRequest, res: Response) {
  if (!req.user) return sendError(res, 'Kamu perlu login dulu untuk generate certificate.', null, 401)
  const result = await generateCertificate(req.user.id)
  if (!result.certificate) return sendSuccess(res, { certificate: null, eligibility: { isEligible: result.eligibility.isEligible, requirements: result.eligibility.requirements } }, 'Syarat certificate belum lengkap.')
  return sendSuccess(res, { certificate: result.certificate, eligibility: { isEligible: result.eligibility.isEligible, requirements: result.eligibility.requirements } }, 'Certificate berhasil disiapkan.')
}

export async function verifyCertificate(req: Request, res: Response) {
  const certificate = await prisma.userCertificate.findUnique({ where: { certificateCode: getRouteParam(req, 'code') }, include: { user: true } })
  if (!certificate) return sendSuccess(res, { isValid: false }, 'Certificate tidak ditemukan.')
  return sendSuccess(res, {
    isValid: true,
    certificateCode: certificate.certificateCode,
    name: certificate.user.name,
    username: certificate.user.username,
    title: certificate.title,
    level: certificate.level,
    issuedAt: certificate.issuedAt,
    skillEvidence: certificate.skillEvidence,
    formulaMastered: certificate.formulaMastered,
  }, 'Certificate valid.')
}