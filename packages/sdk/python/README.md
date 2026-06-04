# ChaosCompute Python SDK

`pip install chaos-sdk`

ChaosCompute uses pay.sh for HTTP 402 wallet payments. Preferred integration:

```bash
curl -fsSL https://pay.sh/install | sh
pay curl https://gateway.chaoscompute.io/v1/chat/completions \
  -H 'content-type: application/json' \
  -d '{"model":"gpt-4o","messages":[{"role":"user","content":"Hello"}]}'
```

For programmatic access without pay.sh:

```python
from openai import OpenAI
from chaos_sdk import ChaosSigner

signer = ChaosSigner("YOUR_SOLANA_PRIVATE_KEY")
client = OpenAI(
    base_url="https://api.chaoscompute.io/v1",
    api_key=signer.token(),
)
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Hello"}],
)
```

## Features

- **pay.sh HTTP 402** — preferred: `pay curl` handles auth automatically
- **ChaosSigner fallback** — programmatic JWT from Solana keypair
- **OpenAI-compatible** — drop-in replacement, existing code works unchanged
- **Non-custodial** — never deposit into anyone's account

See [docs/API.md](../docs/API.md) for full API reference.
