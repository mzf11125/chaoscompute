import Card from '@/components/ui/Card'

const CODE = `curl -fsSL https://pay.sh/install | sh
pay curl https://gateway.chaoscompute.io/v1/chat/completions \\
  -H 'content-type: application/json' \\
  -d '{"model":"gpt-5.5","messages":[...]}'`

const steps = [
  { step: 1, title: 'Connect wallet', desc: 'Phantom or Solflare. Your wallet is your API key. Tier auto-detected from balance.' },
  { step: 2, title: 'Stake SOL for tier', desc: '100/500/1000 SOL = 5/10/20% discount. More SOL staked = lower per-token cost.' },
  { step: 3, title: 'Call any model', desc: 'pay.sh for Guest tier. Direct USDC settlement for Builder+. 30 providers. Same URL.' },
]

export function Quickstart() {
  return (
    <Card padding="lg">
      <h2 className="text-foreground font-semibold mb-4">Quickstart</h2>
      <div className="space-y-3 mb-4">
        {steps.map((s) => (
          <div key={s.step} className="flex gap-3">
            <span className="w-6 h-6 rounded-full bg-foreground/10 text-foreground flex items-center justify-center text-xs font-bold shrink-0">{s.step}</span>
            <div>
              <p className="text-foreground text-sm font-medium">{s.title}</p>
              <p className="text-muted-foreground text-xs">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <pre className="bg-surface-input rounded-xl p-4 text-xs text-foreground overflow-x-auto leading-relaxed font-mono">
        <code>{CODE}</code>
      </pre>
    </Card>
  )
}
