import { Navigate } from 'react-router-dom'
import { CalendarDays } from 'lucide-react'
import { Conteneur } from '../components/layout/Conteneur'
import { Carte } from '../components/ui/Carte'
import { Badge } from '../components/ui/Badge'
import { Chargement } from '../components/ui/Chargement'
import { useAuth } from '../hooks/useAuth'
import { useReservations } from '../hooks/useReservations'
import { formaterPrix } from '../lib/prix'
import { formaterDateCourte } from '../lib/dates'
import type { StatutReservation } from '../types'

const couleurStatut: Record<StatutReservation, 'orange' | 'vert' | 'rouge' | 'gris'> = {
  en_attente: 'orange',
  confirmee: 'vert',
  en_cours: 'vert',
  terminee: 'gris',
  annulee: 'rouge',
  litige: 'rouge',
}

const labelStatut: Record<StatutReservation, string> = {
  en_attente: 'En attente',
  confirmee: 'Confirmée',
  en_cours: 'En cours',
  terminee: 'Terminée',
  annulee: 'Annulée',
  litige: 'Litige',
}

export function MesReservations() {
  const { user, loading: loadingAuth } = useAuth()
  const { reservations, loading } = useReservations()

  if (!loadingAuth && !user) return <Navigate to="/connexion" />

  return (
    <Conteneur className="py-6">
      <h1 className="text-2xl font-bold text-gris-anthracite mb-6">Mes réservations</h1>

      {loading ? (
        <Chargement />
      ) : reservations.length === 0 ? (
        <div className="text-center py-12 text-gris-moyen">
          <CalendarDays size={40} className="mx-auto mb-3 text-gris-clair" />
          <p>Aucune réservation pour le moment</p>
        </div>
      ) : (
        <div className="space-y-3">
          {reservations.map((r) => (
            <Carte key={r.id} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gris-anthracite">{(r.objet as any)?.titre ?? 'Objet'}</p>
                  <p className="text-sm text-gris-moyen">
                    {formaterDateCourte(r.date_debut)} - {formaterDateCourte(r.date_fin)}
                  </p>
                </div>
                <div className="text-right">
                  <Badge couleur={couleurStatut[r.statut]}>{labelStatut[r.statut]}</Badge>
                  <p className="text-sm font-bold text-orange mt-1">{formaterPrix(r.prix_total)}</p>
                </div>
              </div>
            </Carte>
          ))}
        </div>
      )}
    </Conteneur>
  )
}
