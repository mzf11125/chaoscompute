import { DashboardShell } from '@/components/layout/DashboardShell'
import Card from '@/components/ui/Card'

const categories = [
  {
    title: 'Premium',
    subtitle: '$1.25-$3.00/1M input · best quality',
    color: 'bg-foreground/10 text-foreground',
    providers: [
      { name: 'OpenAI', models: 'gpt-4o, o1, gpt-4o-mini' },
      { name: 'Anthropic', models: 'claude-opus-4, claude-sonnet-4, claude-haiku-4' },
      { name: 'Google Gemini', models: 'gemini-2.5-flash, gemini-2.5-pro' },
      { name: 'xAI Grok', models: 'grok-4.3, grok-3-mini' },
      { name: 'Mistral', models: 'mistral-large, mistral-small' },
    ],
  },
  {
    title: 'Cheap',
    subtitle: '$0.01-$0.88/1M input · best price',
    color: 'bg-warning/20 text-warning',
    providers: [
      { name: 'Nscale', models: 'Llama 3.3 70B, Llama 4 Scout ($0.01/1M)' },
      { name: 'DeepSeek', models: 'deepseek-v3, deepseek-reasoner ($0.14/1M)' },
      { name: 'Hyperbolic', models: 'DeepSeek V3, Qwen Coder 32B ($0.20/1M)' },
      { name: 'Fireworks AI', models: 'Llama 3.3 70B ($0.20/1M)' },
      { name: 'DeepInfra', models: 'Llama 3.3 70B ($0.35/1M)' },
      { name: 'AI21', models: 'jamba-1.5-large, jamba-1.5-mini ($0.30/1M)' },
      { name: 'Novita AI', models: 'Llama 3.3 70B ($0.30/1M)' },
      { name: 'Cohere', models: 'command-a, command-r-plus ($0.50/1M)' },
      { name: 'Perplexity', models: 'sonar-small-128k-online ($0.20/1M)' },
      { name: 'Together AI', models: 'Llama 3.3 70B ($0.88/1M)' },
      { name: 'OpenRouter', models: 'GLM-5, Kimi K2.5, MiniMax (from $0.20/1M)' },
    ],
  },
  {
    title: 'Free',
    subtitle: '$0/1M · zero marginal cost',
    color: 'bg-success/20 text-success',
    providers: [
      { name: 'Groq', models: 'Llama 3.3 70B, Llama 4 Scout (LPU, fastest)' },
      { name: 'Cerebras', models: 'Llama 3.3 70B, Llama 3.1 8B (wafer-scale)' },
      { name: 'SambaNova', models: 'Llama 3.3 70B, Llama 4 Maverick' },
      { name: 'Nebius', models: 'Qwen3-235B' },
      { name: 'Featherless', models: 'Qwen2.5 72B' },
    ],
  },
]

export default function Providers() {
  return (
    <DashboardShell>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Supported Providers</h1>
        <p className="text-muted-foreground text-sm mt-1">
          30 providers across 3 tiers. CLIProxyAPI and LiteLLM routing. OpenAI-compatible.
        </p>
      </div>

      <Card padding="lg" className="mb-6">
        <h2 className="text-foreground font-semibold mb-3">Smart Model Aliases</h2>
        <p className="text-muted-foreground text-sm mb-4">
          Use these aliases to let the router automatically select the best provider for your request across all 3 tiers.
        </p>
        <div className="grid sm:grid-cols-2 gap-2 text-sm">
          {[
            ['best-available', 'Cheapest provider currently under rate limit'],
            ['best-fast', 'Lowest p50 latency across all tiers'],
            ['best-smart', 'Highest capability tier available'],
            ['best-coder', 'Code-optimized (gpt-4o, claude-sonnet-4, deepseek-v3)'],
            ['best-long', 'Models with 128k+ context windows'],
          ].map(([alias, desc]) => (
            <div key={alias} className="flex items-start gap-3 py-2 border-b border-border last:border-0">
              <code className="text-foreground text-sm font-mono shrink-0">{alias}</code>
              <span className="text-muted-foreground text-xs">{desc}</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="space-y-6">
        {categories.map((category) => (
          <Card key={category.title} padding="lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-foreground font-semibold">{category.title}</h2>
                <p className="text-muted-foreground text-xs mt-0.5">{category.subtitle}</p>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${category.color}`}>
                {category.providers.length} providers
              </span>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {category.providers.map((p) => (
                <div key={p.name} className="py-2 border-b border-border last:border-0 sm:last:border-b">
                  <h4 className="text-foreground text-sm font-medium">{p.name}</h4>
                  <p className="text-muted-foreground text-xs mt-0.5 font-mono">{p.models}</p>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </DashboardShell>
  )
}
