import type { Provider } from '../routing/types'
import { registerProvider } from '../routing/providers'

export function setupDefaultProviders(apiKeys: {
  openai?: string
  anthropic?: string
  together?: string
  groq?: string
  mistral?: string
}): void {
  if (apiKeys.openai) {
    const openai: Provider = {
      name: 'OpenAI',
      baseUrl: 'https://api.openai.com/v1',
      headers: { Authorization: `Bearer ${apiKeys.openai}` },
      models: [
        { name: 'gpt-4o', capabilities: [{ name: 'gpt-4o', contextWindow: 128000, maxTokens: 16384, supportsVision: true, supportsTools: true, costPer1kInput: 0.005, costPer1kOutput: 0.015 }] },
        { name: 'gpt-4o-mini', capabilities: [{ name: 'gpt-4o-mini', contextWindow: 128000, maxTokens: 16384, supportsVision: true, supportsTools: true, costPer1kInput: 0.00015, costPer1kOutput: 0.0006 }] },
      ],
      status: 'up',
      latencyP50: 320,
      uptime7d: 99.9,
    }
    registerProvider(openai)
  }

  if (apiKeys.anthropic) {
    const anthropic: Provider = {
      name: 'Anthropic',
      baseUrl: 'https://api.anthropic.com/v1',
      headers: {
        'x-api-key': apiKeys.anthropic,
        'anthropic-version': '2023-06-01',
      },
      models: [
        { name: 'claude-opus-4', alias: 'claude-opus-4', capabilities: [{ name: 'claude-opus-4', contextWindow: 200000, maxTokens: 4096, supportsVision: true, supportsTools: true, costPer1kInput: 0.015, costPer1kOutput: 0.075 }] },
        { name: 'claude-sonnet-4', alias: 'claude-sonnet-4', capabilities: [{ name: 'claude-sonnet-4', contextWindow: 200000, maxTokens: 4096, supportsVision: true, supportsTools: true, costPer1kInput: 0.003, costPer1kOutput: 0.015 }] },
        { name: 'claude-haiku-4', alias: 'claude-haiku-4', capabilities: [{ name: 'claude-haiku-4', contextWindow: 200000, maxTokens: 4096, supportsVision: true, supportsTools: true, costPer1kInput: 0.0008, costPer1kOutput: 0.004 }] },
      ],
      status: 'up',
      latencyP50: 890,
      uptime7d: 99.7,
    }
    registerProvider(anthropic)
  }

  if (apiKeys.together) {
    const together: Provider = {
      name: 'Together',
      baseUrl: 'https://api.together.xyz/v1',
      headers: { Authorization: `Bearer ${apiKeys.together}` },
      models: [
        { name: 'meta-llama/Llama-3.3-70B-Instruct-Turbo', alias: 'llama-3-70b', capabilities: [{ name: 'llama-3-70b', contextWindow: 131072, maxTokens: 4096, supportsVision: false, supportsTools: true, costPer1kInput: 0.00088, costPer1kOutput: 0.00088 }] },
        { name: 'mistralai/Mixtral-8x7B-Instruct-v0.1', alias: 'mixtral-8x7b', capabilities: [{ name: 'mixtral-8x7b', contextWindow: 32768, maxTokens: 4096, supportsVision: false, supportsTools: true, costPer1kInput: 0.0005, costPer1kOutput: 0.0005 }] },
      ],
      status: 'up',
      latencyP50: 220,
      uptime7d: 99.5,
    }
    registerProvider(together)
  }
}
