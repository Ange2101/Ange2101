import type { ReactNode } from 'react'

interface CarteProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function Carte({ children, className = '', onClick }: CarteProps) {
  return (
    <div
      className={`bg-white rounded-xl border border-gris-clair shadow-sm overflow-hidden ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
