import type { Request, Response, NextFunction } from 'express'
import { sendError } from '../utils/apiResponse.js'

export function notFoundHandler(_req: Request, res: Response): Response {
  return sendError(res, 'Endpoint tidak ditemukan.', null, 404)
}

export function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction): Response {
  console.error(error)
  return sendError(res, 'Terjadi kesalahan pada server.', error instanceof Error ? error.message : error, 500)
}
