import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { PlusCircle, Package } from 'lucide-react'
import { Conteneur } from '../components/layout/Conteneur'
import { Bouton } from '../components/ui/Bouton'
import { Chargement } from '../components/ui/Chargement'
import { CarteObjet } from '../components/objets/CarteObjet'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'
import type { Objet } from '../types'

export function MesObjets() {
  const { user, loading: loadingAuth } = useAuth()
  const [objets, setObjets] = useState<Objet[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    supabase
      .from('objets')
      .select('*, photos_objets(*)')
      .eq('proprietaire_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setObjets((data as Objet[]) ?? [])
        setLoading(false)
      })
  }, [user])

  if (!loadingAuth && !user) return <Navigate to="/connexion" />

  return (
    <Conteneur className="py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gris-anthracite">Mes objets</h1>
        <Link to="/publier">
          <Bouton taille="sm" className="flex items-center gap-1.5">
            <PlusCircle size={16} />
            Publier
          </Bouton>
        </Link>
      </div>

      {loading ? (
        <Chargement />
      ) : objets.length === 0 ? (
        <div className="text-center py-12 text-gris-moyen">
          <Package size={40} className="mx-auto mb-3 text-gris-clair" />
          <p>Tu n'as pas encore publié d'objet</p>
          <Link to="/publier" className="text-orange text-sm font-semibold hover:underline mt-2 inline-block">
            Publier mon premier objet
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {objets.map((objet) => (
            <CarteObjet key={objet.id} objet={objet} />
          ))}
        </div>
      )}
    </Conteneur>
  )
}
