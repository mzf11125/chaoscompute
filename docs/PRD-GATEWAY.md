# ChaosCompute Gateway — Product Requirements Document

**Version:** 2.0
**Sub-product of:** ChaosCompute
**Tagline:** One endpoint. Every model. Your wallet pays via pay.sh.

---

## 1. Executive Summary

ChaosCompute Gateway is a managed, cloud-hosted inference router. It sits in front of every major AI provider — OpenAI, Anthropic, Google Gemini, xAI, Mistral, DeepSeek, Together, Groq, and OpenRouter — and exposes a single OpenAI-compatible endpoint. Your team points at one URL. pay.sh handles the HTTP 402 payments.

**What makes it different:** The bill goes to your Solana wallet, per token, at execution time. No subscriptions. No credit top-ups. No invoices. No shared API keys. One wallet, one endpoint, real-time on-chain spend visibility.

**How it fits:**

```
ChaosCompute
├── Gateway  ← Phase 1. Live. CLIProxyAPI routing + pay.sh 402.
└── Core     ← Phase 2. Decentralized compute market. Roadmap.
```

---

## 2. The Problem Gateway Solves

### Multi-Key Chaos
Teams manage 4+ API keys across codebases. Rate limits at 2am. Key rotations after leaks.

### Credit Custody
OpenRouter holds your money. Jatevo requires token holdings. Both are custodial risk.

### Per-Request Payment Gap
No existing solution pays at execution time from your own wallet. pay.sh HTTP 402 solves this.

---

## 3. Architecture

```
Your Code
    │
    ▼
POST /v1/chat/completions → 402 Payment Required
    │
pay.sh auto-signs USDC transfer, replays with X-PAYMENT
    │
CLIProxyAPI routes to best provider → response streams
    │
Gateway broadcasts signed transfer → on-chain settlement
```

### Core Guarantees
1. **Availability:** Auto-fallback across providers
2. **Non-custodial:** Wallet signs per request, nothing deposited
3. **One config:** One wallet replaces all provider keys

---

## 4. Developer Experience

```bash
curl -fsSL https://pay.sh/install | sh
pay curl https://gateway.chaoscompute.io/v1/chat/completions \
  -H 'content-type: application/json' \
  -d '{"model":"gpt-4o","messages":[{"role":"user","content":"Hello"}]}'
```

---

## 5. Supported Providers

### Direct (API Key Required)
| Provider | Models |
|---|---|
| OpenAI | gpt-4o, o1, gpt-4o-mini |
| Anthropic | claude-opus-4, claude-sonnet-4, claude-haiku-4 |
| Google Gemini | gemini-2.5-flash, gemini-2.5-pro |
| xAI | grok-4.3, grok-3-mini |
| Mistral | mistral-large, mistral-small |
| DeepSeek | deepseek-v3, deepseek-r1 |
| Together AI | llama-3-70b |
| Groq | llama-3-70b |

### OpenAI-Compatible (via OpenRouter)
| Provider | Models |
|---|---|
| GLM | glm-5.1, glm-5 |
| Kimi | kimi-k2.5 |
| MiniMax | minimax-m2.7 |

---

## 6. Security

Designed for [Bastion Agentique](https://bastionagentique.com). Planned integration:
- Transaction simulation
- Policy engine
- On-chain audit
- Emergency pause

---

## 7. How Gateway Feeds into Core

Every Gateway user is pre-qualified for Core. Same wallet. One URL swap. Zero migration cost.

---

*ChaosCompute Gateway — One endpoint. Every model. Your wallet pays.*
