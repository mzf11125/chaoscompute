import type { ReactNode } from 'react'

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-8 md:px-28">{children}</div>
    </main>
  )
}
