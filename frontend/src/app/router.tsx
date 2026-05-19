import { createBrowserRouter } from 'react-router-dom'
import { CareerPage } from '@/pages/(public)/CareerPage'
import { CoursesPage } from '@/pages/(public)/CoursesPage'
import { DailyQuizPage } from '@/pages/(public)/DailyQuizPage'
import { EcosystemPage } from '@/pages/(public)/EcosystemPage'
import { EsportsPage } from '@/pages/(public)/EsportsPage'
import { LandingPage } from '@/pages/(public)/LandingPage'
import { PricingPage } from '@/pages/(public)/PricingPage'
import { RankedMatchPage } from '@/pages/(public)/RankedMatchPage'
import { TrainingArenaPage } from '@/pages/(public)/TrainingArenaPage'
import { VideoLearningPage } from '@/pages/(public)/VideoLearningPage'
import { ROUTES } from '@/constants/routes'

export const router = createBrowserRouter([
  {
    path: ROUTES.home,
    element: <LandingPage />,
  },
  {
    path: ROUTES.videos,
    element: <VideoLearningPage />,
  },
  {
    path: ROUTES.courses,
    element: <CoursesPage />,
  },
  {
    path: ROUTES.esports,
    element: <EsportsPage />,
  },
  {
    path: ROUTES.rankedMatch,
    element: <RankedMatchPage />,
  },
  {
    path: ROUTES.trainingArena,
    element: <TrainingArenaPage />,
  },
  {
    path: ROUTES.dailyQuiz,
    element: <DailyQuizPage />,
  },
  {
    path: ROUTES.career,
    element: <CareerPage />,
  },
  {
    path: ROUTES.ecosystem,
    element: <EcosystemPage />,
  },
  {
    path: ROUTES.pricing,
    element: <PricingPage />,
  },
])
