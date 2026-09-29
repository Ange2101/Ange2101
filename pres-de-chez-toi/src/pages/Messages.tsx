import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Send, MessageCircle } from 'lucide-react'
import { Conteneur } from '../components/layout/Conteneur'
import { Chargement } from '../components/ui/Chargement'
import { Carte } from '../components/ui/Carte'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'
import type { Message, Reservation } from '../types'

export function Messages() {
  const { user, loading: loadingAuth } = useAuth()
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [selected, setSelected] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [contenu, setContenu] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    supabase
      .from('reservations')
      .select('*, objet:objets(titre)')
      .or(`locataire_id.eq.${user.id},objet.proprietaire_id.eq.${user.id}`)
      .then(({ data }) => {
        setReservations((data as Reservation[]) ?? [])
        setLoading(false)
      })
  }, [user])

  useEffect(() => {
    if (!selected) return
    supabase
      .from('messages')
      .select('*, expediteur:profils(prenom)')
      .eq('reservation_id', selected)
      .order('created_at', { ascending: true })
      .then(({ data }) => setMessages((data as Message[]) ?? []))
  }, [selected])

  if (!loadingAuth && !user) return <Navigate to="/connexion" />

  async function envoyer(e: React.FormEvent) {
    e.preventDefault()
    if (!contenu.trim() || !user || !selected) return
    await supabase.from('messages').insert({
      reservation_id: selected,
      expediteur_id: user.id,
      contenu: contenu.trim(),
      lu: false,
    })
    setContenu('')
    const { data } = await supabase
      .from('messages')
      .select('*, expediteur:profils(prenom)')
      .eq('reservation_id', selected)
      .order('created_at', { ascending: true })
    setMessages((data as Message[]) ?? [])
  }

  if (loading) return <Chargement />

  return (
    <Conteneur className="py-6">
      <h1 className="text-2xl font-bold text-gris-anthracite mb-6">Messages</h1>

      {reservations.length === 0 ? (
        <div className="text-center py-12 text-gris-moyen">
          <MessageCircle size={40} className="mx-auto mb-3 text-gris-clair" />
          <p>Aucune conversation</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-[280px_1fr] gap-4 min-h-[400px]">
          <div className="space-y-2">
            {reservations.map((r) => (
              <Carte
                key={r.id}
                onClick={() => setSelected(r.id)}
                className={`p-3 ${selected === r.id ? 'ring-2 ring-orange' : ''}`}
              >
                <p className="font-semibold text-sm text-gris-anthracite">{(r.objet as any)?.titre ?? 'Réservation'}</p>
              </Carte>
            ))}
          </div>

          <div className="bg-gris-fond rounded-xl flex flex-col">
            {selected ? (
              <>
                <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-[400px]">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`max-w-[75%] rounded-xl p-3 text-sm ${
                        m.expediteur_id === user?.id
                          ? 'ml-auto bg-orange text-white'
                          : 'bg-white text-gris-anthracite'
                      }`}
                    >
                      {m.contenu}
                    </div>
                  ))}
                </div>
                <form onSubmit={envoyer} className="p-3 border-t border-gris-clair flex gap-2">
                  <input
                    value={contenu}
                    onChange={(e) => setContenu(e.target.value)}
                    placeholder="Écris un message..."
                    className="flex-1 rounded-xl border border-gris-clair px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange"
                  />
                  <button type="submit" className="p-2 rounded-full bg-orange text-white hover:bg-orange-hover">
                    <Send size={18} />
                  </button>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gris-moyen text-sm">
                Sélectionne une conversation
              </div>
            )}
          </div>
        </div>
      )}
    </Conteneur>
  )
}
