export function LoadingState({ label = 'Memuat data...' }: { label?: string }) {
  return (
    <div className="motion-page rounded-2xl border border-[#1E3022] bg-[#111E14] p-6 text-sm text-[#8BA98F] shadow-card">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 shrink-0 rounded-full border border-green-700/40 bg-green-950/50 p-1">
          <div className="h-full w-full animate-spin rounded-full border-2 border-[#254A2A] border-t-green-400" />
        </div>
        <p className="font-medium text-[#AFCAB3]">{label}</p>
      </div>
      <div className="mt-6 space-y-3">
        <div className="skeleton-shimmer h-3 w-2/3 rounded-full" />
        <div className="skeleton-shimmer h-3 w-full rounded-full" />
        <div className="skeleton-shimmer h-3 w-5/6 rounded-full" />
      </div>
    </div>
  )
}