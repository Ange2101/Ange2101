import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Reservation } from '../types'
import { useAuth } from './useAuth'

export function useReservations() {
  const { user } = useAuth()
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    supabase
      .from('reservations')
      .select('*, objet:objets(*, photos_objets(*)), locataire:profils(*)')
      .or(`locataire_id.eq.${user.id},objet.proprietaire_id.eq.${user.id}`)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setReservations((data as Reservation[]) ?? [])
        setLoading(false)
      })
  }, [user])

  return { reservations, loading }
}
