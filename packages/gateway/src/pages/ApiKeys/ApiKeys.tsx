import { DashboardShell } from '@/components/layout/DashboardShell'
import Card from '@/components/ui/Card'
import { Wallet, ExternalLink } from 'lucide-react'

export default function ApiKeys() {
  return (
    <DashboardShell>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary">Authentication</h1>
        <p className="text-text-secondary text-sm mt-1">
          ChaosCompute uses pay.sh for wallet-based authentication. No API keys needed.
        </p>
      </div>

      <Card padding="lg" className="text-center max-w-lg mx-auto mb-6">
        <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
          <Wallet size={28} className="text-accent" aria-hidden="true" />
        </div>
        <h2 className="text-xl font-semibold text-text-primary mb-2">Your wallet is your API key</h2>
        <p className="text-text-secondary text-sm mb-6">
          There are no API keys to manage. ChaosCompute uses pay.sh's HTTP 402 protocol:
          the Gateway returns a payment challenge, your wallet signs the transfer locally,
          and pay.sh retries the request with payment proof.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="https://pay.sh/docs/get-started/install"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-accent text-surface font-medium text-sm hover:bg-accent-hover motion-safe:transition-colors focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface outline-none"
          >
            Install pay.sh
          </a>
          <a
            href="https://pay.sh/docs/using-pay/pass-through-commands"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-surface-elevated text-text-primary font-medium text-sm border border-border hover:bg-surface-hover hover:border-border-strong motion-safe:transition-colors min-h-[44px] focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface outline-none"
          >
            pay.sh Docs
            <ExternalLink size={14} aria-hidden="true" />
          </a>
        </div>
      </Card>

      <Card padding="md">
        <h3 className="text-text-primary font-medium mb-3">Quick Reference</h3>
        <div className="space-y-2 text-sm">
          {[
            { label: 'Install', cmd: 'curl -fsSL https://pay.sh/install | sh' },
            { label: 'Check wallet', cmd: 'pay whoami' },
            { label: 'List accounts', cmd: 'pay account list' },
            { label: 'Call an API', cmd: 'pay curl https://gateway.chaoscompute.io/v1/chat/completions -d \'{"model":"gpt-4o","messages":[...]}\'' },
          ].map((item) => (
            <div key={item.label} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-2 border-b border-border last:border-0">
              <span className="text-text-muted text-xs uppercase tracking-wider w-24 shrink-0">{item.label}</span>
              <code className="text-text-primary text-xs font-mono bg-surface-input rounded-lg px-3 py-1.5 break-all">{item.cmd}</code>
            </div>
          ))}
        </div>
      </Card>
    </DashboardShell>
  )
}
