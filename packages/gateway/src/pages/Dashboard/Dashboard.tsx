import { DashboardShell } from '@/components/layout/DashboardShell'
import { SpendView } from '@/components/dashboard/SpendView'
import { RequestLog } from '@/components/dashboard/RequestLog'
import { ProviderHealth } from '@/components/dashboard/ProviderHealth'
import { WalletBalance } from '@/components/dashboard/WalletBalance'
import { LowBalanceAlert } from '@/components/dashboard/LowBalanceAlert'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { Wallet } from 'lucide-react'

export default function Dashboard() {
  const walletConnected = false // Mock — replace with actual wallet state

  return (
    <DashboardShell>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>
        <p className="text-text-secondary text-sm mt-1">
          Real-time spend and usage for your Solana wallet.
        </p>
      </div>

      {!walletConnected ? (
        /* Empty/onboarding state */
        <Card padding="lg" className="text-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <Wallet size={28} className="text-accent" />
          </div>
          <h2 className="text-xl font-semibold text-text-primary mb-2">Connect your wallet</h2>
          <p className="text-text-secondary text-sm mb-6">
            Connect a Solana wallet to view real-time spend, request logs, and provider health.
            Your wallet pays per request — nothing is deposited anywhere.
          </p>
          <Button variant="primary" size="lg">
            Connect Solana Wallet
          </Button>
          <p className="text-text-muted text-xs mt-4">Supports Phantom, Solflare, and Backpack</p>
        </Card>
      ) : (
        <>
          {/* Loading shimmer would go here when fetching */}
          {/* Error state: retry banner would go here */}

          <LowBalanceAlert balance_usdc={0.45} threshold={0.50} />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-6">
            <div className="lg:col-span-1">
              <WalletBalance balance_usdc={4.50} wallet_address="ABC123...DEF" />
            </div>
            <div className="lg:col-span-3">
              <SpendView />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4">
            <div className="lg:col-span-3">
              <RequestLog />
            </div>
            <div className="lg:col-span-1">
              <ProviderHealth />
            </div>
          </div>
        </>
      )}
    </DashboardShell>
  )
}
