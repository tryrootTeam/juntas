# Configuration Supabase pour l’auth (login, registro, mot de passe oublié)

Pour que **login**, **registro**, **Google OAuth** et **mot de passe oublié** fonctionnent, il faut configurer les URLs de redirection.

---

## 1. URLs de redirection (obligatoire)

Sans ça, le retour Google OAuth affiche **« requested path is invalid »** et le lien « Réinitialiser le mot de passe » ne redirige pas vers ton app.

### A. Supabase en local (`supabase start`)

Dans **`supabase/config.toml`** la section `[auth]` doit contenir :

- **`site_url`** : l’URL de ton front (ex. `http://localhost:5173`)
- **`additional_redirect_urls`** : les URLs de callback exactes, par ex. :
  - `http://localhost:5173/auth/callback`
  - `http://localhost:5173/reset-password`

Si tu utilises un autre port (ex. 3000), adapte les URLs. Après modification, redémarre : `supabase stop` puis `supabase start`.

### B. Supabase hébergé (Dashboard supabase.com)

1. Ouvre le **Dashboard Supabase** → ton projet.
2. Va dans **Authentication** → **URL Configuration**.
3. **Site URL** : mets l’URL de ton site (ex. en prod `https://juntasbyroot.netlify.app`). Pour tester en local avec le projet hébergé, tu peux mettre `http://localhost:5173`.
4. Dans **Redirect URLs**, ajoute les URLs autorisées, une par ligne, par exemple :
   - En local : `http://localhost:5173/auth/callback` et `http://localhost:5173/reset-password`
   - En prod : `https://juntasbyroot.netlify.app/auth/callback` et `https://juntasbyroot.netlify.app/reset-password`

**Important :** Toujours inclure `https://` (ou `http://` en local). Si une URL de callback manque, Supabase renvoie « requested path is invalid » après le login Google.

---

## 2. Envoi des emails (mot de passe oublié, confirmation d’email)

Par défaut, Supabase envoie les emails d’auth (reset password, confirmation d’inscription) avec son propre service. **Aucune action n’est obligatoire** pour « récupérer » l’email : il part tout seul quand l’utilisateur demande un reset.

Tu peux quand même :

- **Vérifier le template** : **Authentication** → **Email Templates** → **Reset Password** (texte et lien).
- **Limiter le spam** : les mails Supabase partent parfois en spam ; en prod, configurer un **SMTP personnalisé** (SendGrid, Mailgun, etc.) dans **Project Settings** → **Auth** → **SMTP** améliore la délivrabilité.

En résumé : **pas d’action obligatoire sur Supabase pour « récupérer » l’email** ; la seule chose indispensable est d’ajouter les **Redirect URLs** ci‑dessus.
