# AGENTS.md — ChaosCompute

## Project Overview
ChaosCompute is a two-phase AI inference platform on Solana.
- **Gateway (Phase 1):** Inference router. CLIProxyAPI routing + pay.sh HTTP 402 payments. 20+ upstream AI providers. OpenAI-compatible. Live today.
- **Core (Phase 2):** Decentralized compute market. Game-theoretic node selection. Stake-weighted VRF racing. Blind race mechanic. Optimistic slashing. Anyone's GPU joins.

Tagline: "pay.sh payments. CLIProxyAPI routing. Decentralized compute next."

## Security
Designed for [Bastion Agentique](https://bastionagentique.com) — planned integration for agent security (transaction simulation, policy engine, on-chain audit, emergency pause). Both projects in development.

## Tech Stack
| Layer | Tech |
|---|---|
| Frontend | React 19 + Vite + TypeScript |
| Styling | Tailwind CSS v4, HSL token system |
| Fonts | Inter (body) + Instrument Serif (display accents) |
| Animation | framer-motion (parallax scroll, entrance animations) |
| Icons | lucide-react |
| Routing | react-router-dom |
| Payments | pay.sh HTTP 402 + USDC on Solana |
| Backend Routing | CLIProxyAPI (Go) + 9router (Next.js fork) |
| Smart Contract | Anchor (Rust) — `programs/chaos_compute` |
| Monorepo | pnpm workspaces |
| SDK | Python (pip) + Node.js (npm) |
| Deployment | Docker + GitHub Actions |

## Design System: Clean Monochrome
- **Colors:** HSL tokens — background `hsl(0 0% 0%)`, foreground `hsl(0 0% 100%)`, card `hsl(0 0% 5%)`, border `hsl(0 0% 20%)`
- **Cards:** `rounded-2xl`, `bg-card`, `border border-border`
- **Buttons:** `rounded-full`, primary = `bg-foreground text-background`
- **Fonts:** Inter (body/UI), Instrument Serif italic for display accents
- **Effects:** liquid-glass utility (gradient border via CSS mask)
- **No shadcn/ui** — custom components only (Button, Card, Badge, Input, Modal)

## Monorepo Structure
```
packages/gateway/          Vite + React app (main product)
packages/sdk/python/        Python SDK (chaos-sdk)
packages/sdk/node/          Node.js SDK (@chaoscompute/sdk)
programs/chaos_compute/     Anchor program (Rust)
docs/                       All documentation
chaoscompute.yaml           pay.sh provider spec
```

## Commands
```bash
pnpm install                                    # Install all deps
pnpm --filter gateway dev                       # Run gateway dev server (port 20128)
pnpm --filter gateway build                     # Build for production
cd programs/chaos_compute && anchor build       # Build Anchor program
cd programs/chaos_compute && anchor test        # Run Anchor tests
cd packages/sdk/python && pip install -e .      # Install Python SDK locally
```

## Auth Model: HTTP 402 (pay.sh)
- No API keys — wallet IS the identity
- Gateway returns `402 Payment Required` with amount, recipient, nonce
- pay.sh signs a USDC transfer authorization locally from wallet
- pay.sh replays the request with `X-PAYMENT` proof header
- Gateway broadcasts signed transfer, confirms on Solana, returns response
- Async settlement — response streams before payment confirms

## Key Conventions
- All imports use `@/` path alias (maps to `src/`)
- Provider routing is OpenAI-compatible (`/v1/chat/completions`)
- Components are named exports from barrel files (`components/ui/index.ts`)
- Pages are default exports in their own directories
- pay.sh handles all payment authorization — no custom wallet connect needed

## Key Files
- `packages/gateway/src/lib/routing/` — extracted 9router logic (fallback, providers, types)
- `programs/chaos_compute/programs/chaos_compute/src/lib.rs` — Anchor program
- `chaoscompute.yaml` — pay.sh provider spec (routing, pricing, endpoints)
- `packages/gateway/src/App.tsx` — route definitions (7 routes)
- `packages/gateway/src/index.css` — HSL tokens, liquid glass, base styles

## Security
- Never log private keys or seed phrases
- Never commit .env files (see .env.example)
- pay.sh handles all payment signing — no custom wallet code needed
- Solana RPC calls validate account ownership and data length
- Devnet only for development; mainnet only when explicitly requested

## Git Workflow
- Feature branches from main
- Conventional commits: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `redesign:`
- No force push to main
- PR required for merge to main
