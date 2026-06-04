# ChaosCompute — Competitive Positioning

## Honest Assessment

ChaosCompute is not the biggest (OpenRouter, 300+ models), not the fastest (Cerebras, custom silicon), and not the most established (Jatevo, already in the Solana ecosystem). Our pitch is structural, not scale-based.

**The structural advantage:** Phase 1 inference gateway funds Phase 2 decentralized compute. No competitor has this built in upgrade path. OpenRouter structurally cannot decentralize (VC backed, custodial model). Jatevo is centralized by design. Bittensor is decentralized but not developer friendly.

## One Sentence Per Competitor

| Competitor | Honest Take | Why Us |
|---|---|---|
| OpenRouter | 300+ models, $113M raised, 25T tokens/week. If you just need the cheapest call today, use OpenRouter. | Non-custodial HTTP 402. No credit deposit. And OpenRouter can never decentralize — Phase 2 gives us that structural advantage. |
| Jatevo | Also Solana native. Daily quota from JTVO token. Familiar UX. | Pay per token not per day. Unused capacity isnt wasted. Phase 2 replaces centralized scheduling entirely. |
| 9router | We literally forked 9router. Same routing engine. Same RTK token saver. | Cloud hosted. pay.sh payments. Built in Phase 2 upgrade. No local proxy to maintain. |
| Bittensor | They proved decentralized compute works. Real subnets. Billions in market cap. | OpenAI compatible API today. Same architecture as Phase 2. Usable in 5 minutes. |
| LiteLLM | Free (BYO keys). 100+ providers. Full control. | We manage the provider relationships. One wallet, one endpoint, zero key rotation. |

## The Real Pitch

Use ChaosCompute if you believe centralized inference gateways have an expiration date. Your fees literally build the replacement. If you just want the cheapest GPT-4o call today, use OpenRouter — genuinely. We are not competing on price or breadth today. We are competing on the structural value of a decentralized future.

## Category Map

```
CUSTODIAL AGGREGATORS — OpenRouter, Jatevo
  You top up credits or hold their token to get capacity.
  They hold your money. They decide routing. You trust their uptime.

BYOK PROXIES — LiteLLM, Portkey, Helicone, 9router
  You bring your own API keys. They add routing and observability.
  No payment layer. Free or near free.

NON-CUSTODIAL GATEWAY + DECENTRALIZED FUTURE — ChaosCompute
  Wallet signs per request. Nothing deposited anywhere.
  Cloud hosted. Provider relationships managed for you.
  Phase 1 revenue funds Phase 2 decentralized compute.
```

## Full Competitive Matrix

| Feature | Gateway | OpenRouter | Jatevo | LiteLLM | 9router |
|---|---|---|---|---|---|
| Custody model | Non-custodial wallet | Custodial credits | Token gated quota | BYO keys | BYO keys |
| Billing | Per-request USDC | Prepaid credit top up | Daily quota from token | Free (BYO) | Free (BYO) |
| Provider mgmt | Managed by Gateway | Managed | Managed | You manage | You manage |
| On-chain receipt | Solana memo per tx | None | None | None | None |
| Deployment | Cloud hosted | Cloud hosted | Cloud hosted | Self hosted | Local/npm |
| Upgrade to decentralized | Phase 2 (structural) | None | None | None | None |
| Free tier | 1M tokens/month | None | 0 (need token) | Free (BYO) | Free (BYO) |
| Security | Bastion Agentique (planned) | None | None | None | None |

## Honest Weak Points

**"OpenRouter has 300+ models. You have 20+ providers."**
Correct. The 20+ providers we support cover the overwhelming majority of production inference. Exotic and research models are not our focus today. If you need a specific fine tuned model that only OpenRouter carries, use OpenRouter.

**"Why pay Gateway's margin when LiteLLM is free?"**
If you have a DevOps team and want full control, use LiteLLM. Our margin pays for managed provider relationships, no API key rotation, cloud hosted reliability, Solana native billing, and the Phase 2 treasury.

**"Jatevo is also Solana native. What is your edge?"**
Jatevo uses token gated daily quotas. We use per token payment via pay.sh HTTP 402. You pay for what you use, nothing wasted. And Jatevo is v0.1 with 5 models currently in their playground.

**"OpenRouter raised $113M. How do you compete?"**
The raise proves the market exists. We are not competing for OpenRouter's existing users today. We are building for the customers who will outgrow custodial models as crypto native AI workflows become standard over the next 2 to 5 years.
