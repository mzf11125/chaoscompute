import type { Provider } from '../routing/types'
import { registerProvider } from '../routing/providers'

export function setupDefaultProviders(apiKeys: {
  openai?: string
  anthropic?: string
  google?: string
  together?: string
  groq?: string
  mistral?: string
  deepseek?: string
  xai?: string
  openrouter?: string
}): void {
  const realProviders: Provider[] = [
    {
      name: 'OpenAI',
      baseUrl: 'https://api.openai.com/v1',
      headers: apiKeys.openai ? { Authorization: `Bearer ${apiKeys.openai}` } : {},
      models: [
        { name: 'gpt-4o', capabilities: [{ name: 'gpt-4o', contextWindow: 128000, maxTokens: 16384, supportsVision: true, supportsTools: true, costPer1kInput: 0.005, costPer1kOutput: 0.015 }] },
        { name: 'gpt-4o-mini', alias: 'gpt-4o-mini', capabilities: [{ name: 'gpt-4o-mini', contextWindow: 128000, maxTokens: 16384, supportsVision: true, supportsTools: true, costPer1kInput: 0.00015, costPer1kOutput: 0.0006 }] },
        { name: 'o1', capabilities: [{ name: 'o1', contextWindow: 200000, maxTokens: 100000, supportsVision: true, supportsTools: true, costPer1kInput: 0.015, costPer1kOutput: 0.06 }] },
        { name: 'o1-mini', capabilities: [{ name: 'o1-mini', contextWindow: 128000, maxTokens: 65536, supportsVision: false, supportsTools: true, costPer1kInput: 0.003, costPer1kOutput: 0.012 }] },
      ],
      status: 'up', latencyP50: 320, uptime7d: 99.9,
    },
    {
      name: 'Anthropic',
      baseUrl: 'https://api.anthropic.com/v1',
      headers: apiKeys.anthropic ? { 'x-api-key': apiKeys.anthropic, 'anthropic-version': '2023-06-01' } : {},
      models: [
        { name: 'claude-opus-4-20250514', alias: 'claude-opus-4', capabilities: [{ name: 'claude-opus-4', contextWindow: 200000, maxTokens: 4096, supportsVision: true, supportsTools: true, costPer1kInput: 0.015, costPer1kOutput: 0.075 }] },
        { name: 'claude-sonnet-4-20250514', alias: 'claude-sonnet-4', capabilities: [{ name: 'claude-sonnet-4', contextWindow: 200000, maxTokens: 4096, supportsVision: true, supportsTools: true, costPer1kInput: 0.003, costPer1kOutput: 0.015 }] },
        { name: 'claude-3-5-haiku-20241022', alias: 'claude-haiku-4', capabilities: [{ name: 'claude-haiku-4', contextWindow: 200000, maxTokens: 4096, supportsVision: true, supportsTools: true, costPer1kInput: 0.0008, costPer1kOutput: 0.004 }] },
      ],
      status: 'up', latencyP50: 410, uptime7d: 99.7,
    },
    {
      name: 'Google Gemini',
      baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
      headers: {},
      models: [
        { name: 'gemini-2.5-flash', alias: 'gemini-flash', capabilities: [{ name: 'gemini-2.5-flash', contextWindow: 1048576, maxTokens: 8192, supportsVision: true, supportsTools: true, costPer1kInput: 0, costPer1kOutput: 0 }] },
        { name: 'gemini-2.5-pro', alias: 'gemini-pro', capabilities: [{ name: 'gemini-2.5-pro', contextWindow: 2097152, maxTokens: 8192, supportsVision: true, supportsTools: true, costPer1kInput: 0.00125, costPer1kOutput: 0.01 }] },
      ],
      status: 'up', latencyP50: 280, uptime7d: 99.8,
    },
    {
      name: 'xAI',
      baseUrl: 'https://api.x.ai/v1',
      headers: apiKeys.xai ? { Authorization: `Bearer ${apiKeys.xai}` } : {},
      models: [
        { name: 'grok-4.3', alias: 'grok-latest', capabilities: [{ name: 'grok-4.3', contextWindow: 131072, maxTokens: 4096, supportsVision: false, supportsTools: true, costPer1kInput: 0.002, costPer1kOutput: 0.008 }] },
        { name: 'grok-3-mini', alias: 'grok-mini', capabilities: [{ name: 'grok-3-mini', contextWindow: 131072, maxTokens: 4096, supportsVision: false, supportsTools: true, costPer1kInput: 0.0005, costPer1kOutput: 0.002 }] },
      ],
      status: 'up', latencyP50: 350, uptime7d: 99.5,
    },
    {
      name: 'Mistral',
      baseUrl: 'https://api.mistral.ai/v1',
      headers: apiKeys.mistral ? { Authorization: `Bearer ${apiKeys.mistral}` } : {},
      models: [
        { name: 'mistral-large-latest', alias: 'mistral-large', capabilities: [{ name: 'mistral-large', contextWindow: 128000, maxTokens: 4096, supportsVision: false, supportsTools: true, costPer1kInput: 0.002, costPer1kOutput: 0.006 }] },
        { name: 'mistral-small-latest', alias: 'mistral-small', capabilities: [{ name: 'mistral-small', contextWindow: 32000, maxTokens: 4096, supportsVision: false, supportsTools: true, costPer1kInput: 0.001, costPer1kOutput: 0.003 }] },
      ],
      status: 'up', latencyP50: 350, uptime7d: 99.6,
    },
    {
      name: 'Together AI',
      baseUrl: 'https://api.together.xyz/v1',
      headers: apiKeys.together ? { Authorization: `Bearer ${apiKeys.together}` } : {},
      models: [
        { name: 'meta-llama/Llama-3.3-70B-Instruct-Turbo', alias: 'llama-3-70b', capabilities: [{ name: 'llama-3-70b', contextWindow: 131072, maxTokens: 4096, supportsVision: false, supportsTools: true, costPer1kInput: 0.00088, costPer1kOutput: 0.00088 }] },
      ],
      status: 'up', latencyP50: 220, uptime7d: 99.5,
    },
    {
      name: 'Groq',
      baseUrl: 'https://api.groq.com/openai/v1',
      headers: apiKeys.groq ? { Authorization: `Bearer ${apiKeys.groq}` } : {},
      models: [
        { name: 'llama-3.3-70b-versatile', alias: 'llama-3-70b-groq', capabilities: [{ name: 'llama-3-70b-groq', contextWindow: 131072, maxTokens: 4096, supportsVision: false, supportsTools: true, costPer1kInput: 0.00059, costPer1kOutput: 0.00079 }] },
      ],
      status: 'up', latencyP50: 95, uptime7d: 99.4,
    },
    {
      name: 'DeepSeek',
      baseUrl: 'https://api.deepseek.com/v1',
      headers: apiKeys.deepseek ? { Authorization: `Bearer ${apiKeys.deepseek}` } : {},
      models: [
        { name: 'deepseek-chat', alias: 'deepseek-v3', capabilities: [{ name: 'deepseek-v3', contextWindow: 65536, maxTokens: 8192, supportsVision: false, supportsTools: true, costPer1kInput: 0.00027, costPer1kOutput: 0.0011 }] },
        { name: 'deepseek-reasoner', alias: 'deepseek-r1', capabilities: [{ name: 'deepseek-r1', contextWindow: 65536, maxTokens: 8192, supportsVision: false, supportsTools: false, costPer1kInput: 0.00055, costPer1kOutput: 0.00219 }] },
      ],
      status: 'up', latencyP50: 600, uptime7d: 99.2,
    },
  ]

  for (const provider of realProviders) {
    registerProvider(provider)
  }

  if (apiKeys.openrouter) {
    const openRouter: Provider = {
      name: 'OpenRouter',
      baseUrl: 'https://openrouter.ai/api/v1',
      headers: { Authorization: `Bearer ${apiKeys.openrouter}` },
      models: [
        { name: 'anthropic/claude-sonnet-4.6', alias: 'claude-sonnet-4-6', capabilities: [{ name: 'claude-sonnet-4-6', contextWindow: 200000, maxTokens: 8192, supportsVision: true, supportsTools: true, costPer1kInput: 0.003, costPer1kOutput: 0.015 }] },
        { name: 'google/gemini-2.5-pro', alias: 'gemini-2.5-pro', capabilities: [{ name: 'gemini-2.5-pro', contextWindow: 2097152, maxTokens: 8192, supportsVision: true, supportsTools: true, costPer1kInput: 0.00125, costPer1kOutput: 0.01 }] },
        { name: 'zhipuai/glm-5.1', alias: 'glm-5.1', capabilities: [{ name: 'glm-5.1', contextWindow: 131072, maxTokens: 4096, supportsVision: true, supportsTools: true, costPer1kInput: 0.0005, costPer1kOutput: 0.002 }] },
        { name: 'moonshotai/kimi-k2.5', alias: 'kimi-k2.5', capabilities: [{ name: 'kimi-k2.5', contextWindow: 131072, maxTokens: 4096, supportsVision: false, supportsTools: true, costPer1kInput: 0.001, costPer1kOutput: 0.004 }] },
        { name: 'minimax/minimax-m2.7', alias: 'minimax-m2.7', capabilities: [{ name: 'minimax-m2.7', contextWindow: 1048576, maxTokens: 4096, supportsVision: false, supportsTools: true, costPer1kInput: 0.0002, costPer1kOutput: 0.0008 }] },
      ],
      status: 'up', latencyP50: 450, uptime7d: 99.3,
    }
    registerProvider(openRouter)
  }
}
