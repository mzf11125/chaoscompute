import Card from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'

export function ProviderHealth() {
  const providers = [
    { name: 'OpenAI (gpt-4o)', status: 'up' as const, latency_p50: 320 },
    { name: 'Anthropic (claude-sonnet-4)', status: 'up' as const, latency_p50: 410 },
    { name: 'Together (llama-3-70b)', status: 'up' as const, latency_p50: 220 },
    { name: 'Groq', status: 'slow' as const, latency_p50: 1200 },
    { name: 'Mistral (mistral-large)', status: 'up' as const, latency_p50: 350 },
    { name: 'Fireworks (mixtral-8x7b)', status: 'down' as const, latency_p50: 0 },
  ]

  return (
    <Card padding="md">
      <h3 className="text-text-primary font-semibold text-sm mb-4">Provider Health</h3>
      <div className="space-y-3" role="list" aria-label="Provider status list">
        {providers.map((p) => (
          <div key={p.name} className="flex items-center justify-between py-1.5 border-b border-border last:border-0" role="listitem">
            <div className="flex items-center gap-2.5 min-w-0">
              <span
                className={`w-2 h-2 rounded-full shrink-0 ${p.status === 'up' ? 'bg-success' : p.status === 'slow' ? 'bg-warning' : 'bg-error'}`}
                aria-hidden="true"
              />
              <span className="text-text-primary text-xs truncate">{p.name}</span>
            </div>
            <div className="flex items-center gap-3 text-xs shrink-0 ml-2">
              <span className="text-text-muted uppercase tracking-wider">
                {p.status === 'up' ? 'UP' : p.status === 'slow' ? 'SLOW' : 'DOWN'}
              </span>
              {p.status !== 'down' && (
                <span className="text-text-secondary tabular-nums">{p.latency_p50}ms</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
