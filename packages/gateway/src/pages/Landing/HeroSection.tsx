import { motion, useReducedMotion } from 'framer-motion'

const CODE = `# Install pay.sh
curl -fsSL https://pay.sh/install | sh

# Discover ChaosCompute
pay skills search chaoscompute

# Call any model — wallet pays per token
pay curl https://gateway.chaoscompute.io/v1/chat/completions \\
  -H 'content-type: application/json' \\
  -d '{"model":"gpt-4o","messages":[{"role":"user","content":"Hello"}]}'`

export function HeroSection() {
  const prefersReduced = useReducedMotion() ?? false
  const initial = prefersReduced ? {} : { opacity: 0, y: 24 }
  const animate = prefersReduced ? {} : { opacity: 1, y: 0 }
  const t = { duration: prefersReduced ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] as const }
  const d = (n: number) => prefersReduced ? 0 : n

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <motion.div initial={initial} animate={animate} transition={{ ...t, delay: d(0) }}>
          <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-surface-elevated text-text-secondary text-xs uppercase tracking-widest mb-8">
            HTTP 402 wallet-approved AI inference
          </p>
        </motion.div>

        <motion.h1
          initial={initial} animate={animate}
          transition={{ ...t, delay: d(0.1) }}
          className="text-[clamp(2.5rem,6vw+1rem,5rem)] font-extrabold leading-none text-text-primary mb-6"
        >
          pay.sh payments.
          <br />
          Bittensor architecture.
          <br />
          <span className="text-accent">Solana speed.</span>
        </motion.h1>

        <motion.p
          initial={initial} animate={animate}
          transition={{ ...t, delay: d(0.2) }}
          className="text-text-secondary text-lg max-w-2xl mx-auto mb-8"
        >
          The first AI inference API with HTTP 402 wallet-approved payments.
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
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-accent text-surface font-medium text-base hover:bg-accent-hover motion-safe:transition-colors min-h-[48px] focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface outline-none"
          >
            Install pay.sh
          </a>
          <a
            href="https://github.com/mzf11125/chaoscompute"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-surface-elevated text-text-primary font-medium text-base border border-border hover:bg-surface-hover hover:border-border-strong motion-safe:transition-colors min-h-[48px] focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface outline-none"
          >
            View on GitHub
          </a>
        </motion.div>

        <motion.div
          initial={initial} animate={animate}
          transition={{ ...t, delay: d(0.4) }}
          className="bg-surface-elevated border border-border rounded-2xl p-5 max-w-xl mx-auto text-left"
        >
          <div className="flex items-center gap-2 text-text-muted text-xs mb-3" aria-hidden="true">
            <span className="w-3 h-3 rounded-full bg-error/40" />
            <span className="w-3 h-3 rounded-full bg-warning/40" />
            <span className="w-3 h-3 rounded-full bg-success/40" />
            <span className="ml-2">terminal — chaoscompute.sh</span>
          </div>
          <pre className="text-sm text-text-primary overflow-x-auto leading-relaxed">
            <code>{CODE}</code>
          </pre>
        </motion.div>
      </div>
    </section>
  )
}
