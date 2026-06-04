import { motion } from 'framer-motion'
import { ArrowRight, Globe, Server, Shield } from 'lucide-react'
import Card from '@/components/ui/Card'

export function CodeExample() {
  return (
    <section className="py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: Globe, value: '20+', label: 'Providers' },
            { icon: Server, value: 'HTTP 402', label: 'Payment Layer' },
            { icon: Shield, value: 'USDC', label: 'Settlement' },
          ].map((stat, i) => (
            <motion.div key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.1 }}>
              <Card className="text-center">
                <stat.icon size={24} className="text-accent mx-auto mb-3" aria-hidden="true" />
                <p className="text-3xl font-bold text-accent mb-1 font-mono">{stat.value}</p>
                <p className="text-text-muted text-xs uppercase tracking-wider">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-center">
          <h2 className="text-4xl font-bold text-text-primary mb-4">Ready to ship?</h2>
          <p className="text-text-secondary mb-8 max-w-lg mx-auto">
            Install pay.sh. Point at our endpoint. Your wallet handles the rest.
          </p>
          <a href="https://pay.sh/docs/get-started/install" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-surface font-medium text-sm hover:bg-accent-hover motion-safe:transition-colors focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface outline-none min-h-[44px]">
            Install pay.sh
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
