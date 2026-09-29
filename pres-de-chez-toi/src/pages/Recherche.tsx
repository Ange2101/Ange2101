import { useState } from 'react'
import { Conteneur } from '../components/layout/Conteneur'
import { FiltresRecherche } from '../components/objets/FiltresRecherche'
import { ListeObjets } from '../components/objets/ListeObjets'
import { CarteLeaflet } from '../components/carte/CarteLeaflet'
import { useObjets } from '../hooks/useObjets'
import type { Categorie } from '../types'
import { Map, List } from 'lucide-react'

export function Recherche() {
  const [recherche, setRecherche] = useState('')
  const [categorie, setCategorie] = useState<Categorie | ''>('')
  const [vueCarte, setVueCarte] = useState(false)
  const { objets, loading } = useObjets({
    recherche: recherche || undefined,
    categorie: categorie || undefined,
  })

  return (
    <Conteneur className="py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gris-anthracite">Rechercher</h1>
        <button
          onClick={() => setVueCarte((v) => !v)}
          className="flex items-center gap-1.5 text-sm text-gris-moyen hover:text-orange transition-colors"
        >
          {vueCarte ? <List size={18} /> : <Map size={18} />}
          {vueCarte ? 'Liste' : 'Carte'}
        </button>
      </div>

      <FiltresRecherche
        recherche={recherche}
        onRechercheChange={setRecherche}
        categorie={categorie}
        onCategorieChange={setCategorie}
      />

      {vueCarte ? (
        <CarteLeaflet objets={objets} />
      ) : (
        <ListeObjets objets={objets} loading={loading} />
      )}
    </Conteneur>
  )
}
