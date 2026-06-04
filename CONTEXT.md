# CONTEXT.md — ChaosCompute

## Domain Language

| Term | Definition |
|---|---|
| **Gateway** | Phase 1 inference router. CLIProxyAPI routing + pay.sh HTTP 402 payments. OpenAI-compatible. 30 providers. Funding needed. |
| **Core** | Phase 2 decentralized compute market. Game-theoretic node selection. Stake-weighted VRF racing. Blind race. Optimistic slashing. Contract deployed to devnet. |
| **pay.sh** | HTTP 402 payment protocol. Wraps standard HTTP tools. Signs USDC transfer authorizations. Handles challenge/proof/settlement flow. |
| **CLIProxyAPI** | Go proxy server wrapping CLI tools as OpenAI-compatible APIs. 36k GitHub stars. Upstream routing engine. Provider models sourced from models.dev + ai-sdk.dev. |
| **9router** | Next.js fork of CLIProxyAPI. 16k stars. 60+ providers, smart fallback, RTK token saver. |
| **HTTP 402** | Payment Required status code. Gateway returns 402 when payment needed. pay.sh handles automatically. |
| **Liquid Glass** | CSS utility. Gradient-border translucent surfaces via `backdrop-filter: blur(4px)` and `::before` mask. |
| **Bounty** | On-chain Anchor account. Phase 2 inference request. Contains challenger, prompt hash, cohort, fee, status. |
| **Cohort** | 3-5 pre-selected nodes. Chosen via sqrt(stake) weighted slot-hash selection. Phase 2 mechanic. |
| **VRF Raffle** | Verifiable Random Function. Picks winner from on-time commitments. Stake-weighted probability. |
| **Slashing** | Fraud proof penalty. User submits proof within 10 blocks. Stake burned on failure. |

## Deployments

| Item | Address | Network |
|---|---|---|
| Phase 2 Contract | `5Zmjie6vNFFJBkwA49CA38wJhjZpN5UDvna6tohBapyg` | Solana devnet |
| Deploy wallet | `E9PsSz9XWgNR3TmSC57NHC2ZxJzF5NmbrWsDKEe7A7yM` | Solana devnet |

## Architecture Decisions

| # | Decision | Rationale | Date |
|---|---|---|---|
| 1 | pay.sh HTTP 402 as payment layer | Non-custodial. Wallet signs per request. Standards-based. | Day 2 |
| 2 | CLIProxyAPI as upstream routing | 36k-star battle-tested Go proxy. 30 real providers. | Day 1 |
| 3 | Vite + React (not Next.js) | All existing projects use Vite. Consistent dev experience. | Day 1 |
| 4 | Clean Monochrome design (not Dark Cinematic) | Inter + Instrument Serif. HSL tokens. Liquid glass. More modern. | Day 8 |
| 5 | Gateway (Phase 1) + Core (Phase 2) | Phase 1 funds Phase 2. Solo dev, phased delivery. | Day 1 |
| 6 | Anchor program with sqrt stake weighting | Prevents whale domination. 100x stake = 10x probability. | Day 6 |
| 7 | 30 providers across 3 tiers (verified by models.dev + ai-sdk.dev) | Premium/Cheap/Free. Real model names and pricing sourced from authoritative databases. | Day 10 |
| 8 | Deploy to devnet, target mainnet post-funding | Real contract live now. Phase 1 needs funding for production. | Day 11 |

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Provider API key funding | High | High | Crowdfunding. Phase 1 launch checklist on /status page. |
| Phase 2 solo dev bottleneck | High | High | Open-source. Community contributions welcome. Discord for coordination. |
| pay.sh integration complexity | Medium | Medium | Provider spec in chaoscompute.yaml. Sandbox testing first. |
| Provider IP restrictions | Medium | Medium | Gateway manages keys at infrastructure level. CLIProxyAPI routing. |
