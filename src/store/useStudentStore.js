import { create } from 'zustand';
import { supabase } from '../lib/supabase';

// Initial Empty State for a brand new user
const initialProfile = {
  id: '',
  fullName: '',
  email: '',
  college: '',
  branch: '',
  year: '',
  careerGoal: '',
  level: 1,
  xp: 0,
  streak: 0,
  activeClaims: 0,
  maxClaims: 2,
  contributionScore: 0,
  rank: 'Novice',
  freezeActive: false
};

const useStudentStore = create((set, get) => ({
  // ---- Profile ----
  profile: initialProfile,
  setProfile: (profile) => set({ profile }),

  fetchProfile: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const userId = session.user.id;
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error("Error fetching profile from Supabase:", error);
      return;
    }

    if (data) {
      // Determine rank based on XP (simple PM logic)
      let rank = 'Novice';
      if (data.xp > 500) rank = 'Apprentice';
      if (data.xp > 2000) rank = 'Prodigy';

      set((state) => ({
        profile: {
          ...state.profile,
          id: data.id,
          fullName: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
          email: data.email,
          college: data.college || 'Add your college',
          branch: data.branch || 'Add your branch',
          year: data.year || '1st Year',
          careerGoal: data.career_goal || 'Undecided',
          level: data.level || 1,
          xp: data.xp || 0,
          streak: data.streak || 0,
          activeClaims: data.active_claims || 0,
          maxClaims: data.max_claims || 2,
          contributionScore: data.xp || 0,
          rank: rank
        },
        contributionScore: data.xp || 0,
        streak: data.streak || 0,
        activeClaims: data.active_claims || 0,
        maxClaims: data.max_claims || 2,
        
        // No deadlines on Day 1 until they claim tasks
        deadlines: data.xp === 0 ? [] : state.deadlines,

        // Day 1 Welcome Alert
        alerts: data.xp === 0 && data.contribution_score === 0 ? [{
          id: 1,
          type: 'warning',
          title: 'Welcome to Mission Control!',
          message: 'Your journey begins here. Head over to the Project Forge and claim your first task to earn XP.',
          actionLabel: 'Go to Project Forge',
          actionLink: '/dashboard/projects',
          isRead: false
        }] : state.alerts
      }));
      
      // Fetch dynamic activity logs
      const { data: activityData, error: activityError } = await supabase
        .from('activity_logs')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(10);
        
      if (!activityError && activityData) {
        set((state) => ({
          activity: activityData.map(log => ({
            id: log.id,
            type: log.action_type === 'badge_earned' ? 'achievement' : 'project',
            title: log.action_type === 'badge_earned' ? `Earned Badge: ${log.entity_name}` : `Completed Task: ${log.entity_name}`,
            timestamp: new Date(log.created_at).toLocaleDateString(),
            points: log.xp_earned
          }))
        }));
      }
    }
  },

  updateProfile: async (updates) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;
    
    const userId = session.user.id;
    
    // Convert camelCase to snake_case if needed
    const dbUpdates = {};
    if (updates.fullName) {
      const parts = updates.fullName.split(' ');
      dbUpdates.first_name = parts[0];
      dbUpdates.last_name = parts.slice(1).join(' ');
    }
    if (updates.college) dbUpdates.college = updates.college;
    if (updates.branch) dbUpdates.branch = updates.branch;
    if (updates.careerGoal) dbUpdates.career_goal = updates.careerGoal;
    if (updates.bio) dbUpdates.bio = updates.bio;
    if (updates.githubUrl) dbUpdates.github_url = updates.githubUrl;
    if (updates.linkedinUrl) dbUpdates.linkedin_url = updates.linkedinUrl;
    // We don't save avatar_url here directly if it's file upload, but let's assume it's string
    if (updates.avatar_url) dbUpdates.avatar_url = updates.avatar_url;

    const { error } = await supabase
      .from('profiles')
      .update(dbUpdates)
      .eq('id', userId);

    if (error) {
      console.error("Error updating profile:", error);
      throw error;
    }

    set((state) => ({
      profile: { ...state.profile, ...updates }
    }));
  },

  // ---- Contribution Score (The Currency) ----
  contributionScore: 0,
  addContribution: (points) => set((s) => ({ contributionScore: s.contributionScore + points })),

  // ---- Streak ----
  streak: 0,
  incrementStreak: () => set((s) => ({ streak: s.streak + 1 })),
  resetStreak: () => set({ streak: 0 }),

  // ---- Deadlines ----
  deadlines: [],
  
  // ---- Custodian Alerts ----
  alerts: [],
  markAlertRead: (id) => set((s) => ({
    alerts: s.alerts.map(a => a.id === id ? { ...a, isRead: true } : a)
  })),
  dismissAlert: (id) => set((s) => ({
    alerts: s.alerts.filter(a => a.id !== id)
  })),
  unreadAlertCount: () => get().alerts.filter(a => !a.isRead).length,

  // ---- Recent Activity ----
  activity: [],

  // ---- Claims ----
  activeClaims: 0,
  maxClaims: 2,
  canClaimTask: () => get().activeClaims < get().maxClaims,

  // ---- Freeze ----
  freezeActive: false,
  requestFreeze: () => set({ freezeActive: true }),
  cancelFreeze: () => set({ freezeActive: false }),
}));

export default useStudentStore;
