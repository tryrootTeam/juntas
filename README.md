# Juntas

Plateforme de vivienda compartida para mujeres - Valencia

## Stack

- **Frontend**: Vue 3 (Composition API), Vue Router, Pinia, Vite, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Realtime, Storage, RLS)

## Setup

1. **Dépendances**
   ```bash
   npm install
   ```

2. **Variables d'environnement**
   - Copier `env.example` vers `.env`
   - Renseigner `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` (créer un projet sur [supabase.com](https://supabase.com))
   - Pour Google OAuth : remplir `GOOGLE_CLIENT_ID` et `GOOGLE_CLIENT_SECRET` (voir ci‑dessous)

3. **Base de données Supabase**
   - Créer un projet Supabase
   - Exécuter le script `supabase/migrations/001_initial_schema.sql` dans l'éditeur SQL Supabase
   - Créer les buckets Storage : `verification-documents` (private), `profile-photos` (public)

4. **Google OAuth (login « Continuar con Google »)**
   - Créer des identifiants dans [Google Cloud Console](https://console.cloud.google.com/apis/credentials) : type **Web application**, URI de redirection `https://<TON_PROJECT_REF>.supabase.co/auth/v1/callback`
   - **Projet hébergé Supabase** : Dashboard > Authentication > Providers > Google → activer, coller Client ID et Client Secret
   - **Supabase local** (`supabase start`) : mettre `GOOGLE_CLIENT_ID` et `GOOGLE_CLIENT_SECRET` dans `.env` (voir `env.example`). La config est dans `supabase/config.toml` (`[auth.external.google]`).

5. **Lancer le dev**
   ```bash
   npm run dev
   ```

## Structure

```
src/
├── assets/
├── components/   (common, layout, features)
├── views/
├── stores/
├── composables/
├── utils/
├── services/
├── router/
└── main.js
```

## Backend - Landing Page (MVP)

- **Page publique** : route `/` sans auth (`meta: { public: true, requiresAuth: false }` dans le router).
- **Aucun appel Supabase** sur la landing (page 100 % statique côté client).
- **Déploiement** : `vercel.json` configure les rewrites SPA et les en-têtes de cache pour les assets (`/assets/*` → `Cache-Control: public, max-age=31536000, immutable`). HTTPS géré par Vercel.

## Monitoring Auth

Les événements auth (signup, login, logout, failed_login, oauth_error) sont enregistrés dans la table `auth_events`. Requêtes et alertes (failed >10/h, signup spike, OAuth errors) : voir [docs/MONITORING_AUTH.md](docs/MONITORING_AUTH.md).

## Sécurité (repo public)

- **Ne jamais committer** le fichier `.env` (il contient les clés réelles). Voir [SECURITY.md](SECURITY.md).
- Les clés Google OAuth (Client ID / Secret) : en local dans `.env` (ignoré par git) ; en production dans le **Dashboard Supabase** uniquement. Le front n’y a pas accès.
- La CI vérifie qu’aucun `.env` n’est suivi par git.

## Couleurs Tailwind (PRD)

- `terracota` - #C67B5C
- `sage` - #9CAF88
- `cream` - #F5F0E8
- `deepblue` - #2C3E50
