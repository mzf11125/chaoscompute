import { motion, useReducedMotion } from 'framer-motion'
import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'

const competitors = [
  {
    name: 'OpenRouter',
    theirFlaw: 'Custodial credits, 5.5% top-up fee, centralized',
    ourAnswer: 'Non-custodial. Wallet signs per request. Nothing deposited anywhere.',
    status: 'incumbent' as const,
  },
  {
    name: 'Jatevo',
    theirFlaw: 'Token-gated daily quota, unused capacity wasted',
    ourAnswer: 'Per-request USDC. Pay exactly what you use. Zero wasted quota.',
    status: 'incumbent' as const,
  },
  {
    name: '9router',
    theirFlaw: 'Local proxy, no supply side, no payment layer',
    ourAnswer: 'Same UX. Cloud-hosted. Solana-native billing + upgrade to Core.',
    status: 'incumbent' as const,
  },
  {
    name: 'Bittensor',
    theirFlaw: 'Complex UX, custom L1, not developer-friendly',
    ourAnswer: 'Same architecture. OpenAI-compatible. Solana-native. 5-minute integration.',
    status: 'incumbent' as const,
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
          <h2 className="text-4xl font-bold text-text-primary mb-4">
            The market exists. We're building the better version.
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Every competitor proved the demand. Every competitor has a structural flaw we don't have.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {competitors.map((comp, i) => (
            <motion.div
              key={comp.name}
              initial={prefersReduced ? undefined : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={prefersReduced
                ? { duration: 0 }
                : { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.1 }}
            >
              <Card className="h-full">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-text-primary font-semibold text-lg">{comp.name}</h3>
                  <Badge variant={comp.status === 'incumbent' ? 'warning' : 'success'}>
                    {comp.status}
                  </Badge>
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
