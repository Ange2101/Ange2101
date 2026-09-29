import { Link } from 'react-router-dom'
import { Search, PlusCircle, Shield, MapPin } from 'lucide-react'
import { Conteneur } from '../components/layout/Conteneur'
import { Bouton } from '../components/ui/Bouton'
import { ListeObjets } from '../components/objets/ListeObjets'
import { useObjets } from '../hooks/useObjets'
import { useAuth } from '../hooks/useAuth'

export function Accueil() {
  const { objets, loading } = useObjets()
  const { user } = useAuth()

  return (
    <div>
      <section className="bg-orange-pale py-12 md:py-20">
        <Conteneur className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gris-anthracite mb-4">
            Emprunte à tes voisins,<br />prête ce que tu n'utilises pas
          </h1>
          <p className="text-gris-moyen text-lg mb-8 max-w-xl mx-auto">
            Location d'objets entre particuliers à Bourg-en-Bresse et alentours. Simple, sécurisé, entre voisins.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/recherche">
              <Bouton taille="lg" className="flex items-center gap-2">
                <Search size={20} />
                Trouver un objet
              </Bouton>
            </Link>
            {user && (
              <Link to="/publier">
                <Bouton variante="secondaire" taille="lg" className="flex items-center gap-2">
                  <PlusCircle size={20} />
                  Proposer un objet
                </Bouton>
              </Link>
            )}
          </div>
        </Conteneur>
      </section>

      <section className="py-12 bg-gris-fond">
        <Conteneur>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-white rounded-xl p-6">
              <div className="w-12 h-12 rounded-full bg-orange-pale flex items-center justify-center mx-auto mb-3">
                <Search size={24} className="text-orange" />
              </div>
              <h3 className="font-semibold text-gris-anthracite mb-1">Cherche</h3>
              <p className="text-sm text-gris-moyen">Trouve l'objet qu'il te faut près de chez toi</p>
            </div>
            <div className="bg-white rounded-xl p-6">
              <div className="w-12 h-12 rounded-full bg-orange-pale flex items-center justify-center mx-auto mb-3">
                <MapPin size={24} className="text-orange" />
              </div>
              <h3 className="font-semibold text-gris-anthracite mb-1">Réserve</h3>
              <p className="text-sm text-gris-moyen">Choisis tes dates et récupère l'objet chez ton voisin</p>
            </div>
            <div className="bg-white rounded-xl p-6">
              <div className="w-12 h-12 rounded-full bg-orange-pale flex items-center justify-center mx-auto mb-3">
                <Shield size={24} className="text-orange" />
              </div>
              <h3 className="font-semibold text-gris-anthracite mb-1">En confiance</h3>
              <p className="text-sm text-gris-moyen">Paiement sécurisé, caution et avis entre voisins</p>
            </div>
          </div>
        </Conteneur>
      </section>

      <section className="py-12">
        <Conteneur>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gris-anthracite">Dernières annonces</h2>
            <Link to="/recherche" className="text-orange text-sm font-semibold hover:underline">
              Tout voir
            </Link>
          </div>
          <ListeObjets objets={objets.slice(0, 8)} loading={loading} />
        </Conteneur>
      </section>
    </div>
  )
}
