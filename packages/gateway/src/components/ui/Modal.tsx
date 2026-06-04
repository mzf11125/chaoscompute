import { useEffect, useRef, type ReactNode, useCallback } from 'react'
import { X } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

interface ModalProps { open: boolean; onClose: () => void; children: ReactNode; title?: string }

export default function Modal({ open, onClose, children, title }: ModalProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const prevRef = useRef<HTMLElement | null>(null)
  const p = useReducedMotion() ?? false

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') { onClose(); return }
    if (e.key === 'Tab' && contentRef.current) {
      const f = contentRef.current.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
      if (f.length === 0) return
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus() }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus() }
    }
  }, [onClose])

  useEffect(() => {
    if (open) {
      prevRef.current = document.activeElement as HTMLElement
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', handleKey)
      const t = setTimeout(() => contentRef.current?.querySelector<HTMLElement>('button, [href], input, select, textarea')?.focus(), 50)
      return () => { clearTimeout(t); document.removeEventListener('keydown', handleKey); document.body.style.overflow = ''; prevRef.current?.focus() }
    }
  }, [open, handleKey])

  const t = p ? { duration: 0 } : { duration: 0.2, ease: [0.16, 1, 0.3, 1] as const }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={t} onClick={onClose} aria-hidden="true" className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div ref={contentRef} role="dialog" aria-modal="true" aria-label={title} initial={p ? {} : { opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={p ? {} : { opacity: 0, scale: 0.95, y: 20 }} transition={t} className="relative z-10 w-full max-w-lg mx-4">
            <div className="liquid-glass rounded-2xl border border-border p-6">
              {title && (
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-foreground">{title}</h2>
                  <button onClick={onClose} aria-label="Close dialog" className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-surface-hover transition-colors focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black outline-none min-h-[40px] min-w-[40px] flex items-center justify-center">
                    <X size={20} aria-hidden="true" />
                  </button>
                </div>
              )}
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
