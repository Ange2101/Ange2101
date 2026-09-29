import { createContext, useEffect, useState, type ReactNode } from 'react'
import type { User, Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import type { Profil } from '../types'

interface AuthContextType {
  user: User | null
  session: Session | null
  profil: Profil | null
  loading: boolean
  connexion: (email: string, motDePasse: string) => Promise<{ error: string | null }>
  inscription: (email: string, motDePasse: string, prenom: string, nom: string) => Promise<{ error: string | null }>
  deconnexion: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profil, setProfil] = useState<Profil | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) chargerProfil(session.user.id)
      else setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) chargerProfil(session.user.id)
      else {
        setProfil(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  async function chargerProfil(userId: string) {
    const { data } = await supabase
      .from('profils')
      .select('*')
      .eq('id', userId)
      .single()
    setProfil(data)
    setLoading(false)
  }

  async function connexion(email: string, motDePasse: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password: motDePasse })
    return { error: error?.message ?? null }
  }

  async function inscription(email: string, motDePasse: string, prenom: string, nom: string) {
    const { data, error } = await supabase.auth.signUp({ email, password: motDePasse })
    if (error) return { error: error.message }
    if (data.user) {
      await supabase.from('profils').insert({
        id: data.user.id,
        prenom,
        nom,
        telephone: '',
        ville: '',
        code_postal: '',
      })
    }
    return { error: null }
  }

  async function deconnexion() {
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ user, session, profil, loading, connexion, inscription, deconnexion }}>
      {children}
    </AuthContext.Provider>
  )
}
