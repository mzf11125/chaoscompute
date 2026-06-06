# Demo Script — ChaosCompute

## 60-Second Demo

### Scene 1: The Problem (10s)
"Every AI API call goes through a centralized provider. They hold your data, control pricing, and you trust them not to scrape your prompts."

### Scene 2: The Gateway (15s)
"ChaosCompute Phase 1: OpenAI-compatible API. 30 providers. USDC payments via pay.sh."

```bash
pay curl https://gateway.chaoscompute.io/v1/chat/completions \
  -H 'content-type: application/json' \
  -d '{"model":"gpt-5.5","messages":[{"role":"user","content":"Hello"}]}'
```

### Scene 3: The Console (10s)
"Wallet connect. SOL staking for up to 20% off. No API keys."

### Scene 4: The Endgame (20s)
"Phase 2: Decentralized compute. Anyone stakes SOL, runs a TEE node, earns from inference. VRF selects nodes. Blind race prevents cheating. Slashing burns bad actors."

### Scene 5: The Ask (5s)
"ChaosCompute. Decentralized AI compute on Solana. Stake SOL. Run inference. Earn USDC."

## 9-Day Sprint Plan (Hackathon)

### Day 1-2: Foundation
- [x] Project setup, monorepo, CI
- [x] Design system (monochrome, HSL tokens)
- [x] Route structure + layout components

### Day 3-4: Gateway
- [x] CLIProxyAPI integration
- [x] 30 provider definitions
- [x] Model aliases

### Day 5: Payments
- [x] pay.sh integration
- [x] HTTP 402 flow
- [x] chaoscompute.yaml spec

### Day 6: Dashboard
- [x] Wallet connect (Phantom)
- [x] SOL balance → tier detection
- [x] Quickstart code samples

### Day 7: Landing
- [x] Hero section
- [x] How it works
- [x] Competitors comparison
- [x] Community section

### Day 8: SDKs
- [x] Python SDK (chaos-sdk)
- [x] Node.js SDK (@chaoscompute/sdk)

### Day 9: Polish
- [x] Anchor program deployed
- [x] Docs + API reference
- [x] Final QA + screenshots

## Success Metrics

| Metric | Target |
|---|---|
| Gateway responds | < 500ms |
| 30 providers listed | ✅ |
| USDC payment works | ✅ |
| Wallet connect works | ✅ |
| SOL tier detection | ✅ |
| Anchor deployed | ✅ |
