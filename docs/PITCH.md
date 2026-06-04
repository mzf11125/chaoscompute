# ChaosCompute — 60-Second Pitch Script

*"Every AI agent being built right now calls an inference API. OpenAI, Anthropic, OpenRouter — they all work the same way. You hand your money and your data to a company, they route your request to their servers, you hope they stay online.*

*ChaosCompute is a two-line change that removes the company from that equation.*

*[SHOW THE CODE SWAP]*

*That's it. Your existing agent code works. But now, instead of calling OpenAI's server, you're broadcasting a bounty onto Solana. Three GPU nodes — anywhere in the world — race to answer your prompt in parallel. A cryptographic raffle picks the winner. The smart contract pays them out. You get your answer.*

*There is no router. No scheduler. No company holding your funds. The smart contract is the router.*

*[SHOW THE BLINK DEMO]*

*For the demo — here's the same thing as a Solana Blink. Type a prompt. Approve one transaction. Watch three nodes race. Under three seconds.*

*The supply side is open. Anyone with a GPU can stake our token and join. Solo RTX 4090 in your bedroom competes with a Frankfurt data center. Market pricing drives cost to the floor.*

*9router's simplicity. Bittensor's architecture. Solana's speed. ChaosCompute."*

---

## Alternate: 30-Second Elevator Pitch

*"ChaosCompute is what 9router would be if it were built on Solana with non-custodial per-request payments. Two lines of code. Your agent self-pays from its own wallet. No subscriptions, no credits, no company holding your money. Gateway ships today. Core — the decentralized market — ships next."*

---

## Key Lines (Memorize These)

1. "The smart contract is the router."
2. "Two lines of code. Your agent self-pays."
3. "Non-custodial by design. Your wallet signs per request."
4. "9router's simplicity. Bittensor's architecture. Solana's speed."
5. "Gateway is what you ship today. Core is where we're going."

---

## Handling Tough Questions

**Q: "How is this different from OpenRouter?"**
A: "OpenRouter holds your money. We don't. Your wallet signs per request. Nothing deposited anywhere. Plus we have a direct upgrade path to a decentralized compute market — which OpenRouter structurally cannot offer."

**Q: "What if the nodes return garbage?"**
A: "Optimistic slashing. The user can submit a fraud proof within 10 blocks. The accused node must reveal its execution trace. If it can't — entire stake burned. The collateral is real, so the threat is credible."

**Q: "Why would nodes waste compute for a chance to win?"**
A: "They're not wasting it. Idle GPUs cost money sitting there. The raffle is a lottery where every ticket is a real inference job. Over time, winning frequency × average payout > marginal electricity cost. The math works."

**Q: "What about latency? 400ms + inference time is slower than direct."**
A: "For the Gateway product, latency is identical to any other router — we proxy directly. For Core, the 3-node race adds ~100ms for the parallel execution window, but you get redundancy and censorship resistance in return."
