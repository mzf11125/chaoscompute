import Card from '@/components/ui/Card'

export function SpendView() {
  const stats = [
    { label: '24H Requests', value: '142' },
    { label: 'Revenue (24H)', value: '$0.32' },
    { label: 'Phase 2 Treasury', value: '$124.50' },
    { label: 'Uptime', value: '99.9%' },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4" aria-label="Gateway statistics">
      {stats.map((stat) => (
        <Card key={stat.label} padding="md">
          <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">{stat.label}</p>
          <p className="text-foreground text-lg font-semibold font-mono tabular-nums">{stat.value}</p>
        </Card>
      ))}
    </div>
  )
}
