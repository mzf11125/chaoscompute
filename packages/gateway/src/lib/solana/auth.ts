/**
 * @deprecated Replaced by pay.sh HTTP 402 payment layer.
 * This file is kept for reference during the transition.
 * See chaoscompute.yaml for the pay.sh provider spec.
 */

interface JwtPayload {
  wallet_pubkey: string
  timestamp: number
  nonce: string
  exp: number
}

const usedNonces = new Set<string>()

export async function verifyChaosJWT(token: string): Promise<{
  wallet: string
  valid: boolean
  error?: string
}> {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) {
      return { wallet: '', valid: false, error: 'Invalid JWT format' }
    }

    const header = JSON.parse(atob(parts[0]))
    const payload: JwtPayload = JSON.parse(atob(parts[1]))

    if (Date.now() / 1000 > payload.exp) {
      return { wallet: '', valid: false, error: 'JWT expired' }
    }

    if (usedNonces.has(payload.nonce)) {
      return { wallet: '', valid: false, error: 'Nonce already used' }
    }

    usedNonces.add(payload.nonce)

    if (usedNonces.size > 100000) {
      usedNonces.clear()
    }

    return {
      wallet: payload.wallet_pubkey,
      valid: true,
    }
  } catch (err) {
    return {
      wallet: '',
      valid: false,
      error: `JWT verification failed: ${(err as Error).message}`,
    }
  }
}
