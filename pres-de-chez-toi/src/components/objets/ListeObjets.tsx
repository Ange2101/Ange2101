import { CarteObjet } from './CarteObjet'
import { Chargement } from '../ui/Chargement'
import type { Objet } from '../../types'

interface ListeObjetsProps {
  objets: Objet[]
  loading: boolean
}

export function ListeObjets({ objets, loading }: ListeObjetsProps) {
  if (loading) return <Chargement />

  if (objets.length === 0) {
    return (
      <div className="text-center py-12 text-gris-moyen">
        <p className="text-lg">Aucun objet trouvé</p>
        <p className="text-sm mt-1">Essaie avec d'autres critères de recherche</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {objets.map((objet) => (
        <CarteObjet key={objet.id} objet={objet} />
      ))}
    </div>
  )
}
