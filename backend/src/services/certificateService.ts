import { prisma } from '../config/prisma.js'

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : []
}

function unique(items: string[]) {
  return Array.from(new Set(items.filter(Boolean)))
}

export async function checkEligibility(userId: string) {
  const progress = await prisma.userProgress.findUnique({ where: { userId } })
  const attempts = await prisma.playAttempt.findMany({ where: { userId, isSaved: true }, orderBy: { submittedAt: 'desc' } })
  const challengeCount = await prisma.challengeCompletion.count({ where: { userId } })
  const formulas = progress ? asStringArray(progress.formulasMastered) : []
  const skills = progress ? asStringArray(progress.skills) : []
  const formulaSkillCount = unique([...formulas, ...skills]).length
  const requirements = [
    { label: 'Minimal 3 test selesai', current: attempts.length, target: 3, passed: attempts.length >= 3 },
    { label: 'Skor rata-rata minimal 75', current: Math.round(progress?.averageScore ?? 0), target: 75, passed: (progress?.averageScore ?? 0) >= 75 },
    { label: 'Minimal 1 challenge selesai', current: challengeCount, target: 1, passed: challengeCount >= 1 },
    { label: 'Minimal 5 rumus atau skill tercatat', current: formulaSkillCount, target: 5, passed: formulaSkillCount >= 5 },
  ]
  return { isEligible: requirements.every((item) => item.passed), requirements, progress, attempts }
}

export async function generateCertificate(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId }, include: { progress: true } })
  if (!user) throw new Error('User tidak ditemukan.')
  const eligibility = await checkEligibility(userId)
  if (!eligibility.isEligible || !eligibility.progress) return { certificate: null, eligibility }

  const existing = await prisma.userCertificate.findFirst({ where: { userId, title: 'Certificate Excel Practical Skill' } })
  if (existing) return { certificate: existing, eligibility }

  const formulas = asStringArray(eligibility.progress.formulasMastered)
  const skills = asStringArray(eligibility.progress.skills)
  const certificate = await prisma.userCertificate.create({
    data: {
      userId,
      certificateCode: `BE-${Date.now().toString(36).toUpperCase()}-${user.username.toUpperCase()}`,
      title: 'Certificate Excel Practical Skill',
      level: eligibility.progress.level,
      score: Math.round(eligibility.progress.averageScore),
      formulaMastered: formulas,
      skillEvidence: skills,
      relatedPlayCases: eligibility.attempts.slice(0, 8).map((attempt) => ({ slug: attempt.slug, score: attempt.score, submittedAt: attempt.submittedAt })),
      completedTests: eligibility.progress.testsCompleted,
      completedChallenges: eligibility.progress.challengesCompleted,
      accuracy: eligibility.progress.averageScore,
    },
  })
  return { certificate, eligibility }
}