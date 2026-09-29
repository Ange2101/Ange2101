import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { Header } from './components/layout/Header'
import { BarreNavigation } from './components/layout/BarreNavigation'
import { Accueil } from './pages/Accueil'
import { Recherche } from './pages/Recherche'
import { ObjetDetail } from './pages/ObjetDetail'
import { PublierObjet } from './pages/PublierObjet'
import { ReservationPage } from './pages/Reservation'
import { MesReservations } from './pages/MesReservations'
import { MesObjets } from './pages/MesObjets'
import { Profil } from './pages/Profil'
import { Messages } from './pages/Messages'
import { Connexion } from './pages/Connexion'
import { Inscription } from './pages/Inscription'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-white text-gris-anthracite pb-16 md:pb-0">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Accueil />} />
              <Route path="/recherche" element={<Recherche />} />
              <Route path="/objet/:id" element={<ObjetDetail />} />
              <Route path="/publier" element={<PublierObjet />} />
              <Route path="/reservation/:id" element={<ReservationPage />} />
              <Route path="/mes-reservations" element={<MesReservations />} />
              <Route path="/mes-objets" element={<MesObjets />} />
              <Route path="/profil" element={<Profil />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/connexion" element={<Connexion />} />
              <Route path="/inscription" element={<Inscription />} />
            </Routes>
          </main>
          <BarreNavigation />
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}
