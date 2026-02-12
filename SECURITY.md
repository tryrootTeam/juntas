# Sécurité – Juntas (repo public)

Ce dépôt est **public**. Les règles ci‑dessous évitent d’exposer des secrets.

## Ce qui ne doit jamais être commité

- **`.env`** – Contient les vraies clés (Supabase, Google OAuth). Fichier listé dans `.gitignore`.
- **`.env.local`**, **`.env.*.local`** – Idem, ignorés par git.
- Aucun **Client Secret** (Google, etc.) ou **mot de passe** dans le code ou la config versionnée.

## Ce qui est safe dans le repo

| Fichier / variable | Contenu | Pourquoi c’est ok |
|--------------------|--------|-------------------|
| `env.example` | Variables **sans valeur** (placeholders) | Pas de secret, sert de modèle. |
| `supabase/config.toml` | `client_id = "env(GOOGLE_CLIENT_ID)"` | Référence à une **variable d’env**, pas la clé en dur. |
| Code frontend | `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` | L’anon key est conçue pour être publique ; la sécurité repose sur les **RLS** et les règles Supabase. |

## Où mettre les vraies clés

1. **En local**  
   Copier `env.example` vers **`.env`** et remplir les valeurs. Ne jamais committer `.env`.

2. **Projet hébergé Supabase**  
   Google OAuth : **Dashboard Supabase** → Authentication → Providers → Google. Les clés restent côté Supabase, jamais dans le repo ni dans le front.

3. **CI / déploiement**  
   Utiliser les **secrets** de la plateforme (ex. GitHub Actions “Secrets”, variables d’environnement Vercel) pour toute clé sensible.

## Flux Google OAuth (pourquoi le Secret est protégé)

- Le **Client Secret** n’est utilisé que par le **serveur Supabase** (Auth), jamais par le navigateur.
- Le front appelle uniquement `signInWithOAuth({ provider: 'google' })` ; il ne voit ni le Client ID ni le Secret.
- En local, `GOOGLE_CLIENT_ID` et `GOOGLE_CLIENT_SECRET` sont lus depuis `.env` par la CLI Supabase ; Vite n’expose que les variables **`VITE_*`**, donc ces clés ne sont pas incluses dans le bundle.

## En cas de fuite

Si un fichier contenant des secrets a été commité :

1. Révoquer / régénérer immédiatement les clés concernées (Google Cloud Console, Supabase Dashboard).
2. Ne pas se contenter de supprimer le commit (l’historique reste clonable) ; révoquer les clés en priorité.
