interface BadgeProps {
  children: string
  couleur?: 'orange' | 'vert' | 'rouge' | 'gris'
}

const couleurs: Record<string, string> = {
  orange: 'bg-orange-pale text-orange',
  vert: 'bg-green-50 text-vert',
  rouge: 'bg-red-50 text-rouge',
  gris: 'bg-gris-fond text-gris-moyen',
}

export function Badge({ children, couleur = 'orange' }: BadgeProps) {
  return (
    <span className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${couleurs[couleur]}`}>
      {children}
    </span>
  )
}
