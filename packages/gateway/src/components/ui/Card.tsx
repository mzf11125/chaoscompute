import type { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  variant?: 'default' | 'elevated' | 'glass'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const variants = {
  default: 'bg-surface-elevated border border-border',
  elevated: 'bg-surface-elevated border border-border-strong shadow-lg shadow-black/20',
  glass: 'glass border border-border',
}

const paddings = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export default function Card({
  children,
  variant = 'default',
  padding = 'lg',
  className = '',
  ...props
}: CardProps) {
  return (
    <div className={`rounded-3xl ${variants[variant]} ${paddings[padding]} ${className}`} {...props}>
      {children}
    </div>
  )
}
