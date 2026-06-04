# ChaosCompute — Demo Script & Sprint Plan

## Demo Script (Rehearse This Exactly)

### Setup
Three terminal windows open side by side, labeled:
- **Singapore/RTX 4090** (green text)
- **Frankfurt/A100** (blue text)
- **Tokyo/RTX 3090** (yellow text)

Solana Explorer open in a fourth window.
Phantom wallet connected on a phone showing the Blink.

### The Prompt
**"Write a Solana Anchor instruction that initializes a token staking vault."**

### The Sequence (60 seconds)

```
[00:00] Open the ChaosCompute Blink on X from phone
[00:03] Type the prompt into the Blink input
[00:06] Tap "Spin the Wheel (0.01 USDC)"
[00:08] Show wallet approval popup
[00:10] Tap approve
  
[00:12] ALL THREE terminal windows light up simultaneously
        → Show parallel execution in real time
        → Point at each terminal: "Singapore racing, Frankfurt racing, Tokyo racing"

[00:17] Point at Solana Explorer
        → BountyAccount visible (created at tap)
        → Three commitment submissions arriving

[00:22] VRF fires, winner declared
        → "Frankfurt/A100 wins the race"
        → Payout transaction appears on Explorer

[00:28] Answer starts streaming on the phone
        → First tokens of the Anchor instruction appear
        → Streaming continues

[00:35] cNFT receipt minted
        → Show in Phantom wallet
        → "Your proof-of-compute receipt, on-chain"

[00:40] Pullback line:
        "Everything you just saw — the routing, the payment, the settlement —
         happened on-chain. There is no server making decisions.
         The smart contract is the router."

[00:50] Gateway demo (safety net):
        "That's Core — the decentralized market. If you want something
         production-ready today, we also ship Gateway. Same wallet. Same SDK.
         One URL swap. Zero subscription management."

[00:60] End
```

### Timing Notes
- Total visible time target: Under 3 seconds from wallet approval to first token streaming
- If Core demo fails → fallback to Gateway demo (same wallet, same SDK, slam dunk)
- Keep background music low (cinematic, tension-building, no lyrics)
- No terminal text should be auto-scrolling too fast — readable by judges

---

## 9-Day Sprint Plan

### Day 1: Foundation
- [ ] Fork 9router, extract routing + providers into `src/lib/`
- [ ] Scaffold Vite + React + TypeScript + Tailwind CSS v4
- [ ] Set up Dark Cinematic design system (colors, fonts, spacing, easing)
- [ ] Install @solana/kit, framer-motion, lucide-react
- [ ] X post: "Building ChaosCompute. 9 days. Let's go. @EasyA_Kickstart"

### Day 2: Solana Auth
- [ ] Build `src/lib/solana/auth.ts` — JWT verification with ed25519
- [ ] Build `src/lib/solana/settlement.ts` — USDC micropayment
- [ ] Build `src/lib/solana/balance.ts` — wallet balance checker
- [ ] Test: JWT signed by Solana wallet → verified by Gateway
- [ ] X post: "Day 2: Solana wallet auth working. Your wallet IS your API key."

### Day 3: Dashboard
- [ ] Build SpendView component (total spend, breakdown by model)
- [ ] Build RequestLog component (filterable, real-time)
- [ ] Build ProviderHealth component (status lights)
- [ ] Build WalletBalance + LowBalanceAlert components
- [ ] X post: "Day 3: Spend dashboard. Real-time USDC tracking. On-chain settlement."

### Day 4: Landing Page + Nav
- [ ] Build Navbar (glass pill, wallet connect, chain switcher)
- [ ] Build Landing page: HeroSection (cinematic orbs + noise overlay)
- [ ] Build HowItWorks section (3-step cards)
- [ ] Build Competitors section (comparison table)
- [ ] Build CodeExample section
- [ ] X post: "Day 4: Landing page live. 9router's simplicity. Bittensor's architecture. Solana's speed."

### Day 5: SDKs
- [ ] Python SDK: ChaosSigner (ed25519 JWT generation)
- [ ] Python SDK: OpenAI-compatible client wrapper
- [ ] Node.js SDK: ChaosSigner + client
- [ ] Publish chaos-sdk to PyPI test
- [ ] X post: "Day 5: pip install chaos-sdk. Swap two lines. Self-paying agents."

### Day 6: Anchor Program
- [ ] Create Anchor project, define accounts (GlobalConfig, ComputeNode, InferenceBounty, CommitmentSubmission)
- [ ] Implement cohort_selection instruction (slot-hash based)
- [ ] Implement submit_commitment instruction
- [ ] Implement resolve_bounty instruction (stake-weighted raffle)
- [ ] VRF integration (Switchboard)
- [ ] X post: "Day 6: Anchor program deployed. The smart contract IS the router."

### Day 7: Solana Blink
- [ ] Build Solana Action endpoint (action.json + GET/POST)
- [ ] Build roulette animation (framer-motion, spinning nodes)
- [ ] Wire Blink → API → Solana explorer
- [ ] Build cNFT receipt minting on resolution
- [ ] X post: "Day 7: Solana Blink live. Type a prompt. One tap. Three nodes race. Under 3 seconds."

### Day 8: Polish & Docker
- [ ] Docker setup (Dockerfile + docker-compose.yml)
- [ ] End-to-end testing: Blink → API → settlement
- [ ] Polish all pages, fix any bugs
- [ ] API documentation
- [ ] X post: "Day 8: Dockerized. 40+ providers. Solana payments. Launch tomorrow."

### Day 9: Launch
- [ ] Record 60-second demo video
- [ ] Pre-warm all 3 demo nodes
- [ ] Full end-to-end test
- [ ] Submit to EasyA with all required public links
- [ ] Final X post with demo video, tag @EasyA_Kickstart
- [ ] X post: "ChaosCompute is live. 9router's simplicity. Bittensor's architecture. Solana's speed. 🚀"

---

## Success Metrics

| Criteria | Target |
|---|---|
| Token live on Kickstart | Day 9 |
| Supply locked (10-50%) | Day 9 |
| End-to-end demo works | Day 9 |
| API response time in demo | <3 seconds |
| Daily X posts (no gaps) | All 9 days |
| @EasyA_Kickstart tagged | Every post |
| Demo video published | Day 9 |
| Public project site live | Day 8 |
