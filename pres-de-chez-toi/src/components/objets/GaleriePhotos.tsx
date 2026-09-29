import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { PhotoObjet } from '../../types'

interface GaleriePhotosProps {
  photos: PhotoObjet[]
}

export function GaleriePhotos({ photos }: GaleriePhotosProps) {
  const [index, setIndex] = useState(0)

  if (photos.length === 0) {
    return (
      <div className="aspect-[4/3] rounded-2xl bg-gris-fond flex items-center justify-center text-gris-moyen">
        Pas de photo
      </div>
    )
  }

  return (
    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gris-fond">
      <img
        src={photos[index].url}
        alt={`Photo ${index + 1}`}
        className="w-full h-full object-cover"
      />
      {photos.length > 1 && (
        <>
          <button
            onClick={() => setIndex((i) => (i - 1 + photos.length) % photos.length)}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1.5 hover:bg-white"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => setIndex((i) => (i + 1) % photos.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1.5 hover:bg-white"
          >
            <ChevronRight size={20} />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {photos.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${i === index ? 'bg-white' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
