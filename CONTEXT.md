# CONTEXT.md — ChaosCompute

## Domain Language

| Term | Definition |
|---|---|
| **Gateway** | Phase 1 inference router. CLIProxyAPI routing + pay.sh HTTP 402 payments. OpenAI-compatible. 20+ upstream providers. Live. |
| **Core** | Phase 2 decentralized compute market. Game-theoretic node selection. Stake-weighted VRF racing. Blind race. Optimistic slashing. Roadmap. |
| **pay.sh** | HTTP 402 payment protocol. Wraps standard HTTP tools. Signs USDC transfer authorizations. Handles challenge/proof/settlement flow. |
| **CLIProxyAPI** | Go proxy server that wraps CLI tools (Gemini, Codex, Claude Code, Grok) as OpenAI-compatible APIs. 36k+ GitHub stars. Upstream routing engine. |
| **9router** | Next.js fork of CLIProxyAPI. 16k+ stars. 40+ providers, smart fallback, RTK token saver. Source of routing logic. |
| **HTTP 402** | Payment Required status code. Gateway returns 402 with amount, recipient, and nonce. pay.sh detects and handles automatically. |
| **Bastion Agentique** | Agent security middleware. Transaction simulation, policy engine, on-chain audit, emergency pause. Planned integration with ChaosCompute. |
| **Liquid Glass** | CSS utility for gradient-border translucent surfaces. `backdrop-filter: blur(4px)` + `::before` mask gradient. |
| **Bounty** | On-chain Anchor account. Represents a Phase 2 inference request. Contains: challenger, prompt hash, cohort, fee, status. |
| **Cohort** | 3–5 pre-selected nodes. Chosen via `sqrt(stake)` weighted slot-hash selection. Phase 2 mechanic. |
| **VRF Raffle** | Verifiable Random Function. Picks winner from on-time commitments. Stake-weighted probability. Phase 2 mechanic. |
| **Slashing** | Fraud proof penalty. User submits proof within 10 blocks. Node must reveal execution trace. Stake burned. Phase 2 mechanic. |

## Architecture Decisions

| # | Decision | Rationale | Date |
|---|---|---|---|
| 1 | pay.sh HTTP 402 as payment layer | Eliminates custom wallet auth code. Non-custodial. Wallet signs per request. Standards-based. | Day 2 |
| 2 | CLIProxyAPI as upstream routing | 36k-star battle-tested Go proxy. Wraps Gemini/Codex/Claude/Grok CLI tools as API endpoints. 20+ real providers. | Day 1 |
| 3 | Vite + React (not Next.js) | All existing projects use Vite. Consistent dev experience across monorepo. | Day 1 |
| 4 | Neuralyn-inspired design (not Dark Cinematic) | Cleaner, more modern. Inter + Instrument Serif fonts. HSL token system. Liquid glass effects. | Day 8 |
| 5 | Gateway (Phase 1) + Core (Phase 2) | Gateway is live today via CLIProxyAPI. Core is the game-theoretic differentiator. Solo dev, phased delivery. | Day 1 |
| 6 | Anchor program with sqrt stake weighting | Prevents whale domination. Node with 100x stake gets ~10x probability, not 100x. | Day 6 |
| 7 | Bastion Agentique planned integration | Agent security layer. Transaction simulation, policy engine, on-chain audit. Both projects in development. | Day 9 |
| 8 | Monorepo with pnpm workspaces | Consistent tooling. Shared scripts. Parallel build potential. | Day 1 |

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| pay.sh integration complexity | Medium | High | Provider spec in chaoscompute.yaml. Test with sandbox first. |
| Provider API key management | Medium | High | Gateway manages keys at infrastructure level. Users only need wallet. |
| Phase 2 solo dev bottleneck | High | High | Phase 1 as safe demo. Phase 2 scoped to minimum. Open-source contributions welcomed. |
| Bastion not deployed yet | High | Low | Honest about "planned integration" status in all messaging. |
