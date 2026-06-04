# ChaosCompute Node.js SDK

`npm install @chaoscompute/sdk`

ChaosCompute uses pay.sh for HTTP 402 USDC payments. Preferred integration:

```bash
curl -fsSL https://pay.sh/install | sh
pay curl https://gateway.chaoscompute.io/v1/chat/completions \
  -H 'content-type: application/json' \
  -d '{"model":"gpt-5.5","messages":[{"role":"user","content":"Hello"}]}'
```

For programmatic access:

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

See [docs/API.md](../docs/API.md) for full API reference.
