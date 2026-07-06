import { create } from 'zustand';
import { supabase } from '../lib/supabase';

const usePortfolioStore = create((set) => ({
  projects: [],
  badges: [],
  loading: false,

  fetchPortfolioData: async () => {
    set({ loading: true });
    
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;
    const userId = session.user.id;

    // Fetch completed tasks to act as "Experience / Projects"
    const { data: tasksData, error: tasksError } = await supabase
      .from('project_tasks')
      .select('*, projects(title, domain)')
      .eq('assignee_id', userId)
      .eq('status', 'Completed')
      .order('updated_at', { ascending: false });

    // Fetch user badges to act as "Skills / Achievements"
    const { data: badgesData, error: badgesError } = await supabase
      .from('user_badges')
      .select('*, badges(*)')
      .eq('user_id', userId);

    if (!tasksError && tasksData) {
      set({ 
        projects: tasksData.map(t => ({
          id: t.id,
          title: t.title,
          projectTitle: t.projects?.title || 'Standalone Task',
          domain: t.projects?.domain || 'Software Engineering',
          description: t.description || 'Contributed to codebase.',
          completedAt: new Date(t.updated_at).toLocaleDateString()
        }))
      });
    }

    if (!badgesError && badgesData) {
      set({
        badges: badgesData.map(b => ({
          id: b.badges.id,
          name: b.badges.name,
          icon: b.badges.icon,
          earnedAt: new Date(b.earned_at).toLocaleDateString()
        }))
      });
    }

    set({ loading: false });
  }
}));

export default usePortfolioStore;
