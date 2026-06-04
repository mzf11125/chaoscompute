import Card from '@/components/ui/Card'

const logs = [
  { id: '1', time: '2m ago', model: 'gpt-4o', provider: 'OpenAI', tokens: 757, cost: '0.0021', latency: 320, status: '200' },
  { id: '2', time: '5m ago', model: 'claude-sonnet-4', provider: 'Anthropic', tokens: 3072, cost: '0.0150', latency: 410, status: '200' },
  { id: '3', time: '12m ago', model: 'gpt-4o', provider: 'OpenAI → Anthropic', tokens: 345, cost: '0.0008', latency: 890, status: '402' },
  { id: '4', time: '23m ago', model: 'llama-3-70b', provider: 'Together', tokens: 1591, cost: '0.0012', latency: 220, status: '200' },
  { id: '5', time: '45m ago', model: 'claude-haiku-4', provider: 'Anthropic', tokens: 245, cost: '0.0003', latency: 95, status: '200' },
]

export function RequestLog() {
  if (logs.length === 0) {
    return (
      <Card padding="md">
        <p className="text-text-muted text-sm text-center py-8">No requests yet. Run pay curl to get started.</p>
      </Card>
    )
  }

  return (
    <Card padding="md" className="overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-text-primary font-semibold text-sm">Request Log</h3>
        <span className="text-text-muted text-xs font-mono">{logs.length} requests</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm" aria-label="Recent API requests">
          <thead>
            <tr className="text-text-muted text-xs uppercase tracking-wider">
              <th className="text-left py-2 pr-4">Time</th>
              <th className="text-left py-2 pr-4">Model</th>
              <th className="text-left py-2 pr-4 hidden sm:table-cell">Provider</th>
              <th className="text-right py-2 pr-4 hidden sm:table-cell">Tokens</th>
              <th className="text-right py-2 pr-4">Cost</th>
              <th className="text-right py-2 pr-4 hidden md:table-cell">Latency</th>
              <th className="text-right py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((entry) => (
              <tr key={entry.id} className="border-t border-border">
                <td className="py-3 pr-4 text-text-secondary">{entry.time}</td>
                <td className="py-3 pr-4 text-text-primary font-medium truncate max-w-[140px]">{entry.model}</td>
                <td className="py-3 pr-4 text-text-secondary hidden sm:table-cell">{entry.provider}</td>
                <td className="py-3 pr-4 text-right text-text-secondary hidden sm:table-cell font-mono tabular-nums">{entry.tokens}</td>
                <td className="py-3 pr-4 text-right text-text-primary font-mono tabular-nums">${entry.cost}</td>
                <td className="py-3 pr-4 text-right text-text-secondary hidden md:table-cell tabular-nums">{entry.latency}ms</td>
                <td className="py-3 text-right">
                  <span className={`text-xs font-mono ${entry.status === '200' ? 'text-success' : 'text-warning'}`} aria-label={`Status ${entry.status}`}>
                    {entry.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
