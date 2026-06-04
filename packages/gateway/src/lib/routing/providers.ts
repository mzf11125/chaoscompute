import type { Provider, ProviderModel, ProviderStatus } from './types'

let providers: Provider[] = []

export function registerProvider(provider: Provider): void {
  const existing = providers.findIndex((p) => p.name === provider.name)
  if (existing >= 0) {
    providers[existing] = provider
  } else {
    providers.push(provider)
  }
}

export function getProvider(name: string): Provider | undefined {
  return providers.find((p) => p.name === name)
}

export function getAllProviders(): Provider[] {
  return [...providers]
}

export function getOnlineProviders(): Provider[] {
  return providers.filter((p) => p.status === 'up')
}

export function findProviderForModel(model: string): Provider | undefined {
  for (const provider of providers) {
    if (provider.status === 'down') continue
    const found = provider.models.find(
      (m) => m.name === model || m.alias === model,
    )
    if (found) return provider
  }
  return undefined
}

export function updateProviderStatus(
  name: string,
  status: ProviderStatus,
  latencyP50: number,
): void {
  const provider = providers.find((p) => p.name === name)
  if (provider) {
    provider.status = status
    provider.latencyP50 = latencyP50
  }
}

export function getModelsForProvider(name: string): ProviderModel[] {
  return providers.find((p) => p.name === name)?.models ?? []
}

export function listAllModels(): ProviderModel[] {
  const seen = new Set<string>()
  const all: ProviderModel[] = []
  for (const provider of providers) {
    for (const model of provider.models) {
      const key = model.alias ?? model.name
      if (!seen.has(key)) {
        seen.add(key)
        all.push(model)
      }
    }
  }
  return all
}

export async function runHealthChecks(): Promise<void> {
  const checks = providers.map(async (provider) => {
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 5000)

      const start = Date.now()
      const res = await fetch(`${provider.baseUrl}/models`, {
        headers: provider.headers,
        signal: controller.signal,
      })
      clearTimeout(timeout)

      const latency = Date.now() - start
      updateProviderStatus(provider.name, res.ok ? 'up' : 'down', latency)
    } catch {
      updateProviderStatus(provider.name, 'down', 0)
    }
  })

  await Promise.allSettled(checks)
}
