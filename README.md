# ChaosCompute

**pay.sh payments. CLIProxyAPI routing. Decentralized compute next.**

ChaosCompute is a two-phase AI inference platform on Solana. Phase 1 delivers drop-in inference routing across 30 real providers via CLIProxyAPI with pay.sh HTTP 402 wallet payments. Phase 2 replaces routing entirely with a game-theoretic decentralized compute market.

## Status

| Item | Status | Detail |
|---|---|---|
| Phase 2 Contract | Deployed | `5Zmjie6vNFFJBkwA49CA38wJhjZpN5UDvna6tohBapyg` on Solana devnet |
| Frontend | Live | [github.com/mzf11125/chaoscompute](https://github.com/mzf11125/chaoscompute) |
| Phase 1 Gateway | Funding needed | ~$100-300/month for provider keys + server. See `/status`. |

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
```

### Deploy Anchor Contract

```bash
cd programs/chaos_compute
cargo build-sbf
solana program deploy target/deploy/chaos_compute.so --url devnet
```

## Products

| Product | Status | Description |
|---|---|---|
| **Gateway** | Funding needed | Phase 1. Inference router. CLIProxyAPI routing. pay.sh HTTP 402. 30 providers across 3 tiers. |
| **Core** | Contract deployed | Phase 2. Decentralized compute market. Game-theoretic node selection. Stake-weighted VRF racing. |

## Providers

30 providers across 3 tiers, verified by [models.dev](https://models.dev) and [ai-sdk.dev](https://ai-sdk.dev): Premium (OpenAI gpt-5.5, Anthropic claude-opus-4.8, Google gemini-3.5-flash, xAI grok-4.3, Mistral), Cheap (DeepSeek v4-flash $0.14, Xiaomi MiMo v2.5 $0.14, Alibaba Qwen, Kimi k2.6, Nscale $0.01), Free (Groq, Cerebras, SambaNova, Nebius). See `/providers` for the full catalog.

## Community

- Discord: [discord.gg/xXCKpmt7d](https://discord.gg/xXCKpmt7d) — weekly roadmap meetings
- GitHub: [mzf11125/chaoscompute](https://github.com/mzf11125/chaoscompute) — MIT licensed, contributions welcome
- Sole maintainer: mzf11125

## Docs

- [`docs/PRD.md`](docs/PRD.md) — Full Product Requirements Document
- [`docs/PRD-GATEWAY.md`](docs/PRD-GATEWAY.md) — Gateway sub-product PRD
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — Technical architecture
- [`docs/COMPETITIVE.md`](docs/COMPETITIVE.md) — Competitive positioning
- [`docs/API.md`](docs/API.md) — API reference
- [`GOVERNANCE.md`](GOVERNANCE.md) — Project governance
- [`chaoscompute.yaml`](chaoscompute.yaml) — pay.sh provider spec

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 19 + Vite + TypeScript + Tailwind CSS v4 |
| Fonts | Inter (body) + Instrument Serif (display accents) |
| Payments | pay.sh HTTP 402 + USDC on Solana |
| Routing | CLIProxyAPI (Go) + 9router (Next.js fork) |
| Smart Contract | Anchor (Rust) — deployed to devnet |
| Monorepo | pnpm workspaces |
| CI/CD | GitHub Actions |

## License

MIT
