import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Conteneur } from '../components/layout/Conteneur'
import { Champ } from '../components/ui/Champ'
import { Bouton } from '../components/ui/Bouton'
import { useAuth } from '../hooks/useAuth'
import { validerEmail } from '../lib/validation'

export function Connexion() {
  const { connexion } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [motDePasse, setMotDePasse] = useState('')
  const [erreur, setErreur] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function soumettre(e: React.FormEvent) {
    e.preventDefault()
    if (!validerEmail(email)) { setErreur('Email invalide'); return }
    setLoading(true)
    setErreur(null)
    const { error } = await connexion(email, motDePasse)
    if (error) { setErreur(error); setLoading(false); return }
    navigate('/')
  }

  return (
    <Conteneur className="py-12">
      <div className="max-w-sm mx-auto">
        <h1 className="text-2xl font-bold text-gris-anthracite text-center mb-8">Connexion</h1>
        <form onSubmit={soumettre} className="space-y-4">
          <Champ label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Champ label="Mot de passe" type="password" value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} required />

          {erreur && <p className="text-rouge text-sm">{erreur}</p>}

          <Bouton type="submit" disabled={loading} className="w-full">
            {loading ? 'Connexion...' : 'Se connecter'}
          </Bouton>
        </form>

        <p className="text-center text-sm text-gris-moyen mt-6">
          Pas encore de compte ?{' '}
          <Link to="/inscription" className="text-orange font-semibold hover:underline">
            S'inscrire
          </Link>
        </p>
      </div>
    </Conteneur>
  )
}
