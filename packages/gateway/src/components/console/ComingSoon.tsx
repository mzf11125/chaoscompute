import Card from '@/components/ui/Card'
import { Check } from 'lucide-react'

export function ComingSoon() {
  return (
    <Card padding="lg">
      <h2 className="text-foreground font-semibold mb-4">Compute Network Status</h2>
      <div className="space-y-2">
        {[
          { item: 'Gateway with 30 providers', done: true },
          { item: 'USDC payments via pay.sh', done: true },
          { item: 'Wallet-based auth', done: true },
          { item: 'Anchor program deployed', done: true },
          { item: 'TEE node registration', done: false },
          { item: 'VRF cohort selection', done: false },
          { item: 'Blind race mechanics', done: false },
          { item: 'Optimistic slashing', done: false },
          { item: 'Job marketplace', done: false },
          { item: 'Node operator dashboard', done: false },
        ].map(({ item, done }) => (
          <div key={item} className="flex items-center gap-2 py-1.5 border-b border-border last:border-0 text-sm">
            {done ? (
              <Check size={12} className="text-success shrink-0" />
            ) : (
              <span className="w-3 h-3 rounded-full border border-border shrink-0" />
            )}
            <span className={`text-xs ${done ? 'text-foreground' : 'text-muted-foreground'}`}>{item}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}
