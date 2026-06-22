import { classes, type BisaExcelClass } from '@/data/classes'
import { apiClient, type ApiResponse, withFallbackResult, withLocalFallback } from './apiClient'

type ClassApi = BisaExcelClass & { format: string }

type InhouseRequestInput = {
  name: string
  email: string
  phone?: string
  company?: string
  message: string
  needType: 'inhouse' | 'private_class' | 'template' | 'general'
}

function toClass(item: ClassApi): BisaExcelClass {
  return {
    ...item,
    format: item.format === 'offline' || item.format === 'private' ? item.format : 'online',
  }
}

const fetchAll = () => apiClient.get<ApiResponse<ClassApi[]>>('/classes').then((response) => response.data.data.map(toClass))

export const classesService = {
  getAll: () => withLocalFallback(fetchAll(), classes),
  getAllResult: () => withFallbackResult(fetchAll(), classes),
  createInhouseRequest: (payload: InhouseRequestInput) => apiClient.post<ApiResponse<unknown>>('/inhouse-requests', payload).then((response) => response.data),
}
