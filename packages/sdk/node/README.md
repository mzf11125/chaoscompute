# ChaosCompute Node.js SDK

`npm install @chaoscompute/sdk`

```javascript
import { ChaosSigner } from '@chaoscompute/sdk'
import OpenAI from 'openai'

const signer = new ChaosSigner(process.env.CHAOS_KEY)
const client = new OpenAI({
  baseURL: 'https://api.chaoscompute.io/v1',
  apiKey: await signer.token(),
})

const response = await client.chat.completions.create({
  model: 'gpt-4o',
  messages: [{ role: 'user', content: 'Hello' }],
})
```
