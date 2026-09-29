import { Search } from 'lucide-react'
import { CATEGORIES, type Categorie } from '../../types'

interface FiltresRechercheProps {
  recherche: string
  onRechercheChange: (val: string) => void
  categorie: Categorie | ''
  onCategorieChange: (val: Categorie | '') => void
}

export function FiltresRecherche({ recherche, onRechercheChange, categorie, onCategorieChange }: FiltresRechercheProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gris-moyen" />
        <input
          type="text"
          placeholder="Rechercher un objet..."
          value={recherche}
          onChange={(e) => onRechercheChange(e.target.value)}
          className="w-full rounded-xl border border-gris-clair pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange"
        />
      </div>
      <select
        value={categorie}
        onChange={(e) => onCategorieChange(e.target.value as Categorie | '')}
        className="rounded-xl border border-gris-clair px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange bg-white"
      >
        <option value="">Toutes les catégories</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.value} value={cat.value}>{cat.label}</option>
        ))}
      </select>
    </div>
  )
}
