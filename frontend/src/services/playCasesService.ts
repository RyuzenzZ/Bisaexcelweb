import { getPlayCaseBySlug, getQuestionsBySlug, playCases, type PlayAnswerSubmission, type PlayCase, type PlayMode, type PlayQuestion, type PlayResult, type PlayStartResult } from '@/data/playCases'
import { apiClient, type ApiResponse, type DataResult, withFallbackResult, withLocalFallback } from './apiClient'

type BackendCase = {
  slug: string
  title: string
  subtitle?: string | null
  description: string
  category?: string | null
  difficulty?: string
  level?: string
  mode?: PlayMode
  estimatedMinutes?: number
  availableQuestionCounts?: number[]
  questionCount?: number
  basePoints?: number
  hasDownload?: boolean
  downloadUrl?: string | null
  workbookSheets?: string[]
  tags?: string[]
  skills?: string[]
  isPremium?: boolean
  heroCopy?: string | null
  instruction?: string | null
  timerRecommendations?: Record<string, number>
  questionsPreview?: BackendQuestion[]
}

type BackendQuestion = {
  id: string
  order: number
  questionText: string
  helperText?: string | null
  type: string
  difficulty?: string
  points: number
  formulaHint?: string | null
  skill?: string | null
  levelLabel?: string | null
}

type StartPayload = {
  mode: PlayMode
  questionCount: number
  difficulty?: string
}

type SubmitPayload = {
  attemptId?: string
  mode: PlayMode
  questionCount: number
  startedAt?: string
  completedAt: string
  durationSeconds: number
  answers: PlayAnswerSubmission[]
}

const modeLabels: Record<string, PlayMode> = {
  latihan: 'practice',
  kompetisi: 'ranked',
  practice: 'practice',
  challenge: 'challenge',
  ranked: 'ranked',
}

function normalizeMode(mode: string | undefined): PlayMode {
  return modeLabels[mode ?? ''] ?? 'practice'
}

function fallbackCase(slug: string) {
  return getPlayCaseBySlug(slug) ?? playCases[0]
}

function withMinimumQuestionCounts(playCase: PlayCase): PlayCase {
  const questionCount = Math.max(playCase.questionCount, getQuestionsBySlug(playCase.slug).length, 10)
  const availableQuestionCounts = [10, 20, 30, 60].filter((count) => questionCount >= count)
  return { ...playCase, questionCount, availableQuestionCounts: availableQuestionCounts.length ? availableQuestionCounts : [10] }
}

function toCase(item: BackendCase): PlayCase {
  const fallback = fallbackCase(item.slug)
  const questionCount = item.questionCount ?? fallback.questionCount
  const availableQuestionCounts = item.availableQuestionCounts?.length ? item.availableQuestionCounts : [10, 20, 30, 60].filter((count) => questionCount >= count)
  const workbookSheets = item.workbookSheets?.length ? item.workbookSheets : fallback.file.sheets
  const downloadUrl = item.downloadUrl ?? fallback.file.fileUrl
  const tags = item.tags?.length ? item.tags : fallback.formulas
  const skills = item.skills?.length ? item.skills : fallback.skills

  return {
    ...fallback,
    id: item.slug,
    slug: item.slug,
    title: item.title,
    subtitle: item.subtitle ?? fallback.professionCategory ?? fallback.category,
    description: item.description,
    category: item.category ?? fallback.category,
    level: (item.level ?? fallback.level) as PlayCase['level'],
    difficulty: item.difficulty ?? fallback.difficulty ?? 'dasar',
    mode: normalizeMode(item.mode),
    durationMinutes: item.estimatedMinutes ?? fallback.durationMinutes,
    estimatedMinutes: item.estimatedMinutes ?? fallback.durationMinutes,
    totalPoints: item.basePoints ?? fallback.totalPoints,
    basePoints: item.basePoints ?? fallback.totalPoints,
    questionCount,
    availableQuestionCounts: availableQuestionCounts.length ? availableQuestionCounts : [10],
    skills,
    formulas: tags,
    tags,
    file: {
      ...fallback.file,
      fileUrl: downloadUrl ?? undefined,
      hasDownload: item.hasDownload ?? fallback.file.hasDownload,
      sheets: workbookSheets,
    },
    hasDownload: item.hasDownload ?? fallback.file.hasDownload,
    downloadUrl: downloadUrl ?? undefined,
    workbookSheets,
    rules: item.instruction ? item.instruction.split('\n').filter(Boolean) : fallback.rules,
    datasetDescription: item.heroCopy ?? fallback.datasetDescription,
    heroCopy: item.heroCopy ?? undefined,
    instruction: item.instruction ?? undefined,
    isPremiumSolution: item.isPremium ?? fallback.isPremiumSolution,
    isPremium: item.isPremium ?? fallback.isPremiumSolution,
  }
}

function toQuestion(item: BackendQuestion): PlayQuestion {
  return {
    id: item.id,
    orderIndex: item.order,
    order: item.order,
    level: item.order <= 5 ? (item.order as PlayQuestion['level']) : 'bonus',
    levelLabel: item.levelLabel ?? (item.order <= 3 ? `Soal ${item.order} - Pemanasan Data` : `Soal ${item.order} - Naik Ritme`),
    questionText: item.questionText,
    helperText: item.helperText,
    inputType: item.type === 'choice' ? 'multiple_choice' : 'manual_input',
    answerType: item.type === 'text' ? 'text' : item.type === 'choice' ? 'choice' : 'number',
    type: item.type,
    points: item.points,
    formulaSkills: [item.skill, item.formulaHint].filter((value): value is string => Boolean(value)),
    formulaHint: item.formulaHint,
    skill: item.skill,
    hint: item.helperText ?? undefined,
    isBonus: item.order > 9,
  }
}

