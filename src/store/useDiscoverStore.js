import { create } from 'zustand';
import { supabase } from '../lib/supabase';

const useDiscoverStore = create((set, get) => ({
  opportunities: [],
  featured: [],
  applications: [],
  loading: false,

  fetchOpportunities: async () => {
    set({ loading: true });
    
    // Fetch all opportunities
    const { data, error } = await supabase
      .from('opportunities')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      // Basic mock matching logic (In production, use AI/Edge function)
      const enhancedData = data.map(opp => ({
        ...opp,
        match: Math.floor(Math.random() * (98 - 70 + 1)) + 70, // Mock AI Match score
        isMatch: Math.random() > 0.5,
        skills: ['React', 'PostgreSQL', 'DSA'] // Fallback if no skills array in DB
      }));

      // Set first two as featured just for UI purposes
      set({ 
        opportunities: enhancedData,
        featured: enhancedData.slice(0, 2),
        loading: false 
      });
    } else {
      set({ loading: false });
    }
  },

  fetchMyApplications: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;
    
    const { data, error } = await supabase
      .from('applications')
      .select('*, opportunities(*)')
      .eq('user_id', session.user.id);

    if (!error && data) {
      set({ applications: data });
    }
  },

  applyForOpportunity: async (opportunityId) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { error } = await supabase
      .from('applications')
      .insert({
        user_id: session.user.id,
        opportunity_id: opportunityId,
        status: 'Applied'
      });

    if (!error) {
      get().fetchMyApplications();
    }
  }
}));

export default useDiscoverStore;
