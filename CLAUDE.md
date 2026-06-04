# CLAUDE.md

ChaosCompute monorepo. Read `AGENTS.md` for full project context.

## Quick Start
```bash
pnpm install && pnpm --filter gateway dev
```

## Structure
- `packages/gateway/` — Vite + React app (Dark Cinematic design)
- `packages/sdk/` — Python + Node.js SDKs
- `programs/` — Anchor (Rust) on-chain program
- `docs/` — PRDs, architecture, competitive, demo, pitch

## Design
- Dark Cinematic: black bg (`#000`), cream accent (`#DEDBC8`), Manrope font, pill buttons
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)`
- All cards: `rounded-3xl bg-[#101010] border border-accent/5`

## Key Files
- `packages/gateway/src/lib/solana/auth.ts` — JWT verification
- `packages/gateway/src/lib/solana/settlement.ts` — USDC micropayment
- `packages/gateway/src/lib/routing/` — extracted 9router logic
- `programs/chaos_compute/programs/chaos_compute/src/lib.rs` — Anchor program

## Running Tests
```bash
pnpm --filter gateway test
cd programs/chaos_compute && anchor test
```
