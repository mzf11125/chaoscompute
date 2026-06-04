import nacl from 'tweetnacl'
import naclUtil from 'tweetnacl-util'
import bs58 from 'bs58'

interface JwtPayload {
  wallet_pubkey: string
  timestamp: number
  nonce: string
  exp: number
}

export class ChaosSigner {
  private privateKey: Uint8Array
  private publicKey: string

  constructor(privateKey: string) {
    this.privateKey = bs58.decode(privateKey).slice(0, 32)
    const keypair = nacl.sign.keyPair.fromSeed(this.privateKey)
    this.publicKey = bs58.encode(keypair.publicKey)
  }

  async token(): Promise<string> {
    const payload: JwtPayload = {
      wallet_pubkey: this.publicKey,
      timestamp: Math.floor(Date.now() / 1000),
      nonce: crypto.randomUUID().replace(/-/g, ''),
      exp: Math.floor(Date.now() / 1000) + 300,
    }

    const header = { alg: 'EdDSA', typ: 'JWT' }
    const encodedHeader = b64url(JSON.stringify(header))
    const encodedPayload = b64url(JSON.stringify(payload))
    const message = `${encodedHeader}.${encodedPayload}`
    const signature = b64url(
      nacl.sign.detached(
        naclUtil.decodeUTF8(message),
        bs58.decode(this.privateKey.toString()).slice(0, 64),
      ),
    )

    return `${encodedHeader}.${encodedPayload}.${signature}`
  }
}

function b64url(input: string | Uint8Array): string {
  const encoded =
    typeof input === 'string'
      ? btoa(input)
      : btoa(String.fromCharCode(...input))
  return encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export class ChaosClient {
  private baseUrl: string
  private signer: ChaosSigner

  constructor(baseUrl: string, signer: ChaosSigner) {
    this.baseUrl = baseUrl
    this.signer = signer
  }

  async chat(model: string, messages: Array<{ role: string; content: string }>) {
    const token = await this.signer.token()
    const res = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model, messages }),
    })
    return res.json()
  }
}
