# Architecture — ChaosCompute

## Overview

ChaosCompute is a decentralized AI inference network on Solana. Two layers:

1. **Gateway (Phase 1):** CLIProxyAPI routing to 30 providers. pay.sh USDC payments. Shipping.
2. **Compute Network (Phase 2):** Decentralized TEE nodes. VRF selection. Blind race. Optimistic slashing. Building.

## System Diagram

```
                    ┌─────────────────────┐
                    │      Consumer        │
                    │  (API / SDK / CLI)   │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │   API Gateway        │
                    │  OpenAI-compatible   │
                    │  /v1/chat/completions│
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
    ┌─────────▼─────────┐  ┌──▼──────────┐  ┌──▼──────────────┐
    │  Phase 1: Routing  │  │ Phase 2:    │  │  External       │
    │  CLIProxyAPI       │  │ TEE Nodes   │  │  Providers      │
    │  30 providers      │  │ (on-chain)  │  │  (OpenRouter)   │
    └───────────────────┘  └─────────────┘  └─────────────────┘
```

## Phase 1: Gateway (Shipping)

```
Consumer → pay.sh → Gateway → CLIProxyAPI → Provider → Response
                ↓
        USDC settlement (per token)
```

- **pay.sh:** HTTP 402 protocol. Wallet signs USDC transfer per request.
- **CLIProxyAPI:** Go proxy. Routes to 30 providers across 3 tiers.
- **Providers:** OpenAI, Anthropic, Google, xAI, DeepSeek, Groq, etc.
- **Settlement:** USDC per token. Provider cost + 5% margin.

### Provider Registry

| Tier | Providers | Price Range |
|---|---|---|
| Premium | OpenAI, Anthropic, Google, xAI, Mistral | $1.25-$5.00/1M input |
| Cheap | DeepSeek, Xiaomi, Hyperbolic, Fireworks, Qwen, etc. | $0.01-$0.95/1M input |
| Free | Groq, Cerebras, SambaNova, Nebius | $0/1M input |

### HTTP 402 Flow

1. Consumer calls `POST /v1/chat/completions`
2. Gateway returns `402 Payment Required` with amount + recipient + nonce
3. pay.sh signs USDC transfer authorization locally
4. pay.sh replays request with `X-PAYMENT` proof header
5. Gateway settles payment, returns response

## Phase 2: Compute Network (Building)

```
Consumer → API Gateway → VRF Cohort Selection → TEE Nodes → Output
                                ↓
                    ┌───────────┴───────────┐
                    │  sqrt(stake) Weighted  │
                    │  Random Selection      │
                    └───────────┬───────────┘
                                │
                    ┌───────────▼───────────┐
                    │   Blind Race          │
                    │   Commit → Reveal     │
                    └───────────┬───────────┘
                                │
                    ┌───────────▼───────────┐
                    │  Resolution           │
                    │  Winner gets bounty   │
                    │  Others get refund    │
                    └───────────┬───────────┘
                                │
                    ┌───────────▼───────────┐
                    │  Optimistic Slashing  │
                    │  Fraud proof if fraud │
                    │  Counter-proof window │
                    └───────────────────────┘
```

### On-Chain Accounts

| Account | Purpose |
|---|---|
| `GlobalConfig` | Singleton. Admin, fees, parameters. |
| `StakeVault` | PDA holding escrowed SOL for all nodes. |
| `ComputeNode` | Per-node state. Owner, stake, attestation, stats. |
| `Job` | Inference job. Bounty, model, status, cohort. |
| `JobEscrow` | Per-job USDC escrow. |
| `Commitment` | Node's blind commit (hash of output). |
| `SlashingDispute` | Active slashing cases. Bond, timestamp, status. |

### TEE Attestation

All inference runs in Trusted Execution Environments:

1. Node operator registers with TEE attestation hash
2. Attestation proves: correct hardware, correct software, encrypted memory
3. On-chain verification: hash must match known-good values
4. Freshness check: attestation must be within N slots
5. Stale attestation → node deactivated until re-attested

### VRF Cohort Selection

```
slot_hash = hash(current_slot + job_id)
randomness = vrf_derive(slot_hash)
cohort = sqrt_stake_weighted_select(eligible_nodes, cohort_size, randomness)
```

- **Cohort size:** 3-5 nodes per job
- **Selection:** sqrt(stake) weighting prevents whale domination
- **Unpredictable:** Slot hash + VRF = no MEV, no front-running
- **Provable:** Anyone can verify selection was fair

### Blind Race

1. **Commit phase:** Each cohort node computes output, submits `hash(output)`
2. **Reveal phase:** After commit window, nodes reveal actual output
3. **Verification:** `hash(revealed_output) == committed_hash`
4. **Selection:** Winner chosen from valid reveals via stake-weighted random

### Optimistic Slashing

1. **Fraud proof:** Accuser posts bond (SOL) + submits proof of invalid output
2. **Counter-proof window:** 10 slots for node to defend itself
3. **Resolution:** If no counter → slash stake, redistribute to accuser + treasury
4. **Appeal:** If counter-proof valid → slash accuser's bond instead

## Directory Map

```
packages/gateway/src/
├── App.tsx                    # Root router + providers
├── components/
│   ├── console/               # WalletConnect, StakingTier, Quickstart, etc.
│   ├── layout/                # Navbar, Footer, DashboardShell
│   └── ui/                    # Button, Card, Badge, Input, Modal
├── lib/
│   ├── providers/             # Provider definitions (Phase 1)
│   ├── routing/               # CLIProxyAPI routing logic (Phase 1)
│   └── solana/                # Wallet, settlement, auth
└── pages/
    ├── Landing/               # Hero, HowItWorks, Competitors, etc.
    ├── Console/               # Wallet connect, staking, quickstart
    ├── Nodes/                 # Compute node explorer
    ├── Marketplace/           # Live inference jobs
    ├── Operators/             # Node operator dashboard
    ├── Docs/                  # Documentation
    └── Api/                   # API reference
```

## Security Model

| Layer | Mechanism |
|---|---|
| Execution | TEE attestation. Hardware-enforced encryption. |
| Selection | VRF. Cryptographic randomness. Unpredictable. |
| Anti-frontrun | Blind race. Commit-reveal. No output visible until reveal. |
| Fraud detection | Optimistic slashing. Bond + counter-proof. Due process. |
| Economic | SOL escrow. Slashing = stake burn. Incentive alignment. |
| Payment | USDC per token. Non-custodial. pay.sh protocol. |
