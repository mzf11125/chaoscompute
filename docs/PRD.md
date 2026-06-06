# PRD — ChaosCompute

## Executive Summary

ChaosCompute is a decentralized AI inference network on Solana. Node operators stake SOL, run TEE-protected inference nodes, and earn USDC from compute jobs. Game theory replaces centralized routing.

**Phase 1 (Shipping):** Inference gateway. CLIProxyAPI routing. 30 providers. USDC payments.
**Phase 2 (Building):** Decentralized compute market. TEE nodes. VRF selection. Blind race. Slashing.

## Problem Statement

AI inference today has three structural problems:

1. **Custodial trust:** Every API provider holds your data, keys, and billing. You trust them not to scrape, leak, or overcharge.
2. **No compute ownership:** If you run GPUs, you sell through centralized marketplaces (OpenRouter, Akash) that take 10-30% and control pricing.
3. **No game-theoretic security:** Existing compute networks rely on reputation, not cryptographic incentives. Garbage output = no penalty.

## How ChaosCompute Fixes This

| Problem | ChaosCompute Solution |
|---|---|
| Custodial trust | Non-custodial. Wallet signs per request. TEE encrypts all data. |
| No compute ownership | Stake SOL → run TEE node → earn from jobs. Operator-owned. |
| No game security | VRF selection + blind race + optimistic slashing. Fraud = stake burn. |

## User Types

### 1. Consumer (API User)
- Calls OpenAI-compatible API
- Pays USDC per token
- Stakes SOL for discounts
- No API keys needed — wallet is identity

### 2. Node Operator
- Stakes SOL (100/500/1000+)
- Runs TEE inference node
- Participates in cohort selection
- Earns USDC from jobs
- Risk of slashing for bad output

### 3. Protocol Treasury
- Collects 1% protocol fee
- Funds development
- Governed by SOL-weighted voting (future)

## Developer Experience

### Consumer Flow

```bash
# Install
curl -fsSL https://pay.sh/install | sh

# Call any model
pay curl https://gateway.chaoscompute.io/v1/chat/completions \
  -H 'content-type: application/json' \
  -d '{"model":"gpt-5.5","messages":[{"role":"user","content":"Hello"}]}'
```

### Node Operator Flow

```bash
# 1. Stake SOL
solana transfer <stake-vault> 100 --from <wallet>

# 2. Register node with TEE attestation
solana program invoke <program-id> \
  -- '{"register_node":{"stake_amount":100000000000,"tee_attestation_hash":"abc..."}}'

# 3. Start TEE inference server
chaos-node start --tee --port 8080

# 4. Earn from jobs (automatic via on-chain selection)
```

## Phase 2 Specification

### Speculative Parallel Execution

Instead of centralized load balancers, the network uses competitive execution:
- 3-5 nodes race each request
- All submit encrypted output
- Winner gets the bounty
- Losers get refunded (minus gas)

### VRF-Based Routing

Verifiable Random Functions dictate workload allocation:
- Cryptographically unpredictable
- No centralized scheduler
- Prevents MEV manipulation
- Provably fair selection

### Stake-Weighted Raffle

Square root stake weighting:
- Prevents whale domination
- 100 SOL = 10 units, 10000 SOL = 100 units (not 10000)
- Sybil resistant (spinning up cheap nodes doesn't help)
- Fair across operator sizes

### Blind Race

Commit-reveal pattern:
- Phase 1: Nodes compute output, submit hash
- Phase 2: After commit window, nodes reveal actual output
- Verification: hash(output) == committed_hash
- Prevents front-running and copying

### Optimistic Slashing

Low-latency settlement with fraud proofs:
- Accuser posts bond (SOL)
- Submits proof of invalid output
- 10-slot counter-proof window for node
- If no counter: slash stake, redistribute
- If counter valid: slash accuser's bond

### Hardware-Enforced Privacy

All compute in Trusted Execution Environments:
- Prompts never broadcast in plaintext
- Model weights encrypted in memory
- TEE attestation proves execution integrity
- Node operators cannot scrape user data

## Competitive Positioning

### vs Akash Network
- Akash: Commodity GPU marketplace. No game theory. No TEE.
- ChaosCompute: Game-theoretic compute. TEE encryption. VRF selection.

### vs IO.net
- IO.net: GPU aggregator. Centralized scheduling. No slashing.
- ChaosCompute: Decentralized selection. Blind race. Optimistic slashing.

### vs Bittensor
- Bittensor: Proof of intelligence. Complex subnet model.
- ChaosCompute: OpenAI-compatible API. Same architecture. Usable in 5 minutes.

### vs OpenRouter
- OpenRouter: API router. Custodial. No compute ownership.
- ChaosCompute: Compute provider. Non-custodial. Own your nodes.

## Token Economics

| Component | Detail |
|---|---|
| Staking currency | SOL (native) |
| Payment currency | USDC |
| Protocol fee | 1% of compute sales |
| New token | None |
| Node earnings | USDC from jobs |
| Slashing | SOL burned |

## MVP Scope

### In Scope
- [x] Gateway with CLIProxyAPI routing (Phase 1)
- [x] pay.sh USDC payments
- [x] 30 providers across 3 tiers
- [x] Wallet-based auth
- [x] Anchor program (skeleton)
- [ ] TEE node registration
- [ ] VRF cohort selection
- [ ] Blind race mechanics
- [ ] Optimistic slashing
- [ ] Node operator dashboard
- [ ] Job marketplace

### Out of Scope (for now)
- Mainnet deployment
- Multi-chain support
- Mobile app
- DAO governance
- Custom model hosting
