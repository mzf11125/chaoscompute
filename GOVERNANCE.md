# GOVERNANCE.md — ChaosCompute

## Project Status

ChaosCompute is an open-source decentralized AI compute network maintained by a sole developer.

| Field | Value |
|---|---|
| **Maintainer** | mzf11125 ([@mzf11125](https://github.com/mzf11125)) |
| **License** | MIT |
| **Repository** | [github.com/mzf11125/chaoscompute](https://github.com/mzf11125/chaoscompute) |
| **Phase 1** | Inference Gateway. CLIProxyAPI routing. 30 providers. USDC payments. Shipping. |
| **Phase 2** | Decentralized Compute. TEE nodes. VRF selection. Staking. Slashing. Building. |

## Payment Model

### Consumers

| Aspect | Detail |
|---|---|
| Payment currency | USDC via pay.sh only |
| Pricing | Per token, varies by model |
| Protocol fee | 1% of all compute sales → treasury |

### Node Operators

| Aspect | Detail |
|---|---|
| Staking currency | SOL. Required to run nodes. |
| Minimum stake | 100 SOL (Standard), 500 SOL (Pro), 1000+ SOL (Enterprise) |
| Earnings | USDC from compute jobs |
| Slashing | Stake burned on invalid output (fraud proof + counter-proof window) |

Revenue: 100% of Phase 1 routing margin funds Phase 2 development. Phase 2 protocol fee (1%) funds ongoing treasury.

## Consumer Tiers

| Tier | SOL | Discount | Benefits |
|---|---|---|---|
| Free | 0 | 0% | pay.sh only. Standard limits. |
| Standard | 100 | 5% | Wallet connect. API access. |
| Pro | 500 | 10% | Priority routing. Higher rate limits. |
| Enterprise | 1000+ | 20% | Dedicated capacity. Custom pricing. |

## Node Operator Tiers

| Tier | Min Stake | Benefits |
|---|---|---|
| Standard | 100 SOL | Run TEE node. Participate in cohort selection. |
| Pro | 500 SOL | Higher selection probability (sqrt(stake) weighting). |
| Enterprise | 1000+ SOL | Dedicated capacity. Maximum yield. |

Node operators must maintain TEE attestation. Staking is escrowed on-chain via StakeVault PDA. Unstaking requires 7-day cooldown.

## Decision Making

All technical and product decisions are made by the sole maintainer.
- Final merge rights: mzf11125
- Community PRs welcomed and reviewed. Maintainer has final say.
- Disputes: maintainer decision is final.

## Revenue Allocation

| Category | Allocation |
|---|---|
| Phase 2 development | 100% of Phase 1 margin |
| Protocol treasury | 1% of Phase 2 compute sales |
| Infrastructure/hosting | Self-hosted during development |
| Developer compensation | Project revenue |

No VC funding. No token pre-sale. Self-funded from inference revenue.

## Contributions

1. Open an issue first to discuss the proposed change
2. Fork, feature branch, PR against `main`
3. PRs must pass CI (typecheck, build)
4. Maintainer reviews and merges at their discretion
5. By contributing, you agree to MIT license

## Code of Conduct

- Be respectful. No harassment. No spam.
- Security reports: email the maintainer directly.

## Phase 2 Transition

When the compute network launches:
- Governance transitions to SOL-weighted voting
- Protocol fees (1%) replace the routing margin
- Node operators stake SOL to participate in the compute market
- Sole maintainer role transitions to core contributor status

This transition only occurs when the compute network is production-ready.
