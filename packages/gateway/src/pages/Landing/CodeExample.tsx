import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Zap, Shield, Globe } from 'lucide-react'
import Card from '@/components/ui/Card'

const stats = [
  { icon: Zap, value: '<3s', label: 'Response Time' },
  { icon: Globe, value: '40+', label: 'Providers' },
  { icon: Shield, value: '$0.001', label: 'Per Request' },
]

export function CodeExample() {
  const prefersReduced = useReducedMotion() ?? false

  return (
    <section className="py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={prefersReduced ? undefined : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={prefersReduced
                ? { duration: 0 }
                : { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.1 }}
            >
              <Card className="text-center">
                <stat.icon size={24} className="text-accent mx-auto mb-3" aria-hidden="true" />
                <p className="text-3xl font-bold text-accent mb-1">{stat.value}</p>
                <p className="text-text-muted text-xs uppercase tracking-wider">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={prefersReduced ? undefined : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={prefersReduced ? { duration: 0 } : { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-text-primary mb-4">
            Ready to ship?
          </h2>
          <p className="text-text-secondary mb-8 max-w-lg mx-auto">
            pip install chaos-sdk. Point at our endpoint. Your wallet handles the rest. Production-ready in 5 minutes.
          </p>
          <a
            href="/docs"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-surface font-medium text-sm hover:bg-accent-hover motion-safe:transition-colors focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface outline-none min-h-[44px]"
          >
            Read the Docs
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
