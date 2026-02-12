# Configuration Supabase pour l’auth (login, registro, mot de passe oublié)

Pour que **login**, **registro**, **Google OAuth** et **mot de passe oublié** fonctionnent, il faut configurer Supabase côté Dashboard.

---

## 1. URLs de redirection (obligatoire)

Sans ça, le lien dans l’email « Réinitialiser le mot de passe » et le retour Google OAuth ne redirigeront pas vers ton app.

1. Ouvre le **Dashboard Supabase** → ton projet.
2. Va dans **Authentication** → **URL Configuration**.
3. **Site URL** : mets l’URL de ton site (ex. en prod `https://juntasbyroot.netlify.app`). Ne pas mettre d’URL relative.
4. Dans **Redirect URLs**, ajoute les URLs autorisées, une par ligne, par exemple :
   - En local : `http://localhost:5173/reset-password` et `http://localhost:5173/auth/callback`
   - En prod : `https://juntasbyroot.netlify.app/auth/callback` et `https://juntasbyroot.netlify.app/reset-password`

**Important :** Toujours inclure `https://` (ou `http://` en local). Si tu mets seulement le domaine sans protocole, Supabase peut rediriger vers son propre domaine avec ce texte en chemin → page blanche et erreur « requested path is invalid ».

Supabase n’acceptera que les redirections vers ces URLs. Si tu oublies `https://juntasbyroot.netlify.app/reset-password`, le lien « Réinitialiser le mot de passe » ne fonctionnera pas après clic.

---

## 2. Envoi des emails (mot de passe oublié, confirmation d’email)

Par défaut, Supabase envoie les emails d’auth (reset password, confirmation d’inscription) avec son propre service. **Aucune action n’est obligatoire** pour « récupérer » l’email : il part tout seul quand l’utilisateur demande un reset.

Tu peux quand même :

- **Vérifier le template** : **Authentication** → **Email Templates** → **Reset Password** (texte et lien).
- **Limiter le spam** : les mails Supabase partent parfois en spam ; en prod, configurer un **SMTP personnalisé** (SendGrid, Mailgun, etc.) dans **Project Settings** → **Auth** → **SMTP** améliore la délivrabilité.

En résumé : **pas d’action obligatoire sur Supabase pour « récupérer » l’email** ; la seule chose indispensable est d’ajouter les **Redirect URLs** ci‑dessus.
