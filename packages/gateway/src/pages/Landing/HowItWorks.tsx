import Card from '@/components/ui/Card'
import { motion } from 'framer-motion'

export function HowItWorks() {
  return (
    <section className="py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-center mb-16">
          <p className="text-text-muted text-xs uppercase tracking-widest mb-4">How It Works</p>
          <h2 className="text-4xl font-bold text-text-primary mb-4">Three steps. No API keys.</h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            pay.sh wraps standard HTTP tools. When the Gateway returns 402 Payment Required, pay.sh signs a wallet transfer,
            CLIProxyAPI routes to the best provider, and the request retries automatically.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            {
              title: 'Install pay.sh',
              desc: 'One command. Wraps curl and agent CLIs. Handles HTTP 402 payment challenges across 20+ upstream providers.',
            },
            {
              title: 'Wallet Pays Per Token',
              desc: 'No subscriptions. No credit top-ups. Wallet signs USDC transfer locally. pay.sh handles settlement on Solana.',
            },
            {
              title: 'Call Any Model',
              desc: 'OpenAI-compatible endpoint. Gateway auto-routes to best provider. Same URL for every model.',
            },
          ].map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.1 }}
            >
              <Card className="h-full">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <span className="text-accent font-bold text-sm">{i + 1}</span>
                </div>
                <h3 className="text-text-primary font-semibold mb-2">{step.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{step.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Phase 1 / Phase 2 distinction */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            {
              label: 'Phase 1 · Shipping',
              title: 'Inference Gateway',
              desc: 'CLIProxyAPI routing with pay.sh HTTP 402 payments. 20+ upstream AI providers. OpenAI-compatible. Live today.',
              color: 'bg-success/20 text-success',
            },
            {
              label: 'Phase 2 · Roadmap',
              title: 'Decentralized Compute',
              desc: 'Game theory replaces routing. Stake-weighted VRF racing. Blind race. Optimistic slashing. Anyone\'s GPU joins. No centralized scheduler.',
              color: 'bg-accent/20 text-accent',
            },
          ].map((phase) => (
            <Card key={phase.title} padding="lg">
              <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider mb-4 ${phase.color}`}>
                {phase.label}
              </span>
              <h3 className="text-text-primary font-semibold mb-2">{phase.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{phase.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
