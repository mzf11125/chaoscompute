import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'

export function HowItWorks() {
  const steps = [
    { title: 'Connect Wallet', desc: 'Connect Phantom or Solflare. Your wallet is your identity. No API keys to manage.' },
    { title: 'Stake for Tier', desc: '100/500/1000 SOL = 5/10/20% discount. Tier auto-detected from wallet balance. Staking contracts coming in Phase 2.' },
    { title: 'Call Any Model', desc: 'OpenAI-compatible. USDC settles per request via pay.sh. Same URL for every provider across all tiers.' },
  ]

  return (
    <section className="py-28">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }} className="text-center mb-16">
          <p className="text-muted-foreground text-xs uppercase tracking-widest mb-4">How It Works</p>
          <h2 className="text-4xl font-semibold text-foreground mb-4 tracking-tight">Three steps. Your wallet is the key.</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Wallet auth replaces API keys. SOL staking unlocks discounts. USDC settles every request.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {steps.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.1 }}>
              <Card className="h-full">
                <div className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center mb-4"><span className="text-foreground font-bold text-sm">{i + 1}</span></div>
                <h3 className="text-foreground font-semibold mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            { label: 'Phase 1 · Shipping', title: 'Inference Gateway', desc: 'CLIProxyAPI routing with pay.sh USDC payments. 30+ providers. Guest tier works with just pay.sh.', color: 'bg-success/20 text-success' },
            { label: 'Phase 2 · Roadmap', title: 'Decentralized Compute', desc: "Game theory replaces routing. Stake-weighted VRF racing. Blind race. Optimistic slashing. Native SOL staking contracts.", color: 'bg-accent/20 text-accent' },
          ].map((phase) => (
            <Card key={phase.title} padding="lg">
              <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider mb-4 ${phase.color}`}>{phase.label}</span>
              <h3 className="text-foreground font-semibold mb-2">{phase.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{phase.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
