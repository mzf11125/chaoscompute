import { motion, useReducedMotion } from 'framer-motion'
import Button from '@/components/ui/Button'

const fadeUp = {
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
}

export function HeroSection() {
  const prefersReduced = useReducedMotion() ?? false
  const initial = prefersReduced ? {} : { opacity: 0, y: 24 }
  const animate = prefersReduced ? {} : { opacity: 1, y: 0 }
  const t = { duration: prefersReduced ? 0 : fadeUp.transition.duration, ease: fadeUp.transition.ease }
  const d = (n: number) => prefersReduced ? 0 : n

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">

        <motion.h1
          initial={initial} animate={animate}
          transition={{ ...t, delay: d(0.1) }}
          className="text-[clamp(2.5rem,6vw+1rem,5rem)] font-extrabold leading-none text-text-primary mb-6"
        >
          9router's simplicity.
          <br />
          Bittensor's architecture.
          <br />
          <span className="text-accent">Solana's speed.</span>
        </motion.h1>

        <motion.p
          initial={initial} animate={animate}
          transition={{ ...t, delay: d(0.2) }}
          className="text-text-secondary text-lg max-w-2xl mx-auto mb-8"
        >
          The first inference API designed for agents that self-pay. Swap two lines of code.
          Your AI agent funds itself from its own Solana wallet. No subscriptions. No credits.
          No company holding your money.
        </motion.p>

        <motion.div
          initial={initial} animate={animate}
          transition={{ ...t, delay: d(0.3) }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Button size="lg" variant="primary">Get Started</Button>
          <Button size="lg" variant="secondary">View on GitHub</Button>
        </motion.div>

        <motion.div
          initial={initial} animate={animate}
          transition={{ ...t, delay: d(0.4) }}
          className="bg-surface-elevated border border-border rounded-2xl p-4 max-w-lg mx-auto text-left"
        >
          <div className="flex items-center gap-2 text-text-muted text-xs mb-3" aria-hidden="true">
            <span className="w-3 h-3 rounded-full bg-error/40" />
            <span className="w-3 h-3 rounded-full bg-warning/40" />
            <span className="w-3 h-3 rounded-full bg-success/40" />
            <span className="ml-2">chaoscompute.py</span>
          </div>
          <pre className="text-sm text-text-primary overflow-x-auto">
            <code>
              <span className="text-text-muted"># Before: OpenRouter, Jatevo, 9router</span>{'\n'}
              <span className="text-error">client</span> = <span className="text-accent">OpenAI</span>(base_url=<span className="text-success">"https://api.openai.com/v1"</span>, api_key=<span className="text-success">"sk-..."</span>){'\n\n'}
              <span className="text-text-muted"># After: ChaosCompute</span>{'\n'}
              <span className="text-error">signer</span> = <span className="text-accent">ChaosSigner</span>(<span className="text-success">"YOUR_SOLANA_PRIVATE_KEY"</span>){'\n'}
              <span className="text-error">client</span> = <span className="text-accent">OpenAI</span>(base_url=<span className="text-success">"https://api.chaoscompute.io/v1"</span>, api_key=<span className="text-error">signer</span>.<span className="text-accent">token</span>()){'\n'}
            </code>
          </pre>
        </motion.div>
      </div>
    </section>
  )
}
