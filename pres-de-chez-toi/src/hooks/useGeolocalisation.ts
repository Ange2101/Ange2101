import { useEffect, useState } from 'react'

interface Position {
  latitude: number
  longitude: number
}

export function useGeolocalisation() {
  const [position, setPosition] = useState<Position | null>(null)
  const [erreur, setErreur] = useState<string | null>(null)

  useEffect(() => {
    if (!navigator.geolocation) {
      setErreur('La géolocalisation n\'est pas supportée par ce navigateur')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => setPosition({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
      () => setErreur('Impossible d\'obtenir ta position'),
    )
  }, [])

  return { position, erreur }
}
