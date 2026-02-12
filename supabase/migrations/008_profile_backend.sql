-- Juntas - Backend Mi Perfil (PRD)
-- RPC get_my_profile, update_my_profile (validations age 18-99, monthly_budget >= 0), RLS, doc suppression compte

-- ========== RPC get_my_profile ==========
-- GET /profiles/:userId (profil propre) : retourne le profil de l'utilisateur connecté.
CREATE OR REPLACE FUNCTION get_my_profile()
RETURNS SETOF profiles
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT * FROM profiles WHERE id = auth.uid();
$$;

COMMENT ON FUNCTION get_my_profile() IS 'Retourne le profil de l''utilisateur connecté (Mi Perfil).';

-- ========== RPC update_my_profile ==========
-- PATCH /profiles/:userId : met à jour le profil avec validation (age 18-99, monthly_budget >= 0).
-- Champs autorisés : display_name, bio, birthdate, city, photo_url, name, phone, age, occupation,
-- preferred_zones, monthly_budget, has_children, children_ages, custody_type, has_pets, pet_type,
-- work_schedule, works_from_home, time_at_home, cleanliness_level, noise_level, is_smoker,
-- preferred_roommates_count, preferred_age, children_preference, lifestyle_preferences.
CREATE OR REPLACE FUNCTION update_my_profile(data JSONB)
RETURNS profiles
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  age_val INTEGER;
  budget_val INTEGER;
  rec profiles%ROWTYPE;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Non autorisé';
  END IF;

  -- Validations PRD (age 18-99, monthly_budget >= 0)
  IF data ? 'age' THEN
    age_val := (data->>'age')::INTEGER;
    IF age_val IS NOT NULL AND (age_val < 18 OR age_val > 99) THEN
      RAISE EXCEPTION 'Edad inválida' USING ERRCODE = 'check_violation';
    END IF;
  END IF;

  IF data ? 'monthly_budget' THEN
    budget_val := (data->>'monthly_budget')::INTEGER;
    IF budget_val IS NOT NULL AND budget_val < 0 THEN
      RAISE EXCEPTION 'Presupuesto inválido' USING ERRCODE = 'check_violation';
    END IF;
  END IF;

  -- Mise à jour des champs autorisés (seuls les clés présentes dans data sont modifiées)
  UPDATE profiles
  SET
    display_name    = CASE WHEN data ? 'display_name' THEN (data->>'display_name')::TEXT ELSE display_name END,
    bio             = CASE WHEN data ? 'bio' THEN (data->>'bio')::TEXT ELSE bio END,
    birthdate       = CASE WHEN data ? 'birthdate' THEN (data->>'birthdate')::DATE ELSE birthdate END,
    city            = CASE WHEN data ? 'city' THEN (data->>'city')::TEXT ELSE city END,
    photo_url       = CASE WHEN data ? 'photo_url' THEN (data->>'photo_url')::TEXT ELSE photo_url END,
    name            = CASE WHEN data ? 'name' THEN (data->>'name')::VARCHAR(100) ELSE name END,
    phone           = CASE WHEN data ? 'phone' THEN (data->>'phone')::VARCHAR(20) ELSE phone END,
    age             = CASE WHEN data ? 'age' THEN (data->>'age')::INTEGER ELSE age END,
    occupation      = CASE WHEN data ? 'occupation' THEN (data->>'occupation')::VARCHAR(200) ELSE occupation END,
    preferred_zones = CASE WHEN data ? 'preferred_zones' THEN (ARRAY(SELECT jsonb_array_elements_text(data->'preferred_zones')))::TEXT[] ELSE preferred_zones END,
    monthly_budget  = CASE WHEN data ? 'monthly_budget' THEN (data->>'monthly_budget')::INTEGER ELSE monthly_budget END,
    has_children    = CASE WHEN data ? 'has_children' THEN (data->>'has_children')::BOOLEAN ELSE has_children END,
    children_ages   = CASE WHEN data ? 'children_ages' THEN (ARRAY(SELECT (jsonb_array_elements_text(data->'children_ages'))::INTEGER))::INTEGER[] ELSE children_ages END,
    custody_type    = CASE WHEN data ? 'custody_type' THEN (data->>'custody_type')::VARCHAR(50) ELSE custody_type END,
    has_pets        = CASE WHEN data ? 'has_pets' THEN (data->>'has_pets')::BOOLEAN ELSE has_pets END,
    pet_type        = CASE WHEN data ? 'pet_type' THEN (data->>'pet_type')::VARCHAR(50) ELSE pet_type END,
    work_schedule   = CASE WHEN data ? 'work_schedule' THEN (data->>'work_schedule')::VARCHAR(50) ELSE work_schedule END,
    works_from_home = CASE WHEN data ? 'works_from_home' THEN (data->>'works_from_home')::VARCHAR(50) ELSE works_from_home END,
    time_at_home    = CASE WHEN data ? 'time_at_home' THEN (data->>'time_at_home')::VARCHAR(50) ELSE time_at_home END,
    cleanliness_level = CASE WHEN data ? 'cleanliness_level' THEN (data->>'cleanliness_level')::VARCHAR(50) ELSE cleanliness_level END,
    noise_level     = CASE WHEN data ? 'noise_level' THEN (data->>'noise_level')::VARCHAR(50) ELSE noise_level END,
    is_smoker       = CASE WHEN data ? 'is_smoker' THEN (data->>'is_smoker')::VARCHAR(20) ELSE is_smoker END,
    preferred_roommates_count = CASE WHEN data ? 'preferred_roommates_count' THEN (data->>'preferred_roommates_count')::INTEGER ELSE preferred_roommates_count END,
    preferred_age   = CASE WHEN data ? 'preferred_age' THEN (data->>'preferred_age')::VARCHAR(50) ELSE preferred_age END,
    children_preference = CASE WHEN data ? 'children_preference' THEN (data->>'children_preference')::VARCHAR(50) ELSE children_preference END,
    lifestyle_preferences = CASE WHEN data ? 'lifestyle_preferences' THEN (data->'lifestyle_preferences')::JSONB ELSE lifestyle_preferences END,
    updated_at      = now()
  WHERE id = auth.uid()
  RETURNING * INTO rec;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Profil non trouvé' USING ERRCODE = 'P0002';
  END IF;

  RETURN rec;
END;
$$;

COMMENT ON FUNCTION update_my_profile(JSONB) IS 'Met à jour le profil de l''utilisateur connecté avec validation (age 18-99, monthly_budget >= 0).';

-- ========== RLS - Rappel ==========
-- GET : déjà couvert par "Profiles public read" (SELECT). Pour « profil propre » utiliser get_my_profile().
-- PATCH : déjà couvert par "Profiles own update" (UPDATE USING auth.uid() = id). Pour validation côté serveur utiliser update_my_profile().
-- DELETE / Eliminar cuenta : suppression du compte = suppression de l'utilisateur Auth. Faire appel à l'API Admin Supabase
-- (auth.admin.deleteUser(uid)) depuis une Edge Function ou backend sécurisé. Le ON DELETE CASCADE sur profiles
-- (référence auth.users) nettoie alors le profil et les tables liées (matches, conversations, messages, etc.).