function fallbackQuestions(slug: string): PlayQuestion[] {
  const originals = getQuestionsBySlug(slug)
  const expanded = [...originals]
  let cursor = 0
  while (expanded.length < 10 && originals.length) {
    const source = originals[cursor % originals.length]
    expanded.push({
      ...source,
      id: `${source.id}-extra-${expanded.length + 1}`,
      orderIndex: expanded.length + 1,
      order: expanded.length + 1,
      levelLabel: expanded.length < 3 ? `Soal ${expanded.length + 1} - Pemanasan Data` : `Soal ${expanded.length + 1} - Naik Ritme`,
      questionText: `${source.questionText} (checkpoint tambahan)`,
      hint: source.hint ? `${source.hint} Fokus ke hasil akhirnya.` : 'Fokus isi hasil akhir dari file Excel.',
    })
    cursor += 1
  }
  return expanded
}

function unavailableSubmitResult(slug: string, answers: PlayAnswerSubmission[], isAuthenticated: boolean, durationSeconds?: number, mode: PlayMode = 'practice', questionCount = 10): PlayResult {
  const playCase = withMinimumQuestionCounts(fallbackCase(slug))
  return {
    caseId: playCase.id,
    slug,
    mode,
    score: 0,
    totalPoints: playCase.totalPoints,
    accuracy: 0,
    correctCount: 0,
    wrongCount: questionCount,
    questionCount,
    durationSeconds,
    rankPoints: 0,
    grade: 'Backend belum siap buat koreksi',
    passed: false,
    isSaved: false,
    answers: answers.map((answer) => ({ questionId: answer.questionId, userAnswer: answer.answer, isCorrect: false, pointsEarned: 0, maxPoints: 0 })),
    skillsEarned: [],
    formulasEarned: [],
    message: isAuthenticated ? 'Backend auto grading belum bisa diakses, jadi hasil belum disimpan.' : 'Backend auto grading belum bisa diakses. Coba lagi saat backend aktif.',
  }
}

function fallbackStart(slug: string, payload: StartPayload): PlayStartResult {
  const playCase = withMinimumQuestionCounts(fallbackCase(slug))
  const questions = fallbackQuestions(slug).slice(0, payload.questionCount)
  const timerSeconds = payload.questionCount === 60 ? 5400 : payload.questionCount === 30 ? 2400 : payload.questionCount === 20 ? 1500 : 900
  return {
    attemptId: `guest-${Date.now()}`,
    startedAt: new Date().toISOString(),
    timerSeconds,
    mode: payload.mode,
    questionCount: payload.questionCount,
    isSavedCandidate: false,
    case: playCase,
    selectedQuestions: questions,
  }
}

const fetchAll = () => apiClient.get<ApiResponse<BackendCase[]>>('/play-cases').then((response) => response.data.data.map(toCase))
const fetchBySlug = (slug: string) => apiClient.get<ApiResponse<BackendCase>>(`/play-cases/${slug}`).then((response) => toCase(response.data.data))
const fetchQuestions = (slug: string) => apiClient.get<ApiResponse<BackendQuestion[]>>(`/play-cases/${slug}/questions`).then((response) => response.data.data.map(toQuestion))
const startBackend = (slug: string, payload: StartPayload) => apiClient.post<ApiResponse<Omit<PlayStartResult, 'case' | 'selectedQuestions'> & { case: BackendCase; selectedQuestions: BackendQuestion[] }>>(`/play-cases/${slug}/start`, payload).then((response) => ({ ...response.data.data, case: toCase(response.data.data.case), selectedQuestions: response.data.data.selectedQuestions.map(toQuestion) }))
const submitBackend = (slug: string, payload: SubmitPayload) => apiClient.post<ApiResponse<PlayResult>>(`/play-cases/${slug}/submit`, payload).then((response) => response.data.data)

export const playCasesService = {
  getAll: () => withLocalFallback(fetchAll(), playCases.map(withMinimumQuestionCounts)),
  getAllResult: () => withFallbackResult(fetchAll(), playCases.map(withMinimumQuestionCounts)),
  getBySlug: (slug: string) => withLocalFallback(fetchBySlug(slug), withMinimumQuestionCounts(fallbackCase(slug))),
  getBySlugResult: (slug: string) => withFallbackResult(fetchBySlug(slug), withMinimumQuestionCounts(fallbackCase(slug))),
  getQuestions: (slug: string) => withLocalFallback(fetchQuestions(slug), fallbackQuestions(slug)),
  getQuestionsResult: (slug: string) => withFallbackResult(fetchQuestions(slug), fallbackQuestions(slug)),
  async startResult(slug: string, payload: StartPayload): Promise<DataResult<PlayStartResult>> {
    try {
      return { data: await startBackend(slug, payload), source: 'backend' }
    } catch (error) {
      return { data: fallbackStart(slug, payload), source: 'fallback', error: error instanceof Error ? error.message : 'Backend start belum tersedia.' }
    }
  },
  async submitResult(slug: string, payload: SubmitPayload, isAuthenticated: boolean): Promise<DataResult<PlayResult>> {
    try {
      return { data: await submitBackend(slug, payload), source: 'backend' }
    } catch (error) {
      return { data: unavailableSubmitResult(slug, payload.answers, isAuthenticated, payload.durationSeconds, payload.mode, payload.questionCount), source: 'fallback', error: error instanceof Error ? error.message : 'Backend submit belum tersedia.' }
    }
  },
}
