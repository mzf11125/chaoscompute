import { DashboardShell } from '@/components/layout/DashboardShell'
import { StakingTier } from '@/components/console/StakingTier'
import { Quickstart } from '@/components/console/Quickstart'
import { APIAccess } from '@/components/console/APIAccess'
import { ComingSoon } from '@/components/console/ComingSoon'

export default function Console() {
  return (
    <DashboardShell>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Console</h1>
        <p className="text-muted-foreground text-sm mt-1">Your wallet is your identity. Stake SOL for lower costs. Pay with USDC.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <StakingTier />
        <Quickstart />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <APIAccess />
        <ComingSoon />
      </div>
    </DashboardShell>
  )
}
