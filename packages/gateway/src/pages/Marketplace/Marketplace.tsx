import { DashboardShell } from '@/components/layout/DashboardShell'
import Card from '@/components/ui/Card'

const jobs = [
  {
    id: 'job-x7k9',
    model: 'gpt-5.5',
    status: 'Settled',
    bounty: '$0.052',
    winner: 'node-7x9k',
    cohort: 3,
    submitted: '2 min ago',
    tokens: '1,250',
  },
  {
    id: 'job-m3n1',
    model: 'deepseek-v4-flash',
    status: 'Computing',
    bounty: '$0.014',
    winner: '—',
    cohort: 5,
    submitted: '30 sec ago',
    tokens: '890',
  },
  {
    id: 'job-p5r8',
    model: 'claude-opus-4.8',
    status: 'Revealing',
    bounty: '$0.125',
    winner: '—',
    cohort: 3,
    submitted: '45 sec ago',
    tokens: '2,100',
  },
  {
    id: 'job-k2w4',
    model: 'gemini-3.5-flash',
    status: 'Settled',
    bounty: '$0.031',
    winner: 'node-3m2p',
    cohort: 4,
    submitted: '5 min ago',
    tokens: '670',
  },
  {
    id: 'job-h8j6',
    model: 'gpt-5.5',
    status: 'Slashing',
    bounty: '$0.089',
    winner: 'disputed',
    cohort: 3,
    submitted: '8 min ago',
    tokens: '1,800',
  },
]

const statusColor: Record<string, string> = {
  Settled: 'bg-success/20 text-success',
  Computing: 'bg-accent/20 text-accent',
  Revealing: 'bg-warning/20 text-warning',
  Slashing: 'bg-error/20 text-error',
}

export default function Marketplace() {
  return (
    <DashboardShell>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Compute Marketplace</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Live inference jobs. VRF-selected cohorts. Blind race. On-chain settlement.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Active Jobs', value: '3' },
          { label: 'Total Settled', value: '1,247' },
          { label: 'Avg Bounty', value: '$0.062' },
          { label: 'Avg Cohort', value: '3.8 nodes' },
        ].map((stat) => (
          <Card key={stat.label} padding="md">
            <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">{stat.label}</p>
            <p className="text-foreground text-xl font-bold font-mono">{stat.value}</p>
          </Card>
        ))}
      </div>

      <Card padding="lg" className="mb-6">
        <h2 className="text-foreground font-semibold mb-3">Job Lifecycle</h2>
        <div className="flex flex-wrap gap-3 text-sm">
          {['Requested', 'Cohort Selected', 'Computing', 'Commit', 'Reveal', 'Verified', 'Settled'].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-foreground/10 flex items-center justify-center text-foreground text-xs font-bold">{i + 1}</span>
              <span className="text-muted-foreground">{step}</span>
              {i < 6 && <span className="text-border">→</span>}
            </div>
          ))}
        </div>
      </Card>

      <div className="space-y-4">
        {jobs.map((job) => (
          <Card key={job.id} padding="lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-foreground font-semibold font-mono">{job.id}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[job.status]}`}>{job.status}</span>
                </div>
                <p className="text-muted-foreground text-xs">
                  Model: {job.model} · Cohort: {job.cohort} nodes · {job.tokens} tokens
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center sm:text-right">
                <div>
                  <p className="text-foreground font-mono text-sm font-medium">{job.bounty}</p>
                  <p className="text-muted-foreground text-xs">Bounty</p>
                </div>
                <div>
                  <p className="text-foreground font-mono text-sm font-medium">{job.winner}</p>
                  <p className="text-muted-foreground text-xs">Winner</p>
                </div>
                <div>
                  <p className="text-muted-foreground font-mono text-sm">{job.submitted}</p>
                  <p className="text-muted-foreground text-xs">Time</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </DashboardShell>
  )
}
