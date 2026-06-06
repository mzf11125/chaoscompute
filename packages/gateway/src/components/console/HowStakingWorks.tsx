import Card from '@/components/ui/Card'

export function HowStakingWorks() {
  return (
    <Card padding="lg">
      <h2 className="text-foreground font-semibold mb-4">How Staking Works</h2>
      <div className="space-y-4 text-sm">
        <div className="flex gap-3">
          <span className="text-foreground font-bold shrink-0">1</span>
          <div>
            <p className="text-foreground font-medium">Stake SOL</p>
            <p className="text-muted-foreground text-xs mt-0.5">Lock SOL as collateral. 100 SOL = Standard, 500 SOL = Pro, 1000+ SOL = Enterprise.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <span className="text-foreground font-bold shrink-0">2</span>
          <div>
            <p className="text-foreground font-medium">Connect wallet</p>
            <p className="text-muted-foreground text-xs mt-0.5">Connect Phantom or Solflare. Tier auto-detected from balance.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <span className="text-foreground font-bold shrink-0">3</span>
          <div>
            <p className="text-foreground font-medium">Run a node (optional)</p>
            <p className="text-muted-foreground text-xs mt-0.5">Stake to run TEE inference nodes. Earn USDC from compute jobs. Higher stake = higher selection probability.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <span className="text-foreground font-bold shrink-0">4</span>
          <div>
            <p className="text-foreground font-medium">Pay with USDC</p>
            <p className="text-muted-foreground text-xs mt-0.5">All payments settle in USDC on Solana. Per token pricing. SOL staking unlocks discounts.</p>
          </div>
        </div>
      </div>
      <p className="text-muted-foreground text-xs mt-4 pt-4 border-t border-border">
        Consumer tier = SOL balance discount. Node operator tier = SOL staked on-chain. Escrowed via StakeVault PDA. 7-day unstake cooldown.
      </p>
    </Card>
  )
}
