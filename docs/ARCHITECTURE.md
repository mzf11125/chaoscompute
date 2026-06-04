# ChaosCompute — Architecture

## System Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                        Clients                                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐   │
│  │ Developer │  │ AI Agent  │  │  Blink   │  │  Custom App  │   │
│  │ (SDK)     │  │ (Self-pay)│  │  (X post) │  │  (OpenAI SDK) │   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └──────┬───────┘   │
│       │              │             │               │            │
│       └──────────────┴─────────────┴───────────────┘            │
│                          │                                       │
│              POST /v1/chat/completions                           │
│              Authorization: Bearer <JWT>                         │
└──────────────────────────┼──────────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────────┐
│                    Gateway Edge Layer                             │
│                    (Vite + React SPA)                             │
│                                                                   │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────────┐ │
│  │ Auth Middleware  │  │ Rate Limiter    │  │ Request Logger   │ │
│  │ (JWT verify)     │  │ (per wallet)    │  │ (debug mode)     │ │
│  └────────┬────────┘  └────────┬────────┘  └────────┬─────────┘ │
│           │                    │                     │           │
│           └────────────────────┴─────────────────────┘           │
└──────────────────────────┬──────────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────────┐
│                    Router Core                                    │
│                                                                   │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────────┐ │
│  │ Provider Registry│  │ Fallback Engine │  │ Format Translator│ │
│  │ (health checks)  │  │ (chain executor)│  │ (OpenAI↔Claude…) │ │
│  └────────┬────────┘  └────────┬────────┘  └────────┬─────────┘ │
│           │                    │                     │           │
│  ┌────────▼────────────────────▼─────────────────────▼─────────┐ │
│  │                      Provider Pool                           │ │
│  │  ┌────────┐ ┌──────────┐ ┌─────────┐ ┌──────┐ ┌─────────┐  │ │
│  │  │ OpenAI │ │Anthropic │ │Together │ │ Groq │ │ Mistral │  │ │
│  │  └────────┘ └──────────┘ └─────────┘ └──────┘ └─────────┘  │ │
│  └──────────────────────────────────────────────────────────────┘ │
└──────────────────────────┬──────────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────────┐
│                    Settlement Service                             │
│                    (async, non-blocking)                          │
│                                                                   │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────────┐ │
│  │ Token Counter   │  │ USDC Settlement │  │ Spend Logger     │ │
│  │ (post-response) │  │ (Solana memo tx)│  │ (persisted)      │ │
│  └────────┬────────┘  └────────┬────────┘  └────────┬─────────┘ │
│           │                    │                     │           │
│           └────────────────────┴─────────────────────┘           │
└──────────────────────────────────────────────────────────────────┘
```

---

## Auth Flow (Detailed)

### JWT Generation (ChaosSigner)

```python
# packages/sdk/python/chaos_sdk/signer.py
class ChaosSigner:
    def __init__(self, private_key: str):
        self.keypair = Ed25519Keypair.from_base58(private_key)

    def token(self) -> str:
        payload = {
            "wallet_pubkey": self.keypair.public_key.to_base58(),
            "timestamp": int(time.time()),
            "nonce": secrets.token_hex(8),
            "exp": int(time.time()) + 300  # 5 minutes
        }
        signature = self.keypair.sign(json.dumps(payload).encode())
        return jwt.encode({**payload, "sig": signature.hex()}, algorithm=None)
```

### JWT Verification (Gateway)

```typescript
// packages/gateway/src/lib/solana/auth.ts
import { verifyMessage } from '@solana/kit';

export async function verifyChaosJWT(token: string): Promise<{
  wallet: string;
  valid: boolean;
}> {
  const decoded = jwt.decode(token);
  // Verify: expiry not passed, signature from wallet pubkey, nonce not reused
  const message = JSON.stringify({ wallet_pubkey, timestamp, nonce, exp });
  const valid = await verifyMessage(wallet_pubkey, message, signature);
  return { wallet: wallet_pubkey, valid };
}
```

---

## Settlement Flow

```
1. Request arrives → JWT verified → forwarded to provider
2. Provider streams response → streamed to client
3. Response completes → Settlement Service fires (async)
4. Settlement Service:
   a. Counts actual tokens in response
   b. Calculates cost: (tokens × provider_rate) + gateway_margin
   c. Signs and submits Solana USDC transfer (memo transaction)
   d. Logs to spend database
5. If wallet balance < 10 requests runway → fire low-balance warning
```

---

## On-Chain Accounts (Anchor — Core)

```rust
#[account]
pub struct GlobalConfig {
    pub admin: Pubkey,
    pub total_staked: u64,
    pub creator_fee_bps: u16,  // 100 = 1%
}

#[account]
pub struct ComputeNode {
    pub owner: Pubkey,
    pub stake_amount: u64,
    pub active: bool,
    pub tee_attestation_hash: [u8; 32],
}

#[account]
pub struct InferenceBounty {
    pub challenger: Pubkey,
    pub prompt_hash: [u8; 32],     // IPFS/Arweave hash
    pub entry_fee: u64,
    pub cohort: Vec<Pubkey>,       // 3-5 selected nodes
    pub init_slot: u64,
    pub deadline_slot: u64,        // init + 3
    pub status: BountyStatus,
    pub winner: Option<Pubkey>,
}

#[account]
pub struct CommitmentSubmission {
    pub bounty: Pubkey,
    pub node: Pubkey,
    pub commitment_hash: [u8; 32],
    pub submitted_slot: u64,
}

#[derive(AnchorSerialize, AnchorDeserialize)]
pub enum BountyStatus {
    Open,
    CommitPhaseClosed,
    Resolved,
    SlashingDispute,
}
```

---

## Directory Map

```
packages/gateway/src/
├── lib/
│   ├── routing/
│   │   ├── index.ts          ← Routing engine (extracted from 9router)
│   │   ├── providers.ts      ← Provider registry + health checks
│   │   ├── fallback.ts       ← Fallback chain executor
│   │   ├── translator.ts     ← OpenAI ↔ Claude ↔ Gemini format translation
│   │   └── types.ts          ← Shared types
│   ├── solana/
│   │   ├── auth.ts           ← JWT verification, wallet auth
│   │   ├── settlement.ts     ← USDC micropayment, memo transactions
│   │   ├── balance.ts        ← Wallet balance checker
│   │   ├── client.ts         ← @solana/kit client setup
│   │   └── types.ts          ← Solana-specific types
│   └── providers/
│       ├── openai.ts
│       ├── anthropic.ts
│       └── together.ts
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Toast.tsx
│   │   └── index.ts
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── DashboardShell.tsx
│   │   ├── Sidebar.tsx
│   │   └── Footer.tsx
│   └── dashboard/
│       ├── SpendView.tsx
│       ├── RequestLog.tsx
│       ├── ProviderHealth.tsx
│       ├── WalletBalance.tsx
│       └── LowBalanceAlert.tsx
├── pages/
│   ├── Landing/
│   │   ├── Landing.tsx
│   │   ├── HeroSection.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Competitors.tsx
│   │   └── CodeExample.tsx
│   ├── Dashboard/
│   │   └── Dashboard.tsx
│   └── ApiKeys/
│       └── ApiKeys.tsx
├── hooks/
│   ├── useWallet.ts
│   ├── useSpend.ts
│   └── useProviders.ts
├── App.tsx
├── main.tsx
└── index.css
```
