# ChaosCompute Python SDK

`pip install chaos-sdk`

Swap two lines of code. Your Solana wallet pays the bill — per request, at execution time.

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

- **Zero credentials stored** — ephemeral JWT, 5-minute expiry
- **Non-custodial** — your wallet signs per request
- **OpenAI-compatible** — drop-in replacement, existing code works unchanged
- **Auto-refresh** — generate a fresh token before every call
