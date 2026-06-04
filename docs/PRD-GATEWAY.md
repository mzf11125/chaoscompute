# ChaosCompute Gateway — Product Requirements Document

**Version:** 1.0
**Sub-product of:** ChaosCompute
**Tagline:** One endpoint. Every model. Your Solana wallet pays the bill.

---

## 1. Executive Summary

**What it is:** ChaosCompute Gateway is a managed, cloud-hosted inference router. It sits in front of every major AI provider — OpenAI, Anthropic, Together, Groq, Mistral, Fireworks — and exposes a single OpenAI-compatible endpoint. Your team points at one URL. Gateway handles the rest.

**What makes it different:** The bill goes to your Solana wallet, per request, at execution time. No subscriptions. No credit top-ups. No invoices. No shared API keys rotating across your codebase. One wallet, one endpoint, real-time spend visibility.

**How it fits inside ChaosCompute:**

```
ChaosCompute
├── Gateway       ← You are here. Production-ready today. Cloud-hosted.
│                   Centralized routing, Solana-native billing.
│
└── Core          ← The decentralized market. Anyone's GPU, on-chain settlement.
                    Cheaper long-term. More complex. Bootstrapping post-hackathon.
```

Gateway is the on-ramp. Most teams never need to leave it. The ones who want bare-metal prices and full decentralization graduate to Core. The wallet they fund for Gateway works on Core with zero migration.

---

## 2. The Problem Gateway Solves

### 2.1 The Multi-Key Chaos Problem

A real team building an AI product in 2026 is managing something like:

```
OPENAI_API_KEY=sk-proj-...     # Used in 14 files
ANTHROPIC_API_KEY=sk-ant-...   # Used in 6 files
TOGETHER_API_KEY=...           # Used in 2 files
GROQ_API_KEY=...               # Used in 1 file (but needed for fallback)
```

When OpenAI rate-limits you at 2am, your product goes down. When Anthropic changes a model name, three things break. When someone accidentally commits an API key to GitHub, you rotate all four.

### 2.2 The Credit Custody Problem

OpenRouter solves the multi-key problem but introduces a new one: you deposit money into their account. That balance is sitting in OpenRouter's custody. If they have an outage, change their terms, or freeze your account, your credits are inaccessible.

### 2.3 The Per-Request Payment Gap

No existing solution lets you pay at execution time from your own wallet. The current options are:
- **Prepaid credits** (OpenRouter, Jatevo) — custodial, batch reconciliation
- **Monthly subscriptions** (OpenAI, Anthropic direct) — pay regardless of usage
- **Self-managed keys** (9router) — still requires upstream subscriptions

For AI agents specifically, none of these work cleanly. An agent that runs 100 requests on Monday and 0 on Friday shouldn't pay for Friday.

---

## 3. What Gateway Actually Is

### 3.1 The Architecture in Plain English

```
Your Code
    │
    ▼
POST https://gateway.chaoscompute.io/v1/chat/completions
    │
    │  (1) Verify Solana wallet signature — is this a funded, authorized caller?
    │  (2) Select the best available provider for this request
    │  (3) Forward request, stream response back
    │  (4) Deduct exact cost from wallet at settlement
    │
    ▼
[OpenAI / Anthropic / Together / Groq / Mistral / Fireworks]
```

### 3.2 The Three Core Guarantees

**1. Availability:** If your primary provider is down or rate-limiting you, Gateway automatically falls through to an equivalent model. You configure the fallback chain; Gateway executes it.

**2. Non-custodial billing:** Your wallet signs a micropayment intent per request. Settlement happens at resolution. If a request fails, you're not charged. You never deposit into Gateway's account.

**3. One config, whole team:** One `CHAOS_GATEWAY_WALLET_KEY` environment variable replaces all your provider keys. Works identically in local dev, CI, staging, and production.

---

## 4. Users

### 4.1 Primary — Engineering Teams at AI-First Startups
Teams of 2-15 engineers building AI applications. Spending $500-$5,000/month on inference. At least 3 provider relationships. Someone is the "AI infrastructure person."

### 4.2 Secondary — Solo Developers / Indie Hackers
Building solo projects, side products, or OSS tools. Want cheap, reliable inference with minimum account management.

### 4.3 Tertiary — AI Agents with Solana Wallets
Agents that need inference access without storing credentials. Latency-sensitive agent loops.

---

## 5. Developer Experience

### 5.1 Setup — Under 5 Minutes

```bash
pip install chaos-sdk
```

```python
from openai import OpenAI
from chaos_sdk import ChaosSigner

signer = ChaosSigner(private_key=os.environ["CHAOS_GATEWAY_WALLET_KEY"])
client = OpenAI(
    base_url="https://gateway.chaoscompute.io/v1",
    api_key=signer.token()
)

# Works — provider-native names pass through
response = client.chat.completions.create(
    model="gpt-4o",          # routes to OpenAI
    messages=[...]
)

# Also works — Gateway smart aliases
response = client.chat.completions.create(
    model="best-available",  # Gateway picks cheapest available model
    messages=[...]
)
```

### 5.2 The Model Alias System

| Alias | Routing Logic |
|---|---|
| `best-available` | Cheapest provider currently under rate limit |
| `best-fast` | Lowest p50 latency across available providers |
| `best-smart` | Highest capability tier currently available |
| `best-coder` | Code-optimized models |
| `best-long` | Models with 128k+ context windows |

