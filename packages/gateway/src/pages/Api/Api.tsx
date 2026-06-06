import { DashboardShell } from '@/components/layout/DashboardShell'
import Card from '@/components/ui/Card'

export default function Api() {
  return (
    <DashboardShell>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">API Reference</h1>
        <p className="text-muted-foreground text-sm mt-1">
          OpenAI-compatible chat completions. Decentralized backend. USDC payments.
        </p>
      </div>

      <Card padding="lg" className="mb-6">
        <h2 className="text-foreground font-semibold mb-2">HTTP 402 Payment Flow</h2>
        <p className="text-muted-foreground text-sm mb-4">
          Calling the Gateway directly returns 402 Payment Required. Use <code className="text-accent text-xs">pay curl</code> to handle the payment handshake automatically.
        </p>
        <div className="grid sm:grid-cols-3 gap-4 text-sm mb-4">
          {[
            { step: '1', title: 'Request', desc: 'POST /v1/chat/completions returns 402 with amount + recipient + nonce in response headers.' },
            { step: '2', title: 'Sign', desc: 'pay.sh signs a USDC transfer authorization locally from your wallet. No credentials sent.' },
            { step: '3', title: 'Retry', desc: 'pay.sh replays the request with an X-PAYMENT proof header. Gateway settles and returns response.' },
          ].map((s) => (
            <div key={s.step} className="flex gap-2">
              <span className="text-accent font-bold text-sm" aria-hidden="true">{s.step}.</span>
              <div>
                <p className="text-foreground font-medium text-sm mb-0.5">{s.title}</p>
                <p className="text-muted-foreground text-xs">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-muted-foreground text-xs">
          Full payment protocol: <a href="https://pay.sh/docs/building-with-pay/getting-started" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">pay.sh building docs</a>
        </p>
      </Card>

      <Card padding="lg" className="mb-6">
        <h2 className="text-foreground font-semibold mb-2">Base URL</h2>
        <code className="block text-accent text-sm bg-card rounded-xl p-4 font-mono">
          https://gateway.chaoscompute.io/v1
        </code>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {[
          { method: 'GET', path: '/v1/models', desc: 'List available AI models. Free.' },
          { method: 'POST', path: '/v1/chat/completions', desc: 'OpenAI-compatible chat. Metered per token via 402.' },
          { method: 'GET', path: '/v1/spend', desc: 'Wallet spend summary. Free.' },
          { method: 'GET', path: '/v1/health', desc: 'Gateway health check. Free.' },
          { method: 'GET', path: '/v1/nodes', desc: 'Active compute nodes. TEE status. Stake amounts.' },
          { method: 'GET', path: '/v1/jobs', desc: 'Recent inference jobs. Bounties. Cohorts. Status.' },
        ].map((ep) => (
          <Card key={ep.path} padding="md">
            <span className="text-xs font-mono text-accent uppercase tracking-wider">{ep.method}</span>
            <code className="block text-foreground text-sm font-mono mt-1 mb-2">{ep.path}</code>
            <p className="text-muted-foreground text-xs">{ep.desc}</p>
          </Card>
        ))}
      </div>
    </DashboardShell>
  )
}
