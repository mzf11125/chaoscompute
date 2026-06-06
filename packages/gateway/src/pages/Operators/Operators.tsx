import { DashboardShell } from '@/components/layout/DashboardShell'
import Card from '@/components/ui/Card'
import { WalletConnect } from '@/components/console/WalletConnect'

export default function Operators() {
  return (
    <DashboardShell>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Node Operator Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Stake SOL. Run TEE nodes. Earn USDC from inference jobs.
        </p>
      </div>

      <div className="mb-6">
        <WalletConnect />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <Card padding="lg">
          <h2 className="text-foreground font-semibold mb-3">Register Node</h2>
          <p className="text-muted-foreground text-sm mb-4">
            Stake SOL to register your TEE node. Higher stake = higher selection probability.
          </p>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-muted-foreground text-sm">Standard Tier</span>
              <span className="text-foreground font-mono text-sm">100 SOL</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-muted-foreground text-sm">Pro Tier</span>
              <span className="text-foreground font-mono text-sm">500 SOL</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-muted-foreground text-sm">Enterprise Tier</span>
              <span className="text-foreground font-mono text-sm">1,000+ SOL</span>
            </div>
          </div>
          <p className="text-muted-foreground text-xs mt-4">
            Staking is escrowed on-chain via StakeVault PDA. Unstaking requires 7-day cooldown.
          </p>
        </Card>

        <Card padding="lg">
          <h2 className="text-foreground font-semibold mb-3">TEE Attestation</h2>
          <p className="text-muted-foreground text-sm mb-4">
            Upload your TEE attestation hash to prove your node runs in a secure environment.
          </p>
          <div className="space-y-3">
            <div className="py-2 border-b border-border">
              <span className="text-muted-foreground text-sm block mb-1">Attestation Hash</span>
              <code className="text-foreground text-xs font-mono bg-card rounded px-2 py-1">
                0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069
              </code>
            </div>
            <div className="flex items-center gap-2 py-2">
              <span className="w-2 h-2 rounded-full bg-success" />
              <span className="text-success text-sm">Attestation verified</span>
            </div>
            <p className="text-muted-foreground text-xs">
              Attestation must be refreshed every 100 slots. Stale attestation deactivates your node.
            </p>
          </div>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <Card padding="lg">
          <h2 className="text-foreground font-semibold mb-2">Your Stake</h2>
          <p className="text-3xl font-bold text-foreground font-mono mb-1">500 SOL</p>
          <p className="text-muted-foreground text-xs">Pro Tier · 2x selection weight</p>
        </Card>
        <Card padding="lg">
          <h2 className="text-foreground font-semibold mb-2">Total Earned</h2>
          <p className="text-3xl font-bold text-success font-mono mb-1">$2,156</p>
          <p className="text-muted-foreground text-xs">892 jobs completed</p>
        </Card>
        <Card padding="lg">
          <h2 className="text-foreground font-semibold mb-2">Slashing History</h2>
          <p className="text-3xl font-bold text-foreground font-mono mb-1">0</p>
          <p className="text-muted-foreground text-xs">No fraud proofs filed</p>
        </Card>
      </div>

      <Card padding="lg">
        <h2 className="text-foreground font-semibold mb-3">How Earnings Work</h2>
        <div className="space-y-2 text-sm">
          {[
            'VRF selects your node into a cohort (3-5 nodes) based on sqrt(stake) weighting.',
            'You compute output inside your TEE. Submit hash as commitment.',
            'After reveal window, submit actual output.',
            'If your output is valid and selected as winner, you receive the USDC bounty.',
            'If output is invalid, anyone can file a fraud proof. Your stake gets slashed.',
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 py-1 border-b border-border last:border-0">
              <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />
              <span className="text-muted-foreground">{item}</span>
            </div>
          ))}
        </div>
      </Card>
    </DashboardShell>
  )
}
