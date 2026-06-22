export function LoadingState({ label = 'Memuat data...' }: { label?: string }) {
  return (
    <div className="rounded-2xl border border-[#1E3022] bg-[#111E14] p-8 text-center text-sm text-[#8BA98F]">
      <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#254A2A] border-t-green-400" />
      <p className="mt-4 font-medium">{label}</p>
    </div>
  )
}
