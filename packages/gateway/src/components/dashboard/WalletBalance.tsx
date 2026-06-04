import Card from '@/components/ui/Card'
import { Wallet } from 'lucide-react'

interface WalletBalanceProps {
  balance_usdc: number
  wallet_address: string
}

export function WalletBalance({ balance_usdc = 4.50, wallet_address = 'ABC123...DEF' }: Partial<WalletBalanceProps>) {
  return (
    <Card padding="md">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-text-primary font-semibold">Wallet Balance</h3>
        <Wallet size={16} className="text-text-muted" />
      </div>
      <p className="text-3xl font-bold text-accent">
        ${balance_usdc.toFixed(2)}
        <span className="text-text-muted text-sm font-normal ml-1">USDC</span>
      </p>
      <p className="text-text-muted text-xs mt-1 font-mono">{wallet_address.slice(0, 10)}...</p>
    </Card>
  )
}
