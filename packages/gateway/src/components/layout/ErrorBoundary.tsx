import { createContext, useContext, type ReactNode, Component, type ErrorInfo } from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

const ErrorContext = createContext<{ error: Error | null }>({ error: null })

export function useError() {
  return useContext(ErrorContext)
}

export class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-surface flex items-center justify-center px-4">
          <div className="bg-surface-elevated border border-border rounded-3xl p-8 max-w-md w-full text-center">
            <h2 className="text-xl font-semibold text-foreground mb-3">Something went wrong</h2>
            <p className="text-muted-foreground text-sm mb-6">
              {this.state.error?.message ?? 'An unexpected error occurred.'}
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null })
                window.location.reload()
              }}
              className="px-6 py-2.5 rounded-full bg-accent text-surface font-medium text-sm hover:bg-accent-hover transition-colors focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface outline-none"
            >
              Reload Page
            </button>
          </div>
        </div>
      )
    }
    return <ErrorContext.Provider value={{ error: this.state.error }}>{this.props.children}</ErrorContext.Provider>
  }
}
