import Card from '@/components/ui/Card'
import { Clock } from 'lucide-react'

export function ComingSoon() {
  return (
    <Card padding="lg">
      <h2 className="text-foreground font-semibold mb-4">Phase 2 Roadmap</h2>
      <div className="space-y-2">
        {[
          'Spend tracking (on-chain settlement logs)',
          'Request logs (per-request provider routing)',
          'Provider health (real-time latency monitoring)',
          'Native SOL staking (delegate to validator)',
          'Priority routing (stake-weighted queue)',
          'Premium model access (restricted to Operator+)',
        ].map((item) => (
          <div key={item} className="flex items-center gap-2 py-1.5 border-b border-border last:border-0 text-sm">
            <Clock size={12} className="text-warning shrink-0" />
            <span className="text-muted-foreground text-xs">{item}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}
