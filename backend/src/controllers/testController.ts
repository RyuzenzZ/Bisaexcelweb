import type { Request, Response } from 'express'
import { z } from 'zod'
import { prisma } from '../config/prisma.js'
import { sendError, sendSuccess } from '../utils/apiResponse.js'
import { normalizeAnswer } from '../utils/normalizeAnswer.js'
import { getRouteParam } from '../utils/routeParams.js'

const checkAnswerSchema = z.object({ answer: z.string().min(1, 'Jawaban wajib diisi.') })

export async function listTests(_req: Request, res: Response) {
  const tests = await prisma.testExcel.findMany({ where: { isPublished: true }, orderBy: { createdAt: 'desc' } })
  const publicTests = tests.map(({ expectedAnswer: _expectedAnswer, ...test }) => test)
  return sendSuccess(res, publicTests, 'Daftar Test Excel berhasil dimuat.')
}

export async function getTest(req: Request, res: Response) {
  const test = await prisma.testExcel.findUnique({ where: { slug: getRouteParam(req, 'slug') } })
  if (!test || !test.isPublished) return sendError(res, 'Test Excel tidak ditemukan.', null, 404)
  const { expectedAnswer: _expectedAnswer, ...publicTest } = test
  return sendSuccess(res, publicTest, 'Detail Test Excel berhasil dimuat.')
}

export async function checkTestAnswer(req: Request, res: Response) {
  const parsed = checkAnswerSchema.safeParse(req.body)
  if (!parsed.success) return sendError(res, 'Jawaban tidak valid.', parsed.error.flatten(), 422)

  const test = await prisma.testExcel.findUnique({ where: { slug: getRouteParam(req, 'slug') } })
  if (!test || !test.isPublished) return sendError(res, 'Test Excel tidak ditemukan.', null, 404)

  const isCorrect = normalizeAnswer(parsed.data.answer) === normalizeAnswer(test.expectedAnswer)
  return sendSuccess(
    res,
    {
      isCorrect,
      score: isCorrect ? 100 : 0,
      formulaSkills: test.formulaSkills,
    },
    isCorrect ? 'Jawaban berhasil diperiksa dan benar.' : 'Jawaban berhasil diperiksa, tetapi belum tepat.',
  )
}

export async function getTestProducts(req: Request, res: Response) {
  const test = await prisma.testExcel.findUnique({ where: { slug: getRouteParam(req, 'slug') } })
  if (!test) return sendError(res, 'Test Excel tidak ditemukan.', null, 404)

  const products = await prisma.digitalProduct.findMany({ where: { relatedTestId: test.id, isActive: true } })
  return sendSuccess(res, products, 'Produk digital test berhasil dimuat.')
}

export async function getExplanationPreview(req: Request, res: Response) {
  const test = await prisma.testExcel.findUnique({
    where: { slug: getRouteParam(req, 'slug') },
    include: { testExplanation: true },
  })
  if (!test || !test.testExplanation) return sendError(res, 'Preview penjelasan tidak ditemukan.', null, 404)

  return sendSuccess(
    res,
    {
      isLocked: test.testExplanation.isLocked,
      preview: test.testExplanation.isLocked
        ? 'Jawaban dan tutorial lengkap terkunci sebagai produk digital.'
        : test.testExplanation.answerText,
      solutionFileAvailable: Boolean(test.testExplanation.solutionFileUrl),
    },
    'Preview penjelasan berhasil dimuat.',
  )
}
