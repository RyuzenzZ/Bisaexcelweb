import type { PlayCase as DbPlayCase, PlayQuestion as DbPlayQuestion } from '@prisma/client'
import type { Request, Response } from 'express'
import { prisma } from '../config/prisma.js'
import { getPlayCaseBySlug, getQuestionsByCaseId, getQuestionsBySlug, playCases as fallbackCases, type PlayAnswerSubmission, type PlayCase as FallbackCase, type PlayQuestion as FallbackQuestion } from '../data/playCases.js'
import type { AuthenticatedRequest } from '../middlewares/authMiddleware.js'
import { checkEligibility } from '../services/certificateService.js'
import { updateFromPlayAttempt } from '../services/userProgressService.js'
import { sendError, sendSuccess } from '../utils/apiResponse.js'
import { getRouteParam } from '../utils/routeParams.js'

type PlayMode = 'practice' | 'challenge' | 'ranked'
type QuestionCount = 10 | 20 | 30 | 60

type PublicQuestion = {
  id: string
  order: number
  questionText: string
  helperText?: string | null
  type: string
  difficulty: string
  points: number
  formulaHint?: string | null
  skill?: string | null
  levelLabel?: string | null
}

type CaseWithQuestions = DbPlayCase & { questions: DbPlayQuestion[] }

const supportedQuestionCounts: QuestionCount[] = [10, 20, 30, 60]

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : []
}

function availableQuestionCounts(total: number): QuestionCount[] {
  return supportedQuestionCounts.filter((count) => total >= count)
}

function normalizeMode(value: unknown, fallback: PlayMode = 'practice'): PlayMode {
  if (value === 'latihan') return 'practice'
  if (value === 'kompetisi') return 'ranked'
  if (value === 'practice' || value === 'challenge' || value === 'ranked') return value
  return fallback
}

function normalizeDifficulty(value: unknown, fallback = 'dasar') {
  if (typeof value !== 'string') return fallback
  const normalized = value.toLowerCase()
  if (normalized.includes('advanced') || normalized.includes('mahir') || normalized.includes('professional')) return 'advanced'
  if (normalized.includes('menengah')) return 'menengah'
  return 'dasar'
}

function normalizeQuestionCount(value: unknown, available: QuestionCount[]): QuestionCount | null {
  const parsed = Number(value)
  if (!supportedQuestionCounts.includes(parsed as QuestionCount)) return available[0] ?? null
  if (!available.includes(parsed as QuestionCount)) return null
  return parsed as QuestionCount
}

function timerSeconds(difficulty: string, questionCount: number, mode: PlayMode) {
  if (questionCount === 60) return 5400
  const table: Record<string, Record<number, number>> = {
    dasar: { 10: 15, 20: 25, 30: 40, 60: 60 },
    menengah: { 10: 20, 20: 35, 30: 50, 60: 75 },
    advanced: { 10: 25, 20: 45, 30: 60, 60: 90 },
  }
  const minutes = table[normalizeDifficulty(difficulty)]?.[questionCount] ?? 15
  const modeFactor = mode === 'ranked' ? 0.9 : mode === 'challenge' ? 1 : 1.15
  return Math.round(minutes * 60 * modeFactor)
}

type PublicQuestionSource = Pick<DbPlayQuestion, 'id' | 'order' | 'questionText' | 'helperText' | 'type' | 'difficulty' | 'points' | 'formulaHint' | 'skill' | 'levelLabel'>

function sanitizeQuestion(question: PublicQuestionSource): PublicQuestion {
  return {
    id: question.id,
    order: question.order,
    questionText: question.questionText,
    helperText: question.helperText,
    type: question.type,
    difficulty: question.difficulty,
    points: question.points,
    formulaHint: question.formulaHint,
    skill: question.skill,
    levelLabel: question.levelLabel,
  }
}

function caseListItem(playCase: CaseWithQuestions) {
  const questionTotal = playCase.questions.filter((question) => question.isPublished).length
  return {
    slug: playCase.slug,
    title: playCase.title,
    subtitle: playCase.subtitle,
    description: playCase.description,
    category: playCase.category,
    difficulty: playCase.difficulty,
    level: playCase.level,
    mode: playCase.mode,
    estimatedMinutes: playCase.estimatedMinutes,
    availableQuestionCounts: availableQuestionCounts(questionTotal),
    questionCount: questionTotal,
    basePoints: playCase.basePoints,
    hasDownload: playCase.hasDownload,
    downloadUrl: playCase.downloadUrl,
    workbookSheets: asStringArray(playCase.workbookSheets),
    tags: asStringArray(playCase.tags),
    skills: asStringArray(playCase.skills),
    isPremium: playCase.isPremium,
  }
}

