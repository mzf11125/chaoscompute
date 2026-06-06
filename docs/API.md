# API Reference — ChaosCompute

## Base URL

```
https://gateway.chaoscompute.io/v1
```

## Authentication

### Free Tier (pay.sh)
No wallet needed. Use `pay curl` to handle HTTP 402 automatically.

```bash
pay curl https://gateway.chaoscompute.io/v1/chat/completions \
  -H 'content-type: application/json' \
  -d '{"model":"gpt-5.5","messages":[{"role":"user","content":"Hello"}]}'
```

### Standard+ Tier (Wallet)
Connect wallet in Console. Ephemeral JWT issued from wallet signature.

```bash
curl https://gateway.chaoscompute.io/v1/chat/completions \
  -H 'content-type: application/json' \
  -H 'Authorization: Bearer <jwt>' \
  -d '{"model":"gpt-5.5","messages":[{"role":"user","content":"Hello"}]}'
```

## HTTP 402 Payment Flow

1. POST `/v1/chat/completions` → 402 with amount + recipient + nonce
2. pay.sh signs USDC transfer authorization locally
3. pay.sh replays request with `X-PAYMENT` proof header
4. Gateway settles payment, returns response

## Endpoints

### POST /v1/chat/completions

OpenAI-compatible chat completions.

**Request:**
```json
{
  "model": "gpt-5.5",
  "messages": [
    {"role": "user", "content": "Hello"}
  ],
  "stream": false
}
```

**Response:**
```json
{
  "id": "chatcmpl-...",
  "object": "chat.completion",
  "model": "gpt-5.5",
  "choices": [
    {
      "index": 0,
      "message": {"role": "assistant", "content": "Hello!"},
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 10,
    "completion_tokens": 5,
    "total_tokens": 15
  }
}
```

### GET /v1/models

List available AI models. Free.

**Response:**
```json
{
  "data": [
    {
      "id": "gpt-5.5",
      "object": "model",
      "owned_by": "openai",
      "tier": "premium"
    },
    {
      "id": "deepseek-v4-flash",
      "object": "model",
      "owned_by": "deepseek",
      "tier": "cheap"
    }
  ]
}
```

### GET /v1/spend

Wallet spend summary. Free.

**Response:**
```json
{
  "wallet": "0x...",
  "tier": "Standard",
  "total_spent_usdc": 12.50,
  "request_count": 150,
  "discount_applied": "5%"
}
```

### GET /v1/health

Gateway health check. Free.

**Response:**
```json
{
  "status": "ok",
  "phase_1": "operational",
  "phase_2": "building",
  "providers_online": 30,
  "uptime": "99.9%"
}
```

## Model Aliases

| Alias | Resolution |
|---|---|
| `best-available` | Cheapest provider currently under rate limit |
| `best-fast` | Lowest p50 latency across all tiers |
| `best-smart` | Highest capability tier available |
| `best-coder` | Code-optimized (gpt-5.5, claude-sonnet-4.6, deepseek-v4-flash) |
| `best-long` | Models with 128k+ context windows |

## Error Codes

| Code | Meaning |
|---|---|
| 402 | Payment required. Use pay.sh or provide X-PAYMENT header. |
| 401 | Invalid or expired JWT. Re-authenticate via wallet. |
| 429 | Rate limited. Upgrade tier for higher limits. |
| 500 | Internal error. Retry with exponential backoff. |

## Pricing

Per 1M input tokens. Provider cost + 5% margin.

| Tier | Model | Cost | With Margin |
|---|---|---|---|
| Premium | gpt-5.5 | $5.00 | $5.25 |
| Cheap | deepseek-v4-flash | $0.14 | $0.147 |
| Cheap | xiaomi-mimo-v2.5 | $0.14 | $0.147 |
| Free | groq-llama-4-scout | $0 | $0 |

SOL staking discounts apply on top: Standard (5%), Pro (10%), Enterprise (20%).
