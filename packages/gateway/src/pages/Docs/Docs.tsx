import { DashboardShell } from '@/components/layout/DashboardShell'
import Card from '@/components/ui/Card'
import { ArrowRight, Code, BookOpen, Terminal, ExternalLink } from 'lucide-react'

export default function Docs() {
  return (
    <DashboardShell>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary">Documentation</h1>
        <p className="text-text-secondary text-sm mt-1">
          Everything you need to integrate ChaosCompute.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card padding="lg" className="group hover:border-accent/20 motion-safe:transition-colors">
          <Code size={24} className="text-accent mb-4" />
          <h2 className="text-text-primary font-semibold mb-2">Quickstart</h2>
          <p className="text-text-secondary text-sm mb-4">
            Install the SDK and swap two lines of code.
          </p>
          <pre className="bg-surface-input rounded-xl p-4 text-xs text-text-primary overflow-x-auto mb-4">
            <code>{`pip install chaos-sdk

from openai import OpenAI
from chaos_sdk import ChaosSigner

client = OpenAI(
  base_url="https://api.chaoscompute.io/v1",
  api_key=ChaosSigner("KEY").token()
)`}</code>
          </pre>
          <a href="#" className="inline-flex items-center gap-1 text-accent text-sm hover:underline">
            Read more <ArrowRight size={14} />
          </a>
        </Card>

        <Card padding="lg" className="group hover:border-accent/20 motion-safe:transition-colors">
          <BookOpen size={24} className="text-accent mb-4" />
          <h2 className="text-text-primary font-semibold mb-2">API Reference</h2>
          <p className="text-text-secondary text-sm mb-4">
            OpenAI-compatible chat completions endpoint with Solana-native billing.
          </p>
          <div className="space-y-2 text-sm mb-4">
            <p className="text-text-muted"><code className="text-accent">POST</code> /v1/chat/completions</p>
            <p className="text-text-muted"><code className="text-accent">GET</code> /v1/models</p>
            <p className="text-text-muted"><code className="text-accent">GET</code> /v1/spend</p>
          </div>
          <a href="/api" className="inline-flex items-center gap-1 text-accent text-sm hover:underline">
            Full API reference <ArrowRight size={14} />
          </a>
        </Card>

        <Card padding="lg" className="group hover:border-accent/20 motion-safe:transition-colors">
          <Terminal size={24} className="text-accent mb-4" />
          <h2 className="text-text-primary font-semibold mb-2">Model Aliases</h2>
          <p className="text-text-secondary text-sm mb-4">
            Use smart aliases for automatic provider selection.
          </p>
          <div className="space-y-1 text-xs">
            {['best-available', 'best-fast', 'best-smart', 'best-coder', 'best-long'].map((alias) => (
              <div key={alias} className="flex items-center justify-between py-1 border-b border-border last:border-0">
                <code className="text-accent">{alias}</code>
                <span className="text-text-muted">auto-routed</span>
              </div>
            ))}
          </div>
        </Card>

        <Card padding="lg" className="group hover:border-accent/20 motion-safe:transition-colors">
          <ExternalLink size={24} className="text-accent mb-4" />
          <h2 className="text-text-primary font-semibold mb-2">GitHub</h2>
          <p className="text-text-secondary text-sm mb-4">
            Open source. MIT License. Contribute or fork.
          </p>
          <a
            href="https://github.com/mzf11125/chaoscompute"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-accent text-sm hover:underline"
          >
            View on GitHub <ArrowRight size={14} />
          </a>
        </Card>
      </div>
    </DashboardShell>
  )
}
