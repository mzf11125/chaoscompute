import { DashboardShell } from '@/components/layout/DashboardShell'
import { SpendView } from '@/components/dashboard/SpendView'
import { ProviderHealth } from '@/components/dashboard/ProviderHealth'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { ArrowRight, Terminal, Download, ExternalLink } from 'lucide-react'

export default function Dashboard() {
  return (
    <DashboardShell>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>
        <p className="text-text-secondary text-sm mt-1">
          ChaosCompute uses <span className="text-accent">pay.sh</span> for wallet-approved HTTP 402 payments.
        </p>
      </div>

      {/* Quickstart card */}
      <Card padding="lg" className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Terminal size={22} className="text-accent" aria-hidden="true" />
          <h2 className="text-text-primary font-semibold">Quickstart</h2>
        </div>
        <p className="text-text-secondary text-sm mb-4">
          Install pay.sh, then run this command to make your first wallet-approved API call.
        </p>
        <pre className="bg-surface-input rounded-xl p-4 text-sm text-text-primary overflow-x-auto mb-4">
          <code>
            <span className="text-text-muted"># Install pay.sh</span>{'\n'}
            <span className="text-accent">curl</span> -fsSL https://pay.sh/install | <span className="text-accent">sh</span>{'\n\n'}
            <span className="text-text-muted"># Run the gateway locally</span>{'\n'}
            <span className="text-accent">pay</span> --sandbox server start chaoscompute.yaml{'\n\n'}
            <span className="text-text-muted"># Call any model</span>{'\n'}
            <span className="text-accent">pay</span> --sandbox curl http://127.0.0.1:1402/v1/chat/completions \{'\n'}
            {'  '}-H <span className="text-success">'content-type: application/json'</span> \{'\n'}
            {'  '}-d <span className="text-success">'</span><span className="text-success">{`{"model":"gpt-4o","messages":[{"role":"user","content":"Hello"}]}`}</span><span className="text-success">'</span>{'\n'}
          </code>
        </pre>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" size="sm" onClick={() => window.open('https://pay.sh/docs/get-started/install', '_blank')}>
            <Download size={14} aria-hidden="true" />
            Install pay.sh
          </Button>
          <Button variant="secondary" size="sm" onClick={() => window.open('https://pay.sh/docs/building-with-pay/getting-started', '_blank')}>
            <ExternalLink size={14} aria-hidden="true" />
            pay.sh Docs
          </Button>
        </div>
      </Card>

      {/* Live stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        <div className="lg:col-span-3">
          <SpendView />
        </div>
        <div className="lg:col-span-1">
          <div className="flex flex-col gap-4">
            <Card padding="md" className="text-center">
              <p className="text-text-muted text-xs uppercase tracking-wider mb-1">Payment rail</p>
              <p className="text-lg font-semibold text-accent">HTTP 402</p>
              <p className="text-text-muted text-xs">via pay.sh</p>
            </Card>
            <Card padding="md" className="text-center">
              <p className="text-text-muted text-xs uppercase tracking-wider mb-1">Currency</p>
              <p className="text-lg font-semibold text-accent font-mono">USDC</p>
              <p className="text-text-muted text-xs">Solana</p>
            </Card>
          </div>
        </div>
      </div>

      {/* How it works */}
      <Card padding="lg" className="mb-6">
        <h2 className="text-text-primary font-semibold mb-4">How HTTP 402 Payments Work</h2>
        <div className="grid sm:grid-cols-3 gap-6 text-sm">
          {[
            { step: '1', title: 'Challenge', desc: 'Gateway returns 402 Payment Required with amount and recipient.' },
            { step: '2', title: 'Proof', desc: 'pay.sh signs a transfer authorization locally. No on-chain step.' },
            { step: '3', title: 'Settle', desc: 'Gateway submits the signed transfer, waits for confirmation, returns response.' },
          ].map((s) => (
            <div key={s.step} className="flex gap-3">
              <span className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm font-bold shrink-0">
                {s.step}
              </span>
              <div>
                <p className="text-text-primary font-medium mb-1">{s.title}</p>
                <p className="text-text-muted">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Provider health */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3">
          <ProviderHealth />
        </div>
        <div className="lg:col-span-1">
          <Card padding="md">
            <h3 className="text-text-primary font-semibold mb-2">Agent-ready</h3>
            <p className="text-text-muted text-xs mb-4">
              AI agents discover and pay ChaosCompute automatically via pay.sh's agent commands.
            </p>
            <pre className="bg-surface-input rounded-xl p-3 text-xs text-text-primary overflow-x-auto">
              <code>
                <span className="text-accent">pay</span> claude{'\n'}
                <span className="text-accent">pay</span> codex{'\n'}
                <span className="text-text-muted"># Agents self-pay via HTTP 402</span>
              </code>
            </pre>
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}
