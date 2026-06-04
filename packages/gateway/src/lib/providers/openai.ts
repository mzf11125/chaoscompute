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
    /* ===== TIER 1: Premium ===== */
    {
      name: 'OpenAI', tier: 'premium', costPer1MInput: 2.50, costPer1MOutput: 10.00,
      baseUrl: 'https://api.openai.com/v1',
      headers: apiKeys.openai ? { Authorization: `Bearer ${apiKeys.openai}` } : {},
      models: [{ name: 'gpt-4o' }, { name: 'gpt-4o-mini' }, { name: 'o1' }, { name: 'o3-mini' }],
      status: 'up', latencyP50: 320, uptime7d: 99.9,
    },
    {
      name: 'Anthropic', tier: 'premium', costPer1MInput: 3.00, costPer1MOutput: 15.00,
      baseUrl: 'https://api.anthropic.com/v1',
      headers: apiKeys.anthropic ? { 'x-api-key': apiKeys.anthropic, 'anthropic-version': '2023-06-01' } : {},
      models: [
        { name: 'claude-sonnet-4-20250514', alias: 'claude-sonnet-4' },
        { name: 'claude-opus-4-20250514', alias: 'claude-opus-4' },
        { name: 'claude-3-5-haiku-20241022', alias: 'claude-haiku' },
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
      name: 'xAI Grok', tier: 'premium', costPer1MInput: 3.00, costPer1MOutput: 15.00,
      baseUrl: 'https://api.x.ai/v1',
      headers: apiKeys.xai ? { Authorization: `Bearer ${apiKeys.xai}` } : {},
      models: [{ name: 'grok-4' }, { name: 'grok-3-mini' }],
      status: 'up', latencyP50: 350, uptime7d: 99.5,
    },
    {
      name: 'Mistral', tier: 'premium', costPer1MInput: 2.00, costPer1MOutput: 6.00,
      baseUrl: 'https://api.mistral.ai/v1',
      headers: apiKeys.mistral ? { Authorization: `Bearer ${apiKeys.mistral}` } : {},
      models: [{ name: 'mistral-large-latest' }, { name: 'mistral-small-latest' }],
      status: 'up', latencyP50: 350, uptime7d: 99.6,
    },

    /* ===== TIER 2: Cheap ===== */
    {
      name: 'DeepSeek', tier: 'cheap', costPer1MInput: 0.14, costPer1MOutput: 0.28,
      baseUrl: 'https://api.deepseek.com/v1',
      headers: apiKeys.deepseek ? { Authorization: `Bearer ${apiKeys.deepseek}` } : {},
      models: [{ name: 'deepseek-chat', alias: 'deepseek-v3' }, { name: 'deepseek-reasoner', alias: 'deepseek-r1' }],
      status: 'up', latencyP50: 600, uptime7d: 99.2,
    },
    {
      name: 'Nscale', tier: 'cheap', costPer1MInput: 0.01, costPer1MOutput: 0.02,
      baseUrl: 'https://inference.api.nscale.com/v1',
      headers: apiKeys.nscale ? { Authorization: `Bearer ${apiKeys.nscale}` } : {},
      models: [
        { name: 'meta-llama/Llama-3.3-70B-Instruct', alias: 'llama-3.3-70b' },
        { name: 'meta-llama/Llama-4-Scout-17B-16E-Instruct', alias: 'llama-4-scout' },
      ],
      status: 'up', latencyP50: 350, uptime7d: 99.4,
    },
    {
      name: 'Hyperbolic', tier: 'cheap', costPer1MInput: 0.20, costPer1MOutput: 0.25,
      baseUrl: 'https://api.hyperbolic.xyz/v1',
      headers: apiKeys.hyperbolic ? { Authorization: `Bearer ${apiKeys.hyperbolic}` } : {},
      models: [
        { name: 'deepseek-ai/DeepSeek-V3-0324', alias: 'deepseek-v3-hyper' },
        { name: 'Qwen/Qwen2.5-Coder-32B-Instruct', alias: 'qwen2.5-coder' },
      ],
      status: 'up', latencyP50: 500, uptime7d: 99.3,
    },
    {
      name: 'Together AI', tier: 'cheap', costPer1MInput: 0.88, costPer1MOutput: 0.88,
      baseUrl: 'https://api.together.xyz/v1',
      headers: apiKeys.together ? { Authorization: `Bearer ${apiKeys.together}` } : {},
      models: [
        { name: 'meta-llama/Llama-3.3-70B-Instruct-Turbo', alias: 'llama-3.3-70b-turbo' },
        { name: 'deepseek-ai/DeepSeek-V3', alias: 'deepseek-v3-together' },
      ],
      status: 'up', latencyP50: 220, uptime7d: 99.5,
    },
    {
      name: 'Fireworks AI', tier: 'cheap', costPer1MInput: 0.20, costPer1MOutput: 0.90,
      baseUrl: 'https://api.fireworks.ai/inference/v1',
      headers: apiKeys.fireworks ? { Authorization: `Bearer ${apiKeys.fireworks}` } : {},
      models: [
        { name: 'accounts/fireworks/models/llama-v3p3-70b-instruct', alias: 'llama-3.3-70b-fw' },
        { name: 'accounts/fireworks/models/deepseek-v3', alias: 'deepseek-v3-fw' },
      ],
      status: 'up', latencyP50: 250, uptime7d: 99.5,
    },
    {
      name: 'DeepInfra', tier: 'cheap', costPer1MInput: 0.35, costPer1MOutput: 0.35,
      baseUrl: 'https://api.deepinfra.com/v1/openai',
      headers: apiKeys.deepinfra ? { Authorization: `Bearer ${apiKeys.deepinfra}` } : {},
      models: [{ name: 'meta-llama/Meta-Llama-3.3-70B-Instruct', alias: 'llama-3.3-70b-di' }],
      status: 'up', latencyP50: 380, uptime7d: 99.4,
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
      models: [{ name: 'command-a-03-2025', alias: 'command-a' }, { name: 'command-r-plus-08-2024', alias: 'command-r-plus' }],
      status: 'up', latencyP50: 300, uptime7d: 99.5,
    },
    {
      name: 'Perplexity', tier: 'cheap', costPer1MInput: 0.20, costPer1MOutput: 0.20,
      baseUrl: 'https://api.perplexity.ai',
      headers: apiKeys.perplexity ? { Authorization: `Bearer ${apiKeys.perplexity}` } : {},
      models: [{ name: 'sonar-pro', alias: 'perplexity-sonar' }],
      status: 'up', latencyP50: 500, uptime7d: 99.2,
    },
    {
      name: 'Novita AI', tier: 'cheap', costPer1MInput: 0.30, costPer1MOutput: 0.30,
      baseUrl: 'https://api.novita.ai/v3/openai',
      headers: apiKeys.novita ? { Authorization: `Bearer ${apiKeys.novita}` } : {},
      models: [{ name: 'meta-llama/llama-3.3-70b-instruct', alias: 'llama-3.3-70b-novita' }],
      status: 'up', latencyP50: 400, uptime7d: 99.3,
    },

    /* ===== TIER 3: Free ===== */
    {
      name: 'Groq', tier: 'free', costPer1MInput: 0, costPer1MOutput: 0,
      baseUrl: 'https://api.groq.com/openai/v1',
      headers: apiKeys.groq ? { Authorization: `Bearer ${apiKeys.groq}` } : {},
      models: [
        { name: 'meta-llama/llama-4-scout-17b-16e-instruct', alias: 'llama-4-scout' },
        { name: 'qwen-qwq-32b', alias: 'qwen-32b' },
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
      models: [{ name: 'Meta-Llama-3.3-70B-Instruct', alias: 'llama-3.3-70b-sn' }, { name: 'Llama-4-Maverick-17B-128E-Instruct', alias: 'llama-4-maverick' }],
      status: 'up', latencyP50: 300, uptime7d: 99.5,
    },
    {
      name: 'Nebius', tier: 'free', costPer1MInput: 0, costPer1MOutput: 0,
      baseUrl: 'https://staging.api.studio.nebius.ai/v1',
      headers: apiKeys.nebius ? { Authorization: `Bearer ${apiKeys.nebius}` } : {},
      models: [{ name: 'deepseek-ai/DeepSeek-V3' }, { name: 'Qwen/Qwen2.5-72B-Instruct' }],
      status: 'up', latencyP50: 500, uptime7d: 99.2,
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
        { name: 'anthropic/claude-sonnet-4-20250514', alias: 'claude-sonnet-4-or' },
        { name: 'google/gemini-2.5-pro', alias: 'gemini-2.5-pro-or' },
        { name: 'zhipuai/glm-5.1', alias: 'glm-5.1' },
        { name: 'moonshotai/kimi-k2', alias: 'kimi-k2' },
        { name: 'minimax/minimax-m2.7', alias: 'minimax-m2.7' },
      ],
      status: 'up', latencyP50: 450, uptime7d: 99.3,
    }
    registerProvider(openRouter)
  }
}
