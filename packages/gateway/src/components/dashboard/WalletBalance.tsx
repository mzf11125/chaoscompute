import Card from '@/components/ui/Card'
import { Wallet } from 'lucide-react'

export function WalletBalance() {
  return (
    <Card padding="md">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-text-primary font-semibold text-sm">Wallet</h3>
        <Wallet size={16} className="text-text-muted" aria-hidden="true" />
      </div>
      <p className="text-2xl font-bold text-accent font-mono">
        $4.50
        <span className="text-text-muted text-sm font-normal ml-1">USDC</span>
      </p>
      <p className="text-text-muted text-xs mt-1 font-mono">7xKX...p2aB</p>
    </Card>
  )
}
