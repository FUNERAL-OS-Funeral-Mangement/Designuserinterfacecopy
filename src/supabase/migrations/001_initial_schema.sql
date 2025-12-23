-- =====================================================
-- RITE PATH - SUPABASE DATABASE SCHEMA
-- First Call Workflow with eSignature Integration
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- CASES TABLE
-- =====================================================
CREATE TABLE cases (
  id TEXT PRIMARY KEY,
  
  -- Case Information
  deceased_name TEXT,
  next_of_kin_name TEXT,
  family_contact_name TEXT,
  caller_name TEXT,
  caller_phone TEXT,
  caller_relationship TEXT,
  address TEXT,
  
  -- Status & Stage
  status TEXT DEFAULT 'intake-in-progress',
  current_stage TEXT DEFAULT 'intake',
  completed_stages TEXT[] DEFAULT '{}',
  
  -- Document & Signature Tracking
  intake_complete BOOLEAN DEFAULT FALSE,
  documents_generated INTEGER DEFAULT 0,
  signatures_received INTEGER DEFAULT 0,
  signatures_total INTEGER DEFAULT 0,
  faxes_sent INTEGER DEFAULT 0,
  faxes_total INTEGER DEFAULT 0,
  
  -- Additional Data
  time_of_death TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}',
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for performance
CREATE INDEX idx_cases_status ON cases(status);
CREATE INDEX idx_cases_current_stage ON cases(current_stage);
CREATE INDEX idx_cases_created_at ON cases(created_at DESC);

-- =====================================================
-- SIGNATURE REQUESTS TABLE
-- =====================================================
CREATE TABLE signature_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id TEXT NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  
  -- Document Information
  document_type TEXT NOT NULL, -- 'body_release', 'cremation_auth', 'transport_permit'
  document_name TEXT NOT NULL,
  
  -- eSign Provider Data
  esign_provider TEXT DEFAULT 'hellosign',
  esign_request_id TEXT UNIQUE, -- HelloSign's signature_request_id
  esign_signature_id TEXT, -- Individual signature ID
  
  -- Status Tracking
  status TEXT DEFAULT 'pending', 
  -- Statuses: pending, sent, delivered, viewed, signed, completed, declined, error
  
  -- Signer Information
  signer_name TEXT NOT NULL,
  signer_email TEXT NOT NULL,
  signer_phone TEXT,
  signer_role TEXT DEFAULT 'next_of_kin', -- next_of_kin, witness, funeral_director
  
  -- Document URLs (Supabase Storage)
  unsigned_document_url TEXT,
  signed_document_url TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  sent_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  viewed_at TIMESTAMPTZ,
  signed_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  
  -- Error Handling
  error_message TEXT,
  retry_count INTEGER DEFAULT 0,
  
  -- Metadata from eSign provider
  metadata JSONB DEFAULT '{}'
);

-- Indexes
CREATE INDEX idx_signature_requests_case ON signature_requests(case_id);
CREATE INDEX idx_signature_requests_status ON signature_requests(status);
CREATE INDEX idx_signature_requests_esign_id ON signature_requests(esign_request_id);
CREATE INDEX idx_signature_requests_created_at ON signature_requests(created_at DESC);

-- =====================================================
-- FAX REQUESTS TABLE
-- =====================================================
CREATE TABLE fax_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id TEXT NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  signature_request_id UUID REFERENCES signature_requests(id) ON DELETE SET NULL,
  
  -- Fax Information
  document_type TEXT NOT NULL,
  document_name TEXT NOT NULL,
  document_url TEXT NOT NULL, -- Signed PDF from Supabase Storage
  
  -- Recipient Information
  recipient_name TEXT NOT NULL,
  recipient_fax TEXT NOT NULL,
  recipient_type TEXT, -- 'coroner', 'medical_examiner', 'vital_records'
  
  -- Fax Provider Data (e.g., eFax, Twilio Fax)
  fax_provider TEXT DEFAULT 'efax',
  fax_provider_id TEXT,
  
  -- Status Tracking
  status TEXT DEFAULT 'pending',
  -- Statuses: pending, queued, sending, sent, delivered, failed
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  queued_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  
  -- Error Handling
  error_message TEXT,
  retry_count INTEGER DEFAULT 0,
  
  -- Metadata
  metadata JSONB DEFAULT '{}'
);

-- Indexes
CREATE INDEX idx_fax_requests_case ON fax_requests(case_id);
CREATE INDEX idx_fax_requests_status ON fax_requests(status);
CREATE INDEX idx_fax_requests_created_at ON fax_requests(created_at DESC);

-- =====================================================
-- REMOVAL TEAMS TABLE (Reference Data)
-- =====================================================
CREATE TABLE removal_teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  contact_name TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  service_area TEXT[],
  is_active BOOLEAN DEFAULT TRUE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default removal teams
INSERT INTO removal_teams (name, phone, service_area) VALUES
  ('Premier Removal Services', '(555) 123-4567', ARRAY['North Shore', 'Downtown']),
  ('24/7 Transport Solutions', '(555) 234-5678', ARRAY['South Bay', 'Peninsula']),
  ('Dignity First Transport', '(555) 345-6789', ARRAY['East Bay', 'Tri-Valley']),
  ('Compassionate Care Removal', '(555) 456-7890', ARRAY['All Areas']);

