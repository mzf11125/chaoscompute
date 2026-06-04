# AGENTS.md — ChaosCompute

## Project Overview
ChaosCompute is a two-phase AI inference platform on Solana.
- **Gateway (Phase 1):** Inference router. CLIProxyAPI routing. pay.sh HTTP 402 payments. 30 providers across 3 tiers. OpenAI-compatible. Funding needed for live launch.
- **Core (Phase 2):** Decentralized compute market. Game-theoretic node selection. Stake-weighted VRF racing. Blind race. Optimistic slashing. Contract deployed to devnet.

Tagline: "pay.sh payments. CLIProxyAPI routing. Decentralized compute next."

**Deployed:** `5Zmjie6vNFFJBkwA49CA38wJhjZpN5UDvna6tohBapyg` on Solana devnet.

## Community
- Discord: https://discord.gg/xXCKpmt7d — weekly roadmap meetings
- Sole maintainer: mzf11125
- MIT licensed. Contributions welcome.

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
| Smart Contract | Anchor (Rust) — `5Zmjie6vNFFJBkwA49CA38wJhjZpN5UDvna6tohBapyg` on devnet |
| Monorepo | pnpm workspaces |
| CI/CD | GitHub Actions |

## Design System: Clean Monochrome
- **Colors:** HSL tokens — background `hsl(0 0% 0%)`, foreground `hsl(0 0% 100%)`, card `hsl(0 0% 5%)`, border `hsl(0 0% 20%)`
- **Cards:** `rounded-2xl`, `bg-card`, `border border-border`
- **Buttons:** `rounded-full`, primary = `bg-foreground text-background`
- **Fonts:** Inter (body/UI), Instrument Serif italic for display accents
- **Effects:** liquid-glass utility (gradient border via CSS mask)
- **No shadcn/ui** — custom components only (Button, Card, Badge, Input, Modal)

## Monorepo Structure
```
packages/gateway/          Vite + React app
packages/sdk/python/        Python SDK (chaos-sdk)
packages/sdk/node/          Node.js SDK (@chaoscompute/sdk)
programs/chaos_compute/     Anchor program (Rust) — deployed to devnet
docs/                       All documentation
chaoscompute.yaml           pay.sh provider spec
GOVERNANCE.md               Project governance
```

## Commands
```bash
pnpm install                                    # Install all deps
pnpm --filter gateway dev                       # Run gateway dev server (port 20128)
pnpm --filter gateway build                     # Build for production
cd programs/chaos_compute && cargo build-sbf    # Build Anchor program
cd programs/chaos_compute && solana program deploy target/deploy/chaos_compute.so --url devnet
```

## Auth Model: HTTP 402 (pay.sh)
- No API keys — wallet IS the identity
- Gateway returns `402 Payment Required` with amount, recipient, nonce
- pay.sh signs a USDC transfer authorization locally from wallet
- pay.sh replays the request with `X-PAYMENT` proof header
- Gateway broadcasts signed transfer, confirms on Solana, returns response

## Pricing: Free Tier + 5% Margin
- First 1M tokens/month free
- After that, provider cost + 5% margin
- 30 providers across 3 tiers: Premium/Cheap/Free
- 100% of margin funds Phase 2 treasury

## Key Files
- `packages/gateway/src/lib/routing/` — extracted 9router logic (fallback, providers, types)
- `programs/chaos_compute/programs/chaos_compute/src/lib.rs` — Anchor program (deployed)
- `chaoscompute.yaml` — pay.sh provider spec (routing, pricing, endpoints)
- `packages/gateway/src/App.tsx` — route definitions
- `packages/gateway/src/index.css` — HSL tokens, liquid glass, base styles
- `GOVERNANCE.md` — Project governance and contribution rules

## Security
- Never log private keys or seed phrases
- Never commit .env files (see .env.example)
- pay.sh handles all payment signing
- Solana RPC calls validate account ownership and data length
- Devnet only for development; mainnet only when explicitly requested

## Git Workflow
- Feature branches from main
- Conventional commits: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `redesign:`
- No force push to main
