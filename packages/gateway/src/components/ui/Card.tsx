import type { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  variant?: 'default' | 'border'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const variants = {
  default: 'bg-card',
  border: 'bg-card border border-border',
}

const paddings = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export default function Card({ children, variant = 'border', padding = 'lg', className = '', ...props }: CardProps) {
  return <div className={`rounded-2xl ${variants[variant]} ${paddings[padding]} ${className}`} {...props}>{children}</div>
}
