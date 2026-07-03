import { create } from 'zustand';
import { currentCohort, cohortMembers, weeklyChallenge, previousChallenges, challengeResponses } from '../lib/mockCohort';
import api from '../lib/api';

const useCohortStore = create((set, get) => ({
  // ---- Cohort Data ----
  cohort: currentCohort,
  members: cohortMembers,
  
  // ---- Weekly Challenge ----
  currentChallenge: weeklyChallenge,
  previousChallenges: previousChallenges,
  challengeResponses: challengeResponses,

  // ---- Fetch from API ----
  fetchCohort: async () => {
    try {
      const res = await api.get('/cohort');
      if (res.data.success) {
        set({ cohort: res.data.data, members: res.data.data.members || [] });
      }
    } catch (err) {
      console.error('Failed to fetch cohort', err);
    }
  },

  // ---- Actions ----
  addResponse: async (responseContent, user) => {
    try {
      const challengeId = get().currentChallenge?.id;
      if (!challengeId) return;
      const res = await api.post('/cohort/challenge/response', { challengeId, content: responseContent });
      if (res.data.success) {
        set((s) => ({
          challengeResponses: [...s.challengeResponses, res.data.data],
          currentChallenge: { ...s.currentChallenge, responsesCount: s.currentChallenge.responsesCount + 1 },
        }));
      }
    } catch (err) {
      console.error('Failed to post response', err);
    }
  },

  upvoteResponse: async (responseId) => {
    try {
      const res = await api.post(`/cohort/response/${responseId}/upvote`);
      if (res.data.success) {
        set((s) => ({
          challengeResponses: s.challengeResponses.map(r =>
            r.id === responseId ? { ...r, upvotes: res.data.data.upvotes } : r
          ),
        }));
      }
    } catch (err) {
      console.error('Failed to upvote response', err);
    }
  },

  // ---- Member Activity ----
  getActiveCount: () => get().members.filter(m => m.status === 'active').length,
  getYellowFlagged: () => get().members.filter(m => m.status === 'yellow'),
  getRedFlagged: () => get().members.filter(m => m.status === 'red'),
}));

export default useCohortStore;
