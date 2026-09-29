import { CreditCard } from 'lucide-react'
import { Bouton } from '../ui/Bouton'

interface BoutonPaiementProps {
  loading: boolean
  disabled: boolean
  onClick: () => void
}

export function BoutonPaiement({ loading, disabled, onClick }: BoutonPaiementProps) {
  return (
    <Bouton onClick={onClick} disabled={disabled || loading} className="w-full flex items-center justify-center gap-2">
      <CreditCard size={18} />
      {loading ? 'Paiement en cours...' : 'Payer et réserver'}
    </Bouton>
  )
}