function caseDetailItem(playCase: CaseWithQuestions) {
  const questionTotal = playCase.questions.filter((question) => question.isPublished).length
  return {
    ...caseListItem(playCase),
    heroCopy: playCase.heroCopy,
    instruction: playCase.instruction,
    timerRecommendations: Object.fromEntries(availableQuestionCounts(questionTotal).map((count) => [count, timerSeconds(playCase.difficulty, count, normalizeMode(playCase.mode))])),
    questionsPreview: playCase.questions.filter((question) => question.isPublished).slice(0, 5).map(sanitizeQuestion),
  }
}

function expandFallbackQuestions(playCase: FallbackCase) {
  const originals = getQuestionsByCaseId(playCase.id)
  const expanded: FallbackQuestion[] = [...originals]
  let cursor = 0
  while (expanded.length < 10 && originals.length) {
    const source = originals[cursor % originals.length]
    expanded.push({
      ...source,
      id: `${source.id}-extra-${expanded.length + 1}`,
      orderIndex: expanded.length + 1,
      questionText: `${source.questionText} (checkpoint tambahan)`,
      hint: source.hint ? `${source.hint} Fokus ke hasil akhirnya.` : 'Fokus isi hasil akhir dari file Excel.',
    })
    cursor += 1
  }
  return expanded
}

function fallbackListItem(playCase: FallbackCase) {
  const questions = expandFallbackQuestions(playCase)
  const mode = normalizeMode(playCase.mode)
  const difficulty = normalizeDifficulty(playCase.level)
  return {
    slug: playCase.slug,
    title: playCase.title,
    subtitle: playCase.professionCategory ?? playCase.category,
    description: playCase.description,
    category: playCase.category,
    difficulty,
    level: playCase.level,
    mode,
    estimatedMinutes: playCase.durationMinutes,
    availableQuestionCounts: availableQuestionCounts(questions.length),
    questionCount: questions.length,
    basePoints: playCase.totalPoints,
    hasDownload: playCase.file.hasDownload,
    downloadUrl: playCase.file.fileUrl,
    workbookSheets: playCase.file.sheets,
    tags: Array.from(new Set([playCase.category, ...playCase.formulas, ...playCase.skills])),
    skills: playCase.skills,
    isPremium: playCase.isPremiumSolution,
  }
}

function fallbackQuestion(question: FallbackQuestion, index: number): PublicQuestion {
  return {
    id: question.id,
    order: index + 1,
    questionText: question.questionText,
    helperText: question.hint,
    type: question.answerType,
    difficulty: 'dasar',
    points: question.points,
    formulaHint: question.formulaSkills.join(', '),
    skill: question.formulaSkills[0],
    levelLabel: index < 3 ? `Soal ${index + 1} - Pemanasan Data` : `Soal ${index + 1} - Naik Ritme`,
  }
}

function normalizeAnswer(value: string, type: string) {
  const compact = value.trim().replace(/\s+/g, ' ')
  if (type === 'number') {
    const numeric = compact.replace(/^rp\s?/i, '').replace(/%$/, '').replace(/\./g, '').replace(',', '.')
    const parsed = Number(numeric)
    if (Number.isFinite(parsed)) return String(parsed)
  }
  return compact.toLowerCase()
}

function isCorrect(question: DbPlayQuestion, userAnswer: string) {
  if (!userAnswer.trim()) return false
  const accepted = [question.correctAnswer, ...asStringArray(question.acceptedAnswers)]
  const normalizedUserAnswer = normalizeAnswer(userAnswer, question.type)
  if (question.tolerance != null && question.type === 'number') {
    const userNumber = Number(normalizedUserAnswer)
    return accepted.some((answer) => {
      const answerNumber = Number(normalizeAnswer(answer, question.type))
      return Number.isFinite(userNumber) && Number.isFinite(answerNumber) && Math.abs(userNumber - answerNumber) <= Number(question.tolerance)
    })
  }
  return accepted.some((answer) => normalizeAnswer(answer, question.type) === normalizedUserAnswer)
}

