import type { Provider } from '../routing/types'
import { registerProvider } from '../routing/providers'

type Tier = 'premium' | 'cheap' | 'free'

interface ProviderEntry extends Provider {
  tier: Tier
  costPer1MInput: number
  costPer1MOutput: number
}

export function setupDefaultProviders(apiKeys: Record<string, string | undefined>): void {
  const providers: ProviderEntry[] = [
    /* ===== TIER 1: Premium ($1-$15/1M) — quality-first ===== */
    {
      name: 'OpenAI', tier: 'premium', costPer1MInput: 2.50, costPer1MOutput: 10.00,
      baseUrl: 'https://api.openai.com/v1',
      headers: apiKeys.openai ? { Authorization: `Bearer ${apiKeys.openai}` } : {},
      models: [{ name: 'gpt-4o' }, { name: 'gpt-4o-mini' }, { name: 'o1' }, { name: 'o1-mini' }],
      status: 'up', latencyP50: 320, uptime7d: 99.9,
    },
    {
      name: 'Anthropic', tier: 'premium', costPer1MInput: 3.00, costPer1MOutput: 15.00,
      baseUrl: 'https://api.anthropic.com/v1',
      headers: apiKeys.anthropic ? { 'x-api-key': apiKeys.anthropic, 'anthropic-version': '2023-06-01' } : {},
      models: [
        { name: 'claude-opus-4-20250514', alias: 'claude-opus-4' },
        { name: 'claude-sonnet-4-20250514', alias: 'claude-sonnet-4' },
        { name: 'claude-3-5-haiku-20241022', alias: 'claude-haiku-4' },
      ],
      status: 'up', latencyP50: 410, uptime7d: 99.7,
    },
    {
      name: 'Google Gemini', tier: 'premium', costPer1MInput: 1.25, costPer1MOutput: 10.00,
      baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
      headers: {},
      models: [{ name: 'gemini-2.5-flash' }, { name: 'gemini-2.5-pro' }],
      status: 'up', latencyP50: 280, uptime7d: 99.8,
    },
    {
      name: 'xAI Grok', tier: 'premium', costPer1MInput: 2.00, costPer1MOutput: 8.00,
      baseUrl: 'https://api.x.ai/v1',
      headers: apiKeys.xai ? { Authorization: `Bearer ${apiKeys.xai}` } : {},
      models: [{ name: 'grok-4.3' }, { name: 'grok-3-mini' }],
      status: 'up', latencyP50: 350, uptime7d: 99.5,
    },
    {
      name: 'Mistral', tier: 'premium', costPer1MInput: 2.00, costPer1MOutput: 6.00,
      baseUrl: 'https://api.mistral.ai/v1',
      headers: apiKeys.mistral ? { Authorization: `Bearer ${apiKeys.mistral}` } : {},
      models: [{ name: 'mistral-large-latest', alias: 'mistral-large' }, { name: 'mistral-small-latest' }],
      status: 'up', latencyP50: 350, uptime7d: 99.6,
    },

    /* ===== TIER 2: Cheap ($0.01-$1.00/1M) — budget ===== */
    {
      name: 'DeepSeek', tier: 'cheap', costPer1MInput: 0.14, costPer1MOutput: 0.28,
      baseUrl: 'https://api.deepseek.com/v1',
      headers: apiKeys.deepseek ? { Authorization: `Bearer ${apiKeys.deepseek}` } : {},
      models: [{ name: 'deepseek-chat', alias: 'deepseek-v3' }, { name: 'deepseek-reasoner' }],
      status: 'up', latencyP50: 600, uptime7d: 99.2,
    },
    {
      name: 'Nscale', tier: 'cheap', costPer1MInput: 0.01, costPer1MOutput: 0.02,
      baseUrl: 'https://inference.api.nscale.com/v1',
      headers: apiKeys.nscale ? { Authorization: `Bearer ${apiKeys.nscale}` } : {},
      models: [
        { name: 'meta-llama/Llama-3.3-70B-Instruct', alias: 'llama-3-70b-nscale' },
        { name: 'meta-llama/Llama-4-Scout-17B-16E-Instruct', alias: 'llama-4-scout' },
      ],
      status: 'up', latencyP50: 350, uptime7d: 99.4,
    },
    {
      name: 'Hyperbolic', tier: 'cheap', costPer1MInput: 0.20, costPer1MOutput: 0.25,
      baseUrl: 'https://api.hyperbolic.xyz/v1',
      headers: apiKeys.hyperbolic ? { Authorization: `Bearer ${apiKeys.hyperbolic}` } : {},
      models: [
        { name: 'deepseek-ai/DeepSeek-V3' },
        { name: 'Qwen/Qwen2.5-Coder-32B', alias: 'qwen-coder' },
      ],
      status: 'up', latencyP50: 500, uptime7d: 99.3,
    },
    {
      name: 'Together AI', tier: 'cheap', costPer1MInput: 0.88, costPer1MOutput: 0.88,
      baseUrl: 'https://api.together.xyz/v1',
      headers: apiKeys.together ? { Authorization: `Bearer ${apiKeys.together}` } : {},
      models: [{ name: 'meta-llama/Llama-3.3-70B-Instruct-Turbo', alias: 'llama-3-70b' }],
      status: 'up', latencyP50: 220, uptime7d: 99.5,
    },
    {
      name: 'Fireworks AI', tier: 'cheap', costPer1MInput: 0.20, costPer1MOutput: 0.90,
      baseUrl: 'https://api.fireworks.ai/inference/v1',
      headers: apiKeys.fireworks ? { Authorization: `Bearer ${apiKeys.fireworks}` } : {},
      models: [{ name: 'accounts/fireworks/models/llama-v3p3-70b-instruct', alias: 'llama-3-70b-fw' }],
      status: 'up', latencyP50: 250, uptime7d: 99.5,
    },
    {
      name: 'DeepInfra', tier: 'cheap', costPer1MInput: 0.35, costPer1MOutput: 0.35,
      baseUrl: 'https://api.deepinfra.com/v1/openai',
      headers: apiKeys.deepinfra ? { Authorization: `Bearer ${apiKeys.deepinfra}` } : {},
      models: [{ name: 'meta-llama/Meta-Llama-3.3-70B-Instruct', alias: 'llama-3-70b-di' }],
      status: 'up', latencyP50: 380, uptime7d: 99.4,
    },
    {
      name: 'Novita AI', tier: 'cheap', costPer1MInput: 0.30, costPer1MOutput: 0.30,
      baseUrl: 'https://api.novita.ai/v3/openai',
      headers: apiKeys.novita ? { Authorization: `Bearer ${apiKeys.novita}` } : {},
      models: [{ name: 'meta-llama/llama-3.3-70b-instruct' }],
      status: 'up', latencyP50: 400, uptime7d: 99.3,
    },
    {
      name: 'AI21', tier: 'cheap', costPer1MInput: 0.30, costPer1MOutput: 0.30,
      baseUrl: 'https://api.ai21.com/v1',
      headers: apiKeys.ai21 ? { Authorization: `Bearer ${apiKeys.ai21}` } : {},
      models: [{ name: 'jamba-1.5-large' }, { name: 'jamba-1.5-mini' }],
      status: 'up', latencyP50: 420, uptime7d: 99.3,
    },
    {
      name: 'Cohere', tier: 'cheap', costPer1MInput: 0.50, costPer1MOutput: 1.50,
      baseUrl: 'https://api.cohere.com',
      headers: apiKeys.cohere ? { Authorization: `Bearer ${apiKeys.cohere}` } : {},
      models: [{ name: 'command-a' }, { name: 'command-r-plus' }],
      status: 'up', latencyP50: 300, uptime7d: 99.5,
    },
    {
      name: 'Perplexity', tier: 'cheap', costPer1MInput: 0.20, costPer1MOutput: 0.20,
      baseUrl: 'https://api.perplexity.ai',
      headers: apiKeys.perplexity ? { Authorization: `Bearer ${apiKeys.perplexity}` } : {},
      models: [{ name: 'llama-3.1-sonar-small-128k-online' }],
      status: 'up', latencyP50: 500, uptime7d: 99.2,
    },

    /* ===== TIER 3: Free — zero marginal cost ===== */
    {
      name: 'Groq', tier: 'free', costPer1MInput: 0, costPer1MOutput: 0,
      baseUrl: 'https://api.groq.com/openai/v1',
      headers: apiKeys.groq ? { Authorization: `Bearer ${apiKeys.groq}` } : {},
      models: [
        { name: 'llama-3.3-70b-versatile', alias: 'llama-3-70b-groq' },
        { name: 'llama-4-scout-17b-16e-instruct' },
      ],
      status: 'up', latencyP50: 95, uptime7d: 99.4,
    },
    {
      name: 'Cerebras', tier: 'free', costPer1MInput: 0, costPer1MOutput: 0,
      baseUrl: 'https://api.cerebras.ai/v1',
      headers: apiKeys.cerebras ? { Authorization: `Bearer ${apiKeys.cerebras}` } : {},
      models: [{ name: 'llama-3.3-70b' }, { name: 'llama-3.1-8b' }],
      status: 'up', latencyP50: 150, uptime7d: 99.6,
    },
    {
      name: 'SambaNova', tier: 'free', costPer1MInput: 0, costPer1MOutput: 0,
      baseUrl: 'https://api.sambanova.ai/v1',
      headers: apiKeys.sambanova ? { Authorization: `Bearer ${apiKeys.sambanova}` } : {},
      models: [{ name: 'Meta-Llama-3.3-70B-Instruct' }, { name: 'Llama-4-Maverick-17B-128E-Instruct' }],
      status: 'up', latencyP50: 300, uptime7d: 99.5,
    },
    {
      name: 'Nebius', tier: 'free', costPer1MInput: 0, costPer1MOutput: 0,
      baseUrl: 'https://staging.api.studio.nebius.ai/v1',
      headers: apiKeys.nebius ? { Authorization: `Bearer ${apiKeys.nebius}` } : {},
      models: [{ name: 'Qwen3-235B' }],
      status: 'up', latencyP50: 500, uptime7d: 99.2,
    },
    {
      name: 'Featherless', tier: 'free', costPer1MInput: 0, costPer1MOutput: 0,
      baseUrl: 'https://api.featherless.ai/v1',
      headers: apiKeys.featherless ? { Authorization: `Bearer ${apiKeys.featherless}` } : {},
      models: [{ name: 'Qwen2.5-72B-Instruct' }],
      status: 'up', latencyP50: 400, uptime7d: 99.3,
    },
  ]

  for (const provider of providers) {
    registerProvider(provider)
  }

  if (apiKeys.openrouter) {
    const openRouter: ProviderEntry = {
      name: 'OpenRouter', tier: 'cheap', costPer1MInput: 0.20, costPer1MOutput: 0.50,
      baseUrl: 'https://openrouter.ai/api/v1',
      headers: { Authorization: `Bearer ${apiKeys.openrouter}` },
      models: [
        { name: 'anthropic/claude-sonnet-4-20250514' },
        { name: 'zhipuai/glm-5.1', alias: 'glm-5.1' },
        { name: 'moonshotai/kimi-k2.5', alias: 'kimi-k2.5' },
        { name: 'minimax/minimax-m2.7', alias: 'minimax-m2.7' },
      ],
      status: 'up', latencyP50: 450, uptime7d: 99.3,
    }
    registerProvider(openRouter)
  }
}
