import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'

const competitors = [
  {
    name: 'Jatevo', status: 'Solana-native',
    honestTake: 'Token-gated daily quota from JTVO holdings. Familiar UX for Solana devs. 5 models in playground.',
    ourEdge: 'SOL staking for real discounts, not a proprietary token quota. USDC settlement via pay.sh. No unused quota wasted. No new token needed.',
  },
  {
    name: 'OpenRouter', status: 'Leader',
    honestTake: '300+ models, $113M raised, 25T tokens/week. If you just need the cheapest call today, use OpenRouter.',
    ourEdge: 'SOL staking for up to 20% off. Wallet-based auth. No credit deposits. Built-in Phase 2 upgrade path. OpenRouter can never decentralize.',
  },
  {
    name: '9router', status: 'Similar stack',
    honestTake: 'We literally forked 9router. Same routing engine. Same RTK token saver.',
    ourEdge: 'Cloud hosted. SOL staking tiers. API keys for teams. Direct USDC billing. Phase 2 upgrade path.',
  },
  {
    name: 'Bittensor', status: 'Vision aligned',
    honestTake: 'They proved decentralized compute works. Real subnets. Billions in market cap.',
    ourEdge: 'OpenAI-compatible API today. Same Phase 2 architecture. SOL staking for tiered access. Usable in 5 minutes.',
  },
]

export function Competitors() {
  return (
    <section className="py-28">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }} className="text-center mb-16">
          <p className="text-muted-foreground text-xs uppercase tracking-widest mb-4">Honest Competitive Positioning</p>
          <h2 className="text-4xl font-semibold text-foreground mb-4 tracking-tight">The market exists. Heres where we actually fit.</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Were not the biggest. Were not the cheapest. Were the only one with SOL staking tiers and a built-in Phase 2 upgrade.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {competitors.map((c, i) => (
            <motion.div key={c.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.1 }}>
              <Card className="h-full">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-foreground font-semibold text-lg">{c.name}</h3>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider bg-card px-2 py-0.5 rounded border border-border">{c.status}</span>
                </div>
                <p className="text-muted-foreground text-sm mb-3 leading-relaxed">{c.honestTake}</p>
                <p className="text-foreground text-sm leading-relaxed">Why us: {c.ourEdge}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
