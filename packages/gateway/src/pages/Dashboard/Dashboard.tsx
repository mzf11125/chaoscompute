import { DashboardShell } from '@/components/layout/DashboardShell'
import { SpendView } from '@/components/dashboard/SpendView'
import { ProviderHealth } from '@/components/dashboard/ProviderHealth'
import { RequestLog } from '@/components/dashboard/RequestLog'
import { WalletBalance } from '@/components/dashboard/WalletBalance'
import { LowBalanceAlert } from '@/components/dashboard/LowBalanceAlert'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { Terminal, Download, ExternalLink, ArrowRight } from 'lucide-react'

const QUICKSTART = `curl -fsSL https://pay.sh/install | sh
pay --sandbox server start chaoscompute.yaml
pay --sandbox curl http://127.0.0.1:1402/v1/chat/completions \\
  -H 'content-type: application/json' \\
  -d '{"model":"gpt-4o","messages":[{"role":"user","content":"Hello"}]}'`

export default function Dashboard() {
  return (
    <DashboardShell>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>
        <p className="text-text-secondary text-sm mt-1">
          ChaosCompute uses <a href="https://pay.sh" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">pay.sh</a> for wallet-approved HTTP 402 payments.
        </p>
      </div>

      <LowBalanceAlert />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        <div className="lg:col-span-1">
          <WalletBalance />
        </div>
        <div className="lg:col-span-3">
          <SpendView />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        <div className="lg:col-span-3">
          <RequestLog />
        </div>
        <div className="lg:col-span-1">
          <ProviderHealth />
        </div>
      </div>

      <Card padding="lg" className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Terminal size={22} className="text-accent" aria-hidden="true" />
          <h2 className="text-text-primary font-semibold">Quickstart</h2>
        </div>
        <p className="text-text-secondary text-sm mb-4">
          Run the gateway locally and make your first wallet-approved API call.
        </p>
        <pre className="bg-surface-input rounded-xl p-4 text-sm text-text-primary overflow-x-auto mb-4 leading-relaxed">
          <code>{QUICKSTART}</code>
        </pre>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" size="sm" onClick={() => window.open('https://pay.sh/docs/get-started/install', '_blank')}>
            <Download size={14} aria-hidden="true" /> Install pay.sh
          </Button>
          <Button variant="secondary" size="sm" onClick={() => window.open('https://pay.sh/docs/building-with-pay/getting-started', '_blank')}>
            <ExternalLink size={14} aria-hidden="true" /> pay.sh Docs
          </Button>
        </div>
      </Card>

      <Card padding="lg" className="mb-6">
        <h2 className="text-text-primary font-semibold mb-4">How HTTP 402 Payments Work</h2>
        <div className="grid sm:grid-cols-3 gap-6 text-sm">
          {[
            { step: '1', title: 'Challenge', desc: 'Gateway returns 402 Payment Required with amount, recipient, and nonce.' },
            { step: '2', title: 'Proof', desc: 'pay.sh signs a USDC transfer authorization locally from your wallet. No on-chain step.' },
            { step: '3', title: 'Settle', desc: 'Gateway broadcasts the signed transfer, confirms on Solana, returns response.' },
          ].map((s) => (
            <div key={s.step} className="flex gap-3">
              <span className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm font-bold shrink-0" aria-hidden="true">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card padding="md">
          <h3 className="text-text-primary font-semibold mb-2">Agent-ready</h3>
          <p className="text-text-muted text-xs mb-4">
            AI agents discover and pay ChaosCompute through pay.sh's agent commands.
          </p>
          <pre className="bg-surface-input rounded-lg p-3 text-xs text-text-primary overflow-x-auto">
            <code>pay claude{'\n'}pay codex{'\n'}<span className="text-text-muted"># Agents self-pay via HTTP 402</span></code>
          </pre>
        </Card>
        <Card padding="md">
          <h3 className="text-text-primary font-semibold mb-2">Discoverable</h3>
          <p className="text-text-muted text-xs mb-4">
            Listed in the pay.sh provider catalog. Agents find ChaosCompute with a single command.
          </p>
          <pre className="bg-surface-input rounded-lg p-3 text-xs text-text-primary overflow-x-auto">
            <code>pay skills search chaoscompute{'\n'}<span className="text-text-muted"># Returns gateway URL + pricing</span></code>
          </pre>
        </Card>
        <Card padding="md">
          <h3 className="text-text-primary font-semibold mb-2">Open Source</h3>
          <p className="text-text-muted text-xs mb-4">
            MIT licensed. Provider spec in chaoscompute.yaml. Fork and customize.
          </p>
          <a
            href="https://github.com/mzf11125/chaoscompute"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-accent text-sm hover:underline"
          >
            View on GitHub <ArrowRight size={14} aria-hidden="true" />
          </a>
        </Card>
      </div>
    </DashboardShell>
  )
}
