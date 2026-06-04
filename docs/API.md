# ChaosCompute — API Reference

## Base URL

```
https://gateway.chaoscompute.io/v1
```

## Authentication

All requests require a Solana wallet-signed JWT in the `Authorization` header.

```bash
Authorization: Bearer <CHAOS_JWT>
```

Generate the token using the SDK:

```python
from chaos_sdk import ChaosSigner
signer = ChaosSigner("YOUR_SOLANA_PRIVATE_KEY")
token = signer.token()  # Valid for 5 minutes
```

Or manually:
```bash
curl https://gateway.chaoscompute.io/v1/models \
  -H "Authorization: Bearer $(chaos-signer token)"
```

---

## Endpoints

### List Models

```
GET /v1/models
```

Returns all available models across all providers.

**Response:**
```json
{
  "object": "list",
  "data": [
    {"id": "gpt-4o", "object": "model", "owned_by": "openai"},
    {"id": "claude-opus-4", "object": "model", "owned_by": "anthropic"},
    {"id": "best-available", "object": "model", "owned_by": "chaoscompute"}
  ]
}
```

### Chat Completions

```
POST /v1/chat/completions
```

OpenAI-compatible chat completions. Supports streaming.

**Request:**
```json
{
  "model": "gpt-4o",
  "messages": [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "Hello"}
  ],
  "stream": true,
  "temperature": 0.7,
  "max_tokens": 1024
}
```

**Streaming Response (SSE):**
```
data: {"id":"chatcmpl-...","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"content":"Hello"},"finish_reason":null}]}

data: {"id":"chatcmpl-...","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"content":"!"},"finish_reason":null}]}

data: [DONE]
```

**Non-Streaming Response:**
```json
{
  "id": "chatcmpl-...",
  "object": "chat.completion",
  "model": "gpt-4o",
  "choices": [{
    "index": 0,
    "message": {"role": "assistant", "content": "Hello! How can I help?"},
    "finish_reason": "stop"
  }],
  "usage": {
    "prompt_tokens": 10,
    "completion_tokens": 7,
    "total_tokens": 17,
    "cost_usdc": 0.000123
  }
}
```

### Get Spend

```
GET /v1/spend
```

Returns spend summary for the authenticated wallet.

**Response:**
```json
{
  "wallet": "ABC123...",
  "balance_usdc": 4.50,
  "spend_24h_usdc": 0.23,
  "spend_7d_usdc": 1.45,
  "total_requests_24h": 142,
  "by_model": {
    "gpt-4o": {"tokens": 45000, "cost_usdc": 0.15},
    "claude-opus-4": {"tokens": 23000, "cost_usdc": 0.08}
  }
}
```

---

## Error Codes

| Code | Meaning |
|---|---|
| 200 | Success |
| 400 | Bad request (invalid JSON, missing fields) |
| 401 | Unauthorized (invalid/expired JWT) |
| 402 | Insufficient USDC balance |
| 429 | Rate limited (per-wallet) |
| 500 | Internal server error |
| 502 | All providers failed (fallback exhausted) |
| 503 | Gateway overloaded |

---

## Model Aliases

| Alias | Routing Logic |
|---|---|
| `best-available` | Cheapest provider currently under rate limit |
| `best-fast` | Lowest p50 latency across available providers |
| `best-smart` | Highest capability tier currently available |
| `best-coder` | Code-optimized models (DeepSeek, GPT-4o, Claude Sonnet) |
| `best-long` | Models with 128k+ context windows |

---

## SDKs

### Python

```bash
pip install chaos-sdk
```

```python
from openai import OpenAI
from chaos_sdk import ChaosSigner

client = OpenAI(
    base_url="https://gateway.chaoscompute.io/v1",
    api_key=ChaosSigner("YOUR_KEY").token()
)
```

### Node.js

```bash
npm install @chaoscompute/sdk
```

```javascript
import { ChaosSigner } from '@chaoscompute/sdk';
import OpenAI from 'openai';

const signer = new ChaosSigner(process.env.CHAOS_KEY);
const client = new OpenAI({
  baseURL: 'https://gateway.chaoscompute.io/v1',
  apiKey: await signer.token(),
});
```

### Raw HTTP

```bash
curl https://gateway.chaoscompute.io/v1/chat/completions \
  -H "Authorization: Bearer <JWT>" \
  -H "Content-Type: application/json" \
  -d '{"model":"gpt-4o","messages":[{"role":"user","content":"Hello"}]}'
```
