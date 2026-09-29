import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Conteneur } from '../components/layout/Conteneur'
import { Chargement } from '../components/ui/Chargement'
import { SelecteurDates } from '../components/reservation/SelecteurDates'
import { RecapitulatifPrix } from '../components/reservation/RecapitulatifPrix'
import { BoutonPaiement } from '../components/reservation/BoutonPaiement'
import { useObjet } from '../hooks/useObjets'
import { useAuth } from '../hooks/useAuth'
import { calculerNbJours } from '../lib/dates'
import { calculerPrixTotal, calculerCommission, calculerMontantProprietaire } from '../lib/prix'
import { supabase } from '../lib/supabase'
import { Navigate } from 'react-router-dom'

export function ReservationPage() {
  const { id } = useParams()
  const { objet, loading: loadingObjet } = useObjet(id)
  const { user, loading: loadingAuth } = useAuth()
  const navigate = useNavigate()
  const [dateDebut, setDateDebut] = useState('')
  const [dateFin, setDateFin] = useState('')
  const [loading, setLoading] = useState(false)
  const [erreur, setErreur] = useState<string | null>(null)

  if (!loadingAuth && !user) return <Navigate to="/connexion" />
  if (loadingObjet) return <Chargement />
  if (!objet) return <Conteneur className="py-12 text-center text-gris-moyen">Objet introuvable</Conteneur>

  const nbJours = dateDebut && dateFin ? calculerNbJours(dateDebut, dateFin) : 0

  async function reserver() {
    if (!user || !objet || !dateDebut || !dateFin) return
    setLoading(true)
    setErreur(null)

    const prixTotal = calculerPrixTotal(objet.prix_jour, nbJours)
    const commission = calculerCommission(prixTotal)
    const montantProprio = calculerMontantProprietaire(prixTotal)

    const { error } = await supabase.from('reservations').insert({
      objet_id: objet.id,
      locataire_id: user.id,
      date_debut: dateDebut,
      date_fin: dateFin,
      prix_total: prixTotal,
      commission,
      montant_proprietaire: montantProprio,
      statut: 'en_attente',
    })

    if (error) {
      setErreur(error.message)
      setLoading(false)
      return
    }

    navigate('/mes-reservations')
  }

  return (
    <Conteneur className="py-6">
      <h1 className="text-2xl font-bold text-gris-anthracite mb-2">Réserver</h1>
      <p className="text-gris-moyen mb-6">{objet.titre}</p>

      <div className="max-w-md space-y-6">
        <SelecteurDates
          dateDebut={dateDebut}
          dateFin={dateFin}
          onDebutChange={setDateDebut}
          onFinChange={setDateFin}
        />

        {nbJours > 0 && (
          <RecapitulatifPrix prixJour={objet.prix_jour} nbJours={nbJours} caution={objet.caution} />
        )}

        {erreur && <p className="text-rouge text-sm">{erreur}</p>}

        <BoutonPaiement
          loading={loading}
          disabled={nbJours <= 0}
          onClick={reserver}
        />
      </div>
    </Conteneur>
  )
}
