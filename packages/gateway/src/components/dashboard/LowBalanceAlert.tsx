import { AlertTriangle } from 'lucide-react'

interface LowBalanceAlertProps {
  balance_usdc: number
  threshold: number
}

export function LowBalanceAlert({ balance_usdc = 4.50, threshold = 0.50 }: LowBalanceAlertProps) {
  const requestsLeft = Math.floor(balance_usdc / 0.01)

  if (requestsLeft > 10) return null

  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-warning/10 border border-warning/20 text-warning text-sm">
      <AlertTriangle size={16} />
      <span>
        Low balance: ~{requestsLeft} requests remaining at current rate.
        Fund your wallet to avoid interruption.
      </span>
    </div>
  )
}
