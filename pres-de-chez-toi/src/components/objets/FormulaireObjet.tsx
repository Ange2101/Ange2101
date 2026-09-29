import { useState } from 'react'
import { Upload } from 'lucide-react'
import { Champ } from '../ui/Champ'
import { Bouton } from '../ui/Bouton'
import { CATEGORIES, type Categorie } from '../../types'
import { validerImage } from '../../lib/validation'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export function FormulaireObjet() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [titre, setTitre] = useState('')
  const [description, setDescription] = useState('')
  const [categorie, setCategorie] = useState<Categorie>('bricolage')
  const [prixJour, setPrixJour] = useState('')
  const [caution, setCaution] = useState('')
  const [ville, setVille] = useState('')
  const [photos, setPhotos] = useState<File[]>([])
  const [erreur, setErreur] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  function ajouterPhotos(fichiers: FileList | null) {
    if (!fichiers) return
    const valides: File[] = []
    for (const f of fichiers) {
      const err = validerImage(f)
      if (err) { setErreur(err); return }
      valides.push(f)
    }
    setPhotos((prev) => [...prev, ...valides].slice(0, 5))
    setErreur(null)
  }

  async function soumettre(e: React.FormEvent) {
    e.preventDefault()
    if (!user) return
    if (!titre || !description || !prixJour || !ville) {
      setErreur('Remplis tous les champs obligatoires')
      return
    }

    setLoading(true)
    setErreur(null)

    const { data: objet, error: objErreur } = await supabase
      .from('objets')
      .insert({
        proprietaire_id: user.id,
        titre,
        description,
        categorie,
        prix_jour: parseFloat(prixJour),
        caution: parseFloat(caution) || 0,
        latitude: 46.2056,
        longitude: 5.2251,
        ville,
        disponible: true,
      })
      .select()
      .single()

    if (objErreur || !objet) {
      setErreur(objErreur?.message ?? 'Erreur lors de la création')
      setLoading(false)
      return
    }

    for (let i = 0; i < photos.length; i++) {
      const fichier = photos[i]
      const chemin = `${objet.id}/${Date.now()}-${i}.${fichier.name.split('.').pop()}`
      const { error: uploadErr } = await supabase.storage.from('photos-objets').upload(chemin, fichier)
      if (!uploadErr) {
        const { data: urlData } = supabase.storage.from('photos-objets').getPublicUrl(chemin)
        await supabase.from('photos_objets').insert({
          objet_id: objet.id,
          url: urlData.publicUrl,
          position: i,
        })
      }
    }

    setLoading(false)
    navigate('/mes-objets')
  }

  return (
    <form onSubmit={soumettre} className="space-y-4">
      <Champ label="Titre" value={titre} onChange={(e) => setTitre(e.target.value)} placeholder="Ex : Perceuse Bosch" required />

      <div>
        <label className="block text-sm font-medium text-gris-anthracite mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full rounded-xl border border-gris-clair px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange"
          placeholder="Décris ton objet, son état..."
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gris-anthracite mb-1">Catégorie</label>
        <select
          value={categorie}
          onChange={(e) => setCategorie(e.target.value as Categorie)}
          className="w-full rounded-xl border border-gris-clair px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange bg-white"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Champ label="Prix par jour (€)" type="number" min="1" step="0.5" value={prixJour} onChange={(e) => setPrixJour(e.target.value)} required />
        <Champ label="Caution (€)" type="number" min="0" step="1" value={caution} onChange={(e) => setCaution(e.target.value)} />
      </div>

      <Champ label="Ville" value={ville} onChange={(e) => setVille(e.target.value)} placeholder="Bourg-en-Bresse" required />

      <div>
        <label className="block text-sm font-medium text-gris-anthracite mb-1">Photos (max 5)</label>
        <label className="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gris-clair p-6 cursor-pointer hover:border-orange transition-colors">
          <Upload size={20} className="text-gris-moyen" />
          <span className="text-gris-moyen">Ajouter des photos</span>
          <input type="file" accept="image/jpeg,image/png,image/webp" multiple className="hidden" onChange={(e) => ajouterPhotos(e.target.files)} />
        </label>
        {photos.length > 0 && (
          <div className="flex gap-2 mt-2 flex-wrap">
            {photos.map((p, i) => (
              <div key={i} className="w-16 h-16 rounded-lg overflow-hidden bg-gris-fond">
                <img src={URL.createObjectURL(p)} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>

      {erreur && <p className="text-rouge text-sm">{erreur}</p>}

      <Bouton type="submit" disabled={loading} className="w-full">
        {loading ? 'Publication...' : 'Publier l\'annonce'}
      </Bouton>
    </form>
  )
}
