import Card from '@/components/ui/Card'

export function SpendView() {
  const stats = [
    { label: '24H Requests', value: '142' },
    { label: 'Avg Cost/Req', value: '$0.0021' },
    { label: 'Providers', value: '3 online' },
    { label: 'Uptime', value: '99.9%' },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} padding="md">
          <p className="text-text-muted text-xs uppercase tracking-wider mb-1">{stat.label}</p>
          <p className="text-text-primary text-lg font-semibold font-mono">{stat.value}</p>
        </Card>
      ))}
    </div>
  )
}
