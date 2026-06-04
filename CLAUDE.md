# CLAUDE.md

ChaosCompute monorepo. Read `AGENTS.md` for full project context.

## Quick Start
```bash
pnpm install && pnpm --filter gateway dev
# → http://localhost:20128
```

## Structure
- `packages/gateway/` — Vite + React app (Inter + Instrument Serif, HSL tokens)
- `packages/sdk/` — Python + Node.js SDKs
- `programs/` — Anchor (Rust) on-chain program
- `docs/` — PRDs, architecture, competitive, demo, pitch
- `chaoscompute.yaml` — pay.sh provider spec

## Design
- Clean monochrome: HSL tokens, black/white, liquid glass effects
- Fonts: Inter (body) + Instrument Serif italic (accents)
- Liquid glass: gradient border via CSS `::before` mask + backdrop-blur

## Key Files
- `packages/gateway/src/lib/routing/` — extracted 9router routing logic
- `chaoscompute.yaml` — pay.sh provider spec (proxy routing, token pricing)
- `programs/chaos_compute/programs/chaos_compute/src/lib.rs` — Anchor program

## Auth
- pay.sh HTTP 402 protocol
- `pay curl https://gateway.chaoscompute.io/v1/chat/completions`
- No custom wallet code — pay.sh handles everything

## Running Tests
```bash
pnpm --filter gateway test
cd programs/chaos_compute && anchor test
```
