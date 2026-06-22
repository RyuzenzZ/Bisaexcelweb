import type { Request, Response } from 'express'
import { prisma } from '../config/prisma.js'
import { sendError, sendSuccess } from '../utils/apiResponse.js'
import { getRouteParam } from '../utils/routeParams.js'

export async function listArticles(_req: Request, res: Response) {
  const data = await prisma.article.findMany({ where: { isPublished: true }, orderBy: { createdAt: 'desc' } })
  return sendSuccess(res, data, 'Daftar artikel berhasil dimuat.')
}

export async function getArticle(req: Request, res: Response) {
  const data = await prisma.article.findUnique({ where: { slug: getRouteParam(req, 'slug') } })
  if (!data || !data.isPublished) return sendError(res, 'Artikel tidak ditemukan.', null, 404)
  return sendSuccess(res, data, 'Detail artikel berhasil dimuat.')
}

export async function listVideos(_req: Request, res: Response) {
  const data = await prisma.video.findMany({ where: { isPublished: true }, orderBy: { orderIndex: 'asc' } })
  return sendSuccess(res, data, 'Daftar video berhasil dimuat.')
}

export async function getVideo(req: Request, res: Response) {
  const data = await prisma.video.findUnique({ where: { slug: getRouteParam(req, 'slug') } })
  if (!data || !data.isPublished) return sendError(res, 'Video tidak ditemukan.', null, 404)
  return sendSuccess(res, data, 'Detail video berhasil dimuat.')
}

export async function listChallenges(_req: Request, res: Response) {
  const data = await prisma.challenge.findMany({ where: { isPublished: true }, orderBy: { createdAt: 'desc' } })
  return sendSuccess(res, data, 'Daftar challenge berhasil dimuat.')
}

export async function getChallenge(req: Request, res: Response) {
  const data = await prisma.challenge.findUnique({ where: { slug: getRouteParam(req, 'slug') } })
  if (!data || !data.isPublished) return sendError(res, 'Challenge tidak ditemukan.', null, 404)
  return sendSuccess(res, data, 'Detail challenge berhasil dimuat.')
}

export async function listTips(_req: Request, res: Response) {
  const data = await prisma.tip.findMany({ where: { isPublished: true }, orderBy: { createdAt: 'desc' } })
  return sendSuccess(res, data, 'Daftar tips berhasil dimuat.')
}

export async function getTip(req: Request, res: Response) {
  const data = await prisma.tip.findUnique({ where: { slug: getRouteParam(req, 'slug') } })
  if (!data || !data.isPublished) return sendError(res, 'Tips tidak ditemukan.', null, 404)
  return sendSuccess(res, data, 'Detail tips berhasil dimuat.')
}

export async function listTemplates(_req: Request, res: Response) {
  const data = await prisma.template.findMany({ where: { isPublished: true }, orderBy: { createdAt: 'desc' } })
  return sendSuccess(res, data, 'Daftar template berhasil dimuat.')
}

export async function getTemplate(req: Request, res: Response) {
  const data = await prisma.template.findUnique({ where: { slug: getRouteParam(req, 'slug') } })
  if (!data || !data.isPublished) return sendError(res, 'Template tidak ditemukan.', null, 404)
  return sendSuccess(res, data, 'Detail template berhasil dimuat.')
}
