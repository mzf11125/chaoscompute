import { AlertTriangle, ExternalLink } from 'lucide-react'

export function LowBalanceAlert() {
  const balance = 4.50
  const requestsLeft = Math.floor(balance / 0.002)

  if (requestsLeft > 200) return null

  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-warning/10 border border-warning/20 text-warning text-sm mb-6" role="alert">
      <AlertTriangle size={16} aria-hidden="true" />
      <span className="flex-1">
        ~{requestsLeft} requests remaining. Fund your wallet to avoid interruption.
      </span>
      <a
        href="https://pay.sh/docs/using-pay/topup"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-warning text-xs underline hover:no-underline shrink-0"
      >
        Top up <ExternalLink size={12} aria-hidden="true" />
      </a>
    </div>
  )
}
