import { Champ } from '../ui/Champ'
import { aujourdhui } from '../../lib/dates'

interface SelecteurDatesProps {
  dateDebut: string
  dateFin: string
  onDebutChange: (val: string) => void
  onFinChange: (val: string) => void
}

export function SelecteurDates({ dateDebut, dateFin, onDebutChange, onFinChange }: SelecteurDatesProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Champ
        label="Date de début"
        type="date"
        min={aujourdhui()}
        value={dateDebut}
        onChange={(e) => onDebutChange(e.target.value)}
        required
      />
      <Champ
        label="Date de fin"
        type="date"
        min={dateDebut || aujourdhui()}
        value={dateFin}
        onChange={(e) => onFinChange(e.target.value)}
        required
      />
    </div>
  )
}
