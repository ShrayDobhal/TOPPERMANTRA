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

    if (!error && data && data.length > 0) {
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
      // DUMMY DATA FALLBACK
      set({ 
        mentors: [
          {
            id: 'm1', name: 'Sarah Drasner', role: 'VP of Engineering', company: 'Netlify', experience: '10 YOE',
            type: 'Professional', rating: 4.9, education: 'MIT • Computer Science', achievement: 'Top Open Source Contributor',
            status: 'Available', avatar: 'Sarah', skills: ['Vue', 'Leadership', 'System Design']
          },
          {
            id: 'm2', name: 'Guillermo Rauch', role: 'CEO', company: 'Vercel', experience: '12 YOE',
            type: 'Professional', rating: 5.0, education: 'Self Taught', achievement: 'Creator of Next.js',
            status: 'Booked', avatar: 'Guillermo', skills: ['React', 'Next.js', 'Startups']
          },
          {
            id: 'm3', name: 'Dan Abramov', role: 'Software Engineer', company: 'Meta', experience: '8 YOE',
            type: 'Professional', rating: 4.8, education: 'University of Engineering', achievement: 'Co-author of Redux',
            status: 'Available', avatar: 'Dan', skills: ['React', 'Redux', 'Frontend']
          }
        ], 
        loading: false 
      });
    }
  }
}));

export default useMentorStore;
