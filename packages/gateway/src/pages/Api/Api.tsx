import { DashboardShell } from '@/components/layout/DashboardShell'
import Card from '@/components/ui/Card'

export default function Api() {
  return (
    <DashboardShell>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary">API Reference</h1>
        <p className="text-text-secondary text-sm mt-1">
          OpenAI-compatible chat completions endpoint.
        </p>
      </div>

      <Card padding="lg" className="mb-6">
        <h2 className="text-text-primary font-semibold mb-2">Authentication</h2>
        <p className="text-text-secondary text-sm mb-4">
          All requests require a Solana wallet-signed JWT in the Authorization header.
        </p>
        <pre className="bg-surface-input rounded-xl p-4 text-xs text-text-primary overflow-x-auto">
          <code>Authorization: Bearer &lt;CHAOS_JWT&gt;</code>
        </pre>
      </Card>

      <Card padding="lg" className="mb-6">
        <h2 className="text-text-primary font-semibold mb-2">Base URL</h2>
        <code className="block text-accent text-sm bg-surface-input rounded-xl p-4">
          https://gateway.chaoscompute.io/v1
        </code>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {[
          { method: 'GET', path: '/v1/models', desc: 'List all available models' },
          { method: 'POST', path: '/v1/chat/completions', desc: 'Create a chat completion' },
          { method: 'GET', path: '/v1/spend', desc: 'Get wallet spend summary' },
          { method: 'GET', path: '/v1/health', desc: 'Provider health check' },
        ].map((endpoint) => (
          <Card key={endpoint.path} padding="md">
            <span className="text-xs font-mono text-accent uppercase">{endpoint.method}</span>
            <code className="block text-text-primary text-sm mt-1 mb-2">{endpoint.path}</code>
            <p className="text-text-muted text-xs">{endpoint.desc}</p>
          </Card>
        ))}
      </div>
    </DashboardShell>
  )
}
