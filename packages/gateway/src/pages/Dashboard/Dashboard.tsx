import { DashboardShell } from '@/components/layout/DashboardShell'
import { SpendView } from '@/components/dashboard/SpendView'
import { ProviderHealth } from '@/components/dashboard/ProviderHealth'
import { RequestLog } from '@/components/dashboard/RequestLog'
import Card from '@/components/ui/Card'
import { Server, Shield, Globe } from 'lucide-react'

const stats = [
  { icon: Globe, label: 'Phase 1', value: 'Inference Gateway' },
  { icon: Server, label: 'Phase 2', value: 'Decentralized Compute' },
  { icon: Shield, label: 'Payment', value: 'HTTP 402 (pay.sh)' },
]

export default function Dashboard() {
  return (
    <DashboardShell>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary">Gateway Status</h1>
        <p className="text-text-secondary text-sm mt-1">
          Provider cost + 5% margin. Revenue funds the Phase 2 decentralized compute treasury.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6" aria-label="Gateway statistics">
        <div className="lg:col-span-3">
          <SpendView />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {stats.map((s) => (
          <Card key={s.label} padding="md" className="text-center">
            <s.icon size={20} className="text-accent mx-auto mb-2" aria-hidden="true" />
            <p className="text-text-muted text-xs uppercase tracking-wider mb-1">{s.label}</p>
            <p className="text-text-primary font-semibold text-sm">{s.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        <div className="lg:col-span-3">
          <RequestLog />
        </div>
        <div className="lg:col-span-1">
          <ProviderHealth />
        </div>
      </div>

      <Card padding="lg">
        <h2 className="text-text-primary font-semibold mb-3">Roadmap</h2>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div className="flex gap-3">
            <span className="w-8 h-8 rounded-full bg-success/20 text-success flex items-center justify-center text-xs font-bold shrink-0">1</span>
            <div>
              <p className="text-text-primary font-medium">Inference Gateway (Live)</p>
              <p className="text-text-muted text-xs mt-0.5">CLIProxyAPI routing with pay.sh HTTP 402 payments. 20+ upstream AI providers. Live today.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs font-bold shrink-0">2</span>
            <div>
              <p className="text-text-primary font-medium">Decentralized Compute (Coming)</p>
              <p className="text-text-muted text-xs mt-0.5">Game theory replaces routing. Stake-weighted VRF racing. Blind race. Optimistic slashing. Anyone's GPU joins. No centralized scheduler.</p>
            </div>
          </div>
        </div>
      </Card>
    </DashboardShell>
  )
}
