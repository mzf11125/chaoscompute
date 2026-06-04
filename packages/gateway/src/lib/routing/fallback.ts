import type { FallbackChain, RouteRequest, RouteResponse } from './types'
import { findProviderForModel, getProvider } from './providers'

const aliasMap: Record<string, string[]> = {
  'best-available': ['llama-3-70b', 'mixtral-8x7b', 'gpt-4o-mini', 'claude-haiku-4'],
  'best-fast': ['claude-haiku-4', 'gpt-4o-mini', 'llama-3-70b'],
  'best-smart': ['claude-opus-4', 'gpt-4o', 'mistral-large'],
  'best-coder': ['gpt-4o', 'claude-sonnet-4', 'llama-3-70b'],
  'best-long': ['claude-opus-4', 'gpt-4o', 'mistral-large'],
}

const defaultChain: FallbackChain = {
  primary: '',
  fallback: ['claude-sonnet-4', 'llama-3-70b', 'mixtral-8x7b'],
  timeoutMs: 8000,
  retryOnRateLimit: true,
}

export async function executeFallback(
  request: RouteRequest,
  chain: FallbackChain = defaultChain,
): Promise<{ response: RouteResponse; provider: string }> {
  let models = [request.model]

  if (aliasMap[request.model]) {
    models = aliasMap[request.model]
  }

  if (chain.primary) {
    models = [chain.primary, ...models.filter((m) => m !== chain.primary)]
  }

  models = [...models, ...chain.fallback]

  let lastError: Error | null = null

  for (const model of models) {
    const provider = findProviderForModel(model)
    if (!provider) {
      lastError = new Error(`No provider found for model: ${model}`)
      continue
    }

    try {
      const response = await forwardToProvider(provider.name, { ...request, model })
      return { response, provider: provider.name }
    } catch (err) {
      lastError = err as Error
      if ((err as { status?: number }).status === 429 && !chain.retryOnRateLimit) {
        break
      }
    }
  }

  throw lastError ?? new Error(`All providers failed for request`)
}

async function forwardToProvider(
  providerName: string,
  request: RouteRequest,
): Promise<RouteResponse> {
  const provider = getProvider(providerName)
  if (!provider) throw new Error(`Provider not found: ${providerName}`)

  const res = await fetch(`${provider.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      ...provider.headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: request.model,
      messages: request.messages,
      stream: false,
      temperature: request.temperature,
      max_tokens: request.max_tokens,
      ...(request.tools ? { tools: request.tools } : {}),
    }),
  })

  if (!res.ok) {
    const err = new Error(`Provider ${providerName} returned ${res.status}`) as Error & { status: number }
    err.status = res.status
    throw err
  }

  return res.json()
}

export function resolveModelAlias(model: string): string[] {
  if (aliasMap[model]) {
    return aliasMap[model]
  }
  const provider = findProviderForModel(model)
  if (provider) {
    return [model]
  }
  return [model]
}
