# Scripts

## Test du système de design

Le script `test-design-system.js` permet de valider que les changements d'identité visuelle se propagent correctement à travers l'application.

### Fonctionnement

Le script :
1. Sauvegarde la configuration actuelle de Tailwind
2. Applique des couleurs de test très visibles (thème "Halloween")
3. Vous laisse vérifier l'application dans le navigateur
4. Restaure automatiquement la configuration originale

### Utilisation

```bash
npm run test-design-system
```

Ou directement :

```bash
node scripts/test-design-system.js
```

### Processus de test

1. **Lancez le script** : `npm run test-design-system`
2. **Vérifiez votre application** :
   - Les couleurs doivent être très différentes (orange, violet, rouge)
   - Vérifiez la landing page, le dashboard, les headers
   - Tous les boutons primaires, badges et éléments doivent avoir changé
3. **Confirmez** quand vous avez terminé
4. **Répondez** si le test était concluant

### Couleurs de test appliquées

- `deep-plum` → Orange vif (#FF6B00)
- `soft-terracota` → Violet (#9B59B6)
- `sage-green` → Rouge (#E74C3C)
- `warm-sand` → Orange doré (#F39C12)

### Sécurité

Le script restaure automatiquement la configuration en cas de :
- Interruption (Ctrl+C)
- Erreur
- Confirmation de fin de test

⚠️ **Important** : Ne commitez jamais les changements temporaires !

---

## Créer un utilisateur de test vérifié

Le script `create-verified-test-user.js` crée un utilisateur de test qui :

- a un compte **Auth** (email + mot de passe) ;
- a un **profil vérifié** (`identity_status = verified`, `verification_status = verified`) ;
- a le **droit d’envoyer des messages** (`can_send_messages = true`) ;
- a l’onboarding considéré comme terminé (`profile_completed = true`, `onboarding_step = 6`).

### Prérequis

- **SUPABASE_SERVICE_ROLE_KEY** : clé « service_role » (Dashboard Supabase → Settings → API).  
  Ne jamais l’exposer côté front (uniquement pour scripts / backend).
- **VITE_SUPABASE_URL** : peut être déjà dans ton `.env` à la racine (le script le charge).

### Utilisation

```bash
# Avec les valeurs par défaut (email: test-verified@juntas.local, mot de passe: TestPassword123!)
SUPABASE_SERVICE_ROLE_KEY=ta_cle_service_role npm run create-test-user
```

Ou en appelant le script directement avec des variables optionnelles :

```bash
TEST_USER_EMAIL=maria@example.com \
TEST_USER_PASSWORD=MonMotDePasse123! \
TEST_USER_NAME="María Test" \
SUPABASE_SERVICE_ROLE_KEY=ta_cle \
node scripts/create-verified-test-user.js
```

Si l’email existe déjà, le script ne recrée pas l’utilisateur Auth mais met à jour le profil (vérifié + `can_send_messages`).
