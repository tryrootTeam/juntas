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

3. **Base de données Supabase**
   - Créer un projet Supabase
   - Exécuter le script `supabase/migrations/001_initial_schema.sql` dans l'éditeur SQL Supabase
   - Créer les buckets Storage : `verification-documents` (private), `profile-photos` (public)

4. **Lancer le dev**
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

## Couleurs Tailwind (PRD)

- `terracota` - #C67B5C
- `sage` - #9CAF88
- `cream` - #F5F0E8
- `deepblue` - #2C3E50
