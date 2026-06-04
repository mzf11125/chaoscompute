# ChaosCompute

**pay.sh payments. CLIProxyAPI routing. Decentralized compute next.**

ChaosCompute is a two-phase AI inference platform on Solana. Phase 1 delivers drop-in inference routing across 20+ real providers via CLIProxyAPI with pay.sh HTTP 402 wallet payments. Phase 2 replaces routing entirely with a game-theoretic decentralized compute market.

## Products

| Product | Status | Description |
|---|---|---|
| **Gateway** | Live | Phase 1 — inference router. CLIProxyAPI routing + pay.sh HTTP 402 payments. 20+ upstream AI providers. OpenAI-compatible API. |
| **Core** | Roadmap | Phase 2 — decentralized compute market. Game-theoretic node selection. Stake-weighted VRF racing. Anyone's GPU joins. |

## Quick Start

```bash
curl -fsSL https://pay.sh/install | sh
pay skills search chaoscompute
pay curl https://gateway.chaoscompute.io/v1/chat/completions \
  -H 'content-type: application/json' \
  -d '{"model":"gpt-4o","messages":[{"role":"user","content":"Hello"}]}'
```

### Run Locally

```bash
git clone https://github.com/mzf11125/chaoscompute.git
cd chaoscompute
pnpm install
pnpm --filter gateway dev
# → http://localhost:20128
```

## Security

Designed for [Bastion Agentique](https://bastionagentique.com) — planned integration for transaction simulation, policy enforcement, on-chain audit, and emergency pause.

## Providers

20+ real providers from CLIProxyAPI and 9router: OpenAI, Anthropic, Google Gemini, xAI/Grok, Mistral, DeepSeek, Together AI, Groq, and OpenRouter (GLM, Kimi, MiniMax, etc.). See `/providers` for the full catalog.

## Docs

- [`docs/PRD.md`](docs/PRD.md) — Full Product Requirements Document
- [`docs/PRD-GATEWAY.md`](docs/PRD-GATEWAY.md) — Gateway sub-product PRD
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — Technical architecture + component map
- [`docs/COMPETITIVE.md`](docs/COMPETITIVE.md) — Competitive positioning vs OpenRouter, Jatevo, 9router
- [`docs/API.md`](docs/API.md) — API reference (OpenAI-compatible + HTTP 402)
- [`chaoscompute.yaml`](chaoscompute.yaml) — pay.sh provider spec

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 19 + Vite + TypeScript + Tailwind CSS v4 |
| Fonts | Inter (body) + Instrument Serif (display accents) |
| Animation | framer-motion |
| Icons | lucide-react |
| Payments | pay.sh HTTP 402 + USDC on Solana |
| Routing | CLIProxyAPI (Go proxy) + 9router (Next.js) |
| Smart Contract | Anchor (Rust) — `programs/chaos_compute` |
| Monorepo | pnpm workspaces |
| CI/CD | GitHub Actions + Docker |

## Monorepo

```
chaoscompute/
├── packages/gateway/       Vite + React app
├── packages/sdk/python/     Python SDK (chaos-sdk)
├── packages/sdk/node/       Node.js SDK (@chaoscompute/sdk)
├── programs/chaos_compute/  Anchor program (Rust)
├── docs/                    Documentation
└── chaoscompute.yaml        pay.sh provider spec
```

## License

MIT
