import { motion, useReducedMotion } from 'framer-motion'
import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'

const competitors = [
  {
    name: 'OpenRouter',
    theirFlaw: 'Custodial credits, 5.5% top-up fee, centralized routing',
    ourAnswer: 'Non-custodial HTTP 402. Wallet signs per token. No credit deposit. pay.sh handles settlement.',
  },
  {
    name: 'Jatevo',
    theirFlaw: 'Token-gated daily quota, unused capacity wasted',
    ourAnswer: 'Pay per token via pay.sh HTTP 402. Pay for what you use, nothing more.',
  },
  {
    name: '9router',
    theirFlaw: 'Local proxy, no payment layer, requires your own API keys',
    ourAnswer: 'Cloud-hosted. pay.sh handles wallet payments. No API keys needed.',
  },
  {
    name: 'Bittensor',
    theirFlaw: 'Custom L1, complex UX, weeks to integrate',
    ourAnswer: 'OpenAI-compatible API. Discoverable via pay.sh registry. 5-minute integration.',
  },
]

export function Competitors() {
  const prefersReduced = useReducedMotion() ?? false

  return (
    <section className="py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={prefersReduced ? undefined : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={prefersReduced ? { duration: 0 } : { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-center mb-16"
        >
          <p className="text-text-muted text-xs uppercase tracking-widest mb-4">Competitive Positioning</p>
          <h2 className="text-4xl font-bold text-text-primary mb-4">The market exists. We fix what they broke.</h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Every competitor proved demand. Every competitor has a structural flaw that HTTP 402 wallet payments eliminate.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {competitors.map((comp, i) => (
            <motion.div
              key={comp.name}
              initial={prefersReduced ? undefined : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={prefersReduced ? { duration: 0 } : { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.1 }}
            >
              <Card className="h-full">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-text-primary font-semibold text-lg">{comp.name}</h3>
                  <Badge variant="warning">incumbent</Badge>
                </div>
                <p className="text-error/80 text-sm mb-2">
                  <span className="text-text-muted">Their flaw:</span> {comp.theirFlaw}
                </p>
                <p className="text-success/80 text-sm">
                  <span className="text-text-muted">Our answer:</span> {comp.ourAnswer}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
