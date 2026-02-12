# Monitoring Auth (PRD)

Les événements auth sont enregistrés dans la table `auth_events` (migration `003_auth_events_monitoring.sql`).

**Appliquer la migration 003** : voir [APPLIQUER_MIGRATION_003.md](APPLIQUER_MIGRATION_003.md) (Dashboard Supabase → SQL Editor).

## Événements loggés

| event_type     | Quand |
|----------------|--------|
| `signup`       | Inscription réussie |
| `login`        | Connexion email/mot de passe réussie |
| `logout`       | Déconnexion |
| `failed_login` | Échec de connexion (mauvais identifiants, etc.) |
| `oauth_error`  | Erreur lors du flux Google OAuth |

Champs : `event_type`, `user_id` (nullable), `email` (nullable), `metadata` (JSONB), `created_at`.

La lecture de `auth_events` est réservée au **service role** (Dashboard Supabase, Edge Functions, scripts avec la clé service_role). Le client ne peut que faire des INSERT.

---

## Alertes (PRD)

À exécuter périodiquement (cron, Supabase Edge Function planifiée, ou outil externe) avec une clé **service_role**.

### Failed logins > 10 / heure

```sql
SELECT count(*) AS failed_last_hour
FROM auth_events
WHERE event_type = 'failed_login'
  AND created_at > now() - interval '1 hour';
```

Si `failed_last_hour > 10` → alerter (email, Slack, etc.).

### Signup spike

Comparer le volume d’inscriptions sur la dernière heure à une moyenne (ex. même fenêtre les jours précédents) :

```sql
SELECT count(*) AS signups_last_hour
FROM auth_events
WHERE event_type = 'signup'
  AND created_at > now() - interval '1 hour';
```

Si ce nombre est anormalement élevé par rapport à votre baseline → alerter.

### OAuth errors > 5 %

Sur une fenêtre glissante (ex. dernière heure) :

```sql
SELECT
  count(*) FILTER (WHERE event_type = 'oauth_error') AS oauth_errors,
  count(*) FILTER (WHERE event_type IN ('login', 'signup')) AS auth_successes
FROM auth_events
WHERE created_at > now() - interval '1 hour';
```

Calculer `oauth_errors / (oauth_errors + auth_successes)`. Si > 0,05 → alerter.

---

## Mise en place des alertes

1. **Option simple** : requêtes SQL ci‑dessus dans le **SQL Editor** Supabase (manuel ou planifié via un cron externe qui appelle l’API avec service_role).
2. **Option intégrée** : **Supabase Edge Function** + **pg_cron** (ou appel HTTP planifié) qui exécute ces requêtes et envoie un email / webhook en cas de dépassement.
3. **Option SaaS** : exporter les logs vers un outil (ex. Datadog, Logtail) et définir les alertes côté outil.

Pour l’instant, les événements sont bien enregistrés ; il reste à brancher le canal d’alerte (email/Slack/webhook) selon votre infra.
