import type { NextFunction, Request, Response } from 'express'
import { prisma } from '../config/prisma.js'
import { sendError } from '../utils/apiResponse.js'
import { verifyAccessToken } from '../utils/jwt.js'

export type AuthUser = {
  id: string
  name: string
  username: string
  email: string
  avatarUrl: string | null
  role: string
}

export type AuthenticatedRequest = Request & { user?: AuthUser }

function getBearerToken(req: Request) {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) return null
  return header.slice('Bearer '.length).trim()
}

export async function optionalAuth(req: AuthenticatedRequest, _res: Response, next: NextFunction) {
  const token = getBearerToken(req)
  if (!token) return next()
  const payload = verifyAccessToken(token)
  if (!payload) return next()
  const user = await prisma.user.findUnique({ where: { id: payload.sub } })
  if (user) req.user = { id: user.id, name: user.name, username: user.username, email: user.email, avatarUrl: user.avatarUrl, role: user.role }
  return next()
}

export async function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  await optionalAuth(req, res, () => undefined)
  if (!req.user) return sendError(res, 'Kamu perlu login dulu untuk mengakses fitur ini.', null, 401)
  return next()
}