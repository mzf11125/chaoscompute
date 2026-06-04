import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'

const competitors = [
  {
    name: 'OpenRouter',
    status: 'Leader',
    honestTake: '300+ models, $113M raised, 25T tokens/week. If you just need the cheapest GPT-4o call today, use OpenRouter.',
    ourEdge: 'Non-custodial HTTP 402. No credit deposit. No top-up fee. And OpenRouter can never decentralize — Phase 2 gives us that structural advantage.',
  },
  {
    name: 'Jatevo',
    status: 'Solana-native',
    honestTake: 'Also Solana-native. Daily quota from JTVO token holdings. Familiar UX for Solana devs.',
    ourEdge: 'Pay per token not per day. Unused capacity isnt wasted. Plus Phase 2 replaces centralized scheduling entirely.',
  },
  {
    name: '9router',
    status: 'Similar stack',
    honestTake: 'We literally forked 9router. Same routing engine. Same RTK token saver. Same format translation.',
    ourEdge: 'Cloud hosted. pay.sh HTTP 402 payments. Built in Phase 2 upgrade path. No local proxy to maintain.',
  },
  {
    name: 'Bittensor',
    status: 'Vision aligned',
    honestTake: 'They proved the decentralized compute market works. Real subnets. Billions in market cap.',
    ourEdge: 'OpenAI compatible API today, not months of subnet setup. Same architecture as Phase 2, usable in 5 minutes today.',
  },
]

export function Competitors() {
  return (
    <section className="py-28">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-center mb-16">
          <p className="text-muted-foreground text-xs uppercase tracking-widest mb-4">Honest Competitive Positioning</p>
          <h2 className="text-4xl font-semibold text-foreground mb-4 tracking-tight">The market exists. Heres where we actually fit.</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Were not the biggest. Were not the cheapest. Were the only one with a structurally built in Phase 2 — decentralized compute funded by Phase 1 revenue.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {competitors.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.1 }}>
              <Card className="h-full">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-foreground font-semibold text-lg">{c.name}</h3>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider bg-card px-2 py-0.5 rounded border border-border">
                    {c.status}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm mb-3 leading-relaxed">{c.honestTake}</p>
                <p className="text-foreground text-sm leading-relaxed">
                  Why us: {c.ourEdge}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
