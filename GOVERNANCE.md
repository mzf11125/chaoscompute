# GOVERNANCE.md — ChaosCompute

## Project Status

ChaosCompute is an open-source project maintained by a sole developer.

| Field | Value |
|---|---|
| **Maintainer** | mzf11125 ([@mzf11125](https://github.com/mzf11125)) |
| **License** | MIT |
| **Repository** | [github.com/mzf11125/chaoscompute](https://github.com/mzf11125/chaoscompute) |
| **Phase 1** | Inference Gateway. CLIProxyAPI routing. pay.sh USDC payments. |
| **Phase 2** | Decentralized Compute (roadmap). Game-theoretic market on Solana. |

## Payment Model

| Aspect | Detail |
|---|---|
| Payment currency | USDC via pay.sh only |
| Staking currency | SOL. For tier eligibility and discounts. |
| Revenue | Provider cost + 5% routing margin on USDC payments |
| Treasury | 100% of margin funds Phase 2 development |
| New token | None. SOL-native incentives. No proprietary token. |

## SOL Staking Tiers

| Tier | SOL | Discount | Benefits |
|---|---|---|---|
| Guest | 0 | 0% | pay.sh only. Standard limits. |
| Builder | 100 | 5% | Wallet connect. API access. Standard routing. |
| Operator | 500 | 10% | Priority routing. Higher rate limits. |
| Partner | 1000+ | 20% | Dedicated capacity. Custom pricing. |

Tier is currently based on wallet SOL balance via `getBalance()` RPC. Native staking contracts where delegated SOL earns ~7% APY are on the Phase 2 roadmap.

## Decision Making

All technical and product decisions are made by the sole maintainer.
- Final merge rights: mzf11125
- Community PRs welcomed and reviewed. Maintainer has final say.
- Disputes: maintainer decision is final.

## Revenue Allocation

| Category | Allocation |
|---|---|
| Phase 2 development | 100% |
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

When Phase 2 launches:
- Governance transitions to SOL-weighted voting
- Protocol fees (1%) replace the 5% routing margin
- Node operators stake SOL to participate in the compute market
- Sole maintainer role transitions to core contributor status

This transition only occurs when Phase 2 is production-ready.
