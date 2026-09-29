import type { ReactNode } from 'react'

export function Conteneur({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`max-w-5xl mx-auto px-4 ${className}`}>
      {children}
    </div>
  )
}
