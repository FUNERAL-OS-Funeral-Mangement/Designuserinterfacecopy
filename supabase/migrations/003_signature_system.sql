-- =====================================================
-- E-SIGNATURE SYSTEM - DATABASE SCHEMA
-- =====================================================
-- Migration: 003_signature_system
-- Description: Tables for document signing with DocuSeal integration

-- =====================================================
-- DOCUMENT TEMPLATES TABLE
-- =====================================================
-- Stores reusable document templates for each organization
CREATE TABLE IF NOT EXISTS document_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id TEXT NOT NULL,                      -- Clerk organization ID
  name TEXT NOT NULL,                        -- "Body Release Form"
  description TEXT,                          -- "Required for body removal"
  category TEXT,                             -- "forms", "contracts", "disclosures"
  file_path TEXT NOT NULL,                   -- Path in Supabase Storage
  file_type TEXT DEFAULT 'pdf',              -- "pdf", "docx"
  is_system_template BOOLEAN DEFAULT false,  -- System-wide vs org-specific
  requires_signature BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX idx_document_templates_org_id ON document_templates(org_id);
CREATE INDEX idx_document_templates_active ON document_templates(active);

-- RLS Policy: Users can only see their org's templates + system templates
ALTER TABLE document_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their org templates and system templates"
ON document_templates FOR SELECT
USING (
  org_id = auth.jwt()->>'org_id' 
  OR is_system_template = true
);

CREATE POLICY "Users can manage their org templates"
ON document_templates FOR ALL
USING (org_id = auth.jwt()->>'org_id');

-- =====================================================
-- SIGNATURE RECORDS TABLE
-- =====================================================
-- Tracks all signature requests and their status
CREATE TABLE IF NOT EXISTS signature_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id TEXT NOT NULL,                          -- Clerk organization ID
  case_id TEXT NOT NULL,                         -- First call case ID
  document_name TEXT NOT NULL,                   -- "Body Release Form"
  document_type TEXT,                            -- "body-release", "cremation-auth"
  
  -- Document URLs (in YOUR Supabase)
  unsigned_document_url TEXT NOT NULL,           -- Original PDF
  signed_document_url TEXT,                      -- Signed PDF (after completion)
  
  -- Signer Information
  signer_name TEXT NOT NULL,
  signer_email TEXT,
  signer_phone TEXT NOT NULL,
  signer_relationship TEXT,                      -- "Next of Kin", "Spouse"
  
  -- DocuSeal Integration
  docuseal_submission_id TEXT UNIQUE,            -- DocuSeal's submission ID
  docuseal_status TEXT DEFAULT 'pending',        -- "pending", "sent", "viewed", "completed", "declined"
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  sent_at TIMESTAMP WITH TIME ZONE,              -- When SMS was sent
  viewed_at TIMESTAMP WITH TIME ZONE,            -- When signer opened the link
  signed_at TIMESTAMP WITH TIME ZONE,            -- When signer completed signing
  
  -- Security & Compliance
  ip_address TEXT,                               -- Signer's IP address
  user_agent TEXT,                               -- Browser/device info
  consent_given BOOLEAN DEFAULT false,           -- E-SIGN Act consent
  document_hash TEXT,                            -- SHA-256 of original document
  signed_document_hash TEXT,                     -- SHA-256 of signed document
  
  -- Audit Trail
  metadata JSONB,                                -- Additional data
  
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_signature_records_org_id ON signature_records(org_id);
CREATE INDEX idx_signature_records_case_id ON signature_records(case_id);
CREATE INDEX idx_signature_records_status ON signature_records(docuseal_status);
CREATE INDEX idx_signature_records_docuseal_id ON signature_records(docuseal_submission_id);

-- RLS Policy: Users can only see their org's signature records
ALTER TABLE signature_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their org signature records"
ON signature_records FOR SELECT
USING (org_id = auth.jwt()->>'org_id');

CREATE POLICY "Users can manage their org signature records"
ON signature_records FOR ALL
USING (org_id = auth.jwt()->>'org_id');

-- =====================================================
-- SIGNATURE AUDIT LOG TABLE
-- =====================================================
-- Comprehensive audit trail for compliance
CREATE TABLE IF NOT EXISTS signature_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  signature_record_id UUID REFERENCES signature_records(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,                      -- "document_viewed", "signature_started", "signature_completed"
  event_data JSONB,                              -- Additional event data
  ip_address TEXT,
  user_agent TEXT,
  geolocation JSONB,                             -- { "country": "US", "city": "New York" }
  session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for audit queries
CREATE INDEX idx_signature_audit_log_record_id ON signature_audit_log(signature_record_id);
CREATE INDEX idx_signature_audit_log_event_type ON signature_audit_log(event_type);
CREATE INDEX idx_signature_audit_log_created_at ON signature_audit_log(created_at);

-- RLS Policy: Read-only access to audit logs
ALTER TABLE signature_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view audit logs for their signatures"
ON signature_audit_log FOR SELECT
USING (
  signature_record_id IN (
    SELECT id FROM signature_records WHERE org_id = auth.jwt()->>'org_id'
  )
);

-- =====================================================
-- UPDATED_AT TRIGGERS
-- =====================================================
-- Auto-update updated_at timestamp

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_document_templates_updated_at
  BEFORE UPDATE ON document_templates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_signature_records_updated_at
  BEFORE UPDATE ON signature_records
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- COMMENTS FOR DOCUMENTATION
-- =====================================================
COMMENT ON TABLE document_templates IS 'Stores reusable document templates for each organization';
COMMENT ON TABLE signature_records IS 'Tracks all signature requests and their completion status';
COMMENT ON TABLE signature_audit_log IS 'Comprehensive audit trail for legal compliance';

COMMENT ON COLUMN signature_records.docuseal_submission_id IS 'DocuSeal submission ID for API reference';
COMMENT ON COLUMN signature_records.document_hash IS 'SHA-256 hash for tamper detection';
COMMENT ON COLUMN signature_records.consent_given IS 'E-SIGN Act electronic signature consent';



