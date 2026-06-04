import { forwardRef, type ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const variants = {
  primary: 'bg-accent text-surface hover:bg-accent-hover active:scale-[0.98]',
  secondary: 'bg-surface-elevated text-text-primary border border-border hover:bg-surface-hover hover:border-border-strong active:scale-[0.98]',
  ghost: 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated active:scale-[0.98]',
}

const sizes = {
  sm: 'px-4 py-2 text-sm min-h-[40px]',
  md: 'px-6 py-2.5 text-sm min-h-[44px]',
  lg: 'px-8 py-3 text-base min-h-[48px]',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', disabled, children, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled}
      aria-disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2 rounded-full font-medium
        motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out
        focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface
        outline-none
        disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      {...props}
    >
      {children}
    </button>
  ),
)

Button.displayName = 'Button'
export default Button
