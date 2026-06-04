import Card from '@/components/ui/Card'

const logs = [
  { id: '1', time: '2m ago', model: 'gpt-4o', provider: 'OpenAI', tokens: 757, cost: '0.0021', latency: 320, status: '200' },
  { id: '2', time: '5m ago', model: 'claude-sonnet-4', provider: 'Anthropic', tokens: 3072, cost: '0.0150', latency: 410, status: '200' },
  { id: '3', time: '12m ago', model: 'gemini-2.5-flash', provider: 'Google Gemini', tokens: 345, cost: '0.0004', latency: 290, status: '200' },
  { id: '4', time: '23m ago', model: 'deepseek-v3', provider: 'DeepSeek', tokens: 1591, cost: '0.0002', latency: 580, status: '200' },
  { id: '5', time: '45m ago', model: 'llama-4-scout', provider: 'Groq', tokens: 245, cost: '0.0000', latency: 95, status: '200' },
  { id: '6', time: '1h ago', model: 'grok-4', provider: 'xAI', tokens: 4890, cost: '0.0150', latency: 350, status: '200' },
]

export function RequestLog() {
  if (logs.length === 0) {
    return (
      <Card padding="md">
        <p className="text-muted-foreground text-sm text-center py-8">No requests yet. Run pay curl to get started.</p>
      </Card>
    )
  }

  return (
    <Card padding="md" className="overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-foreground font-semibold text-sm">Request Log</h3>
        <span className="text-muted-foreground text-xs font-mono">{logs.length} requests</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm" aria-label="Recent API requests">
          <thead>
            <tr className="text-muted-foreground text-xs uppercase tracking-wider">
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
                <td className="py-3 pr-4 text-muted-foreground">{entry.time}</td>
                <td className="py-3 pr-4 text-foreground font-medium truncate max-w-[140px]">{entry.model}</td>
                <td className="py-3 pr-4 text-muted-foreground hidden sm:table-cell">{entry.provider}</td>
                <td className="py-3 pr-4 text-right text-muted-foreground hidden sm:table-cell font-mono tabular-nums">{entry.tokens}</td>
                <td className="py-3 pr-4 text-right text-foreground font-mono tabular-nums">${entry.cost}</td>
                <td className="py-3 pr-4 text-right text-muted-foreground hidden md:table-cell tabular-nums">{entry.latency}ms</td>
                <td className="py-3 text-right">
                  <span className="text-xs font-mono text-success" aria-label="Status 200">{entry.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
