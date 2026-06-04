import Card from '@/components/ui/Card'
import { useWallet } from '@/components/console/WalletConnect'

export function APIAccess() {
  const { connected, address, amount } = useWallet()
  const tier = amount >= 1000 ? 'Partner' : amount >= 500 ? 'Operator' : amount >= 100 ? 'Builder' : 'Guest'

  return (
    <Card padding="lg">
      <h2 className="text-foreground font-semibold mb-4">API Access</h2>
      {connected && address ? (
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between py-2 border-b border-border">
            <span className="text-muted-foreground">Wallet</span>
            <span className="text-foreground font-mono text-xs">{address.slice(0, 6)}...{address.slice(-4)}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-border">
            <span className="text-muted-foreground">Tier</span>
            <span className="text-foreground font-semibold">{tier}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-border">
            <span className="text-muted-foreground">Auth</span>
            <span className="text-foreground text-xs">Ephemeral JWT · 5 min expiry</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-muted-foreground">Discount</span>
            <span className="text-success font-bold font-mono">
              {tier === 'Partner' ? '20%' : tier === 'Operator' ? '10%' : tier === 'Builder' ? '5%' : '0%'} off
            </span>
          </div>
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">Connect your wallet above to see API access details.</p>
      )}
    </Card>
  )
}
