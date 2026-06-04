import Card from '@/components/ui/Card'

export function HowStakingWorks() {
  return (
    <Card padding="lg">
      <h2 className="text-foreground font-semibold mb-4">How SOL Staking Works</h2>
      <div className="space-y-4 text-sm">
        <div className="flex gap-3">
          <span className="text-foreground font-bold shrink-0">1</span>
          <div>
            <p className="text-foreground font-medium">Buy SOL</p>
            <p className="text-muted-foreground text-xs mt-0.5">Get SOL on any exchange or DEX. Send to your Phantom or Solflare wallet. Minimum 100 SOL for Builder tier.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <span className="text-foreground font-bold shrink-0">2</span>
          <div>
            <p className="text-foreground font-medium">Connect wallet</p>
            <p className="text-muted-foreground text-xs mt-0.5">Connect your Phantom or Solflare wallet. Tier is auto-detected from your wallet balance. No deposit required.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <span className="text-foreground font-bold shrink-0">3</span>
          <div>
            <p className="text-foreground font-medium">Get discounts</p>
            <p className="text-muted-foreground text-xs mt-0.5">5% off at 100 SOL. 10% at 500 SOL. 20% at 1000+ SOL. Discount applied to every inference request paid in USDC. Earn ~7% APY when native staking launches in Phase 2.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <span className="text-foreground font-bold shrink-0">4</span>
          <div>
            <p className="text-foreground font-medium">Pay with USDC</p>
            <p className="text-muted-foreground text-xs mt-0.5">Guest tier uses pay.sh HTTP 402. Builder+ gets direct API access. All payments settle in USDC on Solana. Provider cost + 5% margin, minus your tier discount.</p>
          </div>
        </div>
      </div>
      <p className="text-muted-foreground text-xs mt-4 pt-4 border-t border-border">
        Currently tier is based on wallet SOL balance — no delegation required. Phase 2 introduces native staking contracts where delegated SOL earns ~7% APY for stakers and funds the ChaosCompute protocol treasury. SOL is never locked — withdraw anytime.
      </p>
    </Card>
  )
}
