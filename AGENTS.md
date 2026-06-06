# AGENTS.md — ChaosCompute

## Project Overview
ChaosCompute is a decentralized AI inference network on Solana.

- **Gateway (Phase 1):** Inference routing. CLIProxyAPI routing. pay.sh USDC payments. 30 providers across 3 tiers. OpenAI-compatible. Shipping.
- **Compute Network (Phase 2):** Decentralized compute market. TEE-protected nodes. VRF cohort selection. Blind race. Optimistic slashing. Stake-weighted raffle. Building.

Tagline: "Decentralized AI compute on Solana. Stake SOL. Run inference. Earn USDC."

**Deployed:** `5Zmjie6vNFFJBkwA49CA38wJhjZpN5UDvna6tohBapyg` on Solana devnet.

## Business Model

### Consumers (API Users)

| Tier | SOL Staked | Discount | Auth |
|---|---|---|---|
| Free | 0 | 0% | pay.sh HTTP 402 |
| Standard | 100 | 5% | Wallet connect. Ephemeral JWT. |
| Pro | 500 | 10% | Wallet connect. Priority routing. |
| Enterprise | 1000+ | 20% | Wallet connect. Dedicated capacity. |

### Node Operators

| Tier | Min Stake | Role |
|---|---|---|
| Standard | 100 SOL | Run TEE node. Participate in cohort selection. |
| Pro | 500 SOL | Higher selection probability via sqrt(stake). |
| Enterprise | 1000+ SOL | Dedicated capacity. Maximum yield. |

All payments in USDC. Protocol fee (1%) funds treasury. 100% of Phase 1 margin funds Phase 2. No new token. SOL-native incentives.

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
| Payments | USDC on Solana (pay.sh HTTP 402) |
| Backend Routing | CLIProxyAPI (Go) + 9router (Next.js fork) |
| Smart Contract | Anchor (Rust). `5Zmjie6vNFFJBkwA49CA38wJhjZpN5UDvna6tohBapyg` on devnet |
| Compute | TEE attestation, VRF cohort selection, blind race, optimistic slashing |
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
- `/` Landing page (compute-first messaging)
- `/console` Wallet connect, SOL staking tier, quickstart, API access
- `/nodes` Compute node explorer (replaces /providers)
- `/marketplace` Live inference job marketplace
- `/operators` Node operator dashboard
- `/docs` Documentation, quickstart, architecture
- `/api` API reference

## Auth Model: Wallet-Based
- Free: pay.sh HTTP 402. No wallet needed.
- Standard+: Wallet connect in Console. Ephemeral JWT from wallet signature.
- USDC per request via pay.sh. SOL staking for tier discounts.
- Node operators: Wallet = node identity + collateral.
- No traditional API keys. Wallet IS the identity.

## Key Files
- `packages/gateway/src/lib/routing/` — extracted 9router routing logic
- `packages/gateway/src/lib/providers/` — provider definitions
- `packages/gateway/src/components/console/` — Console components (StakingTier, WalletConnect, etc.)
- `packages/gateway/src/pages/Nodes/` — Compute node explorer
- `packages/gateway/src/pages/Marketplace/` — Job marketplace
- `packages/gateway/src/pages/Operators/` — Node operator dashboard
- `programs/chaos_compute/programs/chaos_compute/src/lib.rs` — Anchor program (deployed)
- `chaoscompute.yaml` — pay.sh provider spec
- `GOVERNANCE.md` — Project governance and staking model

## Security
- Never log private keys or seed phrases
- Never commit .env files
- pay.sh handles all payment signing
- TEE attestation verified on-chain before node can participate
- Devnet only for development. Mainnet only when explicitly requested.

## Git Workflow
- Feature branches from main
- Conventional commits: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `redesign:`
- No force push to main
