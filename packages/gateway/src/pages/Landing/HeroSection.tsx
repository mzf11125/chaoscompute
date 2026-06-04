import { motion, useReducedMotion } from 'framer-motion'
import Button from '@/components/ui/Button'

export function HeroSection() {
  const prefersReduced = useReducedMotion() ?? false
  const initial = prefersReduced ? {} : { opacity: 0, y: 24 }
  const animate = prefersReduced ? {} : { opacity: 1, y: 0 }
  const t = { duration: prefersReduced ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] as const }
  const d = (n: number) => prefersReduced ? 0 : n

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div initial={initial} animate={animate} transition={{ ...t, delay: d(0) }}>
          <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-surface-elevated text-text-secondary text-xs uppercase tracking-widest mb-8">
            The smart contract is the router
          </p>
        </motion.div>

        <motion.h1
          initial={initial} animate={animate}
          transition={{ ...t, delay: d(0.1) }}
          className="text-[clamp(2.5rem,6vw+1rem,5rem)] font-extrabold leading-none text-text-primary mb-6"
        >
          pay.sh's payments.
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
          The first AI inference API that accepts HTTP 402 wallet-approved payments.
          No sign-up. No subscription. No API key. Your wallet pays per token at execution time.
        </motion.p>

        <motion.div
          initial={initial} animate={animate}
          transition={{ ...t, delay: d(0.3) }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <a
            href="https://pay.sh/docs/get-started/install"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-accent text-surface font-medium text-base hover:bg-accent-hover motion-safe:transition-colors min-h-[48px]"
          >
            Install pay.sh
          </a>
          <a
            href="https://github.com/mzf11125/chaoscompute"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-surface-elevated text-text-primary font-medium text-base border border-border hover:bg-surface-hover hover:border-border-strong motion-safe:transition-colors min-h-[48px]"
          >
            View on GitHub
          </a>
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
            <span className="ml-2">terminal</span>
          </div>
          <pre className="text-sm text-text-primary overflow-x-auto">
            <code>
<span className="text-text-muted"># Install pay.sh</span>{'\n'}
<span className="text-accent">curl</span> -fsSL https://pay.sh/install | <span className="text-accent">sh</span>{'\n\n'}
<span className="text-text-muted"># Discover ChaosCompute</span>{'\n'}
<span className="text-accent">pay</span> skills search chaoscompute{'\n\n'}
<span className="text-text-muted"># Call any model — wallet pays per token</span>{'\n'}
<span className="text-accent">pay</span> curl https://gateway.chaoscompute.io/v1/chat/completions \{'\n'}
{'  '}-H <span className="text-success">'content-type: application/json'</span> \{'\n'}
{'  '}-d <span className="text-success">'</span><span className="text-success">{`{"model":"gpt-4o","messages":[{"role":"user","content":"Hello"}]}`}</span><span className="text-success">'</span>{'\n'}
            </code>
          </pre>
        </motion.div>
      </div>
    </section>
  )
}
