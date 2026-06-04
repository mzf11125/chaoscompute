import { DashboardShell } from '@/components/layout/DashboardShell'
import Card from '@/components/ui/Card'

const providerCategories = [
  {
    title: 'Direct Providers',
    providers: [
      { name: 'OpenAI', models: 'gpt-4o, o1, gpt-4o-mini' },
      { name: 'Anthropic', models: 'claude-opus-4, claude-sonnet-4, claude-haiku-4' },
      { name: 'Google Gemini', models: 'gemini-2.5-flash, gemini-2.5-pro' },
      { name: 'xAI / Grok', models: 'grok-4.3, grok-3-mini' },
      { name: 'Mistral', models: 'mistral-large, mistral-small' },
      { name: 'DeepSeek', models: 'deepseek-v3, deepseek-r1' },
      { name: 'Together AI', models: 'llama-3-70b' },
      { name: 'Groq', models: 'llama-3-70b (fastest)' },
    ],
  },
  {
    title: 'OpenAI-Compatible (via OpenRouter)',
    providers: [
      { name: 'GLM', models: 'glm-5.1, glm-5' },
      { name: 'Kimi', models: 'kimi-k2.5, kimi-k2' },
      { name: 'MiniMax', models: 'minimax-m2.7, minimax-m2.5' },
    ],
  },
  {
    title: 'Free Providers',
    providers: [
      { name: 'Kiro AI', models: 'Claude 4.5 + GLM-5 + MiniMax (unlimited)' },
      { name: 'OpenCode Free', models: 'No auth, auto-fetch models (unlimited)' },
      { name: 'Vertex AI', models: 'Gemini 3 Pro + DeepSeek + GLM-5 ($300 credits)' },
    ],
  },
]

export default function Providers() {
  return (
    <DashboardShell>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary">Supported Providers</h1>
        <p className="text-text-secondary text-sm mt-1">
          20+ AI providers via CLIProxyAPI routing. All accessible through a single OpenAI-compatible endpoint.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {providerCategories.map((category) => (
          <Card key={category.title} padding="lg">
            <h2 className="text-text-primary font-semibold text-sm mb-4 uppercase tracking-wider">{category.title}</h2>
            <div className="space-y-3">
              {category.providers.map((p) => (
                <div key={p.name} className="py-2 border-b border-border last:border-0">
                  <h3 className="text-text-primary text-sm font-medium">{p.name}</h3>
                  <p className="text-text-muted text-xs mt-0.5 font-mono">{p.models}</p>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Card padding="lg" className="mt-6">
        <h2 className="text-text-primary font-semibold mb-3">Smart Model Aliases</h2>
        <p className="text-text-secondary text-sm mb-4">
          Use these aliases to let CLIProxyAPI automatically select the best provider for your request.
        </p>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          {[
            ['best-available', 'Cheapest provider currently under rate limit'],
            ['best-fast', 'Lowest p50 latency across providers'],
            ['best-smart', 'Highest capability tier available'],
            ['best-coder', 'Code-optimized models (gpt-4o, claude-sonnet-4, deepseek-v3)'],
            ['best-long', 'Models with 128k+ context windows'],
          ].map(([alias, desc]) => (
            <div key={alias} className="flex items-start gap-3 py-2 border-b border-border last:border-0">
              <code className="text-accent text-sm font-mono shrink-0">{alias}</code>
              <span className="text-text-secondary text-xs">{desc}</span>
            </div>
          ))}
        </div>
      </Card>
    </DashboardShell>
  )
}
