import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border py-8 mt-16">
      <div className="max-w-6xl mx-auto px-8 md:px-28 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} ChaosCompute. MIT. Payments via <a href="https://pay.sh" target="_blank" rel="noopener noreferrer" className="text-foreground hover:underline">pay.sh</a>.
        </p>
        <div className="flex items-center gap-6">
          <Link to="/docs" className="text-muted-foreground hover:text-foreground text-sm motion-safe:transition-colors focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background outline-none rounded">Docs</Link>
          <Link to="/api" className="text-muted-foreground hover:text-foreground text-sm motion-safe:transition-colors focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background outline-none rounded">API</Link>
          <a href="https://pay.sh" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground text-sm motion-safe:transition-colors focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background outline-none rounded">pay.sh</a>
          <a href="https://bastionagentique.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground text-sm motion-safe:transition-colors focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background outline-none rounded">Bastion</a>
          <a href="https://github.com/mzf11125/chaoscompute" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground text-sm motion-safe:transition-colors focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background outline-none rounded">GitHub</a>
        </div>
      </div>
    </footer>
  )
}
