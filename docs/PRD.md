# ChaosCompute — Product Requirements Document

**Version:** 3.0
**Deadline:** June 12, 2026 (EasyA Kickstart Hackathon)
**Tagline:** 9router's simplicity. Bittensor's architecture. Solana's speed.

---

## 1. Executive Summary

**Start here:** Change two lines of code. That's the entire integration cost.

```python
# Before
client = OpenAI(base_url="https://api.openai.com/v1", api_key="sk-...")

# After
client = OpenAI(base_url="https://api.chaoscompute.io/v1", api_key=signer.token())
```

Your app now runs on a decentralized compute market. Your AI agent now self-pays per request from its own Solana wallet. You never deposited anything into anyone's account. You never signed up for anything. You just swapped a URL.

That's the product.

**What's happening underneath** is what makes it defensible: every inference request is broadcast as an on-chain bounty on Solana. A cohort of independent GPU nodes races to execute it in parallel. A stake-weighted cryptographic raffle picks the winner. The smart contract pays out. The whole thing settles in under 400ms for a fraction of a cent.

There is no router. No scheduler. No centralized gateway. The smart contract *is* the router.

**The positioning in one sentence:**
ChaosCompute is what you get when you take 9router's developer simplicity, rebuild the supply side as a Bittensor-style decentralized compute market, and settle every transaction on Solana.

**Why each piece of that matters:**
- **9router's simplicity** — developers adopt it in minutes, not days. Drop-in OpenAI compatibility. No new mental model required.
- **Bittensor's architecture** — open supply side, permissionless provider entry, token-economic incentives. Anyone with a GPU can participate.
- **Solana's speed** — 400ms block times, $0.00025 per transaction. Fast enough to settle inference requests in real time without adding noticeable latency.

---

## 2. Problem Statement

### 2.1 For Developers & AI Agents

The current inference market has a structural trust problem. Every option requires you to hand control to a third party.

**OpenAI / Anthropic:** Single provider. Single point of failure. If they go down, rate-limit you, or change pricing, you're stuck.

**OpenRouter:** Unified credits solve the multi-key problem but introduce custodial risk. You deposit funds into their account. If they freeze access, your balance is gone. You're still paying corporate API markup on top.

**9router:** Brilliant local proxy for managing your own subscriptions — but it's just a routing layer. You still pay for subscriptions you may not fully use. There's no supply side, no market pricing, no way for the network to get cheaper as it grows.

**For AI agents specifically:** Codex, Devin, and similar agents can't safely store API keys. A self-paying agent needs to sign micropayments from its own wallet — not manage rotating credentials. No current solution supports this natively.

### 2.2 For GPU Providers

The supply side of AI compute is a closed club. Every major inference marketplace — OpenRouter, Together, Jatevo — requires whitelisting, enterprise contracts, or KYC. An independent developer running an idle RTX 4090 has no way to sell that compute. Idle GPU capacity is wasted capacity, and there's no open market to price it.

---

## 3. How ChaosCompute Fixes This

| Problem | ChaosCompute's Fix |
|---|---|
| Custodial balance risk | Non-custodial — agent signs per request, never deposits |
| Corporate API markup | Routes to bare-metal hardware; pricing is raw compute cost |
| Single provider failure | 3-5 nodes race per request; if one fails, another finishes |
| Agent credential management | Solana wallet = the API key; ephemeral JWT per request |
| Closed supply side | Stake the token, run the daemon, you're a provider |
| Complex web3 integration | OpenAI-compatible API; existing code works unchanged |

---

## 4. Users

### 4.1 Human Developers
Builders of AI-powered applications who currently use OpenAI, Anthropic, or OpenRouter. They care about three things: cost, uptime, and zero migration friction. ChaosCompute delivers all three.

### 4.2 Autonomous AI Agents
Coding agents (Codex, Devin, Claude Code) that self-fund from a Solana hot wallet. ChaosCompute is the first inference API designed for agents that actually own their own wallet.

### 4.3 GPU Providers
Independent GPU operators who want to monetize compute without enterprise contracts. Run the node client, stake the token, earn fees.

---

## 5. The Developer Experience

### 5.1 The Integration Flow

**Step 1:** Install the SDK.
```bash
pip install chaos-sdk
```

**Step 2:** Swap the client.
```python
from openai import OpenAI
from chaos_sdk import ChaosSigner

signer = ChaosSigner(private_key="YOUR_SOLANA_PRIVATE_KEY")
client = OpenAI(
    base_url="https://api.chaoscompute.io/v1",
    api_key=signer.token()
)
response = client.chat.completions.create(
    model="chaos-fast",
    messages=[{"role": "user", "content": "Write a Rust function for token transfers"}]
)
```

