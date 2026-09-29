import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface BoutonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: 'primaire' | 'secondaire' | 'danger'
  taille?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

const classes: Record<string, string> = {
  primaire: 'bg-orange text-white hover:bg-orange-hover',
  secondaire: 'bg-white text-gris-anthracite border border-gris-clair hover:bg-gris-fond',
  danger: 'bg-rouge text-white hover:bg-red-700',
}

const tailles: Record<string, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-7 py-3 text-lg',
}

export function Bouton({ variante = 'primaire', taille = 'md', className = '', children, ...props }: BoutonProps) {
  return (
    <button
      className={`rounded-full font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${classes[variante]} ${tailles[taille]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
