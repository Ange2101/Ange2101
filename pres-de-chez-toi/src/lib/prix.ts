const TAUX_COMMISSION = 0.12

export function calculerCommission(prixTotal: number): number {
  return Math.round(prixTotal * TAUX_COMMISSION * 100) / 100
}

export function calculerMontantProprietaire(prixTotal: number): number {
  return Math.round(prixTotal * (1 - TAUX_COMMISSION) * 100) / 100
}

export function calculerPrixTotal(prixJour: number, nbJours: number): number {
  return Math.round(prixJour * nbJours * 100) / 100
}

export function formaterPrix(montant: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(montant)
}
