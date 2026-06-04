import Card from '@/components/ui/Card'
import { useWallet } from '@/components/console/WalletConnect'

const tiers = [
  { name: 'Guest', sol: 0, discount: 0, benefits: ['pay.sh access', 'standard limits'] },
  { name: 'Builder', sol: 100, discount: 5, benefits: ['API key access', '5% discount', 'standard routing'] },
  { name: 'Operator', sol: 500, discount: 10, benefits: ['API key access', '10% discount', 'priority routing', 'higher limits'] },
  { name: 'Partner', sol: 1000, discount: 20, benefits: ['API key access', '20% discount', 'dedicated capacity', 'custom pricing'] },
]

function getTier(balance: number) {
  if (balance >= 1000) return tiers[3]
  if (balance >= 500) return tiers[2]
  if (balance >= 100) return tiers[1]
  return tiers[0]
}

export function StakingTier() {
  const { amount, address } = useWallet()
  const tier = getTier(amount)
  const nextTier = tiers.find((t) => t.sol > amount)
  const progress = nextTier ? ((amount / nextTier.sol) * 100) : 100

  return (
    <Card padding="lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-foreground font-semibold">Staking Tier</h2>
        <span className="text-xs text-muted-foreground uppercase tracking-wider">
          Balance check · no delegation yet
        </span>
      </div>

      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-4xl font-bold text-foreground font-mono">{amount.toFixed(2)}</span>
        <span className="text-muted-foreground text-lg">SOL</span>
      </div>

      {address && (
        <p className="text-muted-foreground text-xs font-mono mb-4">{address.slice(0, 4)}...{address.slice(-4)}</p>
      )}

      <div className="w-full h-2 bg-surface-hover rounded-full mb-3">
        <div className="h-full bg-foreground rounded-full transition-all duration-500" style={{ width: `${Math.min(progress, 100)}%` }} />
      </div>

      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-muted-foreground">
          {nextTier ? `${nextTier.sol - amount} SOL to ${nextTier.name}` : 'Max tier reached'}
        </span>
        <span className="text-xs text-muted-foreground">{progress.toFixed(0)}%</span>
      </div>

      <div className="bg-surface-hover rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-foreground font-semibold text-lg">{tier.name}</span>
          <span className="text-success font-bold font-mono">{tier.discount}% off</span>
        </div>
        <div className="space-y-1">
          {tier.benefits.map((b) => (
            <div key={b} className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-1 h-1 rounded-full bg-success shrink-0" />
              {b}
            </div>
          ))}
        </div>
      </div>

      <p className="text-muted-foreground text-xs mt-3">
        Currently tier is based on wallet SOL balance. No delegation. No lockup. Phase 2 native staking earns ~7% APY for stakers and funds the protocol treasury.
      </p>
    </Card>
  )
}
