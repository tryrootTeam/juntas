# Appliquer la migration 003 (auth_events) dans Supabase

Si tu n’utilises pas la CLI Supabase (`supabase db push`), tu peux appliquer la migration à la main.

## Étapes

1. Ouvre **[Supabase Dashboard](https://supabase.com/dashboard)** et sélectionne ton projet Juntas.
2. Va dans **SQL Editor** (menu de gauche).
3. Clique sur **New query**.
4. Copie-colle **tout** le contenu du fichier `supabase/migrations/003_auth_events_monitoring.sql`.
5. Clique sur **Run** (ou Ctrl+Entrée).

Si tout est ok, tu verras « Success. No rows returned ». La table `auth_events` est créée avec ses index et sa RLS.

## Vérification

Dans **Table Editor**, tu dois voir la table **auth_events** avec les colonnes :  
`id`, `event_type`, `user_id`, `email`, `metadata`, `created_at`.

## En cas d’erreur

- **"relation auth_events already exists"** : la migration a déjà été appliquée, rien à refaire.
- **"permission denied"** : exécute la requête en tant qu’owner du projet (compte qui a créé le projet Supabase).
