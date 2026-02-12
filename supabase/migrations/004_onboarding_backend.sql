-- Juntas - Backend Onboarding (PRD)
-- Étend profiles (6 étapes), verification_documents (URLs + expiration), bucket storage + RLS

-- ========== PROFILES - Colonnes onboarding ==========
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS age INTEGER CHECK (age IS NULL OR (age >= 18 AND age <= 99)),
  ADD COLUMN IF NOT EXISTS occupation VARCHAR(200),
  ADD COLUMN IF NOT EXISTS preferred_zones TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS monthly_budget INTEGER CHECK (monthly_budget IS NULL OR (monthly_budget >= 100 AND monthly_budget <= 2000)),
  ADD COLUMN IF NOT EXISTS has_children BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS children_ages INTEGER[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS custody_type VARCHAR(50),
  ADD COLUMN IF NOT EXISTS has_pets BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS pet_type VARCHAR(50),
  ADD COLUMN IF NOT EXISTS work_schedule VARCHAR(50),
  ADD COLUMN IF NOT EXISTS works_from_home VARCHAR(50),
  ADD COLUMN IF NOT EXISTS time_at_home VARCHAR(50),
  ADD COLUMN IF NOT EXISTS cleanliness_level VARCHAR(50),
  ADD COLUMN IF NOT EXISTS noise_level VARCHAR(50),
  ADD COLUMN IF NOT EXISTS is_smoker VARCHAR(20),
  ADD COLUMN IF NOT EXISTS preferred_roommates_count INTEGER,
  ADD COLUMN IF NOT EXISTS preferred_age VARCHAR(50),
  ADD COLUMN IF NOT EXISTS children_preference VARCHAR(50);

COMMENT ON COLUMN profiles.onboarding_step IS 'Dernière étape onboarding complétée (1-6)';
COMMENT ON COLUMN profiles.identity_status IS 'pending | under_review | verified | rejected';

-- ========== VERIFICATION_DOCUMENTS - Colonnes PRD ==========
ALTER TABLE verification_documents
  ADD COLUMN IF NOT EXISTS document_url TEXT,
  ADD COLUMN IF NOT EXISTS selfie_url TEXT,
  ADD COLUMN IF NOT EXISTS rejection_reason TEXT,
  ADD COLUMN IF NOT EXISTS expires_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS uploaded_at TIMESTAMPTZ DEFAULT now();

-- Rétention 30 jours : on peut mettre à jour expires_at à la création (trigger ou app)
-- RLS existant "Verification docs own" conserve : accès uniquement pour user_id = auth.uid()

-- ========== STORAGE BUCKET verification-documents ==========
-- Bucket privé, 5MB, types image/jpeg, image/png, application/pdf
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'verification-documents',
  'verification-documents',
  false,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'application/pdf']
)
ON CONFLICT (id) DO UPDATE SET
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- RLS storage.objects : upload / lecture / suppression uniquement pour son dossier (userId)
CREATE POLICY "verification-documents own upload"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'verification-documents'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "verification-documents own read"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'verification-documents'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "verification-documents own update"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'verification-documents'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "verification-documents own delete"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'verification-documents'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

COMMENT ON TABLE verification_documents IS 'Documents de vérification identité (PRD onboarding step 6). Rétention 30j.';
