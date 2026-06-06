import { DashboardShell } from '@/components/layout/DashboardShell'
import { StakingTier } from '@/components/console/StakingTier'
import { WalletConnect } from '@/components/console/WalletConnect'
import { Quickstart } from '@/components/console/Quickstart'
import { APIAccess } from '@/components/console/APIAccess'
import { HowStakingWorks } from '@/components/console/HowStakingWorks'
import Card from '@/components/ui/Card'

export default function Console() {
  return (
    <DashboardShell>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Console</h1>
        <p className="text-muted-foreground text-sm mt-1">Your wallet is your identity. Stake SOL for lower costs. Pay with USDC.</p>
      </div>

      <div className="mb-6">
        <WalletConnect />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <StakingTier />
        <Quickstart />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <APIAccess />
        <HowStakingWorks />
      </div>

      <Card padding="lg" className="mb-6">
        <h2 className="text-foreground font-semibold mb-3">Consumer Pricing</h2>
        <p className="text-muted-foreground text-sm mb-4">USDC per token. Provider cost + 5% margin. SOL staking unlocks tier discounts.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" aria-label="Tier pricing comparison">
            <thead>
              <tr className="text-muted-foreground text-xs uppercase tracking-wider">
                <th className="text-left py-2 pr-4">Tier</th>
                <th className="text-left py-2 pr-4">SOL</th>
                <th className="text-left py-2 pr-4">Discount</th>
                <th className="text-left py-2 pr-4">gpt-5.5</th>
                <th className="text-left py-2 pr-4">deepseek</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Free', sol: '0', discount: '0%', gpt: '$5.25', ds: '$0.147' },
                { name: 'Standard', sol: '100', discount: '5%', gpt: '$4.99', ds: '$0.140' },
                { name: 'Pro', sol: '500', discount: '10%', gpt: '$4.73', ds: '$0.132' },
                { name: 'Enterprise', sol: '1000+', discount: '20%', gpt: '$4.20', ds: '$0.118' },
              ].map((row) => (
                <tr key={row.name} className="border-t border-border">
                  <td className="py-2 pr-4 text-foreground font-medium">{row.name}</td>
                  <td className="py-2 pr-4 text-muted-foreground font-mono">{row.sol}</td>
                  <td className="py-2 pr-4 text-success font-mono">{row.discount}</td>
                  <td className="py-2 pr-4 text-muted-foreground font-mono">{row.gpt}/1M</td>
                  <td className="py-2 pr-4 text-muted-foreground font-mono">{row.ds}/1M</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card padding="lg">
        <h2 className="text-foreground font-semibold mb-3">Node Operator Earnings</h2>
        <p className="text-muted-foreground text-sm mb-4">Earn USDC from inference jobs. Higher stake = higher selection probability.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" aria-label="Operator earnings by tier">
            <thead>
              <tr className="text-muted-foreground text-xs uppercase tracking-wider">
                <th className="text-left py-2 pr-4">Tier</th>
                <th className="text-left py-2 pr-4">Min Stake</th>
                <th className="text-left py-2 pr-4">Selection Weight</th>
                <th className="text-left py-2 pr-4">Avg Monthly</th>
              </tr>
            </thead>
            <tbody>
              {[
                { tier: 'Standard', stake: '100 SOL', weight: '10x', earnings: '$200-500' },
                { tier: 'Pro', stake: '500 SOL', weight: '22x', earnings: '$800-2,000' },
                { tier: 'Enterprise', stake: '1,000+ SOL', weight: '31x+', earnings: '$2,000-5,000+' },
              ].map((row) => (
                <tr key={row.tier} className="border-t border-border">
                  <td className="py-2 pr-4 text-foreground font-medium">{row.tier}</td>
                  <td className="py-2 pr-4 text-muted-foreground font-mono">{row.stake}</td>
                  <td className="py-2 pr-4 text-muted-foreground font-mono">{row.weight}</td>
                  <td className="py-2 pr-4 text-success font-mono">{row.earnings}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-muted-foreground text-xs mt-3">Earnings depend on job volume, model demand, and node performance. Slashing risk applies.</p>
      </Card>
    </DashboardShell>
  )
}