**Step 3:** Fund the wallet with a few USDC. Done.

### 5.2 What the SDK Handles Automatically

- Generates an ephemeral JWT signed by the Solana keypair on each request
- Broadcasts the bounty transaction and micro-fee to Solana
- Polls for bounty resolution (winner selected by VRF)
- Decrypts and returns the plaintext response
- Warns the developer when wallet balance drops below 10 requests of runway

### 5.3 Model Names

- `chaos-fast` — fastest available model in the selected cohort
- `chaos-coder` — cohort biased toward code-optimized models
- `chaos-reasoning` — cohort biased toward reasoning-capable models

---

## 6. Core Architecture

### 6.1 The Speculative Racing Paradigm

**Traditional inference (9router model):**
Request → proxy selects best provider → single node executes → response

**ChaosCompute Core:**
Request → smart contract selects cohort of 3-5 nodes → all race in parallel → stake-weighted raffle picks winner → response

### 6.2 The Five-Step Request Flow

```
1. REQUEST → BountyAccount created on-chain with encrypted prompt hash
2. COHORT SELECTION → Slot-hash pseudo-random selection of 3-5 staked nodes
3. PARALLEL EXECUTION → Nodes race, submit commitment_hash within 3 slots
4. WINNER SELECTION → VRF oracle provides randomness, stake-weighted raffle
5. DELIVERY + VERIFICATION → Winner streams output, 10-block slashing window opens
```

### 6.3 Stake-Weighted Raffle

```
P(node_i) = sqrt(stake_i) / Σ sqrt(stake_j)  for all j in cohort
```

### 6.4 Security Fixes

**Fix 1 — Garbage Output:** Optimistic slashing. Fraud proof within 10 blocks. Execution trace revealed. Stake slashed.
**Fix 2 — Energy Waste:** Mini-cohort (3-5 nodes) per request, not all nodes.
**Fix 3 — MEV / Validator Collusion:** VRF from Pyth Entropy or Switchboard.
**Fix 4 — Geolocation Bias:** 1.5-second submission window. All timely entries equal.
**Fix 5 — Prompt Privacy:** Ephemeral Diffie-Hellman encryption + TEE execution.

---

## 7. Competitive Positioning

| Competitor | Their strength | Their flaw | ChaosCompute's answer |
|---|---|---|---|
| OpenRouter | 300+ models, unified credits | Custodial, centralized | Non-custodial, bare-metal, no markup |
| 9router | Drop-in proxy, RTK compression | No supply side | Same UX, decentralized backend |
| Jatevo | Pooled model gateway | Centralized scheduler | No scheduler, smart contract router |
| Bittensor | Proven decentralized AI incentives | Complex UX, custom L1 | Same architecture, drop-in, Solana-native |

**One-liners:**
- vs OpenRouter: "Non-custodial. Your wallet signs per request. Nothing deposited anywhere."
- vs 9router: "Same UX, but the backend is an open market."
- vs Jatevo: "No scheduler. Stake and probability decide."
- vs Bittensor: "Same idea, usable in 5 minutes, settled on Solana."

---

## 8. Token Economics

- **Staking collateral:** Nodes must stake tokens to enter cohort selection
- **Slashing collateral:** Fraud proof penalty burns staked tokens
- **Protocol fees:** ~1% per request to creator wallet

---

## 9. MVP Scope (June 12)

### In Scope
- Vite + React Gateway with Dark Cinematic design
- 3 provider integrations (OpenAI, Anthropic, Together)
- Solana wallet JWT authentication
- Per-request USDC settlement (async)
- Python SDK (chaos-sdk)
- Node.js SDK (@chaoscompute/sdk)
- Spend dashboard
- Solana Blink demo
- Anchor program skeleton

### Out of Scope (Post-Hackathon)
- Real TEE enforcement
- Full IPFS/Arweave prompt encryption
- Provider dashboard UI (CLI only for MVP)
- Multi-chain settlement

---

## 10. The 60-Second Pitch

*"Every AI agent being built right now calls an inference API. OpenAI, Anthropic, OpenRouter — they all work the same way. You hand your money and your data to a company, they route your request to their servers, you hope they stay online.*

*ChaosCompute is a two-line change that removes the company from that equation.*

*That's it. Your existing agent code works. But now, instead of calling OpenAI's server, you're broadcasting a bounty onto Solana. Three GPU nodes — anywhere in the world — race to answer your prompt in parallel. A cryptographic raffle picks the winner. The smart contract pays them out. You get your answer.*

*There is no router. No scheduler. No company holding your funds. The smart contract is the router.*

*9router's simplicity. Bittensor's architecture. Solana's speed. ChaosCompute."*

---

*ChaosCompute — The smart contract is the router.*
