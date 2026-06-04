# ChaosCompute — Product Requirements Document

**Version:** 4.0
**Tagline:** pay.sh payments. CLIProxyAPI routing. Decentralized compute next.

---

## 1. Executive Summary

ChaosCompute is a two-phase AI inference platform on Solana.

**Phase 1 — Inference Gateway (Live):** Drop-in OpenAI-compatible API. CLIProxyAPI routing across 20+ upstream providers. pay.sh HTTP 402 wallet-approved payments. No sign-up. No subscription. No API key.

**Phase 2 — Decentralized Compute (Roadmap):** Game-theoretic compute market. Anyone's GPU competes. Stake-weighted VRF racing. Blind race mechanic. Optimistic slashing. Feature parity with Bittensor's architecture, delivered with OpenAI-compatible simplicity and Solana speed.

```bash
curl -fsSL https://pay.sh/install | sh
pay curl https://gateway.chaoscompute.io/v1/chat/completions \
  -H 'content-type: application/json' \
  -d '{"model":"gpt-4o","messages":[{"role":"user","content":"Hello"}]}'
```

---

## 2. Problem Statement

### 2.1 For Developers & AI Agents

**OpenAI / Anthropic:** Single provider. Single point of failure. Rate limits. Pricing changes.

**OpenRouter:** $113M raised for a custodial credit system. You deposit money into their account. 5.5% top-up fee. No on-chain audit trail.

**9router:** Local proxy. No payment layer. Requires you to manage your own API keys for every provider.

**Jatevo:** Token-gated daily quota. Hold $JTVO to unlock capacity. Unused capacity wasted at reset.

### 2.2 For GPU Providers

The supply side of AI compute is closed. No open market for bare-metal GPU inference.

---

## 3. How ChaosCompute Fixes This

| Problem | Phase 1 Fix | Phase 2 Fix |
|---|---|---|
| Custodial risk | pay.sh HTTP 402 — wallet signs per request | Same + on-chain settlement |
| Single provider failure | CLIProxyAPI fallback across 20+ providers | Speculative parallel execution (3-5 node race) |
| Agent credential mgmt | pay.sh wraps any CLI tool, handles 402 automatically | Same |
| Closed supply side | n/a (Phase 2) | Stake token, run daemon, you're a provider |
| Opaque billing | Solana memo per settlement | Same + immutable on-chain audit |

---

## 4. Users

### 4.1 Human Developers
Builders of AI-powered apps. One URL. All providers. Wallet pays per token.

### 4.2 AI Agents
Self-paying agents. pay.sh wraps Claude Code, Codex, OpenClaw — handles 402 automatically.

### 4.3 GPU Providers (Phase 2)
Independent GPU operators. Stake token, run daemon, earn fees per race.

---

## 5. Developer Experience

```bash
# Install pay.sh
curl -fsSL https://pay.sh/install | sh

# Discover ChaosCompute
pay skills search chaoscompute

# Call any model
pay curl https://gateway.chaoscompute.io/v1/chat/completions \
  -H 'content-type: application/json' \
  -d '{"model":"gpt-4o","messages":[{"role":"user","content":"Hello"}]}'
```

### Model Aliases

| Alias | Routing |
|---|---|
| `best-available` | Cheapest under rate limit |
| `best-fast` | Lowest p50 latency |
| `best-smart` | Highest capability tier |
| `best-coder` | Code-optimized models |
| `best-long` | 128k+ context windows |

---

## 6. Phase 2: Decentralized Compute

### 6.1 The Speculative Racing Paradigm

**Traditional:** Request → proxy → single node → response
**ChaosCompute:** Request → contract selects 3-5 nodes → all race → VRF picks winner → response

### 6.2 Five-Step Flow

1. **REQUEST** — BountyAccount created on-chain with encrypted prompt hash
2. **COHORT SELECTION** — Slot-hash pseudo-random sqrt(stake)-weighted selection
3. **PARALLEL EXECUTION** — Nodes race, submit commitment within 3 slots (~1.5s)
4. **WINNER SELECTION** — VRF provides tamper-proof randomness, raffle
5. **DELIVERY + VERIFICATION** — Winner streams output, 10-block slashing window

### 6.3 Security Fixes

| Attack | Defense |
|---|---|
| Garbage output | Optimistic slashing — fraud proof within 10 blocks |
| Energy waste | Mini-cohort (3-5 nodes, not entire network) |
| MEV/validator collusion | VRF (Pyth Entropy or Switchboard) |
| Geolocation bias | 1.5s submission window — all timely entries equal |
| Prompt privacy | Ephemeral DH encryption + TEE execution |

---

## 7. Competitive Positioning

| Competitor | Our Answer |
|---|---|
| OpenRouter | Non-custodial HTTP 402. No credit deposit. |
| Jatevo | Pay per token, not daily quota. |
| 9router | Cloud-hosted. pay.sh handles payments. |
| Bittensor | OpenAI-compatible today. Same architecture Phase 2. |

---

## 8. Token Economics (Phase 2)

- **Staking collateral** — enter cohort selection
- **Slashing collateral** — fraud proof burns stake
- **Protocol fees** — ~1% per request to creator wallet

---

## 9. Security

Designed for [Bastion Agentique](https://bastionagentique.com) — planned integration:
- Transaction simulation before execution
- Policy engine (program whitelist, SOL caps, rate limits)
- On-chain audit trail on Solana
- Emergency pause circuit breaker

---

## 10. MVP Scope

### In Scope
- Vite + React Gateway with pay.sh HTTP 402 payments
- CLIProxyAPI routing across 20+ real providers
- Gateway Status page (ProviderHealth, SpendView, RequestLog)
- Landing page (Hero, HowItWorks, Security, Competitors)
- Docs, API, Providers pages
- Python + Node.js SDKs
- Anchor program skeleton (Phase 2 core)
- chaoscompute.yaml pay.sh provider spec

### Out of Scope
- Real TEE enforcement
- Full IPFS/Arweave encryption pipeline
- Multi-chain settlement
- Bastion integration code (both in development)

---

## 11. The Pitch

*"pay.sh's payments. CLIProxyAPI routing. Decentralized compute next. ChaosCompute."*

---

*ChaosCompute — The smart contract is the router.*
