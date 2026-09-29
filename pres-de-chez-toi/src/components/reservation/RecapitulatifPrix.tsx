import { formaterPrix, calculerPrixTotal, calculerCommission, calculerMontantProprietaire } from '../../lib/prix'

interface RecapitulatifPrixProps {
  prixJour: number
  nbJours: number
  caution: number
}

export function RecapitulatifPrix({ prixJour, nbJours, caution }: RecapitulatifPrixProps) {
  const prixTotal = calculerPrixTotal(prixJour, nbJours)
  const commission = calculerCommission(prixTotal)
  const montantProprio = calculerMontantProprietaire(prixTotal)

  return (
    <div className="bg-gris-fond rounded-xl p-4 space-y-2">
      <div className="flex justify-between text-sm">
        <span>{formaterPrix(prixJour)} x {nbJours} jour{nbJours > 1 ? 's' : ''}</span>
        <span className="font-semibold">{formaterPrix(prixTotal)}</span>
      </div>
      {caution > 0 && (
        <div className="flex justify-between text-sm text-gris-moyen">
          <span>Caution (non débitée)</span>
          <span>{formaterPrix(caution)}</span>
        </div>
      )}
      <hr className="border-gris-clair" />
      <div className="flex justify-between font-bold text-gris-anthracite">
        <span>Total à payer</span>
        <span className="text-orange">{formaterPrix(prixTotal)}</span>
      </div>
      <div className="text-xs text-gris-moyen space-y-0.5">
        <p>Commission plateforme : {formaterPrix(commission)}</p>
        <p>Reversé au propriétaire : {formaterPrix(montantProprio)}</p>
      </div>
    </div>
  )
}
