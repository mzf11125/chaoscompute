# ChaosCompute Python SDK

`pip install chaos-sdk`

ChaosCompute uses pay.sh for HTTP 402 USDC payments on Solana. Preferred integration:

```bash
curl -fsSL https://pay.sh/install | sh
pay curl https://gateway.chaoscompute.io/v1/chat/completions \
  -H 'content-type: application/json' \
  -d '{"model":"gpt-5.5","messages":[{"role":"user","content":"Hello"}]}'
```

For Builder+ tier with wallet connect:

```python
from openai import OpenAI
from chaos_sdk import ChaosSigner

signer = ChaosSigner("YOUR_SOLANA_PRIVATE_KEY")
client = OpenAI(
    base_url="https://api.chaoscompute.io/v1",
    api_key=signer.token(),
)
response = client.chat.completions.create(
    model="gpt-5.5",
    messages=[{"role": "user", "content": "Hello"}],
)
```

## Tiers

| Tier | SOL | Discount |
|---|---|---|
| Guest | 0 | 0% (pay.sh only) |
| Builder | 100 | 5% |
| Operator | 500 | 10% |
| Partner | 1000+ | 20% |

See [docs/API.md](../docs/API.md) for full API reference.