### 5.3 The Fallback Chain (Configurable)

```yaml
# chaos-gateway.yaml
primary: gpt-4o
fallback:
  - claude-opus-4       # if OpenAI rate-limits or is down
  - mistral-large       # if both above are unavailable
  - llama-3-70b-groq    # final fallback (fastest, open-source)
timeout_ms: 8000
retry_on_ratelimit: true
```

---

## 6. Architecture

### 6.1 Component Map

```
┌─────────────────────────────────────────────────────────────┐
│                    Gateway Edge Layer                        │
│   (Vite + React SPA with Express/Node.js backend proxy)     │
│   • Request ingress + JWT signature verification            │
│   • Rate limit enforcement per wallet                       │
│   • Route to Router Core                                    │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                    Router Core                               │
│   (Node.js — centralized, stateful)                         │
│   • Provider health registry                                │
│   • Fallback chain executor                                 │
│   • Cost estimation per request                             │
│   • Provider API key pool (managed by Gateway infra)        │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                  Settlement Service                          │
│   (async, non-blocking to request path)                     │
│   • Actual token count confirmed post-response              │
│   • Solana USDC micropayment signed and submitted           │
│   • Spend record + balance warning                          │
└─────────────────────────────────────────────────────────────┘
```

### 6.2 Authentication Flow

```
1. Developer calls ChaosSigner(private_key).token()
   → SDK generates ephemeral JWT signed by the Solana keypair
   → JWT contains: wallet_pubkey, timestamp, nonce, expiry (5 min)

2. Gateway Edge receives request
   → Verifies JWT signature matches wallet pubkey
   → Checks wallet has sufficient USDC balance (cached, refreshed every 30s)
   → If valid, forwards to Router Core

3. After response streams:
   → Settlement Service counts actual tokens in response
   → Deducts exact USDC from wallet at settlement
   → Posts settlement as Solana memo transaction
```

---

## 7. The Dashboard

Gateway ships with a minimal spend dashboard at `gateway.chaoscompute.io/dashboard`. Authenticated via Solana wallet.

### Dashboard Views

- **Spend Overview:** Total spend this week/month, cost breakdown by model, cost breakdown by caller
- **Request Log:** Timestamp, model, prompt tokens, completion tokens, provider, cost, latency
- **Provider Health:** Real-time status, fallback events, uptime percentages
- **Low Balance Alerts:** Custom threshold, webhook notifications

---

## 8. Supported Providers at Launch

| Provider | Models | Notes |
|---|---|---|
| OpenAI | gpt-4o, gpt-4o-mini, o1, o1-mini | Rate limit pooling |
| Anthropic | claude-opus-4, claude-sonnet-4, claude-haiku-4 | Streaming supported |
| Together AI | Llama 3 70B/8B, Mixtral, DBRX | Cheapest open-source tier |
| Groq | Llama 3 70B, Mixtral | Fastest inference |
| Mistral | Mistral Large, Mistral Small | European hosting |
| Fireworks | Mixtral, Llama variants | Budget fallback |

---

## 9. How Gateway Feeds into Core

**Every Gateway user is a pre-qualified Core user.** They've already:
- Funded a Solana wallet
- Integrated the SDK
- Proven they have real inference demand

When Core's provider network matures, migration is one URL swap. Same SDK. Same wallet. Same signer.

---

## 10. MVP Scope (June 12 — Hackathon)

### In Scope
- Node.js/Express API gateway with OpenAI-compatible `/v1/chat/completions`
- Provider integrations: OpenAI + Anthropic + Together AI (3 providers for demo)
- Solana wallet JWT authentication (ChaosSigner)
- Basic fallback: if primary returns 429/5xx, retry with fallback provider
- Per-request USDC deduction via Solana micropayment
- Spend dashboard: total spend, request log, provider health lights
- Sign in with Solana (wallet auth)
- Low-balance banner

### Out of Scope for MVP
- Fallback chain config UI
- All providers beyond the initial 3
- Webhook alerts
- CSV export
- Rate limiting per wallet
- Multisig wallet support

---

## 11. Competitive Deep-Dive

### vs. OpenRouter
- **Custody:** Gateway never holds your funds. OpenRouter holds your credits.
- **Fee model:** Gateway charges margin on usage. OpenRouter charges 5-5.5% on credit purchase.
- **Auditability:** Gateway posts Solana memo per settlement. OpenRouter is proprietary.
- **Upgrade path:** Gateway → Core. OpenRouter has no decentralization path.

### vs. Jatevo
- **Token use:** Gateway uses USDC for payment. Jatevo uses $JTVO for quota.
- **Billing:** Gateway charges per request executed. Jatevo gives daily quota from token holding.
- **Unused capacity:** Gateway: irrelevant (per-request). Jatevo: daily quota resets, unused = wasted.

### vs. 9router
- Gateway is cloud-hosted. 9router is local.
- Gateway manages provider keys. 9router requires your own keys.
- Gateway has Solana payments. 9router has none.
- Gateway has team billing. 9router is per-machine.

---

*ChaosCompute Gateway — One endpoint. Every model. Your wallet pays.*
