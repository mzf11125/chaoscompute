import Card from '@/components/ui/Card'
import { Wallet } from 'lucide-react'
import { useWallet } from '@/context/WalletProvider'

export function WalletBalance() {
  const { publicKey, balance } = useWallet()

  return (
    <Card padding="md">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-text-primary font-semibold">Wallet Balance</h3>
        <Wallet size={16} className="text-text-muted" aria-hidden="true" />
      </div>
      <p className="text-3xl font-bold text-accent font-mono">
        ${(balance ?? 0).toFixed(2)}
        <span className="text-text-muted text-sm font-normal ml-1">USDC</span>
      </p>
      {publicKey && (
        <p className="text-text-muted text-xs mt-1 font-mono">
          {publicKey.slice(0, 4)}...{publicKey.slice(-4)}
        </p>
      )}
    </Card>
  )
}
