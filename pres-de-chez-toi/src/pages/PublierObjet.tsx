import { Conteneur } from '../components/layout/Conteneur'
import { FormulaireObjet } from '../components/objets/FormulaireObjet'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'

export function PublierObjet() {
  const { user, loading } = useAuth()

  if (!loading && !user) return <Navigate to="/connexion" />

  return (
    <Conteneur className="py-6">
      <h1 className="text-2xl font-bold text-gris-anthracite mb-6">Publier une annonce</h1>
      <div className="max-w-lg">
        <FormulaireObjet />
      </div>
    </Conteneur>
  )
}
