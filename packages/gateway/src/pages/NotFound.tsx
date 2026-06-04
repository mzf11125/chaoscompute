import { Link } from 'react-router-dom'
import Card from '@/components/ui/Card'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card padding="lg" className="text-center max-w-md mx-auto">
        <p className="text-7xl font-extrabold text-accent mb-4">404</p>
        <h2 className="text-xl font-semibold text-foreground mb-2">Page not found</h2>
        <p className="text-muted-foreground text-sm mb-6">
          The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-flex px-6 py-2.5 rounded-full bg-accent text-surface font-medium text-sm hover:bg-accent-hover motion-safe:transition-colors"
        >
          Back to Home
        </Link>
      </Card>
    </div>
  )
}
