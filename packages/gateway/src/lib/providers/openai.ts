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
    /* ===== TIER 1: Premium ($1.25-$5/1M) — verified via ai-sdk.dev ===== */
    {
      name: 'OpenAI', tier: 'premium', costPer1MInput: 5.00, costPer1MOutput: 30.00,
      baseUrl: 'https://api.openai.com/v1',
      headers: apiKeys.openai ? { Authorization: `Bearer ${apiKeys.openai}` } : {},
      models: [
        { name: 'gpt-5.5', alias: 'gpt-5.5' },
        { name: 'gpt-5', alias: 'gpt-5' },
        { name: 'gpt-4o', alias: 'gpt-4o' },
      ],
      status: 'up', latencyP50: 320, uptime7d: 99.9,
    },
    {
      name: 'Anthropic', tier: 'premium', costPer1MInput: 5.00, costPer1MOutput: 25.00,
      baseUrl: 'https://api.anthropic.com/v1',
      headers: apiKeys.anthropic ? { 'x-api-key': apiKeys.anthropic, 'anthropic-version': '2023-06-01' } : {},
      models: [
        { name: 'claude-opus-4-8', alias: 'claude-opus-4-8' },
        { name: 'claude-opus-4-7', alias: 'claude-opus-4-7' },
        { name: 'claude-sonnet-4-6', alias: 'claude-sonnet-4-6' },
        { name: 'claude-haiku-4-5', alias: 'claude-haiku-4-5' },
      ],
      status: 'up', latencyP50: 410, uptime7d: 99.7,
    },
    {
      name: 'Google Gemini', tier: 'premium', costPer1MInput: 1.50, costPer1MOutput: 9.00,
      baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
      headers: apiKeys.google ? { 'x-goog-api-key': apiKeys.google } : {},
      models: [
        { name: 'gemini-3.5-flash', alias: 'gemini-3.5-flash' },
        { name: 'gemini-3.1-flash', alias: 'gemini-3.1-flash' },
        { name: 'gemini-2.5-pro', alias: 'gemini-2.5-pro' },
      ],
      status: 'up', latencyP50: 280, uptime7d: 99.8,
    },
    {
      name: 'xAI Grok', tier: 'premium', costPer1MInput: 1.25, costPer1MOutput: 2.50,
      baseUrl: 'https://api.x.ai/v1',
      headers: apiKeys.xai ? { Authorization: `Bearer ${apiKeys.xai}` } : {},
      models: [
        { name: 'grok-4-3', alias: 'grok-4.3' },
        { name: 'grok-build-0-1', alias: 'grok-build' },
        { name: 'grok-3-mini', alias: 'grok-3-mini' },
      ],
      status: 'up', latencyP50: 350, uptime7d: 99.5,
    },
    {
      name: 'Mistral', tier: 'premium', costPer1MInput: 2.00, costPer1MOutput: 6.00,
      baseUrl: 'https://api.mistral.ai/v1',
      headers: apiKeys.mistral ? { Authorization: `Bearer ${apiKeys.mistral}` } : {},
      models: [
        { name: 'mistral-large-latest', alias: 'mistral-large' },
        { name: 'mistral-small-latest', alias: 'mistral-small' },
      ],
      status: 'up', latencyP50: 350, uptime7d: 99.6,
    },

    /* ===== TIER 2: Cheap ($0.14-$1.30/1M) — verified via ai-sdk.dev + models.dev ===== */
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
      name: 'DeepSeek', tier: 'cheap', costPer1MInput: 0.14, costPer1MOutput: 0.28,
      baseUrl: 'https://api.deepseek.com/v1',
      headers: apiKeys.deepseek ? { Authorization: `Bearer ${apiKeys.deepseek}` } : {},
      models: [
        { name: 'deepseek-v4-flash', alias: 'deepseek-v4-flash' },
        { name: 'deepseek-v3.2', alias: 'deepseek-v3.2' },
        { name: 'deepseek-reasoner', alias: 'deepseek-r1' },
      ],
      status: 'up', latencyP50: 600, uptime7d: 99.2,
    },
    {
      name: 'Xiaomi MiMo', tier: 'cheap', costPer1MInput: 0.14, costPer1MOutput: 0.28,
      baseUrl: 'https://api.xiaomi.com/v1',
      headers: apiKeys.xiaomi ? { Authorization: `Bearer ${apiKeys.xiaomi}` } : {},
      models: [
        { name: 'mimo-v2.5', alias: 'mimo-v2.5' },
        { name: 'mimo-v2.5-pro', alias: 'mimo-v2.5-pro' },
      ],
      status: 'up', latencyP50: 450, uptime7d: 99.3,
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
      name: 'Alibaba Qwen', tier: 'cheap', costPer1MInput: 0.40, costPer1MOutput: 1.60,
      baseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
      headers: apiKeys.alibaba ? { Authorization: `Bearer ${apiKeys.alibaba}` } : {},
      models: [
        { name: 'qwen3.7-plus', alias: 'qwen3.7-plus' },
        { name: 'qwen3.6-27b', alias: 'qwen3.6-27b' },
      ],
      status: 'up', latencyP50: 400, uptime7d: 99.4,
    },
    {
      name: 'DeepInfra', tier: 'cheap', costPer1MInput: 0.35, costPer1MOutput: 0.35,
      baseUrl: 'https://api.deepinfra.com/v1/openai',
      headers: apiKeys.deepinfra ? { Authorization: `Bearer ${apiKeys.deepinfra}` } : {},
      models: [{ name: 'meta-llama/Meta-Llama-3.3-70B-Instruct', alias: 'llama-3.3-70b-di' }],
      status: 'up', latencyP50: 380, uptime7d: 99.4,
    },
    {
      name: 'MoonshotAI Kimi', tier: 'cheap', costPer1MInput: 0.95, costPer1MOutput: 4.00,
      baseUrl: 'https://api.moonshot.cn/v1',
      headers: apiKeys.moonshot ? { Authorization: `Bearer ${apiKeys.moonshot}` } : {},
      models: [
        { name: 'kimi-k2.6', alias: 'kimi-k2.6' },
      ],
      status: 'up', latencyP50: 420, uptime7d: 99.3,
    },
    {
      name: 'Cohere', tier: 'cheap', costPer1MInput: 0.50, costPer1MOutput: 1.50,
      baseUrl: 'https://api.cohere.com',
      headers: apiKeys.cohere ? { Authorization: `Bearer ${apiKeys.cohere}` } : {},
      models: [{ name: 'command-a-03-2025', alias: 'command-a' }],
      status: 'up', latencyP50: 300, uptime7d: 99.5,
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
      models: [{ name: 'Meta-Llama-3.3-70B-Instruct', alias: 'llama-3.3-70b-sn' }],
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
        { name: 'anthropic/claude-sonnet-4-6', alias: 'claude-sonnet-4-6-or' },
        { name: 'google/gemini-3.5-flash', alias: 'gemini-3.5-flash-or' },
        { name: 'zhipuai/glm-5.1', alias: 'glm-5.1' },
        { name: 'moonshotai/kimi-k2.6', alias: 'kimi-k2.6-or' },
        { name: 'minimax/minimax-m3', alias: 'minimax-m3' },
      ],
      status: 'up', latencyP50: 450, uptime7d: 99.3,
    }
    registerProvider(openRouter)
  }
}
