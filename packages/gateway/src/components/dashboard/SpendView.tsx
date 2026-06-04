import { useState, useEffect } from 'react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'

interface SpendData {
  balance_usdc: number
  spend_24h: number
  spend_7d: number
  total_requests_24h: number
  active_providers: number
}

export function SpendView() {
  const [data, setData] = useState<SpendData>({
    balance_usdc: 4.50,
    spend_24h: 0.23,
    spend_7d: 1.45,
    total_requests_24h: 142,
    active_providers: 3,
  })

  const stats = [
    { label: 'Balance', value: `$${data.balance_usdc.toFixed(2)} USDC` },
    { label: '24H Spend', value: `$${data.spend_24h.toFixed(2)}` },
    { label: '7D Spend', value: `$${data.spend_7d.toFixed(2)}` },
    { label: '24H Requests', value: data.total_requests_24h.toString() },
    { label: 'Providers', value: `${data.active_providers} online` },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} padding="md">
          <p className="text-text-muted text-xs uppercase tracking-wider mb-1">{stat.label}</p>
          <p className="text-text-primary text-lg font-semibold">{stat.value}</p>
        </Card>
      ))}
    </div>
  )
}
