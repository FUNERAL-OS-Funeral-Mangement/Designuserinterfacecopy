-- =====================================================
-- MULTI-TENANT SCHEMA FOR RITEPATH
-- =====================================================
-- Organizations (Funeral Homes)
-- Organization Members (Staff with roles)
-- Staff Invitations (Invite system)
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- ORGANIZATIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  email TEXT NOT NULL,
  logo_url TEXT,
  owner_id TEXT NOT NULL,
  settings JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for owner lookups
CREATE INDEX IF NOT EXISTS idx_organizations_owner_id ON organizations(owner_id);

-- =====================================================
-- ORGANIZATION MEMBERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS organization_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'staff', 'vendor')),
  permissions JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(organization_id, user_id)
);

-- Create indexes for member lookups
CREATE INDEX IF NOT EXISTS idx_organization_members_org_id ON organization_members(organization_id);
CREATE INDEX IF NOT EXISTS idx_organization_members_user_id ON organization_members(user_id);

-- =====================================================
-- STAFF INVITATIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS staff_invitations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  role TEXT NOT NULL CHECK (role IN ('admin', 'staff', 'vendor')),
  token TEXT NOT NULL UNIQUE,
  invited_by TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'expired', 'revoked')),
  expires_at TIMESTAMPTZ NOT NULL,
  accepted_at TIMESTAMPTZ,
  accepted_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for invitation lookups
CREATE INDEX IF NOT EXISTS idx_staff_invitations_token ON staff_invitations(token);
CREATE INDEX IF NOT EXISTS idx_staff_invitations_org_id ON staff_invitations(organization_id);
CREATE INDEX IF NOT EXISTS idx_staff_invitations_email ON staff_invitations(email);

-- =====================================================
-- UPDATE EXISTING CASES TABLE
-- =====================================================
-- Add organization_id to cases table if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'cases' AND column_name = 'organization_id'
  ) THEN
    ALTER TABLE cases ADD COLUMN organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE;
    CREATE INDEX idx_cases_organization_id ON cases(organization_id);
  END IF;
END $$;

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_invitations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own organizations" ON organizations;
DROP POLICY IF EXISTS "Users can create organizations" ON organizations;
DROP POLICY IF EXISTS "Owners can update their organizations" ON organizations;
DROP POLICY IF EXISTS "Members can view their organization members" ON organization_members;
DROP POLICY IF EXISTS "Admins can invite staff" ON staff_invitations;
DROP POLICY IF EXISTS "Users can view their own invitations" ON staff_invitations;

-- Organizations Policies
CREATE POLICY "Users can view their own organizations"
  ON organizations FOR SELECT
  USING (
    owner_id = current_setting('request.jwt.claims', true)::json->>'sub' OR
    id IN (
      SELECT organization_id FROM organization_members
      WHERE user_id = current_setting('request.jwt.claims', true)::json->>'sub'
    )
  );

CREATE POLICY "Users can create organizations"
  ON organizations FOR INSERT
  WITH CHECK (owner_id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Owners can update their organizations"
  ON organizations FOR UPDATE
  USING (
    owner_id = current_setting('request.jwt.claims', true)::json->>'sub' OR
    id IN (
      SELECT organization_id FROM organization_members
      WHERE user_id = current_setting('request.jwt.claims', true)::json->>'sub'
      AND role IN ('owner', 'admin')
    )
  );

-- Organization Members Policies
CREATE POLICY "Members can view their organization members"
  ON organization_members FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id FROM organization_members
      WHERE user_id = current_setting('request.jwt.claims', true)::json->>'sub'
    )
  );

-- Staff Invitations Policies
CREATE POLICY "Admins can invite staff"
  ON staff_invitations FOR ALL
  USING (
    organization_id IN (
      SELECT organization_id FROM organization_members
      WHERE user_id = current_setting('request.jwt.claims', true)::json->>'sub'
      AND role IN ('owner', 'admin')
    )
  );

CREATE POLICY "Users can view their own invitations"
  ON staff_invitations FOR SELECT
  USING (
    email = current_setting('request.jwt.claims', true)::json->>'email'
  );

-- =====================================================
-- FUNCTIONS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_organizations_updated_at ON organizations;
CREATE TRIGGER update_organizations_updated_at
  BEFORE UPDATE ON organizations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_organization_members_updated_at ON organization_members;
CREATE TRIGGER update_organization_members_updated_at
  BEFORE UPDATE ON organization_members
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- COMMENTS
-- =====================================================

COMMENT ON TABLE organizations IS 'Funeral homes and firms using RitePath';
COMMENT ON TABLE organization_members IS 'Staff and vendors associated with organizations';
COMMENT ON TABLE staff_invitations IS 'Pending invitations for staff to join organizations';

COMMENT ON COLUMN organizations.owner_id IS 'Clerk user ID of the organization owner';
COMMENT ON COLUMN organization_members.user_id IS 'Clerk user ID';
COMMENT ON COLUMN staff_invitations.token IS 'Unique token for invitation acceptance';