function gradeLabel(accuracy: number) {
  if (accuracy >= 90) return 'Siap ranked serius'
  if (accuracy >= 75) return 'Solid, tinggal rapihin speed'
  if (accuracy >= 55) return 'Mulai kebaca progresnya'
  return 'Belum maksimal, ini bahan latihan penting'
}

function calculateRankPoints(score: number, accuracy: number, durationSeconds: number, timerLimit: number, mode: PlayMode) {
  const accuracyBonus = accuracy >= 90 ? 20 : 0
  const speedBonus = timerLimit > 0 && durationSeconds <= timerLimit * 0.7 ? 15 : 0
  const modeBonus = mode === 'ranked' ? 10 : 0
  return score + accuracyBonus + speedBonus + modeBonus
}

async function dbCaseBySlug(slug: string) {
  return prisma.playCase.findFirst({
    where: { slug, isPublished: true },
    include: { questions: { where: { isPublished: true }, orderBy: { order: 'asc' } } },
  })
}

export async function listPlayCases(_req: Request, res: Response) {
  try {
    const rows = await prisma.playCase.findMany({
      where: { isPublished: true },
      include: { questions: { where: { isPublished: true }, orderBy: { order: 'asc' } } },
      orderBy: { createdAt: 'asc' },
    })
    const data = rows.length ? rows.map(caseListItem) : fallbackCases.filter((playCase) => playCase.isPublished).map(fallbackListItem)
    return sendSuccess(res, data, 'Daftar play case berhasil dimuat.')
  } catch (error) {
    console.error(error)
    return sendSuccess(res, fallbackCases.filter((playCase) => playCase.isPublished).map(fallbackListItem), 'Backend database play case belum siap, fallback lokal dipakai.')
  }
}

export async function getPlayCase(req: Request, res: Response) {
  try {
    const slug = getRouteParam(req, 'slug')
    const playCase = await dbCaseBySlug(slug)
    if (playCase) return sendSuccess(res, caseDetailItem(playCase), 'Detail play case berhasil dimuat.')

    const fallback = getPlayCaseBySlug(slug)
    if (!fallback || !fallback.isPublished) return sendError(res, 'Play case tidak ditemukan.', [], 404)
    const questions = expandFallbackQuestions(fallback)
    return sendSuccess(res, {
      ...fallbackListItem(fallback),
      heroCopy: `Di test ini kamu akan menyelesaikan ${fallback.title.toLowerCase()} dari file kasus nyata.`,
      instruction: fallback.rules.join('\n'),
      timerRecommendations: Object.fromEntries(availableQuestionCounts(questions.length).map((count) => [count, timerSeconds(normalizeDifficulty(fallback.level), count, normalizeMode(fallback.mode))])),
      questionsPreview: questions.slice(0, 5).map(fallbackQuestion),
    }, 'Detail play case fallback berhasil dimuat.')
  } catch (error) {
    console.error(error)
    return sendError(res, 'Backend belum merespons. Coba refresh atau pastikan server lokalnya lagi jalan.', [], 500)
  }
}

export async function getPlayQuestions(req: Request, res: Response) {
  try {
    const slug = getRouteParam(req, 'slug')
    const playCase = await dbCaseBySlug(slug)
    if (playCase) return sendSuccess(res, playCase.questions.map(sanitizeQuestion), 'Pertanyaan play case berhasil dimuat.')

    const fallback = getPlayCaseBySlug(slug)
    if (!fallback || !fallback.isPublished) return sendError(res, 'Play case tidak ditemukan.', [], 404)
    return sendSuccess(res, expandFallbackQuestions(fallback).map(fallbackQuestion), 'Pertanyaan play case fallback berhasil dimuat.')
  } catch (error) {
    console.error(error)
    return sendError(res, 'Pertanyaan belum bisa dimuat. Coba lagi sebentar lagi.', [], 500)
  }
}

