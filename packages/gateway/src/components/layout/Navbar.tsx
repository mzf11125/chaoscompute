import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sparkles, Menu, X, Terminal } from 'lucide-react'
import Button from '@/components/ui/Button'

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  )
}

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/status', label: 'Status' },
  { to: '/providers', label: 'Providers' },
  { to: '/docs', label: 'Docs' },
  { to: '/api', label: 'API' },
]

const linkClass = (active: boolean) =>
  `px-4 py-2 rounded-full text-sm min-h-[36px] flex items-center motion-safe:transition-colors motion-safe:duration-200
   focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface outline-none
   ${active ? 'bg-accent/10 text-accent' : 'text-text-secondary hover:text-text-primary'}`

export function Navbar() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl">
        <div
          className="glass rounded-full border border-border px-6 py-3 flex items-center justify-between"
          role="navigation"
          aria-label="Main navigation"
        >
          <Link
            to="/"
            className="flex items-center gap-2 text-text-primary font-semibold focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface outline-none rounded-full px-2 py-1"
          >
            <Sparkles size={20} className="text-accent" aria-hidden="true" />
            <span className="hidden sm:inline">ChaosCompute</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={linkClass(location.pathname === link.to)}
                aria-current={location.pathname === link.to ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/mzf11125/chaoscompute"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub repository"
              className="p-2 rounded-full text-text-muted hover:text-text-primary hover:bg-surface-hover motion-safe:transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface outline-none"
            >
              <GithubIcon />
            </a>
            <a
              href="https://pay.sh/docs/get-started/install"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex"
            >
              <Button size="sm" variant="primary">
                <Terminal size={14} aria-hidden="true" />
                Install pay.sh
              </Button>
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              className="md:hidden p-2 rounded-full text-text-muted hover:text-text-primary hover:bg-surface-hover motion-safe:transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface outline-none"
            >
              {mobileOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-20 left-4 right-4 glass rounded-3xl border border-border p-6">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-2xl text-base font-medium motion-safe:transition-colors
                    ${location.pathname === link.to ? 'bg-accent/10 text-accent' : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'}`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://pay.sh/docs/get-started/install"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-2xl text-base font-medium text-accent bg-accent/5 hover:bg-accent/10 motion-safe:transition-colors"
              >
                Install pay.sh
              </a>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
