import { useParams, Link } from 'react-router-dom'
import { MapPin, Star, Flag, User } from 'lucide-react'
import { Conteneur } from '../components/layout/Conteneur'
import { Chargement } from '../components/ui/Chargement'
import { Badge } from '../components/ui/Badge'
import { Bouton } from '../components/ui/Bouton'
import { GaleriePhotos } from '../components/objets/GaleriePhotos'
import { useObjet } from '../hooks/useObjets'
import { formaterPrix } from '../lib/prix'
import { useAuth } from '../hooks/useAuth'

export function ObjetDetail() {
  const { id } = useParams()
  const { objet, loading } = useObjet(id)
  const { user } = useAuth()

  if (loading) return <Chargement />
  if (!objet) return <Conteneur className="py-12 text-center text-gris-moyen">Objet introuvable</Conteneur>

  const estProprietaire = user?.id === objet.proprietaire_id

  return (
    <Conteneur className="py-6">
      <div className="grid md:grid-cols-2 gap-8">
        <GaleriePhotos photos={objet.photos ?? []} />

        <div className="space-y-4">
          <Badge>{objet.categorie.replace(/-/g, ' ')}</Badge>
          <h1 className="text-2xl font-bold text-gris-anthracite">{objet.titre}</h1>

          <div className="flex items-center gap-2 text-gris-moyen text-sm">
            <MapPin size={16} />
            <span>{objet.ville}</span>
          </div>

          <p className="text-2xl font-bold text-orange">{formaterPrix(objet.prix_jour)} / jour</p>
          {objet.caution > 0 && (
            <p className="text-sm text-gris-moyen">Caution : {formaterPrix(objet.caution)}</p>
          )}

          <p className="text-gris-anthracite leading-relaxed">{objet.description}</p>

          {objet.proprietaire && (
            <div className="flex items-center gap-3 p-3 bg-gris-fond rounded-xl">
              <div className="w-10 h-10 rounded-full bg-gris-clair flex items-center justify-center">
                <User size={18} className="text-gris-moyen" />
              </div>
              <div>
                <p className="font-semibold text-gris-anthracite text-sm">
                  {objet.proprietaire.prenom} {objet.proprietaire.nom.charAt(0)}.
                </p>
                {objet.proprietaire.note_moyenne && (
                  <div className="flex items-center gap-1 text-xs text-gris-moyen">
                    <Star size={12} className="text-orange fill-orange" />
                    {objet.proprietaire.note_moyenne.toFixed(1)}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            {!estProprietaire && user && (
              <Link to={`/reservation/${objet.id}`} className="flex-1">
                <Bouton className="w-full">Réserver</Bouton>
              </Link>
            )}
            {!user && (
              <Link to="/connexion" className="flex-1">
                <Bouton className="w-full">Se connecter pour réserver</Bouton>
              </Link>
            )}
            <button className="p-2.5 rounded-full border border-gris-clair hover:bg-gris-fond" title="Signaler">
              <Flag size={18} className="text-gris-moyen" />
            </button>
          </div>
        </div>
      </div>
    </Conteneur>
  )
}
