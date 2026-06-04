# ChaosCompute — Demo Script & Sprint Plan

## Demo Script (60 seconds)

```
[00:00] Terminal: show pay.sh install command
[00:03] Terminal: pay skills search chaoscompute
[00:06] Terminal: pay curl to chat completions endpoint
[00:08] Show 402 Payment Required response
[00:10] pay.sh auto-signs, replays request
[00:12] Response streams from best available provider
[00:17] Point at Solana Explorer — settlement transaction visible
[00:22] Switch to Gateway Status page — live request log updated
[00:28] Show Provider Health — 9 providers online via CLIProxyAPI
[00:35] Show Phase 1/Phase 2 roadmap
[00:45] "Phase 1 delivers inference today. Phase 2 replaces routing entirely
        with a game-theoretic compute market."
[00:60] End
```

## 9-Day Sprint Plan

### Day 1: Foundation
- [ ] Scaffold Vite + React + TypeScript + Tailwind CSS v4
- [ ] Set up HSL token design system (Inter + Instrument Serif)
- [ ] Install pay.sh, test with sandbox
- [ ] X post: "Building ChaosCompute. 9 days. @EasyA_Kickstart"

### Day 2: pay.sh Integration
- [ ] Create chaoscompute.yaml provider spec
- [ ] Test pay --sandbox server start chaoscompute.yaml
- [ ] Verify HTTP 402 challenge/proof/settlement flow
- [ ] X post: "Day 2: pay.sh HTTP 402 payments working."

### Day 3: Routing + Providers
- [ ] Extract 9router routing logic into src/lib/routing/
- [ ] Register 20+ real providers from CLIProxyAPI
- [ ] Build fallback chain executor
- [ ] X post: "Day 3: 20+ providers routed via CLIProxyAPI."

### Day 4: Dashboard + Status
- [ ] Build ProviderHealth, SpendView, RequestLog components
- [ ] Create Gateway Status page with Phase 1/2 roadmap
- [ ] X post: "Day 4: Gateway status dashboard live."

### Day 5: Landing Page
- [ ] Build HeroSection (parallax, liquid glass)
- [ ] Build HowItWorks, SecuritySection, Competitors, CodeExample
- [ ] X post: "Day 5: Landing page live."

### Day 6: SDKs
- [ ] Python SDK: pay.sh docs + ChaosSigner fallback
- [ ] Node.js SDK: same pattern
- [ ] X post: "Day 6: SDKs published."

### Day 7: Anchor Program
- [ ] Create Anchor project: GlobalConfig, ComputeNode, InferenceBounty, CommitmentSubmission
- [ ] Implement cohort selection, VRF raffle, slashing
- [ ] X post: "Day 7: Anchor program deployed."

### Day 8: Polish & Docs
- [ ] All .md files updated (README, AGENTS, CLAUDE, CONTEXT, docs/)
- [ ] Bastion Agentique branding added
- [ ] API documentation, competitive matrix
- [ ] Docker setup
- [ ] X post: "Day 8: Documentation complete."

### Day 9: Launch
- [ ] Record 60-second demo video
- [ ] Full end-to-end test
- [ ] Submit to EasyA with all required links
- [ ] Final X post with demo video

## Success Metrics

| Criteria | Target |
|---|---|
| pay.sh provider spec valid | Day 2 |
| 20+ providers registered | Day 3 |
| End-to-end demo works | Day 9 |
| Demo video published | Day 9 |
| Daily X posts | All 9 days |
