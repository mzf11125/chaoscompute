import { DashboardShell } from '@/components/layout/DashboardShell'
import Card from '@/components/ui/Card'
import { ArrowRight, Terminal, Globe, Shield, ExternalLink } from 'lucide-react'

const QUICKSTART = `curl -fsSL https://pay.sh/install | sh
pay --sandbox server start chaoscompute.yaml
pay --sandbox curl http://127.0.0.1:1402/v1/chat/completions \\
  -H 'content-type: application/json' \\
  -d '{"model":"gpt-5.5","messages":[{"role":"user","content":"Hello"}]}'`

export default function Docs() {
  return (
    <DashboardShell>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Documentation</h1>
        <p className="text-muted-foreground text-sm mt-1">
          ChaosCompute: Decentralized AI inference on Solana. TEE nodes. VRF selection. Blind race. Slashing.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <Card padding="lg">
          <Terminal size={24} className="text-accent mb-4" aria-hidden="true" />
          <h2 className="text-foreground font-semibold mb-2">Quickstart</h2>
          <p className="text-muted-foreground text-sm mb-4">
            Install pay.sh and make your first wallet-approved API call in under 5 minutes.
          </p>
          <pre className="bg-card rounded-xl p-4 text-xs text-foreground overflow-x-auto mb-4 leading-relaxed"><code>{QUICKSTART}</code></pre>
          <a href="https://pay.sh/docs/get-started/install" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-accent text-sm hover:underline">
            Full install guide <ArrowRight size={14} aria-hidden="true" />
          </a>
        </Card>

        <Card padding="lg">
          <Shield size={24} className="text-accent mb-4" aria-hidden="true" />
          <h2 className="text-foreground font-semibold mb-2">HTTP 402 Payment Flow</h2>
          <p className="text-muted-foreground text-sm mb-4">
            Calling the Gateway without pay.sh returns 402 Payment Required. pay.sh handles the handshake automatically.
          </p>
          <div className="grid sm:grid-cols-3 gap-3 text-sm mb-4">
            {[
              { step: '1', title: 'Challenge', desc: 'Gateway returns 402 with amount, recipient, and nonce.' },
              { step: '2', title: 'Proof', desc: 'pay.sh signs a USDC transfer authorization from your wallet locally.' },
              { step: '3', title: 'Settle', desc: 'Gateway broadcasts the signed transfer, confirms on Solana, returns response.' },
            ].map((s) => (
              <div key={s.step} className="flex gap-2">
                <span className="text-accent font-bold text-sm shrink-0">{s.step}.</span>
                <div><p className="text-foreground font-medium text-sm mb-0.5">{s.title}</p><p className="text-muted-foreground text-xs">{s.desc}</p></div>
              </div>
            ))}
          </div>
          <a href="https://pay.sh/docs/building-with-pay/getting-started" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-accent text-sm hover:underline">
            pay.sh payment docs <ArrowRight size={14} aria-hidden="true" />
          </a>
        </Card>

        <Card padding="lg">
          <Shield size={24} className="text-foreground mb-4" aria-hidden="true" />
          <h2 className="text-foreground font-semibold mb-2">Pricing</h2>
          <p className="text-muted-foreground text-sm mb-4">
            USDC per token. Provider cost + 5% margin. SOL staking unlocks tier discounts.
          </p>
          <div className="space-y-2 text-xs mb-4">
            {[
              ['Premium', 'OpenAI gpt-5.5', '$5.00', '$5.25'],
              ['Cheap', 'DeepSeek v4-flash', '$0.14', '$0.147'],
              ['Cheap', 'Xiaomi MiMo v2.5', '$0.14', '$0.147'],
              ['Free', 'Groq Llama 4 Scout', '$0', '$0'],
            ].map(([tier, p, cost, total]) => (
              <div key={p} className="flex items-center justify-between py-1 border-b border-border last:border-0">
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-1.5 py-0.5 rounded ${tier === 'Premium' ? 'bg-foreground/10' : tier === 'Cheap' ? 'bg-warning/20' : 'bg-success/20'} text-foreground`}>{tier}</span>
                  <span className="text-foreground">{p}</span>
                </div>
                <span className="text-muted-foreground font-mono">{cost} + 5% = {total}</span>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-xs">Per 1M input tokens. Revenue funds Phase 2 development.</p>
        </Card>

        <Card padding="lg">
          <h2 className="text-foreground font-semibold mb-2">Compute Network</h2>
          <p className="text-muted-foreground text-sm mb-4">
            The endgame: a fully decentralized compute market where anyone's GPU competes.
            Game theory replaces routing algorithms.
          </p>
          <div className="space-y-2 text-xs mb-4">
            {[
              'TEE encryption. All inference in Trusted Execution Environments.',
              'VRF selection. Stake-weighted raffle with sqrt(stake).',
              'Blind race. Commit-reveal prevents front-running.',
              'Optimistic slashing. Fraud proof with bond + counter-proof.',
              'Non-custodial. Wallet IS the identity. No API keys.',
              'USDC settlement. Per token. On-chain.',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 py-1 border-b border-border last:border-0">
                <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-xs italic mb-4">
            "The smart contract is the router. No one decides who runs your prompt. The protocol does."
          </p>
          <a href="https://github.com/mzf11125/chaoscompute" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-accent text-sm hover:underline">
            Anchor program on GitHub <ArrowRight size={14} aria-hidden="true" />
          </a>
        </Card>

        <Card padding="lg">
          <Globe size={24} className="text-accent mb-4" aria-hidden="true" />
          <h2 className="text-foreground font-semibold mb-2">Provider Spec</h2>
          <p className="text-muted-foreground text-sm mb-4">
            ChaosCompute is defined as a pay.sh provider in <code className="text-accent text-xs">chaoscompute.yaml</code>.
          </p>
          <pre className="bg-card rounded-xl p-4 text-xs text-foreground overflow-x-auto mb-4 leading-relaxed">
            <code>{`name: chaoscompute
category: ai_ml
routing:
  type: proxy
  url: https://api.openai.com
endpoints:
  - method: POST
    path: v1/chat/completions
    metering:
      dimensions:
        - direction: input
          unit: tokens
          scale: 1M
          tiers:
            - price_usd: 0.50`}</code>
          </pre>
        </Card>
      </div>

      <Card padding="lg">
        <ExternalLink size={24} className="text-accent mb-4" aria-hidden="true" />
        <h2 className="text-foreground font-semibold mb-2">Resources</h2>
        <nav className="grid sm:grid-cols-2 gap-2 text-sm" aria-label="External resources">
          {[
            ['pay.sh Install', 'https://pay.sh/docs/get-started/install'],
            ['pay.sh Building Guide', 'https://pay.sh/docs/building-with-pay/getting-started'],
            ['Provider YAML Spec', 'https://pay.sh/docs/building-with-pay/yaml-specification'],
            ['API Reference', '/api'],
            ['Compute Nodes', '/nodes'],
            ['Marketplace', '/marketplace'],
            ['Run a Node', '/operators'],
            ['ChaosCompute GitHub', 'https://github.com/mzf11125/chaoscompute'],
          ].map(([label, href]) => (
            <a key={label} href={href} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground motion-safe:transition-colors py-1.5 focus-visible:ring-2 focus-visible:ring-accent/50 outline-none rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />{label}
            </a>
          ))}
        </nav>
      </Card>
    </DashboardShell>
  )
}
