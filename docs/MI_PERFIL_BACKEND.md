# Backend Mi Perfil

Route frontend : `/profile`. Données fournies par la migration `008_profile_backend.sql`.

## 1. Obtener perfil propio (GET)

**RPC Supabase :** `get_my_profile`

```js
const { data, error } = await supabase.rpc('get_my_profile').maybeSingle()
// data = profil de l'utilisateur connecté (auth.uid()) ou null
```

Ou via le service / store :

```js
import { getMyProfile } from '@/services/profile'
// ou
const userStore = useUserStore()
await userStore.fetchMyProfile()
```

## 2. Actualizar perfil (PATCH)

**RPC Supabase :** `update_my_profile(data JSONB)`

Validations côté serveur : âge 18–99, `monthly_budget` ≥ 0.

Champs autorisés : `display_name`, `bio`, `birthdate`, `city`, `photo_url`, `name`, `phone`, `age`, `occupation`, `preferred_zones`, `monthly_budget`, `has_children`, `children_ages`, `custody_type`, `has_pets`, `pet_type`, `work_schedule`, `works_from_home`, `time_at_home`, `cleanliness_level`, `noise_level`, `is_smoker`, `preferred_roommates_count`, `preferred_age`, `children_preference`, `lifestyle_preferences`.

```js
const { data, error } = await supabase.rpc('update_my_profile', {
  data: { display_name: 'Nuevo nombre', age: 28 }
})
// ou
await userStore.updateProfile({ display_name: 'Nuevo nombre', age: 28 })
```

## 3. Cambiar contraseña

Supabase Auth (pas de RPC) :

```js
const { error } = await supabase.auth.updateUser({ password: newPassword })
// ou
import { updatePassword } from '@/services/profile'
await updatePassword(newPassword)
```

## 4. Eliminar cuenta

La suppression du compte = suppression de l’utilisateur dans `auth.users`. Supabase déclenche ensuite le **ON DELETE CASCADE** sur `profiles`, ce qui supprime le profil et les données liées (matches, conversations, messages, etc.).

À faire depuis un backend sécurisé ou une **Edge Function** avec la clé **service_role** :

```js
// Côté backend / Edge Function uniquement
await supabase.auth.admin.deleteUser(userId)
```

Le client (anon key) ne peut pas supprimer un utilisateur ; il faut exposer un endpoint protégé qui appelle l’API Admin.

## 5. Políticas RLS

- **GET** : `Profiles public read` (SELECT). Pour « mi perfil » on utilise `get_my_profile()` (limité à `auth.uid()`).
- **PATCH** : `Profiles own update` (UPDATE où `auth.uid() = id`). Pour validation serveur : `update_my_profile()`.
- **DELETE** : pas de suppression directe sur `profiles` ; suppression via Auth Admin → cascade.
