import { AlertTriangle } from 'lucide-react'
import { useWallet } from '@/context/WalletProvider'

export function LowBalanceAlert({ balance_usdc }: { balance_usdc?: number }) {
  const { balance } = useWallet()
  const bal = balance_usdc ?? balance ?? 0
  const requestsLeft = Math.floor(bal / 0.01)

  if (requestsLeft > 10) return null

  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-warning/10 border border-warning/20 text-warning text-sm" role="alert">
      <AlertTriangle size={16} aria-hidden="true" />
      <span>
        Low balance: ~{requestsLeft} requests remaining at current rate.
        Fund your wallet to avoid interruption.
      </span>
    </div>
  )
}
