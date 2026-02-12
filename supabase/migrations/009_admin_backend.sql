-- Juntas - Backend Admin Dashboard (PRD)
-- Rôle admin dans profiles, extension reports (contexte chat/perfil), RLS admin pour vérification et reportes

-- ========== PROFILES - Rôle utilisateur / admin ==========
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin'));

COMMENT ON COLUMN profiles.role IS 'user | admin. Seuls les admin accèdent au dashboard admin.';

-- ========== REPORTS - Contexte (chat / perfil), commentaire, message ==========
ALTER TABLE reports
  ADD COLUMN IF NOT EXISTS context_type TEXT CHECK (context_type IN ('chat', 'profile')),
  ADD COLUMN IF NOT EXISTS comment TEXT,
  ADD COLUMN IF NOT EXISTS message_id UUID REFERENCES messages(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS reviewed_by UUID REFERENCES auth.users(id);

-- Statuts : pendiente, en revisión, cerrado (reviewed conservé pour données existantes)
ALTER TABLE reports DROP CONSTRAINT IF EXISTS reports_status_check;
ALTER TABLE reports
  ADD CONSTRAINT reports_status_check
  CHECK (status IN ('pending', 'in_review', 'reviewed', 'resolved'));

COMMENT ON COLUMN reports.context_type IS 'chat | profile';
COMMENT ON COLUMN reports.comment IS 'Comentario del reporter';
COMMENT ON COLUMN reports.message_id IS 'Mensaje reportado (si context_type = chat)';

-- ========== Fonction helper : l'utilisateur connecté est-il admin ? ==========
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    (SELECT role FROM profiles WHERE id = auth.uid()),
    'user'
  ) = 'admin';
$$;

COMMENT ON FUNCTION public.is_admin() IS 'Devuelve true si el usuario conectado tiene role = admin.';

-- ========== RLS PROFILES - Admin puede actualizar (verification_status, identity_status) ==========
CREATE POLICY "Profiles admin update"
  ON profiles FOR UPDATE
  USING (public.is_admin());

-- ========== RLS VERIFICATION_DOCUMENTS - Admin puede leer y actualizar ==========
-- Los usuarios solo ven los suyos (política existente "Verification docs own").
-- Añadimos: admin puede SELECT y UPDATE en todas las filas.

CREATE POLICY "Verification docs admin read"
  ON verification_documents FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Verification docs admin update"
  ON verification_documents FOR UPDATE
  USING (public.is_admin());

-- ========== RLS REPORTS - Admin puede leer y actualizar ==========
-- Reporter puede crear (política existente "Reports own create").
-- Añadimos: admin puede SELECT y UPDATE en todas las filas.

CREATE POLICY "Reports admin read"
  ON reports FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Reports admin update"
  ON reports FOR UPDATE
  USING (public.is_admin());

-- ========== STORAGE - Admin puede leer verification-documents (cualquier carpeta) ==========
CREATE POLICY "verification-documents admin read"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'verification-documents'
    AND public.is_admin()
  );
