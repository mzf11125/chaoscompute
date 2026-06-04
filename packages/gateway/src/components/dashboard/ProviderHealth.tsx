import Card from '@/components/ui/Card'

const providers = [
  { name: 'OpenAI (gpt-4o, o1, gpt-4o-mini)', status: 'up' as const, latency_p50: 320 },
  { name: 'Anthropic (claude-opus-4, sonnet-4, haiku-4)', status: 'up' as const, latency_p50: 410 },
  { name: 'Google Gemini (2.5-flash, 2.5-pro)', status: 'up' as const, latency_p50: 280 },
  { name: 'xAI / Grok (4.3, 3-mini)', status: 'up' as const, latency_p50: 350 },
  { name: 'Mistral (large, small)', status: 'up' as const, latency_p50: 350 },
  { name: 'DeepSeek (v3, r1)', status: 'up' as const, latency_p50: 600 },
  { name: 'Together AI (llama-3-70b)', status: 'up' as const, latency_p50: 220 },
  { name: 'Groq (llama-3-70b)', status: 'up' as const, latency_p50: 95 },
  { name: 'OpenRouter (GLM-5, Kimi K2.5, MiniMax)', status: 'up' as const, latency_p50: 450 },
]

export function ProviderHealth() {
  return (
    <Card padding="md">
      <h3 className="text-text-primary font-semibold text-sm mb-4">Provider Health</h3>
      <div className="space-y-3" role="list" aria-label="Provider status list">
        {providers.map((p) => (
          <div key={p.name} className="flex items-center justify-between py-1.5 border-b border-border last:border-0" role="listitem">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="w-2 h-2 rounded-full bg-success shrink-0" aria-hidden="true" />
              <span className="text-text-primary text-xs truncate">{p.name}</span>
            </div>
            <div className="flex items-center gap-2 text-xs shrink-0 ml-2">
              <span className="text-text-muted uppercase tracking-wider">UP</span>
              <span className="text-text-secondary tabular-nums">{p.latency_p50}ms</span>
            </div>
          </div>
        ))}
      </div>
      <p className="text-text-muted text-xs mt-3">9 providers online via CLIProxyAPI routing</p>
    </Card>
  )
}
