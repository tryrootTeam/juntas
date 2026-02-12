-- Juntas - Login/Registro (PRD): colonnes profiles + trigger
-- Ajoute les champs requis pour auth (name, email, phone, onboarding, etc.)

-- Colonnes PRD pour profiles (auth / onboarding)
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS name VARCHAR(100),
  ADD COLUMN IF NOT EXISTS email VARCHAR(255),
  ADD COLUMN IF NOT EXISTS phone VARCHAR(20),
  ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS phone_verified BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS identity_status VARCHAR(50) DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS profile_completed BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS onboarding_step INTEGER DEFAULT 0;

-- Contrainte unique sur email si présent (éviter doublons)
CREATE UNIQUE INDEX IF NOT EXISTS profiles_email_key ON profiles (email) WHERE email IS NOT NULL;

-- Trigger: créer/mettre à jour le profil au signup avec user_metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    display_name,
    name,
    email,
    phone,
    email_verified,
    updated_at
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    COALESCE((NEW.raw_user_meta_data->>'email_verified')::boolean, FALSE),
    now()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger déjà créé en 001, on ne le recrée pas
-- CREATE TRIGGER on_auth_user_created ...
