import { DashboardShell } from '@/components/layout/DashboardShell'
import { SpendView } from '@/components/dashboard/SpendView'
import { RequestLog } from '@/components/dashboard/RequestLog'
import { ProviderHealth } from '@/components/dashboard/ProviderHealth'
import { WalletBalance } from '@/components/dashboard/WalletBalance'
import { LowBalanceAlert } from '@/components/dashboard/LowBalanceAlert'
import { SpendSkeleton, TableSkeleton } from '@/components/ui/Skeleton'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { Wallet } from 'lucide-react'
import { useWallet } from '@/context/WalletProvider'
import { useState, useEffect } from 'react'

export default function Dashboard() {
  const { connected, connecting, connect } = useWallet()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(t)
  }, [])

  return (
    <DashboardShell>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>
        <p className="text-text-secondary text-sm mt-1">
          Real-time spend and usage for your Solana wallet.
        </p>
      </div>

      {!connected ? (
        <Card padding="lg" className="text-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <Wallet size={28} className="text-accent" aria-hidden="true" />
          </div>
          <h2 className="text-xl font-semibold text-text-primary mb-2">Connect your wallet</h2>
          <p className="text-text-secondary text-sm mb-6">
            Connect a Solana wallet to view real-time spend, request logs, and provider health.
            Your wallet pays per request — nothing is deposited anywhere.
          </p>
          <Button variant="primary" size="lg" onClick={connect} disabled={connecting}>
            {connecting ? 'Connecting...' : 'Connect Solana Wallet'}
          </Button>
          <p className="text-text-muted text-xs mt-4">Supports Phantom, Solflare, and Backpack</p>
        </Card>
      ) : loading ? (
        <>
          <SpendSkeleton />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4">
            <div className="lg:col-span-3"><TableSkeleton /></div>
            <div className="lg:col-span-1"><div className="h-64 rounded-3xl bg-surface-elevated border border-border animate-pulse" /></div>
          </div>
        </>
      ) : (
        <>
          <LowBalanceAlert balance_usdc={0.45} />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-6">
            <div className="lg:col-span-1">
              <WalletBalance />
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
