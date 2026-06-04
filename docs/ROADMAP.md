# ChaosCompute — Roadmap

## Phase 1: Inference Gateway (Live)

- [x] pay.sh HTTP 402 payment integration
- [x] CLIProxyAPI routing across 20+ providers
- [x] OpenAI-compatible `/v1/chat/completions` endpoint
- [x] Gateway Status page (ProviderHealth, SpendView, RequestLog)
- [x] Landing page, Docs, API, Providers pages
- [x] Python SDK (chaos-sdk) + Node.js SDK (@chaoscompute/sdk)
- [x] Anchor program skeleton (cohort selection, VRF, slashing)
- [x] chaoscompute.yaml pay.sh provider spec

## Post-Hackathon (Month 1)

- [ ] Full 40+ provider integrations from CLIProxyAPI/9router
- [ ] Bastion Agentique integration (transaction simulation)
- [ ] Real TEE enforcement (Intel SGX / NVIDIA Confidential Computing)
- [ ] Provider dashboard UI for API key management
- [ ] Mobile responsive polish
- [ ] pay.sh provider registry submission

## Phase 2: Decentralized Compute (Month 2-3)

- [ ] Core decentralized network beta
- [ ] Node client daemon (Python): RPC listener + commitment pipeline
- [ ] VRF integration (Switchboard or Pyth Entropy)
- [ ] Optimistic slashing with automated referee
- [ ] Token launch + staking pool
- [ ] Permissionless provider onboarding
- [ ] Model capability tiering and filtering

## Month 4-6

- [ ] Multi-chain settlement (Ethereum L2s)
- [ ] DAO governance for fee parameters
- [ ] Enterprise dedicated cohorts
- [ ] SDK for LangChain / LlamaIndex / AutoGen
- [ ] Bastion Agentique full integration (policy engine, audit, pause)
- [ ] SLA guarantees + private deployments
- [ ] Agent-native billing dashboard

## Long-Term (Year 1)

- [ ] ChaosCompute becomes the default inference API for AI agents on Solana
- [ ] Core network exceeds 1000 independent GPU providers
- [ ] Token economics sustain a self-regulating compute market
- [ ] Plugin ecosystem: LangChain, LlamaIndex, AutoGen, CrewAI
- [ ] 5+ language SDK support
