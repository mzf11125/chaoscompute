import { motion } from 'framer-motion'
import { ArrowRight, Cpu, Scale, Shield } from 'lucide-react'
import Card from '@/components/ui/Card'

export function CodeExample() {
  return (
    <section className="py-28">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: Cpu, value: 'TEE', label: 'Encrypted Compute' },
            { icon: Scale, value: 'VRF', label: 'Fair Selection' },
            { icon: Shield, value: 'Slash', label: 'Fraud Penalty' },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.1 }}>
              <Card className="text-center">
                <stat.icon size={24} className="text-foreground mx-auto mb-3" aria-hidden="true" />
                <p className="text-3xl font-bold text-foreground mb-1 font-mono">{stat.value}</p>
                <p className="text-muted-foreground text-xs uppercase tracking-wider">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }} className="text-center">
          <h2 className="text-4xl font-semibold text-foreground mb-4 tracking-tight">Ready to build?</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">OpenAI-compatible API. Same code. Decentralized backend.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/console"
              className="inline-flex items-center gap-2 bg-foreground text-background rounded-full px-6 py-3 text-sm font-medium hover:opacity-90 motion-safe:transition-opacity focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background outline-none min-h-[44px]">
              Start Building <ArrowRight size={16} />
            </a>
            <a href="/nodes"
              className="inline-flex items-center gap-2 bg-card text-foreground rounded-full px-6 py-3 text-sm font-medium border border-border hover:bg-surface-hover motion-safe:transition-colors min-h-[44px] focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background outline-none">
              View Nodes
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
