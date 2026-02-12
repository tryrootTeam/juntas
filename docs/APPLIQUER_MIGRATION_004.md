# Appliquer la migration 004 (Backend Onboarding) dans Supabase

Cette migration étend les tables pour le flux d’onboarding en 6 étapes : colonnes profil, documents de vérification, bucket storage.

## Prérequis

- Migration 001 et 002 (et optionnellement 003) déjà appliquées.

## Étapes

1. Ouvre **[Supabase Dashboard](https://supabase.com/dashboard)** et sélectionne ton projet Juntas.
2. Va dans **SQL Editor** (menu de gauche).
3. Clique sur **New query**.
4. Copie-colle **tout** le contenu du fichier `supabase/migrations/004_onboarding_backend.sql`.
5. Clique sur **Run** (ou Ctrl+Entrée).

Si tout est ok, tu verras « Success » (éventuellement avec des lignes retournées). Les colonnes `profiles` et `verification_documents` sont étendues, le bucket `verification-documents` est créé ou mis à jour avec ses politiques RLS.

## Vérification

- **Table Editor** → `profiles` : colonnes ajoutées (`age`, `occupation`, `preferred_zones`, `monthly_budget`, `has_children`, `children_ages`, `custody_type`, `has_pets`, `pet_type`, `work_schedule`, `works_from_home`, `time_at_home`, `cleanliness_level`, `noise_level`, `is_smoker`, `preferred_roommates_count`, `preferred_age`, `children_preference`).
- **Table Editor** → `verification_documents` : colonnes `document_url`, `selfie_url`, `rejection_reason`, `expires_at`, `uploaded_at`.
- **Storage** : bucket `verification-documents` présent, privé, limite 5 Mo, types JPG/PNG/PDF.

## En cas d’erreur

- **"relation storage.buckets does not exist"** ou **"permission denied"** sur `storage` : crée le bucket à la main dans **Storage** du Dashboard (nom : `verification-documents`, privé, 5 Mo, types `image/jpeg`, `image/png`, `application/pdf`). Ensuite ré-exécute uniquement la partie **ALTER TABLE** et **CREATE POLICY** de la migration (sans l’`INSERT INTO storage.buckets`).
- **"policy already exists"** : les politiques storage ont déjà été créées ; tu peux ignorer ou les supprimer avant de relancer.

## Après la migration

Le frontend peut utiliser le service `src/services/onboarding.js` : `saveOnboardingStep`, `uploadVerificationFile`, `createVerificationRecord`, `completeOnboarding`.
