/**
 * Supabase Admin Client (Server-Side Only)
 * 
 * ⚠️ This module should ONLY be imported in:
 * - API routes (app/api/**)
 * - Server Components
 * - Server Actions
 * 
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Singleton instance to avoid recreating the client
let supabaseAdminInstance: SupabaseClient | null = null;

/**
 * Get or create the Supabase admin client
 * Uses singleton pattern for efficiency
 */
function getSupabaseAdmin(): SupabaseClient {
    // Return existing instance if available
    if (supabaseAdminInstance) {
        return supabaseAdminInstance;
    }

    // Validate environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceRoleKey) {
        throw new Error(
            `Missing required Supabase environment variables`
        );
    }

    // Create and cache the client instance
    supabaseAdminInstance = createClient(supabaseUrl, supabaseServiceRoleKey, {
        auth: {
            persistSession: false,
            autoRefreshToken: false,
        },
    });

    return supabaseAdminInstance;
}

// Export the singleton instance
export const supabaseAdmin = getSupabaseAdmin();

