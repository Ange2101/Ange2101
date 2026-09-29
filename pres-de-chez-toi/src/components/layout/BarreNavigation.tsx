import { NavLink } from 'react-router-dom'
import { Home, Search, PlusCircle, CalendarDays, MessageCircle } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

const lienClasses = ({ isActive }: { isActive: boolean }) =>
  `flex flex-col items-center gap-0.5 text-xs ${isActive ? 'text-orange' : 'text-gris-moyen'}`

export function BarreNavigation() {
  const { user } = useAuth()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gris-clair md:hidden">
      <div className="flex justify-around py-2">
        <NavLink to="/" className={lienClasses} end>
          <Home size={20} />
          <span>Accueil</span>
        </NavLink>
        <NavLink to="/recherche" className={lienClasses}>
          <Search size={20} />
          <span>Recherche</span>
        </NavLink>
        {user && (
          <>
            <NavLink to="/publier" className={lienClasses}>
              <PlusCircle size={20} />
              <span>Publier</span>
            </NavLink>
            <NavLink to="/mes-reservations" className={lienClasses}>
              <CalendarDays size={20} />
              <span>Réservations</span>
            </NavLink>
            <NavLink to="/messages" className={lienClasses}>
              <MessageCircle size={20} />
              <span>Messages</span>
            </NavLink>
          </>
        )}
      </div>
    </nav>
  )
}
