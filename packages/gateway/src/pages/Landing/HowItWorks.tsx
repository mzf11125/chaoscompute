import { motion, useReducedMotion } from 'framer-motion'
import { Link, Wallet, MessageSquare } from 'lucide-react'
import Card from '@/components/ui/Card'

const steps = [
  {
    icon: Link,
    title: 'Swap the URL',
    description: 'Change your OpenAI base URL to ChaosCompute. That\'s it. No new SDK. No new mental model. Your existing code works unchanged.',
    color: 'text-accent',
  },
  {
    icon: Wallet,
    title: 'Fund Your Wallet',
    description: 'Send USDC to your Solana wallet. That\'s your API budget. No subscription. No credit top-up. No pre-paid balance sitting in someone else\'s account.',
    color: 'text-accent',
  },
  {
    icon: MessageSquare,
    title: 'Start Shipping',
    description: 'Every request your agent makes is signed by your wallet. USDC settles per request at execution time. Real-time spend visibility. On-chain audit trail.',
    color: 'text-accent',
  },
]

export function HowItWorks() {
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
          <p className="text-text-muted text-xs uppercase tracking-widest mb-4">How It Works</p>
          <h2 className="text-4xl font-bold text-text-primary mb-4">
            Three steps. No bullshit.
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            You already know how to use OpenAI's Python SDK. ChaosCompute is the same thing — but your Solana wallet pays the bill, not a credit card.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={prefersReduced ? undefined : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={prefersReduced
                ? { duration: 0 }
                : { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.1 }}
            >
              <Card className="h-full">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <step.icon size={20} className={step.color} aria-hidden="true" />
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
