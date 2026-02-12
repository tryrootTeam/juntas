# Backend Match Profile (profil détaillé match)

Route frontend : `/match/:id`. Données fournies par la migration `005_match_profile_backend.sql`.

## 1. Récupérer le profil match + compatibilité

**RPC Supabase :** `get_match_profile`

```js
const { data, error } = await supabase.rpc('get_match_profile', {
  user_id_param: currentUserId,  // auth.uid()
  match_id_param: matchId       // id du profil à afficher
})
// data = { profile: {...} | null, compatibility: {...} | null }
```

- `profile` : uniquement si le match a `identity_status = 'verified'` et `profile_completed = true`.
- `compatibility` : ligne `matches` (user_a, user_b, compatibility_score, compatibility_breakdown, status, created_at) si un match existe entre les deux utilisatrices.

## 2. Marquer le match comme « vu » (view profile)

Quand l’utilisatrice consulte le profil détaillé, mettre à jour le statut du match.

**Table :** `matches`  
**Contrainte :** `user_a < user_b`, donc l’id du match à mettre à jour est celui où (user_a, user_b) correspond au couple (currentUser, matchId) dans n’importe quel ordre.

```js
// Récupérer l’id du match (ex. depuis la liste des matches ou depuis compatibility.id)
await supabase
  .from('matches')
  .update({ status: 'viewed' })
  .or(`and(user_a.eq.${currentUserId},user_b.eq.${matchId}),and(user_a.eq.${matchId},user_b.eq.${currentUserId})`)
  .select()
```

RLS existante « Matches participant » autorise l’UPDATE si l’utilisatrice est l’une des deux.

## 3. Démarrer une conversation

- Vérifier côté app que l’utilisatrice peut envoyer des messages : `profiles.can_send_messages === true` (et éventuellement `identity_status === 'verified'`).
- Normaliser le couple : en base, `user_a < user_b` (ordre UUID).

```js
const [userA, userB] = [currentUserId, matchId].sort()
const { data: existing } = await supabase
  .from('conversations')
  .select('id')
  .eq('user_a', userA)
  .eq('user_b', userB)
  .maybeSingle()

if (existing) return existing

const { data: conv, error } = await supabase
  .from('conversations')
  .insert({ user_a: userA, user_b: userB })
  .select()
  .single()
```

- RLS : l’INSERT n’est autorisé que si `profiles.can_send_messages` est true pour `auth.uid()`.
- Le trigger `on_conversation_created_update_match` met à jour le match en `status = 'conversation_started'` automatiquement.

## 4. Validation côté app (optionnel)

- **Accès profil :** si `get_match_profile` renvoie `profile: null`, afficher un message du type « Profil non disponible » (non vérifié ou non complété).
- **Création conversation :** si l’insert échoue (RLS), vérifier `can_send_messages` et proposer de compléter la vérification d’identité.

## 5. Schéma aligné PRD

- **matches** : `compatibility_breakdown` (JSONB), `status` ∈ `pending | conversation_started | viewed | active | archived`.
- **profiles** : `can_send_messages` (boolean).
- **conversations** : `updated_at` ; création protégée par RLS (`can_send_messages`).
