export function validerEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function validerMotDePasse(mdp: string): string | null {
  if (mdp.length < 12) return 'Le mot de passe doit contenir au moins 12 caractères'
  return null
}

export function nettoyerTexte(texte: string): string {
  const div = document.createElement('div')
  div.textContent = texte
  return div.innerHTML
}

export function validerImage(fichier: File): string | null {
  const typesAcceptes = ['image/jpeg', 'image/png', 'image/webp']
  if (!typesAcceptes.includes(fichier.type)) {
    return 'Format accepté : JPEG, PNG ou WebP'
  }
  if (fichier.size > 5 * 1024 * 1024) {
    return 'L\'image ne doit pas dépasser 5 Mo'
  }
  return null
}
