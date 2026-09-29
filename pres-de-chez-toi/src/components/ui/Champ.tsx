import type { InputHTMLAttributes } from 'react'

interface ChampProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  erreur?: string | null
}

export function Champ({ label, erreur, id, className = '', ...props }: ChampProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s/g, '-')
  return (
    <div className={className}>
      <label htmlFor={inputId} className="block text-sm font-medium text-gris-anthracite mb-1">
        {label}
      </label>
      <input
        id={inputId}
        className={`w-full rounded-xl border px-4 py-2.5 text-gris-anthracite placeholder:text-gris-moyen focus:outline-none focus:ring-2 focus:ring-orange ${erreur ? 'border-rouge' : 'border-gris-clair'}`}
        {...props}
      />
      {erreur && <p className="mt-1 text-sm text-rouge">{erreur}</p>}
    </div>
  )
}
