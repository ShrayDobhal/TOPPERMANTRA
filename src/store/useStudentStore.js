import { create } from 'zustand';
import { currentStudent, upcomingDeadlines, custodianAlerts, recentActivity } from '../lib/mockStudentProfile';

const useStudentStore = create((set, get) => ({
  // ---- Profile ----
  profile: currentStudent,
  setProfile: (profile) => set({ profile }),

  // ---- Contribution Score (The Currency) ----
  contributionScore: currentStudent.contributionScore,
  addContribution: (points) => set((s) => ({ contributionScore: s.contributionScore + points })),

  // ---- Streak ----
  streak: currentStudent.streak,
  incrementStreak: () => set((s) => ({ streak: s.streak + 1 })),
  resetStreak: () => set({ streak: 0 }),

  // ---- Deadlines ----
  deadlines: upcomingDeadlines,
  
  // ---- Custodian Alerts ----
  alerts: custodianAlerts,
  markAlertRead: (id) => set((s) => ({
    alerts: s.alerts.map(a => a.id === id ? { ...a, isRead: true } : a)
  })),
  dismissAlert: (id) => set((s) => ({
    alerts: s.alerts.filter(a => a.id !== id)
  })),
  unreadAlertCount: () => get().alerts.filter(a => !a.isRead).length,

  // ---- Recent Activity ----
  activity: recentActivity,

  // ---- Claims ----
  activeClaims: currentStudent.activeClaims,
  maxClaims: currentStudent.maxClaims,
  canClaimTask: () => get().activeClaims < get().maxClaims,

  // ---- Freeze ----
  freezeActive: currentStudent.freezeActive,
  requestFreeze: () => set({ freezeActive: true }),
  cancelFreeze: () => set({ freezeActive: false }),
}));

export default useStudentStore;
