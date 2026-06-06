import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import { Shield, Eye, Zap, Lock } from 'lucide-react'

const features = [
  { icon: Lock, title: 'TEE Encryption', desc: 'All inference runs in Trusted Execution Environments. Prompts never broadcast in plaintext. Hardware-enforced privacy.' },
  { icon: Eye, title: 'VRF Selection', desc: 'Verifiable Random Functions select node cohorts. Cryptographic randomness. No centralized scheduler. No MEV.' },
  { icon: Zap, title: 'Blind Race', desc: 'Nodes commit encrypted output, then reveal. Prevents front-running. All valid submissions have equal chance.' },
  { icon: Shield, title: 'Optimistic Slashing', desc: 'Fraud proofs with bond posting. Counter-proof window. Stake burned on invalid output. Economic security.' },
]

export function SecuritySection() {
  return (
    <section className="py-28">
      <div className="max-w-6xl mx-auto ">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }} className="text-center mb-16">
          <p className="text-muted-foreground text-xs uppercase tracking-widest mb-4">Game-Theoretic Security</p>
          <h2 className="text-4xl font-semibold text-foreground mb-4 tracking-tight">Math, not marketing.</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            TEE encryption. VRF selection. Blind race. Slashing. Every layer enforced by cryptography and economics.
          </p>
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
