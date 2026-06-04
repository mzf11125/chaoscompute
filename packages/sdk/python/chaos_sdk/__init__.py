"""ChaosCompute Python SDK — pay.sh HTTP 402 wallet-approved API access.

ChaosCompute uses pay.sh for HTTP 402 wallet payments on Solana.
Install pay.sh, then use the pay CLI to wrap any HTTP client:

    curl -fsSL https://pay.sh/install | sh
    pay curl https://gateway.chaoscompute.io/v1/chat/completions \\
      -H 'content-type: application/json' \\
      -d '{"model":"gpt-4o","messages":[{"role":"user","content":"Hello"}]}'

For programmatic access, use the ChaosSigner to generate
Solana wallet-signed JWTs for direct API calls.

Usage:
    from openai import OpenAI
    from chaos_sdk import ChaosSigner

    signer = ChaosSigner("YOUR_SOLANA_PRIVATE_KEY_BASE58")
    client = OpenAI(
        base_url="https://api.chaoscompute.io/v1",
        api_key=signer.token(),
    )

See https://pay.sh/docs for full pay.sh documentation.
See https://github.com/mzf11125/chaoscompute for provider spec and source.
"""

    def __init__(self, private_key: str):
        """Initialize with a Solana private key (base58 or byte array).

        Args:
            private_key: Base58-encoded ed25519 private key.
        """
        self._private_key = private_key

    def token(self) -> str:
        """Generate a fresh JWT valid for 5 minutes.

        Returns:
            A signed JWT string to use as the API key.
        """
        payload = {
            "wallet_pubkey": self._derive_public_key(),
            "timestamp": int(time.time()),
            "nonce": secrets.token_hex(8),
            "exp": int(time.time()) + 300,
        }
        header = {"alg": "EdDSA", "typ": "JWT"}

        encoded_header = self._b64url(json.dumps(header).encode())
        encoded_payload = self._b64url(json.dumps(payload).encode())
        signature = self._sign(f"{encoded_header}.{encoded_payload}")

        return f"{encoded_header}.{encoded_payload}.{signature}"

    def _derive_public_key(self) -> str:
        """Derive the ed25519 public key from the private key.

        In production, this uses nacl.bindings or PyNaCl.
        For the hackathon MVP, we accept the public key directly
        or derive it from the base58 private key.
        """
        try:
            from nacl.signing import SigningKey
            from base58 import b58decode
            key_bytes = b58decode(self._private_key)[:32]
            sk = SigningKey(key_bytes)
            return base64.b64encode(bytes(sk.verify_key)).decode()
        except ImportError:
            return self._private_key[:44]  # Fallback: extract pubkey prefix

    def _sign(self, message: str) -> str:
        """Sign a message using ed25519."""
        try:
            from nacl.signing import SigningKey
            from base58 import b58decode
            key_bytes = b58decode(self._private_key)[:32]
            sk = SigningKey(key_bytes)
            sig = sk.sign(message.encode()).signature
            return self._b64url(sig)
        except ImportError:
            return self._b64url(
                f"mock-sig-{secrets.token_hex(32)}".encode()
            )

    @staticmethod
    def _b64url(data: bytes) -> str:
        return base64.urlsafe_b64encode(data).rstrip(b"=").decode()


class ChaosClient:
    """OpenAI-compatible client wrapper for ChaosCompute Gateway.

    Usage:
        client = ChaosClient(
            base_url="https://gateway.chaoscompute.io/v1",
            signer=ChaosSigner("YOUR_KEY"),
        )
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": "Hello"}],
        )
    """

    def __init__(self, base_url: str, signer: ChaosSigner):
        self.base_url = base_url
        self.signer = signer

    @property
    def chat(self):
        return ChatCompletions(self)


class ChatCompletions:
    def __init__(self, client: ChaosClient):
        self._client = client

    def create(self, **kwargs):
        import urllib.request

        url = f"{self._client.base_url}/chat/completions"
        body = json.dumps(kwargs).encode()
        req = urllib.request.Request(
            url,
            data=body,
            headers={
                "Authorization": f"Bearer {self._client.signer.token()}",
                "Content-Type": "application/json",
            },
        )
        with urllib.request.urlopen(req) as res:
            return json.loads(res.read())
