# CLAUDE.md

ChaosCompute monorepo. Read `AGENTS.md` for full project context.

## Quick Start
```bash
pnpm install && pnpm --filter gateway dev
```

## Deployments
- Phase 2 contract: `5Zmjie6vNFFJBkwA49CA38wJhjZpN5UDvna6tohBapyg` (Solana devnet)
- Discord: https://discord.gg/xXCKpmt7d

## Structure
- `packages/gateway/` — Vite + React app (Inter + Instrument Serif, HSL tokens)
- `packages/sdk/` — Python + Node.js SDKs
- `programs/` — Anchor (Rust) deployed on devnet
- `docs/` — PRDs, architecture, competitive, demo, pitch, governance
- `chaoscompute.yaml` — pay.sh provider spec

## Design
- Clean monochrome: HSL tokens, black/white, liquid glass effects
- Fonts: Inter (body) + Instrument Serif italic (accents)

## Key Files
- `packages/gateway/src/lib/routing/` — extracted 9router routing logic
- `chaoscompute.yaml` — pay.sh provider spec
- `programs/chaos_compute/programs/chaos_compute/src/lib.rs` — Anchor program
- `GOVERNANCE.md` — Project governance

## Auth
- pay.sh HTTP 402 protocol
- `pay curl https://gateway.chaoscompute.io/v1/chat/completions`

## Build
```bash
pnpm --filter gateway typecheck && pnpm --filter gateway build
cd programs/chaos_compute && cargo build-sbf
```
