# AGENTS.md — ChaosCompute

## Project Overview
ChaosCompute is a two-tier AI inference platform on Solana.
- **Gateway**: Managed inference router with per-request Solana USDC payments. Forked from 9router routing logic.
- **Core**: Decentralized compute market — anyone's GPU, on-chain settlement, stake-weighted racing.

Tagline: "9router's simplicity. Bittensor's architecture. Solana's speed."

## Tech Stack
| Layer | Tech |
|---|---|
| Frontend | React 19 + Vite + TypeScript |
| Styling | Tailwind CSS v4, Dark Cinematic design system |
| Animation | framer-motion |
| Icons | lucide-react |
| Routing | react-router-dom |
| Blockchain | @solana/kit (framework-kit), Anchor |
| Blockchain RPC | Solana devnet |
| Monorepo | pnpm workspaces |
| SDK | Python (pip) + Node.js (npm) |
| Smart Contract | Rust (Anchor) |
| Deployment | Docker + Vercel |

## Design System: Dark Cinematic
Derived from Kredz and lading-logic (same developer).
- **Background**: `#000000`
- **Cards**: `#101010`, `rounded-3xl`
- **Accent**: `#DEDBC8` (cream)
- **Text**: `#E1E0CC`
- **Font**: Manrope (primary), Geist Mono (code/KPIs)
- **Buttons**: `rounded-full` (pill), primary = cream fill + black text
- **Easing**: `cubic-bezier(0.16, 1, 0.3, 1)`
- **Animations**: WordsPullUp, BlurIn, framer-motion page transitions
- **Background effects**: Cinematic orbs (3 blurred gradients) + noise overlay
- **No shadcn/ui** — custom components only

## Monorepo Structure
```
packages/gateway/       Vite + React app (main product)
packages/sdk/python/     Python SDK (chaos-sdk)
packages/sdk/node/       Node.js SDK (@chaoscompute/sdk)
programs/chaos_compute/  Anchor program (Rust)
docs/                    All documentation
```

## Commands
```bash
pnpm install                                    # Install all deps
pnpm --filter gateway dev                       # Run gateway dev server
pnpm --filter gateway build                     # Build for production
cd programs/chaos_compute && anchor build       # Build Anchor program
cd programs/chaos_compute && anchor test        # Run Anchor tests
cd packages/sdk/python && pip install -e .      # Install Python SDK locally
```

## Environment Variables
See `.env.example` for all required vars.
Key vars: `VITE_SOLANA_RPC_URL`, `USDC_MINT`, `CHAOS_FEE_BPS`, `JWT_SECRET`

## Key Conventions
- All imports use `@/` path alias (maps to `src/`)
- Solana wallet auth uses ephemeral JWT (5 min expiry) signed by ed25519 keypair
- USDC micropayments are async/non-blocking — response streams before settlement
- Provider routing is OpenAI-compatible (`/v1/chat/completions`)
- Components are named exports from barrel files (`components/ui/index.ts`)
- Pages are default exports in their own directories

## Security
- Never log private keys or seed phrases
- Never commit .env files
- JWT secret must be cryptographically random in production
- Wallet auth verifies signature on every JWT
- Solana RPC calls validate account ownership and data length
- Devnet only for development; mainnet only when user explicitly requests

## Git Workflow
- Feature branches from main
- Conventional commits: `feat:`, `fix:`, `docs:`, `chore:`
- No force push to main
- PR required for merge to main
