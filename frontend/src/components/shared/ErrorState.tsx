import { AlertCircle } from 'lucide-react'

type ErrorStateProps = {
  title?: string
  message: string
  onRetry?: () => void
}

export function ErrorState({ title = 'Data backend tidak tersedia', message, onRetry }: ErrorStateProps) {
  return (
    <div className="rounded-2xl border border-amber-800/40 bg-amber-950/20 p-5 text-sm text-amber-200">
      <div className="flex items-start gap-3">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
        <div>
          <h3 className="font-heading font-bold text-amber-100">{title}</h3>
          <p className="mt-1 leading-6">{message}</p>
          {onRetry ? (
            <button className="mt-3 font-semibold text-amber-100 underline underline-offset-4" onClick={onRetry} type="button">
              Coba lagi
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
