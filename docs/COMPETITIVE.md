# ChaosCompute — Competitive Positioning

## One-Liner Per Competitor

| Competitor | One-Liner |
|---|---|
| OpenRouter | "OpenRouter just raised $113M to build a better custodial credit system. We're building the non-custodial alternative — your wallet signs per request, nothing is deposited anywhere." |
| 9router | "Same developer UX, but our backend is an open decentralized market with Solana-native billing." |
| Jatevo | "Jatevo unlocks daily capacity by having you hold their token. We charge your wallet per request you actually fire — you pay for usage, not capacity." |
| Bittensor | "Same decentralized architecture, usable in 5 minutes, OpenAI-compatible, settled on Solana in 400ms." |
| LiteLLM | "LiteLLM is a proxy you run yourself with your own keys. We manage the provider relationships — you bring one Solana wallet and nothing else." |
| Portkey/Helicone | "Those are observability tools — great dashboards, but you still manage provider keys. We replace the need for provider keys entirely." |
| Vercel/Cloudflare AI Gateway | "Great options if you're on their platform. We're for crypto-native teams and Solana builders who want on-chain billing records and a path to decentralized compute." |

## Full Competitive Matrix

| Feature | Gateway | OpenRouter | Jatevo | LiteLLM | 9router |
|---|---|---|---|---|---|
| Custody model | Non-custodial wallet | Custodial credits | Token-gated quota | BYO keys | BYO keys |
| Billing mechanism | Per-request USDC | Prepaid credit top-up | Daily quota from token | Free (BYO) | Free (BYO) |
| Provider mgmt | Managed by Gateway | Managed | Managed | You manage | You manage |
| On-chain receipt | Solana memo per tx | None | None | None | None |
| Deployment | Cloud-hosted | Cloud-hosted | Cloud-hosted | Self-hosted | Local/npm |
| Upgrade to decentralized | → Core (1 URL swap) | None | None | None | None |
| Solana-native payment | Yes | No | Token access only | No | No |
| RTK token savings | Yes (built-in) | No | No | No | Yes |

## Category Map

```
CATEGORY 1: CUSTODIAL AGGREGATORS
  OpenRouter, Jatevo, Eden AI
  → You top up credits or hold their token to get capacity
  → They hold your money; they decide routing; you trust their uptime

CATEGORY 2: BYOK PROXIES (Bring Your Own Keys)
  LiteLLM, Portkey, Helicone, 9router
  → You manage your own provider API keys
  → They add routing/observability; you still pay providers directly

CATEGORY 3: INFERENCE PROVIDERS (actual GPUs)
  Together AI, Groq, Fireworks, Cerebras
  → They run the models on their own hardware
  → Not gateways at all — they're upstream providers

CATEGORY 4: NON-CUSTODIAL PAYMENT GATEWAYS
  ChaosCompute Gateway  ← only player here
  → Your wallet signs per request; no credits deposited anywhere
  → Cloud-hosted so no self-hosting ops; provider relationships managed for you
```

## Honest Weak Points (Pre-answered)

**"OpenRouter has 300+ models. You have 6 providers."**
True at launch. The 6 providers cover GPT-4o, Claude, Llama 3, Mistral, DeepSeek, and Groq — the overwhelming majority of real production inference. This gap closes post-hackathon.

**"Why pay Gateway's margin when LiteLLM is free?"**
If you have a DevOps team and want full control, use LiteLLM. Gateway's margin pays for managed provider relationships, no API key rotation, cloud-hosted reliability, and Solana-native billing.

**"Jatevo is also Solana-native. What's your edge?"**
Jatevo's Solana integration is a quota key. Ours is a payment rail. USDC leaves your wallet at the moment a request is fulfilled.

**"OpenRouter raised $113M. How do you compete?"**
The $113M raise proves the market. We're building for the customers who will outgrow custodial models as crypto-native AI workflows become standard.