-- =====================================================
-- DOCUMENT TEMPLATES TABLE
-- =====================================================
CREATE TABLE document_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  document_type TEXT NOT NULL UNIQUE,
  description TEXT,
  template_url TEXT, -- Path in Supabase Storage
  is_required BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  field_mappings JSONB DEFAULT '{}', -- Maps case fields to PDF fields
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default templates
INSERT INTO document_templates (name, document_type, description, is_required) VALUES
  ('Body Release Authorization', 'body_release', 'Required for body removal from hospital/facility', TRUE),
  ('Cremation Authorization', 'cremation_auth', 'Required for cremation services', FALSE),
  ('Transport Permit', 'transport_permit', 'Required for out-of-state transport', FALSE);

-- =====================================================
-- AUDIT LOG TABLE
-- =====================================================
CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id TEXT REFERENCES cases(id) ON DELETE SET NULL,
  
  -- Event Information
  event_type TEXT NOT NULL, -- 'case_created', 'signature_sent', 'signature_received', 'fax_sent', etc.
  event_category TEXT, -- 'case', 'signature', 'fax', 'system'
  
  -- Actor
  user_id UUID, -- If you add auth later
  actor_name TEXT,
  actor_type TEXT, -- 'funeral_director', 'system', 'family_member'
  
  -- Event Details
  description TEXT,
  metadata JSONB DEFAULT '{}',
  
  -- IP/Context
  ip_address TEXT,
  user_agent TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audit_log_case ON audit_log(case_id);
CREATE INDEX idx_audit_log_event_type ON audit_log(event_type);
CREATE INDEX idx_audit_log_created_at ON audit_log(created_at DESC);

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
$$ LANGUAGE plpgsql;

-- Trigger for cases table
CREATE TRIGGER update_cases_updated_at 
  BEFORE UPDATE ON cases 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger for document_templates table
CREATE TRIGGER update_document_templates_updated_at 
  BEFORE UPDATE ON document_templates 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- HELPER FUNCTION: Auto-advance case stage
-- =====================================================
CREATE OR REPLACE FUNCTION check_and_advance_case_stage()
RETURNS TRIGGER AS $$
DECLARE
  v_case RECORD;
  v_new_stage TEXT;
BEGIN
  -- Get current case data
  SELECT * INTO v_case FROM cases WHERE id = NEW.case_id;
  
  IF NOT FOUND THEN
    RETURN NEW;
  END IF;
  
  -- Check if signature stage should advance
  IF v_case.current_stage = 'signatures' 
     AND v_case.signatures_received >= v_case.signatures_total 
     AND v_case.signatures_total > 0 THEN
    
    UPDATE cases 
    SET 
      current_stage = 'faxing',
      completed_stages = array_append(completed_stages, 'signatures'),
      status = 'faxing-in-progress'
    WHERE id = NEW.case_id;
    
    -- Log the advancement
    INSERT INTO audit_log (case_id, event_type, event_category, description, actor_type)
    VALUES (
      NEW.case_id, 
      'stage_advanced', 
      'case', 
      'Auto-advanced from signatures to faxing',
      'system'
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-advance after signature completion
CREATE TRIGGER auto_advance_after_signature
  AFTER UPDATE OF status ON signature_requests
  FOR EACH ROW
  WHEN (NEW.status = 'signed' AND OLD.status != 'signed')
  EXECUTE FUNCTION check_and_advance_case_stage();

-- =====================================================
-- ROW LEVEL SECURITY (RLS) - Optional, enable later
-- =====================================================
-- For now, we'll keep RLS disabled for development
-- Enable when you add authentication:
--
-- ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE signature_requests ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE fax_requests ENABLE ROW LEVEL SECURITY;
--
-- CREATE POLICY "Users can view their own cases" ON cases
--   FOR SELECT USING (auth.uid() = user_id);

-- =====================================================
-- STORAGE BUCKETS (Run this via Supabase Dashboard or CLI)
-- =====================================================
-- Create these buckets manually in Supabase Dashboard:
-- 
-- 1. Bucket: "documents" (public: false)
--    - Used for: unsigned PDFs, signed PDFs
--    - Path structure: {case_id}/{document_type}-{status}.pdf
-- 
-- 2. Bucket: "templates" (public: false)
--    - Used for: PDF templates
--    - Path structure: {document_type}-template.pdf

-- =====================================================
-- SAMPLE QUERIES
-- =====================================================

-- Get all active cases with signature status
COMMENT ON TABLE cases IS 'Example query:
SELECT 
  c.*,
  COUNT(sr.id) as total_signature_requests,
  COUNT(sr.id) FILTER (WHERE sr.status = ''signed'') as signed_count
FROM cases c
LEFT JOIN signature_requests sr ON sr.case_id = c.id
WHERE c.status != ''complete''
GROUP BY c.id
ORDER BY c.created_at DESC;
';

-- Get signature requests pending action
COMMENT ON TABLE signature_requests IS 'Example query:
SELECT 
  sr.*,
  c.deceased_name,
  c.family_contact_name
FROM signature_requests sr
JOIN cases c ON c.id = sr.case_id
WHERE sr.status IN (''pending'', ''sent'', ''viewed'')
ORDER BY sr.created_at ASC;
';
