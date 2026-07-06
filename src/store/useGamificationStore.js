import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import useStudentStore from './useStudentStore';
import { badgeDefinitions, earnedBadges, leaderboard, projectPortfolio, contributionHistory } from '../lib/mockGamification';

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
        .select('id, full_name, college, xp, streak')
        .order('xp', { ascending: false })
        .limit(20);

      const formattedLeaderboard = (leaderboardData || []).map((p, index) => ({
        rank: index + 1,
        name: p.full_name || 'Anonymous User',
        college: p.college || 'Unknown College',
        contributionScore: p.xp,
        streak: p.streak,
        badges: 0, 
        isCurrentUser: p.id === userId
      }));

      // Fallback to mock data if leaderboard is empty
      if (!leaderboardData || leaderboardData.length === 0) {
        set({
          allBadges: badgeDefinitions,
          earnedBadges: earnedBadges,
          portfolio: projectPortfolio,
          leaderboard: leaderboard,
          contributionHistory: contributionHistory
        });
        return;
      }

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
}));

export default useGamificationStore;
