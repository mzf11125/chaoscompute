import Card from '@/components/ui/Card'

interface ProviderStatus {
  name: string
  status: 'up' | 'slow' | 'down'
  latency_p50: number
  uptime_7d: number
}

const providers: ProviderStatus[] = [
  { name: 'OpenAI (gpt-4o)', status: 'up', latency_p50: 320, uptime_7d: 99.9 },
  { name: 'Anthropic (claude-opus-4)', status: 'up', latency_p50: 890, uptime_7d: 99.7 },
  { name: 'Together (llama-3-70b)', status: 'up', latency_p50: 220, uptime_7d: 99.5 },
  { name: 'Groq (llama-3-70b)', status: 'slow', latency_p50: 1200, uptime_7d: 98.2 },
  { name: 'Mistral (mistral-large)', status: 'up', latency_p50: 350, uptime_7d: 99.8 },
  { name: 'Fireworks (mixtral-8x7b)', status: 'down', latency_p50: 0, uptime_7d: 87.4 },
]

const statusColors = {
  up: 'bg-success',
  slow: 'bg-warning',
  down: 'bg-error',
}

const statusLabels = {
  up: 'UP',
  slow: 'SLOW',
  down: 'DOWN',
}

export function ProviderHealth() {
  return (
    <Card padding="md">
      <h3 className="text-text-primary font-semibold mb-4">Provider Health</h3>
      <div className="space-y-3">
        {providers.map((provider) => (
          <div
            key={provider.name}
            className="flex items-center justify-between py-2 border-b border-border last:border-0"
          >
            <div className="flex items-center gap-3">
              <span className={`w-2 h-2 rounded-full ${statusColors[provider.status]}`} />
              <span className="text-text-primary text-sm">{provider.name}</span>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="text-text-muted uppercase tracking-wider">
                {statusLabels[provider.status]}
              </span>
              {provider.status !== 'down' && (
                <span className="text-text-secondary">{provider.latency_p50}ms</span>
              )}
              <span className="text-text-muted">{provider.uptime_7d}%</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
