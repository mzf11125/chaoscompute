# CLAUDE.md

ChaosCompute monorepo. Read `AGENTS.md` for full project context.

## Quick Start
```bash
pnpm install && pnpm --filter gateway dev
```

## Deployments
- Anchor program: `5Zmjie6vNFFJBkwA49CA38wJhjZpN5UDvna6tohBapyg` (Solana devnet)
- Discord: https://discord.gg/xXCKpmt7d

## Business Model
- Consumer tiers: Free/Standard/Pro/Enterprise. SOL for eligibility. USDC for payments.
- Node operator tiers: Standard/Pro/Enterprise. SOL staking = right to run TEE nodes.
- Protocol fee (1%) funds treasury. 100% of Phase 1 margin funds Phase 2.

## Structure
- `packages/gateway/` — Vite + React app (Inter + Instrument Serif, HSL tokens)
- `packages/sdk/` — Python + Node.js SDKs
- `programs/` — Anchor (Rust) deployed on devnet
- `docs/` — PRDs, architecture, competitive, governance

## Key Files
- `packages/gateway/src/lib/routing/` — 9router routing logic
- `packages/gateway/src/lib/providers/` — provider definitions
- `packages/gateway/src/components/console/` — Console (wallet + staking)
- `packages/gateway/src/pages/Nodes/` — Compute node explorer
- `packages/gateway/src/pages/Marketplace/` — Job marketplace
- `programs/chaos_compute/programs/chaos_compute/src/lib.rs` — Anchor program

## Build
```bash
pnpm --filter gateway typecheck && pnpm --filter gateway build
cd programs/chaos_compute && cargo build-sbf
```
