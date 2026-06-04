interface BadgeProps { children: string; variant?: 'default' | 'success' | 'warning' | 'error' }

const variants = {
  default: 'bg-foreground/10 text-foreground border-foreground/20',
  success: 'bg-success/10 text-success border-success/20',
  warning: 'bg-warning/10 text-warning border-warning/20',
  error: 'bg-error/10 text-error border-error/20',
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  return <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border tracking-wider uppercase ${variants[variant]}`}>{children}</span>
}
