import { useEffect, type ReactNode } from 'react'
import { X } from 'lucide-react'

interface ModaleProps {
  ouvert: boolean
  onFermer: () => void
  titre: string
  children: ReactNode
}

export function Modale({ ouvert, onFermer, titre, children }: ModaleProps) {
  useEffect(() => {
    if (ouvert) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [ouvert])

  if (!ouvert) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40" onClick={onFermer} />
      <div className="relative bg-white rounded-xl shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gris-clair">
          <h2 className="text-lg font-bold text-gris-anthracite">{titre}</h2>
          <button onClick={onFermer} className="p-1 rounded-full hover:bg-gris-fond">
            <X size={20} />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}
