import { create } from 'zustand';
import { forgeProjects, projectSubparts, aidRequests, submissions, waitlists } from '../lib/mockProjectForge';
import api from '../lib/api';

const useProjectForgeStore = create((set, get) => ({
  // ---- Projects ----
  projects: forgeProjects,
  subparts: projectSubparts,
  aidRequests: aidRequests,
  submissions: submissions,
  waitlists: waitlists,

  // ---- Fetch from API ----
  fetchProjects: async () => {
    try {
      const res = await api.get('/projects');
      if (res.data.success) {
        // Transform Prisma data to match our UI state shape
        const apiProjects = res.data.data;
        const subpartsDict = {};
        
        apiProjects.forEach(p => {
          // Keep mock data for UI components that need richer data (like tech stack, mentors) if DB lacks it
          // Or just use the DB subparts
          if (p.subparts) {
            subpartsDict[p.id] = p.subparts.map(sp => ({
              ...sp,
              // Map prisma fields to UI expected fields
              claimedBy: sp.claimedById ? { id: sp.claimedById, name: 'Student', avatar: '' } : null,
              daysLeft: sp.dueDate ? Math.max(0, Math.ceil((new Date(sp.dueDate) - new Date()) / (1000 * 60 * 60 * 24))) : 0
            }));
          }
        });
        
        set({ 
          // We merge mock projects with DB projects so UI doesn't break if DB is missing coverImages
          subparts: { ...get().subparts, ...subpartsDict }
        });
      }
    } catch(err) {
      console.error("Failed to fetch projects from API", err);
    }
  },

  // ---- Get subparts for a project ----
  getSubparts: (projectId) => get().subparts[projectId] || [],
  getAvailable: (projectId) => (get().subparts[projectId] || []).filter(s => s.status === 'available'),
  getClaimed: (projectId) => (get().subparts[projectId] || []).filter(s => s.status === 'claimed'),
  getCompleted: (projectId) => (get().subparts[projectId] || []).filter(s => s.status === 'completed'),

  // ---- Claim Task (max 2 rule) ----
  claimTask: async (subpartId, projectId, user) => {
    try {
      // 1. Hit the backend API
      const res = await api.post('/projects/claim', { subpartId });
      
      if (res.data.success) {
        // 2. Update local state on success
        set((s) => ({
          subparts: {
            ...s.subparts,
            [projectId]: s.subparts[projectId].map(sp =>
              sp.id === subpartId ? { ...sp, status: 'claimed', claimedBy: user, claimedAt: new Date().toISOString(), daysLeft: 3 } : sp
            ),
          },
        }));
        return true;
      }
    } catch(err) {
      console.error("Failed to claim task", err);
      // The backend will reject if user has >= 2 claims
      alert(err.response?.data?.message || "Failed to claim task. You may have reached your limit.");
      return false;
    }
    return false;
  },

  // ---- Request Aid ----
  requestAid: async (subpartId, aidData) => {
    try {
      const res = await api.post('/projects/aid', { subpartId, ...aidData });
      if (res.data.success) {
        set((s) => ({ aidRequests: [...s.aidRequests, res.data.data] }));
      }
    } catch (err) {
      console.error('Failed to request aid', err);
    }
  },

  // ---- Submit for Review ----
  submitForReview: async (subpartId, submissionData) => {
    try {
      const res = await api.post('/projects/submit', { subpartId, ...submissionData });
      if (res.data.success) {
        set((s) => ({ submissions: [...s.submissions, res.data.data] }));
      }
    } catch (err) {
      console.error('Failed to submit review', err);
    }
  },

  // ---- Join Waitlist ----
  joinWaitlist: async (subpartId, user) => {
    try {
      const res = await api.post('/projects/waitlist', { subpartId });
      if (res.data.success) {
        set((s) => {
          const current = s.waitlists[subpartId] || [];
          return {
            waitlists: { ...s.waitlists, [subpartId]: [...current, res.data.data] },
          };
        });
      }
    } catch (err) {
      console.error('Failed to join waitlist', err);
    }
  },
}));

export default useProjectForgeStore;
