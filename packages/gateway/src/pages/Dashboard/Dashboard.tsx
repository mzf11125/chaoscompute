import { DashboardShell } from '@/components/layout/DashboardShell'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { Check, Clock, Server, Wallet, ExternalLink } from 'lucide-react'

export default function Dashboard() {
  return (
    <DashboardShell>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Gateway Status</h1>
        <p className="text-muted-foreground text-sm mt-1">What is live, what is next, and what funding unlocks.</p>
      </div>

      {/* Live Deployments */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        {[
          {
            label: 'Phase 2 Contract', value: 'Deployed on Devnet',
            detail: '5Zmjie6vNFFJBkwA49CA38wJhjZpN5UDvna6tohBapyg',
            icon: Check, color: 'text-success',
            link: 'https://explorer.solana.com/address/5Zmjie6vNFFJBkwA49CA38wJhjZpN5UDvna6tohBapyg?cluster=devnet',
          },
          {
            label: 'Frontend', value: 'Live',
            detail: 'chaoscompute.vercel.app (Vercel)',
            icon: Check, color: 'text-success',
            link: 'https://chaoscompute.vercel.app',
          },
        ].map((item) => (
          <Card key={item.label} padding="lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-foreground font-semibold text-sm">{item.label}</h3>
              <item.icon size={18} className={item.color} />
            </div>
            <p className="text-foreground font-medium font-mono text-sm">{item.value}</p>
            <p className="text-muted-foreground text-xs mt-1 font-mono truncate">{item.detail}</p>
            {item.link && (
              <a href={item.link} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-foreground/50 hover:text-foreground mt-2">
                Explorer <ExternalLink size={10} />
              </a>
            )}
          </Card>
        ))}
      </div>

      {/* Phase 1 Launch Checklist */}
      <Card padding="lg" className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Server size={20} className="text-foreground" aria-hidden="true" />
          <h2 className="text-foreground font-semibold">Phase 1 Launch Checklist</h2>
        </div>
        <p className="text-muted-foreground text-sm mb-4">
          What needs to happen for inference to go live. Checked items are done.
        </p>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          {[
            { done: true, text: 'Anchor contract deployed to devnet' },
            { done: true, text: 'Frontend deployed to Vercel' },
            { done: true, text: 'Provider routing engine integrated (CLIProxyAPI)' },
            { done: true, text: '30 providers registered across 3 tiers' },
            { done: false, text: 'CLIProxyAPI running on production server' },
            { done: false, text: 'Provider API keys funded (OpenAI, Anthropic, etc.)' },
            { done: false, text: 'pay.sh gateway deployed to production' },
            { done: false, text: 'End-to-end: pay curl → 402 → routing → response' },
            { done: false, text: 'Domain + HTTPS (chaoscompute.io)' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 py-1.5 border-b border-border last:border-0">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${item.done ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'}`}>
                {item.done ? <Check size={12} /> : <Clock size={12} />}
              </span>
              <span className={item.done ? 'text-muted-foreground' : 'text-foreground'}>{item.text}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Funding Required */}
      <Card padding="lg" className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Wallet size={20} className="text-foreground" aria-hidden="true" />
          <h2 className="text-foreground font-semibold">What Funding Unlocks</h2>
        </div>
        <p className="text-muted-foreground text-sm mb-4">
          Phase 1 needs provider API keys and production hosting. Every dollar goes to inference infrastructure.
        </p>
        <div className="grid sm:grid-cols-3 gap-4 mb-4">
          {[
            { label: 'Provider Keys', cost: '$50-200/mo', desc: 'OpenAI, Anthropic, Gemini, DeepSeek keys for live routing' },
            { label: 'Production Server', cost: '$10-30/mo', desc: 'VPS hosting for CLIProxyAPI + pay.sh gateway' },
            { label: 'Domain + HTTPS', cost: '$12/year', desc: 'chaoscompute.io domain with SSL' },
          ].map((item) => (
            <div key={item.label} className="text-center py-3 px-2 border border-border rounded-xl">
              <p className="text-foreground font-semibold text-sm">{item.label}</p>
              <p className="text-foreground font-bold font-mono text-lg my-1">{item.cost}</p>
              <p className="text-muted-foreground text-xs">{item.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-muted-foreground text-xs">
          Total to launch Phase 1: ~$100-300/month. 100% of revenue after launch goes to Phase 2 treasury.
          MIT open source. Sole maintainer mzf11125. Discord for weekly roadmap meetings.
        </p>
      </Card>

      {/* Phase 2 Section */}
      <Card padding="lg">
        <h2 className="text-foreground font-semibold mb-3">Phase 2: Decentralized Compute</h2>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div className="flex gap-3">
            <span className="w-8 h-8 rounded-full bg-success/20 text-success flex items-center justify-center text-xs font-bold shrink-0">1</span>
            <div>
              <p className="text-foreground font-medium">Inference Gateway (Phase 1)</p>
              <p className="text-muted-foreground text-xs mt-0.5">CLIProxyAPI routing with pay.sh HTTP 402 payments. 30+ upstream AI providers. Funding needed for live launch.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="w-8 h-8 rounded-full bg-success/20 text-success flex items-center justify-center text-xs font-bold shrink-0">2</span>
            <div>
              <p className="text-foreground font-medium">Decentralized Compute (Phase 2)</p>
              <p className="text-muted-foreground text-xs mt-0.5">Contract deployed to devnet. Game theory replaces routing. Stake-weighted VRF racing. Blind race. Optimistic slashing.</p>
            </div>
          </div>
        </div>
      </Card>
    </DashboardShell>
  )
}
