# CONTEXT.md — ChaosCompute

## Domain Language

| Term | Definition |
|---|---|
| **Gateway** | Phase 1 inference router. CLIProxyAPI routing. pay.sh USDC payments. 30 providers. Shipping. |
| **Compute Network** | Decentralized compute market. TEE nodes. VRF selection. Blind race. Slashing. Building. |
| **TEE** | Trusted Execution Environment. Hardware-enrypted compute. Node attestation proves execution integrity. |
| **VRF** | Verifiable Random Function. Cryptographic randomness for node selection. Unpredictable, provable. |
| **Cohort** | 3-5 nodes selected via sqrt(stake)-weighted VRF raffle to compete on a job. |
| **Blind Race** | Nodes commit encrypted output hash, then reveal. Prevents front-running and copying. |
| **Optimistic Slashing** | Fraud proof system. Accuser posts bond. Counter-proof window. Stake slashed on invalid output. |
| **Stake Vault** | On-chain PDA holding escrowed SOL for node operators. |
| **Console** | Wallet connect page. Shows SOL staking tier, quickstart, API access. |
| **Free Tier** | 0 SOL. pay.sh only. No wallet needed. Full price. |
| **Standard Tier** | 100 SOL. 5% discount. Wallet connect. |
| **Pro Tier** | 500 SOL. 10% discount. Priority routing. |
| **Enterprise Tier** | 1000+ SOL. 20% discount. Dedicated capacity. |
| **pay.sh** | HTTP 402 payment protocol. USDC settlement on Solana. |
| **CLIProxyAPI** | Go proxy server. 36k stars. Upstream routing engine. Phase 1 fallback. |

## Deployments

| Item | Address | Network |
|---|---|---|
| Anchor Program | `5Zmjie6vNFFJBkwA49CA38wJhjZpN5UDvna6tohBapyg` | Solana devnet |
| Deploy wallet | `E9PsSz9XWgNR3TmSC57NHC2ZxJzF5NmbrWsDKEe7A7yM` | Solana devnet |

## Architecture Decisions

| # | Decision | Rationale | Date |
|---|---|---|---|
| 1 | USDC via pay.sh as payment layer | Non-custodial. Wallet signs per request. Standards-based. | Day 2 |
| 2 | CLIProxyAPI as upstream routing (Phase 1) | 36k-star Go proxy. 30 real providers. Shipping fast. | Day 1 |
| 3 | SOL staking for tier discounts (no new token) | SOL-native incentives. No regulatory risk. Community alignment. | Day 12 |
| 4 | TEE attestation for node verification | Hardware-enforced trust. No reliance on reputation. | Phase 2 |
| 5 | VRF cohort selection | Cryptographic randomness. Unpredictable. Prevents MEV. | Phase 2 |
| 6 | Blind race (commit-reveal) | Prevents front-running. All valid submissions equal chance. | Phase 2 |
| 7 | Optimistic slashing with bond | Low-latency settlement. Fraud proof + counter-proof. Due process. | Phase 2 |
| 8 | sqrt(stake) weighting | Prevents whale domination. Sybil resistant. Fair selection. | Phase 2 |

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Provider API key funding (Phase 1) | High | High | Crowdfunding. Console shows funding needed. |
| TEE hardware cost for operators | Medium | High | Start with consumer GPUs. TEE attestation via remote attestation. |
| Slashing false positives | Medium | Medium | Bond posting by accuser. Counter-proof window. Appeal mechanism. |
| VRF manipulation | Low | High | Cryptographic VRF (Solana native). Slot-hash based. |
| pay.sh integration complexity | Medium | Low | Provider spec in chaoscompute.yaml. Sandbox testing. |
