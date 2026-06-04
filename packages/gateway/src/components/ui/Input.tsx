import { forwardRef, type InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className = '', ...props }, ref) => {
    const inputId = id ?? props.name
    return (
      <div>
        {label && (
          <label htmlFor={inputId} className="block text-text-secondary text-xs uppercase tracking-wider mb-2 font-medium">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`w-full px-4 py-2.5 rounded-xl min-h-[40px] bg-surface-input text-text-primary text-sm border ${error ? 'border-error' : 'border-border'} placeholder:text-text-muted focus:outline-none focus:border-border-strong focus:ring-2 focus:ring-accent/20 disabled:opacity-50 disabled:cursor-not-allowed motion-safe:transition-colors motion-safe:duration-200 ${className}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-error text-xs" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
export default Input
