# ChaosCompute Node.js SDK

`npm install @chaoscompute/sdk`

ChaosCompute is a decentralized AI inference network on Solana. This SDK provides programmatic access to the API.

## Quick Start

```bash
curl -fsSL https://pay.sh/install | sh
pay curl https://gateway.chaoscompute.io/v1/chat/completions \
  -H 'content-type: application/json' \
  -d '{"model":"gpt-5.5","messages":[{"role":"user","content":"Hello"}]}'
```

## Programmatic Access

```javascript
import { ChaosSigner } from '@chaoscompute/sdk'
import OpenAI from 'openai'

const signer = new ChaosSigner(process.env.CHAOS_KEY)
const client = new OpenAI({
  baseURL: 'https://gateway.chaoscompute.io/v1',
  apiKey: await signer.token(),
})

const response = await client.chat.completions.create({
  model: 'gpt-5.5',
  messages: [{ role: 'user', content: 'Hello' }],
})
```

## Node Operator SDK (Coming Soon)

```javascript
import { ChaosNode } from '@chaoscompute/sdk'

const node = new ChaosNode({
  wallet: process.env.SOLANA_Wallet,
  teeEndpoint: 'https://your-tee-node:8080',
})

// Register node with TEE attestation
await node.register({ stakeAmount: 100_000_000_000 })

// Start earning from inference jobs
await node.start()
```

## Tiers

| Tier | SOL | Discount |
|---|---|---|
| Free | 0 | 0% (pay.sh only) |
| Standard | 100 | 5% |
| Pro | 500 | 10% |
| Enterprise | 1000+ | 20% |

See [docs/API.md](../docs/API.md) for full API reference.
