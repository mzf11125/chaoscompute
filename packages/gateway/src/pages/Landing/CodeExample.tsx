import { motion } from 'framer-motion'
import { ArrowRight, Globe, Layers, Shield } from 'lucide-react'
import Card from '@/components/ui/Card'

export function CodeExample() {
  return (
    <section className="py-28">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: Globe, value: '30+', label: 'Providers' },
            { icon: Layers, value: '4 Tiers', label: 'SOL Staking' },
            { icon: Shield, value: 'USDC', label: 'Settlement' },
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
          <h2 className="text-4xl font-semibold text-foreground mb-4 tracking-tight">Ready to ship?</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">Install pay.sh. Connect wallet. Your wallet handles the rest.</p>
          <a href="https://pay.sh/docs/get-started/install" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-foreground text-background rounded-full px-6 py-3 text-sm font-medium hover:opacity-90 motion-safe:transition-opacity focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background outline-none min-h-[44px]">
            Install pay.sh <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
