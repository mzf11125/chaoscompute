# CONTEXT.md — ChaosCompute

## Domain Language

| Term | Definition |
|---|---|
| **Gateway** | Managed inference router. Cloud-hosted. Solana-native per-request USDC payments. OpenAI-compatible API. 40+ providers. |
| **Core** | Decentralized compute market. Anyone's GPU. On-chain settlement. Stake-weighted racing. VRF winner selection. |
| **ChaosSigner** | SDK class. Generates ephemeral ed25519-signed JWT from Solana keypair. Used to authenticate Gateway requests. |
| **ChaosWallet** | A funded Solana wallet (USDC minimum). Functions as the API key. No subscription, no credit top-up, no account creation. |
| **Bounty** | On-chain Anchor account. Represents an inference request. Contains: challenger, encrypted prompt hash, cohort, fee, status. |
| **Cohort** | 3–5 pre-selected nodes. Chosen via `sqrt(stake)` weighted slot-hash selection. Only cohort members may submit for a bounty. |
| **Commitment** | `SHA256(output + node_key + bounty_id)` submitted by a node. Proves execution without revealing output. |
| **VRF Raffle** | Verifiable Random Function (Pyth Entropy or Switchboard). Picks winner from on-time commitments. Stake-weighted probability. |
| **Slashing** | Penalty for invalid output. User submits fraud proof within 10 blocks. Node must reveal execution trace. Failure = stake burned. |
| **Blink** | Solana Action embedded in an X post. Users type a prompt, approve a wallet transaction, and receive a streaming AI response — no app install. |
| **RTK** | Token compression filter. Reduces tool outputs (`git diff`, `grep`, `ls`) before sending to LLM. Saves 20–40% tokens. |

## Architecture Decisions

| # | Decision | Rationale | Date |
|---|---|---|---|
| 1 | Fork 9router routing logic, not CLIProxyAPI | 9router is Next.js and more aligned with JS stack. CLIProxyAPI is Go. Mismatch with existing projects. | Day 1 |
| 2 | Vite + React (not Next.js) | All existing projects (Kredz, lading-logic, collat-mezo) use Vite. Consistent dev experience. | Day 1 |
| 3 | Dark Cinematic design system | Same developer as Kredz/lading-logic. Shared visual language, faster execution. | Day 1 |
| 4 | Per-request USDC micropayment (not prepaid credits) | Non-custodial by design. Wallet signs, not deposits. Structural differentiator vs OpenRouter. | Day 2 |
| 5 | Async settlement (non-blocking) | Response streams to user immediately. Settlement happens in background. No added latency. | Day 2 |
| 6 | Gateway first, Core stretch | Gateway is production-ready today. Core is the novel differentiator but riskier. Solo dev, 9-day sprint. | Day 1 |
| 7 | VRF via Switchboard for hackathon | Faster integration than Pyth Entropy. Well-documented, hackathon-friendly. | Day 3 |
| 8 | Anchor program with square-root stake weighting | Prevents whale domination. Node with 100x stake gets ~10x probability, not 100x. | Day 6 |
| 9 | Monorepo with pnpm workspaces | Consistent tooling. Shared scripts. Parallel build potential. | Day 1 |

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| 9router routing logic extraction breaks provider integrations | Medium | High | Test with 3 core providers (OpenAI, Anthropic, Together) before full migration |
| Solana wallet auth UX is confusing | Medium | Medium | JWT approach means wallet signs once per session. Tutorial video planned. |
| VRF integration delayed | Low | High | Fallback to slot-hash for MVP. VRF post-hackathon. |
| Demo node latency >3s target | Medium | Medium | Pre-warm nodes. Use fastest available models. Accept <5s as demo-OK. |
| Solo dev bottleneck | High | High | Gateway is the safe demo. Core features scoped to minimum. |
