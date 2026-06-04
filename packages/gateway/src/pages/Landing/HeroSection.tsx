/*
 * HeroSection — ChaosCompute Landing
 *
 * Storyboard:
 *   0ms   Title, tagline, CTA, terminal — all visible at mount (no stagger)
 *   Mount-only: subtle opacity fade for content beneath the fold
 */

const CODE = `curl -fsSL https://pay.sh/install | sh
pay skills search chaoscompute
pay curl https://gateway.chaoscompute.io/v1/chat/completions \\
  -H 'content-type: application/json' \\
  -d '{"model":"gpt-4o","messages":[{"role":"user","content":"Hello"}]}'`

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <h1 className="text-[clamp(2.5rem,6vw+1rem,5rem)] font-extrabold leading-none text-text-primary mb-6">
          pay.sh payments.
          <br />
          CLIProxyAPI routing.
          <br />
          <span className="text-accent">Decentralized compute next.</span>
        </h1>

        <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-10">
          AI inference with HTTP 402 wallet-approved payments on Solana.
          Drop-in OpenAI compatibility. 20+ upstream providers. One endpoint.
          Phase 2 replaces routing entirely — game theory picks the winner.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a href="https://pay.sh/docs/get-started/install" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-accent text-surface font-medium text-base hover:bg-accent-hover motion-safe:transition-colors min-h-[48px] focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface outline-none">
            Install pay.sh
          </a>
          <a href="https://github.com/mzf11125/chaoscompute" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-surface-elevated text-text-primary font-medium text-base border border-border hover:bg-surface-hover hover:border-border-strong motion-safe:transition-colors min-h-[48px] focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface outline-none">
            View on GitHub
          </a>
        </div>

        <div className="bg-surface-elevated border border-border rounded-2xl p-6 max-w-2xl mx-auto text-left">
          <div className="flex items-center gap-2 text-text-muted text-xs mb-3" aria-hidden="true">
            <span className="w-3 h-3 rounded-full bg-error/40" />
            <span className="w-3 h-3 rounded-full bg-warning/40" />
            <span className="w-3 h-3 rounded-full bg-success/40" />
            <span className="ml-2">terminal</span>
          </div>
          <pre className="text-base text-text-primary overflow-x-auto leading-relaxed font-mono">
            <code>{CODE}</code>
          </pre>
        </div>
      </div>
    </section>
  )
}
