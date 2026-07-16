import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import useStudentStore from './useStudentStore';

const useGamificationStore = create((set, get) => ({
  // ---- Badges ----
  allBadges: [],
  earnedBadges: [],
  
  // ---- Portfolio ----
  portfolio: [],

  // ---- Leaderboard ----
  leaderboard: [],

  // ---- Contribution History (for heatmap) ----
  contributionHistory: [],

  fetchGamification: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;

      // Fetch all available badges
      const { data: allBadgesData } = await supabase.from('badges').select('*');
      
      let earnedBadgesData = [];
      let portfolioData = [];

      if (userId) {
        // Fetch earned badges for user
        const { data: userBadges } = await supabase
          .from('user_badges')
          .select('*, badge:badges(*)')
          .eq('user_id', userId);
          
        if (userBadges) {
          earnedBadgesData = userBadges.map(ub => ({
            badgeId: ub.badge_id,
            earnedAt: ub.earned_at,
            ...ub.badge
          }));
        }

        // Fetch completed tasks for portfolio
        const { data: tasks } = await supabase
          .from('project_tasks')
          .select('*, project:projects(title, domain)')
          .eq('assignee_id', userId)
          .eq('status', 'Completed');

        if (tasks) {
          portfolioData = tasks.map(t => ({
            id: t.id,
            projectTitle: t.project?.title || 'Unknown Project',
            subpartTitle: t.title,
            mergedAt: t.last_submission_at || t.updated_at,
            xpEarned: 100, // mock xp value
            techStack: ['Supabase', 'React'] // generic for now
          }));
        }
      }

      // Fetch leaderboard
      const { data: leaderboardData, error: lbError } = await supabase
        .from('profiles')
        .select('id, full_name, college, contribution_score, streak')
        .order('contribution_score', { ascending: false })
        .limit(20);

      const formattedLeaderboard = (leaderboardData || []).map((p, index) => ({
        rank: index + 1,
        name: p.full_name || 'Anonymous User',
        college: p.college || 'Unknown College',
        contributionScore: p.contribution_score,
        streak: p.streak,
        badges: 0, 
        isCurrentUser: p.id === userId
      }));



      // Mocking contribution history for heatmap (until we log daily xp events in DB)
      const mockHistory = Array.from({ length: 30 }).map((_, i) => ({
        date: new Date(Date.now() - (30 - i) * 24 * 60 * 60 * 1000).toISOString(),
        score: Math.floor(Math.random() * 100)
      }));

      set({
        allBadges: allBadgesData || [],
        earnedBadges: earnedBadgesData,
        portfolio: portfolioData,
        leaderboard: formattedLeaderboard,
        contributionHistory: mockHistory
      });

    } catch (err) {
      console.error('Failed to fetch gamification data', err);
    }
  },

  getEarnedBadgeDetails: () => {
    return get().earnedBadges;
  },
  
  getUnearnedBadges: () => {
    const earnedIds = get().earnedBadges.map(eb => eb.badgeId || eb.id);
    return get().allBadges.filter(b => !earnedIds.includes(b.id));
  },

  getUserRank: () => get().leaderboard.find(l => l.isCurrentUser)?.rank || 0,

  awardXP: async (actionName, amount) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      
      // Update locally
      const studentStore = useStudentStore.getState();
      if (studentStore.profile) {
        studentStore.setProfile({
          ...studentStore.profile,
          contributionScore: (studentStore.profile.contributionScore || 0) + amount
        });
      }

      // Update in DB (or let trigger handle it, but here we insert activity log)
      await supabase.from('activity_logs').insert({
        user_id: session.user.id,
        action_type: 'resume_action',
        entity_name: actionName,
        xp_earned: amount
      });

      // And we can update the profile explicitly
      await supabase.rpc('award_xp', { amount, action_name: actionName });
      
    } catch (e) {
      console.error("Failed to award XP:", e);
    }
  },
}));

export default useGamificationStore;
