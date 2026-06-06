# ChaosCompute Python SDK

`pip install chaos-sdk`

ChaosCompute is a decentralized AI inference network on Solana. This SDK provides programmatic access to the API.

## Quick Start

```bash
curl -fsSL https://pay.sh/install | sh
pay curl https://gateway.chaoscompute.io/v1/chat/completions \
  -H 'content-type: application/json' \
  -d '{"model":"gpt-5.5","messages":[{"role":"user","content":"Hello"}]}'
```

## Programmatic Access

```python
from openai import OpenAI
from chaos_sdk import ChaosSigner

signer = ChaosSigner("YOUR_SOLANA_PRIVATE_KEY")
client = OpenAI(
    base_url="https://gateway.chaoscompute.io/v1",
    api_key=signer.token(),
)
response = client.chat.completions.create(
    model="gpt-5.5",
    messages=[{"role": "user", "content": "Hello"}],
)
```

## Node Operator SDK (Coming Soon)

```python
from chaos_sdk import ChaosNode

node = ChaosNode(
    wallet="YOUR_SOLANA_PRIVATE_KEY",
    tee_endpoint="https://your-tee-node:8080",
)

# Register node with TEE attestation
node.register(stake_amount=100_000_000_000)

# Start earning from inference jobs
node.start()
```

## Tiers

| Tier | SOL | Discount |
|---|---|---|
| Free | 0 | 0% (pay.sh only) |
| Standard | 100 | 5% |
| Pro | 500 | 10% |
| Enterprise | 1000+ | 20% |

See [docs/API.md](../docs/API.md) for full API reference.
