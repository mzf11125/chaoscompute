# GOVERNANCE.md — ChaosCompute

## Project Status

ChaosCompute is an open-source project maintained by a sole developer.

| Field | Value |
|---|---|
| **Maintainer** | mzf11125 ([@mzf11125](https://github.com/mzf11125)) |
| **License** | MIT |
| **Repository** | [github.com/mzf11125/chaoscompute](https://github.com/mzf11125/chaoscompute) |
| **Phase 1** | Inference Gateway (live) — CLIProxyAPI routing + pay.sh HTTP 402 |
| **Phase 2** | Decentralized Compute (roadmap) — game-theoretic market on Solana |

## Decision Making

All technical and product decisions are made by the sole maintainer.

- Final merge rights: mzf11125
- RFC process: open issues for discussion before implementation
- Community PRs: welcomed and reviewed, but maintainer has final say on merge
- Disputes: maintainer decision is final

## Revenue & Treasury

100% of Phase 1 revenue (provider cost + 5% routing margin) funds the Phase 2 decentralized compute treasury.

| Category | Allocation |
|---|---|
| Phase 2 development | 100% |
| Infrastructure/hosting | Self-hosted (devnet/sandbox during development) |
| Community grants | 0% (not applicable — sole developer) |
| Developer compensation | Project revenue |

No VC funding. No token pre-sale. No airdrops. Self-funded from inference revenue.

## Contributions

Contributions are welcome under the following guidelines:

1. Open an issue first to discuss the proposed change
2. Fork the repo, create a feature branch
3. Submit PR against `main` with a clear description
4. All PRs must pass CI (lint, typecheck, build)
5. Maintainer reviews and merges at their discretion
6. By contributing, you agree that your code is licensed under MIT

## Code of Conduct

- Be respectful. This is a one-person project — don't be a jerk.
- No spam, no token shilling, no unsolicited promotions.
- Security reports: email the maintainer. Do not open public issues for vulnerabilities.

## Phase 2: Decentralized Compute

When Phase 2 launches:

- Governance will transition to a DAO with token-weighted voting
- Protocol fees (1%) replace the 5% routing margin as the primary revenue model
- Node operators will be able to stake tokens and participate in governance
- The sole maintainer role transitions to core contributor status

This transition will only occur when Phase 2 is production-ready and the token has sufficient distribution to prevent concentration of power.
