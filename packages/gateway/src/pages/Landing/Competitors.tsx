import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'

const competitors = [
  {
    name: 'Akash Network', status: 'GPU Marketplace',
    honestTake: 'Proved demand for decentralized compute. Real network. $AKT has real utility. But no game theory — garbage output = no penalty.',
    ourEdge: 'TEE encryption + VRF selection + blind race + optimistic slashing. Game-theoretic security that Akash lacks.',
  },
  {
    name: 'IO.net', status: 'GPU Aggregator',
    honestTake: 'Fast growth. Real hardware. Backed by VC. But centralized scheduler controls allocation.',
    ourEdge: 'Decentralized VRF selection. No central scheduler. TEE attestation. Optimistic slashing. IO.net controls who gets work.',
  },
  {
    name: 'Bittensor', status: 'Vision Aligned',
    honestTake: 'Proved decentralized AI works. Real subnets. Billions in market cap. But complex subnet model.',
    ourEdge: 'OpenAI-compatible API today. Same architecture. Usable in 5 minutes. Bittensor requires subnet participation.',
  },
  {
    name: 'OpenRouter', status: 'API Router',
    honestTake: '300+ models, $113M raised. Best routing today. But they route to providers — they ARE not the provider.',
    ourEdge: 'We don\'t route to providers. We ARE the provider. Non-custodial. Own your compute. OpenRouter can never decentralize.',
  },
]

export function Competitors() {
  return (
    <section className="py-28">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }} className="text-center mb-16">
          <p className="text-muted-foreground text-xs uppercase tracking-widest mb-4">Honest Competitive Positioning</p>
          <h2 className="text-4xl font-semibold text-foreground mb-4 tracking-tight">The market exists. Heres where we actually fit.</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Were not the biggest. Were not the cheapest. Were the only ones with game-theoretic security on Solana.</p>
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
