import { prisma } from '../config/prisma.js'

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : []
}

function unique(items: string[]) {
  return Array.from(new Set(items.filter(Boolean)))
}

function levelFromAttempts(attemptCount: number, averageScore: number) {
  if (attemptCount <= 2) return 'Pemula'
  if (attemptCount <= 5) return averageScore >= 50 ? 'Dasar' : 'Pemula'
  if (attemptCount <= 10) return averageScore >= 60 ? 'Menengah' : 'Dasar'
  if (attemptCount <= 20) return averageScore >= 70 ? 'Advanced' : 'Menengah'
  return averageScore >= 75 ? 'Professional' : 'Advanced'
}

export async function updateProgressRankings() {
  const progressRows = await prisma.userProgress.findMany({ orderBy: [{ totalScore: 'desc' }, { averageScore: 'desc' }] })
  await Promise.all(progressRows.map((progress, index) => prisma.userProgress.update({ where: { id: progress.id }, data: { rank: index + 1 } })))
}

export async function ensureUserProgress(userId: string) {
  return prisma.userProgress.upsert({
    where: { userId },
    update: {},
    create: { userId },
  })
}

export async function updateFromPlayAttempt(userId: string) {
  const attempts = await prisma.playAttempt.findMany({ where: { userId, isSaved: true } })
  const challenges = await prisma.challengeCompletion.findMany({ where: { userId } })
  const totalScore = attempts.reduce((sum, attempt) => sum + attempt.score, 0)
  const averageScore = attempts.length ? Math.round((totalScore / attempts.length) * 100) / 100 : 0
  const testsCompleted = attempts.filter((attempt) => ['latihan', 'kompetisi', 'practice', 'challenge', 'ranked'].includes(attempt.mode)).length
  const competitionsCompleted = attempts.filter((attempt) => attempt.mode === 'kompetisi' || attempt.mode === 'ranked').length
  const formulasMastered = unique(attempts.flatMap((attempt) => asStringArray(attempt.formulasEarned)))
  const skills = unique([...attempts.flatMap((attempt) => asStringArray(attempt.skillsEarned)), ...challenges.flatMap((challenge) => asStringArray(challenge.skillsEarned))])
  const level = levelFromAttempts(attempts.length, averageScore)

  const progress = await prisma.userProgress.upsert({
    where: { userId },
    update: {
      level,
      totalScore,
      testsCompleted,
      challengesCompleted: challenges.length,
      competitionsCompleted,
      averageScore,
      formulasMastered,
      skills,
    },
    create: {
      userId,
      level,
      totalScore,
      testsCompleted,
      challengesCompleted: challenges.length,
      competitionsCompleted,
      averageScore,
      formulasMastered,
      skills,
    },
  })

  await prisma.userProfile.upsert({
    where: { userId },
    update: { level },
    create: { userId, level },
  })
  await updateProgressRankings()
  return progress
}

export async function updateChallengeProgress(userId: string, skillsEarned: string[]) {
  await ensureUserProgress(userId)
  const progress = await prisma.userProgress.findUnique({ where: { userId } })
  const nextSkills = unique([...(progress ? asStringArray(progress.skills) : []), ...skillsEarned])
  await prisma.userProgress.update({ where: { userId }, data: { skills: nextSkills } })
  return updateFromPlayAttempt(userId)
}

export function recommendationsFromProgress(progress: { testsCompleted: number; challengesCompleted: number; averageScore: number; formulasMastered: unknown; skills: unknown } | null) {
  if (!progress) return ['Mulai dari Rekap Penjualan Harian', 'Coba Test Excel pertama', 'Lengkapi profile belajar kamu']
  const recommendations: string[] = []
  if (progress.testsCompleted < 3) recommendations.push('Selesaikan minimal 3 Test Excel biar progress kamu mulai kebaca.')
  if (progress.challengesCompleted < 1) recommendations.push('Coba satu challenge praktik biar portfolio kamu lebih kuat.')
  if (progress.averageScore < 75) recommendations.push('Ulangi latihan yang skornya rendah dan pelan-pelan naikkan rata-rata ke 75.')
  if (asStringArray(progress.formulasMastered).length < 5) recommendations.push('Tambah rumus yang dikuasai lewat case lookup, SUMIF, dan COUNTIF.')
  if (!recommendations.length) recommendations.push('Kamu sudah siap cek eligibility certificate dan lanjut ke case Advanced.')
  return recommendations
}