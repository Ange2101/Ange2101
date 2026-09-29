import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Conteneur } from '../components/layout/Conteneur'
import { Champ } from '../components/ui/Champ'
import { Bouton } from '../components/ui/Bouton'
import { useAuth } from '../hooks/useAuth'
import { validerEmail, validerMotDePasse } from '../lib/validation'

export function Inscription() {
  const { inscription } = useAuth()
  const navigate = useNavigate()
  const [prenom, setPrenom] = useState('')
  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [motDePasse, setMotDePasse] = useState('')
  const [erreur, setErreur] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function soumettre(e: React.FormEvent) {
    e.preventDefault()
    if (!validerEmail(email)) { setErreur('Email invalide'); return }
    const errMdp = validerMotDePasse(motDePasse)
    if (errMdp) { setErreur(errMdp); return }
    if (!prenom || !nom) { setErreur('Prénom et nom sont obligatoires'); return }

    setLoading(true)
    setErreur(null)
    const { error } = await inscription(email, motDePasse, prenom, nom)
    if (error) { setErreur(error); setLoading(false); return }
    navigate('/')
  }

  return (
    <Conteneur className="py-12">
      <div className="max-w-sm mx-auto">
        <h1 className="text-2xl font-bold text-gris-anthracite text-center mb-8">Inscription</h1>
        <form onSubmit={soumettre} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Champ label="Prénom" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
            <Champ label="Nom" value={nom} onChange={(e) => setNom(e.target.value)} required />
          </div>
          <Champ label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Champ
            label="Mot de passe"
            type="password"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            placeholder="12 caractères minimum"
            required
          />

          {erreur && <p className="text-rouge text-sm">{erreur}</p>}

          <Bouton type="submit" disabled={loading} className="w-full">
            {loading ? 'Inscription...' : 'S\'inscrire'}
          </Bouton>
        </form>

        <p className="text-center text-sm text-gris-moyen mt-6">
          Déjà un compte ?{' '}
          <Link to="/connexion" className="text-orange font-semibold hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </Conteneur>
  )
}
