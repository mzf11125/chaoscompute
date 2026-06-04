import { motion, useReducedMotion } from 'framer-motion'
import { Terminal, Wallet, Globe } from 'lucide-react'
import Card from '@/components/ui/Card'

const steps = [
  {
    icon: Terminal,
    title: 'Install pay.sh',
    description: 'One command installs the pay CLI. It wraps curl and agent CLIs to handle HTTP 402 payment challenges across 20+ upstream AI providers.',
  },
  {
    icon: Wallet,
    title: 'Wallet Pays Per Token',
    description: 'No subscriptions. No credit top-ups. Your Solana wallet signs a USDC transfer authorization locally. pay.sh handles the HTTP 402 settlement.',
  },
  {
    icon: Globe,
    title: 'Route to Any Provider',
    description: 'Use pay curl with the same OpenAI-compatible API. Gateway picks the best provider via CLIProxyAPI routing. OpenAI, Anthropic, Gemini, Grok, DeepSeek, and more.',
  },
]

export function HowItWorks() {
  const prefersReduced = useReducedMotion() ?? false

  return (
    <section className="py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={prefersReduced ? undefined : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={prefersReduced ? { duration: 0 } : { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-center mb-16">
          <p className="text-text-muted text-xs uppercase tracking-widest mb-4">How It Works</p>
          <h2 className="text-4xl font-bold text-text-primary mb-4">Three steps. No API keys.</h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            pay.sh wraps standard HTTP tools. When the Gateway returns 402 Payment Required, pay.sh signs a wallet transfer, CLIProxyAPI routes to the best provider, and the request retries automatically.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div key={step.title}
              initial={prefersReduced ? undefined : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={prefersReduced ? { duration: 0 } : { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.1 }}>
              <Card className="h-full">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <step.icon size={20} className="text-accent" aria-hidden="true" />
                </div>
                <h3 className="text-text-primary font-semibold mb-2">{step.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{step.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
