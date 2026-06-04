# ChaosCompute — API Reference

## Base URL

```
https://gateway.chaoscompute.io/v1
```

## Authentication

ChaosCompute uses pay.sh HTTP 402 payment protocol. No API keys needed.

**With pay.sh (recommended):**
```bash
pay curl https://gateway.chaoscompute.io/v1/chat/completions \
  -H 'content-type: application/json' \
  -d '{"model":"gpt-4o","messages":[{"role":"user","content":"Hello"}]}'
```

**Without pay.sh (raw):**
```bash
curl https://gateway.chaoscompute.io/v1/chat/completions \
  -H 'Authorization: Bearer <SIGNED_JWT>' \
  -H 'Content-Type: application/json' \
  -d '{"model":"gpt-4o","messages":[{"role":"user","content":"Hello"}]}'
```

When called directly, the Gateway returns `402 Payment Required`. pay.sh detects this and handles the payment handshake automatically.

## Endpoints

### List Models

```
GET /v1/models
```

Returns all available models across 20+ supported providers (OpenAI, Anthropic, Gemini, etc.).

**Response:**
```json
{
  "object": "list",
  "data": [
    {"id": "gpt-4o", "object": "model", "owned_by": "openai"},
    {"id": "claude-sonnet-4", "object": "model", "owned_by": "anthropic"},
    {"id": "gemini-2.5-flash", "object": "model", "owned_by": "google"}
  ]
}
```

### Chat Completions

```
POST /v1/chat/completions
```

OpenAI-compatible chat completions. Metered per token via HTTP 402.

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
data: [DONE]
```

### Get Spend

```
GET /v1/spend
```

Returns spend summary for the authenticated wallet.

### List Providers

```
GET /v1/providers
```

Returns all supported AI providers and their models.

### Health Check

```
GET /v1/health
```

Returns gateway health status.

## Model Aliases

| Alias | Routing Logic |
|---|---|
| `best-available` | Cheapest provider currently under rate limit |
| `best-fast` | Lowest p50 latency across available providers |
| `best-smart` | Highest capability tier currently available |
| `best-coder` | Code-optimized models (gpt-4o, claude-sonnet-4, deepseek-v3) |
| `best-long` | Models with 128k+ context windows |

## Error Codes

| Code | Meaning |
|---|---|
| 200 | Success |
| 400 | Bad request |
| 401 | Unauthorized (invalid/expired JWT when using raw auth) |
| 402 | Payment Required (handled automatically by pay.sh) |
| 429 | Rate limited |
| 500 | Internal error |
| 502 | All providers failed (fallback exhausted) |

## pricing

Per pay.sh provider spec (`chaoscompute.yaml`):

| Direction | Unit | Scale | Price |
|---|---|---|---|
| Input | tokens | 1,000,000 | $0.50 |
| Output | tokens | 1,000,000 | $1.50 |

Session channels available for streaming, 300-second TTL.
