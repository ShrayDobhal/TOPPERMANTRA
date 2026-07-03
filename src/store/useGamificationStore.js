import { create } from 'zustand';
import { badgeDefinitions, earnedBadges, leaderboard, projectPortfolio, contributionHistory } from '../lib/mockGamification';

const useGamificationStore = create((set, get) => ({
  // ---- Badges ----
  allBadges: badgeDefinitions,
  earnedBadges: earnedBadges,
  getEarnedBadgeDetails: () => {
    const earned = get().earnedBadges;
    const all = get().allBadges;
    return earned.map(eb => ({ ...all.find(b => b.id === eb.badgeId), earnedAt: eb.earnedAt }));
  },
  getUnearnedBadges: () => {
    const earnedIds = get().earnedBadges.map(eb => eb.badgeId);
    return get().allBadges.filter(b => !earnedIds.includes(b.id));
  },

  // ---- Leaderboard ----
  leaderboard: leaderboard,
  getUserRank: () => get().leaderboard.find(l => l.isCurrentUser)?.rank || 0,

  // ---- Portfolio ----
  portfolio: projectPortfolio,

  // ---- Contribution History (for heatmap) ----
  contributionHistory: contributionHistory,
}));

export default useGamificationStore;
