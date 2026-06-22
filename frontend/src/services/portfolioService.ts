import { portfolios, type PortfolioPreview } from '@/data/portfolio'
import { apiClient, type ApiResponse, withFallbackResult, withLocalFallback } from './apiClient'

type PortfolioApi = Omit<PortfolioPreview, 'updatedAt'> & {
  updatedAt: string
}

function toPortfolio(item: PortfolioApi): PortfolioPreview {
  return {
    ...item,
    updatedAt: item.updatedAt.slice(0, 10),
  }
}

const fetchAll = () => apiClient.get<ApiResponse<PortfolioApi[]>>('/portfolios').then((response) => response.data.data.map(toPortfolio))
const fetchByUsername = (username: string) => apiClient.get<ApiResponse<PortfolioApi>>(`/portfolios/${username}`).then((response) => toPortfolio(response.data.data))

export const portfolioService = {
  getAll: () => withLocalFallback(fetchAll(), portfolios),
  getAllResult: () => withFallbackResult(fetchAll(), portfolios),
  getByUsername: (username: string) => withLocalFallback(fetchByUsername(username), portfolios.find((item) => item.username === username) ?? portfolios[0]),
  getByUsernameResult: (username: string) => withFallbackResult(fetchByUsername(username), portfolios.find((item) => item.username === username) ?? portfolios[0]),
  getPreview: () => withLocalFallback(fetchAll(), portfolios),
  getPreviewResult: () => withFallbackResult(fetchAll(), portfolios),
}
