# CLAUDE.md

ChaosCompute monorepo. Read `AGENTS.md` for full project context.

## Quick Start
```bash
pnpm install && pnpm --filter gateway dev
```

## Deployments
- Phase 2 contract: `5Zmjie6vNFFJBkwA49CA38wJhjZpN5UDvna6tohBapyg` (Solana devnet)
- Discord: https://discord.gg/xXCKpmt7d

## Business Model
- Guest/Builder/Operator/Partner tiers. SOL for eligibility. USDC for payments.
- pay.sh HTTP 402 protocol. Provider cost + 5% margin.

## Structure
- `packages/gateway/` — Vite + React app (Inter + Instrument Serif, HSL tokens)
- `packages/sdk/` — Python + Node.js SDKs
- `programs/` — Anchor (Rust) deployed on devnet
- `docs/` — PRDs, architecture, competitive, governance

## Key Files
- `packages/gateway/src/lib/routing/` — 9router routing logic
- `packages/gateway/src/components/console/` — Console (wallet + staking)
- `chaoscompute.yaml` — pay.sh provider spec
- `programs/chaos_compute/programs/chaos_compute/src/lib.rs` — Anchor program

## Build
```bash
pnpm --filter gateway typecheck && pnpm --filter gateway build
cd programs/chaos_compute && cargo build-sbf
```
