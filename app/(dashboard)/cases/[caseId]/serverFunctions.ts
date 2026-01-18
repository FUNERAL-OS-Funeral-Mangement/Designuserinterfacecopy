import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { redirect } from 'next/navigation';

/**
 * Server Functions for Case Detail Page
 * These functions fetch data from the database on the server-side
 */

export interface CaseDetailData {
  id: string;
  caseNumber: string;
  deceasedName: string;
  caseType: 'At-Need' | 'Pre-Need';
  dateCreated: string;
  photoUrl?: string;
  serviceDate?: string;
  status?: string;
  // Add other fields as needed based on your database schema
}

/**
 * Get case by ID from database
 */
export async function getCaseById(caseId: string): Promise<CaseDetailData | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from('cases')
      .select('*')
      .eq('id', caseId)
      .single();

    if (error) {
      console.error('Error fetching case:', error);
      return null;
    }

    if (!data) {
      return null;
    }

    // Transform database fields to match CaseDetailData interface
    // Adjust field mappings based on your actual database schema
    const caseTypeValue = data.case_type || 'At-Need';
    const normalizedCaseType: 'At-Need' | 'Pre-Need' = 
      (caseTypeValue === 'Pre-Need' || caseTypeValue === 'PreNeed' || caseTypeValue === 'pre-need')
        ? 'Pre-Need'
        : 'At-Need';

    return {
      id: data.id,
      caseNumber: data.case_number || data.id, // Adjust based on your schema
      deceasedName: data.deceased_name || '',
      caseType: normalizedCaseType,
      dateCreated: data.created_at || new Date().toISOString(),
      photoUrl: data.photo_url || undefined,
      serviceDate: data.service_date || undefined,
      status: data.status || undefined,
    };
  } catch (error) {
    console.error('Error in getCaseById:', error);
    return null;
  }
}

/**
 * Get all cases (for listing pages)
 * This can be used in other pages if needed
 */
export async function getAllCases(): Promise<CaseDetailData[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from('cases')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching cases:', error);
      return [];
    }

    if (!data || data.length === 0) {
      return [];
    }

    // Transform database rows to match CaseDetailData interface
    return data.map((row) => {
      const caseTypeValue = row.case_type || 'At-Need';
      const normalizedCaseType: 'At-Need' | 'Pre-Need' = 
        (caseTypeValue === 'Pre-Need' || caseTypeValue === 'PreNeed' || caseTypeValue === 'pre-need')
          ? 'Pre-Need'
          : 'At-Need';

      return {
        id: row.id,
        caseNumber: row.case_number || row.id,
        deceasedName: row.deceased_name || '',
        caseType: normalizedCaseType,
        dateCreated: row.created_at || new Date().toISOString(),
        photoUrl: row.photo_url || undefined,
        serviceDate: row.service_date || undefined,
        status: row.status || undefined,
      };
    });
  } catch (error) {
    console.error('Error in getAllCases:', error);
    return [];
  }
}

