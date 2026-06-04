import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import { Github, MessageCircle, Users } from 'lucide-react'

export function CommunitySection() {
  return (
    <section className="py-28">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-center mb-16">
          <p className="text-muted-foreground text-xs uppercase tracking-widest mb-4">Community</p>
          <h2 className="text-4xl font-semibold text-foreground mb-4 tracking-tight">Open source. Sole developer. Community driven.</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-4">
            ChaosCompute is maintained by mzf11125. MIT licensed. Free to fork, contribute, or deploy.
          </p>
          <p className="text-foreground font-medium max-w-lg mx-auto text-sm">
            Making AI inference and computing decentralized and open source natively on Solana.
          </p>
          <p className="text-muted-foreground max-w-xl mx-auto mt-4">
            Join the Discord for weekly roadmap discussions and community meetings.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <a href="https://github.com/mzf11125/chaoscompute" target="_blank" rel="noopener noreferrer"
            className="group">
            <Card padding="lg" className="h-full text-center motion-safe:transition-colors group-hover:border-foreground/20">
              <Github size={28} className="text-foreground mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-foreground font-semibold mb-2">GitHub</h3>
              <p className="text-muted-foreground text-sm">Star, fork, contribute. PRs welcome.</p>
            </Card>
          </a>

          <a href="https://discord.gg/xXCKpmt7d" target="_blank" rel="noopener noreferrer"
            className="group">
            <Card padding="lg" className="h-full text-center motion-safe:transition-colors group-hover:border-foreground/20">
              <MessageCircle size={28} className="text-foreground mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-foreground font-semibold mb-2">Discord</h3>
              <p className="text-muted-foreground text-sm">Weekly meetings. Community roadmap.</p>
            </Card>
          </a>

          <a href="https://discord.gg/xXCKpmt7d" target="_blank" rel="noopener noreferrer"
            className="group">
            <Card padding="lg" className="h-full text-center motion-safe:transition-colors group-hover:border-foreground/20">
              <Users size={28} className="text-foreground mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-foreground font-semibold mb-2">Weekly Sync</h3>
              <p className="text-muted-foreground text-sm">Discuss Phase 2 roadmap every week.</p>
            </Card>
          </a>
        </div>
      </div>
    </section>
  )
}
