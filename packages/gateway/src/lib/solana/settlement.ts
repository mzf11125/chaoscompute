import type { SettlementPayload } from '../routing/types'

const GATEWAY_MARGIN_BPS = 500 // 5%

export function calculateCost(
  model: string,
  promptTokens: number,
  completionTokens: number,
): number {
  const rates: Record<string, { input: number; output: number }> = {
    'gpt-4o': { input: 0.005, output: 0.015 },
    'gpt-4o-mini': { input: 0.00015, output: 0.0006 },
    'claude-opus-4': { input: 0.015, output: 0.075 },
    'claude-sonnet-4': { input: 0.003, output: 0.015 },
    'claude-haiku-4': { input: 0.0008, output: 0.004 },
    'llama-3-70b': { input: 0.00088, output: 0.00088 },
    'mixtral-8x7b': { input: 0.0005, output: 0.0005 },
  }

  const rate = rates[model] ?? { input: 0.001, output: 0.001 }
  const providerCost =
    (promptTokens / 1000) * rate.input +
    (completionTokens / 1000) * rate.output

  return providerCost * (1 + GATEWAY_MARGIN_BPS / 10000)
}

export async function settlePayment(payload: SettlementPayload): Promise<{
  success: boolean
  txSignature?: string
  error?: string
}> {
  try {
    const txSignature = `mock-tx-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
    console.log(`[Settlement] ${payload.wallet} | ${payload.provider}/${payload.model} | $${payload.costUsdc.toFixed(6)} USDC | ${txSignature}`)
    return { success: true, txSignature }
  } catch (err) {
    console.error(`[Settlement] Error:`, err)
    return { success: false, error: (err as Error).message }
  }
}

export function getWalletBalance(wallet: string): Promise<number> {
  return Promise.resolve(4.5) // Mock: 4.5 USDC
}