export async function startPlayCase(req: AuthenticatedRequest, res: Response) {
  try {
    const slug = getRouteParam(req, 'slug')
    const playCase = await prisma.playCase.findFirst({
      where: { slug, isPublished: true },
      select: {
        id: true,
        slug: true,
        title: true,
        subtitle: true,
        description: true,
        category: true,
        difficulty: true,
        level: true,
        mode: true,
        estimatedMinutes: true,
        basePoints: true,
        hasDownload: true,
        downloadUrl: true,
        workbookSheets: true,
        tags: true,
        skills: true,
        isPremium: true,
        questions: {
          where: { isPublished: true },
          orderBy: { order: 'asc' },
          select: {
            id: true,
            order: true,
            questionText: true,
            helperText: true,
            type: true,
            difficulty: true,
            points: true,
            formulaHint: true,
            skill: true,
            levelLabel: true,
          },
        },
      },
    })

    if (!playCase) return sendError(res, 'Test Excel belum ditemukan.', [], 404)

    const available = availableQuestionCounts(playCase.questions.length)
    const requestedQuestionCount = Number(req.body?.questionCount ?? 10)
    if (!supportedQuestionCounts.includes(requestedQuestionCount as QuestionCount) || !available.includes(requestedQuestionCount as QuestionCount)) {
      return sendError(res, 'Soal untuk paket ini belum tersedia. Pilih paket soal yang lebih kecil dulu ya.', [], 422)
    }

    const questionCount = requestedQuestionCount as QuestionCount
    const mode = normalizeMode(req.body?.mode, normalizeMode(playCase.mode))
    const difficulty = normalizeDifficulty(req.body?.difficulty, playCase.difficulty)
    const selectedQuestions = playCase.questions.slice(0, questionCount)
    const startedAt = new Date()

    return sendSuccess(res, {
      startedAt: startedAt.toISOString(),
      timerSeconds: timerSeconds(difficulty, questionCount, mode),
      mode,
      questionCount,
      isSavedCandidate: false,
      case: {
        slug: playCase.slug,
        title: playCase.title,
        subtitle: playCase.subtitle,
        description: playCase.description,
        category: playCase.category,
        difficulty: playCase.difficulty,
        level: playCase.level,
        mode: playCase.mode,
        estimatedMinutes: playCase.estimatedMinutes,
        availableQuestionCounts: available,
        questionCount: playCase.questions.length,
        basePoints: playCase.basePoints,
        hasDownload: playCase.hasDownload,
        downloadUrl: playCase.downloadUrl,
        workbookSheets: asStringArray(playCase.workbookSheets),
        tags: asStringArray(playCase.tags),
        skills: asStringArray(playCase.skills),
        isPremium: playCase.isPremium,
      },
      selectedQuestions: selectedQuestions.map(sanitizeQuestion),
    }, 'Arena test siap dimulai.')
  } catch (error) {
    console.error(error)
    return sendError(res, 'Arena test belum bisa dimulai. Coba lagi sebentar lagi.', [], 500)
  }
}
export async function submitPlayCase(req: AuthenticatedRequest, res: Response) {
  try {
    const slug = getRouteParam(req, 'slug')
    const playCase = await dbCaseBySlug(slug)
    if (!playCase) return sendError(res, 'Play case tidak ditemukan atau belum masuk database.', [], 404)

    const answers = Array.isArray(req.body?.answers) ? req.body.answers : []
    const submissions: PlayAnswerSubmission[] = answers.map((item: { questionId?: unknown; answer?: unknown }) => ({
      questionId: typeof item.questionId === 'string' ? item.questionId : '',
      answer: typeof item.answer === 'string' || typeof item.answer === 'number' ? String(item.answer) : '',
    })).filter((item: PlayAnswerSubmission) => item.questionId)

    if (!submissions.length) return sendError(res, 'Minimal isi satu jawaban dulu sebelum submit.', [], 422)

    const available = availableQuestionCounts(playCase.questions.length)
    const questionCount = normalizeQuestionCount(req.body?.questionCount, available) ?? Math.min(playCase.questions.length, submissions.length)
    const mode = normalizeMode(req.body?.mode, normalizeMode(playCase.mode))
    const selectedQuestions = playCase.questions.slice(0, questionCount)
    const completedAt = req.body?.completedAt ? new Date(String(req.body.completedAt)) : new Date()
    const startedAt = req.body?.startedAt ? new Date(String(req.body.startedAt)) : undefined
    const postedDuration = Number(req.body?.durationSeconds)
    const durationSeconds = Number.isFinite(postedDuration) && postedDuration > 0
      ? Math.round(postedDuration)
      : startedAt && Number.isFinite(startedAt.getTime())
        ? Math.max(1, Math.round((completedAt.getTime() - startedAt.getTime()) / 1000))
        : undefined
    const timerLimit = timerSeconds(playCase.difficulty, questionCount, mode)

    const answerRows = selectedQuestions.map((question) => {
      const userAnswer = submissions.find((submission) => submission.questionId === question.id)?.answer ?? ''
      const correct = isCorrect(question, userAnswer)
      return {
        questionId: question.id,
        questionText: question.questionText,
        userAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect: correct,
        pointsEarned: correct ? question.points : 0,
        maxPoints: question.points,
        explanation: question.explanation,
      }
    })

    const score = answerRows.reduce((sum, answer) => sum + answer.pointsEarned, 0)
    const totalPoints = selectedQuestions.reduce((sum, question) => sum + question.points, 0)
    const correctCount = answerRows.filter((answer) => answer.isCorrect).length
    const wrongCount = selectedQuestions.length - correctCount
    const accuracy = selectedQuestions.length ? Math.round((correctCount / selectedQuestions.length) * 100) : 0
    const rankPoints = calculateRankPoints(score, accuracy, durationSeconds ?? timerLimit, timerLimit, mode)
    const skillsEarned = Array.from(new Set(selectedQuestions.filter((question) => answerRows.some((answer) => answer.questionId === question.id && answer.isCorrect)).map((question) => question.skill).filter((skill): skill is string => Boolean(skill))))
    const formulasEarned = Array.from(new Set(selectedQuestions.filter((question) => answerRows.some((answer) => answer.questionId === question.id && answer.isCorrect)).map((question) => question.formulaHint).filter((skill): skill is string => Boolean(skill))))

    const summary = {
      caseId: playCase.id,
      slug: playCase.slug,
      mode,
      questionCount: selectedQuestions.length,
      score,
      totalPoints,
      accuracy,
      correctCount,
      wrongCount,
      durationSeconds,
      timerSeconds: timerLimit,
      rankPoints,
      grade: gradeLabel(accuracy),
      passed: accuracy >= 70,
      isSaved: false,
      isSavedCandidate: Boolean(req.user),
      answers: answerRows.map(({ correctAnswer: _correctAnswer, ...answer }) => answer),
      skillsEarned,
      formulasEarned,
      message: 'Hasil kamu sudah keluar, tapi belum tersimpan. Masuk dulu biar progress dan ranked point kamu masuk ke profile.',
    }

    if (!req.user) return sendSuccess(res, summary, summary.message)

    const attemptId = typeof req.body?.attemptId === 'string' ? req.body.attemptId : null
    const existingAttempt = attemptId ? await prisma.playAttempt.findFirst({ where: { id: attemptId, userId: req.user.id } }) : null
    const attemptData = {
      userId: req.user.id,
      playCaseId: playCase.id,
      slug: playCase.slug,
      mode,
      score,
      totalPoints,
      accuracy,
      correctCount,
      questionCount: selectedQuestions.length,
      durationSeconds,
      completedAt,
      rankPoints,
      isSaved: true,
      answers: answerRows.map(({ correctAnswer: _correctAnswer, ...answer }) => answer),
      skillsEarned,
      formulasEarned,
      startedAt: existingAttempt?.startedAt ?? (startedAt && Number.isFinite(startedAt.getTime()) ? startedAt : undefined),
      submittedAt: completedAt,
    }

    const attempt = existingAttempt
      ? await prisma.playAttempt.update({ where: { id: existingAttempt.id }, data: attemptData })
      : await prisma.playAttempt.create({ data: attemptData })

    await prisma.playAttemptAnswer.deleteMany({ where: { attemptId: attempt.id } })
    await prisma.playAttemptAnswer.createMany({ data: answerRows.map((answer) => ({ ...answer, attemptId: attempt.id })) })
    const progress = await updateFromPlayAttempt(req.user.id)
    const eligibility = await checkEligibility(req.user.id)

    return sendSuccess(res, {
      ...summary,
      attemptId: attempt.id,
      isSaved: true,
      message: 'Mantap, hasil kamu sudah tersimpan. Ini bakal masuk ke progress dan arena belajar kamu.',
      progress,
      certificateEligibility: { isEligible: eligibility.isEligible, requirements: eligibility.requirements },
    }, 'Mantap, hasil kamu sudah tersimpan. Ini bakal masuk ke progress dan arena belajar kamu.')
  } catch (error) {
    console.error(error)
    return sendError(res, 'Submit belum berhasil diproses. Coba lagi sebentar lagi.', [], 500)
  }
}


