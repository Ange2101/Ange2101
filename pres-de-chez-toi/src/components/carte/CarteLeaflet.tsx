import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import type { Objet } from '../../types'
import { formaterPrix } from '../../lib/prix'
import 'leaflet/dist/leaflet.css'

const icone = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

interface CarteLeafletProps {
  objets: Objet[]
  centre?: [number, number]
  className?: string
}

export function CarteLeaflet({ objets, centre = [46.2056, 5.2251], className = '' }: CarteLeafletProps) {
  return (
    <MapContainer center={centre} zoom={12} className={`rounded-xl overflow-hidden ${className}`} style={{ height: '400px' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {objets.map((objet) => (
        <Marker key={objet.id} position={[objet.latitude, objet.longitude]} icon={icone}>
          <Popup>
            <div className="text-sm">
              <p className="font-semibold">{objet.titre}</p>
              <p className="text-orange font-bold">{formaterPrix(objet.prix_jour)} / jour</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
