import { DashboardShell } from '@/components/layout/DashboardShell'
import Card from '@/components/ui/Card'
import { ArrowRight, Terminal, Globe, Shield, ExternalLink } from 'lucide-react'

const QUICKSTART = `curl -fsSL https://pay.sh/install | sh
pay --sandbox server start chaoscompute.yaml
pay --sandbox curl http://127.0.0.1:1402/v1/chat/completions \\
  -H 'content-type: application/json' \\
  -d '{"model":"gpt-4o","messages":[{"role":"user","content":"Hello"}]}'`

export default function Docs() {
  return (
    <DashboardShell>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary">Documentation</h1>
        <p className="text-text-secondary text-sm mt-1">
          Everything you need to integrate ChaosCompute with pay.sh.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card padding="lg">
          <Terminal size={24} className="text-accent mb-4" aria-hidden="true" />
          <h2 className="text-text-primary font-semibold mb-2">Quickstart</h2>
          <p className="text-text-secondary text-sm mb-4">
            Install pay.sh and make your first wallet-approved API call in under 5 minutes.
          </p>
          <pre className="bg-surface-input rounded-xl p-4 text-xs text-text-primary overflow-x-auto mb-4 leading-relaxed">
            <code>{QUICKSTART}</code>
          </pre>
          <a
            href="https://pay.sh/docs/get-started/install"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-accent text-sm hover:underline"
          >
            Full install guide <ArrowRight size={14} aria-hidden="true" />
          </a>
        </Card>

        <Card padding="lg">
          <Shield size={24} className="text-accent mb-4" aria-hidden="true" />
          <h2 className="text-text-primary font-semibold mb-2">HTTP 402 Payments</h2>
          <p className="text-text-secondary text-sm mb-4">
            ChaosCompute uses pay.sh's HTTP 402 protocol. The Gateway returns 402 Payment Required. pay.sh signs a wallet transfer. Request retries automatically.
          </p>
          <div className="space-y-2 text-sm mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent shrink-0" aria-hidden="true" />
              <p className="text-text-secondary">No API keys. No credit top-ups.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent shrink-0" aria-hidden="true" />
              <p className="text-text-secondary">USDC per token, settled on Solana.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent shrink-0" aria-hidden="true" />
              <p className="text-text-secondary">Wallet signs locally. Never exposed to the Gateway.</p>
            </div>
          </div>
          <a
            href="https://pay.sh/docs/building-with-pay/getting-started"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-accent text-sm hover:underline"
          >
            pay.sh payment docs <ArrowRight size={14} aria-hidden="true" />
          </a>
        </Card>

        <Card padding="lg">
          <Globe size={24} className="text-accent mb-4" aria-hidden="true" />
          <h2 className="text-text-primary font-semibold mb-2">Provider Spec</h2>
          <p className="text-text-secondary text-sm mb-4">
            ChaosCompute is defined as a pay.sh provider in <code className="text-accent text-xs">chaoscompute.yaml</code>. Pricing, endpoints, and routing are all declared in the spec.
          </p>
          <pre className="bg-surface-input rounded-xl p-4 text-xs text-text-primary overflow-x-auto mb-4 leading-relaxed">
            <code>{`name: chaoscompute
category: ai_ml
routing:
  type: respond
endpoints:
  - method: POST
    path: v1/chat/completions
    metering:
      dimensions:
        - direction: input
          unit: tokens
          scale: 1M
          tiers:
            - price_usd: 0.50`}</code>
          </pre>
        </Card>

        <Card padding="lg">
          <ExternalLink size={24} className="text-accent mb-4" aria-hidden="true" />
          <h2 className="text-text-primary font-semibold mb-2">Resources</h2>
          <nav className="flex flex-col gap-2 text-sm" aria-label="External resources">
            {[
              ['pay.sh Install', 'https://pay.sh/docs/get-started/install'],
              ['pay.sh Building Guide', 'https://pay.sh/docs/building-with-pay/getting-started'],
              ['Provider YAML Spec', 'https://pay.sh/docs/building-with-pay/yaml-specification'],
              ['ChaosCompute GitHub', 'https://github.com/mzf11125/chaoscompute'],
              ['API Reference', '/api'],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="flex items-center gap-2 text-text-secondary hover:text-text-primary motion-safe:transition-colors py-1 focus-visible:ring-2 focus-visible:ring-accent/50 outline-none rounded"
              >
                <span className="w-1 h-1 rounded-full bg-accent shrink-0" aria-hidden="true" />
                {label}
              </a>
            ))}
          </nav>
        </Card>
      </div>
    </DashboardShell>
  )
}
