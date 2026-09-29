export type Categorie =
  | 'bricolage'
  | 'jardinage'
  | 'cuisine'
  | 'sport-et-loisirs'
  | 'camping'
  | 'puericulture'
  | 'transport'
  | 'evenements-et-fetes'

export type StatutReservation =
  | 'en_attente'
  | 'confirmee'
  | 'en_cours'
  | 'terminee'
  | 'annulee'
  | 'litige'

export interface Profil {
  id: string
  prenom: string
  nom: string
  telephone: string
  ville: string
  code_postal: string
  photo_url: string | null
  note_moyenne: number | null
  stripe_account_id: string | null
  created_at: string
}

export interface Objet {
  id: string
  proprietaire_id: string
  titre: string
  description: string
  categorie: Categorie
  prix_jour: number
  caution: number
  latitude: number
  longitude: number
  ville: string
  disponible: boolean
  created_at: string
  photos?: PhotoObjet[]
  proprietaire?: Profil
}

export interface PhotoObjet {
  id: string
  objet_id: string
  url: string
  position: number
}

export interface Reservation {
  id: string
  objet_id: string
  locataire_id: string
  date_debut: string
  date_fin: string
  prix_total: number
  commission: number
  montant_proprietaire: number
  statut: StatutReservation
  stripe_payment_intent_id: string | null
  created_at: string
  objet?: Objet
  locataire?: Profil
}

export interface Message {
  id: string
  reservation_id: string
  expediteur_id: string
  contenu: string
  lu: boolean
  created_at: string
  expediteur?: Profil
}

export interface Avis {
  id: string
  reservation_id: string
  auteur_id: string
  cible_id: string
  note: number
  commentaire: string
  created_at: string
  auteur?: Profil
}

export const CATEGORIES: { value: Categorie; label: string }[] = [
  { value: 'bricolage', label: 'Bricolage' },
  { value: 'jardinage', label: 'Jardinage' },
  { value: 'cuisine', label: 'Cuisine' },
  { value: 'sport-et-loisirs', label: 'Sport et loisirs' },
  { value: 'camping', label: 'Camping' },
  { value: 'puericulture', label: 'Puériculture' },
  { value: 'transport', label: 'Transport' },
  { value: 'evenements-et-fetes', label: 'Événements et fêtes' },
]
