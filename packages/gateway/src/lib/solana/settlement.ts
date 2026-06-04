import type { SettlementPayload } from '../routing/types'

const GATEWAY_MARGIN_BPS = 500

export function calculateCost(model: string, promptTokens: number, completionTokens: number): number {
  const rates: Record<string, { input: number; output: number }> = {
    'gpt-5.5': { input: 0.005, output: 0.03 },
    'gpt-5': { input: 0.0025, output: 0.015 },
    'gpt-4o': { input: 0.0025, output: 0.01 },
    'claude-opus-4-8': { input: 0.005, output: 0.025 },
    'claude-sonnet-4-6': { input: 0.003, output: 0.015 },
    'claude-haiku-4-5': { input: 0.001, output: 0.005 },
    'gemini-3.5-flash': { input: 0.0015, output: 0.009 },
    'gemini-2.5-pro': { input: 0.00125, output: 0.01 },
    'grok-4-3': { input: 0.00125, output: 0.0025 },
    'deepseek-v4-flash': { input: 0.00014, output: 0.00028 },
    'deepseek-v3.2': { input: 0.00029, output: 0.00043 },
    'llama-3.3-70b': { input: 0.00088, output: 0.00088 },
  }
  const rate = rates[model] ?? { input: 0.001, output: 0.001 }
  const providerCost = (promptTokens / 1000) * rate.input + (completionTokens / 1000) * rate.output
  return providerCost * (1 + GATEWAY_MARGIN_BPS / 10000)
}

export async function settlePayment(payload: SettlementPayload): Promise<{ success: boolean; txSignature?: string; error?: string }> {
  try {
    const txSignature = `mock-tx-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
    console.log(`[Settlement] ${payload.wallet} | ${payload.provider}/${payload.model} | $${payload.costUsdc.toFixed(6)} USDC | ${txSignature}`)
    return { success: true, txSignature }
  } catch (err) {
    console.error(`[Settlement] Error:`, err)
    return { success: false, error: (err as Error).message }
  }
}

export function getWalletBalance(_wallet: string): Promise<number> {
  return Promise.resolve(0)
}
