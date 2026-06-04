# AGENTS.md — ChaosCompute

## Project Overview
ChaosCompute is a two-phase AI inference platform on Solana.

- **Gateway (Phase 1):** Inference router. CLIProxyAPI routing. pay.sh USDC payments. 30 providers across 3 tiers. OpenAI-compatible. Funding needed for live launch.
- **Core (Phase 2):** Decentralized compute market. Game-theoretic node selection. Stake-weighted VRF racing. Blind race. Optimistic slashing. Contract deployed to devnet.

Tagline: "One API for every AI model. Stake SOL for lower costs. Pay with USDC."

**Deployed:** `5Zmjie6vNFFJBkwA49CA38wJhjZpN5UDvna6tohBapyg` on Solana devnet.

## Business Model

| Tier | SOL | Discount | Auth |
|---|---|---|---|
| Guest | 0 | 0% | pay.sh HTTP 402 |
| Builder | 100 | 5% | Wallet connect. Ephemeral JWT. |
| Operator | 500 | 10% | Wallet connect. Priority routing. |
| Partner | 1000+ | 20% | Wallet connect. Dedicated capacity. |

All payments in USDC via pay.sh. Provider cost + 5% margin funds Phase 2. SOL for tier eligibility only. No new token. Native staking contracts on Phase 2 roadmap.

## Community
- Discord: https://discord.gg/xXCKpmt7d. Weekly roadmap meetings.
- Sole maintainer: mzf11125
- MIT licensed. Contributions welcome.

## Tech Stack
| Layer | Tech |
|---|---|
| Frontend | React 19 + Vite + TypeScript |
| Styling | Tailwind CSS v4, HSL token system |
| Fonts | Inter (body) + Instrument Serif (display accents) |
| Animation | framer-motion |
| Icons | lucide-react |
| Routing | react-router-dom |
| Payments | pay.sh HTTP 402 + USDC on Solana |
| Backend Routing | CLIProxyAPI (Go) + 9router (Next.js fork) |
| Smart Contract | Anchor (Rust). `5Zmjie6vNFFJBkwA49CA38wJhjZpN5UDvna6tohBapyg` on devnet |
| Monorepo | pnpm workspaces |
| CI/CD | GitHub Actions |

## Design System: Clean Monochrome
- **Colors:** HSL tokens. background `hsl(0 0% 0%)`, foreground `hsl(0 0% 100%)`, card `hsl(0 0% 5%)`, border `hsl(0 0% 20%)`
- **Cards:** `rounded-2xl`, `bg-card`, `border border-border`
- **Buttons:** `rounded-full`, primary = `bg-foreground text-background`
- **Fonts:** Inter (body/UI), Instrument Serif italic for display accents
- **Effects:** liquid-glass utility (gradient border via CSS mask)
- **No shadcn/ui.** Custom components only.

## Monorepo Structure
```
packages/gateway/          Vite + React app
packages/sdk/python/        Python SDK (chaos-sdk)
packages/sdk/node/          Node.js SDK (@chaoscompute/sdk)
programs/chaos_compute/     Anchor program (Rust). Deployed to devnet.
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

## Routes
- `/` Landing page
- `/console` Wallet connect, SOL staking tier, quickstart, API access
- `/providers` 30 providers across 3 tiers
- `/docs` Documentation, quickstart, Phase 2 architecture
- `/api` API reference

## Auth Model: Wallet-Based
- Guest: pay.sh HTTP 402. No wallet needed.
- Builder+: Wallet connect in Console. Ephemeral JWT from wallet signature.
- USDC per request via pay.sh. SOL staking for tier discounts.
- No traditional API keys. Wallet IS the identity.

## Key Files
- `packages/gateway/src/lib/routing/` — extracted 9router logic
- `packages/gateway/src/components/console/` — Console components (StakingTier, WalletConnect, etc.)
- `programs/chaos_compute/programs/chaos_compute/src/lib.rs` — Anchor program (deployed)
- `chaoscompute.yaml` — pay.sh provider spec
- `GOVERNANCE.md` — Project governance and SOL staking model

## Security
- Never log private keys or seed phrases
- Never commit .env files
- pay.sh handles all payment signing
- Devnet only for development. Mainnet only when explicitly requested.

## Git Workflow
- Feature branches from main
- Conventional commits: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `redesign:`
- No force push to main
