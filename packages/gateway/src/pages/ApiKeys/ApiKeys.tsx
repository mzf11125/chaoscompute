import { useState } from 'react'
import { toast } from 'sonner'
import { Copy, Eye, EyeOff, Trash2 } from 'lucide-react'
import { DashboardShell } from '@/components/layout/DashboardShell'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

const mockKeys = [
  { id: '1', name: 'Production Wallet', key: 'sk-chaos-abc123xyz456', created: '2 days ago', last_used: '2 min ago', spend_24h: '$0.23' },
  { id: '2', name: 'Dev Wallet', key: 'sk-chaos-def456uvw789', created: '5 days ago', last_used: '1 hour ago', spend_24h: '$0.05' },
]

export default function ApiKeys() {
  const [showKey, setShowKey] = useState<string | null>(null)
  const [keys, setKeys] = useState(mockKeys)
  const [newKeyName, setNewKeyName] = useState('')
  const [error, setError] = useState('')

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key)
    toast.success('API key copied to clipboard')
  }

  const handleAddKey = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newKeyName.trim()) {
      setError('Key name is required')
      return
    }
    setKeys((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        name: newKeyName.trim(),
        key: `sk-chaos-${crypto.randomUUID().replace(/-/g, '').slice(0, 24)}`,
        created: 'just now',
        last_used: 'never',
        spend_24h: '$0.00',
      },
    ])
    setNewKeyName('')
    setError('')
    toast.success('API key generated')
  }

  const handleDelete = (id: string) => {
    setKeys((prev) => prev.filter((k) => k.id !== id))
    toast.success('API key removed')
  }

  return (
    <DashboardShell>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">API Keys</h1>
          <p className="text-text-secondary text-sm mt-1">
            Manage Solana wallet-based authentication keys.
          </p>
        </div>
      </div>

      {keys.length === 0 ? (
        <Card padding="lg" className="text-center max-w-md mx-auto">
          <p className="text-text-muted mb-4">No API keys generated yet.</p>
          <Button variant="primary" size="md">
            Generate New Key
          </Button>
        </Card>
      ) : (
        <div className="space-y-3" role="list" aria-label="API keys">
          {keys.map((apiKey) => (
            <Card key={apiKey.id} padding="md" role="listitem">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-text-primary font-medium truncate">{apiKey.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="text-text-muted text-sm font-mono truncate max-w-[240px]">
                      {showKey === apiKey.id ? apiKey.key : 'sk-chaos-••••••••••••••••••'}
                    </code>
                    <button
                      onClick={() => setShowKey(showKey === apiKey.id ? null : apiKey.id)}
                      aria-label={showKey === apiKey.id ? 'Hide key' : 'Show key'}
                      className="p-1 rounded text-text-muted hover:text-text-primary motion-safe:transition-colors focus-visible:ring-2 focus-visible:ring-accent/50 outline-none min-h-[32px] min-w-[32px] flex items-center justify-center shrink-0"
                    >
                      {showKey === apiKey.id ? <EyeOff size={14} aria-hidden="true" /> : <Eye size={14} aria-hidden="true" />}
                    </button>
                    <button
                      onClick={() => copyKey(apiKey.key)}
                      aria-label="Copy key to clipboard"
                      className="p-1 rounded text-text-muted hover:text-text-primary motion-safe:transition-colors focus-visible:ring-2 focus-visible:ring-accent/50 outline-none min-h-[32px] min-w-[32px] flex items-center justify-center shrink-0"
                    >
                      <Copy size={14} aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm shrink-0">
                  <div className="text-right">
                    <p className="text-text-muted text-xs">24H Spend</p>
                    <p className="text-text-primary font-mono">{apiKey.spend_24h}</p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-text-muted text-xs">Last Used</p>
                    <p className="text-text-primary">{apiKey.last_used}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(apiKey.id)}
                    aria-label={`Delete ${apiKey.name}`}
                    className="p-2 rounded-full text-text-muted hover:text-error hover:bg-error/10 motion-safe:transition-colors focus-visible:ring-2 focus-visible:ring-error/50 outline-none min-h-[40px] min-w-[40px] flex items-center justify-center"
                  >
                    <Trash2 size={16} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <form onSubmit={handleAddKey} className="mt-8">
        <Card padding="md">
          <h3 className="text-text-primary font-medium mb-4">Add Wallet Key</h3>
          <div className="flex gap-3 items-start">
            <div className="flex-1">
              <Input
                name="key-name"
                placeholder="e.g. Production wallet"
                autoComplete="off"
                value={newKeyName}
                error={error}
                onChange={(e) => { setNewKeyName(e.target.value); if (error) setError('') }}
                aria-label="Key name"
              />
            </div>
            <Button type="submit" variant="primary" size="md" className="shrink-0">
              Generate
            </Button>
          </div>
          <p className="text-text-muted text-xs mt-2">
            Your private key is never stored on our servers. It's used locally to sign ephemeral JWTs for API authentication.
          </p>
        </Card>
      </form>
    </DashboardShell>
  )
}
