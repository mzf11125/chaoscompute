import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'

export function Competitors() {
  const data = [
    { name: 'OpenRouter', flaw: 'Custodial credits, 5.5% top-up fee, centralized', answer: 'Non-custodial HTTP 402. Wallet signs per token. No credit deposit. pay.sh handles settlement.' },
    { name: 'Jatevo', flaw: 'Token-gated daily quota, unused capacity wasted', answer: 'Pay per token via pay.sh HTTP 402. Pay for what you use, nothing more.' },
    { name: '9router', flaw: 'Local proxy, no payment layer, requires your own API keys', answer: 'Cloud-hosted. pay.sh handles wallet payments. No API keys needed.' },
    { name: 'Bittensor', flaw: 'Custom L1, complex UX, weeks to integrate', answer: 'OpenAI-compatible. Discoverable via pay.sh registry. Phase 2 brings same decentralized architecture.' },
  ]

  return (
    <section className="py-28">
      <div className="max-w-6xl mx-auto px-8 md:px-28">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }} className="text-center mb-16">
          <p className="text-muted-foreground text-xs uppercase tracking-widest mb-4">Competitive Positioning</p>
          <h2 className="text-4xl font-semibold text-foreground mb-4 tracking-tight">The market exists. We fix what they broke.</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Every competitor proved demand. Every competitor has a structural flaw that HTTP 402 wallet payments eliminate.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {data.map((c, i) => (
            <motion.div key={c.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.1 }}>
              <Card className="h-full">
                <h3 className="text-foreground font-semibold text-lg mb-3">{c.name}</h3>
                <p className="text-error/80 text-sm mb-2"><span className="text-muted-foreground">Their flaw:</span> {c.flaw}</p>
                <p className="text-success/80 text-sm"><span className="text-muted-foreground">Our answer:</span> {c.answer}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
