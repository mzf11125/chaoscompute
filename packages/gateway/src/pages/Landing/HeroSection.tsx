import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const CODE = `curl -fsSL https://pay.sh/install | sh
pay skills search chaoscompute
pay curl https://gateway.chaoscompute.io/v1/chat/completions \\
  -H 'content-type: application/json' \\
  -d '{"model":"gpt-4o","messages":[{"role":"user","content":"Hello"}]}'`

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -200])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const dashY = useTransform(scrollYProgress, [0, 0.5], [0, -250])

  return (
    <section ref={sectionRef} className="relative min-h-[100svh] flex items-center justify-center py-16 md:py-32">
      <div className="max-w-6xl mx-auto">
        <motion.div style={{ y: contentY, opacity: contentOpacity }} className="flex flex-col items-center text-center">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="liquid-glass inline-flex items-center gap-2 px-3 py-2 rounded-lg mb-6">
            <span className="bg-foreground text-background rounded-md text-sm font-medium px-2 py-0.5">New</span>
            <span className="text-sm font-medium text-muted-foreground">Phase 1: Inference Gateway</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-7xl tracking-[-2px] font-medium leading-tight md:leading-[1.15] mb-3 text-foreground">
            One API for every AI model.
            <br />
            Stake SOL for lower costs.
            <br />
            Pay with <span className="font-serif italic font-normal text-muted-foreground">USDC</span>.
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm md:text-base font-normal leading-6 opacity-90 mb-6 max-w-xl" style={{ color: 'hsl(var(--hero-subtitle))' }}>
            Guest → Builder → Operator → Partner. 30+ providers. Phase 2 decentralized compute.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a href="https://pay.sh/docs/get-started/install" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-foreground text-background rounded-full px-8 py-3.5 text-base font-medium motion-safe:transition-transform hover:scale-105 active:scale-[0.98] min-h-[48px] focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background outline-none">
              Install pay.sh
            </a>
            <a href="https://github.com/mzf11125/chaoscompute" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-card text-foreground rounded-full px-8 py-3.5 text-base font-medium border border-border hover:bg-surface-hover motion-safe:transition-colors min-h-[48px] focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background outline-none">
              View on GitHub
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            style={{ y: dashY }} className="bg-card border border-border rounded-2xl p-6 max-w-2xl w-full text-left">
            <div className="flex items-center gap-2 text-muted-foreground text-xs mb-3" aria-hidden="true">
              <span className="w-3 h-3 rounded-full bg-error/40" /><span className="w-3 h-3 rounded-full bg-warning/40" /><span className="w-3 h-3 rounded-full bg-success/40" />
              <span className="ml-2">terminal</span>
            </div>
            <pre className="text-sm md:text-base text-foreground overflow-x-auto leading-relaxed font-mono"><code>{CODE}</code></pre>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
