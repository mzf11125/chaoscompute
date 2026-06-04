# ChaosCompute — Roadmap

## Phase 1: Inference Gateway (In Progress)

- [x] pay.sh HTTP 402 payment integration
- [x] CLIProxyAPI routing across 30 providers
- [x] OpenAI-compatible `/v1/chat/completions` endpoint
- [x] Console page (wallet connect, SOL staking tier, quickstart)
- [x] Landing page, Docs, API, Providers pages
- [x] Python SDK (chaos-sdk) + Node.js SDK (@chaoscompute/sdk)
- [x] Anchor program deployed to devnet
- [x] chaoscompute.yaml pay.sh provider spec
- [ ] Provider API keys funded (crowdfunding target)
- [ ] CLIProxyAPI running on production server
- [ ] End-to-end live: pay curl to 402 to routing to response
- [ ] Domain + HTTPS (chaoscompute.io)

## Post-Hackathon (Month 1)

- [ ] Provider API keys funded (OpenAI, Anthropic, DeepSeek, etc.)
- [ ] VPS hosting for CLIProxyAPI + pay.sh gateway
- [ ] pay.sh provider registry submission
- [ ] Mobile responsive polish

## Phase 2: Decentralized Compute (Month 2-3)

- [ ] Native SOL staking contracts (delegation + yield)
- [ ] Core decentralized network beta
- [ ] Node client daemon (Python): RPC listener + commitment pipeline
- [ ] VRF integration (Switchboard or Pyth Entropy)
- [ ] Optimistic slashing with automated referee
- [ ] Permissionless provider onboarding
- [ ] Model capability tiering and filtering

## Month 4-6

- [ ] Multi-chain settlement (Ethereum L2s)
- [ ] SOL-weighted governance for fee parameters
- [ ] Enterprise dedicated cohorts
- [ ] SDK for LangChain / LlamaIndex / AutoGen
- [ ] SLA guarantees + private deployments

## Long-Term (Year 1)

- [ ] Default inference API for AI agents on Solana
- [ ] Core network exceeds 1000 independent GPU providers
- [ ] SOL staking yields sustain a self-regulating compute market
- [ ] Plugin ecosystem: LangChain, LlamaIndex, AutoGen, CrewAI
- [ ] 5+ language SDK support
