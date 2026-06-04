import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import { Shield, Eye, Pause, FileCheck } from 'lucide-react'

const features = [
  { icon: Eye, title: 'Transaction Simulation', desc: 'Every inference request is simulated before execution. State changes and unauthorized transfers are caught before they hit the chain.' },
  { icon: Shield, title: 'Policy Engine', desc: 'Program whitelist, SOL caps, rate limits, and cooldowns. Blocks malicious transactions before execution.' },
  { icon: FileCheck, title: 'On-Chain Audit', desc: 'Immutable audit records on Solana. Verifiable, permissionless, tamper-proof. Full transparency for every request.' },
  { icon: Pause, title: 'Emergency Pause', desc: 'Circuit breaker halts the protocol instantly. Human-in-the-loop override for blocked transactions. Safety first.' },
]

export function SecuritySection() {
  return (
    <section className="py-28">
      <div className="max-w-6xl mx-auto ">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }} className="text-center mb-16">
          <p className="text-muted-foreground text-xs uppercase tracking-widest mb-4">Security</p>
          <h2 className="text-4xl font-semibold text-foreground mb-4 tracking-tight">Security built in, not bolted on</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Planned integration. Transaction simulation, policy enforcement, on-chain audit, emergency pause.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.1 }}>
              <Card padding="lg" className="h-full">
                <f.icon size={24} className="text-foreground mb-4" aria-hidden="true" />
                <h3 className="text-foreground font-semibold mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
