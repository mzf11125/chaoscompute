# ChaosCompute — Architecture

## System Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                        Clients                                   │
│  pay curl | pay claude | pay codex | OpenAI SDK (raw)           │
└──────────────────────────┼──────────────────────────────────────┘
                           │ POST /v1/chat/completions
                           │ HTTP 402 + X-PAYMENT
┌──────────────────────────▼──────────────────────────────────────┐
│                    ChaosCompute Gateway                           │
│                    (Vite + React SPA)                             │
│                                                                   │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────────┐ │
│  │ pay.sh Auth     │  │ Rate Limiter    │  │ Request Logger   │ │
│  │ (402 challenge)  │  │ (per wallet)    │  │                  │ │
│  └────────┬────────┘  └────────┬────────┘  └────────┬─────────┘ │
│           └────────────────────┴─────────────────────┘           │
└──────────────────────────┬──────────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────────┐
│                    CLIProxyAPI Router                             │
│                                                                   │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────────┐ │
│  │ Provider Registry│  │ Fallback Engine │  │ Format Translator│ │
│  │ (health checks)  │  │ (chain executor)│  │ (OpenAI↔Claude…) │ │
│  └────────┬────────┘  └────────┬────────┘  └────────┬─────────┘ │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │ Upstream Providers: OpenAI / Anthropic / Gemini / xAI /     │ │
│  │ Mistral / DeepSeek / Together / Groq / OpenRouter (GLM,     │ │
│  │ Kimi, MiniMax)                                              │ │
│  └──────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
```

## HTTP 402 Payment Flow

```
1. Client calls POST /v1/chat/completions
2. Gateway returns 402 Payment Required with:
   - X-Payment-Amount: USDC amount
   - X-Payment-Recipient: operator wallet
   - X-Payment-Nonce: server-issued nonce
3. pay.sh detects 402, signs USDC transfer authorization locally
4. pay.sh replays request with X-PAYMENT proof header
5. Gateway broadcasts signed transfer to Solana
6. Gateway confirms transaction, forwards to CLIProxyAPI router
7. CLIProxyAPI selects best provider, returns response
```

## Auth Flow

- pay.sh handles all payment authorization
- Wallet signs USDC transfer locally. Private key never exposed.
- Gateway broadcasts signed transfer on-chain
- Settlement is async and non-blocking. Response streams before confirmation.
- No API keys, no credit top-ups, no custodial risk

## Provider Health Registry

Health checks run every 15 seconds across all 20+ providers:

| Provider | Models | Latency |
|---|---|---|
| OpenAI | gpt-4o, o1, gpt-4o-mini | 320ms |
| Anthropic | claude-opus-4, claude-sonnet-4, claude-haiku-4 | 410ms |
| Google Gemini | gemini-2.5-flash, gemini-2.5-pro | 280ms |
| xAI | grok-4.3, grok-3-mini | 350ms |
| Mistral | mistral-large, mistral-small | 350ms |
| DeepSeek | deepseek-v3, deepseek-r1 | 600ms |
| Together AI | llama-3-70b | 220ms |
| Groq | llama-3-70b | 95ms |
| OpenRouter | GLM-5, Kimi K2.5, MiniMax | 450ms |

## Phase 2: Decentralized Compute

The endgame architecture replaces centralized routing with a game-theoretic compute market:

```
1. REQUEST → BountyAccount created on-chain with encrypted prompt hash
2. COHORT SELECTION → Slot-hash pseudo-random selection of 3-5 staked nodes
3. PARALLEL EXECUTION → Nodes race, submit commitment_hash within 3 slots
4. WINNER SELECTION → VRF oracle provides randomness, stake-weighted raffle
5. DELIVERY + VERIFICATION → Winner streams output, 10-block slashing window opens
```

## On-Chain Accounts (Anchor — Core Program)

```rust
GlobalConfig          // admin, total_staked, creator_fee_bps
ComputeNode           // owner, stake_amount, TEE attestation
InferenceBounty       // challenger, prompt_hash, cohort, status, winner
CommitmentSubmission  // bounty, node, commitment_hash, submitted_slot
```

## Directory Map

```
packages/gateway/src/
├── lib/routing/      ← Provider registry, fallback engine, types
├── lib/providers/    ← Provider setup (openai.ts)
├── components/ui/    ← Button, Card, Badge, Input, Modal
├── components/layout/← Navbar, Footer, DashboardShell, ErrorBoundary
├── components/dashboard/← SpendView, ProviderHealth, RequestLog
├── pages/Landing/    ← HeroSection, HowItWorks, SecuritySection, Competitors, CodeExample
├── pages/Dashboard/  ← Status, Docs, Api, Providers, NotFound
├── context/          ← WalletProvider (deprecated — pay.sh handles wallets)
└── hooks/            ← (reserved for future hooks)
```
