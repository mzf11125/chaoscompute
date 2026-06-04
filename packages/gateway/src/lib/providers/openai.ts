import type { Provider } from '../routing/types'
import { registerProvider } from '../routing/providers'

type Tier = 'oauth' | 'apikey' | 'compat'

interface ProviderEntry extends Provider {
  tier: Tier
  costPer1MInput: number
  costPer1MOutput: number
  requiresKey: boolean
}

export function setupDefaultProviders(apiKeys: Record<string, string | undefined>): void {
  const providers: ProviderEntry[] = [
    /* ===== TIER 1: OAuth channels — FREE, no API key needed ===== */
    {
      name: 'Claude Code (OAuth)', tier: 'oauth', costPer1MInput: 0, costPer1MOutput: 0, requiresKey: false,
      baseUrl: 'https://api.anthropic.com/v1',
      headers: {}, models: [
        { name: 'claude-opus-4.8' }, { name: 'claude-opus-4.7' }, { name: 'claude-sonnet-4.6' }, { name: 'claude-haiku-4.5' },
      ],
      status: 'up', latencyP50: 410, uptime7d: 99.7,
    },
    {
      name: 'Codex (OAuth)', tier: 'oauth', costPer1MInput: 0, costPer1MOutput: 0, requiresKey: false,
      baseUrl: 'https://api.openai.com/v1',
      headers: {}, models: [
        { name: 'gpt-5.5' }, { name: 'gpt-5' }, { name: 'gpt-4o' },
      ],
      status: 'up', latencyP50: 320, uptime7d: 99.9,
    },
    {
      name: 'Gemini CLI (OAuth)', tier: 'oauth', costPer1MInput: 0, costPer1MOutput: 0, requiresKey: false,
      baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
      headers: {}, models: [
        { name: 'gemini-3.5-flash' }, { name: 'gemini-3.1-flash' }, { name: 'gemini-2.5-pro' },
      ],
      status: 'up', latencyP50: 280, uptime7d: 99.8,
    },
    {
      name: 'Grok Build (OAuth)', tier: 'oauth', costPer1MInput: 0, costPer1MOutput: 0, requiresKey: false,
      baseUrl: 'https://api.x.ai/v1',
      headers: {}, models: [
        { name: 'grok-4.3' }, { name: 'grok-build-0.1' },
      ],
      status: 'up', latencyP50: 350, uptime7d: 99.5,
    },
    {
      name: 'Antigravity (OAuth)', tier: 'oauth', costPer1MInput: 0, costPer1MOutput: 0, requiresKey: false,
      baseUrl: 'https://api.anthropic.com/v1',
      headers: {}, models: [
        { name: 'claude-sonnet-4.6' }, { name: 'claude-haiku-4.5' },
      ],
      status: 'up', latencyP50: 450, uptime7d: 99.3,
    },
    {
      name: 'Kimi K2 (OAuth)', tier: 'oauth', costPer1MInput: 0, costPer1MOutput: 0, requiresKey: false,
      baseUrl: 'https://api.moonshot.cn/v1',
      headers: {}, models: [{ name: 'kimi-k2.6' }],
      status: 'up', latencyP50: 420, uptime7d: 99.3,
    },
    {
      name: 'Vertex AI (OAuth)', tier: 'oauth', costPer1MInput: 0, costPer1MOutput: 0, requiresKey: false,
      baseUrl: 'https://api.vertex.ai/v1',
      headers: {}, models: [
        { name: 'gemini-3.5-flash' }, { name: 'gemini-2.5-pro' },
      ],
      status: 'up', latencyP50: 300, uptime7d: 99.6,
    },
    {
      name: 'AI Studio (OAuth)', tier: 'oauth', costPer1MInput: 0, costPer1MOutput: 0, requiresKey: false,
      baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
      headers: {}, models: [
        { name: 'gemini-3.5-flash' }, { name: 'gemini-3.1-flash' },
      ],
      status: 'up', latencyP50: 290, uptime7d: 99.7,
    },

    /* ===== TIER 2: API Key providers — need key, direct billing ===== */
    {
      name: 'OpenAI', tier: 'apikey', costPer1MInput: 5.00, costPer1MOutput: 30.00, requiresKey: true,
      baseUrl: 'https://api.openai.com/v1',
      headers: apiKeys.openai ? { Authorization: `Bearer ${apiKeys.openai}` } : {},
      models: [{ name: 'gpt-5.5' }, { name: 'gpt-5' }, { name: 'gpt-4o' }],
      status: 'up', latencyP50: 320, uptime7d: 99.9,
    },
    {
      name: 'Anthropic', tier: 'apikey', costPer1MInput: 5.00, costPer1MOutput: 25.00, requiresKey: true,
      baseUrl: 'https://api.anthropic.com/v1',
      headers: apiKeys.anthropic ? { 'x-api-key': apiKeys.anthropic, 'anthropic-version': '2023-06-01' } : {},
      models: [
        { name: 'claude-opus-4.8' }, { name: 'claude-opus-4.7' }, { name: 'claude-sonnet-4.6' }, { name: 'claude-haiku-4.5' },
      ],
      status: 'up', latencyP50: 410, uptime7d: 99.7,
    },
    {
      name: 'Google Gemini', tier: 'apikey', costPer1MInput: 1.50, costPer1MOutput: 9.00, requiresKey: true,
      baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
      headers: apiKeys.google ? { 'x-goog-api-key': apiKeys.google } : {},
      models: [{ name: 'gemini-3.5-flash' }, { name: 'gemini-3.1-flash' }, { name: 'gemini-2.5-pro' }],
      status: 'up', latencyP50: 280, uptime7d: 99.8,
    },
    {
      name: 'xAI Grok', tier: 'apikey', costPer1MInput: 1.25, costPer1MOutput: 2.50, requiresKey: true,
      baseUrl: 'https://api.x.ai/v1',
      headers: apiKeys.xai ? { Authorization: `Bearer ${apiKeys.xai}` } : {},
      models: [{ name: 'grok-4.3' }, { name: 'grok-build-0.1' }, { name: 'grok-3-mini' }],
      status: 'up', latencyP50: 350, uptime7d: 99.5,
    },
    {
      name: 'Mistral', tier: 'apikey', costPer1MInput: 2.00, costPer1MOutput: 6.00, requiresKey: true,
      baseUrl: 'https://api.mistral.ai/v1',
      headers: apiKeys.mistral ? { Authorization: `Bearer ${apiKeys.mistral}` } : {},
      models: [{ name: 'mistral-large-latest' }, { name: 'mistral-small-latest' }],
      status: 'up', latencyP50: 350, uptime7d: 99.6,
    },
    {
      name: 'DeepSeek', tier: 'apikey', costPer1MInput: 0.14, costPer1MOutput: 0.28, requiresKey: true,
      baseUrl: 'https://api.deepseek.com/v1',
      headers: apiKeys.deepseek ? { Authorization: `Bearer ${apiKeys.deepseek}` } : {},
      models: [{ name: 'deepseek-v4-flash' }, { name: 'deepseek-v3.2' }, { name: 'deepseek-reasoner' }],
      status: 'up', latencyP50: 600, uptime7d: 99.2,
    },
    {
      name: 'Cohere', tier: 'apikey', costPer1MInput: 0.50, costPer1MOutput: 1.50, requiresKey: true,
      baseUrl: 'https://api.cohere.com',
      headers: apiKeys.cohere ? { Authorization: `Bearer ${apiKeys.cohere}` } : {},
      models: [{ name: 'command-a-03-2025' }],
      status: 'up', latencyP50: 300, uptime7d: 99.5,
    },

    /* ===== TIER 3: OpenAI-compatible — any provider via openai-compatibility config ===== */
    {
      name: 'OpenRouter', tier: 'compat', costPer1MInput: 0.20, costPer1MOutput: 0.50, requiresKey: true,
      baseUrl: 'https://openrouter.ai/api/v1',
      headers: apiKeys.openrouter ? { Authorization: `Bearer ${apiKeys.openrouter}` } : {},
      models: [
        { name: 'anthropic/claude-sonnet-4.6' }, { name: 'google/gemini-3.5-flash' },
        { name: 'zhipuai/glm-5.1' }, { name: 'moonshotai/kimi-k2.6' },
        { name: 'minimax/minimax-m3' },
      ],
      status: 'up', latencyP50: 450, uptime7d: 99.3,
    },
    {
      name: 'Groq', tier: 'compat', costPer1MInput: 0, costPer1MOutput: 0, requiresKey: false,
      baseUrl: 'https://api.groq.com/openai/v1',
      headers: apiKeys.groq ? { Authorization: `Bearer ${apiKeys.groq}` } : {},
      models: [{ name: 'llama-4-scout-17b-16e-instruct' }, { name: 'qwen-qwq-32b' }],
      status: 'up', latencyP50: 95, uptime7d: 99.4,
    },
    {
      name: 'Cerebras', tier: 'compat', costPer1MInput: 0, costPer1MOutput: 0, requiresKey: false,
      baseUrl: 'https://api.cerebras.ai/v1',
      headers: apiKeys.cerebras ? { Authorization: `Bearer ${apiKeys.cerebras}` } : {},
      models: [{ name: 'llama-3.3-70b' }, { name: 'llama-3.1-8b' }],
      status: 'up', latencyP50: 150, uptime7d: 99.6,
    },
    {
      name: 'Together AI', tier: 'compat', costPer1MInput: 0.88, costPer1MOutput: 0.88, requiresKey: true,
      baseUrl: 'https://api.together.xyz/v1',
      headers: apiKeys.together ? { Authorization: `Bearer ${apiKeys.together}` } : {},
      models: [{ name: 'meta-llama/Llama-3.3-70B-Instruct-Turbo' }, { name: 'deepseek-ai/DeepSeek-V3' }],
      status: 'up', latencyP50: 220, uptime7d: 99.5,
    },

    /* ===== End of providers ===== */
  ]

  for (const provider of providers) {
    registerProvider(provider)
  }
}
