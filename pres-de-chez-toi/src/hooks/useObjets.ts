import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Objet, Categorie } from '../types'

interface FiltresObjets {
  recherche?: string
  categorie?: Categorie
  ville?: string
}

export function useObjets(filtres?: FiltresObjets) {
  const [objets, setObjets] = useState<Objet[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    charger()
  }, [filtres?.recherche, filtres?.categorie, filtres?.ville])

  async function charger() {
    setLoading(true)
    let query = supabase
      .from('objets')
      .select('*, photos_objets(*), proprietaire:profils(*)')
      .eq('disponible', true)
      .order('created_at', { ascending: false })

    if (filtres?.categorie) query = query.eq('categorie', filtres.categorie)
    if (filtres?.ville) query = query.ilike('ville', `%${filtres.ville}%`)
    if (filtres?.recherche) query = query.or(`titre.ilike.%${filtres.recherche}%,description.ilike.%${filtres.recherche}%`)

    const { data } = await query
    setObjets((data as Objet[]) ?? [])
    setLoading(false)
  }

  return { objets, loading, recharger: charger }
}

export function useObjet(id: string | undefined) {
  const [objet, setObjet] = useState<Objet | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    supabase
      .from('objets')
      .select('*, photos_objets(*), proprietaire:profils(*)')
      .eq('id', id)
      .single()
      .then(({ data }) => {
        setObjet(data as Objet | null)
        setLoading(false)
      })
  }, [id])

  return { objet, loading }
}
