import Card from '@/components/ui/Card'

const tiers: { label: string; color: string; providers: { name: string; models: string; cost: string }[] }[] = [
  {
    label: 'Premium', color: 'bg-foreground/10 text-foreground',
    providers: [
      { name: 'OpenAI', models: 'gpt-5.5, gpt-5, gpt-4o', cost: '$5.00' },
      { name: 'Anthropic', models: 'claude-opus-4.8, opus-4.7, sonnet-4.6, haiku-4.5', cost: '$5.00' },
      { name: 'Google Gemini', models: 'gemini-3.5-flash, gemini-3.1-flash, gemini-2.5-pro', cost: '$1.50' },
      { name: 'xAI Grok', models: 'grok-4.3, grok-build-0.1, grok-3-mini', cost: '$1.25' },
      { name: 'Mistral', models: 'mistral-large, mistral-small', cost: '$2.00' },
    ],
  },
  {
    label: 'Cheap', color: 'bg-warning/20 text-warning',
    providers: [
      { name: 'Nscale', models: 'Llama 3.3 70B, Llama 4 Scout', cost: '$0.01' },
      { name: 'DeepSeek', models: 'deepseek-v4-flash, deepseek-v3.2, deepseek-r1', cost: '$0.14' },
      { name: 'Xiaomi MiMo', models: 'mimo-v2.5, mimo-v2.5-pro', cost: '$0.14' },
      { name: 'Hyperbolic', models: 'DeepSeek V3 0324, Qwen 2.5 Coder', cost: '$0.20' },
      { name: 'Fireworks AI', models: 'Llama 3.3 70B, DeepSeek V3', cost: '$0.20' },
      { name: 'Alibaba Qwen', models: 'qwen3.7-plus, qwen3.6-27b', cost: '$0.40' },
      { name: 'DeepInfra', models: 'Llama 3.3 70B', cost: '$0.35' },
      { name: 'Cohere', models: 'command-a', cost: '$0.50' },
      { name: 'Together AI', models: 'Llama 3.3 70B Turbo, DeepSeek V3', cost: '$0.88' },
      { name: 'MoonshotAI Kimi', models: 'kimi-k2.6', cost: '$0.95' },
      { name: 'OpenRouter', models: 'claude-sonnet-4.6, gemini-3.5-flash, GLM-5.1, kimi-k2.6, minimax-m3', cost: '$0.20' },
    ],
  },
  {
    label: 'Free', color: 'bg-success/20 text-success',
    providers: [
      { name: 'Groq', models: 'Llama 4 Scout, Qwen 32B (LPU, fastest)', cost: 'Free' },
      { name: 'Cerebras', models: 'Llama 3.3 70B, Llama 3.1 8B', cost: 'Free' },
      { name: 'SambaNova', models: 'Llama 3.3 70B', cost: 'Free' },
      { name: 'Nebius', models: 'DeepSeek V3, Qwen 2.5 72B', cost: 'Free' },
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
                  <span className="text-muted-foreground truncate max-w-[180px]">{p.models}</span>
                  <span className="text-muted-foreground tabular-nums font-mono">{p.cost}/1M</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}
      <p className="text-muted-foreground text-xs text-center">30 providers via CLIProxyAPI + LiteLLM. Models verified by models.dev + ai-sdk.dev.</p>
    </div>
  )
}
