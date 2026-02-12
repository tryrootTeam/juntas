-- Juntas - Backend Match Profile (PRD)
-- RPC get_match_profile, étend matches (compatibility_breakdown, status), conversations RLS, profiles.can_send_messages

-- ========== PROFILES - can_send_messages ==========
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS can_send_messages BOOLEAN DEFAULT FALSE;

COMMENT ON COLUMN profiles.can_send_messages IS 'Autorise l''envoi de messages (après vérification identité).';

-- ========== MATCHES - compatibility_breakdown + statuts PRD ==========
ALTER TABLE matches
  ADD COLUMN IF NOT EXISTS compatibility_breakdown JSONB DEFAULT '{}';

-- Étendre les valeurs de status : active, archived, pending, conversation_started, viewed
ALTER TABLE matches DROP CONSTRAINT IF EXISTS matches_status_check;
ALTER TABLE matches ADD CONSTRAINT matches_status_check
  CHECK (status IN ('active', 'archived', 'pending', 'conversation_started', 'viewed'));

-- Valeur par défaut alignée PRD
ALTER TABLE matches ALTER COLUMN status SET DEFAULT 'pending';

COMMENT ON COLUMN matches.compatibility_breakdown IS 'Détail par catégorie: family, schedule, lifestyle, budget_location, preferences (scores 0-100).';

-- ========== CONVERSATIONS - updated_at ==========
ALTER TABLE conversations
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

-- ========== RPC get_match_profile ==========
-- Retourne le profil détaillé d'un match + données de compatibilité.
-- Schéma actuel : matches (user_a, user_b) avec user_a < user_b.
CREATE OR REPLACE FUNCTION get_match_profile(
  user_id_param UUID,
  match_id_param UUID
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  match_profile JSON;
  compatibility_data JSON;
  match_row RECORD;
BEGIN
  -- Profil du match : uniquement si vérifié et profil complété
  SELECT row_to_json(p.*) INTO match_profile
  FROM profiles p
  WHERE p.id = match_id_param
    AND p.identity_status = 'verified'
    AND p.profile_completed = TRUE;

  -- Ligne de match (user_a, user_b ordonnés) pour ce couple
  SELECT m.* INTO match_row
  FROM matches m
  WHERE (m.user_a = user_id_param AND m.user_b = match_id_param)
     OR (m.user_a = match_id_param AND m.user_b = user_id_param)
  LIMIT 1;

  IF FOUND THEN
    compatibility_data := row_to_json(match_row);
  ELSE
    compatibility_data := NULL;
  END IF;

  RETURN json_build_object(
    'profile', match_profile,
    'compatibility', compatibility_data
  );
END;
$$;

COMMENT ON FUNCTION get_match_profile(UUID, UUID) IS 'Profil détaillé d''un match + compatibilité (profil vérifié et complété uniquement).';

-- ========== RLS CONVERSATIONS - création réservée aux utilisatrices pouvant envoyer des messages ==========
DROP POLICY IF EXISTS "Conversations participant" ON conversations;

CREATE POLICY "Conversations participant read update delete"
  ON conversations FOR SELECT
  USING (auth.uid() = user_a OR auth.uid() = user_b);

CREATE POLICY "Conversations participant update"
  ON conversations FOR UPDATE
  USING (auth.uid() = user_a OR auth.uid() = user_b)
  WITH CHECK (auth.uid() = user_a OR auth.uid() = user_b);

CREATE POLICY "Conversations participant delete"
  ON conversations FOR DELETE
  USING (auth.uid() = user_a OR auth.uid() = user_b);

CREATE POLICY "Conversations create when can send messages"
  ON conversations FOR INSERT
  WITH CHECK (
    (auth.uid() = user_a OR auth.uid() = user_b)
    AND (SELECT COALESCE(p.can_send_messages, FALSE) FROM profiles p WHERE p.id = auth.uid())
  );

-- ========== Fonction utilitaire : mise à jour du statut match au démarrage d'une conversation ==========
-- À appeler côté app après création conversation, ou via trigger.
CREATE OR REPLACE FUNCTION update_match_status_on_conversation()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE matches
  SET status = 'conversation_started'
  WHERE (user_a = NEW.user_a AND user_b = NEW.user_b);
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_conversation_created_update_match ON conversations;
CREATE TRIGGER on_conversation_created_update_match
  AFTER INSERT ON conversations
  FOR EACH ROW
  EXECUTE FUNCTION update_match_status_on_conversation();

COMMENT ON FUNCTION update_match_status_on_conversation() IS 'Passe le match en conversation_started à la création d''une conversation.';
