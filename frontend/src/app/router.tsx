import { createBrowserRouter, Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { AdminAnalyticsPage } from '@/pages/admin/AdminAnalyticsPage'
import { AdminCoursesPage } from '@/pages/admin/AdminCoursesPage'
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage'
import { AdminExcelTipsPage } from '@/pages/admin/AdminExcelTipsPage'
import { AdminPaymentsPage } from '@/pages/admin/AdminPaymentsPage'
import { AdminQuizPage } from '@/pages/admin/AdminQuizPage'
import { AdminUsersPage } from '@/pages/admin/AdminUsersPage'
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage'
import { LoginPage } from '@/pages/auth/LoginPage'
import { RegisterPage } from '@/pages/auth/RegisterPage'
import { ResetPasswordPage } from '@/pages/auth/ResetPasswordPage'
import { VerifyEmailPage } from '@/pages/auth/VerifyEmailPage'
import { AccountSettingsPage } from '@/pages/dashboard/AccountSettingsPage'
import { BookmarksPage } from '@/pages/dashboard/BookmarksPage'
import { CertificatesPage } from '@/pages/dashboard/CertificatesPage'
import { DashboardPage } from '@/pages/dashboard/DashboardPage'
import { MyCoursesPage } from '@/pages/dashboard/MyCoursesPage'
import { ProgressPage } from '@/pages/dashboard/ProgressPage'
import { ProfilePage } from '@/pages/dashboard/ProfilePage'
import { AboutPage } from '@/pages/public/AboutPage'
import { ArticleDetailPage, BelajarPage } from '@/pages/public/BelajarPage'
import { ClassesPage, InhousePage } from '@/pages/public/ClassesPage'
import { ContactPage } from '@/pages/public/ContactPage'
import { ExcelTipDetailPage } from '@/pages/public/ExcelTipDetailPage'
import { LandingPage } from '@/pages/public/LandingPage'
import { PublicProfileCertificateDetailPage, PublicProfileCertificatePage, PublicProfilePage, PublicProfilePortfolioPage } from '@/pages/public/ProfilePublicPage'
import { TemplateDetailPage, TemplatePage } from '@/pages/public/TemplatePage'
import { TestExcelAnswerPage, TestExcelDetailPage, TestExcelPage, TestExcelPlayPage, TestExcelResultPage, TestExcelTutorialPage } from '@/pages/public/TestExcelPage'
import { TipsPage } from '@/pages/public/TipsPage'
import { VideoDetailPage, VideoPage } from '@/pages/public/VideoPage'
import { ROUTES } from '@/constants/routes'

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, isLoading } = useAuth()
  if (isLoading) return <div className="min-h-screen bg-[#080E0A] p-8 text-[#E8F0EA]">Memuat akun...</div>
  if (!isAuthenticated) return <Navigate to={ROUTES.LOGIN} replace />
  return children
}
export const router = createBrowserRouter([
  { path: ROUTES.HOME, element: <LandingPage /> },
  { path: ROUTES.LEARN, element: <BelajarPage /> },
  { path: '/belajar/:slug', element: <ArticleDetailPage /> },
  { path: ROUTES.VIDEO, element: <VideoPage /> },
  { path: '/video/:slug', element: <VideoDetailPage /> },
  { path: ROUTES.TEST_EXCEL, element: <TestExcelPage /> },
  { path: ROUTES.STUDI_KASUS, element: <TestExcelPage /> },
  { path: '/studi-kasus/:slug', element: <TestExcelDetailPage /> },
  { path: '/test-excel/:slug', element: <TestExcelDetailPage /> },
  { path: '/test-excel/:slug/play', element: <TestExcelPlayPage /> },
  { path: '/test-excel/:slug/hasil', element: <TestExcelResultPage /> },
  { path: '/test-excel/:slug/jawaban', element: <TestExcelAnswerPage /> },
  { path: '/test-excel/:slug/tutorial', element: <TestExcelTutorialPage /> },
  { path: ROUTES.CHALLENGE, element: <Navigate to={ROUTES.TEST_EXCEL} replace /> },
  { path: '/challenge/:slug', element: <TestExcelDetailPage /> },
  { path: '/challenge/:slug/play', element: <TestExcelPlayPage /> },
  { path: '/test-excel/challenge', element: <Navigate to={ROUTES.TEST_EXCEL} replace /> },
  { path: ROUTES.EXCEL_TIPS, element: <TipsPage /> },
  { path: ROUTES.TIPS, element: <Navigate to={ROUTES.EXCEL_TIPS} replace /> },
  { path: ROUTES.BUSINESS_FORMULAS, element: <Navigate to={`${ROUTES.EXCEL_TIPS}?category=rumus-bisnis`} replace /> },
  { path: ROUTES.LAMBDA_DICTIONARY, element: <Navigate to={`${ROUTES.EXCEL_TIPS}?category=lambda`} replace /> },
  { path: ROUTES.REGEX_PATTERNS, element: <Navigate to={`${ROUTES.EXCEL_TIPS}?category=regex`} replace /> },
  { path: ROUTES.TIPS_TRICK, element: <Navigate to={`${ROUTES.EXCEL_TIPS}?category=tips-trick`} replace /> },
  { path: '/tips/:slug', element: <ExcelTipDetailPage /> },
  { path: '/excel-tips/:slug', element: <ExcelTipDetailPage /> },
  { path: ROUTES.TEMPLATES, element: <TemplatePage /> },
  { path: '/template/:slug', element: <TemplateDetailPage /> },
  { path: ROUTES.CLASSES, element: <ClassesPage /> },
  { path: ROUTES.CLASS_ONLINE, element: <ClassesPage /> },
  { path: ROUTES.CLASS_OFFLINE, element: <ClassesPage /> },
  { path: ROUTES.CLASS_PRIVATE, element: <ClassesPage /> },
  { path: ROUTES.CONTACT, element: <ContactPage /> },
  { path: ROUTES.INHOUSE, element: <InhousePage /> },
  { path: ROUTES.CERTIFICATES, element: <Navigate to={ROUTES.PROFILE_CERTIFICATE('demo-user')} replace /> },
  { path: '/certificate/:id', element: <PublicProfileCertificateDetailPage /> },
  { path: ROUTES.PORTFOLIO, element: <Navigate to={ROUTES.PROFILE_PORTFOLIO('demo-user')} replace /> },
  { path: '/portfolio/:username', element: <PublicProfilePortfolioPage /> },
  { path: ROUTES.LOGIN, element: <LoginPage /> },
  { path: ROUTES.REGISTER, element: <RegisterPage /> },
  { path: ROUTES.FORGOT_PASSWORD, element: <ForgotPasswordPage /> },
  { path: ROUTES.RESET_PASSWORD, element: <ResetPasswordPage /> },
  { path: ROUTES.VERIFY_EMAIL, element: <VerifyEmailPage /> },
  { path: ROUTES.DASHBOARD, element: <ProtectedRoute><DashboardPage /></ProtectedRoute> },
  { path: ROUTES.PROFILE, element: <ProtectedRoute><ProfilePage /></ProtectedRoute> },
  { path: '/profile/:username', element: <PublicProfilePage /> },
  { path: '/profile/:username/portfolio', element: <PublicProfilePortfolioPage /> },
  { path: '/profile/:username/certificate', element: <PublicProfileCertificatePage /> },
  { path: '/profile/:username/certificate/:id', element: <PublicProfileCertificateDetailPage /> },
  { path: ROUTES.MY_COURSES, element: <ProtectedRoute><MyCoursesPage /></ProtectedRoute> },
  { path: ROUTES.PROGRESS, element: <ProtectedRoute><ProgressPage /></ProtectedRoute> },
  { path: ROUTES.BOOKMARKS, element: <ProtectedRoute><BookmarksPage /></ProtectedRoute> },
  { path: '/dashboard/sertifikat', element: <ProtectedRoute><CertificatesPage /></ProtectedRoute> },
  { path: ROUTES.SETTINGS, element: <ProtectedRoute><AccountSettingsPage /></ProtectedRoute> },
  { path: ROUTES.ADMIN, element: <AdminDashboardPage /> },
  { path: ROUTES.ADMIN_COURSES, element: <AdminCoursesPage /> },
  { path: ROUTES.ADMIN_EXCEL_TIPS, element: <AdminExcelTipsPage /> },
  { path: ROUTES.ADMIN_QUIZZES, element: <AdminQuizPage /> },
  { path: ROUTES.ADMIN_USERS, element: <AdminUsersPage /> },
  { path: ROUTES.ADMIN_PAYMENTS, element: <AdminPaymentsPage /> },
  { path: ROUTES.ADMIN_ANALYTICS, element: <AdminAnalyticsPage /> },
  { path: ROUTES.PRICING, element: <Navigate to={ROUTES.TEMPLATES} replace /> },
  { path: ROUTES.ECOSYSTEM, element: <Navigate to={ROUTES.LEARN} replace /> },
  { path: ROUTES.CAREER, element: <Navigate to={ROUTES.CLASSES} replace /> },
  { path: ROUTES.ABOUT, element: <AboutPage /> },
  { path: ROUTES.LEADERBOARD, element: <Navigate to={ROUTES.PORTFOLIO} replace /> },
  { path: ROUTES.LEGACY_COURSES, element: <Navigate to={ROUTES.LEARN} replace /> },
  { path: '/kursus/:slug', element: <ArticleDetailPage /> },
  { path: ROUTES.LEGACY_VIDEOS, element: <Navigate to={ROUTES.VIDEO} replace /> },
  { path: ROUTES.LEGACY_PRACTICE, element: <Navigate to={ROUTES.TEST_EXCEL} replace /> },
  { path: '/latihan/:slug', element: <TestExcelDetailPage /> },
  { path: '/latihan/:slug/penjelasan', element: <Navigate to={ROUTES.TEST_EXCEL} replace /> },
  { path: ROUTES.LEGACY_COMPETITION, element: <Navigate to={ROUTES.TEST_EXCEL} replace /> },
  { path: ROUTES.LEGACY_RANKED_MATCH, element: <Navigate to={ROUTES.TEST_EXCEL} replace /> },
  { path: ROUTES.LEGACY_TRAINING_ARENA, element: <Navigate to={ROUTES.TEST_EXCEL} replace /> },
  { path: ROUTES.LEGACY_DAILY_QUIZ, element: <Navigate to={ROUTES.TEST_EXCEL} replace /> },
  { path: ROUTES.LEGACY_ESPORTS, element: <Navigate to={ROUTES.TEST_EXCEL} replace /> },
  { path: ROUTES.LEGACY_ESPORTS_RANKED_MATCH, element: <Navigate to={ROUTES.TEST_EXCEL} replace /> },
  { path: ROUTES.LEGACY_ESPORTS_TRAINING_ARENA, element: <Navigate to={ROUTES.TEST_EXCEL} replace /> },
  { path: ROUTES.LEGACY_ESPORTS_DAILY_QUIZ, element: <Navigate to={ROUTES.TEST_EXCEL} replace /> },
])
