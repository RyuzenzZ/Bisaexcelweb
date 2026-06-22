import { Router } from 'express'
import { forgotPassword, login, logout, me, register, resetPassword } from '../controllers/authController.js'
import { completeChallenge } from '../controllers/challengeProgressController.js'
import {
  getArticle,
  getChallenge,
  getTemplate,
  getTip,
  getVideo,
  listArticles,
  listChallenges,
  listTemplates,
  listTips,
  listVideos,
} from '../controllers/contentController.js'
import { dashboardMe, myAttempts, myProgress, myRecommendations } from '../controllers/dashboardController.js'
import { generateMyCertificate, verifyCertificate } from '../controllers/certificateUserController.js'
import { createInhouseRequest, getCertificate, getPortfolio, listCertificates, listClasses, listPortfolios } from '../controllers/miscController.js'
import { getPlayCase, getPlayQuestions, listPlayCases, startPlayCase, submitPlayCase } from '../controllers/playCaseController.js'
import { profileMe, publicCertificates, publicPortfolio, publicProfile } from '../controllers/profileController.js'
import { checkTestAnswer, getExplanationPreview, getTest, getTestProducts, listTests } from '../controllers/testController.js'
import { optionalAuth, requireAuth } from '../middlewares/authMiddleware.js'

export const apiRouter = Router()

apiRouter.get('/health', (_req, res) => res.json({ data: { ok: true }, message: 'API BisaExcel aktif.', errors: null }))

apiRouter.post('/auth/register', register)
apiRouter.post('/auth/login', login)
apiRouter.post('/auth/logout', logout)
apiRouter.get('/auth/me', requireAuth, me)
apiRouter.post('/auth/forgot-password', forgotPassword)
apiRouter.post('/auth/reset-password', resetPassword)

apiRouter.get('/dashboard/me', requireAuth, dashboardMe)
apiRouter.get('/profiles/me', requireAuth, profileMe)
apiRouter.get('/profiles/:username', publicProfile)
apiRouter.get('/profiles/:username/portfolio', publicPortfolio)
apiRouter.get('/profiles/:username/certificates', publicCertificates)
apiRouter.get('/me/progress', requireAuth, myProgress)
apiRouter.get('/me/attempts', requireAuth, myAttempts)
apiRouter.get('/me/recommendations', requireAuth, myRecommendations)
apiRouter.post('/me/certificates/generate', requireAuth, generateMyCertificate)
apiRouter.get('/certificates/verify/:code', verifyCertificate)

apiRouter.get('/articles', listArticles)
apiRouter.get('/articles/:slug', getArticle)

apiRouter.get('/videos', listVideos)
apiRouter.get('/videos/:slug', getVideo)

apiRouter.get('/tests', listTests)
apiRouter.get('/tests/:slug', getTest)
apiRouter.post('/tests/:slug/check', checkTestAnswer)
apiRouter.get('/tests/:slug/products', getTestProducts)
apiRouter.get('/tests/:slug/explanation-preview', getExplanationPreview)

apiRouter.get('/play-cases', listPlayCases)
apiRouter.get('/play-cases/:slug', getPlayCase)
apiRouter.get('/play-cases/:slug/questions', getPlayQuestions)
apiRouter.post('/play-cases/:slug/start', startPlayCase)
apiRouter.post('/play-cases/:slug/submit', optionalAuth, submitPlayCase)

apiRouter.get('/challenges', listChallenges)
apiRouter.get('/challenges/:slug', getChallenge)
apiRouter.post('/challenges/:slug/complete', requireAuth, completeChallenge)

apiRouter.get('/tips', listTips)
apiRouter.get('/tips/:slug', getTip)

apiRouter.get('/templates', listTemplates)
apiRouter.get('/templates/:slug', getTemplate)

apiRouter.get('/classes', listClasses)
apiRouter.post('/inhouse-requests', createInhouseRequest)
apiRouter.get('/certificates', listCertificates)
apiRouter.get('/certificates/:code', getCertificate)
apiRouter.get('/portfolios', listPortfolios)
apiRouter.get('/portfolios/:username', getPortfolio)
