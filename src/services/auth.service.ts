import { supabase } from '../lib/supabase';
import type { Database } from '../types/database.types';

type ProfileRow = Database['public']['Tables']['profiles']['Row'];

/**
 * Authentication Service
 * Handles user sessions, login, signup, and profile retrieval.
 */
export const authService = {
  /**
   * Get the current authenticated user's profile
   */
  async getCurrentProfile(): Promise<ProfileRow | null> {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session?.user) return null;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.session.user.id)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }

    return data;
  },

  /**
   * Log out the current user
   */
  async signOut(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }
};
