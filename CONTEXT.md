# CONTEXT.md — ChaosCompute

## Domain Language

| Term | Definition |
|---|---|
| **Gateway** | Phase 1 inference router. CLIProxyAPI routing. pay.sh USDC payments. 30 providers. |
| **Core** | Phase 2 decentralized compute market. Game theory. VRF racing. Blind race. Optimistic slashing. |
| **Console** | Wallet connect page. Shows SOL staking tier, quickstart, API access. |
| **Guest** | 0 SOL tier. pay.sh only. No wallet needed. Full price. |
| **Builder** | 100 SOL tier. 5% discount. Wallet connect. |
| **Operator** | 500 SOL tier. 10% discount. Priority routing. |
| **Partner** | 1000+ SOL tier. 20% discount. Dedicated capacity. |
| **pay.sh** | HTTP 402 payment protocol. USDC settlement on Solana. |
| **CLIProxyAPI** | Go proxy server. 36k stars. Upstream routing engine. |
| **SOL Staking** | Balance-based tier detection today. Native delegation contracts Phase 2. |
| **Bounty** | On-chain account. Phase 2 inference request. |
| **Cohort** | 3-5 pre-selected nodes. sqrt(stake) weighted selection. |
| **Slashing** | Fraud proof penalty. Stake burned on invalid output. |

## Deployments

| Item | Address | Network |
|---|---|---|
| Phase 2 Contract | `5Zmjie6vNFFJBkwA49CA38wJhjZpN5UDvna6tohBapyg` | Solana devnet |
| Deploy wallet | `E9PsSz9XWgNR3TmSC57NHC2ZxJzF5NmbrWsDKEe7A7yM` | Solana devnet |

## Architecture Decisions

| # | Decision | Rationale | Date |
|---|---|---|---|
| 1 | USDC via pay.sh as payment layer | Non-custodial. Wallet signs per request. Standards-based. | Day 2 |
| 2 | CLIProxyAPI as upstream routing | 36k-star Go proxy. 30 real providers. | Day 1 |
| 3 | SOL staking for tier discounts (no new token) | SOL-native incentives. No regulatory risk. Community alignment. | Day 12 |
| 4 | Console replacing mock Dashboard | Only real data. Wallet connect + SOL balance query. Honest about what is mock vs real. | Day 13 |
| 5 | Guest/Builder/Operator/Partner tiers | Clear progression. Infrastructure-native naming. | Day 13 |
| 6 | Wallet balance check for tier (no delegation yet) | Honest implementation. Native staking contracts Phase 2. | Day 13 |
| 7 | 30 providers across 3 tiers | verified by models.dev + ai-sdk.dev. Real model names and pricing. | Day 10 |
| 8 | Deploy to devnet, target mainnet post-funding | Real contract live. Phase 1 needs funding for production. | Day 11 |

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Provider API key funding | High | High | Crowdfunding. Console shows funding needed. |
| Phase 2 solo dev bottleneck | High | High | Open-source. Community contributions. Discord. |
| SOL staking perceived as fake until contracts deploy | Medium | Medium | Honest about balance check vs staking. Phase 2 roadmap clear. |
| pay.sh integration complexity | Medium | Medium | Provider spec in chaoscompute.yaml. Sandbox testing. |
