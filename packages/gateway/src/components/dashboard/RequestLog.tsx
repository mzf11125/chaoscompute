import Card from '@/components/ui/Card'

interface LogEntry {
  id: string
  timestamp: string
  model: string
  provider: string
  prompt_tokens: number
  completion_tokens: number
  cost_usdc: string
  latency_ms: number
  status: 'success' | 'fallback' | 'error'
}

const mockLogs: LogEntry[] = [
  { id: '1', timestamp: '2 min ago', model: 'gpt-4o', provider: 'OpenAI', prompt_tokens: 245, completion_tokens: 512, cost_usdc: '0.0021', latency_ms: 320, status: 'success' },
  { id: '2', timestamp: '5 min ago', model: 'claude-opus-4', provider: 'Anthropic', prompt_tokens: 1024, completion_tokens: 2048, cost_usdc: '0.0150', latency_ms: 890, status: 'success' },
  { id: '3', timestamp: '12 min ago', model: 'gpt-4o', provider: 'OpenAI', prompt_tokens: 89, completion_tokens: 256, cost_usdc: '0.0008', latency_ms: 180, status: 'fallback' },
  { id: '4', timestamp: '23 min ago', model: 'llama-3-70b', provider: 'Together', prompt_tokens: 567, completion_tokens: 1024, cost_usdc: '0.0012', latency_ms: 220, status: 'success' },
  { id: '5', timestamp: '45 min ago', model: 'claude-haiku-4', provider: 'Anthropic', prompt_tokens: 156, completion_tokens: 89, cost_usdc: '0.0003', latency_ms: 95, status: 'success' },
]

const statusColors = {
  success: 'text-success',
  fallback: 'text-warning',
  error: 'text-error',
}

export function RequestLog() {
  return (
    <Card padding="md" className="overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-text-primary font-semibold">Request Log</h3>
        <span className="text-text-muted text-xs">{mockLogs.length} requests</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-text-muted text-xs uppercase tracking-wider">
              <th className="text-left py-2 pr-4">Time</th>
              <th className="text-left py-2 pr-4">Model</th>
              <th className="text-left py-2 pr-4">Provider</th>
              <th className="text-right py-2 pr-4">Tokens</th>
              <th className="text-right py-2 pr-4">Cost</th>
              <th className="text-right py-2 pr-4">Latency</th>
              <th className="text-right py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockLogs.map((entry) => (
              <tr key={entry.id} className="border-t border-border">
                <td className="py-3 pr-4 text-text-secondary">{entry.timestamp}</td>
                <td className="py-3 pr-4 text-text-primary font-medium">{entry.model}</td>
                <td className="py-3 pr-4 text-text-secondary">{entry.provider}</td>
                <td className="py-3 pr-4 text-right text-text-secondary">
                  {entry.prompt_tokens + entry.completion_tokens}
                </td>
                <td className="py-3 pr-4 text-right text-text-primary">
                  ${entry.cost_usdc}
                </td>
                <td className="py-3 pr-4 text-right text-text-secondary">
                  {entry.latency_ms}ms
                </td>
                <td className={`py-3 text-right ${statusColors[entry.status]}`}>
                  {entry.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
