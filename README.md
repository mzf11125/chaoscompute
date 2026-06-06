# ChaosCompute

**Decentralized AI compute on Solana. Stake SOL. Run inference. Earn USDC.**

ChaosCompute is a decentralized AI inference network on Solana. Node operators stake SOL, run TEE-protected inference nodes, and earn USDC from compute jobs. Consumers pay per token via an OpenAI-compatible API. Game theory replaces centralized routing — VRF selection, blind race, optimistic slashing.

## Business Model

### Consumers (API Users)

| Tier | SOL Staked | Discount | How It Works |
|---|---|---|---|
| **Free** | 0 SOL | 0% | pay.sh HTTP 402. USDC per request. No wallet needed. |
| **Standard** | 100 SOL | 5% | Wallet connect. Ephemeral JWT. |
| **Pro** | 500 SOL | 10% | Priority routing. Higher rate limits. |
| **Enterprise** | 1,000+ SOL | 20% | Dedicated capacity. Custom pricing. |

### Node Operators

| Tier | Min Stake | Role |
|---|---|---|
| **Standard** | 100 SOL | Run TEE node. Participate in cohort selection. Earn from jobs. |
| **Pro** | 500 SOL | Higher selection probability via sqrt(stake) weighting. |
| **Enterprise** | 1,000+ SOL | Dedicated capacity. Maximum yield. |

Revenue: Compute sales to consumers. Protocol fee (1%) funds treasury. 100% of Phase 1 margin funds Phase 2.

## Status

| Item | Status | Detail |
|---|---|---|
| Anchor Program | Deployed | `5Zmjie6vNFFJBkwA49CA38wJhjZpN5UDvna6tohBapyg` on Solana devnet |
| Frontend | Live | [chaoscompute.io](https://github.com/mzf11125/chaoscompute) |
| Gateway (Phase 1) | Shipping | CLIProxyAPI routing. 30 providers. USDC payments. |
| Compute Network | Building | TEE nodes. VRF selection. Staking contracts. |

## Quick Start

### As a Consumer

```bash
curl -fsSL https://pay.sh/install | sh
pay curl https://gateway.chaoscompute.io/v1/chat/completions \
  -H 'content-type: application/json' \
  -d '{"model":"gpt-5.5","messages":[{"role":"user","content":"Hello"}]}'
```

### As a Node Operator

```bash
# Stake SOL and register your TEE node
solana program invoke 5Zmjie6vNFFJBkwA49CA38wJhjZpN5UDvna6tohBapyg \
  --account <your-wallet> \
  --account <stake-vault> \
  -- '{"register_node":{"stake_amount":100000000000}}'
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

## Architecture

```
Consumer → API Gateway → VRF Cohort Selection → TEE Nodes → Output
                                ↓
                        Stake-Weighted Raffle
                                ↓
                    Blind Race (Commit → Reveal)
                                ↓
                    Optimistic Slashing (if fraud)
                                ↓
                    USDC Settlement (per token)
```

- **TEE Nodes:** All inference runs in Trusted Execution Environments. Prompts never broadcast in plaintext.
- **VRF Selection:** Verifiable Random Functions select node cohorts. No centralized scheduler.
- **Blind Race:** Nodes commit encrypted output, then reveal. Prevents front-running.
- **Optimistic Slashing:** Fraud proofs with bond posting. Counter-proof window. Stake burned on invalid output.

## Community

- Discord: [discord.gg/xXCKpmt7d](https://discord.gg/xXCKpmt7d). Weekly roadmap meetings.
- GitHub: [mzf11125/chaoscompute](https://github.com/mzf11125/chaoscompute). MIT licensed. Contributions welcome.
- Sole maintainer: mzf11125.

## Docs

- [`docs/PRD.md`](docs/PRD.md). Full Product Requirements Document.
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md). Technical architecture.
- [`docs/COMPETITIVE.md`](docs/COMPETITIVE.md). Competitive positioning.
- [`docs/API.md`](docs/API.md). API reference.
- [`docs/ROADMAP.md`](docs/ROADMAP.md). Development roadmap.
- [`GOVERNANCE.md`](GOVERNANCE.md). Project governance and staking model.

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 19 + Vite + TypeScript + Tailwind CSS v4 |
| Fonts | Inter (body) + Instrument Serif (display accents) |
| Payments | USDC on Solana (pay.sh HTTP 402) |
| Staking | Anchor (Rust) — SOL escrow, timelocked unstake |
| Compute | TEE attestation, VRF cohort selection, blind race |
| Smart Contract | Anchor (Rust). Deployed to devnet. |
| Monorepo | pnpm workspaces |
| CI/CD | GitHub Actions |

## License

MIT
