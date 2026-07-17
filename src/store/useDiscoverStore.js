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

    if (!error && data && data.length > 0) {
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
      // DUMMY DATA FALLBACK
      const dummyOpps = [
        {
          id: 'o1', title: 'Software Engineering Intern', company: 'Google', location: 'Remote',
          type: 'Internship', stipend: '$8,000/mo', match: 96, isMatch: true,
          skills: ['C++', 'Python', 'DSA'], created_at: new Date().toISOString()
        },
        {
          id: 'o2', title: 'Frontend Developer (React)', company: 'Stripe', location: 'San Francisco, CA',
          type: 'Full Time', stipend: '$120k - $150k', match: 92, isMatch: true,
          skills: ['React', 'TypeScript', 'Tailwind'], created_at: new Date().toISOString()
        },
        {
          id: 'o3', title: 'Open Source Contributor', company: 'Vercel', location: 'Remote',
          type: 'Freelance', stipend: '$50/hr', match: 85, isMatch: false,
          skills: ['Next.js', 'Node.js', 'Git'], created_at: new Date().toISOString()
        }
      ];
      set({ 
        opportunities: dummyOpps,
        featured: dummyOpps.slice(0, 2),
        loading: false 
      });
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
