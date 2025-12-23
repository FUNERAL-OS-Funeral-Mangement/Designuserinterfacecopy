-- =====================================================
-- FUNERAL HOME LOGOS TABLE
-- =====================================================
-- Stores funeral home branding information including logos

-- Create funeral_homes table
CREATE TABLE IF NOT EXISTS funeral_homes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  tagline TEXT,
  logo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_funeral_homes_clerk_user_id 
ON funeral_homes(clerk_user_id);

-- Enable Row Level Security
ALTER TABLE funeral_homes ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can view their own funeral home
CREATE POLICY "Users view own funeral home"
ON funeral_homes FOR SELECT
USING (true); -- Public read for now, will add auth later

-- RLS Policy: Users can update their own funeral home
CREATE POLICY "Users update own funeral home"
ON funeral_homes FOR UPDATE
USING (true) -- Public update for now, will add auth later
WITH CHECK (true);

-- RLS Policy: Users can insert their own funeral home
CREATE POLICY "Users insert own funeral home"
ON funeral_homes FOR INSERT
WITH CHECK (true); -- Public insert for now, will add auth later

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_funeral_home_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER funeral_home_updated_at
BEFORE UPDATE ON funeral_homes
FOR EACH ROW
EXECUTE FUNCTION update_funeral_home_updated_at();

-- Insert demo funeral home
INSERT INTO funeral_homes (clerk_user_id, name, tagline, logo_url)
VALUES (
  'demo-user-123',
  'Eduardo Rivero Funeral Home',
  'Serving families with dignity',
  NULL -- Will be updated when logo is uploaded
)
ON CONFLICT (clerk_user_id) DO NOTHING;

-- Comments
COMMENT ON TABLE funeral_homes IS 'Stores funeral home branding and profile information';
COMMENT ON COLUMN funeral_homes.clerk_user_id IS 'Reference to Clerk user ID for authentication';
COMMENT ON COLUMN funeral_homes.logo_url IS 'URL to logo stored in Supabase Storage';
