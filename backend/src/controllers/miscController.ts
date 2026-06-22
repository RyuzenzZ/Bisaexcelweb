import type { Request, Response } from 'express'
import { z } from 'zod'
import { prisma } from '../config/prisma.js'
import { sendError, sendSuccess } from '../utils/apiResponse.js'
import { getRouteParam } from '../utils/routeParams.js'

const inhouseSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(5),
  needType: z.enum(['inhouse', 'private_class', 'template', 'general']).default('general'),
})

export async function listClasses(_req: Request, res: Response) {
  const data = await prisma.classProgram.findMany({ where: { isActive: true }, orderBy: { createdAt: 'desc' } })
  return sendSuccess(res, data, 'Daftar kelas berhasil dimuat.')
}

export async function createInhouseRequest(req: Request, res: Response) {
  const parsed = inhouseSchema.safeParse(req.body)
  if (!parsed.success) return sendError(res, 'Data permintaan tidak valid.', parsed.error.flatten(), 422)

  const data = await prisma.inhouseRequest.create({ data: parsed.data })
  return sendSuccess(res, data, 'Permintaan training berhasil dikirim.', 201)
}

export async function listCertificates(_req: Request, res: Response) {
  const data = await prisma.certificate.findMany({ orderBy: { issuedAt: 'desc' } })
  return sendSuccess(res, data, 'Daftar certificate berhasil dimuat.')
}

export async function getCertificate(req: Request, res: Response) {
  const data = await prisma.certificate.findUnique({ where: { certificateCode: getRouteParam(req, 'code') } })
  if (!data) return sendError(res, 'Certificate tidak ditemukan.', null, 404)
  return sendSuccess(res, data, 'Certificate berhasil dimuat.')
}

export async function listPortfolios(_req: Request, res: Response) {
  const data = await prisma.portfolio.findMany({ orderBy: { updatedAt: 'desc' } })
  return sendSuccess(res, data, 'Daftar portfolio berhasil dimuat.')
}

export async function getPortfolio(req: Request, res: Response) {
  const data = await prisma.portfolio.findUnique({ where: { username: getRouteParam(req, 'username') } })
  if (!data) return sendError(res, 'Portfolio tidak ditemukan.', null, 404)
  return sendSuccess(res, data, 'Portfolio berhasil dimuat.')
}
