# Roadmap — ChaosCompute

## Phase 1: Inference Gateway ✅ Shipping

- [x] CLIProxyAPI integration (Go proxy, 36k stars)
- [x] 30 providers across 3 tiers (Premium/Cheap/Free)
- [x] pay.sh HTTP 402 USDC payments
- [x] Wallet-based auth (Phantom, Solflare)
- [x] SOL staking tiers (Guest/Builder/Operator/Partner)
- [x] OpenAI-compatible API
- [x] Landing page + Console + Docs
- [x] Anchor program deployed to devnet
- [x] Python SDK (`chaos-sdk`)
- [x] Node.js SDK (`@chaoscompute/sdk`)

## Phase 2: Decentralized Compute 🔨 Building

### Month 1: Foundation
- [ ] Anchor program rewrite (real staking, TEE attestation, marketplace)
- [ ] TEE node registration flow
- [ ] On-chain SOL escrow (StakeVault PDA)
- [ ] Timelocked unstake (7-day cooldown)

### Month 2: Core Mechanics
- [ ] VRF cohort selection (sqrt(stake) weighting)
- [ ] Blind race (commit-reveal pattern)
- [ ] Job lifecycle (Requested → Assigned → Computing → Verified → Settled)
- [ ] USDC escrow for job bounties

### Month 3: Security
- [ ] Optimistic slashing (bond + counter-proof window)
- [ ] Fraud proof verification
- [ ] TEE attestation freshness checks
- [ ] Admin access controls

### Month 4-5: Frontend
- [ ] Compute node explorer (`/nodes`)
- [ ] Job marketplace (`/marketplace`)
- [ ] Node operator dashboard (`/operators`)
- [ ] Wallet → on-chain staking integration
- [ ] Live attestation status display

### Month 6: Integration
- [ ] Gateway → Compute Network routing
- [ ] External provider fallback (Phase 1 as backup)
- [ ] OpenRouter integration (sell compute wholesale)
- [ ] SDK updates for compute API

## Long-term: Year 1

- [ ] Mainnet deployment
- [ ] 100+ TEE nodes
- [ ] Custom model hosting
- [ ] Multi-chain settlement (EVM bridge)
- [ ] DAO governance (SOL-weighted voting)
- [ ] Enterprise SLA guarantees
- [ ] Mobile app

## Key Milestones

| Milestone | Target | Status |
|---|---|---|
| Gateway live | Hackathon | ✅ Done |
| Anchor deployed | Hackathon | ✅ Done |
| Anchor rewrite | Month 1 | 🔨 Building |
| TEE node registration | Month 1 | 🔨 Building |
| VRF selection | Month 2 | 🔨 Building |
| Blind race | Month 2 | 🔨 Building |
| Job marketplace | Month 4 | 🔨 Building |
| 100 TEE nodes | Year 1 | 🎯 Target |
| Mainnet | Year 1 | 🎯 Target |
