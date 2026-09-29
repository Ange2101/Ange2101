# Près de Chez Toi

Application web progressive de prêt et location d'objets entre voisins à Bourg-en-Bresse et dans un rayon de 15 km.

## Le concept

Les habitants possèdent du matériel utilisé quelques heures par an (perceuse, nettoyeur haute pression, remorque, appareil à raclette…). **Près de Chez Toi** met en relation celui qui a besoin d'un objet ponctuellement avec un voisin qui le possède, dans un cadre sécurisé par un paiement et une caution.

## Modèle économique

- **Commission** : 12 % prélevée côté propriétaire
- **Part reversée au propriétaire** : 88 %
- **Durée de location type** : 1 à 7 jours
- **Caution** : empreinte bancaire, non débitée sauf litige
- **Paiement** : carte bancaire, Apple Pay et Google Pay via Stripe Connect

> Exemple : une perceuse louée 20 €/jour pendant 2 jours → 40 € total, 4,80 € de commission, 35,20 € reversés au propriétaire.

## Stack technique

| Couche | Technologie | Rôle |
|---|---|---|
| Front-end | React + Vite + TypeScript | Interface et navigation |
| Styles | Tailwind CSS | Charte graphique |
| Routage | React Router | Pages et navigation |
| PWA | Vite Plugin PWA | Manifeste, service worker, installation |
| Base de données | Supabase (PostgreSQL) | Utilisateurs, objets, réservations |
| Authentification | Supabase Auth | Inscription par email et mot de passe |
| Stockage fichiers | Supabase Storage | Photos des objets |
| Logique serveur | Supabase Edge Functions | Paiements, calcul de commission |
| Paiement | Stripe Connect | Encaissement, reversement, caution |
| Cartographie | Leaflet + OpenStreetMap | Carte des objets à proximité |
| Hébergement | Vercel ou Netlify | Mise en ligne du front-end |

## Arborescence

```
pres-de-chez-toi/
├── public/
│   ├── manifest.webmanifest
│   ├── icons/
│   └── favicon.svg
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── pages/           # Accueil, Recherche, ObjetDetail, Reservation…
│   ├── components/
│   │   ├── layout/      # Header, BarreNavigation, Conteneur
│   │   ├── ui/          # Bouton, Champ, Carte, Badge, Modale…
│   │   ├── objets/      # CarteObjet, ListeObjets, FiltresRecherche…
│   │   ├── reservation/ # SelecteurDates, RecapitulatifPrix, BoutonPaiement
│   │   └── carte/       # CarteLeaflet
│   ├── hooks/           # useAuth, useObjets, useReservations, useGeolocalisation
│   ├── lib/             # supabase, stripe, prix, dates, validation
│   ├── context/         # AuthContext
│   ├── types/
│   └── styles/
├── supabase/
│   ├── migrations/      # Tables, politiques RLS, index
│   └── functions/       # creer-paiement, webhook-stripe, liberer-caution
├── .env.example
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## Modèle de données

Six tables principales : **profils**, **objets**, **photos_objets**, **reservations**, **messages**, **avis**.

Statuts de réservation : `en attente` → `confirmée` → `en cours` → `terminée` | `annulée` | `litige`

Catégories d'objets : bricolage, jardinage, cuisine, sport et loisirs, camping, puériculture, transport, événements et fêtes.

## Charte graphique

- **Couleur d'accent** : orange `#F26419` (survol `#D14E0C`, fond léger `#FFF1E8`)
- **Fond** : blanc `#FFFFFF`, sections `#F7F7F5`
- **Texte** : anthracite `#1C1B1A`, secondaire `#6B6B68`
- **Typographie** : Inter ou Manrope, sans empattement
- **Formes** : bords arrondis 12 px (cartes), 16 px (images), boutons pleinement arrondis
- **Icônes** : linéaires trait fin (Lucide ou Phosphor)
- **Ton** : tutoiement, vocabulaire de voisinage (emprunter, voisin)

## Sécurité

- **Données** : politiques RLS sur chaque table, clé de service uniquement côté serveur
- **Auth** : mot de passe 12 caractères minimum, email vérifié, limitation des tentatives
- **Paiement** : formulaire Stripe en iframe, webhooks vérifiés par signature
- **Contenus** : images limitées en taille/type, champs nettoyés contre XSS, bouton de signalement
- **Vie privée** : adresse précise visible uniquement après confirmation, suppression de compte possible, conformité RGPD

## Installation

```bash
git clone <url-du-repo>
cd pres-de-chez-toi
npm install
cp .env.example .env   # Renseigner les clés Supabase et Stripe
npm run dev
```

## Tests

| Phase | Outil |
|---|---|
| Unitaires (prix, commission) | Vitest |
| Composants | Testing Library |
| Intégration | Supabase local |
| Bout en bout | Playwright |
| Paiement | Stripe mode test |
| Sécurité (RLS) | Requêtes manuelles |
| Installation PWA | Appareils réels |
| Utilisateurs | Observation en situation |
| Performance | Lighthouse |
| Accessibilité | Axe |

## Périmètre v1

**Inclus** : inscription/connexion, annonces avec photos, recherche (mot-clé, catégorie, distance), calendrier de disponibilité, réservation, paiement test, messagerie, avis, PWA.

**Exclus** : app native, livraison, assurance, vérification d'identité, SMS, multilingue, extension hors Ain.

## Licence

Projet scolaire — tous droits réservés.
