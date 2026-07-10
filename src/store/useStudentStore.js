import { create } from 'zustand';
import { supabase } from '../lib/supabase';

// Initial Empty State for a brand new user
const initialProfile = {
  id: '',
  fullName: '',
  email: '',
  avatarUrl: '',
  resumeUrl: '',
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
    let { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    // If profile doesn't exist (PGRST116), create it manually
    if (error && error.code === 'PGRST116') {
      console.log("Profile not found, auto-creating it...");
      const { data: newProfile, error: insertError } = await supabase
        .from('profiles')
        .insert([{ 
          id: userId, 
          full_name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'New Student',
          avatar_url: session.user.user_metadata?.avatar_url || ''
        }])
        .select()
        .single();
        
      if (insertError) {
        console.error("Error creating missing profile:", insertError);
        return;
      }
      data = newProfile;
      error = null;
    } else if (error) {
      console.error("Error fetching profile from Supabase:", error);
      return;
    }

    if (data) {
      // ---- Daily Login Streak Logic ----
      const now = new Date();
      const todayStr = now.toLocaleDateString('en-US');
      
      const yesterday = new Date();
      yesterday.setDate(now.getDate() - 1);
      const yesterdayStr = yesterday.toLocaleDateString('en-US');

      let lastActiveStr = '';
      if (data.last_active_at) {
        lastActiveStr = new Date(data.last_active_at).toLocaleDateString('en-US');
      }

      let newStreak = data.streak || 0;
      let newLongestStreak = data.longest_streak || 0;
      let shouldUpdateActive = false;

      if (!data.last_active_at) {
        newStreak = 1;
        newLongestStreak = Math.max(newLongestStreak, 1);
        shouldUpdateActive = true;
      } else if (lastActiveStr !== todayStr) {
        if (lastActiveStr === yesterdayStr) {
          newStreak += 1;
          newLongestStreak = Math.max(newLongestStreak, newStreak);
        } else {
          newStreak = 1;
        }
        shouldUpdateActive = true;
      }

      if (shouldUpdateActive) {
        console.log(`Updating streak in database. Streak: ${newStreak}, Longest: ${newLongestStreak}`);
        const { error: updateError } = await supabase
          .from('profiles')
          .update({
            streak: newStreak,
            longest_streak: newLongestStreak,
            last_active_at: now.toISOString()
          })
          .eq('id', userId);
          
        if (!updateError) {
          data.streak = newStreak;
          data.longest_streak = newLongestStreak;
        } else {
          console.error("Error updating user streak:", updateError);
        }
      }

      // Determine rank based on XP (simple PM logic)
      let rank = 'Novice';
      if (data.contribution_score > 500) rank = 'Apprentice';
      if (data.contribution_score > 2000) rank = 'Prodigy';

      set((state) => ({
        profile: {
          ...state.profile,
          id: data.id,
          fullName: data.full_name || '',
          email: data.email,
          avatarUrl: data.avatar_url || '',
          resumeUrl: data.resume_url || '',
          portfolioUrl: data.portfolio_url || '',
          college: data.college || 'Add your college',
          branch: data.branch || 'Add your branch',
          year: data.year || '1st Year',
          careerGoal: data.career_goal || 'Undecided',
          level: data.level || 1,
          xp: data.contribution_score || 0,
          streak: data.streak || 0,
          activeClaims: data.active_claims || 0,
          maxClaims: data.max_claims || 2,
          contributionScore: data.contribution_score || 0,
          rank: rank
        },
        contributionScore: data.contribution_score || 0,
        streak: data.streak || 0,
        activeClaims: data.active_claims || 0,
        maxClaims: data.max_claims || 2,
        
        // No deadlines on Day 1 until they claim tasks
        deadlines: data.contribution_score === 0 ? [] : state.deadlines,

        // Day 1 Welcome Alert
        alerts: data.contribution_score === 0 ? [{
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
    if (updates.fullName !== undefined) dbUpdates.full_name = updates.fullName;
    if (updates.college !== undefined) dbUpdates.college = updates.college;
    if (updates.branch !== undefined) dbUpdates.branch = updates.branch;
    if (updates.year !== undefined) dbUpdates.year = updates.year;
    if (updates.careerGoal !== undefined) dbUpdates.career_goal = updates.careerGoal;
    if (updates.bio !== undefined) dbUpdates.bio = updates.bio;
    if (updates.githubUrl !== undefined) dbUpdates.github_url = updates.githubUrl;
    if (updates.linkedinUrl !== undefined) dbUpdates.linkedin_url = updates.linkedinUrl;
    if (updates.portfolioUrl !== undefined) dbUpdates.portfolio_url = updates.portfolioUrl;
    if (updates.avatarUrl !== undefined) dbUpdates.avatar_url = updates.avatarUrl;
    if (updates.resumeUrl !== undefined) dbUpdates.resume_url = updates.resumeUrl;

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
