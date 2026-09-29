import { Link } from 'react-router-dom'
import { Search, User, LogOut } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

export function Header() {
  const { user, deconnexion } = useAuth()

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gris-clair">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-orange">
          Près de Chez Toi
        </Link>

        <div className="flex items-center gap-3">
          <Link to="/recherche" className="p-2 rounded-full hover:bg-gris-fond">
            <Search size={20} className="text-gris-anthracite" />
          </Link>

          {user ? (
            <>
              <Link to="/profil" className="p-2 rounded-full hover:bg-gris-fond">
                <User size={20} className="text-gris-anthracite" />
              </Link>
              <button onClick={deconnexion} className="p-2 rounded-full hover:bg-gris-fond">
                <LogOut size={20} className="text-gris-moyen" />
              </button>
            </>
          ) : (
            <Link
              to="/connexion"
              className="rounded-full bg-orange text-white px-4 py-1.5 text-sm font-semibold hover:bg-orange-hover transition-colors"
            >
              Connexion
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
