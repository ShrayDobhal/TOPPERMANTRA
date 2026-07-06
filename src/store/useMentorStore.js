import { create } from 'zustand';
import { supabase } from '../lib/supabase';

const useMentorStore = create((set) => ({
  mentors: [],
  loading: false,

  fetchMentors: async () => {
    set({ loading: true });
    
    // Fetch users with role 'Mentor'
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'Mentor');

    if (!error && data) {
      // Map profile fields to mentor UI needs. 
      // If the backend doesn't have rating/company yet, we provide fallbacks for the UI.
      const mappedMentors = data.map(mentor => ({
        id: mentor.id,
        name: mentor.full_name || 'Anonymous Mentor',
        role: mentor.career_goal || 'Software Engineer',
        company: 'Industry Partner', // Fallback
        experience: '3 YOE', // Fallback
        type: 'Professional', // Fallback
        rating: 4.9, // Fallback
        education: mentor.college ? `${mentor.college} • ${mentor.branch}` : 'Top University',
        achievement: 'Verified Mentor', // Fallback
        status: 'Available',
        avatar: mentor.full_name || 'Mentor',
        skills: ['React', 'System Design', 'Mentorship'] // Fallback
      }));

      set({ mentors: mappedMentors, loading: false });
    } else {
      set({ loading: false });
    }
  }
}));

export default useMentorStore;
