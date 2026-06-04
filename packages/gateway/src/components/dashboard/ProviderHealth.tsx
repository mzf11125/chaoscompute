import Card from '@/components/ui/Card'

const tiers: { label: string; color: string; providers: { name: string; models: string; cost: string }[] }[] = [
  {
    label: 'Premium', color: 'bg-foreground/10 text-foreground',
    providers: [
      { name: 'OpenAI', models: 'gpt-4o, o1, gpt-4o-mini', cost: '$2.50' },
      { name: 'Anthropic', models: 'claude-opus-4, sonnet-4, haiku-4', cost: '$3.00' },
      { name: 'Google Gemini', models: '2.5-flash, 2.5-pro', cost: '$1.25' },
      { name: 'xAI Grok', models: 'grok-4.3, grok-3-mini', cost: '$2.00' },
      { name: 'Mistral', models: 'mistral-large, mistral-small', cost: '$2.00' },
    ],
  },
  {
    label: 'Cheap', color: 'bg-success/20 text-success',
    providers: [
      { name: 'Nscale', models: 'Llama 3.3 70B, Llama 4 Scout', cost: '$0.01' },
      { name: 'DeepSeek', models: 'deepseek-v3, deepseek-reasoner', cost: '$0.14' },
      { name: 'Hyperbolic', models: 'DeepSeek V3, Qwen Coder 32B', cost: '$0.20' },
      { name: 'Fireworks AI', models: 'Llama 3.3 70B', cost: '$0.20' },
      { name: 'DeepInfra', models: 'Llama 3.3 70B', cost: '$0.35' },
      { name: 'AI21', models: 'jamba-1.5-large, jamba-1.5-mini', cost: '$0.30' },
      { name: 'Novita AI', models: 'Llama 3.3 70B', cost: '$0.30' },
      { name: 'Cohere', models: 'command-a, command-r-plus', cost: '$0.50' },
      { name: 'Together AI', models: 'Llama 3.3 70B', cost: '$0.88' },
      { name: 'OpenRouter', models: 'GLM-5, Kimi K2.5, MiniMax', cost: '$0.20' },
    ],
  },
  {
    label: 'Free', color: 'bg-success/20 text-success',
    providers: [
      { name: 'Groq', models: 'Llama 3.3 70B, Llama 4 Scout', cost: 'Free' },
      { name: 'Cerebras', models: 'Llama 3.3 70B, Llama 3.1 8B', cost: 'Free' },
      { name: 'SambaNova', models: 'Llama 3.3 70B, Llama 4 Maverick', cost: 'Free' },
      { name: 'Nebius', models: 'Qwen3-235B', cost: 'Free' },
      { name: 'Featherless', models: 'Qwen2.5 72B', cost: 'Free' },
    ],
  },
]

export function ProviderHealth() {
  return (
    <div className="space-y-4">
      {tiers.map((tier) => (
        <Card key={tier.label} padding="md">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-foreground font-semibold text-sm">{tier.label}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full ${tier.color}`}>{tier.providers.length} providers</span>
          </div>
          <div className="space-y-2" role="list" aria-label={`${tier.label} providers`}>
            {tier.providers.map((p) => (
              <div key={p.name} className="flex items-center justify-between py-1.5 border-b border-border last:border-0" role="listitem">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-success shrink-0" aria-hidden="true" />
                  <span className="text-foreground text-xs truncate">{p.name}</span>
                </div>
                <div className="flex items-center gap-3 text-xs shrink-0 ml-2">
                  <span className="text-muted-foreground truncate max-w-[160px]">{p.models}</span>
                  <span className="text-muted-foreground tabular-nums font-mono">{p.cost}/1M</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}
      <p className="text-muted-foreground text-xs text-center">30 providers across 3 tiers via CLIProxyAPI + LiteLLM routing</p>
    </div>
  )
}
