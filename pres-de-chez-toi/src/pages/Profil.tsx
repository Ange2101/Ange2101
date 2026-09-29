import { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { User, Package, Star } from 'lucide-react'
import { Conteneur } from '../components/layout/Conteneur'
import { Champ } from '../components/ui/Champ'
import { Bouton } from '../components/ui/Bouton'
import { Chargement } from '../components/ui/Chargement'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'

export function Profil() {
  const { user, profil, loading: loadingAuth } = useAuth()
  const [prenom, setPrenom] = useState(profil?.prenom ?? '')
  const [nom, setNom] = useState(profil?.nom ?? '')
  const [telephone, setTelephone] = useState(profil?.telephone ?? '')
  const [ville, setVille] = useState(profil?.ville ?? '')
  const [codePostal, setCodePostal] = useState(profil?.code_postal ?? '')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  if (loadingAuth) return <Chargement />
  if (!user) return <Navigate to="/connexion" />

  async function sauvegarder(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const { error } = await supabase
      .from('profils')
      .update({ prenom, nom, telephone, ville, code_postal: codePostal })
      .eq('id', user!.id)

    setMessage(error ? error.message : 'Profil mis à jour')
    setSaving(false)
  }

  return (
    <Conteneur className="py-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-gris-fond flex items-center justify-center">
          <User size={28} className="text-gris-moyen" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gris-anthracite">{profil?.prenom} {profil?.nom}</h1>
          {profil?.note_moyenne && (
            <div className="flex items-center gap-1 text-sm text-gris-moyen">
              <Star size={14} className="text-orange fill-orange" />
              {profil.note_moyenne.toFixed(1)}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-4 mb-8">
        <Link to="/mes-objets" className="flex items-center gap-1.5 text-sm text-orange font-semibold hover:underline">
          <Package size={16} />
          Mes objets
        </Link>
      </div>

      <form onSubmit={sauvegarder} className="max-w-md space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Champ label="Prénom" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
          <Champ label="Nom" value={nom} onChange={(e) => setNom(e.target.value)} />
        </div>
        <Champ label="Téléphone" type="tel" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
        <div className="grid grid-cols-2 gap-4">
          <Champ label="Ville" value={ville} onChange={(e) => setVille(e.target.value)} />
          <Champ label="Code postal" value={codePostal} onChange={(e) => setCodePostal(e.target.value)} />
        </div>

        {message && <p className="text-sm text-vert">{message}</p>}

        <Bouton type="submit" disabled={saving} className="w-full">
          {saving ? 'Enregistrement...' : 'Enregistrer'}
        </Bouton>
      </form>
    </Conteneur>
  )
}
