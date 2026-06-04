# ChaosCompute — Competitive Positioning

## One-Liner Per Competitor

| Competitor | One-Liner |
|---|---|
| OpenRouter | "OpenRouter raised $113M to build a better custodial credit system. We're building the non-custodial HTTP 402 alternative — your wallet signs per request, nothing deposited anywhere." |
| 9router | "Same developer UX, but our backend is powered by CLIProxyAPI routing with pay.sh HTTP 402 payments. Cloud-hosted, not local." |
| Jatevo | "Jatevo uses token-gated daily quotas. We charge per token via pay.sh HTTP 402. Pay for what you use, nothing wasted." |
| Bittensor | "Same decentralized architecture vision (Phase 2), but we deliver OpenAI-compatible inference today (Phase 1)." |

## Category Map

```
CATEGORY 1: CUSTODIAL AGGREGATORS — OpenRouter, Jatevo, Eden AI
CATEGORY 2: BYOK PROXIES — LiteLLM, Portkey, Helicone, 9router
CATEGORY 3: INFERENCE PROVIDERS — Together AI, Groq, Fireworks, Cerebras
CATEGORY 4: NON-CUSTODIAL PAYMENT GATEWAYS — ChaosCompute Gateway ← only player
```

## Full Competitive Matrix

| Feature | Gateway | OpenRouter | Jatevo | LiteLLM | 9router |
|---|---|---|---|---|---|
| Custody model | Non-custodial wallet | Custodial credits | Token-gated quota | BYO keys | BYO keys |
| Billing | Per-request USDC | Prepaid credit top-up | Daily quota from token | Free (BYO) | Free (BYO) |
| Provider mgmt | Managed by Gateway | Managed | Managed | You manage | You manage |
| On-chain receipt | Solana memo per tx | None | None | None | None |
| Deployment | Cloud-hosted | Cloud-hosted | Cloud-hosted | Self-hosted | Local/npm |
| Upgrade to decentralized | → Phase 2 | None | None | None | None |
| Solana-native payment | Yes (HTTP 402) | No | Token access only | No | No |
| Security | Bastion Agentique (planned) | None | None | None | None |

## Honest Weak Points

**"OpenRouter has 300+ models. You have 20+ providers."**
True at launch. We cover the overwhelming majority of production inference. Exotic models are post-launch.

**"Why pay Gateway's margin when LiteLLM is free?"**
If you have a DevOps team, use LiteLLM. Gateway's margin pays for managed provider relationships, no API key rotation, cloud-hosted reliability, and Solana-native billing.

**"Jatevo is also Solana-native. What's your edge?"**
Jatevo's Solana integration is a quota key. Ours is a payment rail via pay.sh HTTP 402 — USDC leaves your wallet only when a request is fulfilled.

**"OpenRouter raised $113M. How do you compete?"**
The raise proves the market. We're building for crypto-native teams who want non-custodial billing + a path to decentralized compute. OpenRouter can't offer either.
