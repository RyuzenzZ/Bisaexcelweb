import type { LucideIcon } from 'lucide-react'
import { Search } from 'lucide-react'

type EmptyStateProps = {
  title?: string
  message: string
  icon?: LucideIcon
}

export function EmptyState({ title = 'Data belum tersedia', message, icon: Icon = Search }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-[#254A2A] bg-[#111E14] p-8 text-center">
      <Icon className="mx-auto h-9 w-9 text-[#4D6650]" />
      <h3 className="mt-4 font-heading text-xl font-bold text-[#E8F0EA]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#8BA98F]">{message}</p>
    </div>
  )
}
