import { DashboardShell } from '@/components/layout/DashboardShell'
import Card from '@/components/ui/Card'

const nodes = [
  {
    id: 'node-7x9k',
    owner: 'E9Ps...A7yM',
    tier: 'Enterprise',
    stake: '1,000 SOL',
    uptime: '99.7%',
    jobs: 1247,
    earnings: '$4,832',
    attestation: 'verified',
    region: 'US West',
    models: 'gpt-5.5, claude-opus-4.8, deepseek-v4-flash',
  },
  {
    id: 'node-3m2p',
    owner: 'Dk4f...B2nQ',
    tier: 'Pro',
    stake: '500 SOL',
    uptime: '99.2%',
    jobs: 892,
    earnings: '$2,156',
    attestation: 'verified',
    region: 'EU West',
    models: 'gpt-5.5, gemini-3.5-flash',
  },
  {
    id: 'node-9w1r',
    owner: 'Fj8n...C3kL',
    tier: 'Standard',
    stake: '100 SOL',
    uptime: '98.5%',
    jobs: 456,
    earnings: '$892',
    attestation: 'verified',
    region: 'Asia East',
    models: 'deepseek-v4-flash, groq-llama-4-scout',
  },
  {
    id: 'node-5t8v',
    owner: 'Gh2m...D4jR',
    tier: 'Pro',
    stake: '500 SOL',
    uptime: '99.9%',
    jobs: 1103,
    earnings: '$3,421',
    attestation: 'stale',
    region: 'US East',
    models: 'gpt-5.5, mistral-large',
  },
]

const attestationColor: Record<string, string> = {
  verified: 'bg-success/20 text-success',
  stale: 'bg-warning/20 text-warning',
  none: 'bg-error/20 text-error',
}

const tierColor: Record<string, string> = {
  Standard: 'bg-foreground/10 text-foreground',
  Pro: 'bg-accent/20 text-accent',
  Enterprise: 'bg-success/20 text-success',
}

export default function Nodes() {
  return (
    <DashboardShell>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Compute Nodes</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Active TEE-protected inference nodes. VRF-selected. Stake-weighted.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Active Nodes', value: '4' },
          { label: 'Total Staked', value: '2,100 SOL' },
          { label: 'Jobs Completed', value: '3,698' },
          { label: 'Total Earned', value: '$11,301' },
        ].map((stat) => (
          <Card key={stat.label} padding="md">
            <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">{stat.label}</p>
            <p className="text-foreground text-xl font-bold font-mono">{stat.value}</p>
          </Card>
        ))}
      </div>

      <Card padding="lg" className="mb-6">
        <h2 className="text-foreground font-semibold mb-3">How Node Selection Works</h2>
        <div className="space-y-2 text-sm">
          {[
            'VRF selects 3-5 nodes per job via sqrt(stake)-weighted raffle.',
            'Selected nodes compute output inside TEE (encrypted).',
            'Nodes commit hash of output, then reveal after window.',
            'Winner gets USDC bounty. Others refunded.',
            'Invalid output triggers optimistic slashing.',
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 py-1 border-b border-border last:border-0">
              <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />
              <span className="text-muted-foreground">{item}</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="space-y-4">
        {nodes.map((node) => (
          <Card key={node.id} padding="lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-foreground font-semibold">{node.id}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tierColor[node.tier]}`}>{node.tier}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${attestationColor[node.attestation]}`}>
                    {node.attestation === 'verified' ? 'TEE Verified' : node.attestation === 'stale' ? 'Attestation Stale' : 'No Attestation'}
                  </span>
                </div>
                <p className="text-muted-foreground text-xs font-mono mb-2">Owner: {node.owner} · Region: {node.region}</p>
                <p className="text-muted-foreground text-xs">Models: {node.models}</p>
              </div>
              <div className="grid grid-cols-4 gap-4 text-center sm:text-right">
                <div>
                  <p className="text-foreground font-mono text-sm font-medium">{node.stake}</p>
                  <p className="text-muted-foreground text-xs">Staked</p>
                </div>
                <div>
                  <p className="text-foreground font-mono text-sm font-medium">{node.uptime}</p>
                  <p className="text-muted-foreground text-xs">Uptime</p>
                </div>
                <div>
                  <p className="text-foreground font-mono text-sm font-medium">{node.jobs}</p>
                  <p className="text-muted-foreground text-xs">Jobs</p>
                </div>
                <div>
                  <p className="text-success font-mono text-sm font-medium">{node.earnings}</p>
                  <p className="text-muted-foreground text-xs">Earned</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </DashboardShell>
  )
}
