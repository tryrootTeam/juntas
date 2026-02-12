# PRD Dashboard – Phase 2

**Page :** Dashboard (après onboarding)  
**Route :** `/dashboard`  
**Version :** 1.0

---

## Objectif

Page d’accueil une fois le profil complété : résumé du statut, accès aux matches, aux conversations et à la gestion du profil.

---

## Contenu proposé pour la page Dashboard

### 1. En-tête / résumé utilisateur
- **Message de bienvenue** avec le prénom (depuis `profiles.name`).
- **Statut de vérification** : badge ou texte selon `identity_status` :
  - `under_review` → « En vérification » (documents en cours de révision).
  - `verified` → « Profil vérifié ».
  - `rejected` → « Vérification refusée » + lien pour re-soumettre si prévu.

### 2. Bloc « Mon profil »
- Lien ou bouton **« Ver / editar mi perfil »** vers une page ou un tiroir d’édition (données onboarding + photo).
- Aperçu minimal : photo, ville, budget, zones (ex. « Valencia · Ruzafa, Benimaclet · 500 €/mes »).

### 3. Bloc « Matches » (compagnons de piso)
- **Liste ou cartes** des profils correspondants (table `matches` + infos `profiles`).
- Affichage du **score de compatibilité** si disponible (`compatibility_score`).
- Action : **« Ver perfil »** / **« Enviar mensaje »** pour ouvrir la conversation.
- Si aucun match : message du type « Completa tu perfil para ver tus primeros matches » ou « No hay matches aún ».

### 4. Bloc « Conversaciones »
- **Liste des conversations** (table `conversations` + dernier message ou date).
- Clic → route vers une vue **Chat / Conversation** (messages).
- Indicateur de messages non lus si prévu (`messages.read_at`).

### 5. Actions globales
- **Cerrar sesión** (déconnexion), déjà présente.
- Optionnel : lien vers **ayuda**, **configuración** ou **notificaciones**.

---

## Données à utiliser

| Source | Usage |
|--------|--------|
| `profiles` (user store) | Nom, photo, ville, statut vérification, zones, budget |
| `matches` (store matches) | Liste des matches avec `user_a` / `user_b`, `compatibility_score` |
| `conversations` + `messages` | Liste des conversations et dernier message |
| `identity_status` (profiles) | Badge vérification |

---

## Maquette simplifiée (ordre des blocs)

```
[ Bienvenue, María ]

[ Badge: En vérification ]

[ Mon profil ]
  Valencia · Ruzafa · 500 €/mes    [ Ver / editar perfil ]

[ Tus matches ]
  [ Carte match 1 ]  [ Carte match 2 ]   ou  "Aún no hay matches"
  [ Ver todos ]

[ Conversaciones ]
  [ Conv. 1 – último mensaje ]  [ Conv. 2 ]   ou  "Ninguna conversación"
  [ Ver todas ]

[ Cerrar sesión ]
```

---

## Routes à prévoir (Phase 2)

- `/dashboard` – cette page.
- `/profile` ou `/profile/edit` – édition du profil.
- `/matches` – liste complète des matches (optionnel si tout est sur le dashboard).
- `/chat/:conversationId` ou `/conversations/:id` – vue conversation / messages.

---

## Priorités suggérées

1. **MVP dashboard** : bienvenue + statut vérification + lien « Ver perfil » + déconnexion.
2. **Matches** : afficher les matches (avec un algorithme simple ou manuel au début).
3. **Conversaciones** : liste + page de détail (chat).
4. **Édition profil** : page ou modal pour modifier les champs onboarding.

Ce document peut servir de base pour un ticket Trello « Dashboard Phase 2 » ou une user story.
