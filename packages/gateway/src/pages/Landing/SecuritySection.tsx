import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import { Shield, Eye, Pause, FileCheck } from 'lucide-react'

const features = [
  { icon: Eye, title: 'Transaction Simulation', desc: 'Every inference request is simulated before execution. Bastion validates state changes and catches unauthorized transfers before they hit the chain.' },
  { icon: Shield, title: 'Policy Engine', desc: 'Program whitelist, SOL caps, rate limits, and cooldowns. Configurable per-agent. Blocks malicious transactions before execution.' },
  { icon: FileCheck, title: 'On-Chain Audit', desc: 'Immutable audit records on Solana. Verifiable, permissionless, tamper-proof. Full transparency for every request.' },
  { icon: Pause, title: 'Emergency Pause', desc: 'Circuit breaker halts the protocol instantly. Human-in-the-loop override for blocked transactions. Safety first.' },
]

export function SecuritySection() {
  return (
    <section className="py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-center mb-16">
          <p className="text-text-muted text-xs uppercase tracking-widest mb-4">Security</p>
          <h2 className="text-4xl font-bold text-text-primary mb-4">
            Designed for{' '}
            <a href="https://bastionagentique.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Bastion Agentique</a>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Planned integration with Bastion's agent security layer. Transaction simulation, policy enforcement, on-chain audit, and emergency pause — all on the roadmap.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map((f, i) => (
            <motion.div key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.1 }}>
              <Card padding="lg" className="h-full">
                <f.icon size={24} className="text-accent mb-4" aria-hidden="true" />
                <h3 className="text-text-primary font-semibold mb-2">{f.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{f.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
