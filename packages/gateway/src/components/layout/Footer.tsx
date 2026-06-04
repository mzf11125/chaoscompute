export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border py-8 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-text-muted text-sm">
          &copy; {new Date().getFullYear()} ChaosCompute. MIT License.
        </p>
        <div className="flex items-center gap-6">
          <a href="/docs" className="text-text-muted hover:text-text-primary text-sm transition-colors">Docs</a>
          <a href="/api" className="text-text-muted hover:text-text-primary text-sm transition-colors">API</a>
          <a href="https://github.com/protocoldaemon-sec/chaoscompute" className="text-text-muted hover:text-text-primary text-sm transition-colors">GitHub</a>
        </div>
      </div>
    </footer>
  )
}
