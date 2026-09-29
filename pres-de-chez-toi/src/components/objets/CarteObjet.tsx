import { useNavigate } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import { Carte } from '../ui/Carte'
import { Badge } from '../ui/Badge'
import { formaterPrix } from '../../lib/prix'
import type { Objet } from '../../types'

interface CarteObjetProps {
  objet: Objet
}

export function CarteObjet({ objet }: CarteObjetProps) {
  const navigate = useNavigate()
  const photo = objet.photos?.[0]?.url

  return (
    <Carte onClick={() => navigate(`/objet/${objet.id}`)} className="flex flex-col">
      <div className="aspect-square bg-gris-fond overflow-hidden">
        {photo ? (
          <img src={photo} alt={objet.titre} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gris-moyen text-sm">
            Pas de photo
          </div>
        )}
      </div>
      <div className="p-3 flex flex-col gap-1.5">
        <Badge>{objet.categorie.replace(/-/g, ' ')}</Badge>
        <h3 className="font-semibold text-gris-anthracite line-clamp-1">{objet.titre}</h3>
        <div className="flex items-center gap-1 text-sm text-gris-moyen">
          <MapPin size={14} />
          <span>{objet.ville}</span>
        </div>
        <p className="text-orange font-bold">{formaterPrix(objet.prix_jour)} / jour</p>
      </div>
    </Carte>
  )
}
