export interface Provider {
  name: string
  baseUrl: string
  headers: Record<string, string>
  models: ProviderModel[]
  status: ProviderStatus
  latencyP50: number
  uptime7d: number
}

export interface ProviderModel {
  name: string
  alias?: string
  capabilities?: ModelCapability[]
}

export interface ModelCapability {
  name: string
  contextWindow: number
  maxTokens: number
  supportsVision: boolean
  supportsTools: boolean
  costPer1kInput: number
  costPer1kOutput: number
}

export type ProviderStatus = 'up' | 'slow' | 'down'

export interface RouteRequest {
  model: string
  messages: Array<{
    role: string
    content: string | Array<{ type: string; text?: string; image_url?: { url: string } }>
  }>
  stream?: boolean
  temperature?: number
  max_tokens?: number
  tools?: unknown[]
}

export interface RouteResponse {
  id: string
  model: string
  choices: Array<{
    index: number
    message?: {
      role: string
      content: string
    }
    delta?: {
      content: string
    }
    finish_reason: string
  }>
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

export interface FallbackChain {
  primary: string
  fallback: string[]
  timeoutMs: number
  retryOnRateLimit: boolean
}

export interface SettlementPayload {
  wallet: string
  model: string
  provider: string
  promptTokens: number
  completionTokens: number
  costUsdc: number
  timestamp: number
}
