-- Juntas - Backend Dashboard (PRD)
-- RPC get_user_matches, get_user_stats, matches (status passed, updated_at, índices)

-- ========== MATCHES - status 'passed' + updated_at ==========
ALTER TABLE matches
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

ALTER TABLE matches DROP CONSTRAINT IF EXISTS matches_status_check;
ALTER TABLE matches ADD CONSTRAINT matches_status_check
  CHECK (status IN ('active', 'archived', 'pending', 'viewed', 'passed', 'conversation_started'));

COMMENT ON COLUMN matches.updated_at IS 'Dernière mise à jour du match (statut, etc.).';

-- Trigger updated_at sur matches
CREATE OR REPLACE FUNCTION set_matches_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS matches_updated_at ON matches;
CREATE TRIGGER matches_updated_at
  BEFORE UPDATE ON matches
  FOR EACH ROW EXECUTE FUNCTION set_matches_updated_at();

-- ========== ÍNDICES matches (rendimiento) ==========
CREATE INDEX IF NOT EXISTS idx_matches_user_a_status ON matches (user_a, status);
CREATE INDEX IF NOT EXISTS idx_matches_user_b_status ON matches (user_b, status);
CREATE INDEX IF NOT EXISTS idx_matches_compatibility_score ON matches (compatibility_score);

-- ========== RPC get_user_matches ==========
-- Retourne les profils compatibles (vérifiés, profil complété) pour affichage dashboard.
CREATE OR REPLACE FUNCTION get_user_matches(user_id_param UUID)
RETURNS TABLE (
  id UUID,
  name VARCHAR,
  age INTEGER,
  occupation VARCHAR,
  preferred_zones TEXT[],
  has_children BOOLEAN,
  children_ages INTEGER[],
  work_schedule VARCHAR,
  works_from_home VARCHAR,
  cleanliness_level VARCHAR,
  noise_level VARCHAR,
  is_smoker VARCHAR,
  monthly_budget INTEGER,
  profile_completed BOOLEAN
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.id,
    p.name,
    p.age,
    p.occupation,
    p.preferred_zones,
    p.has_children,
    p.children_ages,
    p.work_schedule,
    p.works_from_home,
    p.cleanliness_level,
    p.noise_level,
    p.is_smoker,
    p.monthly_budget,
    p.profile_completed
  FROM profiles p
  WHERE p.id != user_id_param
    AND p.identity_status = 'verified'
    AND p.profile_completed = TRUE;
END;
$$;

COMMENT ON FUNCTION get_user_matches(UUID) IS 'Liste des profils éligibles au matching (vérifiés, profil complété) pour le dashboard.';

-- ========== RPC get_user_stats ==========
-- Statistiques du user : total matches (hors passed), conversations actives, compatibilité moyenne.
CREATE OR REPLACE FUNCTION get_user_stats(user_id_param UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  total_matches INTEGER;
  active_convs INTEGER;
  avg_compat NUMERIC;
BEGIN
  SELECT COUNT(*)::INTEGER INTO total_matches
  FROM matches m
  WHERE (m.user_a = user_id_param OR m.user_b = user_id_param)
    AND m.status != 'passed';

  SELECT COUNT(*)::INTEGER INTO active_convs
  FROM matches m
  WHERE (m.user_a = user_id_param OR m.user_b = user_id_param)
    AND m.status = 'conversation_started';

  SELECT AVG(m.compatibility_score)::NUMERIC(10,2) INTO avg_compat
  FROM matches m
  WHERE (m.user_a = user_id_param OR m.user_b = user_id_param)
    AND m.status != 'passed';

  RETURN json_build_object(
    'total_matches', total_matches,
    'active_conversations', active_convs,
    'avg_compatibility', COALESCE(avg_compat, 0)
  );
END;
$$;

COMMENT ON FUNCTION get_user_stats(UUID) IS 'Stats dashboard : total_matches, active_conversations, avg_compatibility.';
