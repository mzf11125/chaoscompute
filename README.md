# ChaosCompute

**9router's simplicity. Bittensor's architecture. Solana's speed.**

ChaosCompute is an AI inference gateway with Solana-native per-request payments. Swap two lines of code. Your agent self-pays from its own wallet. No subscriptions. No credit top-ups. No custodial risk.

## Products

| Product | Status | Description |
|---|---|---|
| **Gateway** | Building | Managed inference router. 40+ providers. OpenAI-compatible API. Solana USDC payments per request. |
| **Core** | Planned | Decentralized compute market. Anyone's GPU. On-chain settlement. Stake-weighted racing. |

## Quick Start

```bash
# Install
git clone https://github.com/protocoldaemon-sec/chaoscompute.git
cd chaoscompute
pnpm install

# Run Gateway
pnpm --filter gateway dev
# → http://localhost:20128

# Use it
pip install chaos-sdk
```

```python
from openai import OpenAI
from chaos_sdk import ChaosSigner

client = OpenAI(
    base_url="https://gateway.chaoscompute.io/v1",
    api_key=ChaosSigner("YOUR_SOLANA_PRIVATE_KEY").token()
)

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Hello"}]
)
```

## Docs

- [`docs/PRD.md`](docs/PRD.md) — Full PRD (Core + Gateway)
- [`docs/PRD-GATEWAY.md`](docs/PRD-GATEWAY.md) — Gateway sub-product PRD
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — Technical architecture
- [`docs/COMPETITIVE.md`](docs/COMPETITIVE.md) — Competitive positioning
- [`docs/API.md`](docs/API.md) — API reference

## License

MIT
